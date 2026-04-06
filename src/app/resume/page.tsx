"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, MapPin, Printer } from "lucide-react";

export default function ResumePage() {
  const { t } = useLanguage();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white text-black min-h-screen py-16 px-4 md:px-12 lg:px-24 w-full">
      <div className="max-w-4xl mx-auto bg-white print:bg-white print:p-0">
        
        {/* Action Bar (Hidden in Print) */}
        <div className="flex justify-end mb-12 print:hidden gap-4">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-neutral-800 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print / Save PDF
          </button>
        </div>

        {/* CV Content */}
        <div className="print:block text-black print:text-black">
          {/* Header */}
          <header className="border-b-2 border-black pb-8 mb-8 text-black">
            <h1 className="text-4xl md:text-6xl font-serif font-bold uppercase mb-2 text-black">MASAKI KONO</h1>
            <h2 className="text-xl tracking-widest text-neutral-600 uppercase mb-8 font-semibold">Coffee × AI × Traveler</h2>
            
            <div className="flex flex-col md:flex-row gap-6 text-sm font-medium text-black">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-black" /> London, UK (Available for Remote)
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-black" /> masaki.kono.contact@example.com
              </div>
            </div>
          </header>

          {/* Profile */}
          <section className="mb-10 text-black">
            <h3 className="text-lg font-bold uppercase tracking-widest border-b border-neutral-300 pb-2 mb-4 text-black">Profile</h3>
            <p className="text-sm leading-relaxed text-black whitespace-pre-line font-medium">
              {t.about.content}
            </p>
          </section>

          {/* Experience */}
          <section className="mb-10 text-black">
            <h3 className="text-lg font-bold uppercase tracking-widest border-b border-neutral-300 pb-2 mb-4 text-black">Professional Experience</h3>
            <div className="space-y-6">
              {t.journey.items.map((item: any, i: number) => (
                <div key={i} className="flex flex-col md:flex-row md:gap-8">
                  <div className="w-full md:w-1/4 flex-shrink-0 text-sm font-bold text-neutral-600 mb-1 md:mb-0">
                    {item.year}
                  </div>
                  <div className="w-full md:w-3/4">
                    <h4 className="text-base font-bold text-black">{item.role}</h4>
                    <div className="text-xs font-bold tracking-widest text-neutral-500 mb-2 uppercase">{item.location}</div>
                    <p className="text-sm text-black leading-relaxed font-medium">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="mb-10 text-black">
            <h3 className="text-lg font-bold uppercase tracking-widest border-b border-neutral-300 pb-2 mb-4 text-black">Selected Projects</h3>
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:gap-8">
                <div className="w-full md:w-1/4 flex-shrink-0 text-sm font-bold text-neutral-600 mb-1 md:mb-0">
                  2026
                </div>
                <div className="w-full md:w-3/4">
                  <h4 className="text-base font-bold text-black">{(t.work as any).projects?.artera?.name || "ARTERA Strategist"}</h4>
                  <div className="text-xs font-bold tracking-widest text-neutral-500 mb-4 uppercase">{(t.work as any).projects?.artera?.role || "Frontend Developer"}</div>
                  
                  <div className="space-y-3">
                    <p className="text-sm text-black leading-relaxed font-medium">
                      <strong className="text-neutral-700">Problem:</strong> {(t.work as any).projects?.artera?.problem}
                    </p>
                    <p className="text-sm text-black leading-relaxed font-medium">
                      <strong className="text-neutral-700">Solution:</strong> {(t.work as any).projects?.artera?.solution}
                    </p>
                    <p className="text-sm text-black leading-relaxed font-medium">
                      <strong className="text-neutral-700">Result:</strong> {(t.work as any).projects?.artera?.result}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
