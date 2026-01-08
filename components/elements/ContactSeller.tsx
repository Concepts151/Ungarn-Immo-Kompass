// components/ContactSeller.tsx
// Updated to use lazy Matrix registration via backend API

"use client";

import {
  useGetAuthUserQuery,
  useCreatePropertyInquiryRoomMutation,
  useGetMatrixRoomByPropertyQuery,
} from "@/state/api";
import { useToggleModal } from "@/app/store";
import Link from "next/link";
import { useState, useEffect } from "react";

interface ContactSellerProps {
  sellerName: string;
  sellerImage?: string;
  sellerEmail: string;
  sellerPhone: string;
  sellerMatrixId?: string; // Now optional - may not exist yet (lazy registration)
  propertyId: string;
  propertyTitle: string;
  sellerId: string;
}

export default function ContactSeller({
  sellerName,
  sellerImage = "/assets/img/all-images/others/others-img7.png",
  sellerEmail,
  sellerPhone,
  sellerMatrixId,
  propertyId,
  propertyTitle,
  sellerId,
}: ContactSellerProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { data: authUser, isLoading: isAuthLoading } = useGetAuthUserQuery();
  
  // Zustand store for login modal
  const setLoginModalOpen = useToggleModal((state) => state.isLoginModalOpen);
  
  // Check if room already exists for this property
  const { data: existingRoomData } = useGetMatrixRoomByPropertyQuery(propertyId, {
    skip: !authUser?.user?.id,
  });

  // RTK Query mutation for creating property inquiry room
  const [createRoom, { isLoading: isCreatingRoom }] = useCreatePropertyInquiryRoomMutation();

  const isSeller = authUser?.user?.id === sellerId;
  const isLoggedIn = !!authUser?.user?.id;
  const hasExistingRoom = !!existingRoomData?.room;

  // Reset success message after a delay
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const openLoginModal = () => {
    // Use Zustand store to open login modal
    useToggleModal.setState({ isLoginModalOpen: true });
  };

  const handleContactSeller = async () => {
    setError(null);
    setSuccess(false);

    // Check if user is authenticated
    if (!isLoggedIn) {
      openLoginModal();
      setError("Please log in to message the seller");
      return;
    }

    // Don't allow seller to message themselves
    if (isSeller) {
      setError("You cannot message yourself");
      return;
    }

    try {
      // If room exists in database, just open it directly
      // The backend already auto-joined both users when the room was created
      if (hasExistingRoom && existingRoomData?.room?.matrixRoomId) {
        console.log('[ContactSeller] Found existing room in database:', existingRoomData.room.matrixRoomId);
        console.log('[ContactSeller] Opening existing room without API call');

        setSuccess(true);
        // Open the Matrix chat widget and select this room
        window.dispatchEvent(
          new CustomEvent("openMatrixChat", {
            detail: { roomId: existingRoomData.room.matrixRoomId },
          })
        );
        return;
      }

      // Create new room via backend API
      // This will automatically:
      // 1. Create Matrix accounts for buyer/seller if they don't exist (lazy registration)
      // 2. Create the Matrix room using ADMIN token
      // 3. Auto-join both buyer and seller using admin API (no invite acceptance needed)
      // 4. Save room to database
      // Result: Both users see room immediately in "Chats" section, ready to message
      console.log('[ContactSeller] Creating new room for property:', propertyId, 'buyer:', authUser.user.id);

      const result = await createRoom({
        exposeId: propertyId,
        buyerId: authUser.user.id,
      }).unwrap();

      console.log('[ContactSeller] Room creation result:', result);

      // Handle both new room creation and existing room scenarios
      // Backend may return: { success: true, matrixRoomId: "..." }
      // OR: { message: "Room already exists", matrixRoomId: "..." }
      if (result.matrixRoomId) {
        console.log('[ContactSeller] Room available:', result.matrixRoomId);
        if (result.message) {
          console.log('[ContactSeller] Message:', result.message);
        }
        setSuccess(true);

        // Open the Matrix chat widget and select this room
        window.dispatchEvent(
          new CustomEvent("openMatrixChat", {
            detail: { roomId: result.matrixRoomId },
          })
        );
      } else {
        console.error('[ContactSeller] Room creation failed - no matrixRoomId:', result);
        setError("Failed to create chat room");
      }
    } catch (err: any) {
      console.error("[ContactSeller] Error creating chat room:", err);
      console.error("[ContactSeller] Error details:", {
        data: err.data,
        status: err.status,
        message: err.message,
        originalStatus: err.originalStatus,
      });

      // Handle specific error messages from backend
      if (err.data?.error && err.data?.details) {
        console.error('[ContactSeller] Backend error:', err.data.error);
        console.error('[ContactSeller] Backend details:', err.data.details);
        setError(`${err.data.error}: ${err.data.details}`);
      } else if (err.data?.error) {
        console.error('[ContactSeller] Backend error:', err.data.error);
        setError(err.data.error);
      } else if (err.data?.details) {
        console.error('[ContactSeller] Backend details:', err.data.details);
        setError(err.data.details);
      } else if (err.message) {
        console.error('[ContactSeller] Error message:', err.message);
        setError(err.message);
      } else {
        console.error('[ContactSeller] Unknown error');
        setError("An error occurred. Please try again.");
      }
    }
  };

  const loading = isCreatingRoom || isAuthLoading;
  const buttonText = hasExistingRoom 
    ? "Continue Chat" 
    : loading 
      ? "Opening Chat..." 
      : "Message Seller";

  return (
    <div className="details-siderbar2">
      <h4>Contact Seller</h4>
      <div className="space24" />

      {/* Seller Info */}
      <div
        className="personal-info"
        style={{
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "10px",
        }}
      >
        <div className="img1">
          <img src={sellerImage} alt={sellerName} />
        </div>
        <div className="content" style={{ textAlign: "center" }}>
          <Link href="#">{sellerName}</Link>
          <Link href={`mailto:${sellerEmail}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z" />
            </svg>
            {sellerEmail}
          </Link>

          {sellerPhone && (
            <Link href={`tel:${sellerPhone}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9.36556 10.6821C10.302 12.3288 11.6712 13.698 13.3179 14.6344L14.2024 13.3961C14.4965 12.9845 15.0516 12.8573 15.4956 13.0998C16.9024 13.8683 18.4571 14.3353 20.0789 14.4637C20.599 14.5049 21 14.9389 21 15.4606V19.9234C21 20.4361 20.6122 20.8657 20.1022 20.9181C19.5723 20.9726 19.0377 21 18.5 21C9.93959 21 3 14.0604 3 5.5C3 4.96227 3.02742 4.42771 3.08189 3.89776C3.1343 3.38775 3.56394 3 4.07665 3H8.53942C9.0611 3 9.49513 3.40104 9.5363 3.92109C9.66467 5.54288 10.1317 7.09764 10.9002 8.50444C11.1427 8.9484 11.0155 9.50354 10.6039 9.79757L9.36556 10.6821ZM6.84425 10.0252L8.7442 8.66809C8.20547 7.50514 7.83628 6.27183 7.64727 5H5.00907C5.00303 5.16632 5 5.333 5 5.5C5 12.9558 11.0442 19 18.5 19C18.667 19 18.8337 18.997 19 18.9909V16.3527C17.7282 16.1637 16.4949 15.7945 15.3319 15.2558L13.9748 17.1558C13.4258 16.9425 12.8956 16.6915 12.3874 16.4061L12.3293 16.373C10.3697 15.2587 8.74134 13.6303 7.627 11.6707L7.59394 11.6126C7.30849 11.1044 7.05754 10.5742 6.84425 10.0252Z"></path>
              </svg>
              {sellerPhone}
            </Link>
          )}
        </div>
      </div>

      <div className="space20" />

      {/* Success Message */}
      {success && (
        <div
          className="alert alert-success"
          role="alert"
          style={{
            fontSize: "14px",
            padding: "10px",
            marginBottom: "15px",
            backgroundColor: "#d4edda",
            color: "#155724",
            border: "1px solid #c3e6cb",
            borderRadius: "4px",
          }}
        >
          ✓ {hasExistingRoom ? "Opening your chat..." : "Chat created! You can now message the seller."}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          className="alert alert-danger"
          role="alert"
          style={{
            fontSize: "14px",
            padding: "10px",
            marginBottom: "15px",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            border: "1px solid #f5c6cb",
            borderRadius: "4px",
          }}
        >
          ✗ {error}
        </div>
      )}

      {/* Message Seller Button - Hidden for seller viewing their own property */}
      {!isSeller && (
        <div className="input-area">
          <button
            type="button"
            className="vl-btn1"
            onClick={handleContactSeller}
            disabled={loading}
            style={{
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
              width: "100%",
            }}
          >
            {buttonText}
            <span className="arrow1 ms-2">
              <i className="fa-solid fa-arrow-right" />
            </span>
            <span className="arrow2 ms-2">
              <i className="fa-solid fa-arrow-right" />
            </span>
          </button>
        </div>
      )}

      {/* Login prompt for unauthenticated users */}
      {!isLoggedIn && !isAuthLoading && (
        <p
          className="text-muted small text-center mt-2"
          style={{ fontSize: "12px", color: "#6c757d", cursor: "pointer" }}
          onClick={openLoginModal}
        >
          🔐 Please log in to message sellers
        </p>
      )}
    </div>
  );
}