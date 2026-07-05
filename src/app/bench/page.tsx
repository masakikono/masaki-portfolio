import React from "react";
import BaristaBench from "@/components/BaristaBench";

export const metadata = {
  title: "EY Calculator",
  description: "Free extraction yield (EY) calculator for baristas. Instantly compute extraction yield from dose, beverage weight, and TDS.",
};

export default function BenchPage() {
  return (
    <main className="flex-1 w-full flex flex-col">
      <BaristaBench />
    </main>
  );
}
