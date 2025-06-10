"use client";
import React, { useEffect } from "react";
import { setOpenSignupModal } from "./gobalActions";
import { useSessionStore } from "@/app/store";
import UserAvatarDropdown from "./UserAvatarDropdown";

const HeaderActionBtn = () => {
  const userSession = useSessionStore((state) => state.session);
  useEffect(() => {
    console.log(userSession);
  }, []);

  return (
    <>
      {/* {JSON.stringify(userSession?.session!.user!, null, 2)} */}
      {userSession?.session != null ? (
        <UserAvatarDropdown />
      ) : (
        <div className="btn-area1 mt-0">
          <button
            onClick={() => setOpenSignupModal(true)}
            className="vl-btn1 mt-0"
          >
            Get Started
            <span className="arrow1 ms-2">
              <i className="fa-solid fa-arrow-right" />
            </span>
            <span className="arrow2 ms-2">
              <i className="fa-solid fa-arrow-right" />
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default HeaderActionBtn;
