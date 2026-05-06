"use client";

import React from "react";
import { motion } from "framer-motion";
import { Activity as ActivityIcon } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const Activity = () => {
  return (
    <div className="w-full max-w-full min-w-0 overflow-hidden mt-24 pt-16 border-t border-white/5 relative">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-[#daa520]/10 rounded-lg">
          <ActivityIcon className="w-5 h-5 text-[#daa520]" />
        </div>
        <h3 className="text-sm font-semibold tracking-[0.2em] uppercase text-white">Daily Output</h3>
      </div>
      
      <p className="text-sm font-light text-neutral-400 mb-10 leading-relaxed max-w-3xl">
        Consistent execution transforms raw ambition into tangible value. Below is a real-time visualization of my engineering and documentation output across GitHub over the past year.
      </p>

      {/* GitHub Contributions SVG from ghchart API */}
      <motion.div 
        className="w-full overflow-x-auto bg-[#0a1525]/40 border border-white/5 rounded-2xl p-6 backdrop-blur-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex justify-center w-full">
          {/* using ghchart public API with custom gold color */}
          <div className="relative w-full opacity-80 hover:opacity-100 transition-opacity flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://ghchart.rshah.org/216e39/masakikono" 
              alt="Masaki Kono's GitHub Contributions" 
              className="w-full h-auto max-w-[800px] filter drop-shadow-md mix-blend-screen"
            />
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-500 font-mono tracking-widest uppercase">
          <a href="https://github.com/masakikono" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#daa520] transition-colors">
            <GithubIcon className="w-3 h-3" />
            @masakikono
          </a>
          <span>Real-time API Sync</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Activity;
