"use client";

import Link from "next/link";
import { useCmsContent } from "@/hooks/useCmsContent";

// Fallback messages for when CMS is unavailable
const fallbackMessages: Record<string, string> = {
    OurSupport_subtitle: "Our Support",
    OurSupport_title: "A Technical Companion for Your Move",
    TechMeetsHuman_title: "Technology Meets Human Experience",
    TechMeetsHuman_p1: "By combining human experience with advanced technology, we ensure your move is safe. From AI-driven document preparation to a vetted network of partners, we are here to support you every step of the way.",
    TechMeetsHuman_p2: "We are the \"helpful team from next door,\" using modern tools to bring people together fairly.",
    UneditedTours_title: "Unedited Video Tours",
    UneditedTours_description: "Every property includes authentic video tours showing the house and surrounding village exactly as they are.",
    AITranslation_title: "Real-Time AI Translation",
    AITranslation_description: "Our platform breaks down language barriers, connecting international buyers with local sellers seamlessly.",
    VillageContext_title: "Complete Village Context",
    VillageContext_description: "We provide insights into the social structure, infrastructure, and community feeling of each location.",
    ContactUs_btn: "Contact Us",
};

export default function Others4() {
    const { t } = useCmsContent({ pageKey: "AboutPage", fallbackMessages });
    return (
        <>
            {/*===== OTHERS AREA STARTS =======*/}
            <div className="choose1">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-5 m-auto">
                            <div className="heading1 text-center space-margin60">
                                <h5>{t("OurSupport_subtitle")}</h5>
                                <div className="space16" />
                                <h2>{t("OurSupport_title")}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="choose-heading heading1">
                                <h2>{t("TechMeetsHuman_title")}</h2>
                                <div className="space16" />
                                <p>{t("TechMeetsHuman_p1")}</p>
                                <div className="space16" />
                                <p>{t("TechMeetsHuman_p2")}</p>
                                <div className="space24" />
                                <div className="choose-box">
                                    <Link href="/search">{t("UneditedTours_title")}</Link>
                                    <div className="space16" />
                                    <p>{t("UneditedTours_description")}</p>
                                </div>
                                <div className="space24" />
                                <div className="choose-box">
                                    <Link href="/search">{t("AITranslation_title")}</Link>
                                    <div className="space16" />
                                    <p>{t("AITranslation_description")}</p>
                                </div>
                                <div className="space24" />
                                <div className="choose-box">
                                    <Link href="/search">{t("VillageContext_title")}</Link>
                                    <div className="space16" />
                                    <p>{t("VillageContext_description")}</p>
                                </div>
                                <div className="space32" />
                                <div className="btn-area1">
                                    <Link href="/contact" className="vl-btn1">
                                        {t("ContactUs_btn")}
                                        <span className="arrow1 ms-2">
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                        <span className="arrow2 ms-2">
                                            <i className="fa-solid fa-arrow-right" />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="chosse-images">
                                <img src="/assets/img/elements/elements8.png" alt="housa" className="elements8" />
                                <div className="img1 text-end">
                                    <img src="/assets/img/all-images/others/others-img9.png" alt="housa" />
                                </div>
                                <div className="img2">
                                    <img src="/assets/img/all-images/others/others-img10.png" alt="housa" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== OTHERS AREA ENDS =======*/}
            <div className="space30" />
        </>
    );
}
