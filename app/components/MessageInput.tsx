import { Send, Paperclip, Smile } from "lucide-react";
import React, { useRef, useEffect } from "react";
import "./css/messageinput.css";

interface MessageInputProps {
  value: string;
  sending: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
}

const MessageInput = ({
  value,
  sending,
  onChange,
  onSend,
}: MessageInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Refocus input after message is sent
  useEffect(() => {
    if (!sending && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [sending]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter without Shift = send message
    if (e.key === "Enter" && !e.shiftKey && value.trim() !== "" && !sending) {
      e.preventDefault();
      onSend();
    }
    // Shift + Enter = new line (default behavior, no need to handle)
  };

  const handleSendClick = () => {
    if (value.trim() === "" || sending) return;
    onSend();
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  return (
    <div className="message-input-container">
      <div className="message-input-wrapper">
        {/* Optional: Attachment button */}
        {/* <button className="input-action-btn" title="Attach file">
          <Paperclip size={20} />
        </button> */}

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="message-input-field"
          rows={1}
        />

        {/* Optional: Emoji button */}
        {/* <button className="input-action-btn" title="Add emoji">
          <Smile size={20} />
        </button> */}

        <button
          onClick={handleSendClick}
          className={`send-btn ${value.trim() !== "" ? "send-btn-active" : ""}`}
          disabled={sending || value.trim() === ""}
          title="Send message"
        >
          {sending ? (
            <div className="send-spinner" />
          ) : (
            <Send size={18} />
          )}
        </button>
      </div>
      <p className="input-hint">Press Enter to send, Shift+Enter for new line</p>
    </div>
  );
};

export default MessageInput;