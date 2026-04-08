"use client"

import { motion } from "framer-motion"

interface IntroNoteProps {
  name: string
  tagline: string
}

export function IntroNote({ name, tagline }: IntroNoteProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30, rotate: -3 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Shadow layer */}
      <div 
        className="absolute inset-0 translate-x-2 translate-y-2 bg-ink/10 blur-sm"
        style={{
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
      />
      
      {/* Main note */}
      <div
        className="relative bg-paper-light p-5 md:p-6 max-w-[220px]"
        style={{
          transform: "rotate(-1.5deg)",
          boxShadow: "0 4px 20px rgba(44, 36, 22, 0.12), 0 2px 8px rgba(44, 36, 22, 0.08)",
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
      >
        {/* Paper texture overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{
            backgroundImage: "url('/textures/paper-texture.jpg')",
            backgroundSize: "200px",
            mixBlendMode: "multiply"
          }}
        />
        
        {/* Subtle ruled lines */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.07]"
          style={{
            backgroundImage: "repeating-linear-gradient(transparent, transparent 27px, #3d5675 27px, #3d5675 28px)",
            backgroundPosition: "0 20px"
          }}
        />
        
        {/* Red margin line */}
        <div 
          className="absolute top-0 bottom-0 left-8 w-[1px] bg-stamp-red/20 pointer-events-none"
        />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Small decorative date */}
          <motion.span 
            className="font-handwriting text-[10px] text-sepia/50 block mb-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            April 2026
          </motion.span>
          
          <h1 className="font-serif text-xl md:text-2xl text-ink tracking-tight leading-tight">
            {name}
          </h1>
          
          <div className="w-8 h-[1.5px] bg-brass/60 my-2" />
          
          <p className="font-handwriting text-base md:text-lg text-sepia leading-snug">
            {tagline}
          </p>
          
          {/* Decorative flourish */}
          <motion.div 
            className="mt-3 flex items-center gap-1.5 opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.7 }}
          >
            <div className="w-2 h-2 rounded-full bg-sepia/50" />
            <div className="w-8 h-[1px] bg-sepia/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-sepia/40" />
          </motion.div>
        </div>
        
        {/* Decorative tape strips */}
        <div 
          className="absolute -top-2 left-6 w-10 h-4 z-20"
          style={{
            background: "linear-gradient(180deg, rgba(255, 248, 220, 0.9) 0%, rgba(245, 235, 200, 0.85) 100%)",
            transform: "rotate(3deg)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.06)"
          }}
        />
        <div 
          className="absolute -top-1.5 right-5 w-9 h-3 z-20"
          style={{
            background: "linear-gradient(180deg, rgba(255, 248, 220, 0.85) 0%, rgba(245, 235, 200, 0.8) 100%)",
            transform: "rotate(-5deg)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
          }}
        />
      </div>
    </motion.div>
  )
}
