import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-light selection:bg-neutral-800 selection:text-white">
      <Hero />
      <div className="flex-1 w-full">
        <About />
        <Gallery />
      </div>
      <Footer />
    </main>
  );
}
