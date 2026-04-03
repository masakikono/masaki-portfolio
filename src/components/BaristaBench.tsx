"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Coffee, Activity, Thermometer, Wind, ExternalLink } from "lucide-react";

const BaristaBench = () => {
  const { t } = useLanguage();

  // Simple Roast Curve SVG Path
  const curvePath = "M 0,200 Q 150,180 300,100 T 600,50";

  return (
    <section id="bench" className="py-32 px-6 bg-[#02050b]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left: Roast Curve Dashboard */}
          <div className="w-full lg:w-2/3 bg-[#0a1525]/40 border border-white/5 rounded-3xl p-8 lg:p-12 relative overflow-hidden backdrop-blur-xl">
            <div className="flex justify-between items-start mb-16">
              <div>
                <h4 className="text-xs font-semibold tracking-[0.3em] text-white/40 uppercase mb-4">{t.bench.roastProfile}</h4>
                <h3 className="text-3xl font-light text-white tracking-tight">Batch #24 — Ethiopia Yirgacheffe</h3>
              </div>
              <a 
                href="https://ai-roasting-strategist.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-medium tracking-widest text-white/40 hover:text-white transition-colors"
              >
                ARTERA PROJECT <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Custom SVG Roast Curve */}
            <div className="relative h-64 w-full mb-12">
              <svg viewBox="0 0 600 250" className="w-full h-full overflow-visible">
                {/* Grid Lines */}
                <line x1="0" y1="50" x2="600" y2="50" stroke="white" strokeWidth="1" strokeOpacity="0.05" />
                <line x1="0" y1="100" x2="600" y2="100" stroke="white" strokeWidth="1" strokeOpacity="0.05" />
                <line x1="0" y1="150" x2="600" y2="150" stroke="white" strokeWidth="1" strokeOpacity="0.05" />
                <line x1="0" y1="200" x2="600" y2="200" stroke="white" strokeWidth="1" strokeOpacity="0.05" />

                <motion.path
                  d={curvePath}
                  fill="transparent"
                  stroke="#daa520"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  viewport={{ once: true }}
                />
                
                {/* Points on Curve */}
                <motion.circle cx="0" cy="200" r="4" fill="#daa520" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }} />
                <motion.circle cx="300" cy="100" r="4" fill="#daa520" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.5 }} />
                <motion.circle cx="600" cy="50" r="4" fill="#daa520" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2.2 }} />

                {/* Labels */}
                <text x="0" y="225" fontSize="10" fill="gray" letterSpacing="0.2em">CHARGE</text>
                <text x="300" y="80" fontSize="10" fill="gray" letterSpacing="0.2em">FIRST CRACK</text>
                <text x="540" y="35" fontSize="10" fill="gray" letterSpacing="0.2em">END ROAST</text>
              </svg>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-white/30 text-[10px] tracking-widest uppercase"><Activity className="w-3 h-3" /> Total Time</div>
                <div className="text-xl font-light text-white">10:30 <span className="text-[10px] text-white/20">min</span></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-white/30 text-[10px] tracking-widest uppercase"><Thermometer className="w-3 h-3" /> First Crack</div>
                <div className="text-xl font-light text-white">8:45 <span className="text-[10px] text-white/20">@ 198°C</span></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-white/30 text-[10px] tracking-widest uppercase"><Wind className="w-3 h-3" /> Dev %</div>
                <div className="text-xl font-light text-white">16.7 <span className="text-[10px] text-white/20">percent</span></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-white/30 text-[10px] tracking-widest uppercase"><Coffee className="w-3 h-3" /> Weight</div>
                <div className="text-xl font-light text-white">350 <span className="text-[10px] text-white/20">grams</span></div>
              </div>
            </div>
          </div>

          {/* Right: Currently Brewing & Info */}
          <div className="w-full lg:w-1/3 space-y-12 h-full lg:sticky lg:top-32">
            <div>
              <h2 className="text-3xl md:text-5xl font-light text-white tracking-widest mb-10 uppercase">{t.bench.title}</h2>
              <p className="text-lg text-neutral-400 font-light leading-relaxed">
                {t.bench.description}
              </p>
            </div>

            <div className="p-8 bg-white/5 rounded-2xl border border-white/5">
              <span className="text-[10px] font-semibold tracking-[0.3em] text-[#daa520] uppercase mb-8 block">{t.bench.currentlyBrewing}</span>
              <div className="space-y-6">
                <div>
                  <h5 className="text-xl font-light text-white mb-2">Ethiopia Yirgacheffe G1</h5>
                  <p className="text-xs tracking-widest text-white/30 uppercase">Roast: Light-Medium | Oct 26, 2023</p>
                </div>
                <div>
                  <span className="text-[10px] font-semibold tracking-[0.3em] text-white/40 uppercase mb-3 block">{t.bench.notes}</span>
                  <div className="flex flex-wrap gap-2">
                    {["Jasmine", "Bergamot", "Citrus", "Earl Grey"].map((note, i) => (
                      <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/60 tracking-wider">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BaristaBench;
