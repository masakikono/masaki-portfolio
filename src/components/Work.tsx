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
          
          {/* Animated placeholder for the demo */}
          <div className="relative z-10 w-full h-full border border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center gap-4 bg-black/20 overflow-hidden group-hover:border-[#daa520]/50 transition-colors">
            <Cpu className="w-8 h-8 text-neutral-500 group-hover:text-[#daa520] transition-colors duration-500" />
            <span className="text-xs tracking-widest text-neutral-500 uppercase font-medium">Demo Video Placeholder</span>
            
            {/* Visual representation of the AI analyzing a roast curve */}
            <div className="absolute bottom-0 w-full h-24 flex items-end px-4 gap-1 opacity-20">
              {[40, 60, 45, 80, 55, 90, 70, 100].map((h, i) => (
                <motion.div 
                  key={i} 
                  className="w-full bg-[#daa520] rounded-t-sm"
                  initial={{ height: "10%" }}
                  animate={{ height: `${h}%` }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 + (i * 0.2), ease: "easeInOut" }}
                />
              ))}
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
           <h3 className="text-3xl font-serif text-white mb-8">{artera.name}</h3>

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
