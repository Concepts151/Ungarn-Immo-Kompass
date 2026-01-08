"use client";

import { useState, useEffect } from "react";
import { useMessageTranslation, type SupportedLanguage } from "@/hooks/useMessageTranslation";
import { useUserLanguagePreference } from "@/hooks/useUserLanguagePreference";
import { Languages, Loader2 } from "lucide-react";

interface TranslatableMessageProps {
    text: string;
    messageId: string; // Unique ID for caching
    senderLanguage?: SupportedLanguage;
    className?: string;
}

export default function TranslatableMessage({
    text,
    messageId,
    senderLanguage,
    className = "",
}: TranslatableMessageProps) {
    const { translateMessage, isTranslating } = useMessageTranslation();
    const { preferredLanguage, autoTranslateEnabled } = useUserLanguagePreference();

    const [showOriginal, setShowOriginal] = useState(true);
    const [translatedText, setTranslatedText] = useState<string | null>(null);
    const [detectedLanguage, setDetectedLanguage] = useState<SupportedLanguage | null>(senderLanguage || null);

    const handleTranslate = async (shouldAutoShow: boolean = false) => {
        if (!text) return;

        console.log('[TranslatableMessage] handleTranslate called:', {
            text: text.substring(0, 30),
            preferredLanguage,
            shouldAutoShow
        });

        const result = await translateMessage(text, preferredLanguage);

        console.log('[TranslatableMessage] Translation result:', {
            detectedLanguage: result?.detectedLanguage,
            isTranslated: result?.isTranslated,
            translatedText: result?.translatedText?.substring(0, 30),
            shouldAutoShow
        });

        if (result) {
            setDetectedLanguage(result.detectedLanguage);
            setTranslatedText(result.translatedText);

            // If auto-translate is enabled and languages differ, show translation automatically
            if (result.isTranslated && shouldAutoShow) {
                console.log('[TranslatableMessage] Auto-showing translation');
                setShowOriginal(false);
            }
        }
    };

    // Auto-translate on mount if enabled and language differs
    // Also re-translate when preferredLanguage changes
    useEffect(() => {
        console.log('[TranslatableMessage] Auto-translate check:', {
            autoTranslateEnabled,
            text: text?.substring(0, 30),
            preferredLanguage,
            senderLanguage,
            messageId
        });

        if (autoTranslateEnabled && text && preferredLanguage) {
            // Don't translate if it's already in preferred language
            if (senderLanguage && senderLanguage === preferredLanguage) {
                console.log('[TranslatableMessage] Skipping - already in preferred language');
                return;
            }

            console.log('[TranslatableMessage] Triggering auto-translate');
            // Reset translation state and re-translate
            setTranslatedText(null);
            setShowOriginal(true);
            // Auto-translate and show translation immediately
            handleTranslate(true);
        }
    }, [text, messageId, preferredLanguage, autoTranslateEnabled]);

    const toggleTranslation = async () => {
        if (!translatedText) {
            // Translate for the first time
            await handleTranslate(false);
        }
        setShowOriginal(!showOriginal);
    };

    // Show translation UI if we've detected a different language OR if we have a translation
    const needsTranslation = (detectedLanguage && detectedLanguage !== preferredLanguage) ||
                             (translatedText && translatedText !== text);
    const hasTranslation = translatedText && translatedText !== text;

    return (
        <div className={`translatable-message ${className}`}>
            <div className="message-text">
                {showOriginal || !hasTranslation ? text : translatedText}
            </div>

            {needsTranslation && (
                <div className="translation-controls">
                    <button
                        onClick={toggleTranslation}
                        className="translate-button"
                        disabled={isTranslating}
                        title={showOriginal ? "Show translation" : "Show original"}
                    >
                        {isTranslating ? (
                            <Loader2 size={14} className="spinner" />
                        ) : (
                            <Languages size={14} />
                        )}
                        <span>
                            {showOriginal
                                ? hasTranslation
                                    ? "Show translation"
                                    : "Translate"
                                : "Show original"}
                        </span>
                    </button>
                </div>
            )}

            <style jsx>{`
                .translatable-message {
                    width: 100%;
                }

                .message-text {
                    word-wrap: break-word;
                    white-space: pre-wrap;
                }

                .translation-controls {
                    margin-top: 6px;
                }

                .translate-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 4px;
                    padding: 4px 8px;
                    background: rgba(67, 111, 77, 0.1);
                    border: 1px solid rgba(67, 111, 77, 0.2);
                    border-radius: 6px;
                    color: #436f4d;
                    font-size: 12px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .translate-button:hover:not(:disabled) {
                    background: rgba(67, 111, 77, 0.2);
                    border-color: #436f4d;
                }

                .translate-button:disabled {
                    opacity: 0.6;
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
        </div>
    );
}
