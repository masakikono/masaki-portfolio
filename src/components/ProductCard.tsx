"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: string;
    description: string;
    image: string;
    checkoutUrl: string;
    buttonText?: string;
    disabled?: boolean;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { t } = useLanguage();
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
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050a15] via-transparent to-transparent opacity-60" />
        
        {/* Price Tag */}
        {product.price && (
          <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <span className="text-white tracking-widest">{product.price}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8">
        <h3 className="text-2xl text-white mb-3 group-hover:text-[#daa520] transition-colors">
          {product.name}
        </h3>
        <p className="text-sm font-light text-neutral-400 mb-8 leading-relaxed line-clamp-2">
          {product.description}
        </p>

        {product.disabled ? (
          <button disabled className="w-full py-4 rounded-xl bg-white/20 text-white opacity-50">{product.buttonText || t.products.buyNow}</button>
        ) : (
          <a href={product.checkoutUrl} target={product.checkoutUrl.startsWith("https://") ? "_blank" : undefined} rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 py-4 bg-white text-[#050a15] rounded-xl font-semibold tracking-widest uppercase text-xs hover:bg-[#daa520] focus-visible:outline-2 focus-visible:outline-[#daa520]">
            <ShoppingBag className="w-4 h-4" />
            {product.buttonText || t.products.buyNow}
            <ArrowRight className="w-4 h-4" />
          </a>
        )}
      </div>

      {/* Decorative Brand Accent */}
      <div className="absolute top-0 left-0 w-1 h-0 group-hover:h-full bg-[#daa520] transition-all duration-700" />
    </motion.div>
  );
};

export default ProductCard;
