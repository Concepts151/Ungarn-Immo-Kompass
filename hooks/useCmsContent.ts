"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

interface UseCmsContentOptions {
  pageKey: string;
  fallbackMessages?: Record<string, string>;
}

interface CmsContentResult {
  content: Record<string, string>;
  isLoading: boolean;
  error: string | null;
  t: (key: string) => string;
}

/**
 * Hook to fetch CMS content for a page with fallback to static messages
 *
 * Usage:
 * const { t, isLoading } = useCmsContent({
 *   pageKey: "AboutPage",
 *   fallbackMessages: staticMessages
 * });
 *
 * Then use: t("OurStory_title")
 */
export function useCmsContent({
  pageKey,
  fallbackMessages = {},
}: UseCmsContentOptions): CmsContentResult {
  const locale = useLocale();
  const [content, setContent] = useState<Record<string, string>>(fallbackMessages);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005";
        const response = await fetch(`${apiUrl}/content/${pageKey}?lang=${locale}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status}`);
        }

        const data = await response.json();

        // Merge CMS content with fallback (CMS takes priority)
        if (data && Object.keys(data).length > 0) {
          setContent((prev) => ({
            ...prev,
            ...data,
          }));
        }
      } catch (err: any) {
        console.warn(`CMS content fetch failed for ${pageKey}, using fallback:`, err.message);
        setError(err.message);
        // Keep using fallback messages on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [pageKey, locale]);

  // Translation function with fallback
  const t = (key: string): string => {
    return content[key] || fallbackMessages[key] || key;
  };

  return {
    content,
    isLoading,
    error,
    t,
  };
}

/**
 * Server-side function to fetch CMS content
 * Use this in Server Components with getTranslations fallback
 */
export async function fetchCmsContent(
  pageKey: string,
  locale: string
): Promise<Record<string, string>> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005";
    const response = await fetch(`${apiUrl}/content/${pageKey}?lang=${locale}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!response.ok) {
      return {};
    }

    return await response.json();
  } catch (error) {
    console.warn(`Failed to fetch CMS content for ${pageKey}:`, error);
    return {};
  }
}
