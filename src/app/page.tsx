import Hero from "@/components/Hero";
import Journey from "@/components/Journey";
import BaristaBench from "@/components/BaristaBench";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <main className="flex-1 w-full flex flex-col">
      <Hero />
      <div id="journey"><Journey /></div>
      <div id="bench"><BaristaBench /></div>
      <div id="portfolio"><Gallery /></div>
    </main>
  );
}
