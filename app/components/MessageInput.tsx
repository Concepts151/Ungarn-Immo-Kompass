import { Send } from "lucide-react";
import React from "react";

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
  return (
    <div className="message_input_wrapper">
      <div className="input_wrapper">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type a message..."
          className="message_input"
        />
        <button
          onClick={onSend}
          className="btn send_message_btn"
          disabled={sending || value.trim() === ""}
          onKeyPress={(e) => e.key === "Enter" && onSend()}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
