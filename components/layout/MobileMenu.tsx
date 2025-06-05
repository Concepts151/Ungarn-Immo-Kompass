"use client";
import Link from "next/link";
import { useState } from "react";
export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
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
                                    <img src="/assets/img/logo/logo1.png" alt="housa" />
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
                                    <li className={`has-dropdown ${isAccordion == 1 ? "active" : ""}`} onClick={() => handleAccordion(1)}>
                                        <Link href="#">
                                            Home
                                            <span>
                                                <i className="fa-solid fa-angle-down d-lg-inline d-none" />
                                            </span>
                                        </Link>
                                        <ul className="sub-menu" style={{ display: `${isAccordion == 1 ? "block" : "none"}` }}>
                                            <li>
                                                <Link href="/">Home 1</Link>
                                            </li>
                                            <li>
                                                <Link href="/index2">Home 2</Link>
                                            </li>
                                            <li>
                                                <Link href="/index3">Home 3</Link>
                                            </li>
                                            <li>
                                                <Link href="/index4">Home 4</Link>
                                            </li>

                                        </ul>
                                        <button className="vl-menu-close">
                                            <i className="fas fa-chevron-right" />
                                        </button>
                                    </li>
                                    <li className={`has-dropdown ${isAccordion == 2 ? "active" : ""}`} onClick={() => handleAccordion(2)}>
                                        <Link href="#">
                                            Pages
                                            <span>
                                                <i className="fa-solid fa-angle-down d-lg-inline d-none" />
                                            </span>
                                        </Link>
                                        <ul className="sub-menu" style={{ display: `${isAccordion == 2 ? "block" : "none"}` }}>
                                            <li>
                                                <Link href="/about-us">About Us</Link>
                                            </li>
                                            <li>
                                                <Link href="/our-service">Our Services</Link>
                                            </li>
                                            <li>
                                                <Link href="/pricing">Pricing</Link>
                                            </li>
                                            <li>
                                                <Link href="/contact">Contact Us</Link>
                                            </li>
                                            <li>
                                                <Link href="/faq">FAQ's</Link>
                                            </li>
                                            <li>
                                                <Link href="/privacy-policy">Privacy Policy</Link>
                                            </li>
                                        </ul>
                                        <button className="vl-menu-close">
                                            <i className="fas fa-chevron-right" />
                                        </button>
                                    </li>
                                    <li className={`has-dropdown ${isAccordion == 3 ? "active" : ""}`} onClick={() => handleAccordion(3)}>
                                        <Link href="#">
                                            Listing
                                            <span>
                                                <i className="fa-solid fa-angle-down d-lg-inline d-none" />
                                            </span>
                                        </Link>
                                        <ul className="sub-menu" style={{ display: `${isAccordion == 3 ? "block" : "none"}` }}>
                                            <li>
                                                <Link href="/property-halfmap-grid">Property Half Grid</Link>
                                            </li>
                                            <li>
                                                <Link href="/property-halfmap-list">Property Half Map List</Link>
                                            </li>
                                            <li>
                                                <Link href="/topmap-grid">Property Top Map Grid</Link>
                                            </li>
                                            <li>
                                                <Link href="/topmap-list">Property Top Map List</Link>
                                            </li>
                                            <li>
                                                <Link href="/sidebar-grid">Find Sidebar Grid</Link>
                                            </li>
                                            <li>
                                                <Link href="/sidebar-list">Find Sidebar List</Link>
                                            </li>
                                        </ul>
                                        <button className="vl-menu-close">
                                            <i className="fas fa-chevron-right" />
                                        </button>
                                    </li>
                                    <li className={`has-dropdown ${isAccordion == 4 ? "active" : ""}`} onClick={() => handleAccordion(4)}>
                                        <Link href="#">
                                            Properties
                                            <span>
                                                <i className="fa-solid fa-angle-down d-lg-inline d-none" />
                                            </span>
                                        </Link>
                                        <ul className="sub-menu" style={{ display: `${isAccordion == 4 ? "block" : "none"}` }}>
                                            <li>
                                                <Link href="/property-details-v1">Property Details 01</Link>
                                            </li>
                                            <li>
                                                <Link href="/property-details-v2">Property Details 02</Link>
                                            </li>
                                            <li>
                                                <Link href="/property-details-v3">Property Details 03</Link>
                                            </li>
                                            <li>
                                                <Link href="/property-details-v4">Property Details 04</Link>
                                            </li>
                                        </ul>
                                        <button className="vl-menu-close">
                                            <i className="fas fa-chevron-right" />
                                        </button>
                                    </li>
                                    <li className={`has-dropdown ${isAccordion == 5 ? "active" : ""}`} onClick={() => handleAccordion(5)}>
                                        <Link href="#">
                                            Dashboard
                                            <span>
                                                <i className="fa-solid fa-angle-down d-lg-inline d-none" />
                                            </span>
                                        </Link>
                                        <ul className="sub-menu" style={{ display: `${isAccordion == 5 ? "block" : "none"}` }}>
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
                                                <Link href="/my-profile">My Propfile</Link>
                                            </li>
                                            <li>
                                                <Link href="/add-property">Add Property</Link>
                                            </li>
                                        </ul>
                                        <button className="vl-menu-close">
                                            <i className="fas fa-chevron-right" />
                                        </button>
                                    </li>
                                    <li className={`has-dropdown ${isAccordion == 6 ? "active" : ""}`} onClick={() => handleAccordion(6)}>
                                        <Link href="#">
                                            Blogs
                                            <span>
                                                <i className="fa-solid fa-angle-down d-lg-inline d-none" />
                                            </span>
                                        </Link>
                                        <ul className="sub-menu" style={{ display: `${isAccordion == 6 ? "block" : "none"}` }}>
                                            <li>
                                                <Link href="/blog">Blog Default</Link>
                                            </li>
                                            <li>
                                                <Link href="/blog-grid">Blog Grid</Link>
                                            </li>
                                            <li>
                                                <Link href="/blog-detail">Blog Post Details</Link>
                                            </li>
                                            <li>
                                                <Link href="/blog-detail-2">Blog Post Details 2</Link>
                                            </li>
                                        </ul>
                                        <button className="vl-menu-close">
                                            <i className="fas fa-chevron-right" />
                                        </button>
                                    </li>
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
