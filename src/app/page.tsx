import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";

export default function Home() {
  return (
    <main className="flex-1 w-full flex flex-col">
      <Hero />
      <div id="portfolio"><Gallery /></div>
    </main>
  );
}
