"use client"

import { motion } from "framer-motion"

interface IntroNoteProps {
  name: string
  tagline: string
}

export function IntroNote({ name, tagline }: IntroNoteProps) {
  return (
    <motion.div
      className="relative bg-paper-light p-6 md:p-8 max-w-xs"
      style={{
        transform: "rotate(-1.5deg)",
        boxShadow: "6px 6px 20px rgba(44, 36, 22, 0.2), 2px 2px 8px rgba(44, 36, 22, 0.1)",
        // Hand-torn paper effect on edges
        clipPath: `polygon(
          0% 3%, 2% 0%, 5% 2%, 8% 0%, 12% 1%, 15% 0%, 20% 2%, 
          25% 0%, 30% 1%, 35% 0%, 40% 2%, 45% 0%, 50% 1%, 
          55% 0%, 60% 2%, 65% 0%, 70% 1%, 75% 0%, 80% 2%, 
          85% 0%, 90% 1%, 95% 0%, 98% 2%, 100% 0%, 
          100% 97%, 98% 100%, 95% 98%, 90% 100%, 85% 99%, 
          80% 100%, 75% 98%, 70% 100%, 65% 99%, 60% 100%, 
          55% 98%, 50% 100%, 45% 99%, 40% 100%, 35% 98%, 
          30% 100%, 25% 99%, 20% 100%, 15% 98%, 10% 100%, 
          5% 99%, 2% 100%, 0% 98%
        )`,
      }}
      initial={{ opacity: 0, y: 30, rotate: -5 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Paper texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "url('/textures/paper-texture.jpg')",
          backgroundSize: "200px",
          mixBlendMode: "multiply"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        <h1 className="font-serif text-3xl md:text-4xl text-ink tracking-tight">
          {name}
        </h1>
        <p className="font-handwriting text-xl md:text-2xl text-sepia mt-2 leading-snug">
          {tagline}
        </p>
      </div>
      
      {/* Decorative tape strip */}
      <div 
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6"
        style={{
          background: "linear-gradient(180deg, rgba(255, 248, 220, 0.85) 0%, rgba(245, 235, 200, 0.85) 100%)",
          transform: "translateX(-50%) rotate(2deg)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)"
        }}
      />
    </motion.div>
  )
}
