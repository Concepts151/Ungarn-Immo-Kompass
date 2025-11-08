import React from "react";
import "./css/matrixchat.css";
import { Hash, Trash2 } from "lucide-react";
import RoomInvites from "./RoomInvites";

interface RoomListProps {
  rooms: any[];
  invites: any[];
  selectedRoom: any | null;
  onSelectRoom: (room: any) => void;
  onLeaveRoom: (room: any) => void;
  //   onStartDirectChat: () => void;
  onAcceptInvite: (roomId: string) => void;
  onRejectInvite: (roomId: string) => void;
}

const RoomList = ({
  rooms,
  invites,
  selectedRoom,
  onSelectRoom,
  onLeaveRoom,
  //   onStartDirectChat,
  onAcceptInvite,
  onRejectInvite,
}: RoomListProps) => {
  return (
    <div className="room_list_wrapper">
      <div className="room_list_container">
        <h4 className="chat_count_sub">
          <Hash size={16} /> Chats ({rooms.length})
        </h4>
        {/* Room Invites */}
        <RoomInvites
          invites={invites}
          onAcceptInvite={onAcceptInvite}
          onRejectInvite={onRejectInvite}
        /> 
        {rooms.length == 0 ? (
          <p className="no_chats_text">No active chats</p>
        ) : (
          <div style={{marginTop: '10px'}}>
            {rooms.map((room) => (
              <div key={room.roomId} className="room-item">
                <button 
                  onClick={() => onSelectRoom(room)} 
                  className="room-button">
                  <p className="room-name">{room.name || "Unnamed Room"}</p>
                  <p className="room-messages">
                    {room.timeline?.length || 0} messages
                  </p>
                </button>

                <button
                  onClick={() => onLeaveRoom(room)}
                  className="leave-room-btn"
                  title="Leave room"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomList;
