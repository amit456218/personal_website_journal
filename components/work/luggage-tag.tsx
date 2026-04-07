"use client"

import { motion } from "framer-motion"
import type { WorkExperience } from "@/lib/work-data"

interface LuggageTagProps {
  work: WorkExperience
  index: number
}

export function LuggageTag({ work, index }: LuggageTagProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Main tag container */}
      <div className="flex gap-6 items-stretch">
        {/* Actual luggage tag */}
        <div className="relative flex-shrink-0">
          {/* Tag shape */}
          <div 
            className="w-32 bg-[#d4a853] rounded-lg relative vintage-shadow"
            style={{
              clipPath: 'polygon(0 15%, 50% 0, 100% 15%, 100% 100%, 0 100%)'
            }}
          >
            {/* Hole at top */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-paper-dark border-2 border-[#b8913d]" />
            
            {/* String through hole */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-6">
              <svg viewBox="0 0 32 24" className="w-full h-full">
                <path d="M8 0 Q16 12, 24 0" fill="none" stroke="#8b7355" strokeWidth="2" />
              </svg>
            </div>
            
            {/* Tag content */}
            <div className="pt-12 pb-6 px-3 text-center">
              <p className="font-typewriter text-[8px] text-[#654321] tracking-widest uppercase mb-2">
                Destination
              </p>
              <p className="font-serif text-lg text-[#3d2914] font-bold leading-tight">
                {work.company}
              </p>
              <div className="mt-3 pt-3 border-t border-[#b8913d]/50">
                <p className="font-typewriter text-[10px] text-[#654321]">
                  {work.period}
                </p>
              </div>
            </div>
            
            {/* Barcode decoration */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-px">
              {[3,1,2,1,3,2,1,2,3,1,2,1].map((w, i) => (
                <div key={i} className="bg-[#3d2914]/60 h-4" style={{ width: `${w}px` }} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Info card beside tag */}
        <div className="flex-1 bg-paper-light rounded p-6 vintage-shadow border border-border/50">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-serif text-xl text-ink font-semibold">{work.company}</h3>
              <p className="font-typewriter text-xs text-sepia/70 mt-1">{work.role}</p>
            </div>
            <div className="text-right">
              <p className="font-handwriting text-lg text-brass">{work.period}</p>
              <p className="font-typewriter text-[10px] text-sepia/50">{work.location}</p>
            </div>
          </div>
          
          {/* Description */}
          <p className="font-serif text-sm text-sepia/80 leading-relaxed mb-4">
            {work.description}
          </p>
          
          {/* Highlights as tags */}
          <div className="flex flex-wrap gap-2">
            {work.highlights.map((highlight, i) => (
              <span 
                key={i} 
                className="font-typewriter text-[10px] text-sepia bg-paper-dark px-2 py-1 rounded border border-border/50"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
