import React from "react";
import { Video, Phone, LogOut } from "lucide-react";
import "./css/roomheader.css";

interface RoomHeaderProps {
  room: any;
  propertyAddress?: string;
  onLeaveRoom: () => void;
  onVideoCall?: () => void;
  onVoiceCall?: () => void;
  getUserDisplayName?: (matrixUserId: string) => string;
  getUserAvatar?: (matrixUserId: string) => string | null;
}

const RoomHeader: React.FC<RoomHeaderProps> = ({
  room,
  propertyAddress,
  onLeaveRoom,
  onVideoCall,
  onVoiceCall,
  getUserDisplayName,
  getUserAvatar,
}) => {
  const roomName = room?.name || "Chat";
  
  // Get other participant's info for display
  const getOtherParticipantInfo = (): { name: string; avatarUrl: string | null } | null => {
    if (!room) return null;
    
    try {
      const members = room.getJoinedMembers?.() || [];
      const myUserId = room.myUserId;
      const otherMember = members.find((m: any) => m.userId !== myUserId);
      
      if (!otherMember) return null;
      
      // Use getUserDisplayName and getUserAvatar if available
      const name = getUserDisplayName 
        ? getUserDisplayName(otherMember.userId)
        : otherMember?.name || otherMember?.userId?.split(":")[0]?.replace("@", "")?.replace("immo_", "");
      
      const avatarUrl = getUserAvatar 
        ? getUserAvatar(otherMember.userId)
        : null;
      
      return { name, avatarUrl };
    } catch {
      return null;
    }
  };

  const otherParticipant = getOtherParticipantInfo();

  return (
    <div className="room-header">
      <div className="room-header-info">
        <div className="room-header-avatar">
          {otherParticipant?.avatarUrl ? (
            <img 
              src={`https://jzhlioxxjwqwvwybtcfl.supabase.co/storage/v1/object/public/avatars/${otherParticipant.avatarUrl}`} 
              alt={otherParticipant.name} 
              className="room-header-avatar-img"
            />
          ) : (
            <span>{(otherParticipant?.name || roomName).charAt(0).toUpperCase()}</span>
          )}
        </div>
        <div className="room-header-details">
          <h4 className="room-header-name">{roomName}</h4>
          {otherParticipant && (
            <p className="room-header-participant">with {otherParticipant.name}</p>
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