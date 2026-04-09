"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

export function CassetteTape() {
  const [isPlaying, setIsPlaying] = useState(true)

  return (
      <motion.div
        className="relative group"
        initial={{ opacity: 0, rotate: 17, scale: 1.02 }}
        animate={{ opacity: 1, rotate: 15, scale: 1.02 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* Vinyl sleeve - click to play/pause */}
        <div
          className="relative w-40 h-40 rounded-sm overflow-hidden cursor-pointer"
          onClick={() => setIsPlaying((p) => !p)}
          style={{
            background: "linear-gradient(145deg, #e8dcc8 0%, #d8c8b0 100%)",
            boxShadow: "4px 4px 12px rgba(44, 36, 22, 0.25), 1px 1px 3px rgba(44, 36, 22, 0.15)"
          }}
        >
          {/* Paper texture */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: "url('/textures/paper-texture.jpg')",
              backgroundSize: "200px",
              mixBlendMode: "multiply"
            }}
          />
          
          {/* Decorative border */}
          <div className="absolute inset-2.5 border border-sepia/30 rounded-sm" />
          
          {/* Spinning vinyl record */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-sepia/20"
            style={{
              background: "radial-gradient(circle at 35% 30%, #4a3d35 0%, #2c2420 25%, #0f0d0b 60%, #1a1512 100%)",
              marginTop: "-4px",
              boxShadow: "inset 0 0 12px rgba(0,0,0,0.6), inset 2px 2px 6px rgba(255,255,255,0.08)"
            }}
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={
              isPlaying
                ? { duration: 4, repeat: Infinity, ease: "linear" }
                : { duration: 0.4, ease: "easeOut" }
            }
          >
            {/* Vinyl grooves - multiple rings */}
            <div className="absolute inset-2 rounded-full border border-white/5" />
            <div className="absolute inset-3 rounded-full border border-white/5" />
            <div className="absolute inset-4 rounded-full border border-white/5" />
            <div className="absolute inset-5 rounded-full border border-white/5" />
            <div className="absolute inset-6 rounded-full border border-white/5" />
            
            {/* Shine reflection — wide sweeping glare */}
            <div
              className="absolute inset-0 rounded-full opacity-45 pointer-events-none"
              style={{
                background: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.55) 48%, rgba(255,255,255,0.2) 52%, transparent 70%)"
              }}
            />
            {/* Secondary highlight — soft top-left glow */}
            <div
              className="absolute inset-0 rounded-full opacity-35 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 28% 25%, rgba(255,255,255,0.5) 0%, transparent 35%)"
              }}
            />
            {/* Rim light */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.15)"
              }}
            />
            
            {/* Label center */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full"
              style={{ background: "linear-gradient(135deg, #c9a86c 0%, #a68c5b 100%)" }}
            >
              {/* Label text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-typewriter text-[5px] text-ink/70 tracking-wider">RECORDS</span>
                <span className="font-serif text-[7px] text-ink/80 font-medium">33 RPM</span>
              </div>
              {/* Center hole */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-ink/40" />
            </div>
          </motion.div>
          
          {/* Tonearm */}
          <div className="absolute top-3 right-3">
            {/* Arm base */}
            <div 
              className="w-3 h-3 rounded-full"
              style={{ 
                background: "linear-gradient(135deg, #8b8b8b 0%, #5a5a5a 100%)",
                boxShadow: "1px 1px 2px rgba(0,0,0,0.3)"
              }}
            />
            {/* Arm — pivots from base, tip lands on vinyl when playing */}
            <motion.div
              className="absolute top-1 left-1 w-14 h-1 origin-left"
              style={{
                background: "linear-gradient(180deg, #9a9a9a 0%, #6a6a6a 100%)",
                borderRadius: "2px",
                boxShadow: "1px 1px 2px rgba(0,0,0,0.2)"
              }}
              animate={{ rotate: isPlaying ? 128 : 18 }}
              transition={{ duration: 0.75, ease: [0.6, 0.05, 0.25, 1] }}
            >
              {/* Headshell */}
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2"
                style={{
                  background: "linear-gradient(180deg, #7a7a7a 0%, #4a4a4a 100%)",
                  borderRadius: "1px"
                }}
              />
            </motion.div>
          </div>
          
          {/* Corner text */}
          <div className="absolute top-3 left-3" style={{ marginTop: "-2px" }}>
            <span className="font-typewriter text-[9px] text-sepia/50 tracking-wider">VOL. 1</span>
          </div>
          
          {/* Title */}
          <div className="absolute bottom-3 left-0 right-0 text-center">
            <span className="font-handwriting text-lg text-sepia font-bold">Music</span>
          </div>
        </div>
        
        {/* Playlist ticket - clickable */}
        <Link href="/music">
          <motion.div
            className="absolute -top-8 left-1/2 z-30 cursor-pointer"
            initial={{ opacity: 0, y: -10, rotate: -8, x: "-50%" }}
            animate={{ opacity: 1, y: 0, rotate: -6, x: "-50%" }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ y: -3, rotate: 0, scale: 1.08, transition: { duration: 0.25 } }}
          >
            <div
              className="relative px-3 py-1.5 flex items-center gap-1.5"
              style={{
                background: "linear-gradient(180deg, #f8efd8 0%, #ead8b0 100%)",
                boxShadow: "2px 3px 8px rgba(44, 36, 22, 0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
                clipPath: "polygon(4% 0, 96% 0, 100% 50%, 96% 100%, 4% 100%, 0 50%)",
                border: "1px solid rgba(107, 74, 26, 0.3)"
              }}
            >
              {/* Music note */}
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 text-ink/80">
                <path
                  d="M6 2 L13 1 L13 10 M6 2 L6 11 M6 11 a2 2 0 1 1 -2 -2 a2 2 0 0 1 2 2 z M13 10 a2 2 0 1 1 -2 -2 a2 2 0 0 1 2 2 z"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-typewriter text-[9px] text-ink/80 tracking-wider font-bold">
                PLAYLIST
              </span>
              {/* Perforation dots */}
              <div className="absolute left-1 top-1/2 -translate-y-1/2 w-0.5 h-0.5 rounded-full bg-ink/30" />
              <div className="absolute right-1 top-1/2 -translate-y-1/2 w-0.5 h-0.5 rounded-full bg-ink/30" />
            </div>
          </motion.div>
        </Link>

        {/* Tap to explore */}
        <motion.p
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-handwriting text-sm text-sepia/60 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {isPlaying ? "tap to pause" : "tap to play"}
        </motion.p>
      </motion.div>
  )
}
