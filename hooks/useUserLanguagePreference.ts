import { useState, useEffect, useCallback } from 'react';
import { SupportedLanguage } from './useMessageTranslation';

const LANGUAGE_PREFERENCE_KEY = 'ungarn_immo_chat_language';

export interface UseUserLanguagePreferenceReturn {
    preferredLanguage: SupportedLanguage;
    setPreferredLanguage: (lang: SupportedLanguage) => void;
    autoTranslateEnabled: boolean;
    setAutoTranslateEnabled: (enabled: boolean) => void;
}

/**
 * Hook for managing user's chat language preferences
 * Stores preferences in localStorage and syncs across components using CustomEvents
 */
export function useUserLanguagePreference(): UseUserLanguagePreferenceReturn {
    // Initialize from localStorage or browser language
    const [preferredLanguage, setPreferredLanguageState] = useState<SupportedLanguage>(() => {
        if (typeof window === 'undefined') return 'en';

        const stored = localStorage.getItem(LANGUAGE_PREFERENCE_KEY);
        if (stored && ['en', 'de', 'hu'].includes(stored)) {
            return stored as SupportedLanguage;
        }

        // Detect browser language
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('de')) return 'de';
        if (browserLang.startsWith('hu')) return 'hu';
        return 'en';
    });

    const [autoTranslateEnabled, setAutoTranslateEnabledState] = useState<boolean>(() => {
        if (typeof window === 'undefined') return true;

        const stored = localStorage.getItem(`${LANGUAGE_PREFERENCE_KEY}_auto`);
        return stored !== 'false'; // Default to true
    });

    // Listen for changes from other components
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleLangChange = (e: Event) => {
            const customEvent = e as CustomEvent<SupportedLanguage>;
            setPreferredLanguageState(customEvent.detail);
        };

        const handleAutoChange = (e: Event) => {
            const customEvent = e as CustomEvent<boolean>;
            setAutoTranslateEnabledState(customEvent.detail);
        };

        window.addEventListener('chat_lang_changed', handleLangChange);
        window.addEventListener('chat_auto_changed', handleAutoChange);

        return () => {
            window.removeEventListener('chat_lang_changed', handleLangChange);
            window.removeEventListener('chat_auto_changed', handleAutoChange);
        };
    }, []);

    const setPreferredLanguage = useCallback((lang: SupportedLanguage) => {
        setPreferredLanguageState(lang);
        if (typeof window !== 'undefined') {
            localStorage.setItem(LANGUAGE_PREFERENCE_KEY, lang);
            window.dispatchEvent(new CustomEvent('chat_lang_changed', { detail: lang }));
        }
    }, []);

    const setAutoTranslateEnabled = useCallback((enabled: boolean) => {
        setAutoTranslateEnabledState(enabled);
        if (typeof window !== 'undefined') {
            localStorage.setItem(`${LANGUAGE_PREFERENCE_KEY}_auto`, String(enabled));
            window.dispatchEvent(new CustomEvent('chat_auto_changed', { detail: enabled }));
        }
    }, []);

    return {
        preferredLanguage,
        setPreferredLanguage,
        autoTranslateEnabled,
        setAutoTranslateEnabled,
    };
}
