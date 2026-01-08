import { useState, useCallback, useEffect } from 'react';
import { useTranslateMessageMutation } from '@/state/api';

export type SupportedLanguage = 'en' | 'de' | 'hu';

export interface TranslatedMessage {
    originalText: string;
    translatedText: string;
    detectedLanguage: SupportedLanguage;
    targetLanguage: SupportedLanguage;
    isTranslated: boolean;
}

interface UseMessageTranslationReturn {
    translateMessage: (text: string, targetLanguage: SupportedLanguage) => Promise<TranslatedMessage | null>;
    translatedMessages: Map<string, TranslatedMessage>;
    isTranslating: boolean;
    error: string | null;
    clearTranslations: () => void;
}

/**
 * Hook for translating Matrix chat messages
 * Caches translations to avoid redundant API calls
 */
export function useMessageTranslation(): UseMessageTranslationReturn {
    const [translateMutation, { isLoading }] = useTranslateMessageMutation();
    const [translatedMessages, setTranslatedMessages] = useState<Map<string, TranslatedMessage>>(new Map());
    const [error, setError] = useState<string | null>(null);

    // Generate cache key from message text and target language
    const getCacheKey = useCallback((text: string, targetLang: SupportedLanguage): string => {
        return `${targetLang}:${text.trim().toLowerCase()}`;
    }, []);

    // Translate a message
    const translateMessage = useCallback(
        async (text: string, targetLanguage: SupportedLanguage): Promise<TranslatedMessage | null> => {
            if (!text || !text.trim()) {
                return null;
            }

            // Check cache first
            const cacheKey = getCacheKey(text, targetLanguage);
            const cached = translatedMessages.get(cacheKey);
            if (cached) {
                return cached;
            }

            try {
                setError(null);

                const response = await translateMutation({
                    text,
                    targetLanguage,
                }).unwrap();

                if (response.success && response.data) {
                    const translated: TranslatedMessage = {
                        originalText: response.data.originalText,
                        translatedText: response.data.translatedText,
                        detectedLanguage: response.data.detectedLanguage as SupportedLanguage,
                        targetLanguage: response.data.targetLanguage as SupportedLanguage,
                        isTranslated: response.data.detectedLanguage !== response.data.targetLanguage,
                    };

                    // Cache the translation
                    setTranslatedMessages((prev) => {
                        const newMap = new Map(prev);
                        newMap.set(cacheKey, translated);
                        return newMap;
                    });

                    return translated;
                }

                throw new Error('Translation failed');
            } catch (err: any) {
                const errorMessage = err?.data?.error || err?.message || 'Translation failed';
                setError(errorMessage);
                console.error('Translation error:', err);

                // Return original text as fallback
                return {
                    originalText: text,
                    translatedText: text,
                    detectedLanguage: 'en',
                    targetLanguage,
                    isTranslated: false,
                };
            }
        },
        [translateMutation, translatedMessages, getCacheKey]
    );

    // Clear all cached translations
    const clearTranslations = useCallback(() => {
        setTranslatedMessages(new Map());
        setError(null);
    }, []);

    return {
        translateMessage,
        translatedMessages,
        isTranslating: isLoading,
        error,
        clearTranslations,
    };
}
