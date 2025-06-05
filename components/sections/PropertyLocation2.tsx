"use client";
import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const swiperOptions = {
    modules: [Autoplay],
    spaceBetween: 10,
    slidesPerView: 1,
    freeMode: true,
    watchSlidesProgress: true,
    autoplay: {
        delay: 2500,
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        575: {
            slidesPerView: 2,
        },
        767: {
            slidesPerView: 3,
        },
        991: {
            slidesPerView: 4,
        },
        1199: {
            slidesPerView: 5,
        },
        1350: {
            slidesPerView: 6,
        },
    },
};

export default function PropertyLocation2() {
    return (
        <>
            {/*===== PROPERTIES_LOCATION AREA STARTS =======*/}
            <div className="p-location2 sp1 bg-white">
                <div className="conatainer">
                    <div className="row">
                        <div className="col-lg-10 m-auto">
                            <div className="heading1 text-center space-margin60">
                                <h5>Our Location</h5>
                                <div className="space16" />
                                <h2 className="text-anime-style-3">Find Properties In This Cities</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="slide-container swiper">
                                <div className="slide-content">
                                    <Swiper {...swiperOptions} className="card-wrapper swiper-wrapper">
                                        <SwiperSlide className="card1  swiper-slide">
                                            <div className="image-content">
                                                <div className="card-image">
                                                    <img src="/assets/img/all-images/p-location/p-loaction-img7.png" alt="housa" />
                                                </div>
                                            </div>
                                            <div className="card-content">
                                                <Link href="" className="name">
                                                    Los Angles
                                                </Link>
                                                <p className="description">8 Properties</p>
                                            </div>
                                            <div className="btn-area1">
                                                <Link href="/property-halfmap-list" className="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={29} height={28} viewBox="0 0 29 28" fill="none">
                                                        <path d="M6.33301 22.168L20.333 8.16797" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M8.95801 8.16797H20.333V19.543" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="card1  swiper-slide">
                                            <div className="image-content">
                                                <div className="card-image">
                                                    <img src="/assets/img/all-images/p-location/p-loaction-img8.png" alt="housa" />
                                                </div>
                                            </div>
                                            <div className="card-content">
                                                <Link href="" className="name">
                                                    Los Angles
                                                </Link>
                                                <p className="description">8 Properties</p>
                                            </div>
                                            <div className="btn-area1">
                                                <Link href="/property-halfmap-list" className="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={29} height={28} viewBox="0 0 29 28" fill="none">
                                                        <path d="M6.33301 22.168L20.333 8.16797" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M8.95801 8.16797H20.333V19.543" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="card1  swiper-slide">
                                            <div className="image-content">
                                                <div className="card-image">
                                                    <img src="/assets/img/all-images/p-location/p-loaction-img9.png" alt="housa" />
                                                </div>
                                            </div>
                                            <div className="card-content">
                                                <Link href="" className="name">
                                                    Los Angles
                                                </Link>
                                                <p className="description">8 Properties</p>
                                            </div>
                                            <div className="btn-area1">
                                                <Link href="/property-halfmap-list" className="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={29} height={28} viewBox="0 0 29 28" fill="none">
                                                        <path d="M6.33301 22.168L20.333 8.16797" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M8.95801 8.16797H20.333V19.543" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="card1  swiper-slide">
                                            <div className="image-content">
                                                <div className="card-image">
                                                    <img src="/assets/img/all-images/p-location/p-loaction-img10.png" alt="housa" />
                                                </div>
                                            </div>
                                            <div className="card-content">
                                                <Link href="" className="name">
                                                    Los Angles
                                                </Link>
                                                <p className="description">8 Properties</p>
                                            </div>
                                            <div className="btn-area1">
                                                <Link href="/property-halfmap-list" className="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={29} height={28} viewBox="0 0 29 28" fill="none">
                                                        <path d="M6.33301 22.168L20.333 8.16797" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M8.95801 8.16797H20.333V19.543" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="card1  swiper-slide">
                                            <div className="image-content">
                                                <div className="card-image">
                                                    <img src="/assets/img/all-images/p-location/p-loaction-img11.png" alt="housa" />
                                                </div>
                                            </div>
                                            <div className="card-content">
                                                <Link href="" className="name">
                                                    Los Angles
                                                </Link>
                                                <p className="description">8 Properties</p>
                                            </div>
                                            <div className="btn-area1">
                                                <Link href="/property-halfmap-list" className="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={29} height={28} viewBox="0 0 29 28" fill="none">
                                                        <path d="M6.33301 22.168L20.333 8.16797" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M8.95801 8.16797H20.333V19.543" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="card1  swiper-slide">
                                            <div className="image-content">
                                                <div className="card-image">
                                                    <img src="/assets/img/all-images/p-location/p-loaction-img12.png" alt="housa" />
                                                </div>
                                            </div>
                                            <div className="card-content">
                                                <Link href="" className="name">
                                                    Los Angles
                                                </Link>
                                                <p className="description">8 Properties</p>
                                            </div>
                                            <div className="btn-area1">
                                                <Link href="/property-halfmap-list" className="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={29} height={28} viewBox="0 0 29 28" fill="none">
                                                        <path d="M6.33301 22.168L20.333 8.16797" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M8.95801 8.16797H20.333V19.543" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="card1  swiper-slide">
                                            <div className="image-content">
                                                <div className="card-image">
                                                    <img src="/assets/img/all-images/p-location/p-loaction-img7.png" alt="housa" />
                                                </div>
                                            </div>
                                            <div className="card-content">
                                                <Link href="" className="name">
                                                    Los Angles
                                                </Link>
                                                <p className="description">8 Properties</p>
                                            </div>
                                            <div className="btn-area1">
                                                <Link href="/property-halfmap-list" className="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={29} height={28} viewBox="0 0 29 28" fill="none">
                                                        <path d="M6.33301 22.168L20.333 8.16797" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M8.95801 8.16797H20.333V19.543" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="card1  swiper-slide">
                                            <div className="image-content">
                                                <div className="card-image">
                                                    <img src="/assets/img/all-images/p-location/p-loaction-img8.png" alt="housa" />
                                                </div>
                                            </div>
                                            <div className="card-content">
                                                <Link href="" className="name">
                                                    Los Angles
                                                </Link>
                                                <p className="description">8 Properties</p>
                                            </div>
                                            <div className="btn-area1">
                                                <Link href="/property-halfmap-list" className="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={29} height={28} viewBox="0 0 29 28" fill="none">
                                                        <path d="M6.33301 22.168L20.333 8.16797" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M8.95801 8.16797H20.333V19.543" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="card1  swiper-slide">
                                            <div className="image-content">
                                                <div className="card-image">
                                                    <img src="/assets/img/all-images/p-location/p-loaction-img9.png" alt="housa" />
                                                </div>
                                            </div>
                                            <div className="card-content">
                                                <Link href="" className="name">
                                                    Los Angles
                                                </Link>
                                                <p className="description">8 Properties</p>
                                            </div>
                                            <div className="btn-area1">
                                                <Link href="/property-halfmap-list" className="button">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={29} height={28} viewBox="0 0 29 28" fill="none">
                                                        <path d="M6.33301 22.168L20.333 8.16797" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M8.95801 8.16797H20.333V19.543" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                                <div className="swiper-pagination" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== PROPERTIES_LOCATION AREA ENDS =======*/}
        </>
    );
}
