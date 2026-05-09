"use client";

import React from "react";
import { useRouter } from "next/navigation";
import MatrixChatSimple from "../components/MatrixChatSimple";

/**
 * Test page for the new server-based Matrix chat
 */
export default function ChatTestPage() {
  const router = useRouter();

  // Get user ID from localStorage (set during login)
  const [userId, setUserId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (!storedUserId) {
      alert("Please log in first");
      router.push("/auth/login");
      return;
    }
    setUserId(storedUserId);
  }, [router]);

  if (!userId) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{
        padding: "10px 20px",
        background: "#436f4d",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1 style={{ margin: 0, fontSize: "20px" }}>Matrix Chat (Server-Based) - Test</h1>
        <button
          onClick={() => router.push("/")}
          style={{
            padding: "8px 16px",
            background: "white",
            color: "#436f4d",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </div>

      <div style={{ flex: 1, overflow: "hidden" }}>
        <MatrixChatSimple userId={userId} />
      </div>
    </div>
  );
}
