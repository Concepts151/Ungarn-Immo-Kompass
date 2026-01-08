"use client";

import React, { useState, useEffect } from "react";
import { useMatrixSocket } from "@/hooks/useMatrixSocket";
import MessageList from "./MessageList";
import RoomList from "./RoomList";
import MessageInput from "./MessageInput";
import LanguageSelector from "@/components/chat/LanguageSelector";
import "./css/matrixchat.css";

interface MatrixChatSimpleProps {
  userId: string;
}

/**
 * Simplified Matrix Chat Component using WebSocket
 * All Matrix logic handled server-side - frontend is just UI
 */
const MatrixChatSimple: React.FC<MatrixChatSimpleProps> = ({ userId }) => {
  const {
    isConnected,
    rooms,
    messages,
    userCache,
    error,
    loadMessages,
    sendMessage,
  } = useMatrixSocket(userId);

  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);
  const [isSending, setIsSending] = useState(false);

  // Load messages when room is selected
  useEffect(() => {
    if (selectedRoom) {
      loadMessages(selectedRoom.roomId);
    }
  }, [selectedRoom, loadMessages]);

  const handleSelectRoom = (room: any) => {
    console.log("[MatrixChatSimple] Room selected:", room.name);
    setSelectedRoom(room);
  };

  const handleSendMessage = async (text: string) => {
    if (!selectedRoom || !text.trim() || isSending) return;

    setIsSending(true);
    try {
      await sendMessage(selectedRoom.roomId, text);
      console.log("[MatrixChatSimple] Message sent successfully");
    } catch (err: any) {
      console.error("[MatrixChatSimple] Failed to send message:", err.message);
      alert(`Failed to send message: ${err.message}`);
    } finally {
      setIsSending(false);
    }
  };

  if (!userId) {
    return (
      <div className="matrix-chat-container">
        <div className="error-state">
          <p>Please log in to use chat</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="matrix-chat-container">
        <div className="error-state">
          <h3>Connection Error</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="matrix-chat-container">
        <div className="loading-state">
          <div className="spinner" />
          <p>Connecting to chat server...</p>
        </div>
      </div>
    );
  }

  const currentMessages = selectedRoom ? messages[selectedRoom.roomId] || [] : [];

  return (
    <div className="matrix-chat-container">
      {/* Header with language selector */}
      <div className="chat-header">
        <h2>Messages</h2>
        <div className="header-actions">
          <LanguageSelector />
        </div>
      </div>

      <div className="chat-content">
        {/* Room List */}
        <div className="room-list-container">
          <RoomList
            rooms={rooms}
            selectedRoom={selectedRoom}
            onSelectRoom={handleSelectRoom}
            getUserDisplayName={(matrixUserId) => {
              const user = userCache[matrixUserId];
              return user?.fullName || matrixUserId.split(":")[0].replace("@", "").replace("immo_", "");
            }}
          />

          {rooms.length === 0 && (
            <div className="empty-state">
              <p>No conversations yet</p>
            </div>
          )}
        </div>

        {/* Messages Area */}
        <div className="messages-container">
          {selectedRoom ? (
            <>
              <div className="messages-header">
                <h3>{selectedRoom.name}</h3>
              </div>

              <MessageList
                messages={currentMessages.map((msg) => ({
                  getId: () => msg.id,
                  getSender: () => msg.sender,
                  getContent: () => ({ body: msg.body }),
                  getTs: () => msg.timestamp,
                }))}
                matrixUserId={`@immo_${userId}:151.hu`}
                userCache={userCache}
                getUserDisplayName={(matrixUserId) => {
                  const user = userCache[matrixUserId];
                  return user?.fullName || matrixUserId.split(":")[0].replace("@", "").replace("immo_", "");
                }}
                getUserAvatar={(matrixUserId) => {
                  return userCache[matrixUserId]?.avatarUrl || null;
                }}
              />

              <MessageInput
                onSendMessage={handleSendMessage}
                disabled={isSending}
                placeholder={isSending ? "Sending..." : "Type a message..."}
              />
            </>
          ) : (
            <div className="no-room-selected">
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MatrixChatSimple;
