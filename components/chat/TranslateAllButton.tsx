"use client";

import { useState } from "react";
import { Languages, Loader2 } from "lucide-react";
import { useTranslateToMultipleMutation } from "@/state/api";
import { useUserLanguagePreference } from "@/hooks/useUserLanguagePreference";

interface TranslateAllButtonProps {
    onTranslateAll?: () => void;
}

export default function TranslateAllButton({ onTranslateAll }: TranslateAllButtonProps) {
    const { preferredLanguage } = useUserLanguagePreference();
    const [isTranslating, setIsTranslating] = useState(false);

    const handleClick = async () => {
        setIsTranslating(true);

        // Trigger translation of all messages
        if (onTranslateAll) {
            onTranslateAll();
        }

        // Reset after a short delay
        setTimeout(() => {
            setIsTranslating(false);
        }, 1000);
    };

    return (
        <button
            onClick={handleClick}
            className="translate-all-button"
            disabled={isTranslating}
            title="Translate all messages to your preferred language"
        >
            {isTranslating ? (
                <>
                    <Loader2 size={16} className="spinner" />
                    <span>Translating...</span>
                </>
            ) : (
                <>
                    <Languages size={16} />
                    <span>Translate All</span>
                </>
            )}

            <style jsx>{`
                .translate-all-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 14px;
                    background: linear-gradient(135deg, #436f4d 0%, #5a8f65 100%);
                    border: none;
                    border-radius: 8px;
                    color: #ffffff;
                    font-size: 13px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 8px rgba(67, 111, 77, 0.2);
                }

                .translate-all-button:hover:not(:disabled) {
                    background: linear-gradient(135deg, #5a8f65 0%, #6aa577 100%);
                    box-shadow: 0 4px 12px rgba(67, 111, 77, 0.3);
                    transform: translateY(-1px);
                }

                .translate-all-button:active:not(:disabled) {
                    transform: translateY(0);
                    box-shadow: 0 2px 6px rgba(67, 111, 77, 0.2);
                }

                .translate-all-button:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .spinner {
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </button>
    );
}
