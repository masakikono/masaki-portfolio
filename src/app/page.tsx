import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-light selection:bg-neutral-800 selection:text-white">
      <Header />
      <Hero />
      <div className="flex-1 w-full">
        <div id="about"><About /></div>
        <div id="portfolio"><Gallery /></div>
        <Work />
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
