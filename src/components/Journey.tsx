"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Coffee, Briefcase, GraduationCap, MapPin, Globe } from "lucide-react";

export default function Journey() {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);

  const getIcon = (role: string) => {
    if (role.includes("Barista")) return <Coffee className="w-5 h-5" />;
    if (role.includes("Sales") || role.includes("Engineer")) return <Briefcase className="w-5 h-5" />;
    if (role.includes("University")) return <GraduationCap className="w-5 h-5" />;
    return <MapPin className="w-5 h-5" />;
  };

  // Map locations corresponding to the timeline items (0 to 4)
  // 0: London, 1: Oslo, 2: Melbourne, 3: Tokyo, 4: Japan
  const locations = [
    { top: "35%", left: "45%", label: "London" },      // London
    { top: "30%", left: "48%", label: "Oslo" },        // Oslo
    { top: "72%", left: "75%", label: "Melbourne" },   // Melbourne safely inside
    { top: "46%", left: "74%", label: "Tokyo" },       // Tokyo
    { top: "40%", left: "68%", label: "Japan" }        // Japan (Near Tokyo)
  ];

  const handleLocationClick = (index: number) => {
    setActiveIndex(index);
    const element = document.getElementById(`journey-item-${index}`);
    if (element) {
      const offset = 100; // Offset for header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="journey" className="py-32 px-6 bg-[#050a15] min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
        
        {/* Left: Map Visual (Simplified SVG) */}
        <div className="w-full lg:w-1/2 relative lg:sticky top-24 lg:top-32 h-[45vh] lg:h-[60vh] flex flex-col items-center justify-center z-0">
          <div className="relative w-full max-w-[280px] lg:max-w-[400px] aspect-square mx-auto rounded-full border border-white/5 bg-navy-900/10 flex items-center justify-center overflow-visible">
             <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.15 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 flex items-center justify-center p-4"
             >
                <Globe className="w-full h-full text-[#daa520]" strokeWidth={0.5} />
             </motion.div>
             
             {/* Dynamic Location Points (Simplified) */}
             <div className="absolute inset-0 z-10 w-full h-full">
                {locations.map((loc, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <div 
                      key={idx} 
                      className="absolute cursor-pointer group/marker" 
                      style={{ top: loc.top, left: loc.left }}
                      onClick={() => handleLocationClick(idx)}
                    >
                      {/* Active Pulse Animation */}
                      {isActive ? (
                        <motion.div 
                          className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)] z-20"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                        />
                      ) : (
                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-white/20 rounded-full z-10 group-hover/marker:bg-white/50 transition-colors" />
                      )}
                      
                      {/* Label - visible when active or hovered */}
                      <motion.div 
                        initial={false}
                        animate={{ 
                          opacity: isActive ? 1 : 0.4, 
                          x: isActive ? 12 : 5,
                          scale: isActive ? 1.1 : 1
                        }}
                        className={`absolute top-[-6px] left-[0px] text-[10px] tracking-widest uppercase font-semibold text-white drop-shadow-md whitespace-nowrap transition-all group-hover/marker:opacity-100 group-hover/marker:translate-x-2`}
                      >
                        {loc.label}
                      </motion.div>
                    </div>
                  );
                })}
             </div>
          </div>
          
          <div className="absolute bottom-[-20px] lg:bottom-4 left-0 lg:left-4 text-center lg:text-left w-full lg:w-auto">
            <h3 className="text-lg lg:text-xl font-light tracking-[0.2em] text-white/80">{t.journey.title}</h3>
            <p className="text-[10px] lg:text-xs tracking-widest text-white/30 uppercase mt-2">Connecting the dots across continents</p>
          </div>
        </div>

        {/* Right: Vertical Timeline */}
        <div className="w-full lg:w-1/2 py-10 lg:py-20 pb-40 lg:pb-64 relative z-10">
          <h2 className="text-xs font-medium mb-12 tracking-[0.3em] uppercase text-white/40 lg:hidden text-center">
            Career Timeline
          </h2>

          <div className="relative border-l border-white/10 ml-4 lg:ml-0 pl-8 lg:pl-10 space-y-24 lg:space-y-32">
            {t.journey.items.map((item: any, index: number) => {
              const isActive = activeIndex === index;
              
              return (
                <motion.div 
                  key={index}
                  id={`journey-item-${index}`}
                  className={`relative transition-all duration-500`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    onViewportEnter={() => setActiveIndex(index)}
                    viewport={{ margin: "-30% 0px -30% 0px" }}
                    className="w-full h-full"
                  >
                    {/* Node Icon */}
                    <div className={`absolute -left-[54px] top-0 w-10 h-10 rounded-full border flex items-center justify-center z-10 transition-colors duration-500
                      ${isActive ? 'bg-white text-[#050a15] border-white' : 'bg-[#0a1525] text-white/50 border-white/10'}`}>
                      {getIcon(item.role)}
                    </div>

                    <div className="flex flex-col gap-2">
                    <span className={`text-xs font-semibold tracking-[0.2em] uppercase transition-colors duration-500 ${isActive ? 'text-[#daa520]' : 'text-white/30'}`}>
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
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
