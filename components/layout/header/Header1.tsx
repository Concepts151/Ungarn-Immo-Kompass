import {
  setOpenLoginModal,
  setOpenSignupDetailModal,
  setOpenSignupModal,
} from "@/app/pg/components/gobalActions";
import UserAvatarDropdown from "@/app/pg/components/UserAvatarDropdown";
import { useSessionStore } from "@/app/store";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Header1({
  scroll,
  isMobileMenu,
  handleMobileMenu,
}: any) {
  const supabase = createClient();
  const session = useSessionStore((state) => state.session);
  const setSession = useSessionStore((state) => state.setSession);
  const setName = useSessionStore((state) => state.setName);
  const setAvatarUrl = useSessionStore((state) => state.setAvatarUrl);
  const avatarUrl = useSessionStore((state) => state.avatarUrl);

  async function getUserDetails() {
    const { data, error } = await supabase.from("user").select("*").single();

    if (error) {
      console.error("Error fetching user details:", error);
      return;
    }
    console.log("userDetails", data);
    //if data is complete do nothing, else open signup detail modal
    if (!data.iscomplete) {
      setOpenSignupDetailModal(true);
    } else {
      setName(data.firstName || "User");
      setAvatarUrl(data.avatarUrl ? `${data.avatarUrl}` : null);
      console.log("User details fetched successfully:", data);
    }
  }

  // Fetch session on mount
  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then((response) => {
      if (!mounted) return;
      setSession(response.data);
      setName(response.data.session?.user?.user_metadata?.name || "User");

      if (response.data.session) {
        console.log("Session data:", response.data.session);
        console.log("avatarUrl", avatarUrl);

        // Fetch user details if session exists
        getUserDetails();
      } else {
        console.log("No active session found.");
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  // Open login modal if no session
  useEffect(() => {
    if (session?.session === null) {
      setOpenLoginModal(true);
    }
  }, [session]);

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
          <div className="row align-items-center">
            <div className="col-lg-2 col-md-6 col-6">
              <div className="vl-logo">
                <Link href="/">
                  <img
                    src="/assets/img/logo/Ungarn-Immo-Full.png"
                    alt="housa"
                  />
                  {/* <p className="fw-bold" style={{color:"#000"}}>Ungarn-Immo-Kompass</p> */}
                </Link>
              </div>
            </div>
            <div className="col-lg-8 d-none d-lg-block">
              <div className="vl-main-menu text-center">
                <nav className="vl-mobile-menu-active">
                  <ul>
                    <li>
                      <Link href="/sidebar-grid">Listings</Link>
                    </li>
                    <li>
                      <Link href="/about-us">About Us</Link>
                    </li>
                    <li>
                      <Link href="/our-service">Our Services</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact Us</Link>
                    </li>
                    {session?.session != null && (
                      <li>
                        <Link href="#">
                          Dashboard
                          <span>
                            <i className="fa-solid fa-angle-down d-lg-inline d-none" />
                          </span>
                        </Link>
                        <ul className="sub-menu">
                          <li>
                            <Link href="/dashboard">Dashboard</Link>
                          </li>
                          <li>
                            <Link href="/my-property">My Properties</Link>
                          </li>
                          <li>
                            <Link href="/message">Message</Link>
                          </li>
                          <li>
                            <Link href="/my-favorites">My Favourites</Link>
                          </li>
                          <li>
                            <Link href="/reviews">Reviews</Link>
                          </li>
                          <li>
                            <Link href="/my-profile">My Profile</Link>
                          </li>
                          <li>
                            <Link href="/add-property?new=0">Add Property</Link>
                          </li>
                        </ul>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div className="vl-hero-btn d-none d-lg-block text-end">
                {session?.session != null ? (
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
