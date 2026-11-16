"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Coffee, RotateCcw, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type Symptom = "light" | "sour" | "bitter" | "heavy" | "flat";
type Tip = { title: string; detail: string };
type Level = "" | "low" | "balanced" | "high";
type Grind = "" | "fine" | "medium-fine" | "medium" | "coarse";
type Factors = { acidity: Level; sweetness: Level; bitterness: Level; grind: Grind };
type Result = { symptom: Symptom; tips: Tip[]; ratio: string | null; mixed: boolean; reason: string; profile: string };
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

const levelNames: Record<Exclude<Level, "">, [string, string]> = {
  low: ["弱い", "Low"], balanced: ["ほどよい", "Moderate"], high: ["強い", "High"],
};
const grindNames: Record<Exclude<Grind, "">, [string, string]> = {
  fine: ["細挽き", "Fine"], "medium-fine": ["中細挽き", "Medium-fine"],
  medium: ["中挽き", "Medium"], coarse: ["粗挽き", "Coarse"],
};

function makeResult(symptom: Symptom, note: string, dose: number | null, water: number | null, jp: boolean, factors: Factors): Result {
  const say = (ja: string, en: string) => jp ? ja : en;
  const ratio = dose !== null && water !== null ? "1:" + (water / dose).toFixed(1) : null;
  const nextDose = dose !== null ? Math.max(dose + 0.5, Math.round(dose * 1.06 * 2) / 2) : null;
  const lowerDose = dose !== null ? Math.max(0.5, Math.round(dose * 0.94 * 2) / 2) : null;
  const reducedWater = water !== null ? Math.max(1, Math.round(water * 0.94)) : null;
  const increasedWater = water !== null ? Math.round(water * 1.05) : null;
  const lightNote = /軽すぎ|軽い|薄い|水っぽ|弱い|watery|thin|weak|dilut|too light/i.test(note);
  const sourNote = /酸っぱ|酸味が強|すっぱ|青臭|sour|sharp|grassy/i.test(note);
  const bitterNote = /苦い|苦すぎ|渋い|bitter|astringent|harsh/i.test(note);
  const sharp = sourNote || (factors.acidity === "high" && factors.sweetness === "low");
  const harsh = bitterNote || factors.bitterness === "high";
  const sweetAcidity = factors.acidity === "high" && (factors.sweetness === "balanced" || factors.sweetness === "high");
  const mixed = (sharp && harsh) || (symptom === "light" && (sharp || harsh)) || (lightNote && (symptom === "sour" || symptom === "bitter"));
  const moreDose = nextDose !== null && water !== null
    ? say("湯量" + water + "gはそのまま、粉を" + dose + "g→" + nextDose + "gに。濃度を少し上げる試し方です。", "Keep " + water + "g of water and raise the dose from " + dose + "g to " + nextDose + "g. This tests a slightly stronger brew.")
    : say("湯量を固定し、粉を約5%増やして濃さを比較します。", "Keep water fixed and increase the dose by about 5%; compare strength.");
  const lessWater = reducedWater !== null
    ? say("粉量はそのまま、湯量を" + water + "g→約" + reducedWater + "gに。抽出時間も変わり得るので味を比較してください。", "Keep the dose fixed and reduce water from " + water + "g to about " + reducedWater + "g. Brew time can shift, so compare by taste.")
    : say("粉量はそのまま、湯量を約5%減らして比較します。", "Keep the dose fixed and reduce water by about 5%; compare.");
  const lessDose = lowerDose !== null && water !== null
    ? say("湯量" + water + "gはそのまま、粉を" + dose + "g→約" + lowerDose + "gに。", "Keep " + water + "g of water and reduce the dose from " + dose + "g to about " + lowerDose + "g.")
    : say("湯量を固定し、粉を約5%減らして比較します。", "Keep water fixed and reduce the dose by about 5%; compare.");
  const evenPour: Tip = {
    title: say("注湯を均一にする", "Pour more evenly"),
    detail: say("粉全体を均一に濡らし、偏った流れを抑えます。粉量・湯量・挽き目は変えずに比較。", "Wet the whole bed evenly and limit channeling. Keep dose, water, and grind unchanged."),
  };
  const finer: Tip = factors.grind === "fine" ? evenPour : {
    title: say("挽き目を少し細かくする", "Grind a little finer"),
    detail: say("今の挽き目から1段階だけ細かくし、同じ粉量・湯量で甘味と後味を比較。すでに渋いなら行わないでください。", "Move one small step finer at the same dose and water; compare sweetness and finish. Skip this if the cup is already harsh."),
  };
  const coarser: Tip = factors.grind === "coarse" ? {
    title: say("攪拌を控える", "Reduce agitation"),
    detail: say("すでに粗挽きなので、さらに粗くする前に強いかき混ぜや勢いのある注湯を控えて比較します。", "Already using a coarse grind? Before going coarser, reduce vigorous stirring or pouring and compare."),
  } : {
    title: say("挽き目を少し粗くする", "Grind a little coarser"),
    detail: say("今の挽き目から1段階だけ粗くし、同じ粉量・湯量で苦味や渋みを比較。", "Move one small step coarser at the same dose and water; compare bitterness and dryness."),
  };
  let reason: string;
  let tips: Tip[];
  if (sharp && harsh && factors.sweetness === "low") {
    reason = say("強い酸味と苦味が重なり、甘味が弱めです。単純な抽出不足・過抽出とは決められません。", "Strong acidity and bitterness with low sweetness can indicate uneven extraction; a single extraction diagnosis is unreliable.");
    tips = [evenPour,
      { title: say("冷めてからもう一度味を見る", "Taste again as the cup cools"), detail: say("温度による印象の変化を確かめ、どちらの不快感が残るか確認します。", "Check which unpleasant note remains when the cup cools.") }];
  } else if (symptom === "light" && harsh) {
    reason = say("薄さと苦味が両方あるため、濃度と抽出の偏りを別々に確認します。", "The cup is both thin and bitter; test strength and harsh extraction separately.");
    tips = [
      { title: say("粉量を少し増やす", "Use a little more coffee"), detail: moreDose },
      coarser,
    ];
  } else if (symptom === "light" && sharp && !sweetAcidity) {
    reason = say("薄さに強い酸味が重なり、甘味も不足している可能性があります。", "The thinness plus sharp acidity suggests low strength and possibly insufficient extraction.");
    tips = [
      finer,
      { title: say("別の一杯で粉量を少し増やす", "Try a slightly higher dose separately"), detail: moreDose },
      factors.grind === "fine" ? { title: say("別の一杯で湯温を少し上げる", "Try hotter water separately"), detail: say("湯温を2〜3℃上げ、甘味と酸味の変化を確認します。", "Increase water temperature by 2–3°C and compare sweetness and acidity.") } : evenPour,
    ];
  } else if (symptom === "light") {
    reason = sweetAcidity
      ? say("酸味が強くても甘味が保たれています。まず濃度を調整し、酸味を欠点と決めつけません。", "Acidity can be pleasant when sweetness is present. Test strength first.")
      : say("主な手がかりは薄さです。まず粉と湯の比率を小さく変えて試します。", "Thinness is the main clue. Start with a small change to coffee-to-water ratio.");
    tips = [
      { title: say("粉量を少し増やす", "Use a little more coffee"), detail: moreDose },
      { title: say("または湯量を少し減らす", "Or use a little less water"), detail: lessWater },
    ];
    if (factors.sweetness === "low" && !harsh) tips.push(finer);
  } else if (symptom === "sour" && sweetAcidity) {
    reason = say("酸味は強めですが、甘味もあります。豆の持ち味の可能性があるため、抽出不足とは断定しません。", "Acidity is pronounced but sweetness is present. This could be the coffee's character rather than under-extraction.");
    tips = [
      { title: say("冷めてから酸味の質を確かめる", "Re-taste when cooler"), detail: say("果実感のある酸味か、鋭く青い酸味かを確認します。", "Notice whether the acidity feels fruity or sharply grassy as the cup cools.") },
      { title: say("酸味を和らげたい場合は湯温を少し下げる", "If desired, try slightly cooler water"), detail: say("別の一杯で湯温を1〜2℃下げ、甘味を保てるか比較します。", "On a separate brew, lower water temperature by 1–2°C and see whether sweetness remains.") },
    ];
  } else if (symptom === "sour") {
    reason = factors.grind === "fine"
      ? say("酸味が目立ちますが、すでに細挽きです。さらに細かくする前に抽出の均一さを確認します。", "Acidity stands out, but the grind is already fine. Check evenness before grinding finer.")
      : say("酸味が目立ち、甘味が弱い可能性があります。少し抽出を増やす方向を試します。", "Sharp acidity with little sweetness may improve with slightly more extraction.");
    tips = [
      finer,
      { title: say("別の一杯で湯温を少し上げる", "Try slightly hotter water separately"), detail: say("湯温を2〜3℃上げ、同じレシピで甘味と酸味を比較。", "Increase water temperature by 2–3°C at the same recipe; compare sweetness and acidity.") },
    ];
    if (factors.grind !== "fine") tips.push(evenPour);
  } else if (symptom === "bitter") {
    reason = say("苦味や渋みが目立ちます。挽き目と攪拌を小さく調整して比較します。", "Bitterness or dryness stands out. Test a small grind or agitation change.");
    tips = [
      coarser,
      { title: say("別の一杯で攪拌を控える", "Reduce agitation on a separate brew"), detail: say("勢いの強い注湯やかき混ぜを減らし、後味を比較します。焙煎由来の苦さは残る場合があります。", "Pour or stir less vigorously and compare the finish. Roast-derived bitterness may remain.") },
    ];
    if (factors.grind === "coarse") tips[1] = { title: say("別の一杯で湯温を少し下げる", "Try slightly cooler water separately"), detail: say("湯温を1〜2℃下げて苦味と甘味を比べます。", "Lower water temperature by 1–2°C and compare bitterness and sweetness.") };
  } else if (symptom === "heavy") {
    reason = harsh ? say("重さに苦味も伴うので、濃度と渋みを分けて確認します。", "The cup is heavy and bitter; test strength and harshness separately.") : say("濃さが主な手がかりです。まず粉と湯の比率を小さく変えます。", "Strength is the main clue. Start with a small ratio change.");
    tips = [
      { title: say("粉量を少し減らす", "Use a little less coffee"), detail: lessDose },
      { title: say("または湯量を少し増やす", "Or use a little more water"), detail: increasedWater !== null ? say("粉量はそのまま、湯量を" + water + "g→約" + increasedWater + "gにして比較。", "Keep dose fixed and increase water from " + water + "g to about " + increasedWater + "g.") : say("粉量を固定し、湯量を約5%増やして比較。", "Keep dose fixed and increase water by about 5%; compare.") },
    ];
    if (harsh) tips.push(coarser);
  } else {
    reason = factors.sweetness === "low" ? say("甘味の弱さを参考にしますが、それだけでは抽出方向を断定できません。", "Low sweetness is a clue, but it does not identify one extraction direction.") : say("ぼんやりした味だけでは原因を絞れません。", "Flatness alone does not identify a cause.");
    tips = [
      { title: say("薄さ・酸味・苦味を切り分ける", "Identify the main taste issue"), detail: say("一番気になる感覚を選んで再診断すると提案を絞れます。", "Select the dominant taste issue and run again to narrow the suggestions.") },
      harsh ? coarser : finer,
    ];
  }
  const profile = [
    factors.acidity && say("酸味", "Acidity") + ": " + levelNames[factors.acidity][jp ? 0 : 1],
    factors.sweetness && say("甘味", "Sweetness") + ": " + levelNames[factors.sweetness][jp ? 0 : 1],
    factors.bitterness && say("苦味", "Bitterness") + ": " + levelNames[factors.bitterness][jp ? 0 : 1],
    factors.grind && say("挽き目", "Grind") + ": " + grindNames[factors.grind][jp ? 0 : 1],
  ].filter(Boolean).join(" · ");
  return { symptom, tips, ratio, mixed, reason, profile };
}

