"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from "@/context/LanguageContext";

const Header = () => {
  const { lang, setLang, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: t.nav.about, href: "/about" },
    { label: t.nav.journey, href: "/journey" },
    { label: t.nav.bench, href: "/bench" },
    { label: t.nav.portfolio, href: "/portfolio" },
    { label: t.nav.products as string, href: "/products" },
    { label: t.nav.insights as string, href: "/insights" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300 print:hidden">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6 z-50 relative">
          <Link href="/" className="text-lg tracking-widest font-semibold uppercase text-foreground font-serif">
            MK
          </Link>
          
          <div className="hidden sm:flex items-center space-x-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm cursor-pointer hover:bg-white/10 transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] tracking-widest uppercase font-medium text-emerald-400/90">
              Available
            </span>
          </div>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="text-muted hover:text-foreground transition-colors hover:-translate-y-0.5 transform duration-300">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2 text-xs font-semibold z-50 relative">
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
