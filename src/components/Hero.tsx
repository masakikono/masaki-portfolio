// @ts-nocheck
/* eslint-disable */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";


const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/images/Iceland.jpg')",
          backgroundPosition: "center 40%" // Adjust framing if necessary
        }}
      >
        {/* Overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a15] via-[#050a15]/80 to-[#050a15]/60"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center px-4">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-8xl font-light tracking-widest text-white mb-6 uppercase"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} // smooth, premium ease
        >
          {t.hero.title}
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl font-light tracking-widest text-[#dddddd] uppercase"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.hero.subtitle}
        </motion.p>
      </div>

      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer z-20 group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.2, ease: "easeInOut" }}
        onClick={() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-xs tracking-widest font-medium uppercase mb-2 text-white/50 group-hover:text-white transition-colors">{t.hero.scroll}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 animate-bounce group-hover:text-white transition-colors">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
