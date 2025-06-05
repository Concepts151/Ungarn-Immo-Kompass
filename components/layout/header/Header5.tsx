import Link from "next/link";
export default function Header5({ scroll, isMobileMenu, handleMobileMenu }: any) {
    return (
        <>
            {/*=====HEADER START=======*/}
            <header className="homepage1-body">
                <div id="vl-header-sticky" className={`vl-header-area vl-transparent-header ${scroll ? "header-sticky" : ""}`}>
                    <div className="container-fluid">
                        <div className="row align-items-center">
                            <div className="col-lg-2 col-md-6 col-6">
                                <div className="vl-logo">
                                    <Link href="/">
                                        <img src="/assets/img/logo/logo1.png" alt="housa" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-7 d-none d-lg-block">
                                <div className="vl-main-menu text-center">
                                    <nav className="vl-mobile-menu-active">
                                        <ul>
                                            <li className="has-dropdown">
                                                <Link href="#">
                                                    Home
                                                    <span>
                                                        <i className="fa-solid fa-angle-down d-lg-inline d-none" />
                                                    </span>
                                                </Link>
                                                <div className="vl-mega-menu">
                                                    <div className="vl-home-menu">
                                                        <div className="row gx-3 row-cols-1 row-cols-md-1 row-cols-lg-4">
                                                            <div className="col">
                                                                <div className="vl-home-thumb">
                                                                    <div className="img1">
                                                                        <img src="/assets/img/all-images/demo/demo-img1.png" alt="housa" />
                                                                    </div>
                                                                    <Link href="/">Housa - Homepage 01</Link>
                                                                    <div className="btn-area1">
                                                                        <Link href="/" className="vl-btn1">
                                                                            View Demo
                                                                            <span className="arrow1 ms-2">
                                                                                <i className="fa-solid fa-arrow-right" />
                                                                            </span>
                                                                            <span className="arrow2 ms-2">
                                                                                <i className="fa-solid fa-arrow-right" />
                                                                            </span>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="space20 d-lg-none d-block" />
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="vl-home-thumb">
                                                                    <div className="img1">
                                                                        <img src="/assets/img/all-images/demo/demo-img2.png" alt="housa" />
                                                                    </div>
                                                                    <Link href="/index2">Housa - Homepage 02</Link>
                                                                    <div className="btn-area1">
                                                                        <Link href="/index2" className="vl-btn1">
                                                                            View Demo
                                                                            <span className="arrow1 ms-2">
                                                                                <i className="fa-solid fa-arrow-right" />
                                                                            </span>
                                                                            <span className="arrow2 ms-2">
                                                                                <i className="fa-solid fa-arrow-right" />
                                                                            </span>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="space20 d-lg-none d-block" />
                                                                </div>
                                                            </div>
                                                            <div className="col ">
                                                                <div className="vl-home-thumb">
                                                                    <div className="img1">
                                                                        <img src="/assets/img/all-images/demo/demo-img3.png" alt="housa" />
                                                                    </div>
                                                                    <Link href="/index3">Housa - Homepage 03</Link>
                                                                    <div className="btn-area1">
                                                                        <Link href="/index3" className="vl-btn1">
                                                                            View Demo
                                                                            <span className="arrow1 ms-2">
                                                                                <i className="fa-solid fa-arrow-right" />
                                                                            </span>
                                                                            <span className="arrow2 ms-2">
                                                                                <i className="fa-solid fa-arrow-right" />
                                                                            </span>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="space20 d-lg-none d-block" />
                                                                </div>
                                                            </div>
                                                            <div className="col ">
                                                                <div className="vl-home-thumb">
                                                                    <div className="img1">
                                                                        <img src="/assets/img/all-images/demo/demo-img4.png" alt="housa" />
                                                                    </div>
                                                                    <Link href="/index4">Housa - Homepage 04</Link>
                                                                    <div className="btn-area1">
                                                                        <Link href="/index4" className="vl-btn1">
                                                                            View Demo
                                                                            <span className="arrow1 ms-2">
                                                                                <i className="fa-solid fa-arrow-right" />
                                                                            </span>
                                                                            <span className="arrow2 ms-2">
                                                                                <i className="fa-solid fa-arrow-right" />
                                                                            </span>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="space20 d-lg-none d-block" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li className="has-dropdown">
                                                <Link href="#">
                                                    Pages
                                                    <span>
                                                        <i className="fa-solid fa-angle-down d-lg-inline d-none" />
                                                    </span>
                                                </Link>
                                                <ul className="sub-menu">
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
                                            </li>
                                            <li>
                                                <Link href="#">
                                                    Listing
                                                    <span>
                                                        <i className="fa-solid fa-angle-down d-lg-inline d-none" />
                                                    </span>
                                                </Link>
                                                <ul className="sub-menu">
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
                                            </li>
                                            <li>
                                                <Link href="#">
                                                    Properties
                                                    <span>
                                                        <i className="fa-solid fa-angle-down d-lg-inline d-none" />
                                                    </span>
                                                </Link>
                                                <ul className="sub-menu">
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
                                            </li>
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
                                                        <Link href="/my-profile">My Propfile</Link>
                                                    </li>
                                                    <li>
                                                        <Link href="/add-property">Add Property</Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Link href="#">
                                                    Blogs
                                                    <span>
                                                        <i className="fa-solid fa-angle-down d-lg-inline d-none" />
                                                    </span>
                                                </Link>
                                                <ul className="sub-menu">
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
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6 col-6">
                                <div className="vl-hero-btn d-none d-lg-block text-end">
                                    <div className="btn-area1 dashboard">
                                        <Link href="/add-property" className="vl-btn1">
                                            Add Listing
                                            <span className="arrow1 ms-2">
                                                <i className="fa-solid fa-arrow-right" />
                                            </span>
                                            <span className="arrow2 ms-2">
                                                <i className="fa-solid fa-arrow-right" />
                                            </span>
                                        </Link>
                                        <button className="hamburger_menu">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M3 4H21V6H3V4ZM7 19H21V21H7V19ZM3 14H21V16H3V14ZM7 9H21V11H7V9Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="vl-header-action-item d-block d-lg-none">
                                    <button type="button" className="vl-offcanvas-toggle">
                                        <i className="fa-solid fa-bars-staggered" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/*=====HEADER END =======*/}
            {/*===== SIDEBAR STARTS=======*/}
            <div className="header-site-icon">
                <div className="slide-bar slide-bar1">
                    <div className="sidebar-info">
                        <div className="sidebar-logo">
                            <div className="close-mobile-menu">
                                <Link href="javascript:void(0)">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <h3>Profile</h3>
                        <div className="space20" />
                        <div className="personal-info">
                            <div className="img1">
                                <img src="/assets/img/all-images/others/others-img7.png" alt="housa" />
                            </div>
                            <div className="content">
                                <span>User Account</span>
                                <div className="space10" />
                                <Link href="#">Ruhul Amin Jr</Link>
                            </div>
                        </div>
                        <div className="space28" />
                        <h3>Our Menu</h3>
                        <div className="space8" />
                        <div className="boxarea">
                            <Link href="/dashboard">
                                <span className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M14 21C13.4477 21 13 20.5523 13 20V12C13 11.4477 13.4477 11 14 11H20C20.5523 11 21 11.4477 21 12V20C21 20.5523 20.5523 21 20 21H14ZM4 13C3.44772 13 3 12.5523 3 12V4C3 3.44772 3.44772 3 4 3H10C10.5523 3 11 3.44772 11 4V12C11 12.5523 10.5523 13 10 13H4ZM9 11V5H5V11H9ZM4 21C3.44772 21 3 20.5523 3 20V16C3 15.4477 3.44772 15 4 15H10C10.5523 15 11 15.4477 11 16V20C11 20.5523 10.5523 21 10 21H4ZM5 19H9V17H5V19ZM15 19H19V13H15V19ZM13 4C13 3.44772 13.4477 3 14 3H20C20.5523 3 21 3.44772 21 4V8C21 8.55228 20.5523 9 20 9H14C13.4477 9 13 8.55228 13 8V4ZM15 5V7H19V5H15Z" />
                                    </svg>
                                </span>
                                <span className="text">Dashboard</span>
                            </Link>
                        </div>
                        <div className="boxarea">
                            <Link href="/my-profile">
                                <span className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z" />
                                    </svg>
                                </span>
                                <span className="text">User Profile</span>
                            </Link>
                        </div>
                        <div className="boxarea">
                            <Link href="/reviews">
                                <span className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M20.7134 8.12811L20.4668 8.69379C20.2864 9.10792 19.7136 9.10792 19.5331 8.69379L19.2866 8.12811C18.8471 7.11947 18.0555 6.31641 17.0677 5.87708L16.308 5.53922C15.8973 5.35653 15.8973 4.75881 16.308 4.57612L17.0252 4.25714C18.0384 3.80651 18.8442 2.97373 19.2761 1.93083L19.5293 1.31953C19.7058 0.893489 20.2942 0.893489 20.4706 1.31953L20.7238 1.93083C21.1558 2.97373 21.9616 3.80651 22.9748 4.25714L23.6919 4.57612C24.1027 4.75881 24.1027 5.35653 23.6919 5.53922L22.9323 5.87708C21.9445 6.31641 21.1529 7.11947 20.7134 8.12811ZM2 4C2 3.44772 2.44772 3 3 3H14V5H4.5052L12 11.662L16.3981 7.75259L17.7269 9.24741L12 14.338L4 7.22684V19H20V11H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4Z" />
                                    </svg>
                                </span>
                                <span className="text">Our Reviews</span>
                            </Link>
                        </div>
                        <div className="boxarea">
                            <Link href="/my-property">
                                <span className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M10 3V5H5V19H19V14H21V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H10ZM17.5858 5H13V3H21V11H19V6.41421L12 13.4142L10.5858 12L17.5858 5Z" />
                                    </svg>
                                </span>
                                <span className="text">My Properties</span>
                            </Link>
                        </div>
                        <div className="boxarea">
                            <Link href="/my-favorites">
                                <span className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.2426 4.75736C20.705 6.2228 21.2547 8.25005 20.8924 10.1368C21.4614 10.2972 21.9987 10.6002 22.4471 11.0453C23.851 12.439 23.851 14.6987 22.4471 16.0924L17 21.5L13.978 18.5L10.9999 21.485L2.52138 12.993C0.417048 10.637 0.495706 7.01901 2.75736 4.75736C5.02157 2.49315 8.64519 2.41687 11.001 4.52853C13.35 2.42 16.98 2.49 19.2426 4.75736ZM12.962 12.4646C12.346 13.0761 12.346 14.0615 12.962 14.673L17 18.6818L21.038 14.673C21.654 14.0615 21.654 13.0761 21.038 12.4646C20.414 11.8451 19.3962 11.8451 18.77 12.4668L16.9979 14.2206L15.591 12.825L15.2278 12.4646C14.6038 11.8451 13.586 11.8451 12.962 12.4646ZM4.17157 6.17157C2.68183 7.66131 2.60704 10.0473 3.97993 11.6232L10.9999 18.6543L12.559 17.092L11.5529 16.0924C10.149 14.6987 10.149 12.439 11.5529 11.0453C12.9568 9.65157 15.233 9.65157 16.6369 11.0453L16.9996 11.4051L17.3631 11.0453C17.7877 10.6238 18.2921 10.3297 18.828 10.1632C19.2436 8.79577 18.9058 7.25122 17.827 6.1701C16.3279 4.66794 13.9076 4.60701 12.337 6.01687L11.0019 7.21524L9.66605 6.01781C8.09098 4.60597 5.67506 4.66808 4.17157 6.17157Z"></path>
                                    </svg>
                                </span>
                                <span className="text">My Favourite</span>
                            </Link>
                        </div>
                        <div className="boxarea">
                            <Link href="/message">
                                <span className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM5.76282 17H20V5H4V18.3851L5.76282 17ZM11 10H13V12H11V10ZM7 10H9V12H7V10ZM15 10H17V12H15V10Z" />
                                    </svg>
                                </span>
                                <span className="text">Message</span>
                            </Link>
                        </div>
                        <div className="boxarea">
                            <Link href="/add-property">
                                <span className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM5 5V19H19V5H5ZM11 11V7H13V11H17V13H13V17H11V13H7V11H11Z" />
                                    </svg>
                                </span>
                                <span className="text">Add Property</span>
                            </Link>
                        </div>
                        <div className="boxarea">
                            <Link href="/">
                                <span className="icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z" />
                                    </svg>
                                </span>
                                <span className="text">User Logout</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="body-overlay" />
            </div>
            {/*===== SIDEBAR ENDS STARTS=======*/}
        </>
    );
}
