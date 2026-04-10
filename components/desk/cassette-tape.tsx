"use client"

import { motion } from "framer-motion"
import { useState, useRef, useCallback } from "react"

export function CassetteTape() {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const vinylRef = useRef<HTMLDivElement>(null)

  const togglePlay = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio()
      audio.src = "/music/track.wav"
      audio.loop = true
      audio.preload = "auto"
      audioRef.current = audio
    }
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [isPlaying])

  return (
      <>
      <style jsx global>{`
        @keyframes vinyl-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <motion.div
        className="relative group"
        initial={{ opacity: 0, rotate: 14, scale: 1.02 }}
        animate={{ opacity: 1, rotate: 12, scale: 1.02 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {/* Vinyl sleeve - click to play/pause */}
        <div
          className="relative w-40 h-40 rounded-sm overflow-hidden cursor-pointer"
          onClick={togglePlay}
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
          <div
            ref={vinylRef}
            className="absolute w-24 h-24 rounded-full border-2 border-sepia/20"
            style={{
              top: "calc(50% - 52px)",
              left: "calc(50% - 48px)",
              background: "radial-gradient(circle at 35% 30%, #4a3d35 0%, #2c2420 25%, #0f0d0b 60%, #1a1512 100%)",
              boxShadow: "inset 0 0 12px rgba(0,0,0,0.6), inset 2px 2px 6px rgba(255,255,255,0.08)",
              animation: "vinyl-spin 4s linear infinite",
              animationPlayState: isPlaying ? "running" : "paused",
            }}
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
          </div>

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
        
        {/* Tap to explore */}
        <motion.p
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-handwriting text-base text-sepia/90 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {isPlaying ? "tap to pause" : "tap to play"}
        </motion.p>
      </motion.div>
      </>
  )
}
