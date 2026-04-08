"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function CassetteTape() {
  return (
    <Link href="/music" className="block">
      <motion.div
        className="relative cursor-pointer group"
        initial={{ opacity: 0, rotate: -8 }}
        animate={{ opacity: 1, rotate: -5 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ 
          scale: 1.05,
          rotate: -2,
          transition: { duration: 0.2 }
        }}
      >
        {/* Cassette body */}
        <div 
          className="relative w-32 h-20 rounded-sm overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #2c2c2c 0%, #1a1a1a 50%, #252525 100%)",
            boxShadow: "3px 3px 8px rgba(0,0,0,0.4), inset 1px 1px 2px rgba(255,255,255,0.05)"
          }}
        >
          {/* Top edge detail */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-zinc-600/30 to-transparent" />
          
          {/* Label area */}
          <div 
            className="absolute top-2 left-2 right-2 bottom-6 rounded-sm"
            style={{
              background: "linear-gradient(180deg, #f4e4c4 0%, #e8d4b0 100%)",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
            }}
          >
            {/* Label lines */}
            <div className="absolute top-2 left-2 right-2 space-y-1.5">
              <div className="h-px bg-sepia/20" />
              <div className="h-px bg-sepia/20" />
              <div className="h-px bg-sepia/20" />
            </div>
            
            {/* Label text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-typewriter text-[7px] text-sepia/60 tracking-wider uppercase">
                Side A
              </span>
              <span className="font-handwriting text-xs text-ink mt-0.5">
                Favorites
              </span>
            </div>
            
            {/* Corner decoration */}
            <div className="absolute bottom-1 right-1">
              <span className="font-typewriter text-[5px] text-sepia/40">90</span>
            </div>
          </div>
          
          {/* Tape reels */}
          <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-6">
            <div 
              className="w-4 h-4 rounded-full border-2 border-zinc-700"
              style={{ background: "linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 mx-auto mt-1" />
            </div>
            <div 
              className="w-4 h-4 rounded-full border-2 border-zinc-700"
              style={{ background: "linear-gradient(135deg, #3a3a3a 0%, #1a1a1a 100%)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 mx-auto mt-1" />
            </div>
          </div>
          
          {/* Tape window */}
          <div 
            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-14 h-2.5 rounded-sm"
            style={{ background: "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)" }}
          >
            <div className="absolute inset-0.5 rounded-sm bg-gradient-to-r from-amber-900/30 via-amber-800/20 to-amber-900/30" />
          </div>
          
          {/* Screw holes */}
          <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-zinc-800 border border-zinc-600/30" />
          <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-zinc-800 border border-zinc-600/30" />
        </div>
        
        {/* Tap to explore */}
        <motion.p
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-handwriting text-xs text-sepia/50 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          tap to play
        </motion.p>
      </motion.div>
    </Link>
  )
}
