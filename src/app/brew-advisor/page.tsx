import type { Metadata } from "next";
import BrewAdvisor from "@/components/BrewAdvisor";

export const metadata: Metadata = {
  title: "Brew Taste Advisor | Coffee Tools",
  description: "Free hand-drip coffee taste advisor. Describe a weak, sour, bitter or heavy cup and get practical next-brew adjustments. No sign-in required. ハンドドリップの味から改善案を提案。",
  alternates: { canonical: "/brew-advisor" },
};

export default function BrewAdvisorPage() {
  return <BrewAdvisor />;
}
