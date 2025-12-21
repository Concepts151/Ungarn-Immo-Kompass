"use client";

import React, { useEffect, useRef } from "react";
import {
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  LogOut,
  Send,
  Smile,
  Paperclip,
  Info,
} from "lucide-react";
import "../css/messageareapage.css";

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

interface MatrixUserInfo {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl: string | null;
  role: string;
}

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
  type: string;
}

interface MessageAreaPageProps {
  selectedRoom: any;
  messages: Message[];
  matrixUserId: string;
  newMessage: string;
  sending: boolean;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onLeaveRoom: () => void;
  onVideoCall: () => void;
  onVoiceCall: () => void;
  onBack: () => void;
  showBackButton: boolean;
  userCache: Record<string, MatrixUserInfo>;
  getUserDisplayName: (matrixId: string) => string;
  getUserAvatar: (matrixId: string) => string | null;
}

const MessageAreaPage: React.FC<MessageAreaPageProps> = ({
  selectedRoom,
  messages,
  matrixUserId,
  newMessage,
  sending,
  onMessageChange,
  onSendMessage,
  onLeaveRoom,
  onVideoCall,
  onVoiceCall,
  onBack,
  showBackButton,
  userCache,
  getUserDisplayName,
  getUserAvatar,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showMenu, setShowMenu] = React.useState(false);
  const prevMessagesLengthRef = useRef(0);

  // Auto-scroll to bottom - only scroll within container, not the page
  useEffect(() => {
    if (messagesContainerRef.current && messages.length > 0) {
      // Only auto-scroll if new messages were added (not on initial load of existing room)
      const isNewMessage = messages.length > prevMessagesLengthRef.current;
      
      if (isNewMessage || prevMessagesLengthRef.current === 0) {
        // Use scrollTop instead of scrollIntoView to prevent page scroll
        const container = messagesContainerRef.current;
        container.scrollTop = container.scrollHeight;
      }
      
      prevMessagesLengthRef.current = messages.length;
    }
  }, [messages]);

  // Reset message count when room changes
  useEffect(() => {
    prevMessagesLengthRef.current = 0;
  }, [selectedRoom?.roomId]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [newMessage]);

  // Refocus after sending
  useEffect(() => {
    if (!sending && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [sending]);

  // Handle key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && newMessage.trim() && !sending) {
      e.preventDefault();
      onSendMessage();
    }
  };

  // Get other participant info
  const getOtherParticipant = (): { name: string; avatar: string | null } => {
    if (!selectedRoom) return { name: "Unknown", avatar: null };

    try {
      const members = selectedRoom.getJoinedMembers?.() || [];
      const myUserId = selectedRoom.myUserId;

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

    return { name: selectedRoom.name || "Unknown", avatar: null };
  };

  // Format timestamp
  const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Format date header
  const formatDateHeader = (timestamp: number): string => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    }
  };

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups: { date: string; messages: Message[] }[] = [];
    let currentDate = "";

    messages.forEach((msg) => {
      const msgDate = new Date(msg.timestamp).toDateString();
      if (msgDate !== currentDate) {
        currentDate = msgDate;
        groups.push({ date: formatDateHeader(msg.timestamp), messages: [msg] });
      } else {
        groups[groups.length - 1].messages.push(msg);
      }
    });

    return groups;
  };

  const participant = getOtherParticipant();
  const messageGroups = groupMessagesByDate();
  const participantAvatarUrl = getFullAvatarUrl(participant.avatar);

  return (
    <div className="message-area-page">
      {/* Header */}
      <header className="message-header">
        <div className="header-left">
          {showBackButton && (
            <button className="back-btn" onClick={onBack}>
              <ArrowLeft size={22} />
            </button>
          )}
          <div className="header-avatar">
            {participantAvatarUrl ? (
              <img src={participantAvatarUrl} alt={participant.name} />
            ) : (
              <span>{participant.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="header-info">
            <h2 className="header-name">{participant.name}</h2>
            <p className="header-status">Online</p>
          </div>
        </div>

        <div className="header-actions">
          <button className="action-btn" onClick={onVoiceCall} title="Voice Call">
            <Phone size={20} />
          </button>
          <button className="action-btn" onClick={onVideoCall} title="Video Call">
            <Video size={20} />
          </button>
          <div className="menu-container">
            <button
              className="action-btn"
              onClick={() => setShowMenu(!showMenu)}
              title="More Options"
            >
              <MoreVertical size={20} />
            </button>
            {showMenu && (
              <div className="dropdown-menu">
                <button onClick={onLeaveRoom}>
                  <LogOut size={16} />
                  Leave Conversation
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="messages-container" ref={messagesContainerRef}>
        {messageGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="message-group">
            <div className="date-divider">
              <span>{group.date}</span>
            </div>
            {group.messages.map((msg, msgIndex) => {
              const isMe = msg.sender === matrixUserId;
              const senderName = getUserDisplayName(msg.sender);
              const senderAvatar = getFullAvatarUrl(getUserAvatar(msg.sender));
              const showAvatar =
                !isMe &&
                (msgIndex === 0 ||
                  group.messages[msgIndex - 1]?.sender !== msg.sender);

              return (
                <div
                  key={msg.id}
                  className={`message ${isMe ? "message-sent" : "message-received"}`}
                >
                  {!isMe && (
                    <div className="message-avatar-wrapper">
                      {showAvatar ? (
                        <div className="message-avatar">
                          {senderAvatar ? (
                            <img src={senderAvatar} alt={senderName} />
                          ) : (
                            <span>{senderName.charAt(0).toUpperCase()}</span>
                          )}
                        </div>
                      ) : (
                        <div className="message-avatar-spacer" />
                      )}
                    </div>
                  )}
                  <div className="message-content-wrapper">
                    {showAvatar && !isMe && (
                      <span className="message-sender">{senderName}</span>
                    )}
                    <div className="message-bubble">
                      <p className="message-text">{msg.content}</p>
                      <span className="message-time">{formatTime(msg.timestamp)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="message-input-container">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            value={newMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
          />
          <button
            className={`send-btn ${newMessage.trim() ? "active" : ""}`}
            onClick={onSendMessage}
            disabled={sending || !newMessage.trim()}
          >
            {sending ? (
              <div className="send-spinner" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </div>
        <p className="input-hint">Press Enter to send, Shift+Enter for new line</p>
      </div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div className="menu-backdrop" onClick={() => setShowMenu(false)} />
      )}
    </div>
  );
};

export default MessageAreaPage;