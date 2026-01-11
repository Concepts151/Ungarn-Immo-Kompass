import React from "react";
import { Video, Phone, LogOut } from "lucide-react";
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
  
  // Get other participant's info for display (exclude admin)
  const getOtherParticipantInfo = (): { name: string; avatarUrl: string | null } | null => {
    if (!room) {
      console.log("[RoomHeader] No room object");
      return null;
    }

    try {
      const members = room.getJoinedMembers?.() || [];
      const myUserId = room.myUserId;

      console.log("[RoomHeader] Room:", room.name);
      console.log("[RoomHeader] Total members:", members.length);
      console.log("[RoomHeader] My user ID:", myUserId);
      console.log("[RoomHeader] All member IDs:", members.map((m: any) => m.userId));

      // Filter out: current user, and admin users (those with "admin" in their Matrix ID)
      const otherMember = members.find((m: any) => {
        const memberId = m.userId || "";
        const isMe = memberId === myUserId;
        const isAdmin = memberId.toLowerCase().includes("admin");

        console.log(`[RoomHeader] Checking member: ${memberId}, isMe: ${isMe}, isAdmin: ${isAdmin}`);

        return !isMe && !isAdmin;
      });

      if (!otherMember) {
        console.log("[RoomHeader] ⚠️ No other member found after filtering");
        return null;
      }

      console.log("[RoomHeader] Other member found:", otherMember.userId);

      // Use getUserDisplayName and getUserAvatar if available
      const name = getUserDisplayName
        ? getUserDisplayName(otherMember.userId)
        : otherMember?.name || otherMember?.userId?.split(":")[0]?.replace("@", "")?.replace("immo_", "");

      const avatarUrl = getUserAvatar
        ? getUserAvatar(otherMember.userId)
        : null;

      console.log("[RoomHeader] Display name:", name);
      console.log("[RoomHeader] Avatar URL:", avatarUrl);

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