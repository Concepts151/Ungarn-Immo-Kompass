"use client";

import React, { useEffect, useState } from "react";
import { Check, X, LogOut, MessageCircle, Hash, Trash2 } from "lucide-react";
import "../css/roomlistpage.css";

interface MatrixUserInfo {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl: string | null;
  role: string;
}

interface RoomListPageProps {
  rooms: any[];
  invites: any[];
  selectedRoom: any | null;
  onSelectRoom: (room: any) => void;
  onLeaveRoom: (room: any) => void;
  onAcceptInvite: (room: any) => void;
  onRejectInvite: (room: any) => void;
  matrixClient: any;
  userCache: Record<string, MatrixUserInfo>;
  getUserDisplayName: (matrixId: string) => string;
  getUserAvatar: (matrixId: string) => string | null;
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
      text: body.length > 30 ? body.substring(0, 30) + "..." : body,
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

// Supabase storage URL for avatars
const AVATAR_BASE_URL = "https://jzhlioxxjwqwvwybtcfl.supabase.co/storage/v1/object/public/avatars/";

// Helper to get full avatar URL
const getFullAvatarUrl = (avatarUrl: string | null): string | null => {
  if (!avatarUrl) return null;
  // If it's already a full URL, return as is
  if (avatarUrl.startsWith('http://') || avatarUrl.startsWith('https://')) {
    return avatarUrl;
  }
  // Otherwise, prepend the base URL
  return `${AVATAR_BASE_URL}${avatarUrl}`;
};

const RoomListPage: React.FC<RoomListPageProps> = ({
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
}) => {
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
      try {
        matrixClient.off("Room.receipt", handleReceipt);
        matrixClient.off("Room.timeline", handleTimeline);
      } catch (e) {
        // Ignore cleanup errors
      }
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

  // Get other participant info (exclude admin users)
  const getOtherParticipant = (room: any): { name: string; avatar: string | null } => {
    try {
      const members = room.getJoinedMembers?.() || [];
      const myUserId = room.myUserId;
      
      // Filter out: current user, and admin users
      const otherMember = members.find((m: any) => {
        const memberId = m.userId || "";
        const isMe = memberId === myUserId;
        const isAdmin = memberId.toLowerCase().includes("admin");
        return !isMe && !isAdmin;
      });

      if (otherMember) {
        return {
          name: getUserDisplayName(otherMember.userId),
          avatar: getUserAvatar(otherMember.userId),
        };
      }
    } catch {}
    
    return { name: room.name || "Unknown", avatar: null };
  };

  return (
    <div className="room-list-page">
      {/* Invites */}
      {invites.length > 0 && (
        <div className="invites-section">
          <h3 className="section-title">
            <span className="invite-badge">{invites.length}</span>
            Pending Invites
          </h3>
          {invites.map((invite) => (
            <div key={invite.roomId} className="invite-item">
              <div className="invite-avatar">
                <MessageCircle size={20} />
              </div>
              <div className="invite-info">
                <p className="invite-name">{invite.name || "New Conversation"}</p>
                <p className="invite-subtitle">Wants to chat with you</p>
              </div>
              <div className="invite-actions">
                <button
                  className="invite-btn accept"
                  onClick={() => onAcceptInvite(invite)}
                  title="Accept"
                >
                  <Check size={18} />
                </button>
                <button
                  className="invite-btn reject"
                  onClick={() => onRejectInvite(invite)}
                  title="Decline"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rooms Header */}
      <div className="rooms-header">
        <h4 className="rooms-title">
          <Hash size={16} /> Chats ({rooms.length})
        </h4>
        {totalUnread > 0 && (
          <span className="total-unread-badge">{totalUnread}</span>
        )}
      </div>

      {/* Rooms */}
      <div className="rooms-section">
        {sortedRooms.length === 0 ? (
          <div className="no-rooms">
            <MessageCircle size={48} className="no-rooms-icon" />
            <p>No conversations yet</p>
            <span>Start messaging a property seller to begin</span>
          </div>
        ) : (
          sortedRooms.map((room) => {
            const messageCount = getMessageCount(room);
            const unreadCount = getUnreadCount(room);
            const lastMessage = getLastMessagePreview(room, getUserDisplayName);
            const isSelected = selectedRoom?.roomId === room.roomId;
            const hasUnread = unreadCount > 0;
            const participant = getOtherParticipant(room);
            const participantAvatarUrl = getFullAvatarUrl(participant.avatar);

            return (
              <div
                key={room.roomId}
                className={`room-item ${isSelected ? "selected" : ""} ${hasUnread ? "unread" : ""}`}
              >
                <button 
                  className="room-button"
                  onClick={() => onSelectRoom(room)}
                  style={{ flexDirection: "row" }}
                >
                  {/* Avatar */}
                  <div className="room-avatar">
                    {participantAvatarUrl ? (
                      <img 
                        src={participantAvatarUrl} 
                        alt={participant.name} 
                      />
                    ) : (
                      <span>{participant.name.charAt(0).toUpperCase()}</span>
                    )}
                    {hasUnread && <div className="online-indicator" />}
                  </div>

                  {/* Info */}
                  <div className="room-content">
                    <div className="room-header">
                      <h4 className={`room-name ${hasUnread ? "room-name-unread" : ""}`}>
                        {participant.name}
                      </h4>
                      {lastMessage && (
                        <span className="room-time">{formatTime(lastMessage.timestamp)}</span>
                      )}
                    </div>
                    <div className="room-preview">
                      {lastMessage ? (
                        <p className={`preview-text ${hasUnread ? "preview-text-unread" : ""}`}>
                          <span className="preview-sender">{lastMessage.sender}:</span>{" "}
                          {lastMessage.text}
                        </p>
                      ) : (
                        <p className="preview-text empty">
                          {messageCount} {messageCount === 1 ? "message" : "messages"}
                        </p>
                      )}
                      {hasUnread && (
                        <span className="unread-badge">{unreadCount > 99 ? "99+" : unreadCount}</span>
                      )}
                    </div>
                  </div>
                </button>

                {/* Leave button */}
                <button
                  className="leave-room-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLeaveRoom(room);
                  }}
                  title="Leave room"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default RoomListPage;