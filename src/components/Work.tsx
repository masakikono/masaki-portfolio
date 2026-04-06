"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUpRight, Code2, Cpu, LineChart } from "lucide-react";

const Work = () => {
  const { t } = useLanguage();

  // Make sure t.work.projects is successfully typed or safely accessed
  const artera = (t.work as any).projects?.artera;

  if (!artera) return null;

  return (
    <section id="work" className="py-40 px-6 max-w-7xl mx-auto flex flex-col items-center">
      <div className="w-full text-center mb-24">
        <h2 className="text-sm font-semibold tracking-[0.4em] mb-4 text-[#daa520] uppercase">{t.work.title}</h2>
        <p className="text-lg md:text-xl font-light text-neutral-400 max-w-2xl mx-auto">{t.work.content}</p>
      </div>

      {/* Case Study Card */}
      <div className="w-full relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-emerald-900/20 rounded-[2rem] transform group-hover:scale-[1.01] transition-transform duration-500 ease-out blur-xl opacity-50" />
        <div className="relative bg-[#0a1525]/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left: Project Details */}
          <div className="w-full lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center">
            <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium tracking-widest text-neutral-300 mb-6 uppercase w-fit">
              {artera.role}
            </span>
            <h3 className="text-4xl md:text-5xl font-serif text-white mb-10">{artera.name}</h3>

            <div className="space-y-8">
              <div className="space-y-2">
                <h4 className="text-xs tracking-[0.2em] font-semibold text-[#daa520] uppercase flex items-center gap-2">
                  <LineChart className="w-4 h-4" /> Problem
                </h4>
                <p className="text-sm md:text-base font-light leading-relaxed text-neutral-300">
                  {artera.problem}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs tracking-[0.2em] font-semibold text-[#daa520] uppercase flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> Solution
                </h4>
                <p className="text-sm md:text-base font-light leading-relaxed text-neutral-300">
                  {artera.solution}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs tracking-[0.2em] font-semibold text-[#daa520] uppercase flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> Result
                </h4>
                <p className="text-sm md:text-base font-light leading-relaxed text-neutral-300">
                  {artera.result}
                </p>
              </div>
            </div>

            <div className="mt-12 flex items-center">
              <a href="https://ai-roasting-strategist.vercel.app/" target="_blank" rel="noopener noreferrer" className="group/btn flex items-center gap-3 text-sm font-semibold tracking-widest uppercase text-white hover:text-[#daa520] transition-colors relative overflow-hidden">
                View Live Project 
                <span className="p-2 bg-white/5 rounded-full group-hover/btn:bg-[#daa520]/10 transition-colors">
                  <ArrowUpRight className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
                </span>
              </a>
            </div>
          </div>

          {/* Right: Visual Showcase (Mockup) */}
          <div className="w-full lg:w-1/2 bg-[#02050b] p-8 lg:p-12 border-l border-white/5 relative flex items-center justify-center overflow-hidden min-h-[400px]">
            {/* Abstract Tech Visual / Mockup base */}
            <div className="absolute inset-0 bg-[url('/images/laughing-laptop.jpg')] bg-cover bg-center opacity-30 select-none grayscale-[50%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02050b] via-transparent to-[#02050b]/80" />
            
            <motion.div 
              className="relative z-10 w-full max-w-sm aspect-[3/4] bg-neutral-900 border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Fake App Header */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <div className="bg-white/5 rounded text-[8px] text-white/50 px-20 py-1 font-mono mx-auto">artera.app</div>
              </div>
              
              {/* Fake App Content / Curves abstract */}
              <div className="flex-1 relative border border-white/5 rounded-lg overflow-hidden bg-black flex flex-col p-4 gap-4">
                <div className="w-1/2 h-2 bg-white/10 rounded" />
                <div className="w-3/4 h-2 bg-white/10 rounded" />
                <div className="mt-auto h-32 relative">
                  {/* Fake Curve */}
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50">
                    <path d="M0,50 C20,50 30,10 50,10 C70,10 80,40 100,40" fill="none" stroke="#daa520" strokeWidth="2" />
                    <path d="M0,45 C30,45 40,20 60,20 C80,20 90,30 100,30" fill="none" stroke="#60a5fa" strokeWidth="1" strokeDasharray="2,2" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Work;
