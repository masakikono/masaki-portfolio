import Contact from "@/components/Contact";

export const metadata = {
  title: "Contact",
  description: "Book a 15-minute discovery call or reach out to Masaki Kono for coffee consulting, photography, and development projects.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 w-full pt-16">
      <Contact />
    </main>
  );
}
