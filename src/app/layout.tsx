import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  metadataBase: new URL("https://masaki-portfolio.vercel.app"),
  title: {
    default: "Masaki Kono | Coffee Professional & AI Developer",
    template: "%s | Masaki Kono",
  },
  description: "Personal portfolio of Masaki Kono. Seamlessly bridging world-class specialty coffee, B2B sales experience, and AI-driven software development.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Masaki Kono",
  url: "https://masaki-portfolio.vercel.app",
  jobTitle: "Coffee Professional & AI Developer",
  workLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" } },
  sameAs: [
    "https://github.com/masakikono",
    "https://www.linkedin.com/in/masakikono19931015/",
    "https://www.instagram.com/masaki_kono_3.0/",
    "https://note.com/masaki_19931015",
    "https://substack.com/@masakikono",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground flex flex-col font-light selection:bg-neutral-800 selection:text-white overflow-x-hidden w-full`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <div className="relative w-full overflow-x-hidden flex flex-col min-h-screen">
            <Header />
            <div className="flex-1 w-full flex flex-col">
              {children}
            </div>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
