"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./css/matrixchat.css";
import { MessageCircle, X } from "lucide-react";
import { useGetAuthUserQuery, useRegisterMatrixAccountMutation, useLookupMatrixUsersMutation, useNotifyNewMatrixMessageMutation } from "@/state/api";
import { useToggleModal } from "@/app/store";
import { getMatrixSdk } from "@/utils/matrixSdk";
import { MatrixClientType } from "@/types/index.t";
import { leaveRoomViaAPI } from "@/utils/api";
import RoomList from "./RoomList";
import MessageArea from "./MessageArea";
import LeaveRoomModal from "./modals/LeaveRoomModal";
import VideoCallModal from "./VideoCallModal";

// Suppress MatrixRTC errors globally - these are harmless timing issues during sync
if (typeof window !== 'undefined') {
  const originalConsoleError = console.error;
  console.error = (...args: any[]) => {
    const message = args[0]?.toString() || '';
    // Suppress MatrixRTC "unknown room" errors - these occur during initial sync and are harmless
    if (message.includes('MatrixRTCSessionManager') && message.includes('unknown room')) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
}

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

  // RTK Query mutation to notify backend of new messages (for emails)
  const [notifyNewMessage] = useNotifyNewMatrixMessageMutation();

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
  const [remoteAvatar, setRemoteAvatar] = useState<string | null>(null);
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
  const autoAcceptAttemptedRef = useRef<Set<string>>(new Set());
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
    const handleOpenChat = async (event: CustomEvent<{ roomId: string }>) => {
      console.log("📨 Received openMatrixChat event:", event.detail);
      setIsChatOpen(true);

      // If we have a specific room to open, find and select it
      if (event.detail?.roomId && client) {
        const targetRoomId = event.detail.roomId;
        console.log('[MatrixChat] Looking for room:', targetRoomId);
        console.log('[MatrixChat] Matrix client sync state:', client.getSyncState());
        console.log('[MatrixChat] Current rooms count:', rooms.length);
        console.log('[MatrixChat] Current invites count:', invites.length);

        // Check if client is synced
        const syncState = client.getSyncState();
        if (syncState !== 'SYNCING' && syncState !== 'PREPARED') {
          console.log('[MatrixChat] Client not synced yet, waiting for sync...');

          // Wait for sync to complete
          const waitForSync = new Promise<void>((resolve) => {
            const syncHandler = (state: string) => {
              console.log('[MatrixChat] Sync state changed to:', state);
              if (state === 'SYNCING' || state === 'PREPARED') {
                client.off('sync', syncHandler);
                resolve();
              }
            };

            client.on('sync', syncHandler);

            // Timeout after 10 seconds
            setTimeout(() => {
              client.off('sync', syncHandler);
              resolve();
            }, 10000);
          });

          await waitForSync;
          console.log('[MatrixChat] Sync completed, proceeding to find room');
        }

        // Force an update of rooms and invites first
        console.log('[MatrixChat] Forcing room/invite update before search');
        updateRoomsAndInvites(client);

        // Small delay to let state update
        setTimeout(() => {
          const targetRoom = rooms.find(r => r.roomId === targetRoomId);
          if (targetRoom) {
            console.log('[MatrixChat] Found room immediately, switching to it');
            switchRoom(targetRoom);
          } else {
            console.log('[MatrixChat] Room not in current list, checking all rooms from client');

            // Try to find in all client rooms (including invites)
            const allRooms = client.getRooms();
            console.log('[MatrixChat] All client rooms:', allRooms.length);
            console.log('[MatrixChat] All client rooms IDs:', allRooms.map((r: any) => r.roomId));

            const foundRoom = allRooms.find((r: any) => r.roomId === targetRoomId);
            if (foundRoom) {
              const membership = foundRoom.getMyMembership();
              console.log('[MatrixChat] Found room in client, membership:', membership);

              if (membership === 'invite') {
                console.log('[MatrixChat] Room is an invite, auto-accepting...');
                // Auto-accept the invite immediately
                handleAcceptInvite(targetRoomId).then(() => {
                  console.log('[MatrixChat] Invite auto-accepted, updating UI');
                  updateRoomsAndInvites(client);

                  // Wait for Matrix sync to complete and room to appear as joined
                  const checkJoinedRoom = (attempts: number = 0) => {
                    const joinedRoom = client.getRooms().find((r: any) => r.roomId === targetRoomId);
                    if (joinedRoom && joinedRoom.getMyMembership() === 'join') {
                      console.log('[MatrixChat] Switching to newly joined room');
                      switchRoom(joinedRoom);
                      setIsChatOpen(true);
                    } else if (attempts < 5) {
                      // Try again in 1 second, up to 5 attempts (5 seconds total)
                      console.log(`[MatrixChat] Room not yet joined, retrying... (attempt ${attempts + 1}/5)`);
                      setTimeout(() => checkJoinedRoom(attempts + 1), 1000);
                    } else {
                      console.warn('[MatrixChat] Room not showing as joined yet, but will appear when sync completes');
                      // Still open the chat widget - the room will appear when sync completes
                      setIsChatOpen(true);
                    }
                  };

                  setTimeout(() => checkJoinedRoom(), 1000);
                }).catch((err) => {
                  console.error('[MatrixChat] Failed to auto-accept invite:', err);
                  setError('Failed to join room. Please try again.');
                });
              } else if (membership === 'join') {
                console.log('[MatrixChat] Room is joined, switching to it');
                switchRoom(foundRoom);
              } else {
                console.log('[MatrixChat] Unexpected membership state:', membership);
                console.log('[MatrixChat] Trying to join anyway...');
                // Try to join the room regardless
                client.joinRoom(targetRoomId).then(() => {
                  console.log('[MatrixChat] Successfully joined room');
                  updateRoomsAndInvites(client);
                  setTimeout(() => {
                    const joinedRoom = client.getRooms().find((r: any) => r.roomId === targetRoomId);
                    if (joinedRoom) switchRoom(joinedRoom);
                  }, 1000);
                }).catch((err: any) => {
                  console.error('[MatrixChat] Failed to join room:', err);
                  setError('Failed to join room: ' + err.message);
                });
              }
            } else {
              console.log('[MatrixChat] Room not found yet, forcing client sync...');

              // Force the Matrix client to sync
              try {
                console.log('[MatrixChat] Calling client.sync() to fetch latest rooms...');
                if (client && typeof (client as any).sync === 'function') {
                  (client as any).sync();
                }
              } catch (syncError) {
                console.warn('[MatrixChat] Manual sync failed:', syncError);
              }

              // Room might not be synced yet, retry multiple times with longer intervals
              let attempts = 0;
              const maxAttempts = 8; // Increased from 5
              const retryInterval = 3000; // Increased from 2000ms to 3000ms

              const retryFind = () => {
                attempts++;
                console.log(`[MatrixChat] Retry attempt ${attempts}/${maxAttempts}`);

                const allRooms = client.getRooms();
                console.log(`[MatrixChat] Client has ${allRooms.length} rooms`);

                const room = allRooms.find((r: any) => r.roomId === targetRoomId);

                if (room) {
                  const membership = room.getMyMembership();
                  console.log('[MatrixChat] Room found on retry, membership:', membership);

                  // If it's an invite, auto-accept it
                  if (membership === 'invite') {
                    console.log('[MatrixChat] Auto-accepting invite for newly created room...');
                    handleAcceptInvite(targetRoomId).then(() => {
                      console.log('[MatrixChat] Invite accepted, updating UI');
                      updateRoomsAndInvites(client);
                      setTimeout(() => {
                        const joinedRoom = client.getRooms().find((r: any) => r.roomId === targetRoomId);
                        if (joinedRoom && joinedRoom.getMyMembership() === 'join') {
                          switchRoom(joinedRoom);
                        }
                      }, 1000);
                    }).catch((err) => {
                      console.error('[MatrixChat] Failed to auto-accept invite:', err);
                    });
                  } else if (membership === 'join') {
                    updateRoomsAndInvites(client);
                    setTimeout(() => {
                      switchRoom(room);
                    }, 300);
                  } else {
                    console.log('[MatrixChat] Room found but membership is:', membership);
                    updateRoomsAndInvites(client);
                  }
                } else if (attempts < maxAttempts) {
                  setTimeout(retryFind, retryInterval);
                } else {
                  console.warn('[MatrixChat] Room not found after', maxAttempts, 'attempts');
                  console.warn('[MatrixChat] Available room IDs:', allRooms.map((r: any) => r.roomId));
                  console.warn('[MatrixChat] Looking for:', targetRoomId);
                  console.warn('[MatrixChat] This likely means the room was created but hasn\'t synced to the Matrix client yet.');
                  console.warn('[MatrixChat] The room will appear automatically once Matrix sync completes.');

                  // Open chat widget anyway - room will appear when synced
                  setIsChatOpen(true);
                }
              };

              setTimeout(retryFind, retryInterval);
            }
          }
        }, 500);
      }
    };

    const openChatListener = (evt: Event) => {
      // Cast the generic Event to our CustomEvent type and forward to the async handler
      void handleOpenChat(evt as CustomEvent<{ roomId: string }>);
    };

    window.addEventListener("openMatrixChat", openChatListener);
    return () => {
      window.removeEventListener("openMatrixChat", openChatListener);
    };
  }, [client, rooms]);

  // Handle room access checks from ContactSeller component
  useEffect(() => {
    const handleCheckRoomAccess = (event: any) => {
      const { roomId } = event.detail;
      console.log('[MatrixChat] Checking room access for:', roomId);

      if (!client) {
        console.log('[MatrixChat] No client, cannot access room');
        window.dispatchEvent(
          new CustomEvent('matrixRoomAccessResponse', {
            detail: { roomId, canAccess: false },
          })
        );
        return;
      }

      try {
        const room = client.getRoom(roomId);
        const membership = room?.getMyMembership();

        console.log('[MatrixChat] Room membership:', membership);

        // User can access if they're joined or invited (not if they left or were banned)
        const canAccess = membership === 'join' || membership === 'invite';

        window.dispatchEvent(
          new CustomEvent('matrixRoomAccessResponse', {
            detail: { roomId, canAccess },
          })
        );
      } catch (error) {
        console.error('[MatrixChat] Error checking room access:', error);
        window.dispatchEvent(
          new CustomEvent('matrixRoomAccessResponse', {
            detail: { roomId, canAccess: false },
          })
        );
      }
    };

    window.addEventListener('checkMatrixRoomAccess', handleCheckRoomAccess as EventListener);
    return () => {
      window.removeEventListener('checkMatrixRoomAccess', handleCheckRoomAccess as EventListener);
    };
  }, [client]);

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

    // Show ALL rooms in "Chats" regardless of membership state (invite or join)
    // This provides seamless UX - users see all property inquiry rooms immediately
    const validRooms = allRooms.filter((room) => {
      const membership = room.getMyMembership();
      // Include both "invite" and "join" states
      return membership === "join" || membership === "invite";
    });

    console.log(
      `[updateRoomsAndInvites] Found ${validRooms.length} total rooms (invite + join)`
    );

    // Track room count for notifications
    const previousRoomCount = prevInviteCountRef.current;
    const newRoomCount = validRooms.length;
    prevInviteCountRef.current = newRoomCount;

    // Show notification for new rooms
    if (newRoomCount > previousRoomCount) {
      if ('Notification' in window && Notification.permission === 'granted') {
        const latestRoom = validRooms[validRooms.length - 1];
        const roomName = latestRoom?.name || 'Unknown Room';
        new Notification('New Chat', {
          body: `New conversation: ${roomName}`,
          icon: '/favicon.ico',
          tag: 'matrix-chat',
        });
      }
    }

    // All rooms go to "Chats", invites section stays empty
    setRooms(validRooms);
    setInvites([]);
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
      console.error("❌ Failed to lookup users:", error);
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
      
      // Get the other participant's info (exclude admin)
      const members = selectedRoomRef.current.getJoinedMembers?.() || [];
      const otherMember = members.find((m: any) => {
        const memberId = m.userId || "";
        const isMe = memberId === matrixUserId;
        const isAdmin = memberId.toLowerCase().includes("admin");
        return !isMe && !isAdmin;
      });
      if (otherMember) {
        const displayName = getUserDisplayName(otherMember.userId);
        const avatar = getUserAvatar(otherMember.userId);
        setRemoteName(displayName);
        setRemoteAvatar(avatar);
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
    setRemoteAvatar(null);
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

      // Get caller's display name and avatar from our user cache
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
    [createPeerConnection, matrixUserId, getUserDisplayName, getUserAvatar]
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
  const switchRoom = async (room: any) => {
    // Check if user only has invite status (not joined yet)
    const membership = room.getMyMembership?.();

    if (membership === "invite") {
      console.log('[switchRoom] Room is in invite state, auto-accepting:', room.roomId);
      // Auto-accept the invite before switching to the room
      await handleAcceptInvite(room.roomId);
      // handleAcceptInvite will update the room list, so the room object will be updated
      // Wait a moment for the sync to complete
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

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
      
      // Notify backend for email notifications to offline users
      try {
        notifyNewMessage({
          roomId: selectedRoom.roomId,
          message: newMessage.trim(),
          senderMatrixId: matrixUserId
        });
      } catch (notifyErr) {
        console.error("Failed to trigger message notification:", notifyErr);
      }

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

      const myMembershipHandler = (room: any, membership: string, prevMembership: string) => {
        console.log('[myMembershipHandler] Room:', room?.roomId, 'Membership:', prevMembership, '→', membership);
        console.log('[myMembershipHandler] Room name:', room?.name);
        console.log('[myMembershipHandler] Members:', room?.getJoinedMembers?.().map((m: any) => m.userId));

        // Note: Auto-accept is handled server-side during room creation
        // This just updates the UI when membership changes

        updateRoomsAndInvites(matrixClient);
      };

      const roomHandler = (room: any) => {
        // Only process if room is valid
        if (room && room.roomId) {
          updateRoomsAndInvites(matrixClient);
        }
      };

      const syncHandler = (state: string) => {
        console.log('[syncHandler] Sync state changed to:', state);
        setSyncState(state);

        // Only update rooms once we're actually syncing (not on PREPARED)
        // PREPARED means sync is preparing, SYNCING means data is actually available
        if (state === "SYNCING") {
          console.log('[syncHandler] Sync ready, updating rooms and invites');

          // Note: Auto-accept is handled server-side during room creation
          // No client-side auto-accept to avoid conflicts

          updateRoomsAndInvites(matrixClient);
        } else if (state === "ERROR") {
          console.error('[syncHandler] Sync error detected');
        } else if (state === "STOPPED") {
          console.warn('[syncHandler] Sync stopped');
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

        console.log("🔑 Matrix session info:");
        console.log("  User ID:", authUser.matrix.matrixUserId);
        console.log("  Access token (first 20 chars):", authUser.matrix.matrixAccessToken.substring(0, 20) + "...");
        console.log("  Device ID:", storedDeviceId);

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
    console.log('[handleAcceptInvite] Called with roomId:', roomId, 'client exists:', !!client);

    if (!client) {
      console.error('[handleAcceptInvite] No Matrix client available!');
      setError('Matrix client not initialized. Please try again.');
      return;
    }

    try {
      console.log('[handleAcceptInvite] Joining room:', roomId);

      // Immediately remove from invites list optimistically
      setInvites(prev => prev.filter(inv => (inv.roomId || inv.room_id) !== roomId));

      // Set up listener BEFORE joining to catch the sync event
      const waitForMembership = new Promise<void>((resolve) => {
        const timeout = setTimeout(() => {
          client.off('Room.myMembership' as any, membershipListener);
          console.warn('[handleAcceptInvite] ⚠️ Timeout waiting for membership change (10s)');
          resolve();
        }, 10000); // 10 second timeout

        const membershipListener = (room: any, membership: string, prevMembership: string) => {
          console.log('[handleAcceptInvite] Membership event:', room.roomId, prevMembership, '→', membership);

          if (room.roomId === roomId && membership === 'join') {
            clearTimeout(timeout);
            client.off('Room.myMembership' as any, membershipListener);
            console.log('[handleAcceptInvite] ✅ Membership changed to join via sync event');
            resolve();
          }
        };

        // Set up listener BEFORE calling joinRoom
        client.on('Room.myMembership' as any, membershipListener);
        console.log('[handleAcceptInvite] Event listener registered');
      });

      // Join the room - this sends the request to the server
      console.log('[handleAcceptInvite] Calling joinRoom...');
      await client.joinRoom(roomId);
      console.log('[handleAcceptInvite] joinRoom() completed, waiting for sync event...');

      // Wait for the sync event to confirm membership change
      await waitForMembership;

      // Update rooms and invites list
      // NOTE: Matrix server is the single source of truth for membership state
      // Database doesn't track membership - only stores participant associations
      updateRoomsAndInvites(client);

      // Additional update after 500ms to ensure UI is fully refreshed
      setTimeout(() => {
        console.log('[handleAcceptInvite] Final UI update');
        updateRoomsAndInvites(client);
      }, 500);

    } catch (err: any) {
      console.error("Failed to accept invite:", err);
      setError(err.message || "Failed to accept invite");
      // Restore the invite if join failed
      updateRoomsAndInvites(client);
    }
  };

  // Reject room invite
  const handleRejectInvite = async (roomId: string) => {
    if (!client) return;

    try {
      console.log('[handleRejectInvite] Rejecting invite:', roomId);

      // Immediately remove from invites list optimistically
      setInvites(prev => prev.filter(inv => (inv.roomId || inv.room_id) !== roomId));

      await client.leave(roomId);
      console.log('[handleRejectInvite] Leave room completed');

      // Update lists after leaving
      // NOTE: Matrix server is the single source of truth for membership state
      setTimeout(() => {
        updateRoomsAndInvites(client);
      }, 500);

      setTimeout(() => {
        console.log('[handleRejectInvite] Secondary update');
        updateRoomsAndInvites(client);
      }, 1500);

    } catch (err: any) {
      console.error("Failed to reject invite:", err);
      setError(err.message || "Failed to reject invite");
      // Restore the invite if rejection failed
      updateRoomsAndInvites(client);
    }
  };

  // NOTE: Auto-accept is no longer needed because the backend uses admin API
  // to force-join both users directly to property inquiry rooms. Both buyer and seller
  // are already joined when the room is created, so no invites are sent.
  // The auto-accept logic below is kept but disabled for potential future use with other room types.

  // Auto-accept property inquiry invites (DISABLED - handled server-side now)
  useEffect(() => {
    // Disabled: Server-side admin API handles joining automatically
    return;

    /* Original auto-accept code (kept for reference):
    if (!client || !isAuthenticated || invites.length === 0) return;

    console.log('[Auto-accept] Checking invites for property inquiries:', invites.length);

    invites.forEach((invite) => {
      const roomId = invite.roomId || invite.room_id;
      const roomName = invite.name || '';

      // Skip if we've already tried to auto-accept this room
      if (autoAcceptAttemptedRef.current.has(roomId)) {
        return;
      }

      // Auto-accept if it's a property inquiry room (starts with "Inquiry:")
      if (roomName.startsWith('Inquiry:')) {
        console.log('[Auto-accept] Found property inquiry invite:', roomName);

        // Mark as attempted
        autoAcceptAttemptedRef.current.add(roomId);

        handleAcceptInvite(roomId).catch((err) => {
          console.error('[Auto-accept] Failed to auto-accept:', err);
        });
      }
    });
    */
  }, [invites, client, isAuthenticated]);

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
        <div className={`matrix_chat_window ${selectedRoom ? 'mobile-chat-active' : ''}`}>
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
            className={`matrix-chat-content ${selectedRoom ? 'chat-active' : ''}`}
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
              onBack={() => setSelectedRoom(null)}
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

export default MatrixChat;