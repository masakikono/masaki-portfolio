"use client";

import React from "react";
import Image from "next/image";

const MOCK_IMAGES = [
  { id: 1, src: "/images/laughing-outdoors.jpg", alt: "Masaki laughing outdoors", width: 600, height: 800 },
  { id: 2, src: "/images/kaf-coffee.jpg", alt: "KAF Coffee", width: 600, height: 450 },
  { id: 3, src: "/images/blue-lagoon-drink.jpg", alt: "Blue lagoon lagoon drink", width: 600, height: 600 },
  { id: 4, src: "/images/laughing-laptop.jpg", alt: "Masaki at laptop", width: 600, height: 800 },
  { id: 5, src: "/images/blue-lagoon-sign.jpg", alt: "Blue lagoon sign", width: 600, height: 450 },
  { id: 6, src: "/images/Iceland.jpg", alt: "Iceland landscape", width: 600, height: 800 },
];

const breakpointColumnsObj = {
  default: 3,
  1024: 2,
  640: 1
};

const Gallery = () => {
  return (
    <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-sm md:text-base font-medium mb-16 tracking-[0.3em] uppercase text-muted text-center">Portfolio</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_IMAGES.map((img) => (
          <div key={img.id} className="relative group overflow-hidden bg-neutral-900 rounded-sm aspect-[4/5] w-full">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale hover:grayscale-0"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
