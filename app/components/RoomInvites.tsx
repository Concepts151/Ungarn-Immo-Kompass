import React from "react";
import { Check, X, Mail } from "lucide-react";

interface RoomInvitesProps {
  invites: any[];
  onAcceptInvite: (roomId: string) => void;
  onRejectInvite: (roomId: string) => void;
}

const RoomInvites: React.FC<RoomInvitesProps> = ({
  invites,
  onAcceptInvite,
  onRejectInvite,
}) => {
  if (!invites || invites.length === 0) {
    return null;
  }

  return (
    <div className="room-invites-container">
      <h5 className="invites-header">
        <Mail size={14} /> Pending Invites ({invites.length})
      </h5>
      
      <div className="invites-list">
        {invites.map((invite) => {
          const roomId = invite.roomId || invite.room_id;
          const roomName = invite.name || "Unknown Room";
          
          return (
            <div key={roomId} className="invite-item">
              <div className="invite-info">
                <p className="invite-room-name">{roomName}</p>
                <p className="invite-label">You've been invited</p>
              </div>
              
              <div className="invite-actions">
                <button
                  onClick={() => {
                    console.log('[RoomInvites] Accept button clicked, roomId:', roomId);
                    onAcceptInvite(roomId);
                  }}
                  className="invite-btn accept-btn"
                  title="Accept invite"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => {
                    console.log('[RoomInvites] Reject button clicked, roomId:', roomId);
                    onRejectInvite(roomId);
                  }}
                  className="invite-btn reject-btn"
                  title="Reject invite"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomInvites;