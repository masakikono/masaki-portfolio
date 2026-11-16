import type { Metadata } from "next";
import CoffeeTools from "@/components/CoffeeTools";

export const metadata: Metadata = {
  title: "Coffee Tools",
  description: "Free coffee tools by Masaki Kono: extraction yield calculator and live roast timer with development time ratio. No account required.",
  alternates: { canonical: "/coffee-tools" },
};

export default function CoffeeToolsPage() {
  return <CoffeeTools />;
}
