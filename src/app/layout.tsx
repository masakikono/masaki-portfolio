import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
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

// 高級感を演出するセリフ体
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Masaki Kono | Coffee Professional & Photographer",
  description: "Personal portfolio of Masaki Kono. Roaster, Barista, and Photographer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth overflow-x-clip">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased min-h-screen bg-background text-foreground flex flex-col font-light selection:bg-neutral-800 selection:text-white overflow-x-clip w-full`}
      >
        <LanguageProvider>
          <div className="relative w-full overflow-x-clip flex flex-col min-h-screen">
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
