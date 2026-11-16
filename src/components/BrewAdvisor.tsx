"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Coffee, RotateCcw, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Symptom = "light" | "sour" | "bitter" | "heavy" | "flat";
type Tip = { title: string; detail: string };
type Result = { symptom: Symptom; tips: Tip[]; ratio: string | null; mixed: boolean };
const symptoms: Symptom[] = ["light", "sour", "bitter", "heavy", "flat"];

const names: Record<Symptom, [string, string]> = {
  light: ["軽い・薄い", "Thin / weak"],
  sour: ["酸っぱい・青い", "Sour / grassy"],
  bitter: ["苦い・渋い", "Bitter / dry"],
  heavy: ["重い・濃すぎる", "Heavy / too strong"],
  flat: ["ぼんやり・甘さがない", "Flat / lacking sweetness"],
};

function detect(note: string): Symptom | null {
  const terms: [Symptom, RegExp][] = [
    ["light", /軽すぎ|軽い|薄い|水っぽ|弱い|あっさり|watery|thin|weak|dilut|too light/i],
    ["sour", /酸っぱ|酸味が強|すっぱ|青臭|未抽出|sour|sharp|grassy|underextract/i],
    ["bitter", /苦い|苦すぎ|渋い|えぐ|舌が乾|bitter|astringent|harsh|dry mouth/i],
    ["heavy", /重い|濃すぎ|濃い|強すぎ|どっしり|heavy|too strong|overwhelming/i],
    ["flat", /ぼんやり|平坦|甘さがな|甘みがな|物足り|flat|dull|no sweetness|bland/i],
  ];
  return terms.find(([, pattern]) => pattern.test(note))?.[0] ?? null;
}

