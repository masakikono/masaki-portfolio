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

    try {
      const response = await fetch("/api/contact", {
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

      {/* Contact Options */}
      <div className="w-full max-w-3xl border border-white/10 bg-white/5 rounded-2xl p-8 md:p-12 backdrop-blur-sm mx-auto mb-24 flex flex-col items-center">
        <p className="text-sm font-light text-neutral-400 mb-8 leading-relaxed text-center">
          コンサルティングのご依頼やカジュアル面談のご予約は、<br className="hidden md:block" />以下のカレンダーより直接日時をご指定いただけます。
        </p>

        {/* Primary CTA: Book a Meeting (Google Calendar) */}
        <a 
          href="https://calendar.app.google/ekrsVZwBTgKx9YnV8"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative overflow-hidden bg-[#daa520] text-[#050a15] px-8 py-5 rounded-sm flex items-center justify-center gap-3 w-full max-w-sm mb-12 transition-transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(218,165,32,0.4)]"
        >
          <div className="absolute inset-0 bg-white transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          <Calendar className="w-5 h-5 relative z-10 text-[#050a15] transition-colors duration-300" />
          <span className="text-[12px] font-bold tracking-[0.2em] uppercase relative z-10 text-[#050a15] transition-colors duration-300">
            BOOK A MEETING
          </span>
        </a>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-10 relative flex justify-center">
          <span className="absolute top-1/2 transform -translate-y-1/2 bg-[#0a1525] px-4 text-[10px] tracking-widest text-neutral-500 uppercase">
            Or Contact Via
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
          {/* LinkedIn */}
          <a 
            href="https://www.linkedin.com/in/masakikono19931015/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-white text-black px-6 py-4 rounded-sm flex items-center justify-center gap-3 w-full md:w-auto min-w-[180px] border border-white transition-transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-[#daa520] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <svg className="w-4 h-4 relative z-10 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase relative z-10 group-hover:text-white transition-colors duration-300">
              LINKEDIN
            </span>
          </a>

          {/* Email */}
          <a
            href="mailto:masaki19931015@gmail.com"
            className="group relative overflow-hidden bg-transparent text-white px-6 py-4 rounded-sm flex items-center justify-center gap-3 w-full md:w-auto min-w-[180px] border border-white/20 transition-all hover:border-white hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <Mail className="w-4 h-4 relative z-10 text-[#daa520] group-hover:text-black transition-colors duration-300" />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase relative z-10 text-white group-hover:text-black transition-colors duration-300">
              EMAIL
            </span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/masaki_kono_3.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-transparent text-white px-6 py-4 rounded-sm flex items-center justify-center gap-3 w-full md:w-auto min-w-[180px] border border-white/20 transition-all hover:border-white hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <svg className="w-4 h-4 relative z-10 text-[#daa520] group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase relative z-10 text-white group-hover:text-white transition-colors duration-300">
              INSTAGRAM
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
