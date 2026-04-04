"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16">
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="relative w-72 h-[450px] overflow-hidden rounded-sm filter brightness-90 contrast-110">
          <Image 
            src="/images/blue-lagoon-sign.jpg" 
            alt="Masaki Kono with Coffee Cup"
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </div>
      
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="text-sm font-medium mb-12 tracking-[0.3em] uppercase text-muted">{t.about.title}</h2>
        
        <div className="space-y-8 text-base md:text-lg font-light leading-relaxed text-neutral-300">
          <p>
            {t.about.content}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
