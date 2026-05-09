"use client";

import { SupportedLanguage } from "@/hooks/useMessageTranslation";
import { useUserLanguagePreference } from "@/hooks/useUserLanguagePreference";
import { Globe, Check } from "lucide-react";
import { useState } from "react";

const LANGUAGES = [
    { code: "en" as SupportedLanguage, name: "English", flag: "🇬🇧" },
    { code: "de" as SupportedLanguage, name: "Deutsch", flag: "🇩🇪" },
    { code: "hu" as SupportedLanguage, name: "Magyar", flag: "🇭🇺" },
];

export default function LanguageSelector() {
    const { preferredLanguage, setPreferredLanguage, autoTranslateEnabled, setAutoTranslateEnabled } =
        useUserLanguagePreference();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="language-selector">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="language-button"
                title="Select chat language"
            >
                <Globe size={18} />
                <span className="current-lang">
                    {LANGUAGES.find((l) => l.code === preferredLanguage)?.flag || "🌐"}
                </span>
            </button>

            {isOpen && (
                <>
                    <div className="overlay" onClick={() => setIsOpen(false)} />
                    <div className="language-menu">
                        <div className="menu-header">
                            <h4>Chat Language</h4>
                        </div>

                        <div className="language-list">
                            {LANGUAGES.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setPreferredLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    className={`language-item ${preferredLanguage === lang.code ? "active" : ""}`}
                                >
                                    <span className="lang-flag">{lang.flag}</span>
                                    <span className="lang-name">{lang.name}</span>
                                    {preferredLanguage === lang.code && (
                                        <Check size={16} className="check-icon" />
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className="auto-translate-toggle">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={autoTranslateEnabled}
                                    onChange={(e) => setAutoTranslateEnabled(e.target.checked)}
                                />
                                <span>Auto-translate messages</span>
                            </label>
                            <p className="toggle-description">
                                Automatically translate incoming messages to your preferred language
                            </p>
                        </div>
                    </div>
                </>
            )}

            <style jsx>{`
                .language-selector {
                    position: relative;
                }

                .language-button {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 10px;
                    background: #f0f7f4;
                    border: 1px solid #d0e5d8;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    color: #436f4d;
                    font-size: 14px;
                }

                .language-button:hover {
                    background: #e0f0e8;
                    border-color: #436f4d;
                }

                .current-lang {
                    font-size: 16px;
                }

                .overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: transparent;
                    z-index: 999;
                }

                .language-menu {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    margin-top: 8px;
                    background: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
                    min-width: 250px;
                    z-index: 1000;
                    overflow: hidden;
                }

                .menu-header {
                    padding: 16px;
                    border-bottom: 1px solid #e5e7eb;
                    background: #f9fafb;
                }

                .menu-header h4 {
                    margin: 0;
                    font-size: 14px;
                    font-weight: 600;
                    color: #1a202c;
                }

                .language-list {
                    padding: 8px 0;
                }

                .language-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    width: 100%;
                    padding: 12px 16px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    transition: background 0.2s ease;
                    text-align: left;
                }

                .language-item:hover {
                    background: #f9fafb;
                }

                .language-item.active {
                    background: #f0f7f4;
                    color: #436f4d;
                    font-weight: 500;
                }

                .lang-flag {
                    font-size: 20px;
                }

                .lang-name {
                    flex: 1;
                    font-size: 14px;
                }

                .check-icon {
                    color: #436f4d;
                }

                .auto-translate-toggle {
                    padding: 16px;
                    border-top: 1px solid #e5e7eb;
                    background: #f9fafb;
                }

                .auto-translate-toggle label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    font-size: 14px;
                    color: #1a202c;
                    font-weight: 500;
                }

                .auto-translate-toggle input[type="checkbox"] {
                    width: 16px;
                    height: 16px;
                    cursor: pointer;
                    accent-color: #436f4d;
                }

                .toggle-description {
                    margin: 8px 0 0 24px;
                    font-size: 12px;
                    color: #6b7280;
                    line-height: 1.4;
                }

                @media (max-width: 768px) {
                    .language-menu {
                        position: fixed;
                        top: auto;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        margin: 0;
                        border-radius: 16px 16px 0 0;
                        max-width: 100%;
                    }
                }
            `}</style>
        </div>
    );
}
