"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./StandaloneMatrixChat.css";
import { 
  MessageCircle, 
  X, 
  Search, 
  ArrowLeft, 
  Send, 
  User, 
  Menu,
  Hash,
  Trash2,
  Check,
  Phone,
  Video
} from "lucide-react";
import { 
  useGetAuthUserQuery, 
  useRegisterMatrixAccountMutation, 
  useLookupMatrixUsersMutation 
} from "@/state/api";
import { useToggleModal } from "@/app/store";
import { getMatrixSdk } from "@/utils/matrixSdk";
import { MatrixClientType } from "@/types/index.t";
import { leaveRoomViaAPI } from "@/utils/api";

// --- Types ---

interface MatrixUserInfo {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl: string | null;
  role: string;
}

interface AuthUser {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    matrixUserId: string | null;
    matrixPassword: string | null;
  };
  matrix: {
    matrixUserId: string;
    matrixAccessToken: string;
    matrixHomeserver: string;
  } | null;
}

// --- Component ---

const StandaloneMatrixChat = () => {
  const { data: authUser, refetch: refetchAuthUser } = useGetAuthUserQuery() as { 
    data: AuthUser | undefined;
    refetch: () => void;
  };

  const [lookupUsers] = useLookupMatrixUsersMutation();
  const [registerMatrix, { isLoading: isRegistering }] = useRegisterMatrixAccountMutation();

  // State
  const [client, setClient] = useState<any | null>(null);
  const [rooms, setRooms] = useState<any[]>([]);
  const [invites, setInvites] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [userCache, setUserCache] = useState<Record<string, MatrixUserInfo>>({});
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mobile navigation state
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  // Refs
  const clientRef = useRef<any | null>(null);
  const fetchedIdsRef = useRef<Set<string>>(new Set());
  const isFetchingRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Matrix SDK Initialization and Lifecycle
  const initializeMatrix = useCallback(async (userId: string, token: string) => {
    try {
      const sdk = await getMatrixSdk();
      const hsUrl = process.env.NEXT_PUBLIC_MATRIX_HOMESERVER || "https://matrix.151.hu";
      
      const matrixClient = sdk.createClient({
        baseUrl: hsUrl,
        accessToken: token,
        userId: userId,
      });

      setClient(matrixClient);
      clientRef.current = matrixClient;

      matrixClient.on("sync", (state: string) => {
        console.log("Matrix Sync State:", state);
        if (state === "PREPARED" || state === "SYNCING") {
          setIsAuthenticated(true);
          setLoading(false);
          updateRoomsAndInvites(matrixClient);
        }
      });

      matrixClient.on("Room.timeline", (event: any, room: any) => {
        if (event.getType() === "m.room.message") {
          updateRoomsAndInvites(matrixClient);
          if (messagesEndRef.current && room.roomId === clientRef.current?.selectedRoomId) {
            // Logic to reload messages if the room is active
            loadMessages(room);
          }
        }
      });

      matrixClient.on("RoomMember.membership", () => {
        updateRoomsAndInvites(matrixClient);
      });

      await matrixClient.startClient({ initialSyncLimit: 20 });
    } catch (err: any) {
      console.error("Matrix init failed:", err);
      setError("Failed to initialize chat connection.");
      setLoading(false);
    }
  }, []); // Remove selectedRoom from dependencies

  const updateRoomsAndInvites = useCallback((matrixClient: any) => {
    const allRooms = matrixClient.getRooms();
    const joined = allRooms.filter((r: any) => r.getMyMembership() === "join");
    const invited = allRooms.filter((r: any) => r.getMyMembership() === "invite");
    setRooms(joined);
    setInvites(invited);
  }, []);

  const loadMessages = useCallback((room: any) => {
    if (!room) return;
    const timeline = room.getLiveTimeline();
    const events = timeline
      .getEvents()
      .filter((e: any) => e.getType() === "m.room.message");
    setMessages(events);
  }, []);

  // Sync Logic
  useEffect(() => {
    if (authUser?.matrix && !clientRef.current) {
      initializeMatrix(authUser.matrix.matrixUserId, authUser.matrix.matrixAccessToken);
    } else if (authUser && !authUser.matrix) {
      setLoading(false); // User logged in but no matrix account
    }

    return () => {
      if (clientRef.current) {
        console.log("Stopping Matrix Client...");
        clientRef.current.stopClient();
        clientRef.current = null;
      }
    };
  }, [authUser, initializeMatrix]);

  // Keep track of selected room ID in a ref for the event listener
  useEffect(() => {
    if (clientRef.current) {
      clientRef.current.selectedRoomId = selectedRoom?.roomId;
    }
  }, [selectedRoom]);

  // Room Selection
  const selectRoom = (room: any) => {
    setSelectedRoom(room);
    loadMessages(room);
    setMobileView("chat");
    // Mark as read
    if (client) {
      const lastEvent = room.getLiveTimeline().getEvents().slice(-1)[0];
      if (lastEvent) {
        client.sendReadReceipt(lastEvent);
      }
    }
  };

  // Message Sending
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedRoom || !client) return;
    setSending(true);
    try {
      await client.sendEvent(selectedRoom.roomId, "m.room.message", {
        msgtype: "m.text",
        body: newMessage.trim(),
      }, "");
      setNewMessage("");
    } catch (err) {
      console.error("Send failed:", err);
    } finally {
      setSending(false);
    }
  };

  // User Lookup
  const fetchUserDetails = useCallback(async (ids: string[]) => {
    const unknownIds = ids.filter(id => !userCache[id] && !fetchedIdsRef.current.has(id));
    if (unknownIds.length === 0 || isFetchingRef.current) return;
    
    isFetchingRef.current = true;
    unknownIds.forEach(id => fetchedIdsRef.current.add(id));

    try {
      const result = await lookupUsers({ matrixUserIds: unknownIds }).unwrap();
      if (result.users) {
        setUserCache(prev => ({ ...prev, ...result.users }));
      }
    } catch (err) {
      console.error("User lookup failed:", err);
    } finally {
      isFetchingRef.current = false;
    }
  }, [lookupUsers, userCache]);

  useEffect(() => {
    if (rooms.length > 0) {
      const ids = new Set<string>();
      rooms.forEach(room => {
        room.getJoinedMembers().forEach((m: any) => ids.add(m.userId));
      });
      fetchUserDetails(Array.from(ids));
    }
  }, [rooms, fetchUserDetails]);

  // Helpers
  const getDisplayName = (id: string) => {
    const cached = userCache[id];
    if (cached) return cached.fullName || `${cached.firstName} ${cached.lastName}`;
    return id.split(":")[0].replace("@", "").replace("immo_", "");
  };

  const getAvatar = (id: string) => userCache[id]?.avatarUrl;

  // Format avatar URL with Supabase storage path
  const getAvatarUrl = (avatarUrl: string | null | undefined) => {
    if (!avatarUrl) return null;
    return `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005"}/uploads/${avatarUrl}`;
  };

  // Get avatar for a room (from the other participant)
  const getRoomAvatar = (room: any) => {
    const members = room.getJoinedMembers?.() || [];
    const otherMember = members.find((m: any) => m.userId !== authUser?.matrix?.matrixUserId);
    return otherMember ? getAvatarUrl(getAvatar(otherMember.userId)) : null;
  };

  if (loading) {
    return (
      <div className="standalone-chat-loading">
        <div className="standalone-chat-loading-text">Initializing chat...</div>
      </div>
    );
  }

  if (!authUser) {
    return (
      <div className="standalone-chat-not-logged-in">
        <MessageCircle size={64} style={{ color: "#d1d5db", marginBottom: "16px" }} />
        <h2>Please Sign In</h2>
        <p>You need to be logged in to access your messages.</p>
      </div>
    );
  }

  return (
    <div className="standalone-chat-container">
      <div className="standalone-chat-wrapper">
        
        {/* Sidebar - Rooms List */}
        <div className={`standalone-chat-sidebar ${mobileView === "chat" ? "mobile-hidden" : ""}`}>
          <div className="standalone-chat-sidebar-header">
            <h2 className="standalone-chat-sidebar-title">
              Messages
              <span className="standalone-chat-count-badge">
                {rooms.length}
              </span>
            </h2>
          </div>

          <div className="standalone-chat-rooms-list">
            {rooms.length === 0 ? (
              <div className="standalone-chat-empty-state">
                <Hash size={40} style={{ marginBottom: "8px", opacity: 0.2 }} />
                <p>No conversations yet</p>
              </div>
            ) : (
              <div className="standalone-chat-rooms-container">
                {rooms.map(room => (
                  <button
                    key={room.roomId}
                    onClick={() => selectRoom(room)}
                    className={`standalone-chat-room-item ${selectedRoom?.roomId === room.roomId ? "selected" : ""}`}
                  >
                    <div className="standalone-chat-room-avatar">
                      <div className="standalone-chat-room-avatar-circle">
                        {getRoomAvatar(room) ? (
                          <img src={getRoomAvatar(room)!} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          room.name?.charAt(0).toUpperCase()
                        )}
                      </div>
                    </div>
                    <div className="standalone-chat-room-info">
                      <div className="standalone-chat-room-header">
                        <h3 className="standalone-chat-room-name">
                          {room.name || "Unknown Chat"}
                        </h3>
                      </div>
                      <p className="standalone-chat-room-preview">
                        {room.getLiveTimeline().getEvents().slice(-1)[0]?.getContent()?.body || "No messages yet"}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`standalone-chat-area ${mobileView === "list" ? "mobile-hidden" : ""}`}>
          {selectedRoom ? (
            <>
              {/* Chat Header */}
              <div className="standalone-chat-header">
                <div className="standalone-chat-header-left">
                  <button 
                    onClick={() => setMobileView("list")}
                    className="standalone-chat-back-btn"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div className="standalone-chat-header-avatar">
                    {getRoomAvatar(selectedRoom) ? (
                      <img src={getRoomAvatar(selectedRoom)!} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                    ) : (
                      selectedRoom.name?.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="standalone-chat-header-info">
                    <h3>{selectedRoom.name}</h3>
                    <p>Active now</p>
                  </div>
                </div>
                <div className="standalone-chat-header-actions">
                  <button className="standalone-chat-action-btn">
                    <Phone size={20} />
                  </button>
                  <button className="standalone-chat-action-btn">
                    <Video size={20} />
                  </button>
                </div>
              </div>

              {/* Messages List */}
              <div className="standalone-chat-messages">
                {messages.length === 0 ? (
                  <div className="standalone-chat-messages-empty">
                    <div className="standalone-chat-messages-empty-card">
                      <MessageCircle size={32} style={{ marginBottom: "8px", color: "#fed7aa" }} />
                      <p style={{ fontSize: "14px", fontWeight: "500", margin: "0 0 4px 0" }}>Start the conversation</p>
                      <p style={{ fontSize: "12px", margin: 0 }}>Your messages are encrypted</p>
                    </div>
                  </div>
                ) : (
                  <div className="standalone-chat-messages-list">
                    {messages.map((msg, idx) => {
                      const isMe = msg.getSender() === authUser.matrix?.matrixUserId;
                      const senderName = getDisplayName(msg.getSender());
                      const senderAvatar = getAvatarUrl(getAvatar(msg.getSender()));
                      return (
                        <div key={idx} className={`standalone-chat-message ${isMe ? "me" : "other"}`}>
                          {!isMe && (
                            <div className="standalone-chat-message-avatar">
                              {senderAvatar ? (
                                <img src={senderAvatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                              ) : (
                                <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "var(--chat-muted)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", color: "var(--chat-muted-foreground)" }}>
                                  {senderName.charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>
                          )}
                          <div className={`standalone-chat-message-bubble ${isMe ? "me" : "other"}`}>
                            {!isMe && <p className="standalone-chat-message-sender">{senderName}</p>}
                            <p className="standalone-chat-message-text">{msg.getContent().body}</p>
                            <p className={`standalone-chat-message-time ${isMe ? "me" : "other"}`}>
                              {new Date(msg.getTs()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="standalone-chat-input-wrapper">
                <div className="standalone-chat-input-container">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Type a message..."
                    className="standalone-chat-input"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={sending || !newMessage.trim()}
                    className={`standalone-chat-send-btn ${newMessage.trim() ? "active" : "disabled"}`}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="standalone-chat-no-selection">
              <div className="standalone-chat-no-selection-icon">
                <MessageCircle size={48} style={{ color: "#fed7aa" }} />
              </div>
              <h2>Your Messages</h2>
              <p>
                Select a contact from the list on the left to start a conversation.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StandaloneMatrixChat;
