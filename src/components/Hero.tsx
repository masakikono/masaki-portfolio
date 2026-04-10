// @ts-nocheck
/* eslint-disable */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import('@/components/HeroScene'), { ssr: false });

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background Image & 3D Canvas */}
      <div className="absolute inset-0 z-0 bg-[#050a15]">
         <div className="absolute inset-0 opacity-40 mix-blend-screen overflow-hidden">
            <HeroScene />
         </div>
        
        {/* Overlay gradient to ease the text */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a15] via-transparent to-[#050a15] opacity-80 pointer-events-none"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center px-4">
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-8xl font-light tracking-widest text-white mb-6 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {t.hero.title}
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl font-light tracking-widest text-[#dddddd] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        >
          {t.hero.subtitle}
        </motion.p>
      </div>

      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
      >
        <span className="text-xs tracking-widest font-medium uppercase mb-2 text-white/50">{t.hero.scroll}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50 animate-bounce">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
