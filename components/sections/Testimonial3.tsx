"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs } from "swiper/modules";
import SwiperCore from "swiper";
import Link from "next/link";
export default function Testimonial3() {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
    return (
        <>
            {/*===== TESTIMONIAL AREA STARTS =======*/}
            <div className="testimonial1-section-area sp1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 m-auto">
                            <div className="testimonial-header text-center heading2 space-margin60">
                                <h5>Our Valued Customers</h5>
                                <div className="space16" />
                                <h2 className="text-anime-style-3">What Our Happy Clients Say</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-5">
                            <div className="img1 image-anime reveal">
                                <img src="/assets/img/all-images/testimonial/testimonial-img2.png" alt="housa" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <Swiper modules={[Autoplay, Thumbs]} centeredSlides={true} spaceBetween={0} slidesPerView={1} loop={true} thumbs={{ swiper: thumbsSwiper }} className="slider-galeria">
                                <SwiperSlide className="testimonial-slider-content-area">
                                    <div className="testimonial-author-area">
                                        <ul>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="space16" />
                                        <div className="quito">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
                                                <g clipPath="url(#clip0_6058_74117)">
                                                    <path
                                                        d="M27.5015 10C29.032 9.99979 30.5013 10.6011 31.5925 11.6742C32.6838 12.7474 33.3095 14.2064 33.3349 15.7367C33.4849 17.1783 33.4632 19.305 32.4882 21.76C31.4915 24.27 29.5482 27.0067 26.0014 29.6667C25.8263 29.798 25.6271 29.8935 25.4151 29.9479C25.203 30.0022 24.9824 30.0142 24.7657 29.9833C24.3281 29.9207 23.9333 29.687 23.6681 29.3333C23.4029 28.9797 23.289 28.5352 23.3515 28.0976C23.414 27.66 23.6478 27.2652 24.0014 27C26.6081 25.045 28.1015 23.145 28.9565 21.4833C28.1549 21.6892 27.3186 21.7221 26.5033 21.5799C25.688 21.4377 24.9123 21.1237 24.2277 20.6587C23.543 20.1936 22.9652 19.5882 22.5326 18.8827C22.1 18.1771 21.8224 17.3876 21.7184 16.5666C21.6143 15.7455 21.6862 14.9117 21.9292 14.1206C22.1722 13.3295 22.5808 12.5991 23.1278 11.978C23.6747 11.3569 24.3476 10.8593 25.1017 10.5183C25.8558 10.1772 26.6738 10.0006 27.5015 10ZM12.5012 10C14.0318 9.99979 15.501 10.6011 16.5923 11.6742C17.6835 12.7474 18.3093 14.2064 18.3347 15.7367C18.4847 17.1783 18.463 19.305 17.488 21.76C16.493 24.27 14.5479 27.0067 11.0012 29.6667C10.8261 29.798 10.6269 29.8935 10.4149 29.9479C10.2028 30.0022 9.98218 30.0142 9.7655 29.9833C9.32791 29.9207 8.93308 29.687 8.66786 29.3333C8.40264 28.9797 8.28876 28.5352 8.35127 28.0976C8.41378 27.66 8.64757 27.2652 9.0012 27C11.6079 25.045 13.1013 23.145 13.9563 21.4833C13.1547 21.6892 12.3184 21.7221 11.5031 21.5799C10.6878 21.4377 9.91204 21.1237 9.22743 20.6587C8.54282 20.1936 7.96501 19.5882 7.53237 18.8827C7.09973 18.1771 6.82218 17.3876 6.71814 16.5666C6.61411 15.7455 6.68598 14.9117 6.92898 14.1206C7.17198 13.3295 7.58054 12.5991 8.12753 11.978C8.67452 11.3569 9.34741 10.8593 10.1015 10.5183C10.8556 10.1772 11.6736 10.0006 12.5012 10Z"
                                                        fill="white"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_6058_74117">
                                                        <rect width="40.0006" height={40} fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <p>“Housa made the home-buying process so easy stress-free! Their team guided me through every ensuring I found the perfect home within budget. couldn’t be happier with my best of house place!"</p>
                                        <div className="triangle">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={42} height={35} viewBox="0 0 42 35" fill="none">
                                                <path d="M19.2679 33C20.0377 34.3333 20.4226 35 21 35C21.5774 35 21.9622 34.3333 22.732 33L40.0526 3C40.8224 1.66667 41.2073 1 40.9186 0.5C40.6299 0 39.8601 0 38.3205 0H3.67949C2.13989 0 1.37009 0 1.08142 0.5C0.792741 1 1.17764 1.66667 1.94744 3L19.2679 33Z" fill="#ED8438" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="space30" />
                                    <div className="testimonial-man-info-area">
                                        <div className="man-images-text">
                                            <div className="mans-img">
                                                <img src="/assets/img/all-images/testimonial/testimonial-img9.png" alt="housa" />
                                            </div>
                                            <div className="man-text">
                                                <Link href="/about-us">Sheldon Jackson</Link>
                                                <div className="space12" />
                                                <p>Shop Store Owner</p>
                                            </div>
                                        </div>
                                        <img src="/assets/img/elements/elements2.png" alt="housa" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="testimonial-slider-content-area">
                                    <div className="testimonial-author-area">
                                        <ul>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="space16" />
                                        <div className="quito">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
                                                <g clipPath="url(#clip0_6058_74117)">
                                                    <path
                                                        d="M27.5015 10C29.032 9.99979 30.5013 10.6011 31.5925 11.6742C32.6838 12.7474 33.3095 14.2064 33.3349 15.7367C33.4849 17.1783 33.4632 19.305 32.4882 21.76C31.4915 24.27 29.5482 27.0067 26.0014 29.6667C25.8263 29.798 25.6271 29.8935 25.4151 29.9479C25.203 30.0022 24.9824 30.0142 24.7657 29.9833C24.3281 29.9207 23.9333 29.687 23.6681 29.3333C23.4029 28.9797 23.289 28.5352 23.3515 28.0976C23.414 27.66 23.6478 27.2652 24.0014 27C26.6081 25.045 28.1015 23.145 28.9565 21.4833C28.1549 21.6892 27.3186 21.7221 26.5033 21.5799C25.688 21.4377 24.9123 21.1237 24.2277 20.6587C23.543 20.1936 22.9652 19.5882 22.5326 18.8827C22.1 18.1771 21.8224 17.3876 21.7184 16.5666C21.6143 15.7455 21.6862 14.9117 21.9292 14.1206C22.1722 13.3295 22.5808 12.5991 23.1278 11.978C23.6747 11.3569 24.3476 10.8593 25.1017 10.5183C25.8558 10.1772 26.6738 10.0006 27.5015 10ZM12.5012 10C14.0318 9.99979 15.501 10.6011 16.5923 11.6742C17.6835 12.7474 18.3093 14.2064 18.3347 15.7367C18.4847 17.1783 18.463 19.305 17.488 21.76C16.493 24.27 14.5479 27.0067 11.0012 29.6667C10.8261 29.798 10.6269 29.8935 10.4149 29.9479C10.2028 30.0022 9.98218 30.0142 9.7655 29.9833C9.32791 29.9207 8.93308 29.687 8.66786 29.3333C8.40264 28.9797 8.28876 28.5352 8.35127 28.0976C8.41378 27.66 8.64757 27.2652 9.0012 27C11.6079 25.045 13.1013 23.145 13.9563 21.4833C13.1547 21.6892 12.3184 21.7221 11.5031 21.5799C10.6878 21.4377 9.91204 21.1237 9.22743 20.6587C8.54282 20.1936 7.96501 19.5882 7.53237 18.8827C7.09973 18.1771 6.82218 17.3876 6.71814 16.5666C6.61411 15.7455 6.68598 14.9117 6.92898 14.1206C7.17198 13.3295 7.58054 12.5991 8.12753 11.978C8.67452 11.3569 9.34741 10.8593 10.1015 10.5183C10.8556 10.1772 11.6736 10.0006 12.5012 10Z"
                                                        fill="white"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_6058_74117g">
                                                        <rect width="40.0006" height={40} fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <p>“Housa made the home-buying process so easy stress-free! Their team guided me through every ensuring I found the perfect home within budget. couldn’t be happier with my best of house place!"</p>
                                        <div className="triangle">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={42} height={35} viewBox="0 0 42 35" fill="none">
                                                <path d="M19.2679 33C20.0377 34.3333 20.4226 35 21 35C21.5774 35 21.9622 34.3333 22.732 33L40.0526 3C40.8224 1.66667 41.2073 1 40.9186 0.5C40.6299 0 39.8601 0 38.3205 0H3.67949C2.13989 0 1.37009 0 1.08142 0.5C0.792741 1 1.17764 1.66667 1.94744 3L19.2679 33Z" fill="#ED8438" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="space30" />
                                    <div className="testimonial-man-info-area">
                                        <div className="man-images-text">
                                            <div className="mans-img">
                                                <img src="/assets/img/all-images/testimonial/testimonial-img10.png" alt="housa" />
                                            </div>
                                            <div className="man-text">
                                                <Link href="/about-us">Sheldon Jackson</Link>
                                                <div className="space12" />
                                                <p>Shop Store Owner</p>
                                            </div>
                                        </div>
                                        <img src="/assets/img/elements/elements2.png" alt="housa" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="testimonial-slider-content-area">
                                    <div className="testimonial-author-area">
                                        <ul>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="space16" />
                                        <div className="quito">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
                                                <g clipPath="url(#clip0_6058_74117)">
                                                    <path
                                                        d="M27.5015 10C29.032 9.99979 30.5013 10.6011 31.5925 11.6742C32.6838 12.7474 33.3095 14.2064 33.3349 15.7367C33.4849 17.1783 33.4632 19.305 32.4882 21.76C31.4915 24.27 29.5482 27.0067 26.0014 29.6667C25.8263 29.798 25.6271 29.8935 25.4151 29.9479C25.203 30.0022 24.9824 30.0142 24.7657 29.9833C24.3281 29.9207 23.9333 29.687 23.6681 29.3333C23.4029 28.9797 23.289 28.5352 23.3515 28.0976C23.414 27.66 23.6478 27.2652 24.0014 27C26.6081 25.045 28.1015 23.145 28.9565 21.4833C28.1549 21.6892 27.3186 21.7221 26.5033 21.5799C25.688 21.4377 24.9123 21.1237 24.2277 20.6587C23.543 20.1936 22.9652 19.5882 22.5326 18.8827C22.1 18.1771 21.8224 17.3876 21.7184 16.5666C21.6143 15.7455 21.6862 14.9117 21.9292 14.1206C22.1722 13.3295 22.5808 12.5991 23.1278 11.978C23.6747 11.3569 24.3476 10.8593 25.1017 10.5183C25.8558 10.1772 26.6738 10.0006 27.5015 10ZM12.5012 10C14.0318 9.99979 15.501 10.6011 16.5923 11.6742C17.6835 12.7474 18.3093 14.2064 18.3347 15.7367C18.4847 17.1783 18.463 19.305 17.488 21.76C16.493 24.27 14.5479 27.0067 11.0012 29.6667C10.8261 29.798 10.6269 29.8935 10.4149 29.9479C10.2028 30.0022 9.98218 30.0142 9.7655 29.9833C9.32791 29.9207 8.93308 29.687 8.66786 29.3333C8.40264 28.9797 8.28876 28.5352 8.35127 28.0976C8.41378 27.66 8.64757 27.2652 9.0012 27C11.6079 25.045 13.1013 23.145 13.9563 21.4833C13.1547 21.6892 12.3184 21.7221 11.5031 21.5799C10.6878 21.4377 9.91204 21.1237 9.22743 20.6587C8.54282 20.1936 7.96501 19.5882 7.53237 18.8827C7.09973 18.1771 6.82218 17.3876 6.71814 16.5666C6.61411 15.7455 6.68598 14.9117 6.92898 14.1206C7.17198 13.3295 7.58054 12.5991 8.12753 11.978C8.67452 11.3569 9.34741 10.8593 10.1015 10.5183C10.8556 10.1772 11.6736 10.0006 12.5012 10Z"
                                                        fill="white"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_6058_74117h">
                                                        <rect width="40.0006" height={40} fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <p>“Housa made the home-buying process so easy stress-free! Their team guided me through every ensuring I found the perfect home within budget. couldn’t be happier with my best of house place!"</p>
                                        <div className="triangle">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={42} height={35} viewBox="0 0 42 35" fill="none">
                                                <path d="M19.2679 33C20.0377 34.3333 20.4226 35 21 35C21.5774 35 21.9622 34.3333 22.732 33L40.0526 3C40.8224 1.66667 41.2073 1 40.9186 0.5C40.6299 0 39.8601 0 38.3205 0H3.67949C2.13989 0 1.37009 0 1.08142 0.5C0.792741 1 1.17764 1.66667 1.94744 3L19.2679 33Z" fill="#ED8438" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="space30" />
                                    <div className="testimonial-man-info-area">
                                        <div className="man-images-text">
                                            <div className="mans-img">
                                                <img src="/assets/img/all-images/testimonial/testimonial-img11.png" alt="housa" />
                                            </div>
                                            <div className="man-text">
                                                <Link href="/about-us">Sheldon Jackson</Link>
                                                <div className="space12" />
                                                <p>Shop Store Owner</p>
                                            </div>
                                        </div>
                                        <img src="/assets/img/elements/elements2.png" alt="housa" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="testimonial-slider-content-area">
                                    <div className="testimonial-author-area">
                                        <ul>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="space16" />
                                        <div className="quito">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
                                                <g clipPath="url(#clip0_6058_74117)">
                                                    <path
                                                        d="M27.5015 10C29.032 9.99979 30.5013 10.6011 31.5925 11.6742C32.6838 12.7474 33.3095 14.2064 33.3349 15.7367C33.4849 17.1783 33.4632 19.305 32.4882 21.76C31.4915 24.27 29.5482 27.0067 26.0014 29.6667C25.8263 29.798 25.6271 29.8935 25.4151 29.9479C25.203 30.0022 24.9824 30.0142 24.7657 29.9833C24.3281 29.9207 23.9333 29.687 23.6681 29.3333C23.4029 28.9797 23.289 28.5352 23.3515 28.0976C23.414 27.66 23.6478 27.2652 24.0014 27C26.6081 25.045 28.1015 23.145 28.9565 21.4833C28.1549 21.6892 27.3186 21.7221 26.5033 21.5799C25.688 21.4377 24.9123 21.1237 24.2277 20.6587C23.543 20.1936 22.9652 19.5882 22.5326 18.8827C22.1 18.1771 21.8224 17.3876 21.7184 16.5666C21.6143 15.7455 21.6862 14.9117 21.9292 14.1206C22.1722 13.3295 22.5808 12.5991 23.1278 11.978C23.6747 11.3569 24.3476 10.8593 25.1017 10.5183C25.8558 10.1772 26.6738 10.0006 27.5015 10ZM12.5012 10C14.0318 9.99979 15.501 10.6011 16.5923 11.6742C17.6835 12.7474 18.3093 14.2064 18.3347 15.7367C18.4847 17.1783 18.463 19.305 17.488 21.76C16.493 24.27 14.5479 27.0067 11.0012 29.6667C10.8261 29.798 10.6269 29.8935 10.4149 29.9479C10.2028 30.0022 9.98218 30.0142 9.7655 29.9833C9.32791 29.9207 8.93308 29.687 8.66786 29.3333C8.40264 28.9797 8.28876 28.5352 8.35127 28.0976C8.41378 27.66 8.64757 27.2652 9.0012 27C11.6079 25.045 13.1013 23.145 13.9563 21.4833C13.1547 21.6892 12.3184 21.7221 11.5031 21.5799C10.6878 21.4377 9.91204 21.1237 9.22743 20.6587C8.54282 20.1936 7.96501 19.5882 7.53237 18.8827C7.09973 18.1771 6.82218 17.3876 6.71814 16.5666C6.61411 15.7455 6.68598 14.9117 6.92898 14.1206C7.17198 13.3295 7.58054 12.5991 8.12753 11.978C8.67452 11.3569 9.34741 10.8593 10.1015 10.5183C10.8556 10.1772 11.6736 10.0006 12.5012 10Z"
                                                        fill="white"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_6058_74117k">
                                                        <rect width="40.0006" height={40} fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <p>“Housa made the home-buying process so easy stress-free! Their team guided me through every ensuring I found the perfect home within budget. couldn’t be happier with my best of house place!"</p>
                                        <div className="triangle">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={42} height={35} viewBox="0 0 42 35" fill="none">
                                                <path d="M19.2679 33C20.0377 34.3333 20.4226 35 21 35C21.5774 35 21.9622 34.3333 22.732 33L40.0526 3C40.8224 1.66667 41.2073 1 40.9186 0.5C40.6299 0 39.8601 0 38.3205 0H3.67949C2.13989 0 1.37009 0 1.08142 0.5C0.792741 1 1.17764 1.66667 1.94744 3L19.2679 33Z" fill="#ED8438" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="space30" />
                                    <div className="testimonial-man-info-area">
                                        <div className="man-images-text">
                                            <div className="mans-img">
                                                <img src="/assets/img/all-images/testimonial/testimonial-img12.png" alt="housa" />
                                            </div>
                                            <div className="man-text">
                                                <Link href="/about-us">Sheldon Jackson</Link>
                                                <div className="space12" />
                                                <p>Shop Store Owner</p>
                                            </div>
                                        </div>
                                        <img src="/assets/img/elements/elements2.png" alt="housa" />
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="testimonial-slider-content-area">
                                    <div className="testimonial-author-area">
                                        <ul>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="">
                                                    <i className="fa-solid fa-star" />
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="space16" />
                                        <div className="quito">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
                                                <g clipPath="url(#clip0_6058_74117)">
                                                    <path
                                                        d="M27.5015 10C29.032 9.99979 30.5013 10.6011 31.5925 11.6742C32.6838 12.7474 33.3095 14.2064 33.3349 15.7367C33.4849 17.1783 33.4632 19.305 32.4882 21.76C31.4915 24.27 29.5482 27.0067 26.0014 29.6667C25.8263 29.798 25.6271 29.8935 25.4151 29.9479C25.203 30.0022 24.9824 30.0142 24.7657 29.9833C24.3281 29.9207 23.9333 29.687 23.6681 29.3333C23.4029 28.9797 23.289 28.5352 23.3515 28.0976C23.414 27.66 23.6478 27.2652 24.0014 27C26.6081 25.045 28.1015 23.145 28.9565 21.4833C28.1549 21.6892 27.3186 21.7221 26.5033 21.5799C25.688 21.4377 24.9123 21.1237 24.2277 20.6587C23.543 20.1936 22.9652 19.5882 22.5326 18.8827C22.1 18.1771 21.8224 17.3876 21.7184 16.5666C21.6143 15.7455 21.6862 14.9117 21.9292 14.1206C22.1722 13.3295 22.5808 12.5991 23.1278 11.978C23.6747 11.3569 24.3476 10.8593 25.1017 10.5183C25.8558 10.1772 26.6738 10.0006 27.5015 10ZM12.5012 10C14.0318 9.99979 15.501 10.6011 16.5923 11.6742C17.6835 12.7474 18.3093 14.2064 18.3347 15.7367C18.4847 17.1783 18.463 19.305 17.488 21.76C16.493 24.27 14.5479 27.0067 11.0012 29.6667C10.8261 29.798 10.6269 29.8935 10.4149 29.9479C10.2028 30.0022 9.98218 30.0142 9.7655 29.9833C9.32791 29.9207 8.93308 29.687 8.66786 29.3333C8.40264 28.9797 8.28876 28.5352 8.35127 28.0976C8.41378 27.66 8.64757 27.2652 9.0012 27C11.6079 25.045 13.1013 23.145 13.9563 21.4833C13.1547 21.6892 12.3184 21.7221 11.5031 21.5799C10.6878 21.4377 9.91204 21.1237 9.22743 20.6587C8.54282 20.1936 7.96501 19.5882 7.53237 18.8827C7.09973 18.1771 6.82218 17.3876 6.71814 16.5666C6.61411 15.7455 6.68598 14.9117 6.92898 14.1206C7.17198 13.3295 7.58054 12.5991 8.12753 11.978C8.67452 11.3569 9.34741 10.8593 10.1015 10.5183C10.8556 10.1772 11.6736 10.0006 12.5012 10Z"
                                                        fill="white"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_6058_74117l">
                                                        <rect width="40.0006" height={40} fill="white" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </div>
                                        <p>“Housa made the home-buying process so easy stress-free! Their team guided me through every ensuring I found the perfect home within budget. couldn’t be happier with my best of house place!"</p>
                                        <div className="triangle">
                                            <svg xmlns="http://www.w3.org/2000/svg" width={42} height={35} viewBox="0 0 42 35" fill="none">
                                                <path d="M19.2679 33C20.0377 34.3333 20.4226 35 21 35C21.5774 35 21.9622 34.3333 22.732 33L40.0526 3C40.8224 1.66667 41.2073 1 40.9186 0.5C40.6299 0 39.8601 0 38.3205 0H3.67949C2.13989 0 1.37009 0 1.08142 0.5C0.792741 1 1.17764 1.66667 1.94744 3L19.2679 33Z" fill="#ED8438" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="space30" />
                                    <div className="testimonial-man-info-area">
                                        <div className="man-images-text">
                                            <div className="mans-img">
                                                <img src="/assets/img/all-images/testimonial/testimonial-img13.png" alt="housa" />
                                            </div>
                                            <div className="man-text">
                                                <Link href="/about-us">Sheldon Jackson</Link>
                                                <div className="space12" />
                                                <p>Shop Store Owner</p>
                                            </div>
                                        </div>
                                        <img src="/assets/img/elements/elements2.png" alt="housa" />
                                    </div>
                                </SwiperSlide>
                            </Swiper>
                        </div>
                        <div className="col-lg-1">
                            <Swiper modules={[Thumbs]} onSwiper={setThumbsSwiper} direction="vertical" spaceBetween={0} slidesPerView={4} freeMode={true} watchSlidesProgress={true} style={{ height: "350px" }} className="slider-galeria-thumbs text-center d-lg-block d-none">
                                <SwiperSlide className="testimonial3-sliders-img">
                                    <img src="/assets/img/all-images/testimonial/testimonial-img9.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="testimonial3-sliders-img">
                                    <img src="/assets/img/all-images/testimonial/testimonial-img10.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="testimonial3-sliders-img">
                                    <img src="/assets/img/all-images/testimonial/testimonial-img11.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="testimonial3-sliders-img">
                                    <img src="/assets/img/all-images/testimonial/testimonial-img12.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="testimonial3-sliders-img">
                                    <img src="/assets/img/all-images/testimonial/testimonial-img13.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="testimonial3-sliders-img">
                                    <img src="/assets/img/all-images/testimonial/testimonial-img9.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="testimonial3-sliders-img">
                                    <img src="/assets/img/all-images/testimonial/testimonial-img10.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="testimonial3-sliders-img">
                                    <img src="/assets/img/all-images/testimonial/testimonial-img11.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="testimonial3-sliders-img">
                                    <img src="/assets/img/all-images/testimonial/testimonial-img12.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="testimonial3-sliders-img">
                                    <img src="/assets/img/all-images/testimonial/testimonial-img13.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="testimonial3-sliders-img">
                                    <img src="/assets/img/all-images/testimonial/testimonial-img9.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="testimonial3-sliders-img">
                                    <img src="/assets/img/all-images/testimonial/testimonial-img10.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="testimonial3-sliders-img">
                                    <img src="/assets/img/all-images/testimonial/testimonial-img11.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="testimonial3-sliders-img">
                                    <img src="/assets/img/all-images/testimonial/testimonial-img12.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="testimonial3-sliders-img">
                                    <img src="/assets/img/all-images/testimonial/testimonial-img13.png" alt="housa" />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== TESTIMONIAL AREA ENDS =======*/}
        </>
    );
}
