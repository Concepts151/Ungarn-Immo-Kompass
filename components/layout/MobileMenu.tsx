"use client"; 
import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { useGetAuthUserQuery } from "@/state/api";
import { useSessionStore } from "@/app/store";

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
    const t = useTranslations("navbar");
    const { data: authUser } = useGetAuthUserQuery();
    const session = useSessionStore((state) => state.session);
    const [isAccordion, setIsAccordion] = useState(0);
    const handleAccordion = (key: any) => {
        setIsAccordion((prevState) => (prevState === key ? null : key));
    };
    return (
        <>
            {/*===== MOBILE HEADER STARTS =======*/}
            <div className="homepage1-body">
                <div className="vl-offcanvas">
                    <div className="vl-offcanvas-wrapper">
                        <div className="vl-offcanvas-header d-flex justify-content-between align-items-center mb-90">
                            <div className="vl-offcanvas-logo">
                                <Link href="/">
                                    {/* <img src="/assets/img/logo/logo1.png" alt="housa" /> */}
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
                            <div className="vl-offcanvas-close">
                                <button className="vl-offcanvas-close-toggle">
                                    <i className="fa-solid fa-xmark" />
                                </button>
                            </div>
                        </div>
                        <div className="vl-offcanvas-menu d-lg-none mb-40">
                            <nav>
                                <ul>
                                    <li>
                                        <Link href="/search">{t("Listings")}</Link>
                                    </li>
                                    <li>
                                        <Link href="/about-us">{t("AboutUs")}</Link>
                                    </li>
                                    <li>
                                        <Link href="/our-service">{t("OurServices")}</Link>
                                    </li>
                                    <li>
                                        <Link href="/for-sellers">{t("ForSellers")}</Link>
                                    </li>
                                    <li>
                                        <Link href="/for-buyers">{t("ForBuyers")}</Link>
                                    </li>
                                    {session?.session != null && (
                                        <li className={`has-dropdown ${isAccordion == 1 ? "active" : ""}`} onClick={() => handleAccordion(1)}>
                                            <Link href="#">
                                                {t("Dashboard")}
                                                <span>
                                                    <i className="fa-solid fa-angle-down d-lg-inline d-none" />
                                                </span>
                                            </Link>
                                            <ul className="sub-menu" style={{ display: `${isAccordion == 1 ? "block" : "none"}` }}>
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
                                                            <Link href="/my-property">{t("MyProperties")}</Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/add-property">{t("AddProperty")}</Link>
                                                        </li>
                                                    </>
                                                )}
                                            </ul>
                                            <button className="vl-menu-close">
                                                <i className="fas fa-chevron-right" />
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </nav>
                        </div>
                        <div className="space20" />
                        <div className="vl-offcanvas-info">
                            <h3 className="vl-offcanvas-sm-title">Contact Us</h3>
                            <div className="space20" />
                            <span>
                                <Link href="#">
                                    <i className="fa-regular fa-envelope" /> +57 9954 6476
                                </Link>
                            </span>
                            <span>
                                <Link href="#">
                                    <i className="fa-solid fa-phone" /> hello@exdos.com
                                </Link>
                            </span>
                            <span>
                                <Link href="#">
                                    <i className="fa-solid fa-location-dot" /> Bhemeara,Kushtia
                                </Link>
                            </span>
                        </div>
                        <div className="space20" />
                        <div className="vl-offcanvas-social">
                            <h3 className="vl-offcanvas-sm-title">Follow Us</h3>
                            <div className="space20" />
                            <Link href="#">
                                <i className="fab fa-facebook-f" />
                            </Link>
                            <Link href="#">
                                <i className="fab fa-twitter" />
                            </Link>
                            <Link href="#">
                                <i className="fab fa-linkedin-in" />
                            </Link>
                            <Link href="#">
                                <i className="fab fa-instagram" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="vl-offcanvas-overlay" />
            </div>
            {/*===== MOBILE HEADER STARTS =======*/}
        </>
    );
}
