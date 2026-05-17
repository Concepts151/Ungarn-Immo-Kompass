import React, { useEffect, useState } from "react";
import "./css/matrixchat.css";
import { Hash, Trash2 } from "lucide-react";
import RoomInvites from "./RoomInvites";

interface RoomListProps {
  rooms: any[];
  invites: any[];
  selectedRoom: any | null;
  onSelectRoom: (room: any) => void;
  onLeaveRoom: (room: any) => void;
  onAcceptInvite: (roomId: string) => void;
  onRejectInvite: (roomId: string) => void;
  matrixClient?: any; // Pass the Matrix client for read receipts
  userCache?: Record<string, { id: string; firstName: string; lastName: string; fullName: string; avatarUrl: string | null; role: string }>;
  getUserDisplayName?: (matrixUserId: string) => string;
  getUserAvatar?: (matrixUserId: string) => string | null;
}

// Helper function to count only actual messages
const getMessageCount = (room: any): number => {
  try {
    const timeline = room.getLiveTimeline?.();
    if (!timeline) return 0;
    
    const events = timeline.getEvents?.() || [];
    return events.filter(
      (event: any) => event.getType?.() === "m.room.message"
    ).length;
  } catch (error) {
    return 0;
  }
};

// Get unread message count for a room
const getUnreadCount = (room: any): number => {
  try {
    // Method 1: Use Matrix SDK's built-in unread count
    const unreadCount = room.getUnreadNotificationCount?.("total");
    if (typeof unreadCount === "number") {
      return unreadCount;
    }

    // Method 2: Calculate manually using read receipts
    const myUserId = room.myUserId;
    const timeline = room.getLiveTimeline?.();
    if (!timeline) return 0;

    const events = timeline.getEvents?.() || [];
    const messages = events.filter(
      (event: any) => event.getType?.() === "m.room.message"
    );

    if (messages.length === 0) return 0;

    // Get my read receipt
    const readUpToId = room.getEventReadUpTo?.(myUserId);
    
    if (!readUpToId) {
      // No read receipt - all messages are unread (except my own)
      return messages.filter(
        (msg: any) => msg.getSender?.() !== myUserId
      ).length;
    }

    // Count messages after my last read receipt
    let unread = 0;
    let foundReadMarker = false;
    
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      
      if (msg.getId?.() === readUpToId) {
        foundReadMarker = true;
        break;
      }
      
      // Only count messages from others
      if (msg.getSender?.() !== myUserId) {
        unread++;
      }
    }

    // If we didn't find the read marker, all messages from others are unread
    if (!foundReadMarker) {
      return messages.filter(
        (msg: any) => msg.getSender?.() !== myUserId
      ).length;
    }

    return unread;
  } catch (error) {
    console.error("Error getting unread count:", error);
    return 0;
  }
};

// Get last message preview
const getLastMessagePreview = (
  room: any, 
  getUserDisplayName?: (matrixUserId: string) => string
): { text: string; sender: string; senderId: string; timestamp: number } | null => {
  try {
    const timeline = room.getLiveTimeline?.();
    if (!timeline) return null;
    
    const events = timeline.getEvents?.() || [];
    const messages = events.filter(
      (event: any) => event.getType?.() === "m.room.message"
    );
    
    if (messages.length === 0) return null;
    
    const lastMessage = messages[messages.length - 1];
    const content = lastMessage.getContent?.();
    const body = content?.body || "";
    const senderId = lastMessage.getSender?.() || "";
    const timestamp = lastMessage.getTs?.() || 0;
    
    // Use the getUserDisplayName helper if available, otherwise fallback
    let senderName: string;
    if (getUserDisplayName) {
      senderName = getUserDisplayName(senderId);
    } else {
      const senderMember = room.getMember?.(senderId);
      senderName = senderMember?.name || senderId.split(":")[0].replace("@", "").replace("immo_", "");
    }
    
    return {
      text: body.length > 25 ? body.substring(0, 25) + "..." : body,
      sender: senderName,
      senderId,
      timestamp,
    };
  } catch (error) {
    return null;
  }
};

// Format timestamp
const formatTime = (timestamp: number): string => {
  if (!timestamp) return "";
  
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // Less than 24 hours - show time
  if (diff < 24 * 60 * 60 * 1000) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
  
  // Less than 7 days - show day name
  if (diff < 7 * 24 * 60 * 60 * 1000) {
    return date.toLocaleDateString([], { weekday: "short" });
  }
  
  // Otherwise show date
  return date.toLocaleDateString([], { month: "short", day: "numeric" });
};

