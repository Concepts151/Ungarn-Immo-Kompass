import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const c = (await cookies()).get("UNGARN_IMMO_NEXTAPP_LOCALE")?.value || "en";
  const locale = c;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
