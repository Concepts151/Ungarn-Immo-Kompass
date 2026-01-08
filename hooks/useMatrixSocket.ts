"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3005";

interface Message {
  id: string;
  roomId: string;
  sender: string;
  body: string;
  timestamp: number;
  type: string;
}

interface Room {
  id: string;
  roomId: string;
  name: string;
  lastMessage: string;
  lastMessageTime: number;
  unreadCount: number;
  members: string[];
}

interface UserCache {
  [matrixUserId: string]: {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    avatarUrl: string | null;
    role: string;
  };
}

export function useMatrixSocket(userId: string | null) {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [userCache, setUserCache] = useState<UserCache>({});
  const [error, setError] = useState<string | null>(null);

  // Initialize socket connection
  useEffect(() => {
    if (!userId) return;

    console.log("[useMatrixSocket] Connecting to WebSocket for user:", userId);

    const socket = io(SOCKET_URL, {
      auth: { userId },
      transports: ["websocket", "polling"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("[useMatrixSocket] Connected to WebSocket");
      setIsConnected(true);
      setError(null);

      // Request initial rooms
      socket.emit("get-rooms", (response: any) => {
        if (response.success) {
          console.log("[useMatrixSocket] Received rooms:", response.rooms.length);
          setRooms(response.rooms);
        } else {
          console.error("[useMatrixSocket] Failed to get rooms:", response.error);
          setError(response.error);
        }
      });
    });

    socket.on("disconnect", () => {
      console.log("[useMatrixSocket] Disconnected from WebSocket");
      setIsConnected(false);
    });

    socket.on("connect_error", (err) => {
      console.error("[useMatrixSocket] Connection error:", err.message);
      setError(`Connection error: ${err.message}`);
    });

    // Listen for new messages
    socket.on("new-message", (message: Message) => {
      console.log("[useMatrixSocket] New message:", message.id);
      setMessages((prev) => ({
        ...prev,
        [message.roomId]: [...(prev[message.roomId] || []), message],
      }));
    });

    // Listen for room updates
    socket.on("room-update", (room: Room) => {
      console.log("[useMatrixSocket] Room update:", room.id);
      setRooms((prev) => {
        const index = prev.findIndex((r) => r.id === room.id);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = room;
          return updated;
        }
        return [...prev, room];
      });
    });

    return () => {
      console.log("[useMatrixSocket] Cleaning up socket connection");
      socket.disconnect();
    };
  }, [userId]);

  // Load messages for a room
  const loadMessages = useCallback((roomId: string, limit: number = 50) => {
    if (!socketRef.current) return;

    console.log("[useMatrixSocket] Loading messages for room:", roomId);

    socketRef.current.emit("get-messages", { roomId, limit }, (response: any) => {
      if (response.success) {
        console.log("[useMatrixSocket] Received messages:", response.messages.length);
        setMessages((prev) => ({
          ...prev,
          [roomId]: response.messages,
        }));

        // Update user cache
        if (response.userCache) {
          setUserCache((prev) => ({ ...prev, ...response.userCache }));
        }
      } else {
        console.error("[useMatrixSocket] Failed to get messages:", response.error);
        setError(response.error);
      }
    });
  }, []);

  // Send a message
  const sendMessage = useCallback((roomId: string, text: string) => {
    if (!socketRef.current) return Promise.reject(new Error("Not connected"));

    console.log("[useMatrixSocket] Sending message to room:", roomId);

    return new Promise((resolve, reject) => {
      socketRef.current!.emit("send-message", { roomId, text }, (response: any) => {
        if (response.success) {
          console.log("[useMatrixSocket] Message sent:", response.eventId);
          resolve(response);
        } else {
          console.error("[useMatrixSocket] Failed to send message:", response.error);
          reject(new Error(response.error));
        }
      });
    });
  }, []);

  // Get user details
  const getUserDetails = useCallback((matrixUserIds: string[]) => {
    if (!socketRef.current) return;

    socketRef.current.emit("get-user-details", { matrixUserIds }, (response: any) => {
      if (response.success) {
        setUserCache((prev) => ({ ...prev, ...response.userCache }));
      } else {
        console.error("[useMatrixSocket] Failed to get user details:", response.error);
      }
    });
  }, []);

  return {
    isConnected,
    rooms,
    messages,
    userCache,
    error,
    loadMessages,
    sendMessage,
    getUserDetails,
  };
}
