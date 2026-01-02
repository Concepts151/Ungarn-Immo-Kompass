export type Locale = (typeof locales)[number];
export const locales = ["en", "hu", "de"] as const;
export const defaultLocale: Locale = "en";
