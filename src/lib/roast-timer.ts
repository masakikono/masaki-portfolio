export type Roast = {
  id: string;
  start: number | null;
  crack: number | null;
  end: number | null;
  bean: string;
  weight: string;
  notes: string;
  target: number;
};

export type RoastStore = { current: Roast; history: Roast[] };
export const ROAST_STORAGE_KEY = "mk_roast_timer_v1";
export const newRoast = (target = 20): Roast => ({
  id: "", start: null, crack: null, end: null, bean: "", weight: "", notes: "", target,
});

export function roastMetrics(roast: Roast, now: number) {
  const total = roast.start === null ? 0 : Math.max(0, (roast.end ?? now) - roast.start);
  const development = roast.crack === null ? null : Math.max(0, (roast.end ?? now) - roast.crack);
  return { total, development, ratio: development === null || total === 0 ? null : development / total * 100 };
}

export function targetTime(roast: Roast) {
  if (roast.start === null || roast.crack === null) return null;
  return roast.start + (roast.crack - roast.start) / (1 - roast.target / 100);
}

export function formatTime(ms: number | null) {
  if (ms === null) return "—:—";
  const seconds = Math.floor(Math.max(0, ms) / 1000);
  return `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

export function parseTime(value: string) {
  const match = /^(\d{1,4}):([0-5]\d)$/.exec(value.trim());
  return match ? (Number(match[1]) * 60 + Number(match[2])) * 1000 : null;
}

function isRoast(value: unknown): value is Roast {
  if (!value || typeof value !== "object") return false;
  const r = value as Roast;
  const timestamp = (n: unknown) => n === null || (typeof n === "number" && Number.isFinite(n) && n > 0);
  return typeof r.id === "string" && typeof r.bean === "string" && typeof r.weight === "string" &&
    typeof r.notes === "string" && Number.isFinite(r.target) && r.target >= 1 && r.target <= 80 &&
    timestamp(r.start) && timestamp(r.crack) && timestamp(r.end) &&
    (r.start === null ? r.crack === null && r.end === null :
      r.id.length > 0 && (r.crack === null || r.crack > r.start) && (r.end === null || r.end > r.start)) &&
    (r.crack === null || r.end === null || r.crack <= r.end);
}

export function readRoastStore(raw: string | null): RoastStore {
  if (!raw) return { current: newRoast(), history: [] };
  const value = JSON.parse(raw) as RoastStore;
  if (!value || !isRoast(value.current) || !Array.isArray(value.history) ||
      !value.history.every(r => isRoast(r) && r.end !== null)) throw new Error("Invalid roast data");
  return { current: value.current, history: value.history.slice(0, 50) };
}

// Upsert by batch ID: corrections after stopping must not duplicate a roast.
export function updateRoast(store: RoastStore, current: Roast): RoastStore {
  const history = current.end === null ? store.history :
    [current, ...store.history.filter(r => r.id !== current.id)].slice(0, 50);
  return { current, history };
}

export function roastsCsv(history: Roast[]) {
  const quote = (value: string | number) => {
    let text = String(value);
    if (/^\s*[=+@\-]/.test(text) || /^[\t\r\n]/.test(text)) text = "'" + text;
    return `"${text.replaceAll('"', '""')}"`;
  };
  const rows = [
    ["Started (UTC)", "Bean / lot", "Dose (g)", "Total", "First crack", "Development", "DTR (%)", "Target DTR (%)", "Notes"],
    ...history.map(r => {
      const m = roastMetrics(r, r.end ?? r.start ?? 0);
      return [new Date(r.start!).toISOString(), r.bean, r.weight, formatTime(m.total),
        r.crack === null ? "" : formatTime(r.crack - r.start!),
        m.development === null ? "" : formatTime(m.development), m.ratio?.toFixed(2) ?? "", r.target, r.notes];
    }),
  ];
  return "\ufeff" + rows.map(row => row.map(quote).join(",")).join("\r\n");
}
