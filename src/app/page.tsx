import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

// Lazy load the About component (and any heavy animations within it like Activity)
const About = dynamic(() => import("@/components/About"), { 
  ssr: true,
  // Add a simple fallback for smoother experience if needed, though default is fine
});

export default function Home() {
  return (
    <main className="w-full flex flex-col overflow-hidden">
      <Hero />
      <About />
    </main>
  );
}
