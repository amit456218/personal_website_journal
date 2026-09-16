"use client"

import { motion } from "framer-motion"
import { HandwrittenTagline } from "./handwritten-tagline"

interface IntroNoteProps {
  name: string
  tagline: string
}

export function IntroNote({ name, tagline }: IntroNoteProps) {
  return (
    <>
      {/* Crumple filter: turbulence + displacement that ramps from chaotic
          (paper ball) to flat over ~1.6s. SMIL animates declaratively. */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
        <defs>
          <filter id="intro-crumple" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" numOctaves={3} seed={4} result="noise">
              <animate
                attributeName="baseFrequency"
                values="0.9;0.6;0.25;0.05;0.001"
                keyTimes="0;0.25;0.55;0.85;1"
                dur="1.1s"
                fill="freeze"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" xChannelSelector="R" yChannelSelector="G">
              <animate
                attributeName="scale"
                values="120;75;30;6;0"
                keyTimes="0;0.25;0.55;0.85;1"
                dur="1.1s"
                fill="freeze"
              />
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>
    {/* The entrance runs as a CSS animation, not a JS one: it starts on first
        paint instead of waiting for hydration, which is what was holding the
        largest contentful paint back by several seconds on phones. */}
    <div
      className="intro-uncrumple relative"
      style={{
        filter: "url(#intro-crumple)",
        willChange: "transform, opacity",
      }}
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
            backgroundImage: "url('/textures/paper-texture.webp')",
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
          <span className="intro-fade font-handwriting text-xs text-sepia/50 block mb-2" style={{ animationDelay: "0.5s" }}>
            April 2026
          </span>
          
          <h1 className="font-serif text-2xl md:text-3xl text-ink tracking-tight leading-tight">
            {name}
          </h1>
          
          <div className="w-10 h-[2px] bg-brass/60 my-3" />
          
          <HandwrittenTagline text={tagline} className="font-handwriting text-lg md:text-xl text-sepia leading-snug" />
          
          {/* Decorative flourish */}
          <div className="intro-fade mt-4 flex items-center gap-2" style={{ animationDelay: "0.7s", ["--intro-fade-to" as string]: 0.4 }}>
            <div className="w-2 h-2 rounded-full bg-sepia/50" />
            <div className="w-8 h-[1px] bg-sepia/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-sepia/40" />
          </div>
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
    </div>
    </>
  )
}