function makeResult(symptom: Symptom, note: string, dose: number | null, water: number | null, jp: boolean): Result {
  const say = (ja: string, en: string) => jp ? ja : en;
  const ratio = dose !== null && water !== null ? "1:" + (water / dose).toFixed(1) : null;
  const nextDose = dose !== null ? Math.round(dose * 1.06 * 2) / 2 : null;
  const lowerDose = dose !== null ? Math.max(1, Math.round(dose * 0.94 * 2) / 2) : null;
  const reducedWater = water !== null ? Math.round(water * 0.94) : null;
  const light = /軽すぎ|軽い|薄い|水っぽ|弱い|watery|thin|weak|dilut|too light/i.test(note);
  const sour = /酸っぱ|酸味が強|すっぱ|青臭|sour|sharp|grassy/i.test(note);
  const bitter = /苦い|苦すぎ|渋い|bitter|astringent|harsh/i.test(note);
  const mixed = (symptom === "light" && (sour || bitter)) || (symptom === "sour" && light) || (symptom === "bitter" && light);
  const moreDose = nextDose !== null && water !== null
    ? say("湯量" + water + "gはそのまま、粉を" + dose + "g→" + nextDose + "gに。濃度を少し上げる試し方です。", "Keep " + water + "g of water and raise the dose from " + dose + "g to " + nextDose + "g. This tests a slightly stronger brew.")
    : say("湯量をそのままに、粉を約5%増やします。味が濃くなるか確かめてください。", "Keep water fixed and increase the dose by about 5%. Check whether the cup has more body.");
  const lessWater = reducedWater !== null
    ? say("粉量はそのまま、湯量を" + water + "g→約" + reducedWater + "gに。抽出時間も変わり得るので、味を比較してください。", "Keep the dose fixed and reduce water from " + water + "g to about " + reducedWater + "g. Brew time can also shift, so compare by taste.")
    : say("粉量はそのまま、湯量を約5%減らして味を比較します。", "Keep the dose fixed and reduce water by about 5%, then compare the cup.");
  const lessDose = lowerDose !== null && water !== null
    ? say("湯量" + water + "gはそのまま、粉を" + dose + "g→約" + lowerDose + "gに。", "Keep " + water + "g of water and reduce the dose from " + dose + "g to about " + lowerDose + "g.")
    : say("湯量はそのまま、粉を約5%減らしてみます。", "Keep water fixed and reduce the dose by about 5%.");
  let tips: Tip[];
  if (symptom === "light" && sour) {
    tips = [
      { title: say("まず少し細かく挽く", "First, grind a little finer"), detail: say("薄さに加えて強い酸味があるなら、成分が十分に出ていない可能性があります。挽き目を1段階だけ細かくして比較。", "Thin and sharply sour can indicate low extraction. Move the grind one small step finer and compare.") },
      { title: say("次は粉量を少し増やす", "Next, try a little more coffee"), detail: moreDose },
      { title: say("粉全体を均一に濡らす", "Wet the bed evenly"), detail: say("注湯の偏りを抑え、同じ湯量で均一な抽出を試します。大きくかき混ぜる必要はありません。", "Pour evenly across the bed at the same water weight. Avoid excessive stirring.") },
    ];
  } else if (symptom === "light" && bitter) {
    tips = [
      { title: say("粉量を少し増やす", "Use a little more coffee"), detail: moreDose },
      { title: say("苦みが残るなら少し粗く挽く", "If bitterness persists, grind coarser"), detail: say("薄いのに苦い場合は濃度と抽出の問題が重なっているかもしれません。粉量を試した次の一杯で、挽き目を1段階粗くします。", "Thin and bitter can reflect low strength alongside harsh extraction. After testing dose, try one step coarser on a separate brew.") },
    ];
  } else if (symptom === "light") {
    tips = [
      { title: say("粉量を少し増やす", "Use a little more coffee"), detail: moreDose },
      { title: say("または湯量を少し減らす", "Or use a little less water"), detail: lessWater },
      { title: say("酸っぱさもある場合は挽き目を調整", "If it is also sour, adjust grind"), detail: say("酸味や青さも強い場合に限り、次の一杯は少し細かく挽いて抽出を増やします。苦い場合は逆方向の調整が必要です。", "If the cup is sharply sour or grassy, try a slightly finer grind on a separate brew. For bitterness, consider a different adjustment.") },
    ];
  } else if (symptom === "sour") {
    tips = [
      { title: say("挽き目を少し細かく", "Grind a little finer"), detail: say("1段階だけ細かくし、同じ粉量・湯量で酸味と甘さの変化を確認。", "Move one small step finer, keeping dose and water fixed. Compare sourness and sweetness.") },
      { title: say("湯温を少し上げる", "Try slightly hotter water"), detail: say("別の一杯で湯温を2〜3℃上げてみます。焙煎度や豆により適温は変わります。", "On a separate brew, increase water temperature by 2–3°C. The useful temperature depends on the bean and roast.") },
      { title: say("注湯を均一に", "Pour more evenly"), detail: say("粉全体を濡らすように注ぎ、抽出の偏りを減らします。", "Wet all the grounds and reduce uneven extraction.") },
    ];
  } else if (symptom === "bitter") {
    tips = [
      { title: say("挽き目を少し粗く", "Grind a little coarser"), detail: say("1段階だけ粗くし、同じ粉量・湯量で苦みや後味を比較。", "Move one small step coarser at the same dose and water; compare bitterness and finish.") },
      { title: say("攪拌を減らす", "Reduce agitation"), detail: say("強いかき混ぜや勢いのある注湯を控え、味が穏やかになるか試します。", "Avoid vigorous stirring or pouring; see whether the finish becomes gentler.") },
      { title: say("別の一杯で湯温を少し下げる", "Try slightly cooler water separately"), detail: say("1〜2℃下げて比較します。苦さが豆の焙煎由来なら抽出調整だけでは消えません。", "Try 1–2°C cooler water on a separate brew. Roast-derived bitterness may remain.") },
    ];
  } else if (symptom === "heavy") {
    tips = [
      { title: say("粉量を少し減らす", "Use a little less coffee"), detail: lessDose },
      { title: say("または湯量を少し増やす", "Or add a little more water"), detail: say("粉量を固定し、湯量を約5%増やして濃さを比較します。", "Keep the dose fixed and increase water by about 5%; compare strength.") },
      { title: say("渋みもあれば粗く挽く", "If dry or bitter, grind coarser"), detail: say("重さと渋みが両方ある場合だけ、別の一杯で挽き目を少し粗くします。", "Only if the cup is also dry or bitter, try a slightly coarser grind on another brew.") },
    ];
  } else {
    tips = [
      { title: say("軽さ・酸味・苦みを切り分ける", "Identify what feels missing"), detail: say("ぼんやりした味だけでは原因を絞れません。薄さ、尖った酸味、苦みのうち一番近い感覚を選んで再診断してください。", "Flatness alone does not identify the cause. Choose weak, sharply sour, or bitter if one fits and run again.") },
      { title: say("まず挽き目を小さく変えて比較", "Compare one small grind change"), detail: say("同じ豆とレシピで挽き目を1段階だけ変え、甘さが増える方向を探します。渋みが出たら元に戻してください。", "At the same recipe, change the grind one small step and compare sweetness. Revert if the cup turns harsh.") },
    ];
  }
  return { symptom, tips, ratio, mixed };
}

