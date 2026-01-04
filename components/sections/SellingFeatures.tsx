"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

interface FeatureCardProps {
    title: string;
    shortDescription: string;
    fullDescription?: string;
    icon: string;
}

function FeatureCard({ title, shortDescription, fullDescription, icon }: FeatureCardProps) {
    const t = useTranslations("ForSellersPage");
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
                    border-radius: 20px;
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
                    border-radius: 16px;
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
                    line-height: 1.7;
                    margin: 0;
                    font-size: 1rem;
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

interface ToolCardProps {
    title: string;
    description: string;
    icon: string;
}

function ToolCard({ title, description, icon }: ToolCardProps) {
    return (
        <div className="tool-card">
            <div className="tool-icon">
                <i className={icon}></i>
            </div>
            <h4>{title}</h4>
            <p>{description}</p>

            <style jsx>{`
                .tool-card {
                    background: #f9fafb;
                    padding: 24px;
                    border-radius: 16px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
                    transition: all 0.3s ease;
                }

                .tool-card:hover {
                    background: #ffffff;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 16px rgba(67, 111, 77, 0.1);
                }

                .tool-icon {
                    width: 48px;
                    height: 48px;
                    background: linear-gradient(135deg, #436f4d 0%, #5a8f65 100%);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 16px;
                }

                .tool-icon i {
                    font-size: 22px;
                    color: #ffffff;
                }

                h4 {
                    color: #1a202c;
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin: 0 0 12px 0;
                }

                p {
                    color: #4a5568;
                    line-height: 1.6;
                    margin: 0;
                    font-size: 0.95rem;
                }
            `}</style>
        </div>
    );
}

export default function SellingFeatures() {
    const t = useTranslations("ForSellersPage");

    const features = [
        {
            title: t("Honesty_title"),
            shortDescription: t("Honesty_short"),
            fullDescription: t("Honesty_full"),
            icon: "fa-solid fa-handshake",
        },
        {
            title: t("NoCommission_title"),
            shortDescription: t("NoCommission_short"),
            fullDescription: t("NoCommission_full"),
            icon: "fa-solid fa-hand-holding-heart",
        },
        {
            title: t("Municipalities_title"),
            shortDescription: t("Municipalities_short"),
            fullDescription: t("Municipalities_full"),
            icon: "fa-solid fa-landmark",
        },
    ];

    const tools = [
        {
            title: t("Tool1_title"),
            description: t("Tool1_description"),
            icon: "fa-solid fa-wand-magic-sparkles",
        },
        {
            title: t("Tool2_title"),
            description: t("Tool2_description"),
            icon: "fa-solid fa-video",
        },
    ];

    return (
        <>
            <div className="space30" />
            {/*===== SELLING FEATURES STARTS =======*/}
            <div className="selling-features-section">
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
            {/*===== SELLING FEATURES ENDS =======*/}

            <div className="space30" />

            {/*===== TOOLS SECTION STARTS =======*/}
            <div className="tools-section">
                <div className="container">
                    <div className="tools-header heading1">
                        <h2>{t("Tools_title")}</h2>
                        <div className="space16" />
                        <p>{t("Tools_description")}</p>
                    </div>
                    <div className="space24" />
                    <div className="row g-4">
                        {tools.map((tool, index) => (
                            <div key={index} className="col-lg-6">
                                <ToolCard
                                    title={tool.title}
                                    description={tool.description}
                                    icon={tool.icon}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/*===== TOOLS SECTION ENDS =======*/}

            <style jsx>{`
                .selling-features-section {
                    padding: 40px 0;
                }

                .tools-section {
                    padding: 40px 0;
                }

                .tools-header {
                    text-align: center;
                    max-width: 700px;
                    margin: 0 auto;
                }

                .tools-header h2 {
                    color: #1a202c;
                    font-size: 2.5rem;
                    font-weight: 700;
                }

                .tools-header p {
                    color: #4a5568;
                    font-size: 1.1rem;
                    line-height: 1.7;
                }

                @media (max-width: 768px) {
                    .tools-header h2 {
                        font-size: 2rem;
                    }
                }
            `}</style>
            <div className="space30" />
        </>
    );
}
