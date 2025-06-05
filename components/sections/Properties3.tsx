"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs } from "swiper/modules";
import SwiperCore from "swiper";
import Link from "next/link";
export default function Properties3() {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

    const bigImages = ["property-img7.png", "property-img8.png", "property-img9.png", "property-img7.png", "property-img8.png", "property-img9.png"];

    const smallImages = ["property-img10.png", "property-img11.png", "property-img12.png", "property-img10.png", "property-img11.png", "property-img12.png"];
    return (
        <>
            {/*===== PROPERTIES AREA STARTS =======*/}
            <div className="properties2 sp1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 m-auto">
                            <div className="heading1 text-center space-margin60">
                                <h5>Top Properties</h5>
                                <div className="space16" />
                                <h2 className="text-anime-style-3">Recommended For You</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="gallery-wrapper">
                                {/* Main Swiper */}
                                <div className="all-galler-images" data-aos="fade-left" data-aos-duration={1000}>
                                    <Swiper modules={[Autoplay, Thumbs]} thumbs={{ swiper: thumbsSwiper }} spaceBetween={0} autoplay={{ delay: 2500 }} freeMode={true} slidesPerView={1}>
                                        {bigImages.map((img, idx) => (
                                            <SwiperSlide key={idx} className="big-img">
                                                <img src={`/assets/img/all-images/properties/${img}`} alt="housa" />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>

                                {/* Thumbs Swiper */}
                                <div className="bottom-galler-images" data-aos="fade-right" data-aos-duration={1100}>
                                    <Swiper onSwiper={setThumbsSwiper} modules={[Autoplay, Thumbs]} spaceBetween={10} freeMode={true} slidesPerView={5} watchSlidesProgress={true}>
                                        {smallImages.map((img, idx) => (
                                            <SwiperSlide key={idx} className="small-img">
                                                <img src={`/assets/img/all-images/properties/${img}`} alt="thumb" />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="heading1">
                                <div className="content-area">
                                    <div className="rent-sale-area">
                                        <ul>
                                            <li>
                                                <Link href="#">For Sale</Link>
                                            </li>
                                            <li>
                                                <Link href="#">Featured</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="space32" />
                                    <Link href="/property-details-v1" className="title">
                                        Luxury House in Greenville
                                    </Link>
                                    <div className="space32" />
                                    <p>
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width={18} height={22} viewBox="0 0 18 22" fill="none">
                                                <path
                                                    d="M9 5C8.25832 5 7.5333 5.21993 6.91661 5.63199C6.29993 6.04404 5.81928 6.62971 5.53545 7.31494C5.25162 8.00016 5.17736 8.75416 5.32205 9.48159C5.46675 10.209 5.8239 10.8772 6.34835 11.4017C6.8728 11.9261 7.54098 12.2833 8.26841 12.4279C8.99584 12.5726 9.74984 12.4984 10.4351 12.2145C11.1203 11.9307 11.706 11.4501 12.118 10.8334C12.5301 10.2167 12.75 9.49168 12.75 8.75C12.75 7.75544 12.3549 6.80161 11.6517 6.09835C10.9484 5.39509 9.99456 5 9 5ZM9 11C8.55499 11 8.11998 10.868 7.74997 10.6208C7.37996 10.3736 7.09157 10.0222 6.92127 9.61104C6.75097 9.1999 6.70642 8.7475 6.79323 8.31105C6.88005 7.87459 7.09434 7.47368 7.40901 7.15901C7.72368 6.84434 8.12459 6.63005 8.56105 6.54323C8.9975 6.45642 9.4499 6.50097 9.86104 6.67127C10.2722 6.84157 10.6236 7.12996 10.8708 7.49997C11.118 7.86998 11.25 8.30499 11.25 8.75C11.25 9.34674 11.0129 9.91903 10.591 10.341C10.169 10.7629 9.59674 11 9 11ZM9 0.5C6.81273 0.502481 4.71575 1.37247 3.16911 2.91911C1.62247 4.46575 0.752481 6.56273 0.75 8.75C0.75 11.6938 2.11031 14.8138 4.6875 17.7734C5.84552 19.1108 7.14887 20.3151 8.57344 21.3641C8.69954 21.4524 8.84978 21.4998 9.00375 21.4998C9.15772 21.4998 9.30796 21.4524 9.43406 21.3641C10.856 20.3147 12.1568 19.1104 13.3125 17.7734C15.8859 14.8138 17.25 11.6938 17.25 8.75C17.2475 6.56273 16.3775 4.46575 14.8309 2.91911C13.2843 1.37247 11.1873 0.502481 9 0.5ZM9 19.8125C7.45031 18.5938 2.25 14.1172 2.25 8.75C2.25 6.95979 2.96116 5.2429 4.22703 3.97703C5.4929 2.71116 7.20979 2 9 2C10.7902 2 12.5071 2.71116 13.773 3.97703C15.0388 5.2429 15.75 6.95979 15.75 8.75C15.75 14.1153 10.5497 18.5938 9 19.8125Z"
                                                    fill="#1B1B1B"
                                                />
                                            </svg>
                                        </span>
                                        179 Sampson Street, Georgetown, CO 80444
                                    </p>
                                    <div className="space24" />
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
                                        <div className="space40" />
                                        <div className="info">
                                            <img src="/assets/img/all-images/testimonial/testimonial-img10.png" alt="housa" />
                                            <div className="content">
                                                <h6 className="name">
                                                    <Link href="#">Sheldon Jackson</Link>
                                                </h6>
                                                <p className="position">Shop Store Owner</p>
                                            </div>
                                        </div>
                                        <div className="space40" />
                                        <div className="btn-area">
                                            <div className="nm-btn">
                                                <h3>$12,50,000</h3>
                                            </div>
                                        </div>
                                        <div className="space32" />
                                        <div className="btn-area1">
                                            <Link href="/property-details-v1" className="vl-btn1">
                                                See Details
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
            {/*===== PROPERTIES AREA ENDS =======*/}
        </>
    );
}
