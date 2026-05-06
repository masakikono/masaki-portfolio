"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function StorkBrandTeaser() {
  return (
    <section className="relative w-full py-32 px-6 bg-[#050a15] overflow-hidden">
      {/* Background elegant gradient/glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#daa520]/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <span className="text-xs font-semibold tracking-[0.4em] mb-6 text-[#daa520] uppercase block">
            Coming Soon
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-8 tracking-wide">
            Stork Coffee Roasters
          </h2>
          
          <p className="text-neutral-400 font-light text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Delivering exceptional roasts with the grace and precision of a stork. A new chapter in my coffee journey, focusing on meticulously sourced beans and uncompromising quality.
          </p>

          {/* Email Capture / CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full sm:w-auto flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-[#daa520]/50 transition-colors font-light"
            />
            <button 
              className="w-full sm:w-auto bg-white text-[#050a15] hover:bg-[#daa520] hover:text-white transition-all duration-300 rounded-full px-8 py-4 font-semibold tracking-widest text-sm flex items-center justify-center gap-2"
              data-cursor-text="JOIN"
            >
              SUBSCRIBE <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[#daa520]/60 text-xs mt-6 tracking-widest uppercase">
            Be the first to know when we launch.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
