"use client";

import React from 'react';
import { useLanguage } from "@/context/LanguageContext";

const Header = () => {
  const { lang, setLang, t } = useLanguage();

  const navItems = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.portfolio, href: "#portfolio" },
    { label: t.nav.work, href: "#work" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="text-lg tracking-widest font-semibold uppercase text-foreground">MK</a>
        
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
          {navItems.map((item) => (
            <a key={item.label} href={item.href} className="text-muted hover:text-foreground transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-2 text-xs font-semibold">
          <button 
            onClick={() => setLang("ja")}
            className={`transition-colors ${lang === "ja" ? "text-foreground" : "text-muted hover:text-foreground"}`}
          >
            JP
          </button>
          <span className="text-muted">/</span>
          <button 
            onClick={() => setLang("en")}
            className={`transition-colors ${lang === "en" ? "text-foreground" : "text-muted hover:text-foreground"}`}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
