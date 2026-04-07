"use client"

import { motion } from "framer-motion"

export function AccentPolaroid() {
  return (
    <motion.div
      className="relative"
      style={{ transform: "rotate(-6deg)" }}
      initial={{ opacity: 0, rotate: -12 }}
      animate={{ opacity: 1, rotate: -6 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Polaroid frame */}
      <div 
        className="relative bg-paper-light p-1.5 pb-6 w-20 md:w-24"
        style={{
          boxShadow: "4px 4px 12px rgba(44, 36, 22, 0.2), 2px 2px 6px rgba(44, 36, 22, 0.12)",
        }}
      >
        {/* Photo area - abstract/artistic image placeholder */}
        <div 
          className="aspect-square relative overflow-hidden"
          style={{ background: "linear-gradient(145deg, #d4c5a9 0%, #c4b49a 50%, #b8a88a 100%)" }}
        >
          {/* Artistic abstract shapes suggesting a travel scene */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-60">
            {/* Mountain silhouette */}
            <path 
              d="M0 100 L30 40 L50 70 L70 30 L100 100 Z" 
              fill="#8b7355"
              opacity="0.5"
            />
            {/* Sun/moon */}
            <circle cx="75" cy="25" r="12" fill="#b8965c" opacity="0.6" />
            {/* Birds */}
            <path d="M20 30 Q25 25 30 30" fill="none" stroke="#5c4a32" strokeWidth="1" opacity="0.4" />
            <path d="M35 35 Q38 32 41 35" fill="none" stroke="#5c4a32" strokeWidth="0.8" opacity="0.3" />
          </svg>
          
          {/* Sepia overlay */}
          <div 
            className="absolute inset-0"
            style={{
              background: "radial-gradient(circle at 30% 30%, transparent 0%, rgba(92, 74, 50, 0.15) 100%)"
            }}
          />
        </div>
        
        {/* Caption area */}
        <div className="mt-1 text-center">
          <span className="font-handwriting text-xs text-sepia/70">
            memories
          </span>
        </div>
      </div>
      
      {/* Tape strip */}
      <div 
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4"
        style={{
          background: "linear-gradient(180deg, rgba(255, 248, 220, 0.8) 0%, rgba(245, 235, 200, 0.8) 100%)",
          transform: "translateX(-50%) rotate(-3deg)",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.06)"
        }}
      />
    </motion.div>
  )
}
