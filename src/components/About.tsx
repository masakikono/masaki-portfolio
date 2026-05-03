"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

import Activity from "./Activity";

const About = () => {
  const { t, lang } = useLanguage();
  
  return (
    <section id="about" className="py-24 px-4 max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-center gap-16">
      <div className="w-full md:w-[40%] flex justify-center md:sticky md:top-32">
        <div className="relative w-full max-w-[440px] aspect-[3/4] overflow-hidden rounded-2xl filter brightness-90 contrast-110 shadow-2xl">
          <Image 
            src="/images/blue-lagoon-sign.jpg" 
            alt="Masaki Kono with Coffee Cup"
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
      
      <div className="w-full max-w-full min-w-0 md:w-[60%] flex flex-col items-center md:items-start text-center md:text-left overflow-hidden">
        <h2 className="text-sm font-semibold mb-12 tracking-[0.4em] uppercase text-[#daa520]">{t.about.title}</h2>
        
        <div className="text-sm md:text-base font-light leading-[2.2] text-neutral-300 space-y-8 w-full">
          <p className="whitespace-pre-line">
            {t.about.content}
          </p>
        </div>
        
        <Activity />
      </div>
    </section>
  );
};

export default About;
