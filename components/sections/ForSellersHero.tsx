"use client";

import { useTranslations } from "next-intl";

export default function ForSellersHero() {
    const t = useTranslations("ForSellersPage");

    return (
        <>
            <div className="space30" />
            {/*===== FOR SELLERS HERO STARTS =======*/}
            <div className="sellers-hero-section container-home1">
                <div className="container">
                    <div className="hero-card">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="hero-content heading1">
                                    <h2>{t("Hero_title")}</h2>
                                    <div className="space16" />
                                    <p>{t("Hero_description")}</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="hero-image">
                                    <img
                                        src="https://images.pexels.com/photos/7641825/pexels-photo-7641825.jpeg"
                                        alt="For Sellers"
                                        className="sellers-image"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== FOR SELLERS HERO ENDS =======*/}

            <style jsx>{`
                .sellers-hero-section {
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

                .sellers-image {
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
