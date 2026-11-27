// @ts-nocheck
/* eslint-disable */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUpRight, BookOpen } from "lucide-react";

const Insights = () => {
  const { t, lang } = useLanguage();
  const insightsData = t.insights as any;
  // Render articles directly (no useEffect) so they are included in the
  // server-rendered HTML — visible to crawlers and shown without a flash.
  const articles: any[] = insightsData?.articles ?? [];

  if (!insightsData || articles.length === 0) return null;

  return (
    <section id="insights" className="py-32 px-6 max-w-7xl mx-auto flex flex-col items-center">
      <div className="w-full text-center mb-24">
        <h2 className="text-sm font-semibold tracking-[0.4em] mb-4 text-[#daa520] uppercase">{insightsData.title}</h2>
        <p className="text-lg md:text-xl font-light text-neutral-400 max-w-2xl mx-auto">{insightsData.content}</p>
      </div>

      <a href="https://substack.com/@masakikono" target="_blank" rel="noopener noreferrer" className="mb-12 w-full max-w-6xl rounded-2xl border border-[#daa520]/30 bg-[#0a1525]/40 p-8 hover:border-[#daa520]">
        <span className="text-xs tracking-widest text-[#daa520]">SUBSTACK</span>
        <h3 className="mt-3 text-2xl text-white">{lang === "ja" ? "焙煎ノート・発信はこちら" : "Roasting notes & writing"}</h3>
        <span className="mt-4 inline-flex gap-2 text-neutral-300">{lang === "ja" ? "Substackプロフィールを見る" : "View my Substack profile"} <ArrowUpRight className="w-4 h-4" /></span>
      </a>
      <h3 className="mb-6 text-sm tracking-widest text-neutral-400">{lang === "ja" ? "過去の記事（note）" : "Article archive (note)"}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
        {articles.map((article: any, index: number) => (
          <motion.a
            key={index}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="group relative flex flex-col h-full bg-[#0a1525]/40 border border-white/5 rounded-2xl hover:bg-[#0a1525]/80 transition-all duration-300 overflow-hidden backdrop-blur-xl"
          >
            {/* Article Image Cover */}
            <div className="w-full h-48 relative overflow-hidden bg-neutral-900">
              <img 
                src={article.image || "/images/kaf-coffee.jpg"} 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a1525]/90 to-transparent" />
            </div>

            <div className="p-8 flex flex-col flex-1">
              <div className="absolute top-4 right-4 p-8 opacity-0 group-hover:opacity-100 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 z-20">
                <div className="w-10 h-10 bg-[#daa520]/80 rounded-full flex items-center justify-center text-white shadow-lg backdrop-blur-md">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6 relative z-10">
                <span className="text-xs font-semibold tracking-widest text-[#daa520] uppercase">{article.category}</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span className="text-xs font-mono text-neutral-500">{article.date}</span>
              </div>

              <h3 className="text-xl md:text-2xl text-white mb-8 group-hover:text-[#daa520] transition-colors relative z-10 leading-snug">
                {article.title}
              </h3>

              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                <span className="text-xs font-semibold tracking-widest uppercase text-neutral-400 flex items-center gap-2 group-hover:text-white transition-colors">
                  <BookOpen className="w-4 h-4" /> {insightsData.readMore}
                </span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default Insights;
