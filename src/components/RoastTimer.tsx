"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, Download, Flame, Timer } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { formatTime, newRoast, parseTime, readRoastStore, ROAST_STORAGE_KEY, roastMetrics, roastsCsv, targetTime, updateRoast } from "@/lib/roast-timer";
import type { Roast, RoastStore } from "@/lib/roast-timer";
import styles from "./RoastTimer.module.css";

export default function RoastTimer() {
  const { lang } = useLanguage();
  const jp = lang === "ja";
  const text = (ja: string, en: string) => jp ? ja : en;
  const [store, setStore] = useState<RoastStore>({ current: newRoast(), history: [] });
  const storeRef = useRef(store);
  const [ready, setReady] = useState(false);
  const [now, setNow] = useState(0);
  const [storageError, setStorageError] = useState(false);
  const [editing, setEditing] = useState(false);
  const [crackInput, setCrackInput] = useState("");
  const [editError, setEditError] = useState(false);
  const [targetInput, setTargetInput] = useState("20");
  const [keepAwake, setKeepAwake] = useState(true);
  const [wakeStatus, setWakeStatus] = useState<"off" | "on" | "unavailable">("off");
  const [notice, setNotice] = useState<"restored" | "saved" | "corrected" | null>(null);
  const current = store.current;
  const running = current.start !== null && current.end === null;
  const done = current.end !== null;
  const metrics = roastMetrics(current, now);
  const goal = targetTime(current);

  useEffect(() => {
    try {
      const saved = readRoastStore(localStorage.getItem(ROAST_STORAGE_KEY));
      storeRef.current = saved;
      setStore(saved);
      setTargetInput(String(saved.current.target));
      if (saved.current.start !== null && saved.current.end === null) setNotice("restored");
    } catch { setStorageError(true); }
    setNow(Date.now());
    setReady(true);
    // Another tab's explicit changes are reflected without a second save loop.
    const sync = (event: StorageEvent) => {
      if (event.key !== ROAST_STORAGE_KEY) return;
      try {
        const saved = readRoastStore(event.newValue);
        storeRef.current = saved;
        setStore(saved);
        setTargetInput(String(saved.current.target));
        setNow(Date.now());
      } catch { setStorageError(true); }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  useEffect(() => {
    if (!running) return;
    const tick = () => setNow(Date.now());
    const interval = window.setInterval(tick, 250);
    document.addEventListener("visibilitychange", tick);
    return () => { clearInterval(interval); document.removeEventListener("visibilitychange", tick); };
  }, [running]);

  useEffect(() => {
    let cancelled = false;
    let lock: WakeLockSentinel | null = null;
    let pending = false;
    async function acquire() {
      if (cancelled || pending || lock || document.visibilityState !== "visible") return;
      if (!("wakeLock" in navigator)) { setWakeStatus("unavailable"); return; }
      pending = true;
      try {
        const acquired = await navigator.wakeLock.request("screen");
        if (cancelled) { await acquired.release(); return; }
        lock = acquired;
        setWakeStatus("on");
        acquired.addEventListener("release", () => { lock = null; if (!cancelled) setWakeStatus("off"); });
      } catch { if (!cancelled) setWakeStatus("unavailable"); }
      finally { pending = false; }
    }
    if (running && keepAwake) {
      void acquire();
      document.addEventListener("visibilitychange", acquire);
    } else setWakeStatus("off");
    return () => { cancelled = true; document.removeEventListener("visibilitychange", acquire); void lock?.release().catch(() => {}); };
  }, [running, keepAwake]);

  function change(transform: (previous: Roast) => Roast) {
    if (!ready) return;
    const next = updateRoast(storeRef.current, transform(storeRef.current.current));
    storeRef.current = next;
    setStore(next);
    setNow(Date.now());
    // Save on the action, rather than waiting for a background timer/effect.
    try { localStorage.setItem(ROAST_STORAGE_KEY, JSON.stringify(next)); setStorageError(false); }
    catch { setStorageError(true); }
  }

  function start() {
    change(r => r.start !== null ? r : { ...r, id: crypto.randomUUID(), start: Date.now() });
    setNotice(null);
  }
  function firstCrack() {
    change(r => r.start === null || r.end !== null || r.crack !== null ? r : { ...r, crack: Math.max(r.start + 1, Date.now()) });
    setNotice(null);
  }
  function finish() {
    const r = storeRef.current.current;
    if (r.start === null || r.end !== null) return;
    if (r.crack === null && !window.confirm(text("1ハゼが未記録です。DTRなしで焙煎を終了しますか？", "First crack is not recorded. Finish without a DTR?"))) return;
    change(r => ({ ...r, end: Math.max(r.crack ?? r.start! + 1, Date.now()) }));
    setNotice("saved");
    setEditing(false);
  }
  function correctCrack() {
    const ms = parseTime(crackInput);
    const r = storeRef.current.current;
    if (r.start === null || ms === null || ms <= 0 || ms > roastMetrics(r, Date.now()).total) { setEditError(true); return; }
    change(r => ({ ...r, crack: r.start! + ms }));
    setEditing(false);
    setNotice("corrected");
  }
  function exportCsv() {
    const url = URL.createObjectURL(new Blob([roastsCsv(storeRef.current.history)], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `roast-journal-${new Date().toLocaleDateString("sv-SE")}.csv`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  return (
    <main className={styles.root} lang={jp ? "ja" : "en"}>
      <div className={styles.container}>
        <Link href="/products" className={styles.back}><ArrowLeft size={14} /> SERVICES</Link>
        <div className={styles.heading}>
          <div><p className={styles.eyebrow}>STORK / COFFEE TOOLS</p><h1>Roast Timer<span>{text("焙煎の時間を、見える形に。", "Make every moment of your roast count.")}</span></h1><p>{text("アウベルクラフトなど、手動焙煎のためのDTRタイマー。", "A development-time companion for hands-on coffee roasting.")}</p></div>
          <span className={styles.badge}>{text("無料 · ログイン不要", "FREE · NO SIGN-IN")}</span>
        </div>

        <div className={styles.layout}>
          <section className={styles.timer} aria-label={text("焙煎タイマー", "Roast timer")}>
            <div className={styles.topline}><span className={styles.status}>{done ? <Check size={13}/> : <span className={running ? styles.live : styles.dot}/>} {done ? text("焙煎完了", "COMPLETE") : running ? (current.crack === null ? text("焙煎中", "ROASTING") : "DEVELOPMENT") : text("準備完了", "READY TO ROAST")}</span><Flame size={20} strokeWidth={1}/></div>
            <p className={styles.timerLabel}>{text("総焙煎時間", "TOTAL ROAST TIME")}</p>
            <div className={styles.total} data-testid="roast-total">{formatTime(metrics.total)}</div>
            <div className={styles.metrics}>
              <div><p>DEVELOPMENT RATIO</p><div className={styles.ratio}><span data-testid="roast-dtr">{metrics.ratio === null ? "—" : metrics.ratio.toFixed(1)}</span><small>%</small></div><span>{text("総時間に占める1ハゼ以降の割合", "Share of time after first crack")}</span></div>
              <div><p>DEVELOPMENT TIME</p><div className={styles.dev} data-testid="roast-development">{formatTime(metrics.development)}</div><span>{text("1ハゼ開始からの時間", "Time since first crack")}</span></div>
            </div>
            <div className={styles.targetLine}><span>{text("目標", "TARGET")} <b>{current.target.toFixed(1)}%</b></span><span>{goal === null ? text("1ハゼ記録後に到達予定を表示", "Record first crack to estimate") : done ? text("最終値", "FINAL DTR") + " " + metrics.ratio!.toFixed(1) + "%" : now >= goal ? text("目標DTRに到達", "Target DTR reached") : text("目標まで ", "Target in ") + formatTime(Math.ceil((goal - now)/1000)*1000)}</span></div>
            <div className={styles.track}><div style={{width: `${Math.min(100, (metrics.ratio ?? 0)/current.target*100)}%`}}/></div>
            <p className={styles.prompt}>{done ? text("豆名やメモは終了後も編集できます。", "You can still edit the batch details and notes.") : running ? text("豆の色・香りを確認しながら判断しましょう。", "Watch the color and aroma as your roast develops.") : text("豆を投入したタイミングでスタート。", "Start the timer when you charge the beans.")}</p>
            <div className={styles.actions}>
              {current.start === null && <button className={styles.primary} disabled={!ready} onClick={start}><Timer size={18}/>{text("焙煎スタート", "Start roast")}<ArrowUpRight size={18}/></button>}
              {running && current.crack === null && <button className={styles.primary} onClick={firstCrack}>{text("1ハゼ開始を記録", "First crack")} ＋</button>}
              {running && <button className={styles.stop} onClick={finish}>{text("焙煎終了", "Finish roast")}</button>}
              {done && <button className={styles.primary} onClick={() => { change(r => newRoast(r.target)); setEditing(false); setNotice(null); }}>{text("次の焙煎へ", "Next roast")}<ArrowUpRight size={18}/></button>}
            </div>
            <div className={styles.crackRow}><span>{text("1ハゼ開始", "First crack")} <b data-testid="roast-crack">{current.crack === null ? text("未記録", "Not recorded") : formatTime(current.crack - current.start!)}</b></span><button disabled={current.start === null} onClick={() => { setCrackInput(current.crack === null ? "" : formatTime(current.crack-current.start!)); setEditError(false); setEditing(true); }}>{text("時刻を修正", "Edit time")}</button></div>
            {editing && <form className={styles.correction} onSubmit={e => { e.preventDefault(); correctCrack(); }}><label htmlFor="crack-time">{text("焙煎開始からの経過時間（分:秒）", "Elapsed time from roast start (mm:ss)")}</label><div><input id="crack-time" value={crackInput} onChange={e => setCrackInput(e.target.value)} placeholder="08:30" inputMode="text" autoFocus aria-describedby={editError ? "crack-error" : undefined}/><button type="submit">{text("反映", "Apply")}</button><button type="button" onClick={() => setEditing(false)}>{text("閉じる", "Close")}</button></div>{editError && <p id="crack-error" role="alert">{text("00:01〜総焙煎時間を「分:秒」で入力してください。", "Enter a time from 00:01 to the total roast time as mm:ss.")}</p>}{current.crack !== null && <button type="button" className={styles.textButton} onClick={() => { if(window.confirm(text("1ハゼの記録を取り消しますか？", "Remove the first-crack record?"))) {change(r=>({...r,crack:null})); setEditing(false);} }}>{text("1ハゼの記録を取り消す", "Remove first-crack record")}</button>}</form>}
            <p className={styles.hint}>{text("1ハゼは自動検知しません。音を聞いてタップしてください。", "First crack is recorded manually. Listen, then tap.")}</p>
            <p className={styles.notice} role="status">{notice === "restored" ? text("進行中の焙煎を復元しました。", "Your in-progress roast has been restored.") : notice === "saved" ? (storageError ? text("焙煎を終了しました。CSVで記録を保管してください。", "Roast finished. Export a CSV to keep your record.") : text("このブラウザに保存しました。", "Saved in this browser.")) : notice === "corrected" ? text("1ハゼ開始時刻を修正しました。", "First-crack time updated.") : ""}</p>
          </section>

          <aside>
            <section className={styles.details}><p className={styles.eyebrow}>BATCH DETAILS / 01</p><h2>{text("今回の焙煎", "Your batch")}</h2><fieldset disabled={!ready}>
              <label htmlFor="bean-name">{text("豆・ロット名", "Bean / lot")}</label><input id="bean-name" maxLength={100} value={current.bean} onChange={e => change(r=>({...r,bean:e.target.value}))} placeholder="Simalem / Natural"/>
              <div className={styles.pair}><div><label htmlFor="dose">{text("投入量 (g)", "Dose (g)")}</label><input id="dose" type="number" min="1" max="10000" value={current.weight} onChange={e=>change(r=>({...r,weight:e.target.value}))} placeholder="120"/></div><div><label htmlFor="target-dtr">{text("目標 DTR (%)", "Target DTR (%)")}</label><input id="target-dtr" type="number" min="1" max="80" step="0.1" value={targetInput} onChange={e=>{const value=e.target.value;setTargetInput(value);const target=Number(value);if(value!==""&&target>=1&&target<=80)change(r=>({...r,target}));}} onBlur={()=>setTargetInput(String(storeRef.current.current.target))}/></div></div>
              <p className={styles.hint}>{text("20%は入力例です。豆や狙う味に合わせて設定。", "20% is a starting input, not a universal recommendation.")}</p>
              <label htmlFor="roast-notes">{text("焙煎メモ", "Roast notes")}</label><textarea id="roast-notes" rows={3} maxLength={2000} value={current.notes} onChange={e=>change(r=>({...r,notes:e.target.value}))} placeholder={text("火力、香り、色の変化など…", "Heat, aroma, color changes…")}/>
              <label className={styles.switch} htmlFor="keep-awake"><span>{text("画面を点灯したままにする", "Keep screen awake")}</span><input id="keep-awake" type="checkbox" checked={keepAwake} onChange={e=>setKeepAwake(e.target.checked)}/></label>
              <p className={styles.hint}>{wakeStatus === "on" ? text("画面の点灯を維持しています。", "Screen wake lock is active.") : wakeStatus === "unavailable" ? text("点灯維持は利用できません。端末の自動ロック設定を確認してください。", "Wake lock is unavailable. Check your device’s auto-lock settings.") : text("対応ブラウザで、焙煎中に有効になります。", "Available during a roast in supported browsers.")}</p>
            </fieldset></section>
            <div className={styles.note}><span>i</span><div><h3>{text("数字は、味を考える手がかり。", "A reference, not a recipe.")}</h3><p>{text("DTR = 1ハゼ開始からの時間 ÷ 総焙煎時間 × 100。同じDTRでも、火力や総時間で味は変わります。", "DTR = time since first crack ÷ total roast time × 100. Heat and total time still matter, even at the same DTR.")}</p></div></div>
          </aside>
        </div>

        {storageError && <p className={styles.warning} role="alert">{text("ブラウザの保存領域を利用できないか、保存データを読み込めませんでした。記録はCSVで保管してください。", "Browser storage is unavailable or saved data could not be read. Export your records as CSV.")}</p>}
        <section className={styles.journal}><div className={styles.journalHeading}><div><p className={styles.eyebrow}>YOUR ROAST JOURNAL</p><h2>{text("焙煎の記録", "Roast journal")} <span>{String(store.history.length).padStart(2,"0")}</span></h2></div><button className={styles.export} disabled={!store.history.length} onClick={exportCsv}><Download size={14}/>{text("CSVを書き出す", "Export CSV")}</button></div>
          {!store.history.length ? <div className={styles.empty}><Timer size={24} strokeWidth={1}/><p>{text("まだ焙煎の記録はありません。", "Your first roast starts here.")}</p><span>{text("焙煎が終わると、ここに記録が並びます。", "Completed roasts will appear in your journal.")}</span></div> : store.history.map(r=>{const m=roastMetrics(r,r.end!);return <article className={styles.record} key={r.id}><div className={styles.recordName}><small>{new Date(r.start!).toLocaleString(jp ? "ja-JP" : "en-GB",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})}</small><h3>{r.bean || text("名称未設定", "Untitled roast")}{r.weight ? ` / ${r.weight}g` : ""}</h3></div><div><small>{text("総時間", "TOTAL")}</small><b>{formatTime(m.total)}</b></div><div><small>DEVELOPMENT</small><b>{formatTime(m.development)}</b></div><div><small>DTR</small><b>{m.ratio === null ? "—" : `${m.ratio.toFixed(1)}%`}</b></div>{r.notes&&<p className={styles.recordNotes}>{r.notes}</p>}</article>;})}
          <p className={styles.hint}>{text("記録はこの端末・ブラウザに最大50件保存。端末間の同期はありません。ブラウザのデータ削除で消えるため、必要な記録はCSVで保管してください。", "Up to 50 roasts are stored in this browser only. There is no cross-device sync. Clearing browser data removes them; export important records as CSV.")}</p>
        </section>
        <div className={styles.bottom}><span>SMALL BATCH, YOUR PACE.</span><span>{text("焙煎中は火元から離れず、スマホは熱源から離して設置。", "Attend your roast and keep your phone away from the heat.")}</span></div>
      </div>
    </main>
  );
}
