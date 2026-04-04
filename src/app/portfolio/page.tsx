import React from "react";
import Gallery from "@/components/Gallery";

export default function PortfolioPage() {
  return (
    <main className="flex-1 w-full flex flex-col pt-16">
      <div className="py-24">
        <Gallery />
      </div>
    </main>
  );
}
