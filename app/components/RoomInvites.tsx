import React from "react";
import "./css/matrixchat.css";
import { Check, X, Mail } from "lucide-react";

interface RoomInvitesProps {
  invites: any[];
  onAcceptInvite: (roomId: string) => void;
  onRejectInvite: (roomId: string) => void;
}

const RoomInvites = ({
  invites,
  onAcceptInvite,
  onRejectInvite,
}: RoomInvitesProps) => {
  if (invites.length === 0) {
    return null;
  }

  return (
    <div className="room-invites-section">
      <div className="invites-header">
        <Mail size={16} />
        <span>Invites ({invites.length})</span>
      </div>
      
      <div className="invites-list">
        {invites.map((invite) => {
          const roomName = invite.name || "Unnamed Room";
          const inviter = invite.getDMInviter?.() || "Someone";
          
          return (
            <div key={invite.roomId} className="invite-item">
              <div className="invite-info">
                <p className="invite-room-name">{roomName}</p>
                <p className="invite-from">From: {inviter}</p>
              </div>
              
              <div className="invite-actions">
                <button
                  onClick={() => {
                    console.log("🎯 Accept button clicked for room:", invite.roomId);
                    onAcceptInvite(invite.roomId);
                  }}
                  className="accept-invite-btn"
                  title="Accept invite"
                >
                  <Check size={16} />
                </button>
                
                <button
                  onClick={() => {
                    console.log("🎯 Reject button clicked for room:", invite.roomId);
                    onRejectInvite(invite.roomId);
                  }}
                  className="reject-invite-btn"
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