"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function FilmStrip() {
  return (
    <Link href="/gallery" className="block">
      <motion.div
        className="relative cursor-pointer group"
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 1, rotate: -7 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        whileHover={{ 
          scale: 1.05,
          rotate: -4,
          transition: { duration: 0.2 }
        }}
      >
        {/* Photo contact sheet / archival sleeve */}
        <div 
          className="relative w-28 h-36 rounded-sm overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #f5ede0 0%, #e8dcc8 100%)",
            boxShadow: "4px 4px 12px rgba(44, 36, 22, 0.25), 1px 1px 3px rgba(44, 36, 22, 0.15)"
          }}
        >
          {/* Paper texture */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "url('/textures/paper-texture.jpg')",
              backgroundSize: "150px",
              mixBlendMode: "multiply"
            }}
          />
          
          {/* Header */}
          <div className="absolute top-2 left-2 right-2">
            <div className="font-typewriter text-[6px] text-sepia/50 tracking-wider">CONTACT SHEET</div>
            <div className="w-full h-px bg-sepia/20 mt-1" />
          </div>
          
          {/* Photo grid - 2x3 */}
          <div className="absolute top-7 left-2 right-2 bottom-8 grid grid-cols-2 gap-1">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i}
                className="relative rounded-[1px] overflow-hidden"
                style={{ 
                  background: `linear-gradient(${135 + i * 15}deg, #c8b898 0%, #b8a888 50%, #a89878 100%)`,
                }}
              >
                {/* Varying sepia tones for each frame */}
                <div className="absolute inset-0 bg-sepia/10" />
                {/* Frame number */}
                <div className="absolute bottom-0 right-0.5 font-typewriter text-[4px] text-paper-light/50">
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
          
          {/* Film edge markers */}
          <div className="absolute left-0 top-7 bottom-8 w-1.5 flex flex-col justify-around">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-sepia/20 rounded-sm mx-auto" />
            ))}
          </div>
          
          {/* Title at bottom */}
          <div className="absolute bottom-1.5 left-0 right-0 text-center">
            <span className="font-handwriting text-sm text-sepia/80">Gallery</span>
          </div>
        </div>
        
        {/* Tap to explore */}
        <motion.p
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-handwriting text-sm text-sepia/60 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          tap to view
        </motion.p>
      </motion.div>
    </Link>
  )
}
