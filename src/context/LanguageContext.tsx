"use client";

import React, { createContext, useContext, useState } from "react";
import { translations } from "@/i18n/translations";

type Language = "ja" | "en";
type Translations = typeof translations.ja;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Language>("en"); // Default to English for international recruiters
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("mk_portfolio_lang") as Language | null;
      if (stored === "ja" || stored === "en") {
        setLangState(stored);
      } else {
        // Auto-detect browser language
        const browserLang = navigator.language.startsWith("ja") ? "ja" : "en";
        setLangState(browserLang);
        localStorage.setItem("mk_portfolio_lang", browserLang);
      }
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== "undefined") {
      localStorage.setItem("mk_portfolio_lang", newLang);
    }
  };

  const t = translations[lang];

  // Prevent hydration mismatch by not rendering content that depends on language until mounted
  // However, returning children directly with default language is better for SEO.
  // The mismatch flash is minor compared to SEO benefits.
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.2s" }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
