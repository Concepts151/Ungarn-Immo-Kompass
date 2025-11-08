"use client";
import React, { useEffect, useRef, useState } from "react";
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

const MatrixChat = () => {
  const { data: authUser } = useGetAuthUserQuery();

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRestoringSession, setIsRestoringSession] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Matrix state
  const [client, setClient] = useState<MatrixClientType | null>(null);
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
  const clientRef = useRef<MatrixClientType | null>(null);
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
  const loadMessages = async (room: any) => {
    if (!room) return;

    const timeline = room.getLiveTimeline();
    const events = timeline
      .getEvents()
      .filter((e: any) => e.getType() === "m.room.message");

    setMessages(events);
  };

  // Update rooms and invites from client
  const updateRoomsAndInvites = (matrixClient: MatrixClientType) => {
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
    setRooms(joinedRooms);
    setInvites(invitedRooms);
  };

  // Initialize WebRTC peer connection
  const createPeerConnection = () => {
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
  };

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
      callIdRef.current = `call_${Date.now()}`;
      console.log("Call ID:", callIdRef.current);

      // Get local stream
      console.log("Getting local media stream...");
      const stream = await getLocalStream(video);
      console.log("✅ Local media stream obtained");

      // Create peer connection
      console.log("Creating peer connection...");
      const pc = createPeerConnection();
      peerConnectionRef.current = pc;
      console.log("✅ Peer connection created:", !!peerConnectionRef.current);

      // Add local tracks to peer connection
      console.log("Adding local tracks...");
      stream.getTracks().forEach((track) => {
        console.log(`Adding ${track.kind} track`);
        pc.addTrack(track, stream);
      });

      // Create offer
      console.log("Creating offer...");
      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: video,
      });
      await pc.setLocalDescription(offer);
      console.log("✅ Local description set");

      // Get other user in room
      const members = selectedRoomRef.current.getJoinedMembers();
      const otherMember = members.find((m: any) => m.userId !== matrixUserId);

      if (otherMember) {
        const name = otherMember.name || otherMember.userId;
        console.log("Calling:", name);
        setRemoteName(name);
      }

      // Send invite via Matrix
      console.log("Sending call invite...");
      await client.sendEvent(callRoomIdRef.current, "m.call.invite", {
        call_id: callIdRef.current,
        version: 1,
        party_id: deviceId,
        lifetime: 60000,
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      });

      console.log("✅ Call invite sent successfully");
    } catch (error) {
      console.error("❌ Error starting call:", error);
      setError(
        `Failed to start call: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      handleHangup();
    }
  };

  // Answer incoming call
  const answerCall = async () => {
    // Diagnostic logging
    console.log("=== ANSWER CALL DIAGNOSTICS ===");
    console.log("Client exists:", !!client);
    console.log("Selected room exists:", !!selectedRoomRef.current);
    console.log("Call room ID:", callRoomIdRef.current);
    console.log("Device ID:", deviceId);
    console.log("Peer connection exists:", !!peerConnectionRef.current);
    console.log("Call ID:", callIdRef.current);
    console.log("Call state:", callState);
    console.log("Is video call:", isVideoCall);
    console.log("==============================");

    if (!client) {
      console.error("Cannot answer: no client");
      setError("Client not initialized. Please try again.");
      return;
    }

    if (!callRoomIdRef.current) {
      console.error("Cannot answer: no call room ID stored");
      setError("Call room not found. Please ask them to call again.");
      handleHangup();
      return;
    }

    if (!deviceId) {
      console.error("Cannot answer: no device ID");
      setError("Device ID missing. Please try logging in again.");
      return;
    }

    if (!peerConnectionRef.current) {
      console.error("Cannot answer: no peer connection");
      setError("Call connection lost. Please ask them to call again.");
      handleHangup();
      return;
    }

    try {
      console.log("Answering call...");
      setCallState("connecting");

      // Get the room from the stored room ID
      const callRoom = client.getRoom(callRoomIdRef.current);
      if (!callRoom) {
        console.error("Cannot find room:", callRoomIdRef.current);
        setError("Call room not found.");
        handleHangup();
        return;
      }

      // Get local stream
      console.log("Getting local media stream...");
      const stream = await getLocalStream(isVideoCall);
      console.log("Local media stream obtained");

      // Add local tracks to peer connection
      stream.getTracks().forEach((track) => {
        console.log("Adding track:", track.kind);
        peerConnectionRef.current!.addTrack(track, stream);
      });

      // Add any pending ICE candidates
      if (pendingCandidatesRef.current.length > 0) {
        console.log(
          `Adding ${pendingCandidatesRef.current.length} pending ICE candidates`
        );
        for (const candidate of pendingCandidatesRef.current) {
          try {
            await peerConnectionRef.current.addIceCandidate(
              new RTCIceCandidate(candidate)
            );
            console.log("Added pending ICE candidate");
          } catch (error) {
            console.error("Error adding pending ICE candidate:", error);
          }
        }
        pendingCandidatesRef.current = [];
      }

      // Create answer
      console.log("Creating answer...");
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);
      console.log("Local description set");

      // Send answer via Matrix using the stored room ID
      console.log("Sending answer to remote peer...");
      await client.sendEvent(callRoomIdRef.current, "m.call.answer", {
        call_id: callIdRef.current,
        version: 1,
        party_id: deviceId,
        answer: {
          type: answer.type,
          sdp: answer.sdp,
        },
      });

      console.log("✅ Call answered successfully");
    } catch (error) {
      console.error("Error answering call:", error);
      setError(
        `Failed to answer call: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      handleHangup();
    }
  };

  // Handle incoming call invite
  const handleCallInvite = async (event: any, room: any) => {
    console.log("📞 Incoming call invite");

    const content = event.getContent();
    const incomingCallId = content.call_id;

    // If we already have an active call, ignore this invite
    if (callIdRef.current && callState !== "idle" && callState !== "ended") {
      console.log("⚠️ Ignoring invite - already in a call");
      return;
    }

    try {
      console.log("Setting up incoming call...");
      callIdRef.current = incomingCallId;
      callRoomIdRef.current = room.roomId; // Store the room ID
      console.log("Room ID:", room.roomId);

      const offer = content.offer;

      // Create peer connection FIRST
      console.log("Creating peer connection...");
      const pc = createPeerConnection();
      peerConnectionRef.current = pc;
      console.log("✅ Peer connection created:", !!peerConnectionRef.current);

      // Set remote description
      console.log("Setting remote description...");
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      console.log("✅ Remote description set for incoming call");

      // Determine if it's video call
      const hasVideo = offer.sdp.includes("m=video");
      console.log(`Call type: ${hasVideo ? "Video" : "Audio"}`);
      setIsVideoCall(hasVideo);
      setIsVideoEnabled(hasVideo);

      // Get sender name
      const sender = event.getSender();
      console.log("Call from:", sender);
      setRemoteName(sender);

      // Show incoming call UI
      console.log("Showing incoming call UI...");
      setIsOutgoingCall(false);
      setCallState("calling");
      setShowVideoCall(true);
      console.log("✅ Incoming call setup complete");
    } catch (error) {
      console.error("❌ Error handling call invite:", error);
      setError("Failed to receive call");
      handleHangup();
    }
  };

  // Handle call answer
  const handleCallAnswer = async (event: any) => {
    const content = event.getContent();

    // Ignore if not our call
    if (content.call_id !== callIdRef.current) {
      console.log("Ignoring answer for different call");
      return;
    }

    if (!peerConnectionRef.current) {
      console.error(
        "No peer connection for answer - call may have been hung up"
      );
      return;
    }

    // Only process if we're the one who initiated the call
    if (!isOutgoingCallRef.current) {
      console.log("Ignoring answer - we didn't initiate this call");
      return;
    }

    console.log("Call answered by remote peer");

    try {
      const answer = content.answer;

      // Check if we're in the correct state
      if (peerConnectionRef.current.signalingState === "have-local-offer") {
        await peerConnectionRef.current.setRemoteDescription(
          new RTCSessionDescription(answer)
        );
        console.log("Remote description set successfully");

        // Add any pending ICE candidates
        for (const candidate of pendingCandidatesRef.current) {
          try {
            await peerConnectionRef.current.addIceCandidate(
              new RTCIceCandidate(candidate)
            );
            console.log("Added pending ICE candidate");
          } catch (error) {
            console.error("Error adding pending ICE candidate:", error);
          }
        }
        pendingCandidatesRef.current = [];
      } else {
        console.warn(
          "Received answer in wrong state:",
          peerConnectionRef.current.signalingState
        );
      }
    } catch (error) {
      console.error("Error handling call answer:", error);
    }
  };

  // Handle ICE candidates
  const handleCallCandidates = async (event: any) => {
    const content = event.getContent();

    // Ignore if not our call
    if (content.call_id !== callIdRef.current) {
      console.log("Ignoring candidates for different call");
      return;
    }

    const candidates = content.candidates;

    for (const candidate of candidates) {
      try {
        if (
          peerConnectionRef.current &&
          peerConnectionRef.current.remoteDescription
        ) {
          await peerConnectionRef.current.addIceCandidate(
            new RTCIceCandidate(candidate)
          );
          console.log("Added ICE candidate");
        } else {
          // Store candidates until remote description is set
          pendingCandidatesRef.current.push(candidate);
          console.log("Stored ICE candidate for later");
        }
      } catch (error) {
        console.error("Error adding ICE candidate:", error);
      }
    }
  };

  // Handle call hangup
  const handleHangup = () => {
    console.log("Hanging up call");

    // Send hangup event only if we have an active call
    if (
      client &&
      callRoomIdRef.current &&
      callIdRef.current &&
      callState !== "ended"
    ) {
      client
        .sendEvent(callRoomIdRef.current, "m.call.hangup", {
          call_id: callIdRef.current,
          version: 1,
          reason: "user_hangup",
        })
        .catch(console.error);
    }

    // Stop local stream
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    // Close peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    // Clear pending candidates
    pendingCandidatesRef.current = [];

    // Reset state
    setCallState("ended");
    setTimeout(() => {
      setShowVideoCall(false);
      setCallState("idle");
      setIsMuted(false);
      setIsVideoEnabled(true);
      setIsOutgoingCall(false);
      callIdRef.current = "";
      callRoomIdRef.current = ""; // Clear the room ID
    }, 2000);
  };

  // Handle incoming hangup
  const handleCallHangup = (event: any) => {
    const content = event.getContent();

    // Ignore if not our call
    if (content.call_id !== callIdRef.current) {
      console.log("Ignoring hangup for different call");
      return;
    }

    console.log("Remote user hung up");
    handleHangup();
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

  // Setup Matrix client listeners
  const setupClientListeners = (matrixClient: MatrixClientType) => {
    // Suppress RTC warnings
    const originalWarn = console.warn;
    const originalError = console.error;

    console.warn = (...args) => {
      const message = args.join(" ").toString();
      if (
        message.includes("MatrixRTCSessionManager") ||
        message.includes("unknown room") ||
        message.includes("Got room state event")
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };

    console.error = (...args) => {
      const message = args.join(" ").toString();
      if (
        message.includes("MatrixRTCSessionManager") ||
        message.includes("Got room state event")
      ) {
        return;
      }
      originalError.apply(console, args);
    };

    matrixClient.on("sync", async (state: string) => {
      setSyncState(state);
      if (state === "PREPARED") {
        console.log("✅ Client synced and ready");
        updateRoomsAndInvites(matrixClient);
      }
    });

    // Listen for new messages and timeline updates
    matrixClient.on(
      "Room.timeline",
      (event: any, room: any, toStartOfTimeline: boolean) => {
        // Only handle live events (not historical)
        if (toStartOfTimeline) return;

        const eventType = event.getType();

        // Handle call events
        if (eventType === "m.call.invite") {
          handleCallInvite(event, room); // Pass room to the handler
        } else if (eventType === "m.call.answer") {
          handleCallAnswer(event);
        } else if (eventType === "m.call.candidates") {
          handleCallCandidates(event);
        } else if (eventType === "m.call.hangup") {
          handleCallHangup(event);
        }

        // Update room list to show new message count
        updateRoomsAndInvites(matrixClient);

        // If the event is in the currently selected room, update messages
        if (
          room &&
          selectedRoomRef.current &&
          room.roomId === selectedRoomRef.current.roomId
        ) {
          loadMessages(room);
        }
      }
    );

    // Listen for membership changes (including invites)
    matrixClient.on("RoomMember.membership", (event: any, member: any) => {
      if (member.userId === matrixClient.getUserId()) {
        console.log("Membership changed:", member.membership);
        updateRoomsAndInvites(matrixClient);
      }
    });

    // Listen for room name changes
    matrixClient.on("Room.name", (room: any) => {
      updateRoomsAndInvites(matrixClient);
    });
  };

  // Restore session on mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        if (authUser) {
          //   const session = JSON.parse(savedSession);
          //   const { accessToken: token, userId, homeserver, deviceId: savedDeviceId } = session;
          if (!authUser?.matrix) {
            console.warn("Matrix info missing from authUser:", authUser);
            return; // or handle gracefully
          }
          // Use saved device ID or create new one
          const currentDeviceId = getOrCreateDeviceId();

          const sdk = await getMatrixSdk();
          const restoredClient = sdk.createClient({
            baseUrl:
              process.env.NEXT_PUBLIC_MATRIX_HOMESERVER ||
              "https://matrix.151.hu",
            accessToken: authUser.matrix?.matrixAccessToken,
            userId: authUser.matrix?.matrixUserId,
            deviceId: currentDeviceId,
          }) as MatrixClientType;

          setupClientListeners(restoredClient);
          await restoredClient.startClient();

          console.log("client", restoredClient);

          setClient(restoredClient);
          setMatrixUserId(authUser.matrix.matrixUserId);
          setAccessToken(authUser.matrix.matrixAccessToken);
          setDeviceId(currentDeviceId);
          setIsAuthenticated(true);

          // Update saved session with device ID
          //   if (!currentDeviceId) {
          //     localStorage.setItem(
          //       "real_estate_matrix_session",
          //       JSON.stringify({
          //         accessToken: token,
          //         userId,
          //         homeserver,
          //         deviceId: currentDeviceId,
          //       })
          //     );
          //   }
        }
      } catch (error) {
        console.error("Failed to restore session:", error);
        localStorage.removeItem("real_estate_matrix_session");
      } finally {
        setIsRestoringSession(false);
      }
    };

    restoreSession();
  }, [authUser]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (client) {
        client.stopClient();
        client.removeAllListeners();
      }
      // Cleanup call resources
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, [client]);

  // Handle authentication
  //   const handleAuth = async () => {
  //     if (!username || !password) {
  //       setError("Please fill in all fields");
  //       return;
  //     }

  //     if (authMode === "register" && password !== confirmPassword) {
  //       setError("Passwords don't match");
  //       return;
  //     }

  //     setLoading(true);
  //     setError("");

  //     try {
  //       const homeserver = getHomeserver();
  //       const sdk = await getMatrixSdk();
  //       const currentDeviceId = getOrCreateDeviceId();

  //       const tempClient = sdk.createClient({
  //         baseUrl: homeserver,
  //         deviceId: currentDeviceId,
  //       });

  //       let result;
  //       if (authMode === "register") {
  //         result = await tempClient.register(username, password);
  //       } else {
  //         result = await tempClient.login("m.login.password", {
  //           user: username,
  //           password: password,
  //           device_id: currentDeviceId,
  //         });
  //       }

  //       const authenticatedClient = sdk.createClient({
  //         baseUrl: homeserver,
  //         accessToken: result.access_token,
  //         userId: result.user_id,
  //         deviceId: result.device_id || currentDeviceId,
  //       }) as MatrixClientType;

  //       localStorage.setItem(
  //         "real_estate_matrix_session",
  //         JSON.stringify({
  //           accessToken: result.access_token,
  //           userId: result.user_id,
  //           homeserver,
  //           deviceId: result.device_id || currentDeviceId,
  //         })
  //       );

  //       setupClientListeners(authenticatedClient);
  //       await authenticatedClient.startClient();

  //       setClient(authenticatedClient);
  //       setMatrixUserId(result.user_id);
  //       setAccessToken(result.access_token);
  //       setDeviceId(result.device_id || currentDeviceId);
  //       setIsAuthenticated(true);
  //       setUsername("");
  //       setPassword("");
  //       setConfirmPassword("");
  //     } catch (err: any) {
  //       console.error("Auth error:", err);
  //       setError(err.message || "Authentication failed");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  // Handle logout
  const handleLogout = async () => {
    try {
      if (client) {
        await client.logout();
        client.stopClient();
        client.removeAllListeners();
      }
      localStorage.removeItem("real_estate_matrix_session");
      setClient(null);
      setIsAuthenticated(false);
      setMatrixUserId("");
      setAccessToken("");
      setDeviceId("");
      setRooms([]);
      setInvites([]);
      setSelectedRoom(null);
      setMessages([]);
      setIsChatOpen(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // Switch to a different room
  const switchRoom = async (room: any) => {
    setSelectedRoom(room);
    await loadMessages(room);
  };

  // Send a message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedRoom || !client) return;

    setSending(true);
    try {
      await client.sendTextMessage(selectedRoom.roomId, newMessage);
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    } finally {
      setSending(false);
    }
  };

  //   // Handle contact seller
  //   const handleContactSeller = async () => {
  //     if (!targetUserId.trim()) {
  //       setError("Please enter a seller username");
  //       return;
  //     }

  //     setCreatingRoom(true);
  //     setError("");

  //     try {
  //       const formattedUserId = formatUserId(targetUserId.trim(), getHomeserver());
  //       console.log("Creating room with seller:", formattedUserId);

  //       const roomName = selectedProperty
  //         ? `${selectedProperty.title}`
  //         : "Property Inquiry";
  //       const topic = selectedProperty
  //         ? `Discussion about ${selectedProperty.address}`
  //         : "Property discussion";

  //       const result = await createRoomViaAPI(
  //         accessToken,
  //         roomName,
  //         topic,
  //         formattedUserId,
  //         false
  //       );

  //       console.log("Room created:", result.roomId);

  //       setShowContactModal(false);
  //       setTargetUserId("");
  //       setIsChatOpen(true);

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

  //   setCreatingDirectChat(true);
  //   setError("");

  //   try {
  //     //   const formattedUserId = formatUserId(directChatUserId.trim(), getHomeserver());
  //     //   console.log("Creating direct chat with user:", formattedUserId);

  //     // Extract username for room name
  //     //   const username = extractUsername(directChatUserId.trim());
  //     const roomName = `Chat with ${username}`;
  //     const topic = `Direct conversation`;

  //     const result = await createRoomViaAPI(
  //       accessToken,
  //       roomName,
  //       topic,
  //       formattedUserId,
  //       true
  //     );

  //     console.log("Direct chat room created:", result.roomId);

  //     setShowDirectChatModal(false);
  //     setDirectChatUserId("");
  //     setIsChatOpen(true);

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
  return (
    <div className="chat_matrix_container">
      {!isChatOpen && (
        <button
          className="matrix_chat_Btn"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          <MessageCircle size={24} className="icon_msg" />
        </button>
      )}
      {isChatOpen && (
        <div className="matrix_chat_window">
          {/* chat window header */}
          <div className="matrix_chat_window_header_wrapper">
            <div className="">
              <h3 className="header_title">Messaging</h3>
            </div>
            <div className="">
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
