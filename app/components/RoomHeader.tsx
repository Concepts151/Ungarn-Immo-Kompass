import React, { useState } from "react";
import { Video, Phone, LogOut, ChevronLeft, User } from "lucide-react";
import "./css/roomheader.css";
import LanguageSelector from "@/components/chat/LanguageSelector";

interface RoomHeaderProps {
  room: any;
  propertyAddress?: string;
  onLeaveRoom: () => void;
  onVideoCall?: () => void;
  onVoiceCall?: () => void;
  getUserDisplayName?: (matrixUserId: string) => string;
  getUserAvatar?: (matrixUserId: string) => string | null;
  onBack?: () => void;
}

// Helper component for avatar with broken-image fallback
const RoomHeaderAvatar = ({ avatarUrl, name }: { avatarUrl: string | null; name: string }) => {
  const [err, setErr] = useState(false);
  const resolvedUrl = avatarUrl
    ? (avatarUrl.startsWith("http") || avatarUrl.startsWith("blob:")
        ? avatarUrl
        : `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005"}/uploads/${avatarUrl}`)
    : null;
  
  if (!err && resolvedUrl) {
    return <img src={resolvedUrl} alt={name} className="room-header-avatar-img" onError={() => setErr(true)} />;
  }
  return <User size={20} color="#9ca3af" />;
};

const RoomHeader: React.FC<RoomHeaderProps> = ({
  room,
  propertyAddress,
  onLeaveRoom,
  onVideoCall,
  onVoiceCall,
  getUserDisplayName,
  getUserAvatar,
  onBack,
}) => {
  const roomName = room?.name || "Chat";
  
  // Get other participant's info for display (exclude admin)
  const getOtherParticipantInfo = (): { name: string; avatarUrl: string | null } | null => {
    if (!room) return null;

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

      if (!otherMember) return null;

      // Use getUserDisplayName and getUserAvatar if available
      const name = getUserDisplayName
        ? getUserDisplayName(otherMember.userId)
        : otherMember?.name || otherMember?.userId?.split(":")[0]?.replace("@", "")?.replace("immo_", "");

      const avatarUrl = getUserAvatar
        ? getUserAvatar(otherMember.userId)
        : null;

      return { name, avatarUrl };
    } catch (error) {
      console.error("[RoomHeader] Error getting other participant:", error);
      return null;
    }
  };

  const otherParticipant = getOtherParticipantInfo();

  return (
    <div className="room-header">
      <div className="room-header-info">
        {onBack && (
          <button 
            onClick={onBack} 
            className="room-header-back-btn mobile-only"
            aria-label="Back to conversations"
          >
            <ChevronLeft size={24} />
          </button>
        )}
        <div className="room-header-avatar">
          <RoomHeaderAvatar avatarUrl={otherParticipant?.avatarUrl || null} name={otherParticipant?.name || roomName} />
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
        {/* Language Selector */}
        <LanguageSelector />

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