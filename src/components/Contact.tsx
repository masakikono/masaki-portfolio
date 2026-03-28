"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    data.access_key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY as string;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 200) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto flex flex-col items-center justify-center text-center mt-12">
      <h2 className="text-sm md:text-base font-medium mb-16 tracking-[0.3em] uppercase text-muted">{t.contact.title}</h2>

      <div className="w-full max-w-lg">
        {status === "success" ? (
          <div className="p-8 border border-border bg-background rounded-sm text-foreground space-y-4">
            <h3 className="text-lg tracking-widest uppercase">Thank you</h3>
            <p className="font-light text-muted">メッセージが送信されました。確認次第、ご返信いたします。</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col space-y-10 text-left">
            <div>
              <label htmlFor="name" className="block text-xs uppercase tracking-widest text-[#8892B0] mb-2">Name</label>
              <input type="text" id="name" name="name" required className="w-full bg-transparent border-b border-[#172A45] py-2 text-foreground focus:outline-none focus:border-[#8892B0] transition-colors font-light" />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs uppercase tracking-widest text-[#8892B0] mb-2">Email</label>
              <input type="email" id="email" name="email" required className="w-full bg-transparent border-b border-[#172A45] py-2 text-foreground focus:outline-none focus:border-[#8892B0] transition-colors font-light" />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs uppercase tracking-widest text-[#8892B0] mb-2">Message</label>
              <textarea id="message" name="message" rows={5} required className="w-full bg-transparent border-b border-[#172A45] py-2 text-foreground focus:outline-none focus:border-[#8892B0] transition-colors font-light resize-none"></textarea>
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-8 border border-[#172A45] px-8 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-50 mx-auto w-full md:w-auto"
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
