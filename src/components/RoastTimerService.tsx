"use client";

import Link from "next/link";
import { ArrowUpRight, Timer } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function RoastTimerService() {
  const { lang } = useLanguage();
  const jp = lang === "ja";
  return (
    <section className="max-w-5xl mx-auto mb-16 border border-[#daa520]/25 rounded-3xl bg-[#0a1525] p-7 md:p-10 flex flex-col md:flex-row gap-7 md:items-center justify-between">
      <div className="flex gap-5 items-start">
        <div className="rounded-2xl p-4 bg-[#daa520]/10 text-[#e6ba56]"><Timer size={28} strokeWidth={1.4}/></div>
        <div><p className="text-[10px] tracking-[0.2em] text-[#e6ba56] mb-3">STORK / FREE COFFEE TOOL</p><h2 className="text-2xl text-white mb-3">{jp ? "焙煎タイマー / Roast Timer" : "Roast Timer"}</h2><p className="text-sm text-neutral-400 leading-relaxed max-w-lg">{jp ? "1ハゼを記録して、DTRと焙煎時間をリアルタイムに確認。履歴保存・CSV出力に対応。無料・ログイン不要。" : "Log first crack and track development time ratio in real time. Save your roast journal and export CSV. Free, no account required."}</p></div>
      </div>
      <Link href="/roast-timer" className="shrink-0 inline-flex items-center justify-center gap-3 rounded-xl bg-[#e6ba56] text-[#050a15] px-6 py-4 text-sm font-medium hover:bg-[#f1cc79] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e6ba56]">{jp ? "タイマーを使う" : "Open timer"}<ArrowUpRight size={18}/></Link>
    </section>
  );
}
