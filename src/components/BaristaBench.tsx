"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Coffee, Activity, Thermometer, Wind, ExternalLink } from "lucide-react";

const BaristaBench = () => {
  const { t } = useLanguage();

  // State for interactive roast calculation
  const [fcTimeString, setFcTimeString] = useState("08:45");
  const [fcTemp, setFcTemp] = useState(198);
  const [endTimeString, setEndTimeString] = useState("10:30");
  const [endTemp, setEndTemp] = useState(200);
  const [batchWeight, setBatchWeight] = useState(350);
  const [copyStatus, setCopyStatus] = useState("Copy JSON");

  useEffect(() => {
    const saved = localStorage.getItem("mk_roast_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.fcTimeString) setFcTimeString(parsed.fcTimeString);
        if (parsed.fcTemp) setFcTemp(parsed.fcTemp);
        if (parsed.endTimeString) setEndTimeString(parsed.endTimeString);
        if (parsed.endTemp) setEndTemp(parsed.endTemp);
        if (parsed.batchWeight) setBatchWeight(parsed.batchWeight);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mk_roast_profile", JSON.stringify({
      fcTimeString, fcTemp, endTimeString, endTemp, batchWeight
    }));
  }, [fcTimeString, fcTemp, endTimeString, endTemp, batchWeight]);

  const handleCopy = () => {
    const data = JSON.stringify({ fcTimeString, fcTemp, endTimeString, endTemp, batchWeight }, null, 2);
    navigator.clipboard.writeText(data);
    setCopyStatus("Copied!");
    setTimeout(() => setCopyStatus("Copy JSON"), 2000);
  };

  // Time parsing utility
  const parseTime = (timeStr: string) => {
    const parts = timeStr.replace(".", ":").split(":");
    if (parts.length === 2) {
      return (parseInt(parts[0]) || 0) * 60 + (parseInt(parts[1]) || 0);
    }
    return (parseInt(timeStr) || 0) * 60; // assume minutes if no colon
  };

  const fcSec = Math.max(1, parseTime(fcTimeString));
  const endSec = Math.max(fcSec + 1, parseTime(endTimeString));

  // Dynamic calculations
  const devTimeSec = endSec - fcSec;
  const devPercent = ((devTimeSec / endSec) * 100).toFixed(1);

  // --- Graph Drawing Logic ---
  const chargeX = 10;
  const endX = 580;
  // Calculate X relative to total time
  const fcX = chargeX + (fcSec / endSec) * (endX - chargeX);

  // Map temperature (100°C to 230°C) to Y coordinates (230 to 30) for SVG
  const mapY = (temp: number) => {
    const minT = 80;
    const maxT = 230;
    const minY = 230; // Lowest point on graph
    const maxY = 30;  // Highest point on graph
    const clampedT = Math.max(minT, Math.min(temp, maxT));
    return minY - ((clampedT - minT) / (maxT - minT)) * (minY - maxY);
  };

  const chargeY = mapY(185); // Assuming charge is 185°C
  const fcY = mapY(fcTemp);
  const endY = mapY(endTemp);

  // Approximated Roast Curve Points
  const tpX = chargeX + (fcX - chargeX) * 0.15; // Turning point approx
  const tpY = mapY(90); // Turning point temp

  // Create a realistic looking S-curve for the roast
  const curvePath = `M ${chargeX},${chargeY} C ${tpX},${mapY(60)} ${fcX - (fcX - chargeX) * 0.3},${fcY + 60} ${fcX},${fcY} Q ${fcX + (endX - fcX) * 0.5},${endY + 5} ${endX},${endY}`;

  return (
    <section id="bench" className="py-32 px-6 bg-[#02050b]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left: Roast Curve Dashboard */}
          <div className="w-full lg:w-2/3 bg-[#0a1525]/40 border border-white/5 rounded-3xl p-8 lg:p-12 relative overflow-visible backdrop-blur-xl transition-all duration-300">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h4 className="text-xs font-semibold tracking-[0.3em] text-white/40 uppercase mb-4">{t.bench.roastProfile}</h4>
                <h3 className="text-3xl font-light text-white tracking-tight">Interactive Roast Simulator</h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-2 text-xs font-medium tracking-widest text-neutral-300 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-4 py-2 rounded-full"
                >
                  {copyStatus}
                </button>
                <a 
                  href="https://ai-roasting-strategist.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-xs font-medium tracking-widest text-[#daa520] hover:text-[#daa520]/80 transition-colors border border-[#daa520]/30 hover:border-[#daa520] px-4 py-2 rounded-full"
                >
                  Launch ARTERA
                </a>
              </div>
            </div>

            {/* Custom SVG Roast Curve */}
            <div className="relative h-64 w-full mb-16 mt-8">
              <svg viewBox="0 0 600 260" className="w-full h-full overflow-visible">
                {/* Horizontal Grid Lines */}
                <line x1="0" y1="30" x2="600" y2="30" stroke="white" strokeWidth="1" strokeOpacity="0.05" />
                <line x1="0" y1="130" x2="600" y2="130" stroke="white" strokeWidth="1" strokeOpacity="0.05" />
                <line x1="0" y1="230" x2="600" y2="230" stroke="white" strokeWidth="1" strokeOpacity="0.05" />

                <AnimatePresence>
                  <motion.path
                    key={`curve-${fcSec}-${endSec}-${fcTemp}-${endTemp}`}
                    d={curvePath}
                    fill="transparent"
                    stroke="#daa520"
                    strokeWidth="3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  
                  {/* Points on Curve */}
                  <motion.circle cx={chargeX} cy={chargeY} r="4" fill="#daa520" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} />
                  <motion.circle cx={tpX} cy={tpY} r="4" fill="#daa520" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} />
                  <motion.circle cx={fcX} cy={fcY} r="5" fill="#fff" stroke="#daa520" strokeWidth="2" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 }} />
                  <motion.circle cx={endX} cy={endY} r="5" fill="#fff" stroke="#daa520" strokeWidth="2" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5 }} />
                </AnimatePresence>

                {/* Vertical Guides */}
                <line x1={fcX} y1={fcY} x2={fcX} y2="260" stroke="#daa520" strokeWidth="1" strokeDasharray="4,4" strokeOpacity="0.4" />
                <line x1={endX} y1={endY} x2={endX} y2="260" stroke="#daa520" strokeWidth="1" strokeDasharray="4,4" strokeOpacity="0.4" />

                {/* Labels */}
                <text x={chargeX} y={chargeY - 15} fontSize="11" fill="#888" letterSpacing="0.1em">CHARGE (185°C)</text>
                <text x={tpX} y={tpY + 20} fontSize="11" fill="#888" letterSpacing="0.1em">TP (~90°C)</text>
                <text x={fcX - 10} y={fcY - 15} fontSize="11" fill="white" letterSpacing="0.1em">FC ({fcTemp}°C)</text>
                <text x={endX - 40} y={endY - 15} fontSize="11" fill="white" letterSpacing="0.1em">END ({endTemp}°C)</text>
              </svg>
            </div>

            {/* Quick Stats Grid - Interactive */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col gap-2 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <label className="flex items-center gap-2 text-[#daa520]/70 text-[10px] tracking-widest uppercase"><Activity className="w-3 h-3" /> Total Time</label>
                <div className="text-2xl font-light text-white">
                  {endTimeString} <span className="text-[10px] text-white/30 ml-1 uppercase">min</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <label className="flex items-center gap-2 text-[#daa520]/70 text-[10px] tracking-widest uppercase"><Thermometer className="w-3 h-3" /> Dev Time</label>
                <div className="text-2xl font-light text-white">
                  {Math.floor(devTimeSec / 60)}:{(devTimeSec % 60).toString().padStart(2, '0')} <span className="text-[10px] text-white/30 ml-1 uppercase">min</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-white/[0.02] border border-white/5 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#daa520]/10 to-transparent opacity-50" />
                <label className="flex items-center gap-2 text-[#daa520]/70 text-[10px] tracking-widest uppercase relative z-10"><Wind className="w-3 h-3" /> Dev %</label>
                <div className="text-2xl font-light text-white relative z-10">
                  {devPercent}%
                </div>
              </div>

              <div className="flex flex-col gap-2 p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
                <label className="flex items-center gap-2 text-[#daa520]/70 text-[10px] tracking-widest uppercase"><Coffee className="w-3 h-3" /> Weight</label>
                <div className="text-2xl font-light text-white">
                  {batchWeight} <span className="text-[10px] text-white/30 ml-1 uppercase">g</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Inputs & Info */}
          <div className="w-full lg:w-1/3 space-y-12 h-full lg:sticky lg:top-32">
            <div>
              <h2 className="text-3xl md:text-5xl font-light text-white tracking-widest mb-6 uppercase">{t.bench.title}</h2>
              <p className="text-base text-neutral-400 font-light leading-relaxed">
                {t.bench.description}
              </p>
            </div>

            <div className="p-6 md:p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <span className="text-[10px] font-semibold tracking-[0.3em] text-[#daa520] uppercase mb-8 block">{t.bench.currentlyBrewing}</span>
              
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-white/40 uppercase">First Crack Time</label>
                    <input 
                      type="text" 
                      value={fcTimeString}
                      onChange={(e) => setFcTimeString(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#daa520] transition-colors"
                      placeholder="08:45"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-white/40 uppercase">FC Temp (°C)</label>
                    <input 
                      type="number" 
                      value={fcTemp}
                      onChange={(e) => setFcTemp(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#daa520] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-white/40 uppercase">Total Time</label>
                    <input 
                      type="text" 
                      value={endTimeString}
                      onChange={(e) => setEndTimeString(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#daa520] transition-colors"
                      placeholder="10:30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-widest text-white/40 uppercase">End Temp (°C)</label>
                    <input 
                      type="number" 
                      value={endTemp}
                      onChange={(e) => setEndTemp(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#daa520] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  <label className="text-[10px] tracking-widest text-white/40 uppercase mt-4 block">Batch Weight (g)</label>
                  <input 
                    type="number" 
                    value={batchWeight}
                    onChange={(e) => setBatchWeight(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#daa520] transition-colors"
                  />
                </div>
              </form>
            </div>

            {/* AI Insights & Recommendations */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-6 md:p-8 bg-gradient-to-br from-[#daa520]/10 to-transparent rounded-2xl border border-[#daa520]/20 backdrop-blur-md"
            >
              <h4 className="text-[10px] font-bold tracking-[0.3em] text-[#daa520] uppercase mb-6">Roast Analysis</h4>
              
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] text-neutral-500 uppercase tracking-widest block mb-2">Predicted Roast Degree</span>
                  <div className={`text-xl font-medium tracking-tight ${
                    endTemp < 188 ? "text-amber-100" :
                    endTemp < 192 ? "text-amber-200" :
                    endTemp < 196 ? "text-[#daa520]" :
                    endTemp < 200 ? "text-orange-300" :
                    endTemp < 204 ? "text-orange-400" :
                    endTemp < 208 ? "text-orange-500" :
                    endTemp < 212 ? "text-orange-700" :
                    "text-stone-700"
                  }`}>
                    {endTemp < 188 ? "Light Cinnamon / Under" :
                     endTemp < 192 ? "Cinnamon / Very Light" :
                     endTemp < 196 ? "New England / Light" :
                     endTemp < 200 ? "American / Medium-Light" :
                     endTemp < 204 ? "City / Medium" :
                     endTemp < 208 ? "Full City / Medium-Dark" :
                     endTemp < 212 ? "Vienna / Dark" :
                     "French & Italian / Heavy"}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <span className="text-[9px] text-neutral-500 uppercase tracking-widest block mb-2">Brewing Advice</span>
                  <p className="text-xs text-neutral-300 leading-relaxed font-light">
                    {endTemp < 188 ? "未発達（アンダー）の可能性がある極浅煎り。沸騰直後のお湯で、挽き目を細かくし、長めの浸漬時間を設けてください。" :
                     endTemp < 192 ? "非常に明るい酸味が特徴。フレーバーを活かすため、94°C以上の高温かつ高速な抽出でクリーンさを追求しましょう。" :
                     endTemp < 196 ? "サードウェーブの定番。ベリー系の酸味。93°C前後で、豆の個性が最もクリアに表現されるポイントです。" :
                     endTemp < 200 ? "酸味と甘みのバランスが良い。91-92°Cで、中庸な挽き目を選択することで安定した味になります。" :
                     endTemp < 204 ? "甘みが最大化される中煎り。90°C前後の標準的な温度で、厚みのあるマウスフィールを狙うのがおすすめ。" :
                     endTemp < 208 ? "チョコやナッツのコク。88-89°Cに温度を下げ、少し粗めの挽き目にして雑味を抑えるのがコツです。" :
                     endTemp < 212 ? "重厚なボディとスモーキーさ。85°C程度の低温で、ゆっくりとドリップして濃厚なエキスを楽しんでください。" :
                     "極深煎り。苦味が支配的です。82°C程度の超低温で、ネルドリップのような点滴抽出が最も相性良く仕上がります。"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default BaristaBench;
