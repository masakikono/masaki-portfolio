import React from "react";
import { Camera, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center space-y-6">
        <div className="flex space-x-6 text-muted">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            <Camera className="w-5 h-5" />
            <span className="sr-only">Instagram</span>
          </a>
          <a href="https://threads.net" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span className="sr-only">Threads</span>
          </a>
        </div>
        
        <p className="text-xs tracking-widest text-[#555555] uppercase font-light">
          Designed & Built with AI
        </p>
      </div>
    </footer>
  );
};

export default Footer;
