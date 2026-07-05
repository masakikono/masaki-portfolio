import React from "react";
import Work from "@/components/Work";
import Gallery from "@/components/Gallery";

export const metadata = {
  title: "Portfolio",
  description:
    "Case studies and development projects by Masaki Kono — AI-integrated tools for the specialty coffee industry, built with Next.js and modern web technologies.",
};

export default function PortfolioPage() {
  return (
    <main className="flex-1 w-full flex flex-col pt-16">
      <Work />
      <div className="py-12">
        <Gallery />
      </div>
    </main>
  );
}
