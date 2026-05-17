"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { AlertTriangle, X } from "lucide-react";
import { setOpenOtpModal } from "@/app/pg/components/gobalActions";
import { useSessionStore } from "@/app/store";
import { useGetAuthUserQuery } from "@/state/api";

export default function UnverifiedBanner() {
  const { data: session, status } = useSession();
  const setUnverifiedEmail = useSessionStore((state) => state.setUnverifiedEmail);
  const [isVisible, setIsVisible] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const { data: authUser } = useGetAuthUserQuery(undefined, { skip: status !== "authenticated" });

  // Only render if we are fully authenticated
  if (status !== "authenticated" || !session?.user) return null;

  const isSessionVerified = (session.user as any).isEmailVerified;
  const isServerVerified = authUser?.user?.isEmailVerified;
  const isVerified = isSessionVerified || isServerVerified;
  
  // Don't render if verified or dismissed
  if (isVerified || !isVisible) return null;

  return (
    <div style={{
      backgroundColor: "#fff3cd",
      color: "#856404",
      padding: "12px 40px 12px 20px",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      fontSize: "var(--ztc-font-size-font-s14, 14px)",
      borderBottom: "1px solid #ffeeba",
      zIndex: 1000,
      position: "relative",
      fontWeight: "var(--ztc-weight-medium, 500)"
    }}>
      <AlertTriangle size={18} strokeWidth={2.5} />
      <span>
        Your email address is not verified. Please verify your email to unlock all features. 
      </span>
      <button 
        disabled={isSending}
        onClick={async () => {
          try {
            setIsSending(true);
            const email = (session.user as any).email;
            if (email) {
              setUnverifiedEmail(email);
              const { resendOtp } = await import("@/app/pg/action");
              const result = await resendOtp({ email });
              
              if (result?.error && result.error.includes("already verified")) {
                const { update } = await import("next-auth/react");
                await update({ isEmailVerified: true });
                setIsVisible(false);
                return;
              }
              
              setOpenOtpModal(true);
            }
          } catch (err: any) {
            console.error(err);
          } finally {
            setIsSending(false);
          }
        }}
        style={{
          background: "none",
          border: "none",
          textDecoration: "underline",
          color: "#856404",
          fontWeight: "bold",
          cursor: isSending ? "wait" : "pointer",
          padding: "0 4px",
          opacity: isSending ? 0.6 : 1
        }}
      >
        {isSending ? "Sending..." : "Verify Now"}
      </button>
      <button 
        onClick={() => setIsVisible(false)}
        style={{
          background: "none",
          border: "none",
          color: "#856404",
          cursor: "pointer",
          position: "absolute",
          right: "15px",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.7,
          padding: "4px"
        }}
        onMouseOver={(e) => e.currentTarget.style.opacity = "1"}
        onMouseOut={(e) => e.currentTarget.style.opacity = "0.7"}
        aria-label="Dismiss banner"
      >
        <X size={18} />
      </button>
    </div>
  );
}
