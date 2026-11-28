import type { Metadata } from "next";
import CoffeeTools from "@/components/CoffeeTools";

export const metadata: Metadata = {
  title: "Coffee Tools",
  description: "Coffee tools by Masaki Kono: free extraction yield calculator, roast timer, brew taste advisor, and an owner-only cupping journal prototype.",
  alternates: { canonical: "/coffee-tools" },
};

export default function CoffeeToolsPage() {
  return <CoffeeTools />;
}
