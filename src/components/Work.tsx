"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const Work = () => {
  const { t } = useLanguage();

  return (
    <section id="work" className="py-24 px-6 max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-16">
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="text-sm font-medium mb-12 tracking-[0.3em] uppercase text-muted">{t.work.title}</h2>
        
        <div className="space-y-8 text-base md:text-lg font-light leading-relaxed text-neutral-300">
          <p>
            {t.work.content}
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex justify-center">
        <div className="relative w-full max-w-[400px] aspect-[4/3] overflow-hidden rounded-sm filter contrast-110">
          <Image 
            src="/images/laughing-laptop.jpg" 
            alt="Masaki working on laptop"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};

export default Work;
