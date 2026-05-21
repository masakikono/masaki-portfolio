"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ 
        ease: [0.16, 1, 0.3, 1], // Custom smooth ease matching Hero.tsx
        duration: 0.8 
      }}
      className="flex-1 w-full flex flex-col"
    >
      {children}
    </motion.div>
  );
}
