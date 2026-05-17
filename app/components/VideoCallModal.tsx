import React, { useEffect, useState } from "react";
import {
  Phone,
  PhoneOff,
  Video,
  VideoOff,
  Mic,
  MicOff,
  X,
  PhoneIncoming,
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
  remoteAvatar?: string | null;
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
  remoteAvatar,
  localVideoRef,
  remoteVideoRef,
  onAnswer,
  onReject,
  onHangup,
  onToggleMute,
  onToggleVideo,
}) => {
  const [callDuration, setCallDuration] = useState(0);

  // Call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callState === "connected") {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [callState]);

  if (!show) return null;

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getStatusText = () => {
    switch (callState) {
      case "calling":
        return isOutgoingCall ? "Calling..." : "Incoming call";
      case "connecting":
        return "Connecting...";
      case "connected":
        return formatDuration(callDuration);
      case "ended":
        return "Call ended";
      default:
        return "";
    }
  };

  const isIncoming = !isOutgoingCall && callState === "calling";

  return (
    <div className={`video-call-overlay ${isIncoming ? "incoming" : ""}`}>
      <div className={`video-call-modal ${isVideoCall ? "video-mode" : "audio-mode"}`}>
        
        {/* Video Call Layout */}
        {isVideoCall ? (
          <div className="video-call-container">
            {/* Remote Video */}
            <div className="remote-video-wrapper">
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                muted={false}
                className="remote-video"
                onLoadedMetadata={() => console.log("Remote video metadata loaded")}
                onPlay={() => console.log("Remote video playing")}
              />
              
              {/* Placeholder when not connected */}
              {callState !== "connected" && (
                <div className="video-placeholder">
                  <div className="avatar-wrapper">
                    {remoteAvatar ? (
                      <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005"}/uploads/${remoteAvatar}`} alt={remoteName} className="avatar-img" />
                    ) : (
                      <div className="avatar-fallback">
                        {remoteName?.charAt(0)?.toUpperCase() || "?"}
                      </div>
                    )}
                    {(callState === "calling" || callState === "connecting") && (
                      <div className="avatar-pulse"></div>
                    )}
                  </div>
                  <h2 className="remote-name">{remoteName || "Unknown"}</h2>
                  <p className="call-status-text">{getStatusText()}</p>
                </div>
              )}

              {/* Connected info overlay */}
              {callState === "connected" && (
                <div className="connected-overlay">
                  <div className="connected-info">
                    <span className="live-dot"></span>
                    <span className="connected-name">{remoteName}</span>
                    <span className="connected-timer">{formatDuration(callDuration)}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Local Video PIP */}
            <div className={`local-video-wrapper ${!isVideoEnabled ? "camera-off" : ""}`}>
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted={true}
                className="local-video"
              />
              {!isVideoEnabled && (
                <div className="camera-off-overlay">
                  <VideoOff size={20} />
                  <span>Camera off</span>
                </div>
              )}
            </div>

            {/* Close button */}
            <button className="close-call-btn" onClick={onHangup} title="End call">
              <X size={20} />
            </button>
          </div>
        ) : (
          /* Audio Call Layout */
          <div className="audio-call-container">
            {/* Animated background */}
            <div className="audio-bg">
              <div className="audio-bg-circle"></div>
              <div className="audio-bg-circle delay-1"></div>
              <div className="audio-bg-circle delay-2"></div>
            </div>

            {/* Main content */}
            <div className="audio-main">
              <div className="avatar-wrapper large">
                {remoteAvatar ? (
                  <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005"}/uploads/${remoteAvatar}`} alt={remoteName} className="avatar-img" />
                ) : (
                  <div className="avatar-fallback">
                    {remoteName?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                )}
                {(callState === "calling" || callState === "connecting") && (
                  <div className="avatar-pulse"></div>
                )}
              </div>

              <h2 className="remote-name">{remoteName || "Unknown"}</h2>
              
              <p className="call-status-text">
                {isIncoming && <PhoneIncoming size={16} className="status-icon" />}
                {getStatusText()}
              </p>

              {/* Audio visualizer when connected */}
              {callState === "connected" && (
                <div className="audio-visualizer">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className={`call-controls ${isIncoming ? "incoming-mode" : ""}`}>
          {isIncoming ? (
            <div className="incoming-buttons">
              <div className="btn-group">
                <button
                  className="call-action-btn decline"
                  onClick={onReject}
                  title="Decline"
                >
                  <PhoneOff size={26} />
                </button>
                <span className="btn-label">Decline</span>
              </div>
              <div className="btn-group">
                <button
                  className="call-action-btn accept"
                  onClick={onAnswer}
                  title="Accept"
                >
                  {isVideoCall ? <Video size={26} /> : <Phone size={26} />}
                </button>
                <span className="btn-label">Accept</span>
              </div>
            </div>
          ) : (
            <div className="active-buttons">
              <div className="btn-group">
                <button
                  className={`control-action-btn ${isMuted ? "active" : ""}`}
                  onClick={onToggleMute}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
                </button>
                <span className="btn-label">{isMuted ? "Unmute" : "Mute"}</span>
              </div>

              {isVideoCall && (
                <div className="btn-group">
                  <button
                    className={`control-action-btn ${!isVideoEnabled ? "active" : ""}`}
                    onClick={onToggleVideo}
                    title={isVideoEnabled ? "Turn off camera" : "Turn on camera"}
                  >
                    {isVideoEnabled ? <Video size={22} /> : <VideoOff size={22} />}
                  </button>
                  <span className="btn-label">{isVideoEnabled ? "Camera" : "Camera off"}</span>
                </div>
              )}

              <div className="btn-group">
                <button
                  className="call-action-btn hangup"
                  onClick={onHangup}
                  title="End call"
                >
                  <PhoneOff size={26} />
                </button>
                <span className="btn-label">End</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;