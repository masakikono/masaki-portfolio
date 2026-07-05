import React from "react";
import Journey from "@/components/Journey";

export const metadata = {
  title: "Career Journey",
  description: "Masaki Kono's career across Tokyo, Melbourne, Oslo, and London — from B2B medical device sales to senior barista, roaster, and AI developer.",
};

export default function JourneyPage() {
  return (
    <main className="flex-1 w-full flex flex-col pt-16">
      <Journey />
    </main>
  );
}
