"use client";

import React from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";

const MOCK_IMAGES = [
  { id: 1, src: "/images/laughing-outdoors.jpg", alt: "Masaki laughing outdoors", width: 600, height: 800 },
  { id: 2, src: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf", alt: "Coffee dummy 1", width: 600, height: 450 },
  { id: 3, src: "/images/blue-lagoon-drink.jpg", alt: "Blue lagoon lagoon drink", width: 600, height: 600 },
  { id: 4, src: "https://images.unsplash.com/photo-1495474472201-1b0337f71ab4", alt: "Coffee dummy 2", width: 600, height: 800 },
  { id: 5, src: "/images/blue-lagoon-sign.jpg", alt: "Blue lagoon sign", width: 600, height: 450 },
  { id: 6, src: "https://images.unsplash.com/photo-1511920170033-f8396924c348", alt: "Coffee dummy 3", width: 600, height: 800 },
];

const breakpointColumnsObj = {
  default: 3,
  1024: 2,
  640: 1
};

const Gallery = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-sm md:text-base font-medium mb-16 tracking-[0.3em] uppercase text-muted text-center">Portfolio</h2>
      
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="masonry-grid"
        columnClassName="masonry-grid_column"
      >
        {MOCK_IMAGES.map((img) => (
          <div key={img.id} className="mb-6 relative group overflow-hidden bg-neutral-900 rounded-sm">
            <Image
              src={`${img.src}?auto=format&fit=crop&w=800&q=75`}
              alt={img.alt}
              width={img.width}
              height={img.height}
              className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        ))}
      </Masonry>
    </section>
  );
};

export default Gallery;
