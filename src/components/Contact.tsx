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
      <h2 className="text-3xl lg:text-5xl font-serif mb-6 text-white">{contactData.title}</h2>
      <p className="text-base md:text-lg font-light text-neutral-400 max-w-2xl mb-16 leading-relaxed">
        {contactData.content}
      </p>

      {/* Main Call To Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-24 w-full justify-center">
        <button 
          onClick={() => setIsCalendlyOpen(true)}
          className="group relative overflow-hidden bg-white text-black px-8 py-5 rounded-sm flex items-center justify-center gap-3 w-full sm:w-auto min-w-[280px] border border-white transition-transform hover:-translate-y-1 cursor-pointer"
        >
          <div className="absolute inset-0 bg-[#daa520] transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          <Calendar className="w-5 h-5 relative z-10 group-hover:text-white transition-colors duration-300" />
          <span className="text-xs font-bold tracking-[0.2em] uppercase relative z-10 group-hover:text-white transition-colors duration-300">
            {contactData.bookCall || "15-MIN DISCOVERY CALL"}
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

        {status === "success" ? (
          <div className="p-8 border border-border bg-white/5 backdrop-blur-md rounded-2xl text-foreground space-y-4">
            <h3 className="text-lg tracking-widest uppercase text-[#daa520]">Message Sent.</h3>
            <p className="font-light text-muted text-sm">確認次第、ご返信いたします。</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-8 text-left bg-white/5 border border-white/5 p-8 rounded-2xl backdrop-blur-sm">
            <div>
              <label htmlFor="name" className="block text-[10px] uppercase tracking-widest text-[#8892B0] mb-2">Name</label>
              <input type="text" id="name" name="name" required className="w-full bg-transparent border-b border-[#172A45] py-2 text-foreground focus:outline-none focus:border-[#daa520] transition-colors font-light text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-[#8892B0] mb-2">Email</label>
              <input type="email" id="email" name="email" required className="w-full bg-transparent border-b border-[#172A45] py-2 text-foreground focus:outline-none focus:border-[#daa520] transition-colors font-light text-sm" />
            </div>
            <div>
              <label htmlFor="message" className="block text-[10px] uppercase tracking-widest text-[#8892B0] mb-2">Message</label>
              <textarea id="message" name="message" rows={4} required className="w-full bg-transparent border-b border-[#172A45] py-2 text-foreground focus:outline-none focus:border-[#daa520] transition-colors font-light text-sm resize-none"></textarea>
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-6 border border-[#172A45] px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-[#daa520] hover:border-[#daa520] hover:text-black transition-all duration-300 disabled:opacity-50 mx-auto w-full md:w-auto"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
            {status === "error" && (
              <p className="text-red-500 text-xs mt-4 text-center">送信に失敗しました。時間をおいて再度お試しください。</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
