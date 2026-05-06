// @ts-nocheck
/* eslint-disable */
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, Download, Mail } from "lucide-react";
import { PopupModal } from "react-calendly";

const Contact = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    data.access_key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY as string;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 200) { setStatus("success"); } 
      else { setStatus("error"); }
    } catch (error) {
      setStatus("error");
    }
  };

  const contactData = t.contact as any;

  return (
    <section id="contact" className="py-40 px-6 max-w-5xl mx-auto flex flex-col items-center justify-center text-center mt-12">
      <h2 className="text-3xl lg:text-5xl mb-6 text-white">{contactData.title}</h2>
      <p className="text-base md:text-lg font-light text-neutral-400 max-w-2xl mb-16 leading-relaxed">
        {contactData.content}
      </p>

      {/* Main Call To Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-24 w-full justify-center">
        <button 
          onClick={() => window.open('https://calendar.google.com/calendar/u/0/appointments/schedules/...', '_blank')}
          className="group relative overflow-hidden bg-white text-black px-8 py-5 rounded-sm flex items-center justify-center gap-3 w-full sm:w-auto min-w-[280px] border border-white transition-transform hover:-translate-y-1 cursor-pointer"
        >
          <div className="absolute inset-0 bg-[#daa520] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          <Calendar className="w-5 h-5 relative z-10 group-hover:text-white transition-colors duration-300" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase relative z-10 group-hover:text-white transition-colors duration-300">
            {contactData.bookCall || "BOOK A SESSION (GOOGLE CALENDAR)"}
          </span>
        </button>

        <a 
          href="/resume"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden bg-transparent text-white px-8 py-5 rounded-sm flex items-center justify-center gap-3 w-full sm:w-auto min-w-[280px] border border-border hover:border-white transition-all hover:-translate-y-1"
        >
          <Download className="w-5 h-5" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase">
            {contactData.resume || "VIEW RESUME (PRINTABLE)"}
          </span>
        </a>
      </div>

      {isCalendlyOpen && (
        <PopupModal
          url="https://calendly.com/masakikono/15min"
          onModalClose={() => setIsCalendlyOpen(false)}
          open={isCalendlyOpen}
          rootElement={document.getElementById('__next') || document.body}
        />
      )}

      {/* Direct Message Form (Fallback) */}
      <div className="w-full max-w-lg border-t border-white/5 pt-16">
        <p className="text-xs tracking-widest text-[#8892B0] uppercase mb-8 flex items-center justify-center gap-2">
          <Mail className="w-4 h-4" /> Or send a direct message
        </p>

        <div className="flex flex-col space-y-6 text-center bg-white/5 border border-white/5 p-8 rounded-2xl backdrop-blur-sm">
          <p className="text-sm font-light text-neutral-400">
            お仕事のご依頼やお問い合わせは、以下のメールアドレス、またはInstagramのDMよりお気軽にご連絡ください。
          </p>
          <a
            href="mailto:masaki_19931015@yahoo.co.jp"
            className="border border-[#daa520] text-[#daa520] px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#daa520] hover:text-[#050a15] transition-all duration-300 mx-auto w-full md:w-auto"
          >
            SEND AN EMAIL
          </a>
          <a
            href="https://www.instagram.com/masaki_kono_3.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium tracking-widest text-neutral-400 hover:text-white transition-colors"
          >
            MESSAGE ON INSTAGRAM
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
