"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from "@/context/LanguageContext";

const Header = () => {
  const { lang, setLang, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t.nav.about, href: "/about" },
    { label: t.nav.journey, href: "/#journey" },
    { label: t.nav.bench, href: "/#bench" },
    { label: t.nav.portfolio, href: "/#portfolio" },
    { label: t.nav.work, href: "/work" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-lg tracking-widest font-semibold uppercase text-foreground z-50 relative">
          MK
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-muted hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2 text-xs font-semibold">
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

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-foreground p-2 z-50 relative"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
            {isMobileMenuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center space-y-8 h-screen w-screen px-6">
          <nav className="flex flex-col items-center space-y-8 text-xl tracking-widest uppercase mt-12">
            {navItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href} 
                className="text-foreground hover:text-muted transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4 text-sm font-semibold pt-12 border-t border-border w-1/2 justify-center">
            <button 
              onClick={() => { setLang("ja"); setIsMobileMenuOpen(false); }}
              className={`transition-colors ${lang === "ja" ? "text-foreground" : "text-muted hover:text-foreground"}`}
            >
              JP
            </button>
            <span className="text-muted">/</span>
            <button 
              onClick={() => { setLang("en"); setIsMobileMenuOpen(false); }}
              className={`transition-colors ${lang === "en" ? "text-foreground" : "text-muted hover:text-foreground"}`}
            >
              EN
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
