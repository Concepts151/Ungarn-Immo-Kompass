import React, { useEffect, useRef } from "react";
import "./css/messagelist.css";

interface MatrixUserInfo {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl: string | null;
  role: string;
}

interface MessageListProps {
  messages: any[];
  matrixUserId: string;
  userCache?: Record<string, MatrixUserInfo>;
  getUserDisplayName?: (matrixUserId: string) => string;
  getUserAvatar?: (matrixUserId: string) => string | null;
}

const MessageList = ({
  messages,
  matrixUserId,
  userCache,
  getUserDisplayName,
  getUserAvatar,
}: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Helper to get display name
  const getDisplayName = (senderId: string): string => {
    if (getUserDisplayName) {
      return getUserDisplayName(senderId);
    }
    // Check userCache directly
    if (userCache?.[senderId]) {
      const user = userCache[senderId];
      return user.fullName || `${user.firstName} ${user.lastName}`.trim();
    }
    // Fallback: extract from Matrix ID
    return senderId.split(":")[0].replace("@", "").replace("immo_", "");
  };

  // Helper to get avatar
  const getAvatar = (senderId: string): string | null => {
    if (getUserAvatar) {
      return getUserAvatar(senderId);
    }
    // Check userCache directly
    return userCache?.[senderId]?.avatarUrl || null;
  };

  // Format timestamp
  const formatMessageTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Group consecutive messages from same sender
  const shouldShowSender = (index: number): boolean => {
    if (index === 0) return true;
    const currentSender = messages[index].getSender?.();
    const prevSender = messages[index - 1].getSender?.();
    return currentSender !== prevSender;
  };

  if (messages.length === 0) {
    return (
      <div className="message-list-empty">
        <p>No messages yet. Start the conversation!</p>
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.map((message, index) => {
        const senderId = message.getSender?.() || "";
        const content = message.getContent?.();
        const body = content?.body || "";
        const timestamp = message.getTs?.() || 0;
        const isOwnMessage = senderId === matrixUserId;
        const showSender = shouldShowSender(index);
        const displayName = getDisplayName(senderId);
        const avatarUrl = getAvatar(senderId);

        return (
          <div
            key={message.getId?.() || index}
            className={`message-item ${
              isOwnMessage ? "message-own" : "message-other"
            }`}
          >
            {/* Avatar for other users' messages */}
            {!isOwnMessage && showSender && (
              <div className="message-avatar">
                {avatarUrl ? (
                  <img
                    src={`https://jzhlioxxjwqwvwybtcfl.supabase.co/storage/v1/object/public/avatars/${avatarUrl}`}
                    alt={displayName}
                    className="avatar-img"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            )}

            {/* Spacer for continued messages without avatar */}
            {!isOwnMessage && !showSender && (
              <div className="message-avatar-spacer" />
            )}

            {/* Message content */}
            <div className="message-content">
              {/* Sender name */}
              {!isOwnMessage && showSender && (
                <span className="message-sender">{displayName}</span>
              )}

              {/* Message bubble */}
              <div
                className={`message-bubble ${
                  isOwnMessage ? "bubble-own" : "bubble-other"
                }`}
              >
                <p className="message-text">{body}</p>
                <span className="message-time">
                  {formatMessageTime(timestamp)}
                </span>
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
