"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const GalleryItem = ({ img, index }: { img: any, index: number }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -40 : 40]);

  return (
    <motion.div 
      style={{ y }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      className={`relative overflow-hidden bg-[#0a1525] rounded-[2.5rem] cursor-pointer group shadow-2xl mb-12 w-full ${img.height} border border-white/5`}
    >
      <Image
        src={img.src}
        alt="Portfolio moment"
        fill
        className={`object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 group-hover:scale-105 ${img.position}`}
        loading="lazy"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute top-10 right-10 w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#daa520] transition-colors duration-500" />
    </motion.div>
  );
};

const Gallery = () => {
  const images = [
    { id: 1, src: "/images/laughing-outdoors.jpg", height: "h-[600px]", position: "object-[center_15%]" },
    { id: 2, src: "/images/kaf-coffee.jpg", height: "h-[400px]", position: "object-center" },
    { id: 3, src: "/images/laughing-laptop.jpg", height: "h-[650px]", position: "object-[center_10%]" },
    { id: 4, src: "/images/blue-lagoon-sign.jpg", height: "h-[350px]", position: "object-center" },
    { id: 5, src: "/images/Iceland.jpg", height: "h-[500px]", position: "object-center" },
    { id: 6, src: "/images/blue-lagoon-drink.jpg", height: "h-[450px]", position: "object-center" },
  ];

  return (
    <section id="portfolio" className="py-40 px-6 max-w-7xl mx-auto overflow-visible relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-32"
      >
        <span className="text-[10px] font-bold tracking-[0.8em] uppercase text-[#daa520] mb-6 block">Gallery</span>
        <h2 className="text-4xl md:text-6xl font-light text-white tracking-tight uppercase">
          Portfolio
        </h2>
      </motion.div>
      
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-10 space-y-10">
        {images.map((img, index) => (
          <GalleryItem key={img.id} img={img} index={index} />
        ))}
      </div>

      <div className="mt-48 text-center opacity-10">
         <span className="text-[10px] font-bold tracking-[1.5em] text-white uppercase">Archive 2024</span>
      </div>
    </section>
  );
};

export default Gallery;
