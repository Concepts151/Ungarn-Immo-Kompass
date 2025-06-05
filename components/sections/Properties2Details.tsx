"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs } from "swiper/modules";
import SwiperCore from "swiper";

export default function Properties2Details() {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);

    return (
        <>
            {/*===== PROPERTIES AREA STARTS =======*/}
            <div className="properties2-others sp1">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <Swiper modules={[Autoplay, Thumbs]} thumbs={{ swiper: thumbsSwiper }} spaceBetween={0} autoplay={{ delay: 2500 }} freeMode={true} slidesPerView={1} className="all-galler-images" data-aos="fade-left" data-aos-duration={1000}>
                                <SwiperSlide className="big-img">
                                    <img src="/assets/img/all-images/properties/property-img7.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="big-img">
                                    <img src="/assets/img/all-images/properties/property-img8.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="big-img">
                                    <img src="/assets/img/all-images/properties/property-img9.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="big-img">
                                    <img src="/assets/img/all-images/properties/property-img7.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="big-img">
                                    <img src="/assets/img/all-images/properties/property-img8.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="big-img">
                                    <img src="/assets/img/all-images/properties/property-img9.png" alt="housa" />
                                </SwiperSlide>
                            </Swiper>
                            <Swiper onSwiper={setThumbsSwiper} modules={[Thumbs]} spaceBetween={10} freeMode={true} slidesPerView={5} watchSlidesProgress={true} className="bottom-galler-images" data-aos="fade-right" data-aos-duration={1100}>
                                <SwiperSlide className="small-img">
                                    <img src="/assets/img/all-images/properties/property-img10.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="small-img">
                                    <img src="/assets/img/all-images/properties/property-img11.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="small-img">
                                    <img src="/assets/img/all-images/properties/property-img12.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="small-img">
                                    <img src="/assets/img/all-images/properties/property-img10.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="small-img">
                                    <img src="/assets/img/all-images/properties/property-img11.png" alt="housa" />
                                </SwiperSlide>
                                <SwiperSlide className="small-img">
                                    <img src="/assets/img/all-images/properties/property-img12.png" alt="housa" />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== PROPERTIES AREA ENDS =======*/}
        </>
    );
}
