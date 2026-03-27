"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="py-12 border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center space-y-6">
        <div className="flex space-x-6 text-muted">
          <a href="https://www.instagram.com/masaki_kono_3.0/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            <InstagramIcon className="w-5 h-5" />
            <span className="sr-only">Instagram</span>
          </a>
          <a href="https://www.linkedin.com/in/masakikono19931015/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            <LinkedInIcon className="w-5 h-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
        
        <p className="text-xs tracking-widest text-[#555555] uppercase font-light">
          {t.footer.builtWith}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
