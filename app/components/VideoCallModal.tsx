import React from "react";
import {
  Phone,
  PhoneOff,
  Video,
  VideoOff,
  Mic,
  MicOff,
  X,
} from "lucide-react";
import "./css/videocall.css";

interface VideoCallModalProps {
  show: boolean;
  isVideoCall: boolean;
  callState: "idle" | "calling" | "connecting" | "connected" | "ended";
  isMuted: boolean;
  isVideoEnabled: boolean;
  isOutgoingCall: boolean;
  remoteName: string;
  localVideoRef: React.RefObject<HTMLVideoElement>;
  remoteVideoRef: React.RefObject<HTMLVideoElement>;
  onAnswer: () => void;
  onReject: () => void;
  onHangup: () => void;
  onToggleMute: () => void;
  onToggleVideo: () => void;
}

const VideoCallModal: React.FC<VideoCallModalProps> = ({
  show,
  isVideoCall,
  callState,
  isMuted,
  isVideoEnabled,
  isOutgoingCall,
  remoteName,
  localVideoRef,
  remoteVideoRef,
  onAnswer,
  onReject,
  onHangup,
  onToggleMute,
  onToggleVideo,
}) => {
  if (!show) return null;

  const getStatusText = () => {
    switch (callState) {
      case "calling":
        return isOutgoingCall ? "Calling..." : "Incoming call";
      case "connecting":
        return "Connecting...";
      case "connected":
        return "Connected";
      case "ended":
        return "Call ended";
      default:
        return "";
    }
  };

  const isIncoming = !isOutgoingCall && callState === "calling";
  const showControls = callState === "connected" || callState === "connecting";

  return (
    <div className="video-call-overlay">
      <div className={`video-call-modal ${isVideoCall ? "video-mode" : "audio-mode"}`}>
        {/* Header */}
        <div className="video-call-header">
          <div className="call-info">
            <h3>{remoteName || "Unknown"}</h3>
            <p className={`call-status ${callState}`}>{getStatusText()}</p>
          </div>
          <button className="close-btn" onClick={onHangup} title="End call">
            <X size={20} />
          </button>
        </div>

        {/* Video Area */}
        <div className="video-call-content">
          {isVideoCall ? (
            <>
              {/* Remote Video (large) */}
              <div className="remote-video-container">
                <video
                  ref={remoteVideoRef}
                  autoPlay
                  playsInline
                  muted={false}
                  className="remote-video"
                  onLoadedMetadata={() => console.log("Remote video metadata loaded")}
                  onPlay={() => console.log("Remote video playing")}
                />
                {callState !== "connected" && (
                  <div className="video-placeholder">
                    <div className="avatar-circle-large">
                      {remoteName?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <p>{getStatusText()}</p>
                  </div>
                )}
              </div>

              {/* Local Video (small, picture-in-picture) */}
              <div className={`local-video-container ${!isVideoEnabled ? "video-off" : ""}`}>
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted={true}
                  className="local-video"
                />
                {!isVideoEnabled && (
                  <div className="video-off-indicator">
                    <VideoOff size={24} />
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Audio call - show avatar */
            <div className="audio-call-content">
              <div className="avatar-circle-large">
                {remoteName?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <h3>{remoteName || "Unknown"}</h3>
              <p className={`call-status ${callState}`}>{getStatusText()}</p>
              
              {/* Audio visualizer placeholder */}
              {callState === "connected" && (
                <div className="audio-visualizer">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="video-call-controls">
          {isIncoming ? (
            /* Incoming call - show accept/reject */
            <div className="incoming-call-buttons">
              <button
                className="call-btn reject-btn"
                onClick={onReject}
                title="Reject call"
              >
                <PhoneOff size={24} />
              </button>
              <button
                className="call-btn answer-btn"
                onClick={onAnswer}
                title="Answer call"
              >
                {isVideoCall ? <Video size={24} /> : <Phone size={24} />}
              </button>
            </div>
          ) : (
            /* Active call - show mute/video/hangup */
            <div className="active-call-buttons">
              <button
                className={`control-btn ${isMuted ? "active" : ""}`}
                onClick={onToggleMute}
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
              </button>

              {isVideoCall && (
                <button
                  className={`control-btn ${!isVideoEnabled ? "active" : ""}`}
                  onClick={onToggleVideo}
                  title={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
                >
                  {isVideoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
                </button>
              )}

              <button
                className="call-btn hangup-btn"
                onClick={onHangup}
                title="End call"
              >
                <PhoneOff size={24} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;