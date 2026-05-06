// @ts-nocheck
/* eslint-disable */
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowUpRight, Cpu } from "lucide-react";

const Work = () => {
  const { t } = useLanguage();
  const workData = t.work as any;

  if (!workData || !workData.projects) return null;

  const artera = workData.projects.artera;

  return (
    <section id="work" className="py-32 px-6 max-w-7xl mx-auto flex flex-col items-center border-t border-white/5">
      <div className="w-full text-center mb-24">
        <h2 className="text-sm font-semibold tracking-[0.4em] mb-4 text-[#daa520] uppercase">
          {workData.title}
        </h2>
        <p className="text-lg md:text-xl font-light text-neutral-400 max-w-2xl mx-auto">
          Highlighting complex engineering problem-solving.
        </p>
      </div>

      <div className="w-full max-w-5xl bg-[#0a1525]/40 border border-white/5 rounded-3xl overflow-hidden flex flex-col md:flex-row backdrop-blur-xl">
        
        {/* Placeholder for Video/Demo */}
        <div className="w-full md:w-1/2 min-h-[300px] md:min-h-full relative bg-neutral-900 flex items-center justify-center p-8 group">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-800/50 to-neutral-900 z-0"></div>
          
          {/* Dynamic AI Roasting Visualization */}
          <div className="relative z-10 w-full h-full border border-white/10 rounded-xl flex flex-col items-center justify-center bg-black/40 overflow-hidden group-hover:border-[#daa520]/30 transition-colors">
            
            {/* Grid background */}
            <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "linear-gradient(#daa520 1px, transparent 1px), linear-gradient(90deg, #daa520 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
            
            {/* Scanning Line */}
            <motion.div 
              className="absolute left-0 right-0 h-0.5 bg-[#daa520]/50 z-20"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10 flex flex-col items-center gap-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Cpu className="w-12 h-12 text-[#daa520]" />
              </motion.div>
              <div className="flex flex-col items-center">
                <span className="text-[10px] tracking-[0.3em] text-[#daa520] uppercase font-bold mb-1">AI Analyzing</span>
                <div className="flex gap-1">
                   <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity }} className="w-1 h-1 bg-[#daa520] rounded-full"></motion.span>
                   <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1 h-1 bg-[#daa520] rounded-full"></motion.span>
                   <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1 h-1 bg-[#daa520] rounded-full"></motion.span>
                </div>
              </div>
            </div>
            
            {/* Live Roast Curve Simulation */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 px-8 pointer-events-none">
              <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible">
                <motion.path 
                  d="M0,180 Q80,170 120,100 T240,40 T400,20" 
                  fill="none" 
                  stroke="#daa520" 
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Data point indicators */}
                {[50, 120, 240, 350].map((x, i) => (
                  <motion.circle 
                    key={i}
                    cx={x}
                    cy={180 - (x/2.5)}
                    r="3"
                    fill="#fff"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  />
                ))}
              </svg>
            </div>

            {/* Floating Data Bits */}
            <div className="absolute top-4 left-4 font-mono text-[8px] text-[#daa520]/40 space-y-1">
              <div>TEMP: 198.4°C</div>
              <div>ROR: +12.5</div>
              <div>PHASE: MAILLARD</div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center relative">
           <div className="absolute top-10 right-10">
              <div className="w-10 h-10 bg-[#daa520]/10 rounded-full flex items-center justify-center text-[#daa520]">
                <ArrowUpRight className="w-5 h-5" />
              </div>
           </div>

           <span className="text-[10px] font-bold tracking-widest text-[#daa520] uppercase mb-4 opacity-80">
            {artera.role}
           </span>
           <h3 className="text-3xl text-white mb-8">{artera.name}</h3>

           <div className="space-y-6">
             <div>
               <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-medium">Problem</h4>
               <p className="text-sm text-neutral-300 font-light leading-relaxed">{artera.problem}</p>
             </div>
             <div>
               <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-medium">Solution</h4>
               <p className="text-sm text-neutral-300 font-light leading-relaxed">{artera.solution}</p>
             </div>
             <div>
               <h4 className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-medium">Result</h4>
               <p className="text-sm text-[#daa520] font-light leading-relaxed">{artera.result}</p>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
