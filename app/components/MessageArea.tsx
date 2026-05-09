import { MessageCircle } from "lucide-react";
import React from "react";
import RoomHeader from "./RoomHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

interface MatrixUserInfo {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  avatarUrl: string | null;
  role: string;
}

interface MessagesAreaProps {
  selectedRoom: any | null;
  messages: any[];
  matrixUserId: string;
  newMessage: string;
  sending: boolean;
  propertyAddress?: string;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onLeaveRoom: () => void;
  onVideoCall?: () => void;
  onVoiceCall?: () => void;
  userCache?: Record<string, MatrixUserInfo>;
  getUserDisplayName?: (matrixUserId: string) => string;
  getUserAvatar?: (matrixUserId: string) => string | null;
  onBack?: () => void;
}

const MessageArea = ({
  selectedRoom,
  messages,
  matrixUserId,
  newMessage,
  sending,
  propertyAddress,
  onMessageChange,
  onSendMessage,
  onLeaveRoom,
  onVideoCall,
  onVoiceCall,
  userCache,
  getUserDisplayName,
  getUserAvatar,
  onBack,
}: MessagesAreaProps) => {
  if (!selectedRoom) {
    return (
      <div className="no_selection_wrapper">
        <div className="" style={{ textAlign: "center" }}>
          <MessageCircle
            size={48}
            style={{
              marginInline: "auto",
              opacity: "50%",
              marginBottom: "10px",
            }}
          />
          <p className="">Select a room to start chatting</p>
        </div>
      </div>
    );
  }
  return (
    <div className="message_area_wrapper">
      <RoomHeader
        room={selectedRoom}
        propertyAddress={propertyAddress}
        onLeaveRoom={onLeaveRoom}
        onVideoCall={onVideoCall}
        onVoiceCall={onVoiceCall}
        getUserDisplayName={getUserDisplayName}
        getUserAvatar={getUserAvatar}
        onBack={onBack}
      />
      {/* Message List */}
      <MessageList 
        messages={messages} 
        matrixUserId={matrixUserId}
        userCache={userCache}
        getUserDisplayName={getUserDisplayName}
        getUserAvatar={getUserAvatar}
      />
      <MessageInput
        value={newMessage}
        sending={sending}
        onChange={onMessageChange}
        onSend={onSendMessage}
      />
    </div>
  );
};

export default MessageArea;