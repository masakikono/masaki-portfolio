"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const NoteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M15.42 2.65a4.2 4.2 0 0 0-4.08 6.06l-.54.34c-1.32.83-2.12 2.3-2.12 3.88v6.2c0 .66.52 1.19 1.16 1.19h.3v1.38H7.55v-1.38h.3c.64 0 1.16-.53 1.16-1.19v-6.2c0-.98.5-1.89 1.33-2.4l1.32-.82A4.2 4.2 0 1 0 15.42 2.65zm0 6.64a2.44 2.44 0 1 1 2.44-2.44 2.44 2.44 0 0 1-2.44 2.44z" />
  </svg>
);

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="py-12 border-t border-border mt-24 print:hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center space-y-6">
        <div className="flex space-x-6 text-muted items-center">
          <a href="https://www.instagram.com/masaki_kono_3.0/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            <InstagramIcon className="w-5 h-5" />
            <span className="sr-only">Instagram</span>
          </a>
          <a href="https://www.linkedin.com/in/masakikono19931015/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            <LinkedInIcon className="w-5 h-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="https://github.com/masakikono" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="sr-only">GitHub</span>
          </a>
          <a href="https://note.com/masaki_19931015" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            <NoteIcon className="w-5 h-5" />
            <span className="sr-only">Note</span>
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
