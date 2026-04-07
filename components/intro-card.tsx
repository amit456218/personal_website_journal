"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function IntroCard() {
  return (
    <motion.div
      className="absolute top-6 left-6 md:top-10 md:left-10 z-20"
      initial={{ opacity: 0, x: -30, rotate: -5 }}
      animate={{ opacity: 1, x: 0, rotate: -2 }}
      transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
    >
      <div 
        className="bg-paper-light p-6 md:p-8 max-w-xs md:max-w-sm vintage-shadow relative"
        style={{
          clipPath: "polygon(0 0, 100% 2%, 98% 100%, 2% 98%)"
        }}
      >
        {/* Tape strips */}
        <div 
          className="absolute -top-2 left-4 w-10 h-4 tape"
          style={{ transform: "rotate(-8deg)" }}
        />
        <div 
          className="absolute -top-1 right-6 w-8 h-3 tape"
          style={{ transform: "rotate(5deg)" }}
        />
        
        {/* Coffee stain */}
        <div 
          className="absolute -bottom-4 -right-4 w-16 h-16 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: "url('/textures/coffee-stain.jpg')",
            backgroundSize: "cover"
          }}
        />
        
        <h1 className="font-handwriting text-3xl md:text-4xl text-ink leading-tight">
          Alex Chen
        </h1>
        
        <p className="font-typewriter text-xs text-sepia mt-2 tracking-wide">
          WANDERER • ENGINEER • STORYTELLER
        </p>
        
        <div className="w-16 h-px bg-sepia/40 my-4" />
        
        <p className="font-serif text-sm md:text-base text-foreground leading-relaxed italic">
          {"\"Not all those who wander are lost — but I usually am, and that's half the fun.\""}
        </p>
        
        <div className="mt-6 flex items-center gap-4">
          <Link 
            href="/about"
            className="font-typewriter text-xs text-sepia hover:text-ink transition-colors underline underline-offset-4"
          >
            VIEW PASSPORT
          </Link>
          <Link 
            href="/projects"
            className="font-typewriter text-xs text-sepia hover:text-ink transition-colors underline underline-offset-4"
          >
            FIELD NOTES
          </Link>
        </div>
        
        {/* Decorative stamp */}
        <motion.div
          className="absolute -bottom-3 -right-3 w-16 h-16 border-2 border-stamp-red rounded-full flex items-center justify-center opacity-70"
          style={{ transform: "rotate(15deg)" }}
          initial={{ scale: 1.5, opacity: 0, rotate: -10 }}
          animate={{ scale: 1, opacity: 0.7, rotate: 15 }}
          transition={{ duration: 0.4, delay: 1.2, type: "spring" }}
        >
          <div className="text-center">
            <p className="font-typewriter text-[8px] text-stamp-red leading-tight">
              EST.
            </p>
            <p className="font-typewriter text-sm text-stamp-red font-bold leading-tight">
              2023
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
