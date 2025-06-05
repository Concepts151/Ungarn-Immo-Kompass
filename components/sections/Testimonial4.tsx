"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Link from "next/link";
const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 4,
    spaceBetween: 30,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    loop: true,
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        575: {
            slidesPerView: 1,
            spaceBetween: 30,
        },
        767: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        991: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1199: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1350: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
    navigation: {
        nextEl: ".testimonial-next-arrow",
        prevEl: ".testimonial-prev-arrow",
    },
};
export default function Testimonial4() {
    return (
        <>
            {/*===== TESTIMONIAL AREA STARTS =======*/}
            <div
                className="testi4 sp1"
                style={{
                    backgroundImage: "url(assets/img/all-images/bg/team-bg1.png)",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="heading2 space-margin60">
                                <h5>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} viewBox="0 0 25 24" fill="none">
                                        <path d="M2.5 20H4.5M4.5 20H10.5M4.5 20V11.452C4.5 10.918 4.5 10.651 4.565 10.402C4.62256 10.1819 4.71725 9.97322 4.845 9.78497C4.99 9.57197 5.191 9.39497 5.593 9.04397L10.394 4.84197C11.14 4.18997 11.513 3.86397 11.932 3.73997C12.302 3.62997 12.697 3.62997 13.067 3.73997C13.487 3.86397 13.861 4.18997 14.607 4.84397L19.407 9.04397C19.809 9.39597 20.01 9.57197 20.155 9.78397C20.283 9.9753 20.3763 10.1813 20.435 10.402C20.5 10.651 20.5 10.918 20.5 11.452V20M10.5 20H14.5M10.5 20V16C10.5 15.4695 10.7107 14.9608 11.0858 14.5858C11.4609 14.2107 11.9696 14 12.5 14C13.0304 14 13.5391 14.2107 13.9142 14.5858C14.2893 14.9608 14.5 15.4695 14.5 16V20M20.5 20H14.5M20.5 20H22.5" stroke="#ED8438" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Real Stories, Real Satisfaction
                                </h5>
                                <div className="space18" />
                                <h2>Our Satisfied Homeowners</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="testi-main-area">
                                <Swiper {...swiperOptions} className="testimonial4-slider-box">
                                    <SwiperSlide className="testimonial-single-boxarea">
                                        <div className="man-images-text">
                                            <div className="mans-img">
                                                <img src="/assets/img/all-images/testimonial/testimonial-img11.png" alt="housa" />
                                            </div>
                                            <div className="man-text">
                                                <Link href="/about-us">Alex Robertson</Link>
                                                <div className="space12" />
                                                <p>Real Estate Agent</p>
                                            </div>
                                        </div>
                                        <div className="space24" />
                                        <p>“Housa made our home-buying best experience seamless and stress-free. Their team guided us through every to step, helping us find the perfect home within budget we couldn't happier!”</p>
                                        <div className="space24" />
                                        <div className="brand-img">
                                            <img src="/assets/img/elements/elements2.png" alt="housa" />
                                            <ul>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                            </ul>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="testimonial-single-boxarea">
                                        <div className="man-images-text">
                                            <div className="mans-img">
                                                <img src="/assets/img/all-images/testimonial/testimonial-img12.png" alt="housa" />
                                            </div>
                                            <div className="man-text">
                                                <Link href="/about-us">Nicolas Jackson</Link>
                                                <div className="space12" />
                                                <p>Our Happy Client</p>
                                            </div>
                                        </div>
                                        <div className="space24" />
                                        <p>“Selling our house with in Housa was the best decision we’re made. They are handled everything professionally and got us the best deal in no time. Highly recommend! Housa Real Estate.”</p>
                                        <div className="space24" />
                                        <div className="brand-img">
                                            <img src="/assets/img/elements/elements2.png" alt="housa" />
                                            <ul>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                            </ul>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="testimonial-single-boxarea">
                                        <div className="man-images-text">
                                            <div className="mans-img">
                                                <img src="/assets/img/all-images/testimonial/testimonial-img11.png" alt="housa" />
                                            </div>
                                            <div className="man-text">
                                                <Link href="/about-us">Henry Gayle</Link>
                                                <div className="space12" />
                                                <p>Our Happy Client</p>
                                            </div>
                                        </div>
                                        <div className="space24" />
                                        <p>“Housa specializes in high-end best to properties, and they helped me find my luxury dream home. Their knowledge of the market is unparalleled but Housa guided me through the best process.”</p>
                                        <div className="space24" />
                                        <div className="brand-img">
                                            <img src="/assets/img/elements/elements2.png" alt="housa" />
                                            <ul>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                            </ul>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="testimonial-single-boxarea">
                                        <div className="man-images-text">
                                            <div className="mans-img">
                                                <img src="/assets/img/all-images/testimonial/testimonial-img11.png" alt="housa" />
                                            </div>
                                            <div className="man-text">
                                                <Link href="/about-us">Alex Robertson</Link>
                                                <div className="space12" />
                                                <p>Real Estate Agent</p>
                                            </div>
                                        </div>
                                        <div className="space24" />
                                        <p>“Housa made our home-buying best experience seamless and stress-free. Their team guided us through every to step, helping us find the perfect home within budget we couldn't happier!”</p>
                                        <div className="space24" />
                                        <div className="brand-img">
                                            <img src="/assets/img/elements/elements2.png" alt="housa" />
                                            <ul>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                            </ul>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="testimonial-single-boxarea">
                                        <div className="man-images-text">
                                            <div className="mans-img">
                                                <img src="/assets/img/all-images/testimonial/testimonial-img12.png" alt="housa" />
                                            </div>
                                            <div className="man-text">
                                                <Link href="/about-us">Nicolas Jackson</Link>
                                                <div className="space12" />
                                                <p>Our Happy Client</p>
                                            </div>
                                        </div>
                                        <div className="space24" />
                                        <p>“Selling our house with in Housa was the best decision we’re made. They are handled everything professionally and got us the best deal in no time. Highly recommend! Housa Real Estate.”</p>
                                        <div className="space24" />
                                        <div className="brand-img">
                                            <img src="/assets/img/elements/elements2.png" alt="housa" />
                                            <ul>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                            </ul>
                                        </div>
                                    </SwiperSlide>
                                    <SwiperSlide className="testimonial-single-boxarea">
                                        <div className="man-images-text">
                                            <div className="mans-img">
                                                <img src="/assets/img/all-images/testimonial/testimonial-img11.png" alt="housa" />
                                            </div>
                                            <div className="man-text">
                                                <Link href="/about-us">Henry Gayle</Link>
                                                <div className="space12" />
                                                <p>Our Happy Client</p>
                                            </div>
                                        </div>
                                        <div className="space24" />
                                        <p>“Housa specializes in high-end best to properties, and they helped me find my luxury dream home. Their knowledge of the market is unparalleled but Housa guided me through the best process.”</p>
                                        <div className="space24" />
                                        <div className="brand-img">
                                            <img src="/assets/img/elements/elements2.png" alt="housa" />
                                            <ul>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                                <li>
                                                    <i className="fa-solid fa-star" />
                                                </li>
                                            </ul>
                                        </div>
                                    </SwiperSlide>
                                </Swiper>
                                <div className="testimonial-arrows">
                                    <div className="testimonial-prev-arrow">
                                        <button>
                                            <i className="fa-solid fa-angle-left" />
                                        </button>
                                    </div>
                                    <div className="testimonial-next-arrow">
                                        <button>
                                            <i className="fa-solid fa-angle-right" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== TESTIMONIAL AREA ENDS =======*/}
        </>
    );
}
