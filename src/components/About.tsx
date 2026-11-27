"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

import Activity from "./Activity";

const About = () => {
  const { t, lang } = useLanguage();
  
  return (
    <section id="about" className="py-24 px-4 max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-center gap-16">
      <motion.div 
        className="w-full md:w-[40%] flex justify-center md:sticky md:top-32"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative w-full max-w-[440px] aspect-[3/4] overflow-hidden rounded-2xl filter brightness-90 contrast-110 shadow-2xl">
          <Image 
            src="/images/blue-lagoon-sign.jpg" 
            alt="Masaki Kono at the Blue Lagoon, Iceland"
            fill
            className="object-contain object-center bg-[#0a1525]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </motion.div>
      
      <motion.div 
        className="w-full max-w-full min-w-0 md:w-[60%] flex flex-col items-center md:items-start text-center md:text-left overflow-hidden"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="text-sm font-semibold mb-12 tracking-[0.4em] uppercase text-[#daa520]">{t.about.title}</h2>
        
        <div className="text-sm md:text-base font-light leading-[2.2] text-neutral-300 space-y-8 w-full">
          <p className="whitespace-pre-line">
            {t.about.content}
          </p>
        </div>
        
        <div className="mt-12 w-full text-left">
          <h3 className="text-sm font-semibold tracking-widest text-[#daa520] mb-6">{lang === "ja" ? "専門性・スキル" : "Expertise & skills"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(lang === "ja" ? [
              ["コーヒー", "焙煎、品質管理、カッピング、抽出。Diedrich、IKAWA、Cropsterの実務経験。"],
              ["法人営業・事業開発", "B2B営業、卸売、英国市場開拓、顧客折衝。"],
              ["国際経験", "日本・豪州・ノルウェー・英国での勤務。日本語・英語。"],
              ["テクノロジー", "Next.js、React、AIを活用したコーヒー向けWebツール開発。"]
            ] : [
              ["Coffee expertise", "Roasting, quality control, cupping and brewing. Experience with Diedrich, IKAWA and Cropster."],
              ["Business development", "B2B sales, wholesale, UK market development and client relationships."],
              ["International experience", "Work experience in Japan, Australia, Norway and the UK. Japanese and English."],
              ["Technology", "Next.js, React and AI-assisted coffee web tool development."]
            ]).map(([title, description]) => <div key={title} className="p-5 rounded-xl border border-white/10 bg-white/5"><h4 className="text-white font-medium mb-3">{title}</h4><p className="text-sm text-neutral-400 leading-relaxed">{description}</p></div>)}
          </div>
        </div>
        <Activity />
      </motion.div>
    </section>
  );
};

export default About;
