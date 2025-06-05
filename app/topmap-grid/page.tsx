"use client";
import InnerHeader from "@/components/layout/InnerHeader";
import { addStatus } from "@/features/filter/filterSlice";
import SearchBox from "@/components/sections/SearchBox";
import PropertyList4 from "@/components/elements/property-list4";
import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function TopmapGrid() {
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState("for-rent");

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        // You might want to update the status based on the tab
        dispatch(addStatus(tab === "for-rent" ? "For Rent" : "For Sale"));
    };
    return (
        <>
            <Layout>
                <InnerHeader title="Find Top Map Grid" currentpage="Find Top Map Grid" />

                {/*===== OTHERS AREA STARTS =======*/}
                <div className="map-grid-area">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="grid-maps-area">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d4506257.120552435!2d88.67021924228865!3d21.954385721237916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1704088968016!5m2!1sen!2sbd" width={600} height={450} style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space30" />
                <SearchBox />

                {/*===== OTHERS AREA STARTS =======*/}
                <div className="space30" />
                {/*===== PROPERTY AREA STARTS =======*/}
                <div className="property-inner-section-find">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12">
                                <PropertyList4 view="grid" />
                            </div>
                        </div>
                    </div>
                </div>
                {/*===== PROPERTY AREA ENDS =======*/}
                <div className="space30"></div>
            </Layout>
        </>
    );
}
