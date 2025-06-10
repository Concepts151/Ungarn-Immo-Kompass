"use client"
import React, { useEffect } from "react";
import { useSessionStore } from "@/app/store"; // or wherever your Zustand store is
import Link from "next/link";

import "../avatarDropdown.css";
import { logout } from "../action";

export default function UserAvatarDropdown() {
  const user = useSessionStore((s) => s.session?.user);
  const name = useSessionStore((state) => state.name);
  const setName = useSessionStore((state) => state.setName);

  // Get initials
  const initials = user?.user_metadata?.name
    ? user.user_metadata.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "U";

  const nameu = user?.user_metadata?.name ?? user?.email ?? "User";

  useEffect(()=>{
    if (name !== nameu) {
      setName(nameu);
      console.log("name log",user?.user_metadata?.name);
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="dropdown">
      <button
        className="avatar-dropdown-btn"
        type="button"
        id="avatarDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {/* Avatar or profile pic */}
        {user?.user_metadata?.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url}
            alt="Avatar"
            className="avatar-circle"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="avatar-circle">{initials}</div>
        )}
        <span className="avatar-name d-none d-md-block">{name}</span>
        <svg
          width={18}
          height={18}
          style={{ marginRight: 6, color: "#857fff" }}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <ul
        className="dropdown-menu avatar-dropdown-menu dropdown-menu-end shadow"
        aria-labelledby="avatarDropdown"
      >
        <li>
          <Link className="dropdown-item" href="/my-profile">
            Profile
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" href="/settings">
            Settings
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button className="dropdown-item text-danger" type="button" onClick={logout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
