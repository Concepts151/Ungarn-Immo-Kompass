"use client"

import { useSessionStore } from "@/app/store"
import Link from "next/link"
import { signOut } from "next-auth/react"
import "../avatarDropdown.css"
import { useTranslations } from "next-intl"
import { useGetAuthUserQuery } from "@/state/api"

export default function UserAvatarDropdown() {
  const user = useSessionStore((s) => s.session?.user)
  const name = useSessionStore((state) => state.name)
  const avatarUrl = useSessionStore((state) => state.avatarUrl)
  const clearSession = useSessionStore((state) => state.clearSession)
  const t = useTranslations("navbar")
  const { data: authUser } = useGetAuthUserQuery()


  // Get initials from the name
  const initials = name
    ? name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : user?.email?.[0]?.toUpperCase() ?? "U"

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/" })
      clearSession()
      localStorage.clear()
      sessionStorage.clear()
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <div className="dropdown" style={{display:"flex", justifyContent:"end"}}>
      <button
        className="avatar-dropdown-btn"
        type="button"
        id="avatarDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        // style={{width:"100%"}}
        >
        {/* Avatar or profile pic */}
        {avatarUrl ? (
          <img
            src={` https://jzhlioxxjwqwvwybtcfl.supabase.co/storage/v1/object/public/avatars/${avatarUrl}`}
            alt="Avatar"
            className="avatar-circle"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className="avatar-circle">{initials}</div>
        )}
        {/* <span className="avatar-name d-none d-md-block">{name}</span> */}
        {/* <svg
          width={18}
          height={18}
          style={{ marginRight: 6, color: "#857fff" }}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg> */}
      </button>
      <ul
        className="dropdown-menu avatar-dropdown-menu dropdown-menu-end shadow"
        aria-labelledby="avatarDropdown">
        {/* User Profile Header */}
        <li className="dropdown-user-header">
          <div className="user-header-content">
            {avatarUrl ? (
              <img
                src={` https://jzhlioxxjwqwvwybtcfl.supabase.co/storage/v1/object/public/avatars/${avatarUrl}`}
                alt="Avatar"
                className="user-header-avatar"
              />
            ) : (
              <div className="user-header-avatar user-header-initials">{initials}</div>
            )}
            <div className="user-header-info">
              <div className="user-header-name">
                {name && name !== "User"
                  ? name
                  : authUser?.user?.firstName && authUser?.user?.lastName
                  ? `${authUser.user.firstName} ${authUser.user.lastName}`
                  : "User"}
              </div>
              <div className="user-header-email">{authUser?.user?.email || ""}</div>
            </div>
          </div>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link className="dropdown-item" href="/dashboard">
            <i className="fa-solid fa-th-large"></i>
            {t("Dashboard")}
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" href="/massages">
            <i className="fa-solid fa-envelope"></i>
            {t("Message")}
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" href="/my-favorites">
            <i className="fa-solid fa-heart"></i>
            {t("MyFavorites")}
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" href="/my-profile">
            <i className="fa-solid fa-user"></i>
            {t("MyProfile")} 
          </Link>
        </li>
        {authUser?.userRole === "SELLER" && (
          <>
            <li>
              <Link className="dropdown-item" href="/my-property">
                <i className="fa-solid fa-house"></i>
                {t("MyProperties")}
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="/add-property">
                <i className="fa-solid fa-plus-circle"></i>
                {t("AddProperty")}
              </Link>
            </li>
          </>
        )}
        <li>
          <Link className="dropdown-item" href="/settings">
            <i className="fa-solid fa-gear"></i>
            Settings
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button
            className="dropdown-item text-danger"
            type="button"
            onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            Logout
          </button>
        </li>
      </ul>
    </div>
  )
}