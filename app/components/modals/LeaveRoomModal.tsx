import { AlertCircle } from "lucide-react";
import React from "react";

interface LeaveRoomModalProps {
  show: boolean;
  room: any | null;
  error: string;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LeaveRoomModal = ({
  show,
  room,
  error,
  loading,
  onClose,
  onConfirm,
}: LeaveRoomModalProps) => {
  if (!show || !room) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 70,
      }}
      className="bg-black-50"
      onClick={() => !loading && onClose()}
    >
      <div
        className=""
        style={{
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "24px",
          width: "100%",
          maxWidth: "448px",
          boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className=""
          style={{
            display: "flex",
            alignItems: "start",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <div
            className=""
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#ffe2e2",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <AlertCircle size={24} color="#e63946" />
          </div>
          <div className="" style={{ flex: 1 }}>
            <h2
              className=""
              style={{
                fontSize: "20px",
                lineHeight: 1.4,
                margin: 0,
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Leave Room?
            </h2>
            <p
              className=""
              style={{
                color: "#4a5565",
                fontSize: "14px",
                lineHeight: "1.428571",
                marginBottom: "8px",
              }}
            >
              Are you sure you want to leave "{room.name || "Unnamed Room"}"?
            </p>
            <p style={{ color: "#6a7282", fontSize: "12px" }}>
              You won't be able to see new messages unless you're invited back.
            </p>
          </div>
        </div>
        {error && (
          <div
            className=""
            style={{
              marginBottom: "16px",
              backgroundColor: "#fef2f2",
              border: "1px solid #ea9595ff",
              borderRadius: "8px",
              padding: "12px",
            }}
          >
            <p className="" style={{ color: "red", fontSize: "14px" }}>
              {error}
            </p>
          </div>
        )}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            className=""
            onClick={onClose}
            disabled={loading}
            style={{
              flex: 1,
              background: "#f9fafb ",
              border: "none",
              color: "#374151",
              padding: "16px",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            className=""
            onClick={onConfirm}
            disabled={loading}
            style={{
              flex: 1,
              background: "#e63946",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Leaving..." : "Leave"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveRoomModal;
