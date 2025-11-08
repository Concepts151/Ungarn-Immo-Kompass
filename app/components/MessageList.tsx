"use client";
import { MessageCircle } from "lucide-react";
import React, { useEffect, useRef } from "react";

interface MessageListProps {
  messages: any[];
  matrixUserId: string;
}

export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const MessageList = ({ messages, matrixUserId }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="start_conversation_wrapper">
        <div className="">
          <MessageCircle size={48} />
          <p className="" style={{ margin: "0px" }}>
            No messages yet
          </p>
          <div className="">Start the conversation!</div>
        </div>
      </div>
    );
  }
  return (
    <div className="message_list_wrapper">
      {messages.map((msg) => {
        const isown = msg.getSender() === matrixUserId;
        return (
          <div
            key={msg.getId()}
            className={`${isown ? "from_msg_position" : "to_msg_position"}`}
          >
            <div className={`${isown ? "from_msg" : "to_msg"}`}>
              {!isown && (
                <p className="" style={{fontSize: "12px", margin: "0px", fontWeight: 'bold'}}>
                  {msg.getSender()?.split(":")[0]?.substring(1) || "Unknown"}
                </p>
              )}
              <p className="fit-text" style={{ margin: "0px", color: isown ? "" : "gray" }}>
                {msg.getContent().body}
              </p>
              <p className="" style={{ fontSize: "9px", margin: "0px" }}>
                {formatTime(msg.getTs())}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
