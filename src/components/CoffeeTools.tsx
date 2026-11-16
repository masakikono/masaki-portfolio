"use client";

import Link from "next/link";
import { ArrowUpRight, Calculator, Timer } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CoffeeTools() {
  const { lang } = useLanguage();
  const jp = lang === "ja";
  const tools = [
    {
      href: "/bench", icon: Calculator, number: "01", title: jp ? "EYカルキュレーター" : "EY Calculator",
      subtitle: "EXTRACTION YIELD",
      description: jp ? "粉量・抽出量・TDSから抽出収率（EY）を計算。日々の抽出調整に。" : "Calculate extraction yield from coffee dose, beverage weight and TDS to guide your brewing.",
    },
    {
      href: "/roast-timer", icon: Timer, number: "02", title: jp ? "焙煎タイマー" : "Roast Timer",
      subtitle: "DEVELOPMENT TIME RATIO",
      description: jp ? "1ハゼを記録し、焙煎時間とDTRをリアルタイムに確認。履歴保存とCSV出力にも対応。" : "Log first crack and track roast time and DTR live. Keep a local journal and export CSV.",
    },
  ];

  return (
    <main className="flex-1 w-full bg-[#050a15] pt-32 pb-40 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-16 md:mb-20">
          <p className="text-[#daa520] text-[10px] tracking-[0.28em] mb-5">MADE FOR THE CRAFT</p>
          <h1 className="text-4xl md:text-6xl text-white font-light tracking-tight mb-5">COFFEE TOOLS</h1>
          <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto">
            {jp ? "抽出と焙煎の判断を支える、小さなデジタルツール。無料・登録不要で使えます。" : "Simple tools for thoughtful brewing and roasting. Free to use, with no account required."}
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map(tool => {
            const Icon = tool.icon;
            return (
              <Link href={tool.href} key={tool.href} className="group flex flex-col rounded-3xl border border-white/10 bg-[#0a1525] p-7 md:p-9 min-h-[310px] hover:border-[#daa520]/50 hover:bg-[#101e31] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#daa520]">
                <div className="flex justify-between items-start mb-12">
                  <span className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#daa520]/10 text-[#daa520]"><Icon size={27} strokeWidth={1.5} aria-hidden="true" /></span>
                  <span className="text-xs font-mono text-neutral-500">{tool.number} / 02</span>
                </div>
                <p className="text-[10px] tracking-[0.18em] text-[#daa520] mb-3">{tool.subtitle}</p>
                <h2 className="text-2xl text-white mb-3 font-light">{tool.title}</h2>
                <p className="text-sm text-neutral-400 font-light leading-relaxed mb-7">{tool.description}</p>
                <span className="mt-auto flex items-center gap-2 text-sm text-[#daa520] group-hover:gap-3 transition-all">{jp ? "ツールを使う" : "Open tool"}<ArrowUpRight size={17} aria-hidden="true" /></span>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
