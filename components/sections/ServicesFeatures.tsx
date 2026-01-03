"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

interface FeatureCardProps {
    title: string;
    shortDescription: string;
    fullDescription: string;
    icon: string;
}

function FeatureCard({ title, shortDescription, fullDescription, icon }: FeatureCardProps) {
    const t = useTranslations("ServicesPage");
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="feature-card">
            <div className="feature-icon">
                <i className={icon}></i>
            </div>
            <h3>{title}</h3>
            <div className="space16" />
            <p>
                {shortDescription}
                {fullDescription && (
                    <>
                        {isExpanded && <span> {fullDescription}</span>}
                    </>
                )}
            </p>
            {fullDescription && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="read-more-btn"
                >
                    {isExpanded ? t("ShowLess_btn") : t("ReadMore_btn")}
                </button>
            )}

            <style jsx>{`
                .feature-card {
                    background: #ffffff;
                    padding: 32px;
                    border-radius: 16px;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
                    height: 100%;
                    transition: all 0.3s ease;
                }

                .feature-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 24px rgba(67, 111, 77, 0.15);
                }

                .feature-icon {
                    width: 64px;
                    height: 64px;
                    background: linear-gradient(135deg, #436f4d 0%, #5a8f65 100%);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;
                }

                .feature-icon i {
                    font-size: 28px;
                    color: #ffffff;
                }

                h3 {
                    color: #1a202c;
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin: 0;
                }

                p {
                    color: #4a5568;
                    line-height: 1.6;
                    margin: 0;
                }

                .read-more-btn {
                    background: none;
                    border: none;
                    color: #436f4d;
                    font-weight: 600;
                    cursor: pointer;
                    padding: 0;
                    margin-top: 12px;
                    text-decoration: underline;
                    font-size: 0.95rem;
                    transition: color 0.2s ease;
                }

                .read-more-btn:hover {
                    color: #5a8f65;
                }
            `}</style>
        </div>
    );
}

export default function ServicesFeatures() {
    const t = useTranslations("ServicesPage");

    const features = [
        {
            title: t("TranslationChat_title"),
            shortDescription: t("TranslationChat_short"),
            fullDescription: t("TranslationChat_full"),
            icon: "fa-solid fa-language",
        },
        {
            title: t("PartnerNetwork_title"),
            shortDescription: t("PartnerNetwork_short"),
            fullDescription: t("PartnerNetwork_full"),
            icon: "fa-solid fa-users",
        },
        {
            title: t("VillagePortraits_title"),
            shortDescription: t("VillagePortraits_short"),
            fullDescription: t("VillagePortraits_full"),
            icon: "fa-solid fa-video",
        },
        {
            title: t("FairShare_title"),
            shortDescription: t("FairShare_short"),
            fullDescription: t("FairShare_full"),
            icon: "fa-solid fa-hand-holding-heart",
        },
        {
            title: t("AIAssistant_title"),
            shortDescription: t("AIAssistant_short"),
            fullDescription: t("AIAssistant_full"),
            icon: "fa-solid fa-robot",
        },
    ];

    return (
        <>
            <div className="space30" />
            {/*===== SERVICES FEATURES STARTS =======*/}
            <div className="services-features-section">
                <div className="container">
                    <div className="row g-4">
                        {features.map((feature, index) => (
                            <div key={index} className="col-lg-6">
                                <FeatureCard
                                    title={feature.title}
                                    shortDescription={feature.shortDescription}
                                    fullDescription={feature.fullDescription}
                                    icon={feature.icon}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/*===== SERVICES FEATURES ENDS =======*/}

            <style jsx>{`
                .services-features-section {
                    padding: 40px 0;
                }
            `}</style>
            <div className="space30" />
        </>
    );
}
