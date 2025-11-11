
"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./css/matrixchat.css";
import { MessageCircle, X } from "lucide-react";
import { useGetAuthUserQuery } from "@/state/api";
import { getMatrixSdk } from "@/utils/matrixSdk";
import { MatrixClientType } from "@/types/index.t";
import {
  createRoomViaAPI,
  leaveRoomViaAPI,
  loadServerUsers,
} from "@/utils/api";
import RoomList from "./RoomList";
import MessageArea from "./MessageArea";
import LeaveRoomModal from "./modals/LeaveRoomModal";

// Type for authenticated user from backend
interface AuthUser {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string | null;
    role: "BUYER" | "SELLER" | "ADMIN";
    isEmailVerified: boolean;
    isPhoneVerified: boolean;
    isSellerVerified: boolean;
    matrixUserId: string;
    matrixPassword: string;
    createdAt: string;
    updatedAt: string;
  };
  userRole: "BUYER" | "SELLER" | "ADMIN";
  matrix: {
    matrixUserId: string;
    matrixAccessToken: string;
    matrixHomeserver: string;
  };
}

const MatrixChat = () => {
  const { data: authUser } = useGetAuthUserQuery() as { data: AuthUser | undefined };

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRestoringSession, setIsRestoringSession] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Matrix state
  const [client, setClient] = useState<any | null>(null);
  const [matrixUserId, setMatrixUserId] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [rooms, setRooms] = useState<any[]>([]);
  const [invites, setInvites] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [syncState, setSyncState] = useState("");

  // Chat UI state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  // Contact modal state
  const [showContactModal, setShowContactModal] = useState(false);
  const [targetUserId, setTargetUserId] = useState("");
  const [creatingRoom, setCreatingRoom] = useState(false);

  // User list modal state
  const [showUserListModal, setShowUserListModal] = useState(false);
  const [serverUsers, setServerUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Leave room modal state
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [roomToLeave, setRoomToLeave] = useState<any | null>(null);
  const [leavingRoom, setLeavingRoom] = useState(false);

  // Direct chat modal state
  const [showDirectChatModal, setShowDirectChatModal] = useState(false);
  const [directChatUserId, setDirectChatUserId] = useState("");
  const [creatingDirectChat, setCreatingDirectChat] = useState(false);

  // Video call state
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(true);
  const [callState, setCallState] = useState<
    "idle" | "calling" | "connecting" | "connected" | "ended"
  >("idle");
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [remoteName, setRemoteName] = useState("");
  const [isOutgoingCall, setIsOutgoingCall] = useState(false);

  // WebRTC state
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const callIdRef = useRef<string>("");
  const callRoomIdRef = useRef<string>("");
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);

  // Use refs to track current values in event listeners
  const selectedRoomRef = useRef<any | null>(null);
  const clientRef = useRef<any | null>(null);
  const isOutgoingCallRef = useRef<boolean>(false);

  // Update ref when selectedRoom changes
  useEffect(() => {
    selectedRoomRef.current = selectedRoom;
  }, [selectedRoom]);

  // Update ref when client changes
  useEffect(() => {
    clientRef.current = client;
  }, [client]);

  // Update ref when isOutgoingCall changes
  useEffect(() => {
    isOutgoingCallRef.current = isOutgoingCall;
  }, [isOutgoingCall]);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission);
      });
    }
  }, []);

  // Get or create device ID
  const getOrCreateDeviceId = () => {
    let storedDeviceId = localStorage.getItem("matrix_device_id");
    if (!storedDeviceId) {
      storedDeviceId = `WEB_${Math.random()
        .toString(36)
        .substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
      localStorage.setItem("matrix_device_id", storedDeviceId);
    }
    return storedDeviceId;
  };

  // Get homeserver URL
  const getHomeserver = () =>
    process.env.NEXT_PUBLIC_MATRIX_HOMESERVER || "https://matrix.151.hu";

  // Load messages for a room
  // Fixed: Removed unnecessary dependencies 'client' and 'selectedRoomRef'
  const loadMessages = useCallback(async (room: any) => {
    if (!room) return;

    const timeline = room.getLiveTimeline();
    const events = timeline
      .getEvents()
      .filter((e: any) => e.getType() === "m.room.message");

    setMessages(events);
  }, []);

  // Update rooms and invites from client
  // Fixed: Removed unnecessary dependency 'client'
  const updateRoomsAndInvites = useCallback((matrixClient: MatrixClientType) => {
    const allRooms = matrixClient.getRooms();

    // Separate rooms by membership status
    const joinedRooms = allRooms.filter((room) => {
      const membership = room.getMyMembership();
      return membership === "join";
    });

    const invitedRooms = allRooms.filter((room) => {
      const membership = room.getMyMembership();
      return membership === "invite";
    });

    console.log(
      `Found ${joinedRooms.length} joined rooms and ${invitedRooms.length} invites`
    );
    
    // Check if we have new invites
    const previousInviteCount = invites.length;
    const newInviteCount = invitedRooms.length;
    
    setRooms(joinedRooms);
    setInvites(invitedRooms);
    
    // Show notification for new invites
    if (newInviteCount > previousInviteCount) {
      const newInvitesReceived = newInviteCount - previousInviteCount;
      console.log(`🔔 ${newInvitesReceived} new invite(s) received!`);
      
      // Show browser notification if permission granted
      if ('Notification' in window && Notification.permission === 'granted') {
        const latestInvite = invitedRooms[invitedRooms.length - 1];
        const roomName = latestInvite?.name || 'Unknown Room';
        new Notification('New Chat Invite', {
          body: `You've been invited to ${roomName}`,
          icon: '/favicon.ico',
          tag: 'matrix-invite',
        });
      }
    }
  }, [invites.length]);

  // Initialize WebRTC peer connection
  const createPeerConnection = useCallback(() => {
    const configuration: RTCConfiguration = {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    };

    const pc = new RTCPeerConnection(configuration);

    pc.onicecandidate = (event) => {
      if (event.candidate && client && selectedRoomRef.current) {
        console.log("Sending ICE candidate");
        client.sendEvent(selectedRoomRef.current.roomId, "m.call.candidates", {
          call_id: callIdRef.current,
          candidates: [event.candidate.toJSON()],
          version: 1,
        });
      }
    };

    pc.ontrack = (event) => {
      console.log("Received remote track");
      if (remoteVideoRef.current && event.streams[0]) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    pc.onconnectionstatechange = () => {
      console.log("Connection state:", pc.connectionState);
      if (pc.connectionState === "connected") {
        setCallState("connected");
      } else if (
        pc.connectionState === "disconnected" ||
        pc.connectionState === "failed"
      ) {
        console.log("Connection failed or disconnected");
        handleHangup();
      }
    };

    pc.oniceconnectionstatechange = () => {
      console.log("ICE connection state:", pc.iceConnectionState);
    };

    return pc;
  }, [client]); // client is used in onicecandidate

  // Get local media stream
  const getLocalStream = async (video: boolean) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: video ? { width: 1280, height: 720 } : false,
        audio: true,
      });

      localStreamRef.current = stream;

      if (localVideoRef.current && video) {
        localVideoRef.current.srcObject = stream;
      }

      return stream;
    } catch (error) {
      console.error("Error accessing media devices:", error);
      throw error;
    }
  };

  // Start outgoing call
  const startCall = async (video: boolean) => {
    if (!client) {
      console.error("❌ Cannot start call: no client");
      setError("Client not initialized. Please try again.");
      return;
    }

    if (!selectedRoomRef.current) {
      console.error("❌ Cannot start call: no room");
      setError("No room selected. Please select a chat first.");
      return;
    }

    if (!deviceId) {
      console.error("❌ Cannot start call: no device ID");
      setError("Device ID missing. Please try logging in again.");
      return;
    }

    try {
      console.log(`📞 Starting ${video ? "video" : "audio"} call...`);

      // Store the room ID for this call
      callRoomIdRef.current = selectedRoomRef.current.roomId;
      console.log("Call room ID:", callRoomIdRef.current);

      setIsVideoCall(video);
      setIsVideoEnabled(video);
      setShowVideoCall(true);
      setCallState("connecting");
      setIsOutgoingCall(true);

      // Generate call ID
      const newCallId = `call_${Date.now()}_${Math.random()
        .toString(36)
        .substring(7)}`;
      callIdRef.current = newCallId;
      console.log("Call ID:", callIdRef.current);

      // Get local media
      const stream = await getLocalStream(video);

      // Create peer connection
      const pc = createPeerConnection();
      peerConnectionRef.current = pc;

      // Add local tracks to peer connection
      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      // Create offer
      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: video,
      });

      await pc.setLocalDescription(offer);

      // Send invite to Matrix room
      console.log("Sending m.call.invite...");
      await client.sendEvent(selectedRoomRef.current.roomId, "m.call.invite", {
        call_id: callIdRef.current,
        version: 1,
        lifetime: 60000,
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      });

      console.log("✅ Call invite sent successfully");
      setCallState("calling");
    } catch (error) {
      console.error("Error starting call:", error);
      setError("Failed to start call. Please try again.");
      handleHangup();
    }
  };

  // Answer incoming call
  const answerCall = async () => {
    if (!peerConnectionRef.current) {
      console.error("No peer connection to answer");
      return;
    }

    try {
      console.log("📞 Answering call...");
      setCallState("connecting");

      // Get local media
      const stream = await getLocalStream(isVideoCall);

      // Add local tracks to existing peer connection
      stream.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, stream);
      });

      // Create answer
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);

      // Send answer to Matrix room
      if (client && callRoomIdRef.current) {
        console.log("Sending m.call.answer...");
        await client.sendEvent(callRoomIdRef.current, "m.call.answer", {
          call_id: callIdRef.current,
          version: 1,
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        });

        console.log("✅ Call answer sent successfully");

        // Process any pending ICE candidates
        if (pendingCandidatesRef.current.length > 0) {
          console.log(
            `Processing ${pendingCandidatesRef.current.length} pending ICE candidates`
          );
          for (const candidate of pendingCandidatesRef.current) {
            await peerConnectionRef.current.addIceCandidate(
              new RTCIceCandidate(candidate)
            );
          }
          pendingCandidatesRef.current = [];
        }
      }
    } catch (error) {
      console.error("Error answering call:", error);
      setError("Failed to answer call. Please try again.");
      handleHangup();
    }
  };

  // Reject incoming call
  const rejectCall = async () => {
    if (client && callRoomIdRef.current && callIdRef.current) {
      try {
        console.log("Rejecting call...");
        await client.sendEvent(callRoomIdRef.current, "m.call.hangup", {
          call_id: callIdRef.current,
          version: 1,
          reason: "user_hangup",
        });
      } catch (error) {
        console.error("Error sending hangup:", error);
      }
    }

    handleHangup();
  };

  // Handle hangup
  const handleHangup = () => {
    console.log("🔴 Hanging up call...");

    // Close peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    // Stop local media
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    // Clear video elements
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    // Reset call state
    setShowVideoCall(false);
    setCallState("idle");
    setIsOutgoingCall(false);
    setIsMuted(false);
    setIsVideoEnabled(true);
    setRemoteName("");
    callIdRef.current = "";
    callRoomIdRef.current = "";
    pendingCandidatesRef.current = [];

    console.log("✅ Call cleanup complete");
  };

  // Toggle mute
  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  // Toggle video
  const toggleVideo = () => {
    if (localStreamRef.current) {
      const videoTrack = localStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  // Handle call invite event - wrapped in useCallback
  const handleCallInvite = useCallback(
    async (event: any) => {
      console.log("📞 Received call invite:", event);

      const content = event.getContent();
      const incomingCallId = content.call_id;
      const offer = content.offer;
      const roomId = event.getRoomId();

      // Get room name for display
      const room = clientRef.current?.getRoom(roomId);
      let callerName = "Unknown";
      if (room) {
        callerName = room.name || "Unknown Room";
      }

      console.log(`Call from: ${callerName}`);
      console.log(`Room ID: ${roomId}`);
      console.log(`Call ID: ${incomingCallId}`);

      // Store call information
      callIdRef.current = incomingCallId;
      callRoomIdRef.current = roomId;
      setRemoteName(callerName);
      setIsVideoCall(offer.sdp.includes("m=video"));
      setIsOutgoingCall(false);

      // Create peer connection
      const pc = createPeerConnection();
      peerConnectionRef.current = pc;

      // Set remote description
      try {
        await pc.setRemoteDescription(
          new RTCSessionDescription({
            type: offer.type,
            sdp: offer.sdp,
          })
        );
        console.log("✅ Remote description set successfully");
      } catch (error) {
        console.error("Error setting remote description:", error);
        return;
      }

      // Show incoming call UI
      setShowVideoCall(true);
      setCallState("calling");
    },
    [createPeerConnection] // Added createPeerConnection dependency
  );

  // Handle call answer event - wrapped in useCallback
  const handleCallAnswer = useCallback(
    async (event: any) => {
      console.log("📞 Received call answer:", event);

      const content = event.getContent();
      const answer = content.answer;

      if (
        !peerConnectionRef.current ||
        content.call_id !== callIdRef.current
      ) {
        console.log("Ignoring answer for different call");
        return;
      }

      try {
        await peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription({
            type: answer.type,
            sdp: answer.sdp,
          })
        );
        console.log("✅ Remote description set from answer");

        // Process any pending ICE candidates
        if (pendingCandidatesRef.current.length > 0) {
          console.log(
            `Processing ${pendingCandidatesRef.current.length} pending ICE candidates`
          );
          for (const candidate of pendingCandidatesRef.current) {
            await peerConnectionRef.current.addIceCandidate(
              new RTCIceCandidate(candidate)
            );
          }
          pendingCandidatesRef.current = [];
        }
      } catch (error) {
        console.error("Error setting remote description:", error);
      }
    },
    [] // No dependencies needed since we use refs for dynamic values
  );

  // Handle ICE candidates - wrapped in useCallback
  const handleCallCandidates = useCallback(
    async (event: any) => {
      const content = event.getContent();

      if (content.call_id !== callIdRef.current) {
        console.log("Ignoring candidates for different call");
        return;
      }

      if (!peerConnectionRef.current) {
        console.log("No peer connection, storing candidates for later");
        pendingCandidatesRef.current.push(...content.candidates);
        return;
      }

      // Check if we have a remote description
      if (!peerConnectionRef.current.remoteDescription) {
        console.log(
          "No remote description yet, storing candidates for later"
        );
        pendingCandidatesRef.current.push(...content.candidates);
        return;
      }

      // Add candidates
      for (const candidate of content.candidates) {
        try {
          await peerConnectionRef.current.addIceCandidate(
            new RTCIceCandidate(candidate)
          );
          console.log("✅ Added ICE candidate");
        } catch (error) {
          console.error("Error adding ICE candidate:", error);
        }
      }
    },
    [] // No dependencies needed since we use refs for dynamic values
  );

  // Handle call hangup - wrapped in useCallback
  const handleCallHangup = useCallback(
    (event: any) => {
      console.log("📞 Received call hangup:", event);

      const content = event.getContent();
      if (content.call_id === callIdRef.current) {
        console.log("Call ended by remote party");
        setCallState("ended");
        setTimeout(() => {
          handleHangup();
        }, 2000);
      }
    },
    [] // No dependencies needed since we use refs for dynamic values
  );

  // Switch to a different room
  const switchRoom = (room: any) => {
    console.log("Switching to room:", room.roomId);
    setSelectedRoom(room);
    loadMessages(room);
  };

  // Send a message
  const sendMessage = async () => {
    if (!client || !selectedRoom || !newMessage.trim()) return;

    setSending(true);
    try {
      await client.sendTextMessage(selectedRoom.roomId, newMessage.trim());
      setNewMessage("");

      // Reload messages after a brief delay to show the sent message
      setTimeout(() => {
        loadMessages(selectedRoom);
      }, 500);
    } catch (err: any) {
      console.error("Failed to send message:", err);
      setError(err.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  // Login to Matrix
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const sdk = await getMatrixSdk();
      const homeserverUrl = getHomeserver();
      const storedDeviceId = getOrCreateDeviceId();

      console.log("🔐 Logging in to Matrix...");
      console.log("Homeserver:", homeserverUrl);
      console.log("Username:", username);

      const matrixClient = sdk.createClient({
        baseUrl: homeserverUrl,
      });

      const loginResponse = await matrixClient.loginWithPassword(
        username.trim(),
        password,
        {
          type: "m.login.password",
          device_id: storedDeviceId,
          initial_device_display_name: "Web Client",
        }
      );

      console.log("✅ Login successful!");
      console.log("User ID:", loginResponse.user_id);
      console.log("Access Token:", loginResponse.access_token?.substring(0, 20) + "...");
      console.log("Device ID:", loginResponse.device_id);

      // Store credentials
      setMatrixUserId(loginResponse.user_id);
      setAccessToken(loginResponse.access_token);
      setDeviceId(loginResponse.device_id);

      // Save to localStorage
      localStorage.setItem("matrix_user_id", loginResponse.user_id);
      localStorage.setItem("matrix_access_token", loginResponse.access_token);
      localStorage.setItem("matrix_device_id", loginResponse.device_id);
      localStorage.setItem("matrix_homeserver", homeserverUrl);

      // Create authenticated client
      const authenticatedClient = sdk.createClient({
        baseUrl: homeserverUrl,
        accessToken: loginResponse.access_token,
        userId: loginResponse.user_id,
        deviceId: loginResponse.device_id,
      });

      setClient(authenticatedClient);
      setIsAuthenticated(true);

      // Clear password
      setPassword("");

      console.log("✅ Client initialized successfully");
    } catch (err: any) {
      console.error("❌ Login error:", err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Register a new Matrix account
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const sdk = await getMatrixSdk();
      const homeserverUrl = getHomeserver();
      const storedDeviceId = getOrCreateDeviceId();

      console.log("📝 Registering new Matrix account...");
      console.log("Homeserver:", homeserverUrl);
      console.log("Username:", username);

      const matrixClient = sdk.createClient({
        baseUrl: homeserverUrl,
      });

      const registerResponse = await matrixClient.register(
        username.trim(),
        password,
        undefined,
        {
          type: "m.login.dummy",
        }
      );

      console.log("✅ Registration successful!");
      console.log("User ID:", registerResponse.user_id);
      console.log("Access Token:", registerResponse.access_token?.substring(0, 20) + "...");
      console.log("Device ID:", registerResponse.device_id);

      // Store credentials
      setMatrixUserId(registerResponse.user_id);
      setAccessToken(registerResponse.access_token);
      setDeviceId(registerResponse.device_id || storedDeviceId);

      // Save to localStorage
      localStorage.setItem("matrix_user_id", registerResponse.user_id);
      localStorage.setItem("matrix_access_token", registerResponse.access_token);
      localStorage.setItem(
        "matrix_device_id",
        registerResponse.device_id || storedDeviceId
      );
      localStorage.setItem("matrix_homeserver", homeserverUrl);

      // Create authenticated client
      const authenticatedClient = sdk.createClient({
        baseUrl: homeserverUrl,
        accessToken: registerResponse.access_token,
        userId: registerResponse.user_id,
        deviceId: registerResponse.device_id || storedDeviceId,
      });

      setClient(authenticatedClient);
      setIsAuthenticated(true);

      // Clear passwords
      setPassword("");
      setConfirmPassword("");

      console.log("✅ Client initialized successfully");
    } catch (err: any) {
      console.error("❌ Registration error:", err);
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    if (client) {
      try {
        await client.stopClient();
        await client.logout();
      } catch (err) {
        console.error("Logout error:", err);
      }
    }

    // Clear state
    setClient(null);
    setIsAuthenticated(false);
    setMatrixUserId("");
    setAccessToken("");
    setDeviceId("");
    setRooms([]);
    setInvites([]);
    setSelectedRoom(null);
    setMessages([]);

    // Clear localStorage
    localStorage.removeItem("matrix_user_id");
    localStorage.removeItem("matrix_access_token");
    localStorage.removeItem("matrix_device_id");

    console.log("✅ Logged out successfully");
  };

  // Set up Matrix event listeners - Fixed: Moved call handlers inside useCallback
  const setupEventListeners = useCallback(
    (matrixClient: MatrixClientType) => {
      console.log("📡 Setting up event listeners...");

      // Timeline event (new messages)
      matrixClient.on("Room.timeline" as any, (event: any, room: any) => {
        // Ignore events for rooms we don't know about
        if (!room) {
          console.log("⚠️ Received event for unknown room, ignoring");
          return;
        }

        const eventType = event.getType();
        const roomId = event.getRoomId();

        // Verify the room exists in our client
        const knownRoom =( matrixClient as any).getRoom(roomId);
        if (!knownRoom) {
          console.log(`⚠️ Received event for room ${roomId} not in client state, ignoring`);
          return;
        }

        // Handle regular messages
        if (eventType === "m.room.message") {
          if (
            selectedRoomRef.current &&
            roomId === selectedRoomRef.current.roomId
          ) {
            console.log("📨 New message in current room, reloading messages");
            loadMessages(selectedRoomRef.current);
          }
        }

        // Handle call events only for known rooms
        if (eventType === "m.call.invite") {
          handleCallInvite(event);
        } else if (eventType === "m.call.answer") {
          handleCallAnswer(event);
        } else if (eventType === "m.call.candidates") {
          handleCallCandidates(event);
        } else if (eventType === "m.call.hangup") {
          handleCallHangup(event);
        }
      });

      // Room membership changes (for all members)
      matrixClient.on("RoomMember.membership" as any, () => {
        console.log("👥 Membership changed, updating rooms");
        updateRoomsAndInvites(matrixClient);
      });

      // My membership changes (specifically for invites) - REAL-TIME INVITES
      matrixClient.on("Room.myMembership" as any, (room: any, membership: string, prevMembership: string) => {
        console.log(`🔔 My membership changed in room ${room.roomId}: ${prevMembership} → ${membership}`);
        
        // Immediately update rooms and invites when we receive/accept/reject an invite
        if (membership === "invite") {
          console.log("📩 NEW INVITE RECEIVED in real-time!");
        } else if (prevMembership === "invite" && membership === "join") {
          console.log("✅ Invite accepted");
        } else if (prevMembership === "invite" && membership === "leave") {
          console.log("❌ Invite rejected");
        }
        
        // Update the UI immediately
        updateRoomsAndInvites(matrixClient);
      });

      // New room created/joined - REAL-TIME ROOM DETECTION
      matrixClient.on("Room" as any, (room: any) => {
        console.log("🆕 New room detected:", room.roomId);
        const membership = room.getMyMembership();
        console.log(`Room membership: ${membership}`);
        
        // Update immediately when a new room appears (including invites)
        updateRoomsAndInvites(matrixClient);
      });

      // Sync state changes
      matrixClient.on("sync" as any, (state: string, prevState: string | null, data: any) => {
        console.log("🔄 Sync state:", state);
        setSyncState(state);

        if (state === "PREPARED") {
          console.log("✅ Initial sync complete");
          updateRoomsAndInvites(matrixClient);
        } else if (state === "SYNCING") {
          // Also update during ongoing sync to catch new invites quickly
          updateRoomsAndInvites(matrixClient);
        } else if (state === "ERROR") {
          console.error("❌ Sync error:", data);
          // Don't set error state here as it might be temporary
        }
      });

      // Handle unknown room state events (suppress warnings)
      matrixClient.on("RoomState.events" as any, (event: any, state: any, room: any) => {
        if (!room) {
          // Silently ignore - this is expected for rooms we're not part of
          return;
        }
      });

      console.log("✅ Event listeners set up");
    },
    [
      loadMessages,
      updateRoomsAndInvites,
      handleCallInvite,
      handleCallAnswer,
      handleCallCandidates,
      handleCallHangup,
    ]
  );

  // Start syncing when client is available
  useEffect(() => {
    if (client && isAuthenticated) {
      console.log("🚀 Starting Matrix sync...");

      // Set up event listeners
      setupEventListeners(client);

      // Start syncing with better configuration
      client
        .startClient()
        .then(() => {
          console.log("✅ Client started successfully");
        })
        .catch((err: any) => {
          console.error("❌ Failed to start client:", err);
          setError("Failed to start sync");
        });

      return () => {
        console.log("🛑 Stopping client...");
        try {
          client.stopClient();
        } catch (err) {
          console.error("Error stopping client:", err);
        }
      };
    }
  }, [client, isAuthenticated, setupEventListeners]);

  // Auto-login to Matrix using backend auth credentials
  useEffect(() => {
    const autoLogin = async () => {
      // If already authenticated, skip
      if (isAuthenticated || !authUser) {
        setIsRestoringSession(false);
        return;
      }

      // Check if we have Matrix credentials from backend
      if (!authUser.matrix?.matrixUserId || !authUser.matrix?.matrixAccessToken) {
        console.log("⚠️ No Matrix credentials in authUser");
        setIsRestoringSession(false);
        return;
      }

      try {
        console.log("🔐 Connecting to Matrix using backend credentials...");
        console.log("Matrix User ID:", authUser.matrix.matrixUserId);
        console.log("Homeserver:", authUser.matrix.matrixHomeserver);

        setLoading(true);
        const sdk = await getMatrixSdk();
        const homeserverUrl = authUser.matrix.matrixHomeserver || getHomeserver();
        const deviceId = getOrCreateDeviceId();

        // Create authenticated client directly using the access token
        const authenticatedClient = sdk.createClient({
          baseUrl: homeserverUrl,
          accessToken: authUser.matrix.matrixAccessToken,
          userId: authUser.matrix.matrixUserId,
          deviceId: deviceId,
        });

        // Store credentials
        setMatrixUserId(authUser.matrix.matrixUserId);
        setAccessToken(authUser.matrix.matrixAccessToken);
        setDeviceId(deviceId);

        // Save to localStorage for future sessions
        localStorage.setItem("matrix_user_id", authUser.matrix.matrixUserId);
        localStorage.setItem("matrix_access_token", authUser.matrix.matrixAccessToken);
        localStorage.setItem("matrix_device_id", deviceId);
        localStorage.setItem("matrix_homeserver", homeserverUrl);

        setClient(authenticatedClient);
        setIsAuthenticated(true);

        console.log("✅ Matrix client initialized successfully");
      } catch (err: any) {
        console.error("❌ Matrix connection error:", err);
        setError(err.message || "Failed to connect to Matrix");
      } finally {
        setLoading(false);
        setIsRestoringSession(false);
      }
    };

    autoLogin();
  }, [authUser, isAuthenticated]);

  // Create room via API - COMMENTED OUT
  //   const handleCreateRoom = async () => {
  //     if (!targetUserId.trim()) {
  //       setError("Please enter a valid user ID");
  //       return;
  //     }
  //
  //     setCreatingRoom(true);
  //     setError("");
  //
  //     try {
  //       const formattedUserId = formatUserId(targetUserId.trim(), getHomeserver());
  //       console.log("Creating room with user:", formattedUserId);
  //
  //       // Extract username for room name
  //       const username = extractUsername(targetUserId.trim());
  //       const roomName = `Chat with ${username}`;
  //       const topic = `Direct conversation`;
  //
  //       const result = await createRoomViaAPI(
  //         accessToken,
  //         roomName,
  //         topic,
  //         formattedUserId,
  //         true
  //       );
  //
  //       console.log("Room created:", result.roomId);
  //
  //       setShowContactModal(false);
  //       setTargetUserId("");
  //       setIsChatOpen(true);
  //
  //       setTimeout(() => {
  //         if (client) {
  //           const allRooms = client.getRooms();
  //           const newRoom = allRooms.find((r) => r.roomId === result.roomId);
  //           if (newRoom) {
  //             switchRoom(newRoom);
  //           }
  //         }
  //       }, 1000);
  //     } catch (err: any) {
  //       console.error("Room creation error:", err);
  //       setError(err.message || "Failed to create room");
  //     } finally {
  //       setCreatingRoom(false);
  //     }
  //   };

  // Load server users
  const handleLoadServerUsers = async () => {
    setLoadingUsers(true);
    const users = await loadServerUsers(accessToken, getHomeserver());
    setServerUsers(users);
    setLoadingUsers(false);
  };

  // Select user from list
  //   const selectUserFromList = (userId: string) => {
  //     const username = extractUsername(userId);
  //     setTargetUserId(username);
  //     setShowUserListModal(false);
  //   };

  // Select user from list for direct chat
  //   const selectUserFromListForDirectChat = (userId: string) => {
  //     const username = extractUsername(userId);
  //     setDirectChatUserId(username);
  //     setShowUserListModal(false);
  //   };

  // Handle direct chat
  // const handleDirectChat = async () => {
  //   if (!directChatUserId.trim()) {
  //     setError("Please enter a valid user ID");
  //     return;
  //   }
  //
  //   setCreatingDirectChat(true);
  //   setError("");
  //
  //   try {
  //     //   const formattedUserId = formatUserId(directChatUserId.trim(), getHomeserver());
  //     //   console.log("Creating direct chat with user:", formattedUserId);
  //
  //     // Extract username for room name
  //     //   const username = extractUsername(directChatUserId.trim());
  //     const roomName = `Chat with ${username}`;
  //     const topic = `Direct conversation`;
  //
  //     const result = await createRoomViaAPI(
  //       accessToken,
  //       roomName,
  //       topic,
  //       formattedUserId,
  //       true
  //     );
  //
  //     console.log("Direct chat room created:", result.roomId);
  //
  //     setShowDirectChatModal(false);
  //     setDirectChatUserId("");
  //     setIsChatOpen(true);
  //
  //     setTimeout(() => {
  //       if (client) {
  //         const allRooms = client.getRooms();
  //         const newRoom = allRooms.find((r) => r.roomId === result.roomId);
  //         if (newRoom) {
  //           switchRoom(newRoom);
  //         }
  //       }
  //     }, 1000);
  //   } catch (err: any) {
  //     console.error("Direct chat creation error:", err);
  //     setError(err.message || "Failed to create direct chat");
  //   } finally {
  //     setCreatingDirectChat(false);
  //   }
  // };

  // Accept room invite
  const handleAcceptInvite = async (roomId: string) => {
    if (!client) return;

    try {
      console.log("Accepting invite for room:", roomId);
      await client.joinRoom(roomId);

      // Update rooms list
      setTimeout(() => {
        if (client) {
          updateRoomsAndInvites(client);

          // Optionally switch to the newly joined room
          const joinedRoom = client.getRoom(roomId);
          if (joinedRoom) {
            switchRoom(joinedRoom);
            setIsChatOpen(true);
          }
        }
      }, 500);

      console.log("✅ Successfully joined room");
    } catch (err: any) {
      console.error("Failed to accept invite:", err);
      setError(err.message || "Failed to accept invite");
    }
  };

  // Reject room invite
  const handleRejectInvite = async (roomId: string) => {
    if (!client) return;

    try {
      console.log("Rejecting invite for room:", roomId);
      await client.leave(roomId);

      // Update rooms list
      setTimeout(() => {
        if (client) {
          updateRoomsAndInvites(client);
        }
      }, 500);

      console.log("✅ Successfully rejected invite");
    } catch (err: any) {
      console.error("Failed to reject invite:", err);
      setError(err.message || "Failed to reject invite");
    }
  };

  // Confirm leave room
  const confirmLeaveRoom = (room: any) => {
    setRoomToLeave(room);
    setShowLeaveConfirm(true);
  };

  // Handle leave room
  const handleLeaveRoom = async () => {
    if (!roomToLeave || !client) return;

    setLeavingRoom(true);
    setError("");

    try {
      console.log("Leaving room:", roomToLeave.roomId);
      console.log("accessToken", accessToken);

      await leaveRoomViaAPI(accessToken, roomToLeave.roomId);

      if (selectedRoom?.roomId === roomToLeave.roomId) {
        setSelectedRoom(null);
        setMessages([]);
      }

      setRooms((prevRooms) =>
        prevRooms.filter((r) => r.roomId !== roomToLeave.roomId)
      );

      setShowLeaveConfirm(false);
      setRoomToLeave(null);

      console.log("✅ Successfully left room");
    } catch (err: any) {
      console.error("Leave room error:", err);
      setError(err.message || "Failed to leave room");
    } finally {
      setLeavingRoom(false);
    }
  };

  // Get property address from selected room
  //   const getPropertyAddress = () => {
  //     if (!selectedRoom) return undefined;
  //     const { propertyAddress } = getRoomDisplayInfo(selectedRoom);
  //     return propertyAddress;
  //   };

  // Show loading state while checking for existing session or auto-logging in
  if (isRestoringSession || loading) {
    return (
      <div className="chat_matrix_container">
        <button className="matrix_chat_Btn" disabled>
          <MessageCircle size={24} className="icon_msg" />
        </button>
      </div>
    );
  }

  // Show error state if auto-login failed and no authUser
  if (!isAuthenticated && !authUser) {
    return (
      <div className="chat_matrix_container">
        <button
          className="matrix_chat_Btn"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          <MessageCircle size={24} className="icon_msg" />
        </button>
        
        {isChatOpen && (
          <div className="matrix_chat_window">
            <div className="matrix_chat_window_header_wrapper">
              <h3 className="header_title">Matrix Chat</h3>
              <button
                className="matrix_chat_close_Btn"
                onClick={() => setIsChatOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: "20px", textAlign: "center" }}>
              <p>Please log in to your account to use chat.</p>
              {error && (
                <div
                  style={{
                    padding: "10px",
                    marginTop: "15px",
                    backgroundColor: "#fee",
                    color: "#c00",
                    borderRadius: "4px",
                  }}
                >
                  {error}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Show error state if authUser exists but Matrix login failed
  if (!isAuthenticated && authUser && error) {
    return (
      <div className="chat_matrix_container">
        <button
          className="matrix_chat_Btn"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          <MessageCircle size={24} className="icon_msg" />
        </button>
        
        {isChatOpen && (
          <div className="matrix_chat_window">
            <div className="matrix_chat_window_header_wrapper">
              <h3 className="header_title">Matrix Connection Error</h3>
              <button
                className="matrix_chat_close_Btn"
                onClick={() => setIsChatOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  padding: "10px",
                  backgroundColor: "#fee",
                  color: "#c00",
                  borderRadius: "4px",
                  marginBottom: "15px",
                }}
              >
                {error}
              </div>
              <p style={{ fontSize: "14px", color: "#666" }}>
                Unable to connect to Matrix chat. Please try refreshing the page or contact support if the problem persists.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main authenticated chat UI
  return (
    <div className="chat_matrix_container">
      {!isChatOpen && (
        <button
          className="matrix_chat_Btn"
          onClick={() => setIsChatOpen(!isChatOpen)}
          style={{ position: "relative" }}
        >
          <MessageCircle size={24} className="icon_msg" />
          {/* Show badge when there are pending invites */}
          {invites.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                backgroundColor: "#ff4444",
                color: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold",
                border: "2px solid white",
              }}
            >
              {invites.length}
            </span>
          )}
        </button>
      )}
      {isChatOpen && (
        <div className="matrix_chat_window">
          {/* chat window header */}
          <div className="matrix_chat_window_header_wrapper">
            <div className="">
              <h3 className="header_title">Messaging</h3>
            </div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
             
              <button
                className="matrix_chat_close_Btn"
                onClick={() => setIsChatOpen(!isChatOpen)}
              >
                <X size={20} />
              </button>
            </div>
          </div>
          {/* chat window body */}
          <div
            className=""
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "row",
              overflow: "hidden",
            }}
          >
            <RoomList
              rooms={rooms}
              invites={invites}
              selectedRoom={selectedRoom}
              onSelectRoom={switchRoom}
              onLeaveRoom={confirmLeaveRoom}
              // onStartDirectChat={onStartDirectChat}
              onAcceptInvite={handleAcceptInvite}
              onRejectInvite={handleRejectInvite}
            />
            <MessageArea
              selectedRoom={selectedRoom}
              messages={messages}
              matrixUserId={matrixUserId}
              newMessage={newMessage}
              sending={sending}
              propertyAddress={"propertyAddress"}
              // propertyAddress={getPropertyAddress()}
              onMessageChange={setNewMessage}
              onSendMessage={sendMessage}
              onLeaveRoom={() => selectedRoom && confirmLeaveRoom(selectedRoom)}
              onVideoCall={() => startCall(true)}
              onVoiceCall={() => startCall(false)}
            />
          </div>
        </div>
      )}

      {/* Leave Room Confirmation Modal */}
      <LeaveRoomModal
        show={showLeaveConfirm}
        room={roomToLeave}
        error={error}
        loading={leavingRoom}
        onClose={() => {
          setShowLeaveConfirm(false);
          setRoomToLeave(null);
          setError("");
        }}
        onConfirm={handleLeaveRoom}
      />
    </div>
  );
};

export default MatrixChat;