"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

interface StepCardProps {
    stepNumber: number;
    title: string;
    shortDescription: string;
    fullDescription: string;
    icon: string;
}

function StepCard({ stepNumber, title, shortDescription, fullDescription, icon }: StepCardProps) {
    const t = useTranslations("ForBuyersPage");
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="step-card">
            <div className="step-header">
                <div className="step-number">{stepNumber}</div>
                <div className="step-icon">
                    <i className={icon}></i>
                </div>
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
                .step-card {
                    background: #ffffff;
                    padding: 32px;
                    border-radius: 20px;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
                    height: 100%;
                    transition: all 0.3s ease;
                    border-left: 4px solid #436f4d;
                }

                .step-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 24px rgba(67, 111, 77, 0.15);
                }

                .step-header {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 20px;
                }

                .step-number {
                    width: 48px;
                    height: 48px;
                    background: linear-gradient(135deg, #436f4d 0%, #5a8f65 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #ffffff;
                    font-size: 1.5rem;
                    font-weight: 700;
                }

                .step-icon {
                    width: 48px;
                    height: 48px;
                    background: #f0f7f4;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .step-icon i {
                    font-size: 24px;
                    color: #436f4d;
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

export default function BuyingSteps() {
    const t = useTranslations("ForBuyersPage");

    const steps = [
        {
            title: t("Step1_title"),
            shortDescription: t("Step1_short"),
            fullDescription: t("Step1_full"),
            icon: "fa-solid fa-filter",
        },
        {
            title: t("Step2_title"),
            shortDescription: t("Step2_short"),
            fullDescription: t("Step2_full"),
            icon: "fa-solid fa-video",
        },
        {
            title: t("Step3_title"),
            shortDescription: t("Step3_short"),
            fullDescription: t("Step3_full"),
            icon: "fa-solid fa-gavel",
        },
        {
            title: t("Step4_title"),
            shortDescription: t("Step4_short"),
            fullDescription: t("Step4_full"),
            icon: "fa-solid fa-handshake",
        },
    ];

    return (
        <>
            <div className="space30" />
            {/*===== BUYING STEPS STARTS =======*/}
            <div className="buying-steps-section">
                <div className="container">
                    <div className="row g-4">
                        {steps.map((step, index) => (
                            <div key={index} className="col-lg-6">
                                <StepCard
                                    stepNumber={index + 1}
                                    title={step.title}
                                    shortDescription={step.shortDescription}
                                    fullDescription={step.fullDescription}
                                    icon={step.icon}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/*===== BUYING STEPS ENDS =======*/}

            <style jsx>{`
                .buying-steps-section {
                    padding: 40px 0;
                }
            `}</style>
            <div className="space30" />
        </>
    );
}
