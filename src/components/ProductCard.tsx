"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: string;
    description: string;
    image: string;
    checkoutUrl: string;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { t } = useLanguage();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleBuyNow = () => {
    setIsRedirecting(true);
    // Simulate Shopify logic
    setTimeout(() => {
       setIsRedirecting(false);
       setIsCompleted(true);
       
       // In a real app: window.location.href = product.checkoutUrl;
       setTimeout(() => setIsCompleted(false), 3000);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-[#0a1525]/40 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl hover:border-[#daa520]/30 transition-all duration-500"
    >
      {/* Product Image */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a15] via-transparent to-transparent opacity-60" />
        
        {/* Price Tag */}
        <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <span className="text-white font-serif tracking-widest">{product.price}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-[#daa520] transition-colors">
          {product.name}
        </h3>
        <p className="text-sm font-light text-neutral-400 mb-8 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        <button 
          onClick={handleBuyNow}
          disabled={isRedirecting}
          className="w-full relative py-4 bg-white text-[#050a15] rounded-xl font-semibold tracking-widest uppercase text-xs overflow-hidden transition-transform active:scale-95 disabled:opacity-80"
        >
          <AnimatePresence mode="wait">
            {isRedirecting ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <div className="w-4 h-4 border-2 border-[#050a15]/20 border-t-[#050a15] rounded-full animate-spin" />
                <span>{t.products.checkoutRedirect}</span>
              </motion.div>
            ) : isCompleted ? (
              <motion.div 
                key="completed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 text-emerald-600"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Secure Link Ready</span>
              </motion.div>
            ) : (
              <motion.div 
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.products.buyNow}</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Decorative Brand Accent */}
      <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-[#daa520] transition-all duration-700" />
    </motion.div>
  );
};

export default ProductCard;
