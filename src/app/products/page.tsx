"use client";

import React from "react";
import ProductCard from "@/components/ProductCard";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Coffee, ShoppingCart, ShieldCheck, Truck } from "lucide-react";

export default function ProductsPage() {
  const { t } = useLanguage();
  const productsData = t.products as any;

  if (!productsData || !productsData.items) return null;

  return (
    <main className="flex-1 w-full bg-[#050a15] pt-32 pb-48 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <section className="relative mb-32 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="w-24 h-24 mb-10 rounded-full bg-[#daa520]/10 flex items-center justify-center text-[#daa520] border border-[#daa520]/20"
            >
                <Coffee className="w-10 h-10" />
            </motion.div>
            
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl text-white text-center mb-8 tracking-tight"
            >
                {productsData.title}
            </motion.h1>
            
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl font-light text-neutral-400 max-w-2xl text-center leading-relaxed"
            >
                {productsData.content}
            </motion.p>

            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#daa520]/5 rounded-full blur-[120px] -z-10" />
        </section>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-5xl mx-auto mb-40">
          {productsData.items.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Trust/Feature Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-24 max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-2xl bg-white/5 mb-6">
                    <ShieldCheck className="w-8 h-8 text-[#daa520]" />
                </div>
                <h4 className="text-white font-semibold mb-3 tracking-widest text-xs uppercase">Secure Checkout</h4>
                <p className="text-sm text-neutral-500 font-light">Payments powered by Shopify for maximum security and peace of mind.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-2xl bg-white/5 mb-6">
                    <Truck className="w-8 h-8 text-[#daa520]" />
                </div>
                <h4 className="text-white font-semibold mb-3 tracking-widest text-xs uppercase">Global Logistics</h4>
                <p className="text-sm text-neutral-500 font-light">Worldwide shipping from London and Tokyo. Tracking included with every order.</p>
            </div>
            
            <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-2xl bg-white/5 mb-6">
                    <ShoppingCart className="w-8 h-8 text-[#daa520]" />
                </div>
                <h4 className="text-white font-semibold mb-3 tracking-widest text-xs uppercase">Direct Sourcing</h4>
                <p className="text-sm text-neutral-500 font-light">We work directly with makers and roasters to bring you the finest quality gear.</p>
            </div>
        </div>
      </div>
    </main>
  );
}
