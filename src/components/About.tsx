"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-24 px-6 max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
      <h2 className="text-sm md:text-base font-medium mb-16 tracking-[0.3em] uppercase text-muted">{t.about.title}</h2>
      
      <div className="space-y-12 text-base md:text-lg font-light leading-relaxed text-neutral-300">
        <p>
          {t.about.content}
        </p>
      </div>
    </section>
  );
};

export default About;
