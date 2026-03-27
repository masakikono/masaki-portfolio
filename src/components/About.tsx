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
          農園からカップに至るまで全てを繋ぐ、「Total Coffee Man」であることが僕のゴールだ。
        </p>
        <p>
          そして、僕のもう一つの顔が「写真」だ。<br />
          目の前にある美しい瞬間を切り取り、そこにある文脈や手仕事のクラフト感を視覚化する。
        </p>
        <p>
          コーヒーも写真も、本質は同じだ。<br />
          誰かにとっての良い影響（GIVE）を生み出すための、僕なりの表現手段である。
        </p>
      </div>
    </section>
  );
};

export default About;
