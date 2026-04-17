
import {
  setOpenLoginModal,
  setOpenSignupDetailModal,
  setOpenSignupModal,
} from "@/app/pg/components/gobalActions";
import UserAvatarDropdown from "@/app/pg/components/UserAvatarDropdown";
import { useSessionStore } from "@/app/store";
import LanguageToggle from "@/components/custom-comp/toggle-language";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslations } from "next-intl";
import { useGetAuthUserQuery } from "@/state/api";

import { useSession } from "next-auth/react";

export default function Header1({
  scroll,
  isMobileMenu,
  handleMobileMenu,
}: any) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const setName = useSessionStore((state) => state.setName);
  const setAvatarUrl = useSessionStore((state) => state.setAvatarUrl);
  const avatarUrl = useSessionStore((state) => state.avatarUrl);
  const t = useTranslations("navbar");
  const { data: authUser } = useGetAuthUserQuery(undefined, { skip: status !== "authenticated" });

  console.log("authUser in header:", authUser);
  console.log("session in header:", session);
  console.log("status in header:", status);

  // Sync user details when authUser changes
  useEffect(() => {
    if (authUser && authUser.user) {
      const data = authUser.user;
      console.log("userDetails", data);
      if (!data.firstName || !data.lastName) {
        setOpenSignupDetailModal(true);
      } else {
        setName(data.firstName || "User");
        setAvatarUrl(data.avatarUrl ? `${data.avatarUrl}` : null);
        console.log("User details fetched successfully:", data);
      }
    }
  }, [authUser]);

  // Open login modal if unauthenticated naturally (e.g. they should be blocked on certain actions)
  // We'll leave this to individual protected routes or explicit sign in actions
  // instead of a global unauthorized redirect because visitors can browse generic pages

  return (
    <header className="homepage1-body">
      <Toaster />
      <div
        id="vl-header-sticky"
        className={`vl-header-area vl-transparent-header  ${
          scroll ? "header-sticky top-0 position-fixed w-100" : ""
        }`}
      >
        <div className="container-fluid">
          <div
            // className="row align-items-center"
            style={{ height: "40px", display: "flex", alignItems: "center" }}
          >
            <div className="col-lg-2 col-md-6 col-6">
              <div className="">
                <Link href="/" className="">
                  <div
                    className=""
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      height: "100%",
                    }}
                  >
                    <img
                      src="/assets/img/logo/fav-logo1.png"
                      alt=""
                      style={{ height: "40px" }}
                    />
                    <p
                      className=""
                      style={{
                        wordBreak: "keep-all",
                        whiteSpace: "nowrap",
                        fontSize: "24px",
                        margin: "0px",
                        fontWeight: "bold",
                        color: "#31543a",
                        textTransform: "uppercase",
                      }}
                    >
                      Ungarn-Immo
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-8 d-none d-lg-block">
              <div className="vl-main-menu text-center">
                <nav className="vl-mobile-menu-active">
                  <ul style={{ margin: "0px" }}>
                    <li>
                      <Link href="/search" className={pathname === "/search" ? "active" : ""}>{t("Listings")}</Link>
                    </li>
                    <li>
                      <Link href="/our-services" className={pathname === "/our-services" ? "active" : ""}>{t("OurServices")}</Link>
                    </li>
                    <li>
                      <Link href="/about-us" className={pathname === "/about-us" ? "active" : ""}>{t("AboutUs")}</Link>
                    </li>

                    <li>
                      <Link href="/for-buyers" className={pathname === "/for-buyers" ? "active" : ""}>{t("ForBuyers")}</Link>
                    </li>
                    <li>
                      <Link href="/for-sellers" className={pathname === "/for-sellers" ? "active" : ""}>{t("ForSellers")}</Link>
                    </li>
                    {/* {session?.session != null && (
                      <li>
                        <Link href="#">
                          {t("Dashboard")}
                          <span>
                            <i className="fa-solid fa-angle-down d-lg-inline d-none" />
                          </span>
                        </Link>
                        <ul className="sub-menu">
                          <li>
                            <Link href="/dashboard">{t("Dashboard")}</Link>
                          </li>

                          <li>
                            <Link href="/massages">{t("Message")}</Link>
                          </li>
                          <li>
                            <Link href="/my-favorites">{t("MyFavorites")}</Link>
                          </li>
                        
                          <li>
                            <Link href="/my-profile">{t("MyProfile")}</Link>
                          </li>

                          {authUser?.userRole === "SELLER" && (
                            <>
                              <li>
                                <Link href="/my-property">
                                  {t("MyProperties")}
                                </Link>
                              </li>
                              <li>
                                <Link href="/add-property">
                                  {t("AddProperty")}
                                </Link>
                              </li>
                            </>
                          )}
                        </ul>
                      </li>
                    )} */}
                  </ul>
                </nav>
              </div>
            </div>
            <div
              className="col-lg-2 col-md-6 col-6"
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <LanguageToggle />
              <div className="vl-hero-btn d-none d-lg-block text-end">
                {session != null ? (
                  <UserAvatarDropdown />
                ) : (
                  <div className="btn-area1" style={{ margin: 0 }}>
                    <button
                      onClick={() => setOpenSignupModal(true)}
                      className="vl-btn1"
                      style={{ 
                        padding: "16px 10px",
                        fontSize: "16px",
                        margin: 0,
                        whiteSpace: "nowrap"
                        
                      }}
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
              </div>
              <div className="vl-header-action-item d-block d-lg-none">
                <button type="button" className="vl-offcanvas-toggle px-1">
                  <i className="fa-solid fa-bars-staggered" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
