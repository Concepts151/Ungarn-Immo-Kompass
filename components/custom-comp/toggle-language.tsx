// components/LanguageToggle.tsx
"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Locale } from "@/i18n/config";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import "./toggle-language.css";

interface LanguageOption {
  code: Locale;
  name: string;
  flag: string;
}

interface LanguageToggleProps {
  currentLocale?: Locale;
  onLanguageChange?: (locale: Locale) => void;
}
export default function LanguageToggle({
  currentLocale,
  onLanguageChange,
}: LanguageToggleProps) {
  const t = useTranslations("localeSwitcher");
  const [isOpen, setIsOpen] = useState(false);
  const [locale, setLocale] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("UNGARN_IMMO_NEXTAPP_LOCALE="))
      ?.split("=")[1];
    console.log("cookie:", cookieLocale);

    if (cookieLocale) {
      setLocale(cookieLocale);
    } else {
      const browserLang = navigator.language.slice(0, 2);
      setLocale(browserLang);
      document.cookie = `UNGARN_IMMO_NEXTAPP_LOCALE=${browserLang};`;
      router.refresh();
    }
  }, [router]);

  const languages: LanguageOption[] = [
    { code: "en", name: "English", flag: "/assets/img/EN.png" },
    { code: "hu", name: "Magyar", flag: "/assets/img/HU.png" },
    { code: "de", name: "Deutsch", flag: "/assets/img/DE.png" },
    // { code: "fr", name: "Français", flag: "🇫🇷" },
  ];

  const lang = useLocale();

  const currentLang =
    languages.find((lang) => lang.code === locale) || languages[0];

  const handleLanguageChange = (locale: Locale) => {
    // Store in localStorage for persistence
    if (typeof window !== "undefined") {
      //   localStorage.setItem("preferred-locale", locale);
      setLocale(locale);
      document.cookie = `UNGARN_IMMO_NEXTAPP_LOCALE=${locale};`;
    }

    console.log(locale);

    // Optional callback
    // onLanguageChange?.(locale);
    setIsOpen(false);
    router.refresh();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".language-toggle")) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <>
      <div className="language-toggle">
        <button
          className="language-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={t("label")}
        >
          <div className="language-info">
            <span className="language-flag">
              <img
                src={currentLang.flag}
                alt={`${currentLang.name} flag`}
                style={{ width: "35px", height: "35px" }}
              />
            </span>
            {/* <span>{currentLang.name}</span> */}
          </div>
          {/* <svg
            className={`chevron ${isOpen ? "open" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6,9 12,15 18,9" />
          </svg> */}
        </button>

        <div
          className={`language-dropdown ${isOpen ? "open" : ""}`}
          role="listbox"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${
                currentLocale === lang.code ? "active" : ""
              }`}
              onClick={() => handleLanguageChange(lang.code)}
              role="option"
              aria-selected={currentLocale === lang.code}
            >
              <span className="language-flag">
                <img
                  src={lang.flag}
                  alt={`${lang.name} flag`}
                  style={{ width: "30px", height: "30px" }}
                />
              </span>
              <span>{lang.name}</span>
              {currentLocale === lang.code && (
                <div className="active-indicator" />
              )}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
