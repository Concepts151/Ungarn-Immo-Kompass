"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
const swiperOptions = {
    modules: [Autoplay, Pagination, Navigation],
    slidesPerView: 1,
    spaceBetween: 30,
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
export default function Testimonial2() {
    return (
        <>
            {/*===== TESTIMONIAL AREA STARTS =======*/}
            <div className="testi2 sp1 py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="testi-img image-anime reveal">
                                <img src="/assets/img/all-images//testimonial/testimonial-img1.png" alt="housa" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="heading1">
                                <h5>Testimonials</h5>
                                <div className="space16" />
                                <h2 className="text-anime-style-3">Hear from satisfied clients who have found dream Their homes.</h2>
                                <div className="space50" />
                                <div className="testimonial-container">
                                    <Swiper {...swiperOptions} className="swiper mySwiper">
                                        <div className="swiper-wrapper">
                                            {/* Slide 1 */}
                                            <SwiperSlide className="swiper-slide">
                                                <div className="testimonial-card">
                                                    <div className="stars">
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
                                                    <div className="space20" />
                                                    <p className="testimonial-text">"Housa made our home-buying experience smooth and stress-free. Highly recommend their services!"</p>
                                                    <div className="space32" />
                                                    <div className="profile-quito">
                                                        <div className="profile">
                                                            <img src="/assets/img/all-images/testimonial/testimonial-img9.png" alt="housa" />
                                                            <div className="name">
                                                                <h4>Santiago Towne</h4>
                                                                <span>Home Owner</span>
                                                            </div>
                                                        </div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 50 50" fill="none">
                                                            <g clipPath="url(#clip0_6058_76061)">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M30 37.5L34 25.2273H30L30 15L40 15L40 25.2273L36 37.5H30Z" fill="#ED8438" />
                                                                <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M12.5 37.5L16.5 25.2273H12.5L12.5 15L22.5 15L22.5 25.2273L18.5 37.5H12.5Z" fill="#ED8438" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_6058_76061">
                                                                    <rect width={50} height={50} fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            {/* Slide 2 */}
                                            <SwiperSlide className="swiper-slide">
                                                <div className="testimonial-card">
                                                    <div className="stars">
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
                                                    <div className="space20" />
                                                    <p className="testimonial-text">"Housa made our home-buying experience smooth and stress-free. Highly recommend their services!"</p>
                                                    <div className="space32" />
                                                    <div className="profile-quito">
                                                        <div className="profile">
                                                            <img src="/assets/img/all-images/testimonial/testimonial-img9.png" alt="housa" />
                                                            <div className="name">
                                                                <h4>Santiago Towne</h4>
                                                                <span>Home Owner</span>
                                                            </div>
                                                        </div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 50 50" fill="none">
                                                            <g clipPath="url(#clip0_6058_76061)">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M30 37.5L34 25.2273H30L30 15L40 15L40 25.2273L36 37.5H30Z" fill="#ED8438" />
                                                                <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M12.5 37.5L16.5 25.2273H12.5L12.5 15L22.5 15L22.5 25.2273L18.5 37.5H12.5Z" fill="#ED8438" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_6058_76061b">
                                                                    <rect width={50} height={50} fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                            {/* Slide 3 */}
                                            <SwiperSlide className="swiper-slide">
                                                <div className="testimonial-card">
                                                    <div className="stars">
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
                                                    <div className="space20" />
                                                    <p className="testimonial-text">"Housa made our home-buying experience smooth and stress-free. Highly recommend their services!"</p>
                                                    <div className="space32" />
                                                    <div className="profile-quito">
                                                        <div className="profile">
                                                            <img src="/assets/img/all-images/testimonial/testimonial-img9.png" alt="housa" />
                                                            <div className="name">
                                                                <h4>Santiago Towne</h4>
                                                                <span>Home Owner</span>
                                                            </div>
                                                        </div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 50 50" fill="none">
                                                            <g clipPath="url(#clip0_6058_76061)">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M30 37.5L34 25.2273H30L30 15L40 15L40 25.2273L36 37.5H30Z" fill="#ED8438" />
                                                                <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M12.5 37.5L16.5 25.2273H12.5L12.5 15L22.5 15L22.5 25.2273L18.5 37.5H12.5Z" fill="#ED8438" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_6058_76061a">
                                                                    <rect width={50} height={50} fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        </div>
                                        {/* Navigation Buttons */}
                                        <div className="swiper-button-prev custom-prev" />
                                        <div className="swiper-button-next custom-next" />
                                    </Swiper>
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
