import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";

export default function Home() {
  return (
    <main className="flex-1 w-full flex flex-col">
      <Hero />
      <About />
      <Work />
    </main>
  );
}
