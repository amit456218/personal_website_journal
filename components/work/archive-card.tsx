"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import type { WorkExperience } from "@/lib/work-data"

interface ArchiveCardProps {
  work: WorkExperience
  index: number
}

// Deterministic rotations for each card
const CARD_ROTATIONS = [-1.5, 1.2, -0.8, 1.5, -1, 0.8]

export function ArchiveCard({ work, index }: ArchiveCardProps) {
  const rotation = CARD_ROTATIONS[index % CARD_ROTATIONS.length]
  
  return (
    <Link href={`/work/${work.id}`}>
      <motion.div
        className="relative w-full aspect-square cursor-pointer group"
        initial={{ opacity: 0, y: 20, rotate: rotation + 2 }}
        animate={{ opacity: 1, y: 0, rotate: rotation }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ 
          scale: 1.03, 
          rotate: 0,
          y: -4,
          transition: { duration: 0.2 }
        }}
      >
        {/* Card background - aged paper */}
        <div 
          className="absolute inset-0 bg-paper-light rounded-sm"
          style={{
            boxShadow: "3px 4px 12px rgba(44, 36, 22, 0.2), 1px 2px 4px rgba(44, 36, 22, 0.1)",
          }}
        />
        
        {/* Paper texture overlay */}
        <div 
          className="absolute inset-0 opacity-20 rounded-sm pointer-events-none"
          style={{
            backgroundImage: `url('/textures/paper-texture.jpg')`,
            backgroundSize: '150px',
            mixBlendMode: 'multiply'
          }}
        />
        
        {/* Decorative border */}
        <div className="absolute inset-2 border border-sepia/20 rounded-sm pointer-events-none" />
        
        {/* Corner stamp decoration */}
        <div className="absolute top-3 right-3 w-8 h-8 border-2 border-dashed border-stamp-red/40 rounded-full flex items-center justify-center">
          <span className="font-typewriter text-[8px] text-stamp-red/60">{work.period.slice(-2)}</span>
        </div>
        
        {/* Main content */}
        <div className="relative h-full p-4 flex flex-col justify-between">
          {/* Top section */}
          <div>
            <p className="font-typewriter text-[9px] text-sepia/50 uppercase tracking-[0.15em] mb-1">
              {work.location}
            </p>
          </div>
          
          {/* Center - Company emblem */}
          <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
            {/* Decorative flourish */}
            <svg viewBox="0 0 40 8" className="w-10 h-2 mb-2 opacity-30">
              <path d="M0 4 Q10 0 20 4 Q30 8 40 4" stroke="currentColor" fill="none" strokeWidth="0.5" className="text-sepia"/>
            </svg>
            
            <h3 className="font-serif text-lg text-ink font-semibold tracking-tight leading-tight group-hover:text-brass transition-colors">
              {work.company}
            </h3>
            {work.subtitle && (
              <p className="font-typewriter text-[10px] text-sepia/60 mt-0.5">
                {work.subtitle}
              </p>
            )}
            
            <div className="w-6 h-px bg-brass/40 my-2" />
            
            <p className="font-handwriting text-sm text-sepia/70">
              {work.role}
            </p>
            
            {/* Decorative flourish */}
            <svg viewBox="0 0 40 8" className="w-10 h-2 mt-2 opacity-30 rotate-180">
              <path d="M0 4 Q10 0 20 4 Q30 8 40 4" stroke="currentColor" fill="none" strokeWidth="0.5" className="text-sepia"/>
            </svg>
          </div>
          
          {/* Bottom - Date */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-brass/60 rounded-full" />
              <span className="font-typewriter text-[10px] text-sepia/60">{work.period}</span>
            </div>
            
            {/* Small arrow indicator */}
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              initial={{ x: -4 }}
              whileHover={{ x: 0 }}
            >
              <svg viewBox="0 0 16 16" className="w-3 h-3 text-brass">
                <path fill="currentColor" d="M6.5 3.5L11 8l-4.5 4.5L5 11l3-3-3-3z"/>
              </svg>
            </motion.div>
          </div>
        </div>
        
        {/* Worn corner effect */}
        <div 
          className="absolute bottom-0 right-0 w-4 h-4"
          style={{
            background: "linear-gradient(135deg, transparent 50%, rgba(200, 185, 155, 0.3) 50%)",
          }}
        />
      </motion.div>
    </Link>
  )
}
