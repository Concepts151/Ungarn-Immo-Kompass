"use client";

import { useTranslations } from "next-intl";

export default function OurServicesHero() {
    const t = useTranslations("ServicesPage");

    return (
        <>
            <div className="space30" />
            {/*===== OUR SERVICES HERO STARTS =======*/}
            <div className="services-hero-section container-home1">
                <div className="container">
                    <div className="hero-card">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="hero-content heading1">
                                    <h5>{t("Hero_subtitle")}</h5>
                                    <div className="space16" />
                                    <h2>{t("Hero_title")}</h2>
                                    <div className="space16" />
                                    <p>{t("Hero_description")}</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="hero-image">
                                    <img
                                        src="/assets/img/all-images/others/others-img8.png"
                                        alt="Ungarn-Immo Services"
                                        className="services-image"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== OUR SERVICES HERO ENDS =======*/}

            <style jsx>{`
                .services-hero-section {
                    padding: 40px 0;
                }

                .hero-card {
                    background: #ffffff;
                    padding: 48px;
                    border-radius: 40px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                }

                .hero-content {
                    padding-right: 40px;
                }

                .services-image {
                    border-radius: 40px;
                    width: 100%;
                    height: auto;
                }

                @media (max-width: 768px) {
                    .hero-card {
                        padding: 32px 24px;
                    }

                    .hero-content {
                        padding-right: 0;
                        margin-bottom: 30px;
                    }
                }
            `}</style>
            <div className="space30" />
        </>
    );
}
