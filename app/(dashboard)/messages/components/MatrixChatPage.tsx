"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "../css/matrixchatpage.css";
import { 
  MessageCircle, 
  ArrowLeft, 
  Search, 
  MoreVertical,
  Menu,
  X,
  Phone,
  Video,
  Info,
  Settings,
  LogOut
} from "lucide-react";
import { useGetAuthUserQuery, useRegisterMatrixAccountMutation, useLookupMatrixUsersMutation } from "@/state/api";
import { useToggleModal } from "@/app/store";
import { getMatrixSdk } from "@/utils/matrixSdk";
import { MatrixClientType } from "@/types/index.t";
import { leaveRoomViaAPI } from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import RoomListPage from "./RoomListPage";
import MessageAreaPage from "./MessageAreaPage";
import LeaveRoomModal from "@/app/components/modals/LeaveRoomModal";
import VideoCallModal from "@/app/components/VideoCallModal";
// import LeaveRoomModal from "./modals/LeaveRoomModal";
// import VideoCallModal from "./VideoCallModal";

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
    matrixUserId: string | null;
    matrixPassword: string | null;
    createdAt: string;
    updatedAt: string;
  };
  userRole: "BUYER" | "SELLER" | "ADMIN";
  matrix: {
    matrixUserId: string;
    matrixAccessToken: string;
    matrixHomeserver: string;
  } | null;
}

const MatrixChatPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roomIdParam = searchParams.get('room');

  const { data: authUser, refetch: refetchAuthUser } = useGetAuthUserQuery() as { 
    data: AuthUser | undefined;
    refetch: () => void;
  };

  // RTK Query mutations
  const [registerMatrix, { isLoading: isRegistering }] = useRegisterMatrixAccountMutation();
  const [lookupUsers] = useLookupMatrixUsersMutation();

  // User cache - maps Matrix IDs to user details
  const [userCache, setUserCache] = useState<Record<string, MatrixUserInfo>>({});
  const fetchedIdsRef = useRef<Set<string>>(new Set());
  const isFetchingRef = useRef(false);

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

  // UI state
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobileView, setIsMobileView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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
  const [remoteAvatar, setRemoteAvatar] = useState<string | null>(null);
  const [isOutgoingCall, setIsOutgoingCall] = useState(false);

  // WebRTC refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const callIdRef = useRef<string>("");
  const callRoomIdRef = useRef<string>("");
  const pendingCandidatesRef = useRef<RTCIceCandidateInit[]>([]);
  const iceCandidateBuffer = useRef<RTCIceCandidateInit[]>([]);
  const iceCandidateTimeout = useRef<NodeJS.Timeout | null>(null);

  // Other refs
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

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileView(isMobile);
      if (!isMobile) {
        setShowSidebar(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hide sidebar on mobile when room is selected
  useEffect(() => {
    if (isMobileView && selectedRoom) {
      setShowSidebar(false);
    }
  }, [selectedRoom, isMobileView]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Open login modal
  const openLoginModal = () => {
    useToggleModal.setState({ isLoginModalOpen: true });
  };

  // Get or create device ID
  const getOrCreateDeviceId = () => {
    let storedDeviceId = localStorage.getItem("matrix_device_id");
    if (!storedDeviceId) {
      storedDeviceId = `WEB_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
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

    const msgs = events.map((e: any) => ({
      id: e.getId(),
      sender: e.getSender(),
      content: e.getContent().body,
      timestamp: e.getTs(),
      type: e.getContent().msgtype,
    }));

    setMessages(msgs);
  }, []);

  // Switch room
  const switchRoom = useCallback((room: any) => {
    setSelectedRoom(room);
    loadMessages(room);

    // Update URL with room ID
    if (room?.roomId) {
      router.push(`/messages?room=${encodeURIComponent(room.roomId)}`, { scroll: false });
    }
  }, [loadMessages, router]);

  // Back to room list (mobile)
  const handleBackToRooms = () => {
    setSelectedRoom(null);
    setShowSidebar(true);
    router.push('/messages', { scroll: false });
  };

  // Send message
  const sendMessage = async () => {
    if (!client || !selectedRoom || !newMessage.trim()) return;

    setSending(true);
    try {
      await client.sendMessage(selectedRoom.roomId, {
        msgtype: "m.text",
        body: newMessage.trim(),
      });
      setNewMessage("");
    } catch (err: any) {
      // Ignore abort errors
      if (err?.name === 'AbortError') return;
      console.error("Error sending message:", err);
      setError("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  // Leave room confirmation
  const confirmLeaveRoom = (room: any) => {
    setRoomToLeave(room);
    setShowLeaveConfirm(true);
  };

  // Handle leave room
  const handleLeaveRoom = async () => {
    if (!roomToLeave || !client || !accessToken) return;

    setLeavingRoom(true);
    setError("");

    try {
      await leaveRoomViaAPI(accessToken, roomToLeave.roomId);
      
      if (selectedRoom?.roomId === roomToLeave.roomId) {
        setSelectedRoom(null);
        setMessages([]);
      }

      setRooms((prev) => prev.filter((r) => r.roomId !== roomToLeave.roomId));
      setShowLeaveConfirm(false);
      setRoomToLeave(null);
    } catch (err: any) {
      // Ignore abort errors
      if (err?.name === 'AbortError') return;
      console.error("Error leaving room:", err);
      setError(err.message || "Failed to leave room");
    } finally {
      setLeavingRoom(false);
    }
  };

  // Accept invite
  const handleAcceptInvite = async (room: any) => {
    if (!client) return;

    try {
      await client.joinRoom(room.roomId);
      setInvites((prev) => prev.filter((r) => r.roomId !== room.roomId));
    } catch (err: any) {
      // Ignore abort errors
      if (err?.name === 'AbortError') return;
      console.error("Error accepting invite:", err);
    }
  };

  // Reject invite
  const handleRejectInvite = async (room: any) => {
    if (!client) return;

    try {
      await client.leave(room.roomId);
      setInvites((prev) => prev.filter((r) => r.roomId !== room.roomId));
    } catch (err: any) {
      // Ignore abort errors
      if (err?.name === 'AbortError') return;
      console.error("Error rejecting invite:", err);
    }
  };

  // Get user display name from cache
  const getUserDisplayName = useCallback((matrixId: string): string => {
    const cached = userCache[matrixId];
    if (cached?.fullName) return cached.fullName;
    
    // Fallback: extract name from Matrix ID (handle both @immo_ and @usert_ prefixes)
    const immoMatch = matrixId.match(/@immo_([^:]+):/);
    if (immoMatch) return immoMatch[1].substring(0, 8) + "...";
    
    const usertMatch = matrixId.match(/@usert_([^:]+):/);
    if (usertMatch) return usertMatch[1].substring(0, 8) + "...";
    
    return matrixId.split(":")[0].replace("@", "");
  }, [userCache]);

  // Get user avatar from cache
  const getUserAvatar = useCallback((matrixId: string): string | null => {
    return userCache[matrixId]?.avatarUrl || null;
  }, [userCache]);

  // Fetch user details for Matrix IDs
  const fetchUserDetails = useCallback(async (matrixIds: string[]) => {
    if (isFetchingRef.current) return;
    
    const newIds = matrixIds.filter(id => 
      !fetchedIdsRef.current.has(id) && 
      !userCache[id] &&
      (id.startsWith("@immo_") || id.startsWith("@usert_"))  // Support both prefixes
    );

    if (newIds.length === 0) return;

    isFetchingRef.current = true;
    newIds.forEach(id => fetchedIdsRef.current.add(id));

    console.log("🔍 Looking up Matrix users:", newIds);

    try {
      const result = await lookupUsers({ matrixUserIds: newIds }).unwrap();
      console.log("✅ User lookup result:", result);
      if (result?.users) {
        console.log("👤 Users found:", Object.keys(result.users));
        // Log avatar URLs for debugging
        Object.entries(result.users).forEach(([matrixId, user]: [string, any]) => {
          console.log(`   ${matrixId}: avatar = "${user.avatarUrl}"`);
        });
        setUserCache(prev => ({ ...prev, ...result.users }));
      }
    } catch (err: any) {
      // Ignore abort errors and cancelled requests
      if (err?.name === 'AbortError' || 
          err?.message?.includes('aborted') ||
          err?.message?.includes('cancelled') ||
          err?.name === 'CancelledError') {
        return;
      }
      console.error("Error fetching user details:", err);
    } finally {
      isFetchingRef.current = false;
    }
  }, [lookupUsers, userCache]);

  // Fetch user details when rooms change
  useEffect(() => {
    let isMounted = true;
    
    if (!rooms.length) return;

    const matrixIds: string[] = [];
    rooms.forEach(room => {
      try {
        const members = room.getJoinedMembers?.() || [];
        members.forEach((m: any) => {
          if (m.userId && !userCache[m.userId]) {
            matrixIds.push(m.userId);
          }
        });
      } catch (e) {}
    });

    if (matrixIds.length > 0 && isMounted) {
      fetchUserDetails(matrixIds);
    }
    
    return () => {
      isMounted = false;
    };
  }, [rooms, fetchUserDetails, userCache]);

  // Fetch user details when messages change
  useEffect(() => {
    let isMounted = true;
    
    if (!messages.length) return;

    const matrixIds = messages
      .map(m => m.sender)
      .filter(id => id && !userCache[id]);

    if (matrixIds.length > 0 && isMounted) {
      fetchUserDetails([...new Set(matrixIds)]);
    }
    
    return () => {
      isMounted = false;
    };
  }, [messages, fetchUserDetails, userCache]);

  // WebRTC: Create peer connection
  const createPeerConnection = useCallback(() => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    });

    pc.onicecandidate = (event) => {
      if (event.candidate && client && callRoomIdRef.current) {
        iceCandidateBuffer.current.push(event.candidate.toJSON());

        if (iceCandidateTimeout.current) {
          clearTimeout(iceCandidateTimeout.current);
        }

        iceCandidateTimeout.current = setTimeout(() => {
          if (iceCandidateBuffer.current.length > 0 && client && callRoomIdRef.current) {
            client.sendEvent(callRoomIdRef.current, "m.call.candidates", {
              call_id: callIdRef.current,
              version: 1,
              candidates: iceCandidateBuffer.current,
            }).catch((err: any) => console.warn("Failed to send candidates:", err));
            
            iceCandidateBuffer.current = [];
          }
        }, 500);
      }
    };

    pc.onconnectionstatechange = () => {
      console.log("Connection state:", pc.connectionState);
      if (pc.connectionState === "connected") {
        setCallState("connected");
      } else if (pc.connectionState === "failed" || pc.connectionState === "disconnected") {
        handleHangup();
      }
    };

    pc.ontrack = (event) => {
      console.log("Received remote track:", event.track.kind);
      if (remoteVideoRef.current && event.streams[0]) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    return pc;
  }, [client]);

  // Get local media stream
  const getLocalStream = async (video: boolean) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: video ? { width: 1280, height: 720 } : false,
    });

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }
    localStreamRef.current = stream;
    return stream;
  };

  // Start call
  const startCall = async (video: boolean) => {
    if (!client || !selectedRoomRef.current || !deviceId) {
      setError("Cannot start call - missing requirements");
      return;
    }

    try {
      callRoomIdRef.current = selectedRoomRef.current.roomId;

      // Get other participant's info (exclude admin)
      const members = selectedRoomRef.current.getJoinedMembers?.() || [];
      const otherMember = members.find((m: any) => {
        const memberId = m.userId || "";
        const isMe = memberId === matrixUserId;
        const isAdmin = memberId.toLowerCase().includes("admin");
        return !isMe && !isAdmin;
      });

      if (otherMember) {
        setRemoteName(getUserDisplayName(otherMember.userId));
        setRemoteAvatar(getUserAvatar(otherMember.userId));
      } else {
        setRemoteName("Unknown");
        setRemoteAvatar(null);
      }

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
    if (iceCandidateTimeout.current) {
      clearTimeout(iceCandidateTimeout.current);
      iceCandidateTimeout.current = null;
    }
    iceCandidateBuffer.current = [];

    if (client && callRoomIdRef.current && callIdRef.current) {
      client.sendEvent(callRoomIdRef.current, "m.call.hangup", {
        call_id: callIdRef.current,
        version: 1,
        reason: "user_hangup",
      }).catch((err: any) => console.warn("Failed to send hangup:", err));
    }

    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
      peerConnectionRef.current = null;
    }

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    setShowVideoCall(false);
    setCallState("idle");
    setIsOutgoingCall(false);
    setIsMuted(false);
    setIsVideoEnabled(true);
    setRemoteName("");
    setRemoteAvatar(null);
    callIdRef.current = "";
    callRoomIdRef.current = "";
    pendingCandidatesRef.current = [];
  };

  // Answer call
  const answerCall = async () => {
    if (!peerConnectionRef.current) return;

    try {
      setCallState("connecting");

      const stream = await getLocalStream(isVideoCall);
      stream.getTracks().forEach((track) => {
        peerConnectionRef.current?.addTrack(track, stream);
      });

      peerConnectionRef.current.ontrack = (event) => {
        if (remoteVideoRef.current && event.streams[0]) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };

      const answer = await peerConnectionRef.current.createAnswer();
      await peerConnectionRef.current.setLocalDescription(answer);

      if (client && callRoomIdRef.current) {
        await client.sendEvent(callRoomIdRef.current, "m.call.answer", {
          call_id: callIdRef.current,
          version: 1,
          answer: {
            type: answer.type,
            sdp: answer.sdp,
          },
        });
      }

      // Process pending candidates
      for (const candidate of pendingCandidatesRef.current) {
        try {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (e) {
          console.warn("Failed to add pending candidate:", e);
        }
      }
      pendingCandidatesRef.current = [];

    } catch (error) {
      console.error("Error answering call:", error);
      handleHangup();
    }
  };

  // Reject call
  const rejectCall = () => {
    if (client && callRoomIdRef.current && callIdRef.current) {
      client.sendEvent(callRoomIdRef.current, "m.call.hangup", {
        call_id: callIdRef.current,
        version: 1,
        reason: "user_rejected",
      }).catch((err: any) => console.warn("Failed to send reject:", err));
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

  // Handle call invite
  const handleCallInvite = useCallback(async (event: any) => {
    const content = event.getContent();
    const incomingCallId = content.call_id;
    const offer = content.offer;
    const roomId = event.getRoomId();
    const senderId = event.getSender();

    if (senderId === matrixUserId) return;
    if (callIdRef.current && callIdRef.current !== incomingCallId) return;

    const callerDisplayName = getUserDisplayName(senderId);
    const callerAvatar = getUserAvatar(senderId);

    callIdRef.current = incomingCallId;
    callRoomIdRef.current = roomId;
    setRemoteName(callerDisplayName);
    setRemoteAvatar(callerAvatar);
    setIsVideoCall(offer.sdp.includes("m=video"));
    setIsOutgoingCall(false);

    const pc = createPeerConnection();
    peerConnectionRef.current = pc;

    try {
      await pc.setRemoteDescription(new RTCSessionDescription({
        type: offer.type,
        sdp: offer.sdp,
      }));
    } catch (error) {
      console.error("Error setting remote description:", error);
      return;
    }

    setShowVideoCall(true);
    setCallState("calling");
  }, [createPeerConnection, matrixUserId, getUserDisplayName, getUserAvatar]);

  // Handle call answer
  const handleCallAnswer = useCallback(async (event: any) => {
    const content = event.getContent();
    const answer = content.answer;

    if (!peerConnectionRef.current || content.call_id !== callIdRef.current) return;
    if (!isOutgoingCallRef.current) return;

    try {
      await peerConnectionRef.current.setRemoteDescription(
        new RTCSessionDescription({
          type: answer.type,
          sdp: answer.sdp,
        })
      );

      for (const candidate of pendingCandidatesRef.current) {
        try {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (e) {
          console.warn("Failed to add pending candidate:", e);
        }
      }
      pendingCandidatesRef.current = [];

    } catch (error) {
      console.error("Error handling answer:", error);
    }
  }, []);

  // Handle ICE candidates
  const handleCallCandidates = useCallback(async (event: any) => {
    const content = event.getContent();
    const candidates = content.candidates;

    if (content.call_id !== callIdRef.current) return;

    for (const candidate of candidates) {
      if (peerConnectionRef.current?.remoteDescription) {
        try {
          await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (e) {
          console.warn("Failed to add ICE candidate:", e);
        }
      } else {
        pendingCandidatesRef.current.push(candidate);
      }
    }
  }, []);

  // Handle call hangup
  const handleCallHangup = useCallback((event: any) => {
    const content = event.getContent();
    if (content.call_id === callIdRef.current) {
      handleHangup();
    }
  }, []);

  // Initialize Matrix client
  useEffect(() => {
    let isMounted = true;
    let matrixClient: any = null;

    const initMatrix = async () => {
      if (!authUser) {
        if (isMounted) setIsRestoringSession(false);
        return;
      }

      // Check if user has Matrix credentials
      if (!authUser.matrix) {
        if (isMounted) {
          setNeedsMatrixAccount(true);
          setIsRestoringSession(false);
        }
        return;
      }

      try {
        if (isMounted) setLoading(true);
        const sdk = await getMatrixSdk();
        
        if (!isMounted) return; // Check if still mounted after async operation
        
        const storedDeviceId = getOrCreateDeviceId();

        matrixClient = sdk.createClient({
          baseUrl: getHomeserver(),
          accessToken: authUser.matrix.matrixAccessToken,
          userId: authUser.matrix.matrixUserId,
          deviceId: storedDeviceId,
        });

        if (!isMounted) {
          matrixClient.stopClient();
          return;
        }

        setClient(matrixClient);
        setMatrixUserId(authUser.matrix.matrixUserId);
        setAccessToken(authUser.matrix.matrixAccessToken);
        setDeviceId(storedDeviceId);
        setIsAuthenticated(true);

        // Set up event listeners
        matrixClient.on("Room.timeline", (event: any, room: any) => {
          if (!isMounted) return;
          
          if (event.getType() === "m.room.message") {
            if (selectedRoomRef.current?.roomId === room.roomId) {
              loadMessages(room);
            }
          }

          // Handle call events
          if (event.getType() === "m.call.invite") {
            handleCallInvite(event);
          } else if (event.getType() === "m.call.answer") {
            handleCallAnswer(event);
          } else if (event.getType() === "m.call.candidates") {
            handleCallCandidates(event);
          } else if (event.getType() === "m.call.hangup") {
            handleCallHangup(event);
          }
        });

        matrixClient.on("sync", (state: string) => {
          if (!isMounted) return;
          
          setSyncState(state);
          if (state === "PREPARED" || state === "SYNCING") {
            const allRooms = matrixClient.getRooms();
            const joinedRooms = allRooms.filter(
              (r: any) => r.getMyMembership() === "join"
            );
            const inviteRooms = allRooms.filter(
              (r: any) => r.getMyMembership() === "invite"
            );
            setRooms(joinedRooms);
            setInvites(inviteRooms);

            // Open room from URL parameter
            if (roomIdParam && !selectedRoomRef.current) {
              const targetRoom = joinedRooms.find((r: any) => r.roomId === roomIdParam);
              if (targetRoom) {
                switchRoom(targetRoom);
              }
            }
          }
        });

        await matrixClient.startClient({ initialSyncLimit: 20 });
      } catch (err: any) {
        // Ignore abort errors and cancelled requests
        if (err?.name === 'AbortError' || 
            err?.message?.includes('aborted') ||
            err?.message?.includes('cancelled') ||
            !isMounted) {
          return;
        }
        
        console.error("Matrix init error:", err);
        if (isMounted) setError("Failed to connect to chat");
      } finally {
        if (isMounted) {
          setLoading(false);
          setIsRestoringSession(false);
        }
      }
    };

    initMatrix();

    return () => {
      isMounted = false;
      
      // Stop the Matrix client
      if (matrixClient) {
        try {
          matrixClient.removeAllListeners();
          matrixClient.stopClient();
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
      
      if (clientRef.current && clientRef.current !== matrixClient) {
        try {
          clientRef.current.removeAllListeners();
          clientRef.current.stopClient();
        } catch (e) {
          // Ignore errors during cleanup
        }
      }
    };
  }, [authUser, roomIdParam]);
  // Register Matrix account
    const handleRegisterMatrix = async () => {
      if (!authUser?.user?.id) {
        setError("Not authenticated");
        return;
      }
  
      try {
        setLoading(true);
        await registerMatrix({ userId: authUser.user.id }).unwrap();
        await refetchAuthUser();
        setNeedsMatrixAccount(false);
      } catch (err: any) {
        // Ignore abort errors
        if (err?.name === 'AbortError' || 
            err?.message?.includes('aborted') ||
            err?.message?.includes('cancelled')) {
          return;
        }
        console.error("Matrix registration error:", err);
        setError("Failed to set up messaging");
      } finally {
        setLoading(false);
      }
    };

  // Filter rooms by search
  const filteredRooms = rooms.filter(room => {
    if (!searchQuery) return true;
    const roomName = room.name?.toLowerCase() || "";
    return roomName.includes(searchQuery.toLowerCase());
  });

  // Loading state
  if (isRestoringSession) {
    return (
      <div className="chat-page-loading">
        <div className="loading-spinner" />
        <p>Loading messages...</p>
      </div>
    );
  }

  // Not authenticated
  if (!authUser) {
    return (
      <div className="chat-page-auth">
        <div className="auth-content">
          <MessageCircle size={64} className="auth-icon" />
          <h2>Sign in to view messages</h2>
          <p>Connect with property sellers and manage your conversations</p>
          <button className="auth-btn" onClick={openLoginModal}>
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // Needs Matrix account
  if (needsMatrixAccount) {
    return (
      <div className="chat-page-auth">
        <div className="auth-content">
          <MessageCircle size={64} className="auth-icon" />
          <h2>Set up messaging</h2>
          <p>Enable messaging to connect with property sellers</p>
          <button 
            className="auth-btn" 
            onClick={handleRegisterMatrix}
            disabled={loading || isRegistering}
          >
            {loading || isRegistering ? "Setting up..." : "Enable Messaging"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-page">
      {/* Sidebar */}
      <aside className={`chat-sidebar ${showSidebar ? 'visible' : 'hidden'}`}>
        <div className="sidebar-header">
          <h1 className="sidebar-title">Messages</h1>
          <div className="sidebar-actions">
            {isMobileView && selectedRoom && (
              <button 
                className="sidebar-btn"
                onClick={() => setShowSidebar(false)}
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="sidebar-search">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Room List */}
        <RoomListPage
          rooms={filteredRooms}
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
      </aside>

      {/* Main Chat Area */}
      <main className={`chat-main ${!showSidebar || !isMobileView ? 'visible' : 'hidden'}`}>
        {selectedRoom ? (
          <MessageAreaPage
            selectedRoom={selectedRoom}
            messages={messages}
            matrixUserId={matrixUserId}
            newMessage={newMessage}
            sending={sending}
            onMessageChange={setNewMessage}
            onSendMessage={sendMessage}
            onLeaveRoom={() => confirmLeaveRoom(selectedRoom)}
            onVideoCall={() => startCall(true)}
            onVoiceCall={() => startCall(false)}
            onBack={handleBackToRooms}
            showBackButton={isMobileView}
            userCache={userCache}
            getUserDisplayName={getUserDisplayName}
            getUserAvatar={getUserAvatar}
          />
        ) : (
          <div className="chat-empty">
            <MessageCircle size={80} className="empty-icon" />
            <h2>Select a conversation</h2>
            <p>Choose a conversation from the list to start messaging</p>
          </div>
        )}
      </main>

      {/* Modals */}
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

      <VideoCallModal
        show={showVideoCall}
        isVideoCall={isVideoCall}
        callState={callState}
        isMuted={isMuted}
        isVideoEnabled={isVideoEnabled}
        isOutgoingCall={isOutgoingCall}
        remoteName={remoteName}
        remoteAvatar={remoteAvatar}
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

export default MatrixChatPage;