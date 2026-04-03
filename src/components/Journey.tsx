"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Coffee, Briefcase, GraduationCap, MapPin, Globe } from "lucide-react";

const Journey = () => {
  const { t } = useLanguage();

  const getIcon = (role: string) => {
    if (role.includes("Barista")) return <Coffee className="w-5 h-5" />;
    if (role.includes("Sales") || role.includes("Engineer")) return <Briefcase className="w-5 h-5" />;
    if (role.includes("University")) return <GraduationCap className="w-5 h-5" />;
    return <MapPin className="w-5 h-5" />;
  };

  return (
    <section id="journey" className="py-32 px-6 bg-[#050a15]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
        
        {/* Left: Map Visual (Simplified SVG) */}
        <div className="w-full lg:w-1/2 sticky top-32 hidden lg:block">
          <div className="relative aspect-video bg-navy-900/20 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center">
             <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.1 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 flex items-center justify-center p-8"
             >
                <Globe className="w-full h-full text-white" strokeWidth={0.5} />
             </motion.div>
             
             {/* Dynamic Location Points (Simplified) */}
             <div className="relative z-10 w-full h-full">
                {/* London */}
                <motion.div 
                  className="absolute top-[35%] left-[45%] w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                />
                <div className="absolute top-[38%] left-[45%] text-[10px] tracking-widest text-white/40 uppercase">London</div>
                
                {/* Oslo */}
                <div className="absolute top-[30%] left-[48%] w-2 h-2 bg-white/40 rounded-full" />
                
                {/* Tokyo */}
                <div className="absolute top-[45%] left-[85%] w-2 h-2 bg-white/40 rounded-full" />
                
                {/* Melbourne */}
                <div className="absolute top-[80%] left-[88%] w-2 h-2 bg-white/40 rounded-full" />
             </div>

             <div className="absolute bottom-8 left-8">
                <h3 className="text-xl font-light tracking-[0.2em] text-white/80">{t.journey.title}</h3>
                <p className="text-xs tracking-widest text-white/30 uppercase mt-2">Connecting the dots across continents</p>
             </div>
          </div>
        </div>

        {/* Right: Vertical Timeline */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-sm font-medium mb-16 tracking-[0.3em] uppercase text-white/40 lg:hidden">
            {t.journey.title}
          </h2>

          <div className="relative border-l border-white/10 ml-4 lg:ml-0 pl-10 space-y-24">
            {t.journey.items.map((item: any, index: number) => (
              <motion.div 
                key={index}
                className="relative"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Node Icon */}
                <div className="absolute -left-[54px] top-0 w-10 h-10 rounded-full bg-[#0a1525] border border-white/10 flex items-center justify-center text-white/50 z-10 transition-colors hover:text-white hover:border-white/30">
                  {getIcon(item.role)}
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium tracking-[0.2em] text-white/30 uppercase">
                    {item.year}
                  </span>
                  <div className="flex items-center gap-3">
                    <h4 className="text-2xl font-light tracking-tight text-white">{item.role}</h4>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/40 tracking-wider mb-4">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </div>
                  <p className="text-base text-neutral-400 font-light leading-relaxed max-w-lg">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Journey;
