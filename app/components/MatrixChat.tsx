"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./css/matrixchat.css";
import { MessageCircle, X } from "lucide-react";
import { useGetAuthUserQuery, useRegisterMatrixAccountMutation, useLookupMatrixUsersMutation } from "@/state/api";
import { useToggleModal } from "@/app/store";
import { getMatrixSdk } from "@/utils/matrixSdk";
import { MatrixClientType } from "@/types/index.t";
import { leaveRoomViaAPI } from "@/utils/api";
import RoomList from "./RoomList";
import MessageArea from "./MessageArea";
import LeaveRoomModal from "./modals/LeaveRoomModal";
import VideoCallModal from "./VideoCallModal";

// Type for user details lookup
interface MatrixUserInfo {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl: string | null;
  role: string;
}

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
    matrixUserId: string | null;  // Can be null with lazy registration
    matrixPassword: string | null; // Can be null with lazy registration
    createdAt: string;
    updatedAt: string;
  };
  userRole: "BUYER" | "SELLER" | "ADMIN";
  matrix: {
    matrixUserId: string;
    matrixAccessToken: string;
    matrixHomeserver: string;
  } | null;  // Can be null if user doesn't have Matrix account yet
}

const MatrixChat = () => {
  const { data: authUser, refetch: refetchAuthUser } = useGetAuthUserQuery() as { 
    data: AuthUser | undefined;
    refetch: () => void;
  };

  // RTK Query mutation for lazy Matrix registration
  const [registerMatrix, { isLoading: isRegistering }] = useRegisterMatrixAccountMutation();
  
  // RTK Query mutation for looking up users by Matrix ID
  const [lookupUsers] = useLookupMatrixUsersMutation();

  // User cache - maps Matrix IDs to user details
  const [userCache, setUserCache] = useState<Record<string, MatrixUserInfo>>({});

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRestoringSession, setIsRestoringSession] = useState(true);
  const [needsMatrixAccount, setNeedsMatrixAccount] = useState(false);

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

  // Leave room modal state
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [roomToLeave, setRoomToLeave] = useState<any | null>(null);
  const [leavingRoom, setLeavingRoom] = useState(false);

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

  // Refs for event listeners
  const selectedRoomRef = useRef<any | null>(null);
  const clientRef = useRef<any | null>(null);
  const isOutgoingCallRef = useRef<boolean>(false);
  const prevInviteCountRef = useRef(0);

  // Update refs when state changes
  useEffect(() => {
    selectedRoomRef.current = selectedRoom;
  }, [selectedRoom]);

  useEffect(() => {
    clientRef.current = client;
  }, [client]);

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

  // Listen for openMatrixChat event from ContactSeller
  useEffect(() => {
    const handleOpenChat = (event: CustomEvent<{ roomId: string }>) => {
      console.log("📨 Received openMatrixChat event:", event.detail);
      setIsChatOpen(true);
      
      // If we have a specific room to open, find and select it
      if (event.detail?.roomId && client) {
        const targetRoom = rooms.find(r => r.roomId === event.detail.roomId);
        if (targetRoom) {
          switchRoom(targetRoom);
        } else {
          // Room might not be synced yet, wait a bit and try again
          setTimeout(() => {
            const allRooms = client.getRooms();
            const newRoom = allRooms.find((r: any) => r.roomId === event.detail.roomId);
            if (newRoom) {
              switchRoom(newRoom);
            }
          }, 2000);
        }
      }
    };

    window.addEventListener("openMatrixChat", handleOpenChat as EventListener);
    return () => {
      window.removeEventListener("openMatrixChat", handleOpenChat as EventListener);
    };
  }, [client, rooms]);

  // Open login modal via Zustand
  const openLoginModal = () => {
    useToggleModal.setState({ isLoginModalOpen: true });
  };

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
  const loadMessages = useCallback(async (room: any) => {
    if (!room) return;

    const timeline = room.getLiveTimeline();
    const events = timeline
      .getEvents()
      .filter((e: any) => e.getType() === "m.room.message");

    setMessages(events);
  }, []);

  // Update rooms and invites from client
  const updateRoomsAndInvites = useCallback((matrixClient: MatrixClientType) => {
    const allRooms = matrixClient.getRooms();

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
    
    // Check for new invites
    const previousInviteCount = prevInviteCountRef.current;
    const newInviteCount = invitedRooms.length;
    prevInviteCountRef.current = newInviteCount;
    
    // Show notification for new invites
    if (newInviteCount > previousInviteCount) {
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
    
    setRooms(joinedRooms);
    setInvites(invitedRooms);
  }, []);

  // Track which IDs we've already fetched to prevent duplicate requests
  const fetchedIdsRef = useRef<Set<string>>(new Set());
  const isFetchingRef = useRef(false);

  // Fetch user details for Matrix IDs not in cache
  const fetchUserDetails = useCallback(async (matrixUserIds: string[]) => {
    // Filter out IDs we already have in cache or already fetched
    const unknownIds = matrixUserIds.filter(
      id => !userCache[id] && !fetchedIdsRef.current.has(id)
    );
    
    if (unknownIds.length === 0 || isFetchingRef.current) return;

    // Mark these as being fetched
    unknownIds.forEach(id => fetchedIdsRef.current.add(id));
    isFetchingRef.current = true;

    console.log("🔍 Looking up user details for:", unknownIds);

    try {
      const result = await lookupUsers({ matrixUserIds: unknownIds }).unwrap();
      
      if (result.users) {
        setUserCache(prev => ({
          ...prev,
          ...result.users,
        }));
        console.log("✅ User cache updated:", Object.keys(result.users));
      }
    } catch (error) {
      console.error("Failed to lookup users:", error);
      // Remove failed IDs so they can be retried
      unknownIds.forEach(id => fetchedIdsRef.current.delete(id));
    } finally {
      isFetchingRef.current = false;
    }
  }, [lookupUsers]); // Removed userCache from dependencies

  // When rooms change, fetch user details for all participants
  useEffect(() => {
    if (rooms.length === 0) return;

    // Collect all unique Matrix user IDs from room members
    const allMatrixIds = new Set<string>();
    
    for (const room of rooms) {
      try {
        const members = room.getJoinedMembers?.() || [];
        for (const member of members) {
          if (member.userId) {
            allMatrixIds.add(member.userId);
          }
        }
      } catch (e) {
        // Ignore errors
      }
    }

    if (allMatrixIds.size > 0) {
      fetchUserDetails(Array.from(allMatrixIds));
    }
  }, [rooms, fetchUserDetails]);

  // Fetch user details for message senders (separate effect, runs less often)
  useEffect(() => {
    if (messages.length === 0) return;

    const senderIds = new Set<string>();
    for (const msg of messages) {
      const senderId = msg.getSender?.();
      if (senderId && !userCache[senderId] && !fetchedIdsRef.current.has(senderId)) {
        senderIds.add(senderId);
      }
    }

    if (senderIds.size > 0) {
      fetchUserDetails(Array.from(senderIds));
    }
  }, [messages, fetchUserDetails, userCache]);

  // Helper to get display name for a Matrix user ID
  const getUserDisplayName = useCallback((matrixUserId: string): string => {
    const cached = userCache[matrixUserId];
    if (cached) {
      return cached.fullName || `${cached.firstName} ${cached.lastName}`.trim();
    }
    // Fallback: extract username from Matrix ID (@immo_xxx:domain -> immo_xxx)
    return matrixUserId.split(":")[0].replace("@", "").replace("immo_", "");
  }, [userCache]);

  // Helper to get avatar URL for a Matrix user ID
  const getUserAvatar = useCallback((matrixUserId: string): string | null => {
    return userCache[matrixUserId]?.avatarUrl || null;
  }, [userCache]);

  // ICE candidate batching
  const iceCandidateBuffer = useRef<RTCIceCandidateInit[]>([]);
  const iceCandidateTimeout = useRef<NodeJS.Timeout | null>(null);

  // Send batched ICE candidates
  const sendBatchedCandidates = useCallback(() => {
    if (iceCandidateBuffer.current.length === 0) return;
    if (!clientRef.current || !selectedRoomRef.current) return;

    const candidates = [...iceCandidateBuffer.current];
    iceCandidateBuffer.current = [];

    console.log(`📤 Sending ${candidates.length} batched ICE candidates`);

    clientRef.current.sendEvent(
      selectedRoomRef.current.roomId,
      "m.call.candidates",
      {
        call_id: callIdRef.current,
        candidates: candidates,
        version: 1,
      }
    ).catch((err: any) => {
      console.warn("Failed to send ICE candidates:", err);
    });
  }, []);

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
      if (event.candidate) {
        // Buffer the candidate instead of sending immediately
        iceCandidateBuffer.current.push(event.candidate.toJSON());

        // Clear existing timeout
        if (iceCandidateTimeout.current) {
          clearTimeout(iceCandidateTimeout.current);
        }

        // Send batched candidates after 500ms of no new candidates
        iceCandidateTimeout.current = setTimeout(() => {
          sendBatchedCandidates();
        }, 500);
      } else {
        // No more candidates - send any remaining buffered ones
        if (iceCandidateTimeout.current) {
          clearTimeout(iceCandidateTimeout.current);
        }
        sendBatchedCandidates();
      }
    };

    pc.ontrack = (event) => {
      console.log("📹 ontrack event - track kind:", event.track.kind, "readyState:", event.track.readyState);
      console.log("📹 Streams count:", event.streams.length);
      
      if (event.streams && event.streams[0]) {
        const remoteStream = event.streams[0];
        console.log("📹 Remote stream tracks:", remoteStream.getTracks().map(t => `${t.kind}:${t.readyState}`));
        
        // Use setTimeout to ensure the video element is mounted
        setTimeout(() => {
          if (remoteVideoRef.current) {
            console.log("📹 Setting remote video srcObject");
            remoteVideoRef.current.srcObject = remoteStream;
            
            // Force play
            remoteVideoRef.current.play().catch(e => {
              console.warn("Auto-play failed:", e);
            });
          } else {
            console.warn("📹 remoteVideoRef is not available");
          }
        }, 100);
      }
    };

    pc.onconnectionstatechange = () => {
      console.log("🔗 Connection state:", pc.connectionState);
      if (pc.connectionState === "connected") {
        setCallState("connected");
        
        // Double-check remote stream when connected
        setTimeout(() => {
          const receivers = pc.getReceivers();
          receivers.forEach(receiver => {
            if (receiver.track && receiver.track.kind === "video") {
              console.log("📹 Found video receiver, track readyState:", receiver.track.readyState);
              const streams = (receiver as any).streams || [];
              if (streams.length > 0 && remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = streams[0];
              }
            }
          });
        }, 500);
      } else if (
        pc.connectionState === "disconnected" ||
        pc.connectionState === "failed"
      ) {
        handleHangup();
      }
    };

    pc.oniceconnectionstatechange = () => {
      console.log("🧊 ICE connection state:", pc.iceConnectionState);
    };

    pc.onsignalingstatechange = () => {
      console.log("📡 Signaling state:", pc.signalingState);
    };

    return pc;
  }, [sendBatchedCandidates]);

  // Get local media stream
  const getLocalStream = async (video: boolean) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: video ? { width: 1280, height: 720 } : false,
      audio: true,
    });

    localStreamRef.current = stream;

    if (localVideoRef.current && video) {
      localVideoRef.current.srcObject = stream;
    }

    return stream;
  };

  // Start outgoing call
  const startCall = async (video: boolean) => {
    if (!client || !selectedRoomRef.current || !deviceId) {
      setError("Cannot start call - missing requirements");
      return;
    }

    try {
      callRoomIdRef.current = selectedRoomRef.current.roomId;
      setIsVideoCall(video);
      setIsVideoEnabled(video);
      setShowVideoCall(true);
      setCallState("connecting");
      setIsOutgoingCall(true);

      const newCallId = `call_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      callIdRef.current = newCallId;

      const stream = await getLocalStream(video);
      const pc = createPeerConnection();
      peerConnectionRef.current = pc;

      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: video,
      });

      await pc.setLocalDescription(offer);

      await client.sendEvent(selectedRoomRef.current.roomId, "m.call.invite", {
        call_id: callIdRef.current,
        version: 1,
        lifetime: 60000,
        offer: {
          type: offer.type,
          sdp: offer.sdp,
        },
      });

      setCallState("calling");
    } catch (error) {
      console.error("Error starting call:", error);
      setError("Failed to start call");
      handleHangup();
    }
  };

  // Handle hangup
  const handleHangup = () => {
    // Clear ICE candidate batching timeout
    if (iceCandidateTimeout.current) {
      clearTimeout(iceCandidateTimeout.current);
      iceCandidateTimeout.current = null;
    }
    iceCandidateBuffer.current = [];

    // Send hangup event to Matrix
    if (client && callRoomIdRef.current && callIdRef.current) {
      client.sendEvent(callRoomIdRef.current, "m.call.hangup", {
        call_id: callIdRef.current,
        version: 1,
        reason: "user_hangup",
      }).catch((err: any) => {
        console.warn("Failed to send hangup event:", err);
      });
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = null;
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = null;
    }

    setShowVideoCall(false);
    setCallState("idle");
    setIsOutgoingCall(false);
    setIsMuted(false);
    setIsVideoEnabled(true);
    setRemoteName("");
    callIdRef.current = "";
    callRoomIdRef.current = "";
    pendingCandidatesRef.current = [];
  };

  // Answer incoming call
  const answerCall = async () => {
    if (!peerConnectionRef.current) {
      console.error("No peer connection to answer");
      return;
    }

    try {
      setCallState("connecting");

      // Get local media
      const stream = await getLocalStream(isVideoCall);

      // Add local tracks to peer connection
      stream.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, stream);
      });

      // Set up ontrack handler BEFORE creating answer to catch remote tracks
      peerConnectionRef.current.ontrack = (event) => {
        console.log("📹 Received remote track:", event.track.kind);
        if (remoteVideoRef.current && event.streams[0]) {
          console.log("Setting remote video stream");
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      // Check if we already have remote tracks (from the offer)
      const receivers = peerConnectionRef.current.getReceivers();
      console.log(`Found ${receivers.length} receivers`);
      
      // Create answer
      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);

      // Send answer to Matrix room
      if (client && callRoomIdRef.current) {
        await client.sendEvent(callRoomIdRef.current, "m.call.answer", {
          call_id: callIdRef.current,
          version: 1,
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        });

        console.log("✅ Call answered");

        // Process any pending ICE candidates
        if (pendingCandidatesRef.current.length > 0) {
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
      setError("Failed to answer call");
      handleHangup();
    }
  };

  // Reject incoming call
  const rejectCall = async () => {
    if (client && callRoomIdRef.current && callIdRef.current) {
      try {
        await client.sendEvent(callRoomIdRef.current, "m.call.hangup", {
          call_id: callIdRef.current,
          version: 1,
          reason: "user_hangup",
        });
      } catch (error) {
        console.error("Error sending reject:", error);
      }
    }

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

  // Handle call events
  const handleCallInvite = useCallback(
    async (event: any) => {
      const content = event.getContent();
      const incomingCallId = content.call_id;
      const offer = content.offer;
      const roomId = event.getRoomId();
      const senderId = event.getSender();

      // Ignore our own call invites
      if (senderId === matrixUserId) {
        console.log("Ignoring our own call invite");
        return;
      }

      // Ignore if we're already in a call
      if (callIdRef.current && callIdRef.current !== incomingCallId) {
        console.log("Ignoring call invite - already in a call");
        return;
      }

      console.log("📞 Incoming call from:", senderId);

      const room = clientRef.current?.getRoom(roomId);
      let callerName = room?.name || "Unknown Room";

      // Try to get caller's display name
      try {
        const callerMember = room?.getMember(senderId);
        if (callerMember?.name) {
          callerName = callerMember.name;
        }
      } catch (e) {
        // Ignore
      }

      callIdRef.current = incomingCallId;
      callRoomIdRef.current = roomId;
      setRemoteName(callerName);
      setIsVideoCall(offer.sdp.includes("m=video"));
      setIsOutgoingCall(false);

      const pc = createPeerConnection();
      peerConnectionRef.current = pc;

      try {
        await pc.setRemoteDescription(
          new RTCSessionDescription({
            type: offer.type,
            sdp: offer.sdp,
          })
        );
        console.log("✅ Remote offer set, ready to answer");
      } catch (error) {
        console.error("Error setting remote description:", error);
        return;
      }

      setShowVideoCall(true);
      setCallState("calling");
    },
    [createPeerConnection, matrixUserId]
  );

  const handleCallAnswer = useCallback(async (event: any) => {
    const content = event.getContent();
    const answer = content.answer;

    // Only process if we're the caller (outgoing call) and call IDs match
    if (!peerConnectionRef.current || content.call_id !== callIdRef.current) {
      return;
    }

    // Check if we're the one who sent the offer (outgoing call)
    // If we're the receiver, we should ignore the answer event (it's our own answer being echoed back)
    if (!isOutgoingCallRef.current) {
      console.log("Ignoring answer event - we're the receiver, not the caller");
      return;
    }

    // Check peer connection state - should be "have-local-offer"
    const signalingState = peerConnectionRef.current.signalingState;
    if (signalingState !== "have-local-offer") {
      console.log(`Ignoring answer - wrong signaling state: ${signalingState}`);
      return;
    }

    try {
      console.log("📞 Processing call answer...");
      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription({
          type: answer.type,
          sdp: answer.sdp,
        })
      );
      console.log("✅ Remote description set from answer");

      // Process any pending ICE candidates
      if (pendingCandidatesRef.current.length > 0) {
        console.log(`Processing ${pendingCandidatesRef.current.length} pending ICE candidates`);
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
  }, []);

  const handleCallCandidates = useCallback(async (event: any) => {
    const content = event.getContent();

    if (content.call_id !== callIdRef.current) return;

    if (!peerConnectionRef.current || !peerConnectionRef.current.remoteDescription) {
      pendingCandidatesRef.current.push(...content.candidates);
      return;
    }

    for (const candidate of content.candidates) {
      try {
        await peerConnectionRef.current.addIceCandidate(
          new RTCIceCandidate(candidate)
        );
      } catch (error) {
        console.error("Error adding ICE candidate:", error);
      }
    }
  }, []);

  const handleCallHangup = useCallback((event: any) => {
    const content = event.getContent();
    if (content.call_id === callIdRef.current) {
      setCallState("ended");
      setTimeout(() => {
        handleHangup();
      }, 2000);
    }
  }, []);

  // Switch room and mark as read
  const switchRoom = (room: any) => {
    setSelectedRoom(room);
    loadMessages(room);
    
    // Send read receipt for the last message in the room
    if (client && room) {
      try {
        const timeline = room.getLiveTimeline?.();
        if (timeline) {
          const events = timeline.getEvents?.() || [];
          const messages = events.filter(
            (e: any) => e.getType?.() === "m.room.message"
          );
          
          if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            // Send read receipt
            client.sendReadReceipt(lastMessage).catch((err: any) => {
              console.warn("Failed to send read receipt:", err);
            });
            
            // Also set the read marker (the line that shows "new messages below")
            client.setRoomReadMarkers(room.roomId, lastMessage.getId()).catch((err: any) => {
              console.warn("Failed to set read marker:", err);
            });
          }
        }
      } catch (err) {
        console.warn("Error marking room as read:", err);
      }
    }
  };

  // Send message
  const sendMessage = async () => {
    if (!client || !selectedRoom || !newMessage.trim()) return;

    setSending(true);
    try {
      await client.sendTextMessage(selectedRoom.roomId, newMessage.trim());
      setNewMessage("");

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

    setClient(null);
    setIsAuthenticated(false);
    setMatrixUserId("");
    setAccessToken("");
    setDeviceId("");
    setRooms([]);
    setInvites([]);
    setSelectedRoom(null);
    setMessages([]);

    localStorage.removeItem("matrix_user_id");
    localStorage.removeItem("matrix_access_token");
    localStorage.removeItem("matrix_device_id");
  };

  // Set up Matrix event listeners
  const setupEventListeners = useCallback(
    (matrixClient: MatrixClientType) => {
      const timelineHandler = (event: any, room: any) => {
        // Ignore events for rooms we don't know about
        // This prevents the MatrixRTCSessionManager error
        if (!room) {
          return;
        }

        const eventType = event.getType();
        const roomId = event.getRoomId();

        // Double-check the room exists in our client state
        const knownRoom = (matrixClient as any).getRoom(roomId);
        if (!knownRoom) {
          return;
        }

        if (eventType === "m.room.message") {
          if (selectedRoomRef.current && roomId === selectedRoomRef.current.roomId) {
            loadMessages(selectedRoomRef.current);
          }
        }

        if (eventType === "m.call.invite") {
          handleCallInvite(event);
        } else if (eventType === "m.call.answer") {
          handleCallAnswer(event);
        } else if (eventType === "m.call.candidates") {
          handleCallCandidates(event);
        } else if (eventType === "m.call.hangup") {
          handleCallHangup(event);
        }
      };

      const membershipHandler = () => {
        updateRoomsAndInvites(matrixClient);
      };

      const myMembershipHandler = () => {
        updateRoomsAndInvites(matrixClient);
      };

      const roomHandler = (room: any) => {
        // Only process if room is valid
        if (room && room.roomId) {
          updateRoomsAndInvites(matrixClient);
        }
      };

      const syncHandler = (state: string) => {
        setSyncState(state);

        if (state === "PREPARED" || state === "SYNCING") {
          updateRoomsAndInvites(matrixClient);
        }
      };

      // Handle RoomState.events separately to catch and ignore unknown room errors
      const roomStateHandler = (event: any, roomState: any) => {
        // Silently ignore - this handler exists to prevent unhandled events
        // The actual room state is handled by other listeners
      };

      matrixClient.on("Room.timeline" as any, timelineHandler);
      matrixClient.on("RoomMember.membership" as any, membershipHandler);
      matrixClient.on("Room.myMembership" as any, myMembershipHandler);
      matrixClient.on("Room" as any, roomHandler);
      matrixClient.on("sync" as any, syncHandler);
      matrixClient.on("RoomState.events" as any, roomStateHandler);

      return () => {
        (matrixClient as any).off("Room.timeline" as any, timelineHandler);
        (matrixClient as any).off("RoomMember.membership" as any, membershipHandler);
        (matrixClient as any).off("Room.myMembership" as any, myMembershipHandler);
        (matrixClient as any).off("Room" as any, roomHandler);
        (matrixClient as any).off("sync" as any, syncHandler);
        (matrixClient as any).off("RoomState.events" as any, roomStateHandler);
      };
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
      const cleanupListeners = setupEventListeners(client);

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
        if (cleanupListeners) {
          cleanupListeners();
        }
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
      if (isAuthenticated) {
        setIsRestoringSession(false);
        return;
      }

      // If no authUser yet, wait
      if (!authUser) {
        setIsRestoringSession(false);
        return;
      }

      // Check if user has Matrix credentials
      if (!authUser.matrix?.matrixUserId || !authUser.matrix?.matrixAccessToken) {
        console.log("⚠️ User doesn't have Matrix account yet (lazy registration)");
        setNeedsMatrixAccount(true);
        setIsRestoringSession(false);
        return;
      }

      try {
        console.log("🔐 Connecting to Matrix using backend credentials...");
        setLoading(true);
        
        const sdk = await getMatrixSdk();
        const homeserverUrl = authUser.matrix.matrixHomeserver || getHomeserver();
        const storedDeviceId = getOrCreateDeviceId();

        const authenticatedClient = sdk.createClient({
          baseUrl: homeserverUrl,
          accessToken: authUser.matrix.matrixAccessToken,
          userId: authUser.matrix.matrixUserId,
          deviceId: storedDeviceId,
          useAuthorizationHeader: true,
        });

        setMatrixUserId(authUser.matrix.matrixUserId);
        setAccessToken(authUser.matrix.matrixAccessToken);
        setDeviceId(storedDeviceId);

        localStorage.setItem("matrix_user_id", authUser.matrix.matrixUserId);
        localStorage.setItem("matrix_access_token", authUser.matrix.matrixAccessToken);
        localStorage.setItem("matrix_device_id", storedDeviceId);
        localStorage.setItem("matrix_homeserver", homeserverUrl);

        setClient(authenticatedClient);
        setIsAuthenticated(true);
        setNeedsMatrixAccount(false);

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

  // Handle Matrix registration for users without accounts
  const handleRegisterMatrix = async () => {
    if (!authUser?.user?.id) return;

    try {
      setLoading(true);
      setError("");

      const result = await registerMatrix({ userId: authUser.user.id }).unwrap();

      if (result.success) {
        console.log("✅ Matrix account created, refreshing auth...");
        // Refetch auth user to get new Matrix credentials
        refetchAuthUser();
        setNeedsMatrixAccount(false);
      }
    } catch (err: any) {
      console.error("Matrix registration error:", err);
      setError(err.data?.error || "Failed to create Matrix account");
    } finally {
      setLoading(false);
    }
  };

  // Accept room invite
  const handleAcceptInvite = async (roomId: string) => {
    if (!client) return;

    try {
      await client.joinRoom(roomId);
      setTimeout(() => {
        updateRoomsAndInvites(client);
      }, 200);
    } catch (err: any) {
      console.error("Failed to accept invite:", err);
      setError(err.message || "Failed to accept invite");
    }
  };

  // Reject room invite
  const handleRejectInvite = async (roomId: string) => {
    if (!client) return;

    try {
      await client.leave(roomId);
      setTimeout(() => {
        updateRoomsAndInvites(client);
      }, 200);
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
    } catch (err: any) {
      console.error("Leave room error:", err);
      setError(err.message || "Failed to leave room");
    } finally {
      setLeavingRoom(false);
    }
  };

  // ============================================
  // RENDER
  // ============================================

  // Loading state
  if (isRestoringSession || loading) {
    return (
      <div className="chat_matrix_container">
        <button className="matrix_chat_Btn" disabled>
          <MessageCircle size={24} className="icon_msg" />
        </button>
      </div>
    );
  }

  // Not logged in to platform
  if (!authUser) {
    return (
      <div className="chat_matrix_container">
        <button
          className="matrix_chat_Btn"
          onClick={() => {
            setIsChatOpen(!isChatOpen);
          }}
        >
          <MessageCircle size={24} className="icon_msg" />
        </button>
        
        {isChatOpen && (
          <div className="matrix_chat_window">
            <div className="matrix_chat_window_header_wrapper">
              <h3 className="header_title">Messaging</h3>
              <button
                className="matrix_chat_close_Btn"
                onClick={() => setIsChatOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: "20px", textAlign: "center" }}>
              <p style={{ marginBottom: "15px" }}>Please log in to use chat.</p>
              <button
                onClick={openLoginModal}
                className="vl-btn1"
                style={{ width: "100%" }}
              >
                Log In
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // User needs Matrix account (lazy registration)
  if (needsMatrixAccount && !isAuthenticated) {
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
              <h3 className="header_title">Messaging</h3>
              <button
                className="matrix_chat_close_Btn"
                onClick={() => setIsChatOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: "20px", textAlign: "center" }}>
              <p style={{ marginBottom: "15px" }}>
                Set up messaging to chat with sellers and buyers.
              </p>
              <button
                onClick={handleRegisterMatrix}
                disabled={isRegistering}
                className="vl-btn1"
                style={{ 
                  width: "100%",
                  opacity: isRegistering ? 0.6 : 1,
                }}
              >
                {isRegistering ? "Setting up..." : "Enable Messaging"}
              </button>
              {error && (
                <div
                  style={{
                    padding: "10px",
                    marginTop: "15px",
                    backgroundColor: "#fee",
                    color: "#c00",
                    borderRadius: "4px",
                    fontSize: "14px",
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

  // Matrix connection error
  if (!isAuthenticated && error) {
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
              <h3 className="header_title">Connection Error</h3>
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
                Unable to connect to chat. Please try refreshing the page.
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
              onAcceptInvite={handleAcceptInvite}
              onRejectInvite={handleRejectInvite}
              matrixClient={client}
              userCache={userCache}
              getUserDisplayName={getUserDisplayName}
              getUserAvatar={getUserAvatar}
            />
            <MessageArea
              selectedRoom={selectedRoom}
              messages={messages}
              matrixUserId={matrixUserId}
              newMessage={newMessage}
              sending={sending}
              propertyAddress={"propertyAddress"}
              onMessageChange={setNewMessage}
              onSendMessage={sendMessage}
              onLeaveRoom={() => selectedRoom && confirmLeaveRoom(selectedRoom)}
              onVideoCall={() => startCall(true)}
              onVoiceCall={() => startCall(false)}
              userCache={userCache}
              getUserDisplayName={getUserDisplayName}
              getUserAvatar={getUserAvatar}
            />
          </div>
        </div>
      )}

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

      {/* Video/Voice Call Modal */}
      <VideoCallModal
        show={showVideoCall}
        isVideoCall={isVideoCall}
        callState={callState}
        isMuted={isMuted}
        isVideoEnabled={isVideoEnabled}
        isOutgoingCall={isOutgoingCall}
        remoteName={remoteName}
        localVideoRef={localVideoRef}
        remoteVideoRef={remoteVideoRef}
        onAnswer={answerCall}
        onReject={rejectCall}
        onHangup={handleHangup}
        onToggleMute={toggleMute}
        onToggleVideo={toggleVideo}
      />
    </div>
  );
};

export default MatrixChat;