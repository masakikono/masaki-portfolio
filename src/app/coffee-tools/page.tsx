import type { Metadata } from "next";
import CoffeeTools from "@/components/CoffeeTools";

export const metadata: Metadata = {
  title: "Coffee Tools",
  description: "Free coffee tools by Masaki Kono: extraction yield calculator, live roast timer and hand-drip taste advisor. No account required.",
  alternates: { canonical: "/coffee-tools" },
};

export default function CoffeeToolsPage() {
  return <CoffeeTools />;
}
