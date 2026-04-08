"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function FilmStrip() {
  return (
    <Link href="/gallery" className="block">
      <motion.div
        className="relative cursor-pointer group"
        initial={{ opacity: 0, rotate: -10 }}
        animate={{ opacity: 1, rotate: -6 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        whileHover={{ 
          scale: 1.05,
          rotate: -3,
          transition: { duration: 0.2 }
        }}
      >
        {/* Stacked polaroids effect */}
        <div className="relative w-20 h-24">
          {/* Bottom polaroid (peeking) */}
          <div 
            className="absolute bottom-0 left-1 w-18 h-22 rounded-sm"
            style={{
              background: "#f8f4e8",
              transform: "rotate(4deg)",
              boxShadow: "2px 2px 6px rgba(44, 36, 22, 0.2)"
            }}
          />
          
          {/* Middle polaroid (peeking) */}
          <div 
            className="absolute bottom-0.5 left-0.5 w-18 h-22 rounded-sm"
            style={{
              background: "#faf6ec",
              transform: "rotate(-2deg)",
              boxShadow: "2px 2px 6px rgba(44, 36, 22, 0.2)"
            }}
          />
          
          {/* Top polaroid (main) */}
          <div 
            className="absolute inset-0 rounded-sm overflow-hidden"
            style={{
              background: "linear-gradient(180deg, #fcf8f0 0%, #f4ece0 100%)",
              boxShadow: "3px 3px 10px rgba(44, 36, 22, 0.25)"
            }}
          >
            {/* Photo area */}
            <div 
              className="absolute top-1.5 left-1.5 right-1.5 h-14 rounded-sm overflow-hidden"
              style={{ background: "linear-gradient(135deg, #d4c4a8 0%, #c8b898 50%, #bca880 100%)" }}
            >
              {/* Sepia photo hint - simple landscape */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-sepia/20 to-sepia/10" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-sepia/30 to-sepia/15" />
                {/* Sun/moon hint */}
                <div className="absolute top-2 right-3 w-2 h-2 rounded-full bg-paper-light/50" />
              </div>
            </div>
            
            {/* White border bottom with text */}
            <div className="absolute bottom-0 left-0 right-0 h-6 flex items-center justify-center">
              <span className="font-handwriting text-[10px] text-sepia/70">Gallery</span>
            </div>
          </div>
        </div>
        
        {/* Tap to explore */}
        <motion.p
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-handwriting text-xs text-sepia/50 whitespace-nowrap"
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