const RoomList = ({
  rooms,
  invites,
  selectedRoom,
  onSelectRoom,
  onLeaveRoom,
  onAcceptInvite,
  onRejectInvite,
  matrixClient,
  userCache,
  getUserDisplayName,
  getUserAvatar,
}: RoomListProps) => {
  // Force re-render when rooms update to refresh unread counts
  const [, setUpdateTrigger] = useState(0);

  // Listen for read receipt updates
  useEffect(() => {
    if (!matrixClient) return;

    const handleReceipt = () => {
      setUpdateTrigger((prev) => prev + 1);
    };

    const handleTimeline = () => {
      setUpdateTrigger((prev) => prev + 1);
    };

    matrixClient.on("Room.receipt", handleReceipt);
    matrixClient.on("Room.timeline", handleTimeline);

    return () => {
      matrixClient.off("Room.receipt", handleReceipt);
      matrixClient.off("Room.timeline", handleTimeline);
    };
  }, [matrixClient]);

  // Sort rooms by last message timestamp (most recent first)
  const sortedRooms = [...rooms].sort((a, b) => {
    const aLast = getLastMessagePreview(a, getUserDisplayName);
    const bLast = getLastMessagePreview(b, getUserDisplayName);
    return (bLast?.timestamp || 0) - (aLast?.timestamp || 0);
  });

  // Calculate total unread
  const totalUnread = rooms.reduce((sum, room) => sum + getUnreadCount(room), 0);

  return (
    <div className="room_list_wrapper">
      <div className="room_list_container">
        <h4 className="chat_count_sub">
          <Hash size={16} /> Chats ({rooms.length})
          {totalUnread > 0 && (
            <span className="total-unread-badge">{totalUnread}</span>
          )}
        </h4>
        
        {/* Room Invites */}
        <RoomInvites
          invites={invites}
          onAcceptInvite={onAcceptInvite}
          onRejectInvite={onRejectInvite}
        /> 
        
        {rooms.length === 0 ? (
          <p className="no_chats_text">No active chats</p>
        ) : (
          <div style={{ marginTop: "10px" }}>
            {sortedRooms.map((room) => {
              const messageCount = getMessageCount(room);
              const unreadCount = getUnreadCount(room);
              const lastMessage = getLastMessagePreview(room, getUserDisplayName);
              const isSelected = selectedRoom?.roomId === room.roomId;
              const hasUnread = unreadCount > 0;
              
              // Get other participant's avatar (exclude admin users)
              let otherParticipantAvatar: string | null = null;
              let otherParticipantName: string = room.name || "Unnamed Room";
              try {
                const members = room.getJoinedMembers?.() || [];
                const myUserId = room.myUserId;
                // Filter out: current user, and admin users (those with "admin" in their Matrix ID)
                const otherMember = members.find((m: any) => {
                  const memberId = m.userId || "";
                  const isMe = memberId === myUserId;
                  const isAdmin = memberId.toLowerCase().includes("admin");
                  return !isMe && !isAdmin;
                });
                if (otherMember && getUserAvatar) {
                  otherParticipantAvatar = getUserAvatar(otherMember.userId);
                }
                if (otherMember && getUserDisplayName) {
                  otherParticipantName = getUserDisplayName(otherMember.userId);
                }
              } catch (e) {
                // Ignore
              }
              
              return (
                <div 
                  key={room.roomId} 
                  className={`room-item ${isSelected ? "room-item-selected" : ""} ${hasUnread ? "room-item-unread" : ""}`}
                >
                  <button 
                    onClick={() => onSelectRoom(room)} 
                    className="room-button"
                    style={{flexDirection: "row"}}
                  >
                    {/* Room Avatar */}
                    <div className="room-avatar">
                      {otherParticipantAvatar ? (
                        <img 
                          src={`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005"}/uploads/${otherParticipantAvatar}`} 
                          alt={otherParticipantName} 
                          className="room-avatar-img"
                        />
                      ) : (
                        <span>{otherParticipantName.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    
                    <div className="room-info">
                      <div className="room-button-header">
                        <p className={`room-name ${hasUnread ? "room-name-unread" : ""}`}>
                          {room.name || "Unnamed Room"}
                        </p>
                        {lastMessage && (
                          <span className="room-time">
                            {formatTime(lastMessage.timestamp)}
                          </span>
                        )}
                      </div>
                      
                      <div className="room-button-footer">
                        {lastMessage ? (
                          <p className={`room-last-message ${hasUnread ? "room-last-message-unread" : ""}`}>
                            <span className="room-last-sender">{lastMessage.sender}: </span>
                            {lastMessage.text}
                          </p>
                        ) : (
                          <p className="room-messages">
                            {messageCount} {messageCount === 1 ? "message" : "messages"}
                          </p>
                        )}
                        
                        {hasUnread && (
                          <span className="unread-badge">{unreadCount}</span>
                        )}
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLeaveRoom(room);
                    }}
                    className="leave-room-btn"
                    title="Leave room"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomList;