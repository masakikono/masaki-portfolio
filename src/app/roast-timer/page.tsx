import type { Metadata } from "next";
import RoastTimer from "@/components/RoastTimer";

export const metadata: Metadata = {
  title: "Roast Timer · DTR Calculator",
  description: "Free coffee roasting timer with live development time ratio (DTR), first-crack logging and CSV export. No account required. 無料・登録不要の焙煎タイマー。",
  alternates: { canonical: "/roast-timer" },
};

export default function RoastTimerPage() {
  return <RoastTimer />;
}
