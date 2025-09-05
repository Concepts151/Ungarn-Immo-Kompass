// components/LanguageToggle.tsx
"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { Locale } from "@/i18n/config";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";

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
    console.log(cookieLocale);

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
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "hu", name: "Magyar", flag: "🇭🇺" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
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
      <style jsx>{`
        .language-toggle {
          position: relative;
          display: inline-block;
        }

        .language-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: white;
          border: 2px solid #e1e8ed;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #333;
          transition: all 0.2s ease;
          min-width: 140px;
          justify-content: space-between;
        }

        .language-button:hover {
          border-color: #3498db;
          background-color: #f8f9fa;
        }

        .language-button:focus {
          outline: none;
          border-color: #3498db;
          box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
        }

        .language-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .language-flag {
          font-size: 18px;
        }

        .chevron {
          width: 16px;
          height: 16px;
          transition: transform 0.2s ease;
        }

        .chevron.open {
          transform: rotate(180deg);
        }

        .language-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 4px;
          background: white;
          border: 2px solid #e1e8ed;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          min-width: 140px;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.2s ease;
        }

        .language-dropdown.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .language-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          cursor: pointer;
          transition: background-color 0.15s ease;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-size: 14px;
          color: #333;
        }

        .language-option:hover {
          background-color: #f8f9fa;
        }

        .language-option.active {
          background-color: #e3f2fd;
          color: #1976d2;
          font-weight: 500;
        }

        .language-option:first-child {
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
        }

        .language-option:last-child {
          border-bottom-left-radius: 6px;
          border-bottom-right-radius: 6px;
        }

        .active-indicator {
          width: 8px;
          height: 8px;
          background-color: #1976d2;
          border-radius: 50%;
          margin-left: auto;
        }

        @media (max-width: 768px) {
          .language-button {
            min-width: 120px;
            font-size: 13px;
          }
        }
      `}</style>

      <div className="language-toggle">
        <button
          className="language-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={t("label")}
        >
          <div className="language-info">
            <span className="language-flag">{currentLang.flag}</span>
            <span>{currentLang.name}</span>
          </div>
          <svg
            className={`chevron ${isOpen ? "open" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6,9 12,15 18,9" />
          </svg>
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
              <span className="language-flag">{lang.flag}</span>
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

