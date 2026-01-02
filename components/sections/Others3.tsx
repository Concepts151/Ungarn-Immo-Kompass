"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Others3() {
    const t = useTranslations("AboutPage");
    return (
        <>
            <div className="space30" />
            {/*===== OTHERS AREA STARTS =======*/}
            <div className="miision1">
                <div className="containr-fluid">
                    <div className="row">
                        <div className="col-lg-6 m-auto">
                            <div className="heading1 text-center space-margin60">
                                <h5>{t("HowWeWork_subtitle")}</h5>
                                <div className="space16" />
                                <h2>{t("HowWeWork_title")}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="images1">
                                <img src="/assets/img/all-images/others/others-img8.png" alt="housa" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="mission-heading heading1">
                                <h2>{t("FairShare_title")}</h2>
                                <div className="space16" />
                                <p>{t("FairShare_p1")}</p>
                                <div className="space16" />
                                <p>{t("FairShare_p2")}</p>
                                <div className="space32" />
                                <h3>{t("RadicalHonesty_title")}</h3>
                                <div className="space16" />
                                <p>{t("RadicalHonesty_p1")}</p>
                                <div className="space16" />
                                <p>{t("RadicalHonesty_p2")}</p>
                                <div className="space32" />
                                <div className="btn-area1">
                                    <Link href="/search" className="vl-btn1">
                                        {t("SeeAllProperties_btn")}
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
                    </div>
                </div>
            </div>
            {/*===== OTHERS AREA ENDS =======*/}
            <div className="space30" />
        </>
    );
}
