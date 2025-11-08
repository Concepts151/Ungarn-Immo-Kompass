import { Check, Mail, X } from "lucide-react";
import React from "react";

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
  if (invites.length === 0) return null;
  return (
    <div className="room_invites_wrapper">
      <div className="room_invites_header">
        <Mail size={16} /> Invites ({invites.length})
      </div>
      <div className="space-y-5">
        {invites.map((invite) => {
          const inviter = invite.getDMInviter?.() || "Unknown";
          const roomName = invite.name || "Chat Room";
          return (
            <div className="invite_wrapper" key={invite.roomId}>
              <div className="invite_card">
                <div className="" style={{ flex: 1, minWidth: "0px" }}>
                  <p
                    className=""
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      margin: "0px",
                    }}
                  >
                    {roomName}
                  </p>
                  <p
                    className=""
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      margin: "0px",
                    }}
                  >
                    From: {inviter.split(":")[0]?.substring(1) || inviter}
                  </p>
                </div>
                <div
                  className=""
                  style={{
                    display: "flex",
                    gap: "5px",
                  }}
                >
                  <button
                    className="btn btn-success"
                    onClick={() => onAcceptInvite(invite.roomId)}
                  >
                    {" "}
                    <Check size={16} />
                  </button>

                  <button
                    onClick={() => onRejectInvite(invite.roomId)}
                    className="btn btn-danger"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoomInvites;
