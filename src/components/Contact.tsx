"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto flex flex-col items-center justify-center text-center border-t border-border mt-12">
      <h2 className="text-sm md:text-base font-medium mb-16 tracking-[0.3em] uppercase text-muted">{t.contact.title}</h2>
      
      <div className="space-y-12 text-base md:text-lg font-light leading-relaxed text-neutral-300 w-full">
        <p>
          {t.contact.content}
        </p>
      </div>
    </section>
  );
};

export default Contact;
