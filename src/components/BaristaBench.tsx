"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Coffee, Activity, Thermometer, Droplets, Scale, Info, RefreshCw } from "lucide-react";

const BaristaBench = () => {
  const { t } = useLanguage();

  // Extraction Parameters
  const [dose, setDose] = useState<number>(18.0);
  const [yield_amount, setYieldAmount] = useState<number>(36.0);
  const [tds, setTds] = useState<number>(9.0);
  const [copyStatus, setCopyStatus] = useState("Copy Result");

  // String states for smooth manual input
  const [doseInput, setDoseInput] = useState("18.0");
  const [yieldInput, setYieldInput] = useState("36.0");
  const [tdsInput, setTdsInput] = useState("9.00");

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("mk_ey_calculator");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.dose) {
            setDose(parsed.dose);
            setDoseInput(parsed.dose.toString());
        }
        if (parsed.yield_amount) {
            setYieldAmount(parsed.yield_amount);
            setYieldInput(parsed.yield_amount.toString());
        }
        if (parsed.tds) {
            setTds(parsed.tds);
            setTdsInput(parsed.tds.toString());
        }
      } catch (e) {}
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem("mk_ey_calculator", JSON.stringify({
      dose, yield_amount, tds
    }));
  }, [dose, yield_amount, tds]);

  // Calculations
  const ey = dose > 0 ? (yield_amount * tds) / dose : 0;
  const brewRatio = dose > 0 ? (yield_amount / dose).toFixed(1) : "0";
  
  const handleCopy = () => {
    const data = `Dose: ${dose}g\nYield: ${yield_amount}g\nTDS: ${tds}%\nEY: ${ey.toFixed(2)}%\nRatio: 1:${brewRatio}`;
    navigator.clipboard.writeText(data);
    setCopyStatus("Copied!");
    setTimeout(() => setCopyStatus("Copy Result"), 2000);
  };

  const resetValues = () => {
    setDose(18.0);
    setDoseInput("18.0");
    setYieldAmount(36.0);
    setYieldInput("36.0");
    setTds(9.0);
    setTdsInput("9.00");
  };

  // Input handlers to ensure smooth manual typing
  const handleDoseChange = (val: string) => {
    setDoseInput(val);
    const n = parseFloat(val);
    if (!isNaN(n)) setDose(n);
  };

  const handleYieldChange = (val: string) => {
    setYieldInput(val);
    const n = parseFloat(val);
    if (!isNaN(n)) setYieldAmount(n);
  };

  const handleTdsChange = (val: string) => {
    setTdsInput(val);
    const n = parseFloat(val);
    if (!isNaN(n)) setTds(n);
  };

  // Sync string inputs when slider moves
  const onSliderChange = (type: string, val: number) => {
      if (type === "dose") {
          setDose(val);
          setDoseInput(val.toString());
      } else if (type === "yield") {
          setYieldAmount(val);
          setYieldInput(val.toString());
      } else if (type === "tds") {
          setTds(val);
          setTdsInput(val.toString());
      }
  };

  // Visual Helper: Determine status based on EY
  const getEyStatus = () => {
    if (ey < 18) return { label: "Under Extracted", color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" };
    if (ey > 22) return { label: "Over Extracted", color: "text-orange-500", bg: "bg-orange-500/10", border: "border-orange-500/20" };
    return { label: "Sweet Spot", color: "text-[#daa520]", bg: "bg-[#daa520]/10", border: "border-[#daa520]/20" };
  };

  const status = getEyStatus();

  return (
    <section id="bench" className="pt-20 pb-32 px-6 bg-[#02050b] min-h-screen">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left: Extraction Result Display */}
          <div className="w-full lg:w-2/3 bg-[#0a1525]/40 border border-white/5 rounded-[2.5rem] p-8 lg:p-16 relative overflow-hidden backdrop-blur-2xl transition-all duration-300 group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#daa520]/5 to-transparent opacity-50" />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h4 className="text-[10px] font-bold tracking-[0.4em] text-[#daa520] uppercase mb-4">{t.bench.roastProfile}</h4>
                  <h3 className="text-4xl font-light text-white tracking-tight">Precision Extraction Yield</h3>
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={resetValues}
                    className="p-3 text-white/40 hover:text-white transition-colors border border-white/5 hover:border-white/20 rounded-full"
                    title="Reset"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={handleCopy}
                    className="flex items-center justify-center gap-2 text-[10px] font-bold tracking-widest text-neutral-300 hover:text-white transition-colors border border-white/10 hover:border-white/30 px-6 py-3 rounded-full uppercase"
                  >
                    {copyStatus}
                  </button>
                </div>
              </div>

              {/* Main Gauge Visual */}
              <div className="relative flex flex-col items-center justify-center py-10 lg:py-16">
                <div className="relative w-64 h-64 lg:w-80 lg:h-80 flex items-center justify-center">
                  {/* Background Circle */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90">
                    <circle
                      cx="50%"
                      cy="50%"
                      r="48%"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-white/5"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                      cx="50%"
                      cy="50%"
                      r="48%"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeDasharray="100 100"
                      initial={{ strokeDashoffset: 100 }}
                      animate={{ strokeDashoffset: 100 - Math.min(100, (ey / 30) * 100) }}
                      className={status.color}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>

                  {/* Inner Content */}
                  <div className="text-center">
                    <motion.div 
                      key={ey}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-7xl lg:text-8xl font-thin text-white tracking-tighter"
                    >
                      {ey.toFixed(2)}<span className="text-2xl lg:text-3xl text-white/20 font-light">%</span>
                    </motion.div>
                    <div className={`mt-4 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase inline-block ${status.bg} ${status.color} ${status.border} border`}>
                      {status.label}
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex flex-col items-center text-center">
                  <span className="text-[9px] font-bold tracking-widest text-white/30 uppercase mb-3">Brew Ratio</span>
                  <div className="text-xl font-light text-white tracking-wider">1 : {brewRatio}</div>
                </div>
                <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex flex-col items-center text-center">
                  <span className="text-[9px] font-bold tracking-widest text-white/30 uppercase mb-3">Dose</span>
                  <div className="text-xl font-light text-white tracking-wider">{dose.toFixed(1)}<span className="text-[10px] text-white/20 ml-1">g</span></div>
                </div>
                <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex flex-col items-center text-center">
                  <span className="text-[9px] font-bold tracking-widest text-white/30 uppercase mb-3">Yield</span>
                  <div className="text-xl font-light text-white tracking-wider">{yield_amount.toFixed(1)}<span className="text-[10px] text-white/20 ml-1">g</span></div>
                </div>
                <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex flex-col items-center text-center">
                  <span className="text-[9px] font-bold tracking-widest text-white/30 uppercase mb-3">TDS</span>
                  <div className="text-xl font-light text-white tracking-wider">{tds.toFixed(2)}<span className="text-[10px] text-white/20 ml-1">%</span></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Input Panel */}
          <div className="w-full lg:w-1/3 space-y-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-extralight text-white tracking-widest mb-6 uppercase leading-tight">
                {t.bench.title.split(' ')[0]}<br/>
                <span className="text-[#daa520] font-medium">{t.bench.title.split(' ')[1]}</span>
              </h2>
              <p className="text-base text-neutral-400 font-light leading-relaxed max-w-sm">
                {t.bench.description}
              </p>
            </div>

            <div className="p-8 lg:p-10 bg-white/[0.03] rounded-[2rem] border border-white/10 backdrop-blur-md space-y-8">
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-8 h-8 rounded-lg bg-[#daa520]/20 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-[#daa520]" />
                 </div>
                 <span className="text-xs font-bold tracking-[0.2em] text-white uppercase">{t.bench.currentlyBrewing}</span>
              </div>
              
              <div className="space-y-8">
                {/* Dose Input */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Dose (Coffee)</label>
                    <span className="text-sm text-white font-light">{dose.toFixed(1)}g</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="100" 
                    step="0.1"
                    value={dose}
                    onChange={(e) => onSliderChange("dose", parseFloat(e.target.value))}
                    className="w-full accent-[#daa520] opacity-70 hover:opacity-100 transition-opacity"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text"
                      inputMode="decimal"
                      value={doseInput}
                      onChange={(e) => handleDoseChange(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#daa520] transition-colors"
                      placeholder="18.0"
                    />
                    <div className="flex gap-2">
                      <button onClick={() => onSliderChange("dose", Math.max(0, dose - 0.1))} className="flex-1 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10">-</button>
                      <button onClick={() => onSliderChange("dose", dose + 0.1)} className="flex-1 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10">+</button>
                    </div>
                  </div>
                </div>

                {/* Yield Input */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Yield (Beverage)</label>
                    <span className="text-sm text-white font-light">{yield_amount.toFixed(1)}g</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="1000" 
                    step="1"
                    value={yield_amount}
                    onChange={(e) => onSliderChange("yield", parseFloat(e.target.value))}
                    className="w-full accent-[#daa520] opacity-70 hover:opacity-100 transition-opacity"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text"
                      inputMode="decimal"
                      value={yieldInput}
                      onChange={(e) => handleYieldChange(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#daa520] transition-colors"
                      placeholder="36.0"
                    />
                    <div className="flex gap-2">
                      <button onClick={() => onSliderChange("yield", Math.max(0, yield_amount - 1))} className="flex-1 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10">-</button>
                      <button onClick={() => onSliderChange("yield", yield_amount + 1)} className="flex-1 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10">+</button>
                    </div>
                  </div>
                </div>

                {/* TDS Input */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold tracking-widest text-white/40 uppercase">TDS (Solids)</label>
                    <span className="text-sm text-white font-light">{tds.toFixed(2)}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="25" 
                    step="0.01"
                    value={tds}
                    onChange={(e) => onSliderChange("tds", parseFloat(e.target.value))}
                    className="w-full accent-[#daa520] opacity-70 hover:opacity-100 transition-opacity"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      type="text"
                      inputMode="decimal"
                      value={tdsInput}
                      onChange={(e) => handleTdsChange(e.target.value)}
                      className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#daa520] transition-colors"
                      placeholder="9.00"
                    />
                    <div className="flex gap-2">
                      <button onClick={() => onSliderChange("tds", Math.max(0, tds - 0.05))} className="flex-1 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10">-</button>
                      <button onClick={() => onSliderChange("tds", tds + 0.05)} className="flex-1 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scientific Insight */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 lg:p-10 bg-gradient-to-br from-[#daa520]/10 via-white/[0.05] to-transparent rounded-[2.5rem] border border-[#daa520]/20 flex gap-6"
            >
              <Info className="w-6 h-6 text-[#daa520] shrink-0 mt-1" />
              <div className="space-y-3">
                <span className="text-xs font-bold tracking-[0.3em] text-[#daa520] uppercase">Brewing Insight</span>
                <p className="text-base md:text-lg text-white font-light leading-relaxed">
                  {ey < 18 ? "抽出不足（アンダー）の傾向です。より細かい挽き目にするか、温度を上げる、または抽出時間を延ばすことを検討してください。" :
                   ey > 22 ? "過抽出（オーバー）の傾向です。粗めの挽き目にするか、温度を下げる、または抽出を早めに切り上げることで調整してください。" :
                   "理想的な収率です。豆のポテンシャルと甘みが最もバランス良く表現されているポイントです。"}
                </p>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default BaristaBench;
