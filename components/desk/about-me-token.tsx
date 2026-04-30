"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function AboutMeToken() {
  return (
    <Link href="/about" className="block">
      <motion.div
        className="relative cursor-pointer group"
        initial={{ opacity: 0, rotate: 7, scale: 1.664 }}
        animate={{ opacity: 1, rotate: 9, scale: 1.664 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        whileHover={{
          scale: 1.78,
          rotate: 0,
          transition: { duration: 0.2 }
        }}
      >
        {/* Tape strips — four corners, diagonal */}
        <div
          className="absolute -top-1.5 -left-2 w-8 h-3.5 z-20"
          style={{
            background: "linear-gradient(180deg, rgba(255, 248, 220, 0.88) 0%, rgba(245, 235, 200, 0.8) 100%)",
            transform: "rotate(-45deg)",
            transformOrigin: "center",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)"
          }}
        />
        <div
          className="absolute -top-1.5 -right-2 w-8 h-3.5 z-20"
          style={{
            background: "linear-gradient(180deg, rgba(255, 248, 220, 0.85) 0%, rgba(245, 235, 200, 0.78) 100%)",
            transform: "rotate(45deg)",
            transformOrigin: "center",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)"
          }}
        />

        {/* Luggage tag / ID badge style */}
        <div
          className="relative w-20 h-28 rounded-md overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #d4c4a8 0%, #c8b898 100%)",
            boxShadow: "3px 3px 10px rgba(44, 36, 22, 0.25)"
          }}
        >
          {/* Paper texture */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: "url('/textures/paper-texture.jpg')",
              backgroundSize: "150px",
              mixBlendMode: "multiply"
            }}
          />
          
          {/* Hole punch at top */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2">
            <div 
              className="w-4 h-4 rounded-full border-2 border-sepia/40"
              style={{ background: "radial-gradient(circle, rgba(44,36,22,0.15) 0%, transparent 70%)" }}
            />
          </div>
          
          {/* String hint */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-4 bg-sepia/30" />
          
          {/* Decorative border */}
          <div className="absolute inset-1.5 top-7 border border-sepia/25 rounded-sm" />
          
          {/* Icon - simple person silhouette */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-sepia/50">
              <circle cx="12" cy="7" r="4" fill="currentColor" />
              <path d="M12 14c-4 0-7 2-7 5v1h14v-1c0-3-3-5-7-5z" fill="currentColor" />
            </svg>
          </div>
          
          {/* Title */}
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <div className="font-typewriter text-[9px] text-sepia/60 tracking-wider mb-0.5">WHO AM I</div>
            <span className="font-handwriting text-base text-sepia/80">About Me</span>
          </div>
        </div>
        
        {/* Tap to explore */}
        <motion.p
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-handwriting text-xs text-sepia/90 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          tap to learn
        </motion.p>
      </motion.div>
    </Link>
  )
}
