import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { locales, defaultLocale, type Locale } from "./config";

export default getRequestConfig(async () => {
  let locale: Locale = defaultLocale;

  try {
    const cookieStore = await cookies();
    const cookieValue = cookieStore.get("UNGARN_IMMO_NEXTAPP_LOCALE")?.value;

    // console.log('[i18n/request] Cookie value:', cookieValue);
    // console.log('[i18n/request] All cookies:', cookieStore.getAll().map(c => `${c.name}=${c.value}`));

    // Strictly validate the locale - must be one of our supported locales
    if (cookieValue && locales.includes(cookieValue as Locale)) {
      locale = cookieValue as Locale;
      // console.log('[i18n/request] ✅ Locale set to:', locale);
    } else {
      // console.log('[i18n/request] ⚠️ Using default locale:', defaultLocale);
    }
  } catch (error) {
    console.error("Error reading locale cookie:", error);
    // Continue with default locale
  }

  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    return { locale, messages };
  } catch (error) {
    console.error(`Failed to load messages for locale "${locale}":`, error);

    // Fallback to English if the locale file fails to load
    if (locale !== "en") {
      try {
        const fallbackMessages = (await import(`../messages/en.json`)).default;
        return { locale: "en" as Locale, messages: fallbackMessages };
      } catch (fallbackError) {
        console.error("Failed to load fallback English messages:", fallbackError);
      }
    }

    // Last resort - return empty messages
    return { locale: "en" as Locale, messages: {} };
  }
});