export default function BrewAdvisor() {
  const { lang } = useLanguage();
  const jp = lang === "ja";
  const say = (ja: string, en: string) => jp ? ja : en;
  const [note, setNote] = useState("");
  const [selected, setSelected] = useState<Symptom | null>(null);
  const [dose, setDose] = useState("");
  const [water, setWater] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const kind = selected ?? detect(note);
    if (!kind) {
      setError(say("味をもう少し具体的に書くか、近い味のボタンを選んでください。", "Describe the taste in more detail or choose a taste button."));
      setResult(null);
      return;
    }
    const doseNumber = dose.trim() === "" ? null : Number(dose);
    const waterNumber = water.trim() === "" ? null : Number(water);
    if ((doseNumber !== null && (!Number.isFinite(doseNumber) || doseNumber <= 0 || doseNumber > 200)) || (waterNumber !== null && (!Number.isFinite(waterNumber) || waterNumber <= 0 || waterNumber > 2000))) {
      setError(say("粉量は0〜200g、湯量は0〜2000gの範囲で入力してください。", "Enter a dose above 0 and at most 200g, and water above 0 and at most 2000g."));
      setResult(null);
      return;
    }
    setError("");
    setResult(makeResult(kind, note, doseNumber, waterNumber, jp));
  }
  function reset() {
    setNote(""); setSelected(null); setDose(""); setWater(""); setResult(null); setError("");
  }
  return (
    <main className="flex-1 min-h-screen bg-[#050a15] text-white px-5 pt-32 pb-28" lang={jp ? "ja" : "en"}>
      <div className="max-w-5xl mx-auto">
        <Link href="/coffee-tools" className="inline-flex items-center gap-2 text-xs tracking-[0.15em] text-[#daa520] hover:text-white focus-visible:outline-2 focus-visible:outline-[#daa520] mb-12"><ArrowLeft size={16} /> COFFEE TOOLS</Link>
        <header className="mb-12">
          <p className="text-[#daa520] tracking-[0.24em] text-[11px] mb-5">STORK / COFFEE TOOLS</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-5">{jp ? "ハンドドリップ味の改善" : "Brew Taste Advisor"}</h1>
          <p className="text-neutral-400 max-w-2xl leading-relaxed">{say("飲んだ味を言葉にすると、次の一杯で試せる調整を2〜3個提案します。", "Describe your cup and get 2–3 practical changes to try on your next brew.")}</p>
          <p className="inline-flex items-center gap-2 text-xs text-[#daa520] mt-6 rounded-full border border-[#daa520]/35 px-4 py-2"><Coffee size={15} /> {say("無料 · ログイン不要", "FREE · NO SIGN-IN")}</p>
        </header>
        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6 items-start">
          <form onSubmit={submit} className="rounded-3xl bg-[#0a1525] border border-white/10 p-6 md:p-8 space-y-7">
            <div>
              <p className="text-[#daa520] text-[10px] tracking-[0.2em] mb-3">01 / TASTE</p>
              <label htmlFor="brew-note" className="block text-xl mb-3">{say("どんな味でしたか？", "How did it taste?")}</label>
              <textarea id="brew-note" value={note} maxLength={500} rows={4} onChange={e => { setNote(e.target.value); setResult(null); setError(""); }} placeholder={say("例：ちょっと味が軽すぎる。酸味も強い。", "e.g. It tastes a bit thin and sour.")} className="w-full rounded-xl bg-[#050a15] border border-white/15 p-4 text-white placeholder:text-neutral-600 outline-none focus-visible:border-[#daa520] resize-y" />
              <p className="text-xs text-neutral-500 mt-2">{say("短い一言でも使えます。下のボタンから選ぶだけでもOK。", "A short note works, or simply choose a taste below.")}</p>
            </div>
            <fieldset>
              <legend className="text-sm text-neutral-300 mb-3">{say("いちばん近い味（任意）", "Closest description (optional)")}</legend>
              <div className="flex flex-wrap gap-2">{symptoms.map(kind =>
                <button key={kind} type="button" aria-pressed={selected === kind} onClick={() => { setSelected(selected === kind ? null : kind); setResult(null); setError(""); }} className={"rounded-full px-3 py-2 text-xs border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#daa520] " + (selected === kind ? "bg-[#daa520] text-[#050a15] border-[#daa520]" : "border-white/20 text-neutral-300 hover:border-[#daa520]/70")}>{selected === kind && <Check className="inline mr-1" size={13} />}{names[kind][jp ? 0 : 1]}</button>
              )}</div>
            </fieldset>
            <div>
              <p className="text-[#daa520] text-[10px] tracking-[0.2em] mb-3">02 / RECIPE <span className="text-neutral-500 tracking-normal">{say("（任意）", "(OPTIONAL)")}</span></p>
              <p className="text-sm text-neutral-400 mb-4">{say("粉量と湯量を入れると、次回の調整量も表示します。", "Add dose and water to see a tailored next-brew adjustment.")}</p>
              <div className="grid grid-cols-2 gap-3">
                <div><label htmlFor="brew-dose" className="block text-sm mb-2">{say("粉量", "Coffee dose")} (g)</label><input id="brew-dose" type="number" min="0.1" max="200" step="any" inputMode="decimal" value={dose} onChange={e => { setDose(e.target.value); setResult(null); }} placeholder="15" className="w-full rounded-xl bg-[#050a15] border border-white/15 px-4 py-3 text-white placeholder:text-neutral-600 outline-none focus-visible:border-[#daa520]" /></div>
                <div><label htmlFor="brew-water" className="block text-sm mb-2">{say("湯量", "Water")} (g)</label><input id="brew-water" type="number" min="0.1" max="2000" step="any" inputMode="decimal" value={water} onChange={e => { setWater(e.target.value); setResult(null); }} placeholder="240" className="w-full rounded-xl bg-[#050a15] border border-white/15 px-4 py-3 text-white placeholder:text-neutral-600 outline-none focus-visible:border-[#daa520]" /></div>
              </div>
            </div>
            {error && <p role="alert" className="text-sm text-amber-300">{error}</p>}
            <div className="flex flex-wrap gap-4 items-center"><button type="submit" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#daa520] text-[#050a15] font-medium px-6 py-3 hover:bg-[#f0be47] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#daa520]">{say("改善案を見る", "Get suggestions")}<ArrowRight size={18} /></button><button type="button" onClick={reset} className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white"><RotateCcw size={15} />{say("リセット", "Reset")}</button></div>
          </form>
          <section aria-live="polite" className="rounded-3xl border border-white/10 bg-[#0a1525] p-6 md:p-8 min-h-[420px]">
            <p className="text-[#daa520] text-[10px] tracking-[0.2em] mb-6">03 / NEXT BREW</p>
            {result ? <>
              <p className="text-sm text-neutral-400 mb-2">{say("読み取った味", "TASTE MATCH")}</p>
              <h2 className="text-2xl font-light mb-3">{names[result.symptom][jp ? 0 : 1]}</h2>
              {result.ratio && <p className="text-xs text-neutral-400 mb-4">{say("入力した粉と湯の比率", "Entered coffee-to-water ratio")} {result.ratio}</p>}
              {result.mixed && <p className="text-xs text-amber-200 border-l-2 border-[#daa520] pl-3 mb-5">{say("複数の味が重なっています。原因は一つとは限りません。", "Several taste clues overlap, so more than one cause is possible.")}</p>}
              <div className="space-y-3">{result.tips.map((tip, index) =>
                <article key={index} className="rounded-2xl bg-[#050a15] border border-white/10 p-5"><p className="text-[#daa520] text-xs mb-2">0{index + 1} / {say("次の一杯で試す", "TRY NEXT BREW")}</p><h3 className="text-lg mb-2">{tip.title}</h3><p className="text-sm leading-relaxed text-neutral-400">{tip.detail}</p></article>
              )}</div>
              <p className="text-xs text-neutral-400 mt-6">{say("まず一つだけ変えて、前の一杯と比較してください。味の言葉だけで原因は確定できません。", "Change one variable at a time and compare. Taste descriptions alone cannot prove the cause.")}</p>
            </> : <div className="flex min-h-[300px] flex-col items-start justify-center text-neutral-400"><Sparkles size={30} strokeWidth={1} className="text-[#daa520] mb-6" /><h2 className="text-xl text-white mb-3">{say("次の一杯のヒント", "Your next-brew ideas")}</h2><p className="leading-relaxed text-sm max-w-xs">{say("味の感想を入力するか、近い味を選んで「改善案を見る」を押してください。", "Describe the cup or select a taste, then tap Get suggestions.")}</p></div>}
          </section>
        </div>
        <p className="text-xs text-neutral-500 mt-8 max-w-3xl leading-relaxed">{say("味の表現から一般的な抽出調整を選ぶ簡易ツールです。AIによる味の測定や原因の確定は行いません。入力した内容は送信・保存しません。", "This simple guide maps taste descriptions to common brewing adjustments. It does not measure flavor or diagnose a cause. Your inputs are not sent or saved.")}{" "}<a href="https://sca.coffee/sca-news/25/issue-13/towards-a-new-brewing-chart-xpj8t" target="_blank" rel="noopener noreferrer" className="underline decoration-[#daa520] hover:text-white">{say("抽出の考え方（SCA）", "Brewing concepts (SCA)")}</a></p>
      </div>
    </main>
  );
}
