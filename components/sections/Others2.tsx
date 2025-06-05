"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs } from "swiper/modules";
import SwiperCore from "swiper";
export default function Others2() {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

    return (
        <>
            {/*===== OTHERS AREA STARTS =======*/}
            <div className="galley4-section-area sp1">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 m-auto">
                            <div className="heading2 text-center space-margin60">
                                <h5>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} viewBox="0 0 25 24" fill="none">
                                        <path d="M2.5 20H4.5M4.5 20H10.5M4.5 20V11.452C4.5 10.918 4.5 10.651 4.565 10.402C4.62256 10.1819 4.71725 9.97322 4.845 9.78497C4.99 9.57197 5.191 9.39497 5.593 9.04397L10.394 4.84197C11.14 4.18997 11.513 3.86397 11.932 3.73997C12.302 3.62997 12.697 3.62997 13.067 3.73997C13.487 3.86397 13.861 4.18997 14.607 4.84397L19.407 9.04397C19.809 9.39597 20.01 9.57197 20.155 9.78397C20.283 9.9753 20.3763 10.1813 20.435 10.402C20.5 10.651 20.5 10.918 20.5 11.452V20M10.5 20H14.5M10.5 20V16C10.5 15.4695 10.7107 14.9608 11.0858 14.5858C11.4609 14.2107 11.9696 14 12.5 14C13.0304 14 13.5391 14.2107 13.9142 14.5858C14.2893 14.9608 14.5 15.4695 14.5 16V20M20.5 20H14.5M20.5 20H22.5" stroke="#ED8438" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    See Our Featured Gallery
                                </h5>
                                <div className="space18" />
                                <h2>Browse Our Real Estate Gallery</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <Swiper modules={[Autoplay, Thumbs]} thumbs={{ swiper: thumbsSwiper }} spaceBetween={0} autoplay={{ delay: 2500 }} freeMode={true} slidesPerView={1} data-aos="fade-left" data-aos-duration={1000} className="all-galler-images">
                                <SwiperSlide className="big-img">
                                    <img src="/assets/img/all-images/gallery/gallery-img1.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="big-img">
                                    <img src="/assets/img/all-images/gallery/gallery-img2.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="big-img">
                                    <img src="/assets/img/all-images/gallery/gallery-img3.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="big-img">
                                    <img src="/assets/img/all-images/gallery/gallery-img4.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="big-img">
                                    <img src="/assets/img/all-images/gallery/gallery-img1.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="big-img">
                                    <img src="/assets/img/all-images/gallery/gallery-img2.png" alt="housa" />
                                </SwiperSlide>
                            </Swiper>
                            <Swiper onSwiper={setThumbsSwiper} modules={[Autoplay, Thumbs]} spaceBetween={10} freeMode={true} slidesPerView={5} watchSlidesProgress={true} data-aos="fade-right" data-aos-duration={1100} className="bottom-galler-images">
                                <SwiperSlide className="small-img">
                                    <img src="/assets/img/all-images/gallery/gallery-img5.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="small-img">
                                    <img src="/assets/img/all-images/gallery/gallery-img6.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="small-img">
                                    <img src="/assets/img/all-images/gallery/gallery-img7.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="small-img">
                                    <img src="/assets/img/all-images/gallery/gallery-img8.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="small-img">
                                    <img src="/assets/img/all-images/gallery/gallery-img5.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="small-img">
                                    <img src="/assets/img/all-images/gallery/gallery-img6.png" alt="housa" />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== OTHERS AREA ENDS =======*/}
        </>
    );
}
