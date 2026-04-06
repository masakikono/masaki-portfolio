"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUpRight, BookOpen } from "lucide-react";

const Insights = () => {
  const { t } = useLanguage();
  const insightsData = t.insights as any;

  if (!insightsData || !insightsData.articles) return null;

  return (
    <section id="insights" className="py-32 px-6 max-w-7xl mx-auto flex flex-col items-center">
      <div className="w-full text-center mb-24">
        <h2 className="text-sm font-semibold tracking-[0.4em] mb-4 text-[#daa520] uppercase">{insightsData.title}</h2>
        <p className="text-lg md:text-xl font-light text-neutral-400 max-w-2xl mx-auto">{insightsData.content}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
        {insightsData.articles.map((article: any, index: number) => (
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

              <h3 className="text-xl md:text-2xl font-serif text-white mb-8 group-hover:text-[#daa520] transition-colors relative z-10 leading-snug">
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
