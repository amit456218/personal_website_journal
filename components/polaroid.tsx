"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"

interface PolaroidProps {
  src: string
  caption: string
  rotation?: number
  index?: number
}

export function Polaroid({ src, caption, rotation = 0, index = 0 }: PolaroidProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Generate random tape positions
  const tapePositions = [
    { top: -8, left: "20%", rotate: -15 },
    { top: -6, right: "15%", rotate: 12 },
  ]
  
  const showSecondTape = Math.random() > 0.5
  
  return (
    <motion.div
      className="relative inline-block"
      initial={{ opacity: 0, y: 30, rotate: rotation - 5 }}
      animate={{ opacity: 1, y: 0, rotate: rotation }}
      transition={{ 
        duration: 0.6, 
        delay: 0.3 + index * 0.15,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -8, 
        rotate: 0,
        zIndex: 10,
        transition: { duration: 0.3 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tape strips */}
      <div 
        className="absolute w-12 h-5 tape z-10"
        style={{ 
          top: tapePositions[0].top, 
          left: tapePositions[0].left,
          transform: `rotate(${tapePositions[0].rotate}deg)`
        }}
      />
      {showSecondTape && (
        <div 
          className="absolute w-10 h-4 tape z-10"
          style={{ 
            top: tapePositions[1].top, 
            right: tapePositions[1].right,
            transform: `rotate(${tapePositions[1].rotate}deg)`
          }}
        />
      )}
      
      {/* Polaroid frame */}
      <motion.div
        className="polaroid bg-paper-light relative"
        animate={{
          boxShadow: isHovered 
            ? "8px 12px 24px rgba(44, 36, 22, 0.3), 4px 6px 12px rgba(44, 36, 22, 0.2)"
            : "4px 4px 12px rgba(44, 36, 22, 0.25), 2px 2px 6px rgba(44, 36, 22, 0.15)"
        }}
        style={{ padding: "12px 12px 48px 12px" }}
      >
        {/* Photo area */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 bg-ink/10 overflow-hidden">
          {/* Placeholder pattern for missing images */}
          <div className="absolute inset-0 bg-gradient-to-br from-paper-dark to-muted flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 border-2 border-sepia/30 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-sepia/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="font-typewriter text-[10px] text-sepia/50">Photo placeholder</p>
            </div>
          </div>
          
          {/* Slight vignette effect */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: "inset 0 0 30px rgba(44, 36, 22, 0.15)"
            }}
          />
        </div>
        
        {/* Caption */}
        <p 
          className="font-handwriting text-base md:text-lg text-ink mt-3 text-center px-2"
          style={{ transform: `rotate(${Math.random() * 2 - 1}deg)` }}
        >
          {caption}
        </p>
        
        {/* Slight aging/yellowing on edges */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: "linear-gradient(135deg, transparent 70%, rgba(139, 115, 85, 0.3) 100%)"
          }}
        />
      </motion.div>
    </motion.div>
  )
}
