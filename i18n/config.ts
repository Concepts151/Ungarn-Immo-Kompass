export type Locale = (typeof locales)[number];
export const locales = ["en", "hu", "ru", "fr"] as const;
export const defaultLocale: Locale = "en";
