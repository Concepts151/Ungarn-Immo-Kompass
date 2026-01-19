"use client";

import Link from "next/link";
import { useCmsContent } from "@/hooks/useCmsContent";

// Fallback messages for when CMS is unavailable
const fallbackMessages: Record<string, string> = {
    HowWeWork_subtitle: "How We Work",
    HowWeWork_title: "How We Are Different",
    FairShare_title: "Fair-Share Principle",
    FairShare_p1: "We decided to flip the script. Instead of high brokerage commissions that often reach 3-5% plus VAT, we operate on a Fair-Share Principle.",
    FairShare_p2: "We do not charge traditional commissions. Instead, both the buyer and seller contribute a 0.5% donation (1% total), but covered by a maximum, to a local Hungarian social project. This ensures that every transaction leaves a positive footprint in your new home.",
    RadicalHonesty_title: "Radical Honesty as a Standard",
    RadicalHonesty_p1: "We believe that a new life in a new country must start with the truth. That's why we require every seller to provide unedited video tours of the house and the surrounding village.",
    RadicalHonesty_p2: "Our platform uses AI to translate communication in real-time, bridging the gap between local sellers and international buyers. We don't just sell houses; we provide the context of the village—the social structure, the infrastructure, and the feeling of the community.",
    SeeAllProperties_btn: "See All Properties",
};

export default function Others3() {
    const { t } = useCmsContent({ pageKey: "AboutPage", fallbackMessages });
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
