import React from "react";
import { Video, Phone, LogOut } from "lucide-react";
import "./css/roomheader.css";

interface RoomHeaderProps {
  room: any;
  propertyAddress?: string;
  onLeaveRoom: () => void;
  onVideoCall?: () => void;
  onVoiceCall?: () => void;
}

const RoomHeader: React.FC<RoomHeaderProps> = ({
  room,
  propertyAddress,
  onLeaveRoom,
  onVideoCall,
  onVoiceCall,
}) => {
  const roomName = room?.name || "Chat";
  
  // Get other participant's name for display
  const getOtherParticipant = () => {
    if (!room) return null;
    
    try {
      const members = room.getJoinedMembers?.() || [];
      const myUserId = room.myUserId;
      const otherMember = members.find((m: any) => m.userId !== myUserId);
      return otherMember?.name || otherMember?.userId?.split(":")[0]?.replace("@", "");
    } catch {
      return null;
    }
  };

  const otherParticipant = getOtherParticipant();

  return (
    <div className="room-header">
      <div className="room-header-info">
        <div className="room-header-avatar">
          {roomName.charAt(0).toUpperCase()}
        </div>
        <div className="room-header-details">
          <h4 className="room-header-name">{roomName}</h4>
          {otherParticipant && (
            <p className="room-header-participant">with {otherParticipant}</p>
          )}
          {propertyAddress && propertyAddress !== "propertyAddress" && (
            <p className="room-header-property">{propertyAddress}</p>
          )}
        </div>
      </div>

      <div className="room-header-actions">
        {/* Voice Call Button */}
        {onVoiceCall && (
          <button
            onClick={onVoiceCall}
            className="room-header-btn call-btn"
            title="Start voice call"
          >
            <Phone size={18} />
          </button>
        )}

        {/* Video Call Button */}
        {onVideoCall && (
          <button
            onClick={onVideoCall}
            className="room-header-btn call-btn"
            title="Start video call"
          >
            <Video size={18} />
          </button>
        )}

        {/* Leave Room Button */}
        <button
          onClick={onLeaveRoom}
          className="room-header-btn leave-btn"
          title="Leave room"
        >
          <LogOut size={18} />
        </button>
      </div>
    </div>
  );
};

export default RoomHeader;