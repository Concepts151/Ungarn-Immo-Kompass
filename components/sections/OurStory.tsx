"use client";

import { useTranslations } from "next-intl";

export default function OurStory() {
    const t = useTranslations("AboutPage");
    return (
        <>
            <div className="space30" />
            {/*===== OUR STORY AREA STARTS =======*/}
            <div className="our-story-section container-home1">
                <div className="container">
                    <div className="story-card">
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="story-heading heading1">
                                    <h5>{t("OurStory_subtitle")}</h5>
                                    <div className="space16" />
                                    <h2>{t("OurStory_title")}</h2>
                                    <div className="space16" />
                                    <p>
                                        {t("OurStory_p1_part1")} <strong>{t("OurStory_p1_bold")}</strong>.{" "}
                                        {t("OurStory_p1_part2")}{" "}
                                        <span style={{ color: "#436f4d", fontWeight: "600" }}>wir-in-ungarn.hu</span>,{" "}
                                        {t("OurStory_p1_part3")}
                                    </p>
                                    <div className="space16" />
                                    <p>{t("OurStory_p2")}</p>
                                    <div className="space24" />

                                    {/* Stats boxes */}
                                    <div className="story-stats">
                                        <div className="stat-box">
                                            <h3 style={{ color: "#436f4d", marginBottom: "8px" }}>{t("OurStory_stat1_value")}</h3>
                                            <p style={{ margin: "0", fontSize: "0.9rem", color: "#6b7280" }}>{t("OurStory_stat1_label")}</p>
                                        </div>
                                        <div className="stat-box">
                                            <h3 style={{ color: "#436f4d", marginBottom: "8px" }}>{t("OurStory_stat2_value")}</h3>
                                            <p style={{ margin: "0", fontSize: "0.9rem", color: "#6b7280" }}>{t("OurStory_stat2_label")}</p>
                                        </div>
                                        <div className="stat-box">
                                            <h3 style={{ color: "#436f4d", marginBottom: "8px" }}><i className="fa-solid fa-infinity"></i></h3>
                                            <p style={{ margin: "0", fontSize: "0.9rem", color: "#6b7280" }}>{t("OurStory_stat3_label")}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="images1">
                                    <img src="/assets/img/all-images/others/others-img8.png" alt="Ungarn-Immo Story" className="story-image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*===== OUR STORY AREA ENDS =======*/}

            <style jsx>{`
                .our-story-section {
                    padding: 40px 0;
                }

                .story-card {
                    background: #ffffff;
                    padding: 48px;
                    border-radius: 40px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                }

                .story-heading {
                    padding-right: 40px;
                }

                .story-image {
                    border-radius: 40px;
                    width: 100%;
                    height: auto;
                }

                .story-stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                }

                .stat-box {
                    padding: 20px;
                    background: #f9fafb;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
                    text-align: center;
                    transition: all 0.3s ease;
                }

                .stat-box:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 4px 16px rgba(67, 111, 77, 0.15);
                    background: #ffffff;
                }

                .stat-box h3 {
                    font-size: 2rem;
                    font-weight: 700;
                }

                @media (max-width: 768px) {
                    .story-card {
                        padding: 32px 24px;
                    }

                    .story-heading {
                        padding-right: 0;
                        margin-bottom: 30px;
                    }

                    .story-stats {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
            <div className="space30" />
        </>
    );
}
