"use client";
import InnerHeader from "@/components/layout/InnerHeader";
import PropertyFilter from "@/components/elements/property-filter";
import PropertyList3 from "@/components/elements/property-list3";
import Layout from "@/components/layout/Layout";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const swiperFade = {
    modules: [Autoplay, Pagination, Navigation],
    spaceBetween: 0,
    slidesPerView: 1,
    freeMode: true,
    watchSlidesProgress: true,
    autoplay: {
        delay: 2500,
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
export default function PropertyHalfmapList() {
    return (
        <>
            <Layout>
                <InnerHeader title="Property Half Map List" currentpage="Property Half Map List" />
                <>
                    {/*===== PROPERTY AREA STARTS =======*/}
                    <div className="property-half-grid-area sp1">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-3">
                                    <PropertyFilter />
                                </div>
                                <div className="col-lg-5">
                                    <PropertyList3 />
                                </div>
                                <div className="col-lg-4">
                                    <div className="grid-maps-area">
                                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4506257.120552435!2d88.67021924228865!3d21.954385721237916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1704088968016!5m2!1sen!2sbd" width={600} height={450} style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*===== PROPERTY AREA ENDS =======*/}
                </>
            </Layout>
        </>
    );
}