export default function BrewAdvisor() {
  const { lang } = useLanguage();
  const jp = lang === "ja";
  const say = (ja: string, en: string) => jp ? ja : en;
  const [note, setNote] = useState("");
  const [selected, setSelected] = useState<Symptom | null>(null);
  const [dose, setDose] = useState("");
  const [water, setWater] = useState("");
  const [acidity, setAcidity] = useState<Level>("");
  const [sweetness, setSweetness] = useState<Level>("");
  const [bitterness, setBitterness] = useState<Level>("");
  const [grind, setGrind] = useState<Grind>("");
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const kind = selected ?? detect(note) ?? (bitterness === "high" ? "bitter" : acidity === "high" && sweetness === "low" ? "sour" : sweetness === "low" ? "flat" : null);
    if (!kind) {
      setError(say("味の感想か近い味を入力してください。強さだけでは酸味を欠点と判断できません。", "Describe the cup or choose a taste. An acidity rating alone cannot identify a defect."));
      setResult(null);
      return;
    }
    const doseNumber = dose.trim() === "" ? null : Number(dose);
    const waterNumber = water.trim() === "" ? null : Number(water);
    if ((doseNumber !== null && (!Number.isFinite(doseNumber) || doseNumber <= 0 || doseNumber > 200)) || (waterNumber !== null && (!Number.isFinite(waterNumber) || waterNumber <= 0 || waterNumber > 2000))) {
      setError(say("粉量は0より大きく200g以下、湯量は0より大きく2000g以下の範囲で入力してください。", "Enter a dose above 0 and at most 200g, and water above 0 and at most 2000g."));
      setResult(null);
      return;
    }
    setError("");
    setResult(makeResult(kind, note, doseNumber, waterNumber, jp, { acidity, sweetness, bitterness, grind }));
  }
  function reset() {
    setNote(""); setSelected(null); setDose(""); setWater(""); setAcidity(""); setSweetness(""); setBitterness(""); setGrind(""); setResult(null); setError("");
  }
  return (
    <main className="flex-1 min-h-screen bg-[#050a15] text-white px-5 pt-32 pb-28" lang={jp ? "ja" : "en"}>
      <div className="max-w-5xl mx-auto">
        <Link href="/coffee-tools" className="inline-flex items-center gap-2 text-xs tracking-[0.15em] text-[#daa520] hover:text-white focus-visible:outline-2 focus-visible:outline-[#daa520] mb-12"><ArrowLeft size={16} /> COFFEE TOOLS</Link>
        <header className="mb-12">
          <p className="text-[#daa520] tracking-[0.24em] text-[11px] mb-5">STORK / COFFEE TOOLS</p>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-5">{jp ? "ハンドドリップ味の改善" : "Brew Taste Advisor"}</h1>
          <p className="text-neutral-400 max-w-2xl leading-relaxed">{say("味の感想に酸味・甘味・苦味と挽き目を添えると、次の一杯で試せる調整を2〜3個提案します。", "Describe your cup, flavor balance and grind to get 2–3 practical changes for your next brew.")}</p>
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
            <fieldset>
              <p className="text-[#daa520] text-[10px] tracking-[0.2em] mb-3">02 / FLAVOR PROFILE <span className="text-neutral-500 tracking-normal">{say("（任意）", "(OPTIONAL)")}</span></p>
              <p className="text-sm text-neutral-400 mb-4">{say("酸味は必ずしも欠点ではありません。甘味・苦味とのバランスを教えてください。", "Acidity is not always a flaw. Tell us how it balances with sweetness and bitterness.")}</p>
              <div className="grid sm:grid-cols-3 gap-3">
                {(["acidity", "sweetness", "bitterness"] as const).map(key => {
                  const value = key === "acidity" ? acidity : key === "sweetness" ? sweetness : bitterness;
                  const label = key === "acidity" ? say("酸味", "Acidity") : key === "sweetness" ? say("甘味", "Sweetness") : say("苦味", "Bitterness");
                  return <div key={key}><label htmlFor={"brew-" + key} className="block text-sm mb-2">{label}</label><select id={"brew-" + key} value={value} onChange={e => {
                    const next = e.target.value as Level;
                    if (key === "acidity") setAcidity(next);
                    else if (key === "sweetness") setSweetness(next);
                    else setBitterness(next);
                    setResult(null); setError("");
                  }} className="w-full rounded-xl bg-[#050a15] border border-white/15 px-3 py-3 text-white outline-none focus-visible:border-[#daa520]">
                    <option value="">{say("選択しない", "Not selected")}</option>
                    <option value="low">{say("弱い", "Low")}</option>
                    <option value="balanced">{say("ほどよい", "Moderate")}</option>
                    <option value="high">{say("強い", "High")}</option>
                  </select></div>;
                })}
              </div>
            </fieldset>
            <div>
              <p className="text-[#daa520] text-[10px] tracking-[0.2em] mb-3">03 / RECIPE <span className="text-neutral-500 tracking-normal">{say("（任意）", "(OPTIONAL)")}</span></p>
              <p className="text-sm text-neutral-400 mb-4">{say("粉量と湯量を入れると、次回の調整量も表示します。", "Add dose and water to see a tailored next-brew adjustment.")}</p>
              <div className="grid grid-cols-2 gap-3">
                <div><label htmlFor="brew-dose" className="block text-sm mb-2">{say("粉量", "Coffee dose")} (g)</label><input id="brew-dose" type="number" min="0.1" max="200" step="any" inputMode="decimal" value={dose} onChange={e => { setDose(e.target.value); setResult(null); }} placeholder="15" className="w-full rounded-xl bg-[#050a15] border border-white/15 px-4 py-3 text-white placeholder:text-neutral-600 outline-none focus-visible:border-[#daa520]" /></div>
                <div><label htmlFor="brew-water" className="block text-sm mb-2">{say("湯量", "Water")} (g)</label><input id="brew-water" type="number" min="0.1" max="2000" step="any" inputMode="decimal" value={water} onChange={e => { setWater(e.target.value); setResult(null); }} placeholder="240" className="w-full rounded-xl bg-[#050a15] border border-white/15 px-4 py-3 text-white placeholder:text-neutral-600 outline-none focus-visible:border-[#daa520]" /></div>
              </div>
              <div className="mt-5">
                <label htmlFor="brew-grind" className="block text-sm mb-2">{say("現在の挽き目（任意）", "Current grind (optional)")}</label>
                <select id="brew-grind" value={grind} onChange={e => { setGrind(e.target.value as Grind); setResult(null); setError(""); }} className="w-full rounded-xl bg-[#050a15] border border-white/15 px-4 py-3 text-white outline-none focus-visible:border-[#daa520]">
                  <option value="">{say("選択しない・わからない", "Unknown / not selected")}</option>
                  <option value="fine">{say("細挽き", "Fine")}</option>
                  <option value="medium-fine">{say("中細挽き", "Medium-fine")}</option>
                  <option value="medium">{say("中挽き", "Medium")}</option>
                  <option value="coarse">{say("粗挽き", "Coarse")}</option>
                </select>
                <p className="text-xs text-neutral-500 mt-2">{say("器具ごとに粒度が違うため、今使っているミルでの目安です。", "Use a relative description for your grinder; settings vary between grinders.")}</p>
              </div>
            </div>
            {error && <p role="alert" className="text-sm text-amber-300">{error}</p>}
            <div className="flex flex-wrap gap-4 items-center"><button type="submit" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#daa520] text-[#050a15] font-medium px-6 py-3 hover:bg-[#f0be47] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#daa520]">{say("改善案を見る", "Get suggestions")}<ArrowRight size={18} /></button><button type="button" onClick={reset} className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white"><RotateCcw size={15} />{say("リセット", "Reset")}</button></div>
          </form>
          <section aria-live="polite" className="rounded-3xl border border-white/10 bg-[#0a1525] p-6 md:p-8 min-h-[420px]">
            <p className="text-[#daa520] text-[10px] tracking-[0.2em] mb-6">04 / NEXT BREW</p>
            {result ? <>
              <p className="text-sm text-neutral-400 mb-2">{say("読み取った味", "TASTE MATCH")}</p>
              <h2 className="text-2xl font-light mb-3">{names[result.symptom][jp ? 0 : 1]}</h2>
              {result.profile && <p className="text-xs text-neutral-400 mb-3">{say("参考にした条件", "FACTORS USED")}: {result.profile}</p>}
              <p className="text-sm text-neutral-300 leading-relaxed mb-4">{result.reason}</p>
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
