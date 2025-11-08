import { Trash2 } from "lucide-react";
import React from "react";

interface RoomHeaderProps {
  room: any;
  propertyAddress?: string;
  onLeaveRoom: () => void;
  onVideoCall?: () => void;
  onVoiceCall?: () => void;
}

const RoomHeader = ({
  room,
  propertyAddress,
  onLeaveRoom,
  onVideoCall,
  onVoiceCall,
}: RoomHeaderProps) => {
  return (
    <div className="room_header_wrapper">
      <div className="header_info_section">
        <h4 className="">{room.name || "Chat"}</h4>
        <p className="">
          {(room.getJoinedMembers?.()?.length || 0) + " members"}
        </p>
      </div>
      <div className="">
        <button className="btn "  onClick={onLeaveRoom}><Trash2 size={18} /></button>
      </div>
    </div>
  );
};

export default RoomHeader;
