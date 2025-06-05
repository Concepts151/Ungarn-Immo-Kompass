"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, Thumbs } from "swiper/modules";
import SwiperCore from "swiper";
import Link from "next/link";

export default function Testimonial1() {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

    return (
        <>
            <div className="space30"></div>

            <div className="testimonials-2 container-home1 py-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8 m-auto">
                            <div className="heading1 text-center space-margin60">
                                <h5>Testimonials</h5>
                                <div className="space16" />
                                <h2 className="text-anime-style-3">What Our Client Say About Housa</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-md-12 left _relative">
                            <Swiper
                                modules={[Autoplay, Pagination, Navigation, Thumbs]}
                                spaceBetween={10}
                                slidesPerView={1}
                                navigation={{
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev",
                                }}
                                thumbs={{ swiper: thumbsSwiper }}
                                className="swiper swiper-testimonial-2"
                            >
                                <div className="swiper-wrapper">
                                    <SwiperSlide className="swiper-slide">
                                        <div className="testimonials-box-2">
                                            <div className="content-area">
                                                <img src="/assets/img/icons/quito1.svg" alt="housa" />
                                                <div className="space16" />
                                                <p className="text">"Housa made our home-buying process so smooth! Their agents were knowledgeable and supportive at every step. We couldn’t be happier with our new home!"</p>
                                            </div>
                                            <div className="bottom">
                                                <div className="info">
                                                    <img src="/assets/img/all-images/testimonial/testimonial-img9.png" alt="housa" />
                                                    <div className="content">
                                                        <h6 className="name">
                                                            <Link href="#">Sheldon Jackson</Link>
                                                        </h6>
                                                        <p className="position">Shop Store Owner</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide">
                                        <div className="testimonials-box-2">
                                            <div className="content-area">
                                                <img src="/assets/img/icons/quito1.svg" alt="housa" />
                                                <div className="space16" />
                                                <p className="text">"Housa made our home-buying process so smooth! Their agents were knowledgeable and supportive at every step. We couldn’t be happier with our new home!"</p>
                                            </div>
                                            <div className="bottom">
                                                <div className="info">
                                                    <img src="/assets/img/all-images/testimonial/testimonial-img10.png" alt="housa" />
                                                    <div className="content">
                                                        <h6 className="name">
                                                            <Link href="#">Alex Garcia</Link>
                                                        </h6>
                                                        <p className="position">Shop Store Owner</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide">
                                        <div className="testimonials-box-2">
                                            <div className="content-area">
                                                <img src="/assets/img/icons/quito1.svg" alt="housa" />
                                                <div className="space16" />
                                                <p className="text">"Housa made our home-buying process so smooth! Their agents were knowledgeable and supportive at every step. We couldn’t be happier with our new home!"</p>
                                            </div>
                                            <div className="bottom">
                                                <div className="info">
                                                    <img src="/assets/img/all-images/testimonial/testimonial-img11.png" alt="housa" />
                                                    <div className="content">
                                                        <h6 className="name">
                                                            <Link href="#">Hector Fort</Link>
                                                        </h6>
                                                        <p className="position">Shop Store Owner</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide">
                                        <div className="testimonials-box-2">
                                            <div className="content-area">
                                                <img src="/assets/img/icons/quito1.svg" alt="housa" />
                                                <div className="space16" />
                                                <p className="text">"Housa made our home-buying process so smooth! Their agents were knowledgeable and supportive at every step. We couldn’t be happier with our new home!"</p>
                                            </div>
                                            <div className="bottom">
                                                <div className="info">
                                                    <img src="/assets/img/all-images/testimonial/testimonial-img12.png" alt="housa" />
                                                    <div className="content">
                                                        <h6 className="name">
                                                            <Link href="#">Inaki Pena</Link>
                                                        </h6>
                                                        <p className="position">Shop Store Owner</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide">
                                        <div className="testimonials-box-2">
                                            <div className="content-area">
                                                <img src="/assets/img/icons/quito1.svg" alt="housa" />
                                                <div className="space16" />
                                                <p className="text">"Housa made our home-buying process so smooth! Their agents were knowledgeable and supportive at every step. We couldn’t be happier with our new home!"</p>
                                            </div>
                                            <div className="bottom">
                                                <div className="info">
                                                    <img src="/assets/img/all-images/testimonial/testimonial-img13.png" alt="housa" />
                                                    <div className="content">
                                                        <h6 className="name">
                                                            <Link href="#">Raphinha Dias</Link>
                                                        </h6>
                                                        <p className="position">Shop Store Owner</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="swiper-slide">
                                        <div className="testimonials-box-2">
                                            <div className="content-area">
                                                <img src="/assets/img/icons/quito1.svg" alt="housa" />
                                                <div className="space16" />
                                                <p className="text">"Housa made our home-buying process so smooth! Their agents were knowledgeable and supportive at every step. We couldn’t be happier with our new home!"</p>
                                            </div>
                                            <div className="bottom">
                                                <div className="info">
                                                    <img src="/assets/img/all-images/testimonial/testimonial-img14.png" alt="housa" />
                                                    <div className="content">
                                                        <h6 className="name">
                                                            <Link href="#">Marc Casado</Link>
                                                        </h6>
                                                        <p className="position">Shop Store Owner</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                </div>
                            </Swiper>
                            <div className="pagination-buttons">
                                <div className="swiper-button-next">
                                    <button>
                                        <i className="fa-solid fa-angle-left" />
                                    </button>
                                </div>
                                <div className="swiper-button-prev">
                                    <button>
                                        <i className="fa-solid fa-angle-right" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-md-12">
                            <div className="map-testimonial">
                                <img className="map" src="assets/img/all-images/bg/map-bg.png" alt="housa" />

                                <Swiper modules={[Autoplay, Pagination, Navigation, Thumbs]} onSwiper={setThumbsSwiper} spaceBetween={10} slidesPerView={6} freeMode={true} watchSlidesProgress={true} className="swiper swiper-thumb2">
                                    <div className="swiper-wrapper list-img">
                                        <SwiperSlide className="swiper-slide">
                                            <div>
                                                <img src="/assets/img/all-images/testimonial/testimonial-img9.png" alt="housa" />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="swiper-slide">
                                            <div>
                                                <img src="/assets/img/all-images/testimonial/testimonial-img10.png" alt="housa" />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="swiper-slide">
                                            <div>
                                                <img src="/assets/img/all-images/testimonial/testimonial-img11.png" alt="housa" />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="swiper-slide">
                                            <div>
                                                <img src="/assets/img/all-images/testimonial/testimonial-img12.png" alt="housa" />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="swiper-slide">
                                            <div>
                                                <img src="/assets/img/all-images/testimonial/testimonial-img13.png" alt="housa" />
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide className="swiper-slide">
                                            <div>
                                                <img src="/assets/img/all-images/testimonial/testimonial-img14.png" alt="housa" />
                                            </div>
                                        </SwiperSlide>
                                    </div>
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
