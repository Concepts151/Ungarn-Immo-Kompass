"use client";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    spaceBetween: 30,
    slidesPerView: 1,
    freeMode: true,
    watchSlidesProgress: true,
    autoplay: {
        delay: 3500,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
};

export default function Property1() {
    return (
        <>
            <div className="space30"></div>

            <div className="property1">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-9 m-auto">
                            <div className="heading1 text-center">
                                <h5>Our Properties</h5>
                                <div className="space16" />
                                <h2 className="text-anime-style-2">Browse Our Exclusive Properties Listing</h2>
                            </div>
                            <div className="space40" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-10 m-auto" data-aos="fade-up" data-aos-duration={1000}>
                            <div className="property-list-tab">
                                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM13 19H18V9.15745L12 3.7029L6 9.15745V19H11V13H13V19Z" />
                                            </svg>
                                            For Sale
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M10 10.1111V1L21 7V21H3V7L10 10.1111ZM12 4.36908V13.1886L5 10.0775V19H19V8.18727L12 4.36908Z" />
                                            </svg>
                                            Rent
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M19 19V9.79875L12 4.27675L5 9.79875V19H19ZM21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.31391C3 9.00773 3.14027 8.71843 3.38065 8.52879L11.3807 2.21793C11.7438 1.93142 12.2562 1.93142 12.6193 2.21793L20.6193 8.52879C20.8597 8.71843 21 9.00773 21 9.31391V20ZM7 12H9C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12H17C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12Z" />
                                            </svg>
                                            Villas
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-contact1-tab" data-bs-toggle="pill" data-bs-target="#pills-contact1" type="button" role="tab" aria-controls="pills-contact1" aria-selected="false">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12.6727 1.61162 20.7999 9H17.8267L12 3.70302 6 9.15757V19.0001H11V21.0001H5C4.44772 21.0001 4 20.5524 4 20.0001V11.0001L1 11.0001 11.3273 1.61162C11.7087 1.26488 12.2913 1.26488 12.6727 1.61162ZM14 11H23V18H14V11ZM16 13V16H21V13H16ZM24 21H13V19H24V21Z" />
                                            </svg>
                                            Apartments
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-contact2-tab" data-bs-toggle="pill" data-bs-target="#pills-contact2" type="button" role="tab" aria-controls="pills-contact2" aria-selected="false">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M6 19H18V9.15745L12 3.7029L6 9.15745V19ZM19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20C20 20.5523 19.5523 21 19 21ZM8 9.99998C11.866 9.99998 15 13.134 15 17H13C13 14.2386 10.7614 12 8 12V9.99998ZM8 14C9.65685 14 11 15.3431 11 17H8V14Z" />
                                            </svg>
                                            Houses
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-contact3-tab" data-bs-toggle="pill" data-bs-target="#pills-contact3" type="button" role="tab" aria-controls="pills-contact3" aria-selected="false">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M21 21H3C2.44772 21 2 20.5523 2 20V12.4868C2 12.1978 2.12501 11.9229 2.34282 11.733L6 8.54435V4C6 3.44772 6.44772 3 7 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21ZM9 19H12V12.9416L8 9.45402L4 12.9416V19H7V15H9V19ZM14 19H20V5H8V7.12729C8.23444 7.12729 8.46888 7.20938 8.65718 7.37355L13.6572 11.733C13.875 11.9229 14 12.1978 14 12.4868V19ZM16 11H18V13H16V11ZM16 15H18V17H16V15ZM16 7H18V9H16V7ZM12 7H14V9H12V7Z" />
                                            </svg>
                                            Retail
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="space40" />
                        <div className="col-lg-12">
                            <div className="main-tabs-area">
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex={0}>
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img1.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img2.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $82,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img1.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">Santiago Towne</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Sale</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img2.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img1.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img2.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">John Dukes</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img2.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img1.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img3.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">David Elson</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img4.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img5.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img6.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img4.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">James Hall</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img5.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img4.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img6.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img5.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">Corina McCoy</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img6.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img5.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img4.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img6.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">Patricia Sanders</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img1.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img2.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $82,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img1.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">Santiago Towne</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Sale</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img2.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img1.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img2.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">John Dukes</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img2.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img1.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img3.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">David Elson</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img4.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img5.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img6.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img4.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">James Hall</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img5.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img4.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img6.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img5.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">Corina McCoy</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img6.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img5.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img4.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img6.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">Patricia Sanders</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex={0}>
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img1.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img2.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $82,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img1.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">Santiago Towne</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Sale</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img2.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img1.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img2.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">John Dukes</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img2.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img1.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img3.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">David Elson</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img4.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img5.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img6.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img4.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">James Hall</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img5.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img4.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img6.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img5.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">Corina McCoy</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img6.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img5.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img4.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img6.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">Patricia Sanders</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-contact1" role="tabpanel" aria-labelledby="pills-contact1-tab" tabIndex={0}>
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img1.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img2.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $82,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img1.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">Santiago Towne</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Sale</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img2.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img1.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img2.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">John Dukes</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img2.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img1.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img3.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">David Elson</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img4.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img5.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img6.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img4.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">James Hall</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img5.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img4.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img6.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img5.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">Corina McCoy</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img6.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img5.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img4.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img6.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">Patricia Sanders</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-contact2" role="tabpanel" aria-labelledby="pills-contact2-tab" tabIndex={0}>
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img1.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img2.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $82,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img1.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">Santiago Towne</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Sale</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img2.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img1.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img2.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">John Dukes</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img2.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img1.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img3.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">David Elson</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img4.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img5.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img6.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img4.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">James Hall</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img5.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img4.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img6.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img5.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">Corina McCoy</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img6.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img5.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img4.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img6.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">Patricia Sanders</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-contact3" role="tabpanel" aria-labelledby="pills-contact3-tab" tabIndex={0}>
                                        <div className="row">
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img1.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img2.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $82,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img1.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">Santiago Towne</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Sale</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img2.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img1.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img2.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">John Dukes</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img3.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img2.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img1.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img3.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">David Elson</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img4.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img5.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img6.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img4.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">James Hall</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img5.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img4.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img6.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img5.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">Corina McCoy</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-6">
                                                <div className="property-single-boxarea">
                                                    <Swiper {...swiperOptions} className="property-list-img-area owl-carousel">
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img6.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img5.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <SwiperSlide>
                                                            <Link href="/property-details-v1">
                                                                <div className="img1 image-anime">
                                                                    <img src="/assets/img/all-images/properties/property-img4.png" alt="housa" />
                                                                </div>
                                                            </Link>
                                                        </SwiperSlide>
                                                        <div className="swiper-pagination" />
                                                    </Swiper>
                                                    <div className="space20" />
                                                    <div className="property-price">
                                                        <div className="text">
                                                            <Link href="/property-details-v1" className="title">
                                                                Golden Oaks Residence
                                                            </Link>
                                                            <div className="space16" />
                                                            <p>199 Oakway Lane, Woodland </p>
                                                        </div>
                                                        <Link href="#" className="price">
                                                            $8,000
                                                        </Link>
                                                    </div>
                                                    <div className="space20" />
                                                    <div className="property-other-widget">
                                                        <ul>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M8 9H16M8 15H16" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                        <path d="M3 21H21V3.00046L3 3V21Z" stroke="#1B1B1B" strokeWidth="1.5" strokeLinejoin="round" />
                                                                    </svg>
                                                                </span>
                                                                2150 sqft
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M22 17.5H2" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M22 21V16C22 14.1144 22 13.1716 21.4142 12.5858C20.8284 12 19.8856 12 18 12H6C4.11438 12 3.17157 12 2.58579 12.5858C2 13.1716 2 14.1144 2 16V21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M16 12V10.6178C16 10.1103 15.9085 9.94054 15.4396 9.7405C14.4631 9.32389 13.2778 9 12 9C10.7222 9 9.53688 9.32389 8.5604 9.7405C8.09154 9.94054 8 10.1103 8 10.6178V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M20 12V7.36057C20 6.66893 20 6.32311 19.8292 5.99653C19.6584 5.66995 19.4151 5.50091 18.9284 5.16283C16.9661 3.79978 14.5772 3 12 3C9.42282 3 7.03391 3.79978 5.07163 5.16283C4.58492 5.50091 4.34157 5.66995 4.17079 5.99653C4 6.32311 4 6.66893 4 7.36057V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                5 Beds
                                                            </li>
                                                            <li>
                                                                <span>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
                                                                        <path d="M6 20L5 21M18 20L19 21" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M3 12V13C3 16.2998 3 17.9497 4.02513 18.9749C5.05025 20 6.70017 20 10 20H14C17.2998 20 18.9497 20 19.9749 18.9749C21 17.9497 21 16.2998 21 13V12" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                                        <path d="M2 12H22" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M4 12V5.5234C4 4.12977 5.12977 3 6.5234 3C7.64166 3 8.62654 3.73598 8.94339 4.80841L9 5" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                        <path d="M8 6L10.5 4" stroke="#1B1B1B" strokeWidth="1.5" strokeLinecap="round" />
                                                                    </svg>
                                                                </span>
                                                                3 Baths
                                                            </li>
                                                        </ul>
                                                        <div className="space24" />
                                                        <div className="btn-area">
                                                            <div className="name-area">
                                                                <div className="img">
                                                                    <img src="/assets/img/all-images/others/others-img6.png" alt="housa" />
                                                                </div>
                                                                <div className="text">
                                                                    <Link href="#">Patricia Sanders</Link>
                                                                </div>
                                                            </div>
                                                            <div className="love-share">
                                                                <Link href="javascript:void(0)" className="heart">
                                                                    <img src="/assets/img/icons/heart2.svg" alt="housa" className="heart1" /> <img src="/assets/img/icons/heart1.svg" alt="housa" className="heart2" />
                                                                </Link>
                                                                <Link href="#" className="share">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width={19} height={20} viewBox="0 0 19 20" fill="none">
                                                                        <path
                                                                            d="M11.0373 14.6505L7.14942 12.5297C6.47355 13.2521 5.51175 13.7034 4.44452 13.7034C2.39902 13.7034 0.740814 12.0452 0.740814 9.99974C0.740814 7.95424 2.39902 6.29603 4.44452 6.29603C5.51169 6.29603 6.47345 6.74739 7.14931 7.46961L11.0373 5.34893C10.9646 5.05938 10.926 4.75628 10.926 4.44418C10.926 2.39868 12.5842 0.740479 14.6297 0.740479C16.6752 0.740479 18.3334 2.39868 18.3334 4.44418C18.3334 6.48968 16.6752 8.14789 14.6297 8.14789C13.5625 8.14789 12.6007 7.69651 11.9248 6.97424L8.0369 9.09492C8.10961 9.38446 8.14822 9.68761 8.14822 9.99974C8.14822 10.3119 8.10962 10.6149 8.03693 10.9045L11.9249 13.0252C12.6007 12.303 13.5625 11.8516 14.6297 11.8516C16.6752 11.8516 18.3334 13.5098 18.3334 15.5553C18.3334 17.6008 16.6752 19.259 14.6297 19.259C12.5842 19.259 10.926 17.6008 10.926 15.5553C10.926 15.2432 10.9646 14.94 11.0373 14.6505ZM4.44452 11.8516C5.46727 11.8516 6.29637 11.0225 6.29637 9.99974C6.29637 8.97696 5.46727 8.14789 4.44452 8.14789C3.42177 8.14789 2.59267 8.97696 2.59267 9.99974C2.59267 11.0225 3.42177 11.8516 4.44452 11.8516ZM14.6297 6.29603C15.6525 6.29603 16.4816 5.46693 16.4816 4.44418C16.4816 3.42143 15.6525 2.59233 14.6297 2.59233C13.6069 2.59233 12.7779 3.42143 12.7779 4.44418C12.7779 5.46693 13.6069 6.29603 14.6297 6.29603ZM14.6297 17.4071C15.6525 17.4071 16.4816 16.5781 16.4816 15.5553C16.4816 14.5325 15.6525 13.7034 14.6297 13.7034C13.6069 13.7034 12.7779 14.5325 12.7779 15.5553C12.7779 16.5781 13.6069 17.4071 14.6297 17.4071Z"
                                                                            fill="#ED8438"
                                                                        />
                                                                    </svg>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="rent-sale-area">
                                                        <ul>
                                                            <li>
                                                                <Link href="#">For Rent</Link>
                                                            </li>
                                                            <li>
                                                                <Link href="#">New</Link>
                                                            </li>
                                                        </ul>
                                                        <Link href="#" className="camera">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                                                                <path d="M12 7.39995C12 8.75995 10.96 9.79995 9.6 9.79995C8.24 9.79995 7.2 8.75995 7.2 7.39995C7.2 6.03995 8.24 4.99995 9.6 4.99995C10.96 4.99995 12 6.03995 12 7.39995ZM16 3.39995V12.2C16 13.08 15.28 13.8 14.4 13.8H1.6C0.72 13.8 0 13.08 0 12.2V3.39995C0 2.51995 0.72 1.79995 1.6 1.79995V0.999951H4.8V1.79995H6.4L7.2 0.199951H12L12.8 1.79995H14.4C15.28 1.79995 16 2.51995 16 3.39995ZM4.4 4.99995C4.4 4.35995 3.84 3.79995 3.2 3.79995C2.56 3.79995 2 4.35995 2 4.99995C2 5.63995 2.56 6.19995 3.2 6.19995C3.84 6.19995 4.4 5.63995 4.4 4.99995ZM13.6 7.39995C13.6 5.15995 11.84 3.39995 9.6 3.39995C7.36 3.39995 5.6 5.15995 5.6 7.39995C5.6 9.63995 7.36 11.4 9.6 11.4C11.84 11.4 13.6 9.63995 13.6 7.39995Z" fill="#1B1B1B" />
                                                            </svg>
                                                            3
                                                        </Link>
                                                    </div>
                                                    <div className="btn-area1 text-center">
                                                        <Link href="/property-details-v1" className="vl-btn1">
                                                            View Property Details
                                                            <span className="arrow1 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                            <span className="arrow2 ms-2">
                                                                <i className="fa-solid fa-arrow-right" />
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
