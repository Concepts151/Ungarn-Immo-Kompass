"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 10,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
};

export default function Hero3() {
    return (
        <>
            {/*===== HERO AREA STARTS =======*/}
            <div className="hero3-slider overflow-hidden">
                {/*search-box-cover*/}
                <Swiper {...swiperOptions} className="swiper myswiper1">
                    <div className="swiper-wrapper">
                        <SwiperSlide className="swiper-slide">
                            <div className="hero3">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <div className="hero3-heading heading2">
                                                <span>🏠 Smarter Real Estate Decisions</span>
                                                <div className="space20" />
                                                <h1>Helping Find More Than Just House</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absoulate-img">
                                    <img src="/assets/img/all-images/hero/hero-img3.png" alt="housa" />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="swiper-slide">
                            <div className="hero3">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <div className="hero3-heading heading2">
                                                <span>🏠 Smarter Real Estate Decisions</span>
                                                <div className="space20" />
                                                <h1>Helping Find More Than Just House</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absoulate-img">
                                    <img src="/assets/img/all-images/hero/hero-img4.png" alt="housa" />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="swiper-slide">
                            <div className="hero3">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <div className="hero3-heading heading2">
                                                <span>🏠 Smarter Real Estate Decisions</span>
                                                <div className="space20" />
                                                <h1>Helping Find More Than Just House</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absoulate-img">
                                    <img src="/assets/img/all-images/hero/hero-img5.png" alt="housa" />
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className="swiper-slide">
                            <div className="hero3">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <div className="hero3-heading heading2">
                                                <span>🏠 Smarter Real Estate Decisions</span>
                                                <div className="space20" />
                                                <h1>Helping Find More Than Just House</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absoulate-img">
                                    <img src="/assets/img/all-images/hero/hero-img3.png" alt="housa" />
                                </div>
                            </div>
                        </SwiperSlide>
                    </div>
                </Swiper>
                {/* Navigation Buttons */}
                <div className="slide-btn">
                    <div className="swiper-button-prev custom-prev" />
                    <div className="swiper-button-next custom-next" />
                </div>
            </div>
            {/*===== HERO AREA ENDS =======*/}
        </>
    );
}
