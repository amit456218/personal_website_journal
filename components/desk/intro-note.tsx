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
      initial={{ opacity: 0, y: 30, rotate: -3, scale: 1.03 }}
      animate={{ opacity: 1, y: 0, rotate: -1.5, scale: 1.03 }}
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
      
      {/* Paperclip */}
      <motion.div
        className="absolute -top-4 left-1/2 z-30 w-6 h-14"
        style={{ x: "-50%", originY: 0 }}
        animate={{ rotate: [3, 7, 3, 6, 3], y: [0, -1, 0, -0.5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 24 56" fill="none" className="w-full h-full drop-shadow-sm">
          {/* Outer clip */}
          <path 
            d="M6 4C6 2 8 1 10 1h4c2 0 4 1 4 3v44c0 4-3 7-7 7h-2c-4 0-7-3-7-7V12c0-3 2-5 5-5h4c2 0 4 2 4 4v28c0 2-1.5 4-4 4h-2c-2 0-3.5-1.5-3.5-3.5V18"
            stroke="#8b8b8b"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Inner highlight */}
          <path 
            d="M7 5C7 3 8.5 2 10 2h4c1.5 0 3 1 3 2.5"
            stroke="#b5b5b5"
            strokeWidth="0.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </motion.div>

      {/* Main note */}
      <div
        className="relative bg-paper-light p-6 md:p-8 w-[260px] h-[230px]"
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
            className="font-handwriting text-xs text-sepia/50 block mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            April 2026
          </motion.span>
          
          <h1 className="font-serif text-2xl md:text-3xl text-ink tracking-tight leading-tight">
            {name}
          </h1>
          
          <div className="w-10 h-[2px] bg-brass/60 my-3" />
          
          <p className="font-handwriting text-lg md:text-xl text-sepia leading-snug">
            {tagline}
          </p>
          
          {/* Decorative flourish */}
          <motion.div 
            className="mt-4 flex items-center gap-2 opacity-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.7 }}
          >
            <div className="w-2 h-2 rounded-full bg-sepia/50" />
            <div className="w-8 h-[1px] bg-sepia/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-sepia/40" />
          </motion.div>
        </div>
        
        {/* Decorative tape strips - moved to sides to not overlap paperclip */}
        <div 
          className="absolute top-4 -left-2 w-12 h-4 z-20"
          style={{
            background: "linear-gradient(180deg, rgba(255, 248, 220, 0.9) 0%, rgba(245, 235, 200, 0.85) 100%)",
            transform: "rotate(-8deg)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.06)"
          }}
        />
        <div 
          className="absolute top-6 -right-2 w-11 h-4 z-20"
          style={{
            background: "linear-gradient(180deg, rgba(255, 248, 220, 0.85) 0%, rgba(245, 235, 200, 0.8) 100%)",
            transform: "rotate(6deg)",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
          }}
        />
      </div>
    </motion.div>
  )
}
