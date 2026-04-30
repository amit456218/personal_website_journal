"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

function StampAnimation() {
  const [cycle, setCycle] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCycle(c => c + 1), 7000)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      key={cycle}
      className="absolute left-[16%] top-[14%] z-5 pointer-events-none"
      style={{ rotate: -15 }}
      initial={{ opacity: 0, scale: 1.4, y: -28 }}
      animate={{ opacity: [0, 0.95, 0.95, 0.95, 0], scale: [1.4, 0.94, 1, 1, 1.1], y: [-28, 3, 0, 0, -20] }}
      transition={{ duration: 4.5, times: [0, 0.04, 0.09, 0.85, 1], ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-stamp-red/60 pointer-events-none"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: [1, 1.45, 1.45], opacity: [0, 0.3, 0] }}
        transition={{ duration: 0.5, delay: 0.18, ease: "easeOut" }}
      />
      <div className="w-14 h-14 rounded-full border-2 border-stamp-red/90 flex items-center justify-center">
        <div className="text-center">
          <div className="font-typewriter text-[6px] text-stamp-red tracking-wider font-bold">APPROVED</div>
          <div className="font-typewriter text-[5px] text-stamp-red/90">2024</div>
        </div>
      </div>
    </motion.div>
  )
}

const TEXT = "memories & moments..."
// type-in takes ~1.3 + 21*0.055 ≈ 2.46s, hold 2.5s, fade 0.4s → cycle ~5.5s
const CYCLE_MS = 5000

function MemoriesText() {
  const [cycle, setCycle] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setCycle(c => c + 1), CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.div
      className="absolute left-[20%] bottom-[38%] z-5 pointer-events-none"
      style={{ rotate: -4 }}
    >
      <motion.span
        key={cycle}
        className="font-handwriting text-lg text-sepia/80 italic whitespace-nowrap flex"
        animate={{ opacity: [1, 1, 0] }}
        transition={{ duration: CYCLE_MS / 1000, times: [0, 0.88, 1], ease: "easeIn" }}
      >
        {TEXT.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 5, rotate: (i % 3 - 1) * 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{
              duration: 0.07,
              delay: 0.15 + i * 0.048,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ display: "inline-block", whiteSpace: "pre" }}
          >
            {char}
          </motion.span>
        ))}
      </motion.span>
    </motion.div>
  )
}

export function DeskDecorations() {
  return (
    <>
      {/* Admit One Ticket - under the Project of the Day */}
      <motion.div
        className="absolute left-[5%] bottom-[9%] z-5 pointer-events-none"
        initial={{ opacity: 0, y: 10, rotate: 12, scale: 1.05 }}
        animate={{ opacity: 0.85, y: 0, rotate: 12, scale: 1.05 }}
        transition={{ duration: 0.5, delay: 0.9 }}
      >
        <div className="relative">
        {/* Pushpin - classic red thumbtack */}
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 z-20"
          style={{ filter: "drop-shadow(1px 2px 3px rgba(0,0,0,0.45))" }}
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, #ff7070 0%, #c0392b 55%, #6b1818 100%)",
              boxShadow: "inset -1px -1px 2px rgba(0,0,0,0.35), inset 1px 1px 2px rgba(255,255,255,0.5)"
            }}
          />
        </div>
        <div
          className="w-24 h-44 bg-gradient-to-b from-paper-light to-[#e8dcc8] rounded-sm relative overflow-hidden"
          style={{ boxShadow: "3px 3px 8px rgba(0,0,0,0.18)" }}
        >
          {/* Perforated edge */}
          <div className="absolute right-0 top-0 bottom-0 w-1.5 flex flex-col justify-around">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-paper-dark" />
            ))}
          </div>
          {/* Ticket content */}
          <div className="p-3 flex flex-col h-full justify-between">
            <div>
              <div className="font-typewriter text-sm text-sepia/70 tracking-wider">ADMIT</div>
              <div className="font-serif text-3xl text-sepia/90 font-bold leading-tight">ONE</div>
            </div>
            <div className="w-10 h-px bg-sepia/30" />
            <div>
              <div className="font-typewriter text-[11px] text-sepia/50">No. 0247</div>
              <div className="font-typewriter text-[9px] text-sepia/40 mt-1">KEEP THIS STUB</div>
            </div>
          </div>
          {/* Decorative stripe */}
          <div className="absolute left-1 top-0 bottom-0 w-0.5 bg-stamp-red/30" />
        </div>
        </div>
      </motion.div>

      {/* Vintage postcard corner - top right area */}
      <motion.div
        className="absolute right-[30%] top-[7%] z-5 pointer-events-none"
        initial={{ opacity: 0, rotate: 15 }}
        animate={{ opacity: 1, rotate: 12 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div
          className="w-32 h-22 rounded-sm relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #f5ede0 0%, #e0d4c0 100%)",
            boxShadow: "3px 3px 8px rgba(0,0,0,0.14)",
            height: "5.5rem"
          }}
        >
          {/* Postcard lines */}
          <div className="absolute right-3 top-3 bottom-3 w-14">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full h-px bg-sepia/20 mb-3" />
            ))}
          </div>
          {/* Stamp area hint */}
          <div className="absolute right-2 top-2 w-7 h-9 border border-dashed border-sepia/30 rounded-[1px]" />
          {/* "POST CARD" text */}
          <div className="absolute left-2 top-2 font-typewriter text-[8px] text-sepia/40 tracking-wider">
            POST CARD
          </div>
          {/* Small green tree illustration */}
          <svg className="absolute left-2 bottom-2 w-11 h-14" viewBox="0 0 30 40" opacity="0.6">
            {/* Trunk */}
            <rect x="13" y="30" width="4" height="8" rx="0.5" fill="#4a3018" />
            {/* Tree layers */}
            <polygon points="15,4 6,18 24,18" fill="#0e2a0a" />
            <polygon points="15,10 4,24 26,24" fill="#081e06" />
            <polygon points="15,17 3,32 27,32" fill="#041404" />
          </svg>
          {/* Dividing line */}
          <div className="absolute left-1/2 top-2 bottom-2 w-px bg-sepia/20" />
        </div>
      </motion.div>

      {/* Compass/navigation element - under center post-it */}
      <motion.div
        className="absolute left-[49%] top-[76%] -translate-x-1/2 z-5 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="w-20 h-20 rounded-full border-2 border-sepia/60 relative" style={{ background: "radial-gradient(circle, rgba(232, 220, 190, 0.35) 0%, transparent 70%)" }}>
          {/* Compass markings */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 font-typewriter text-[11px] text-sepia/90 font-bold">N</div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 font-typewriter text-[9px] text-sepia/75">S</div>
          <div className="absolute left-1.5 top-1/2 -translate-y-1/2 font-typewriter text-[9px] text-sepia/75">W</div>
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 font-typewriter text-[9px] text-sepia/75">E</div>
          {/* Needle */}
          <motion.div
            className="absolute inset-3 flex items-center justify-center"
            animate={{ rotate: [15, 25, 10, 20, 15] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="w-[3px] h-11 bg-gradient-to-b from-stamp-red/90 to-sepia/70"
            />
          </motion.div>
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-brass/90" />
        </div>
      </motion.div>


{/* Coffee ring stain - subtle */}
      <motion.div
        className="absolute left-[45%] bottom-[25%] z-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div 
          className="w-16 h-16 rounded-full"
          style={{
            background: "radial-gradient(circle, transparent 50%, rgba(139, 115, 85, 0.3) 55%, transparent 65%)"
          }}
        />
      </motion.div>

      {/* Second route scribble - to the right of admit one */}
      <motion.svg
        className="absolute left-[11%] bottom-[10%] w-24 h-14 z-5 pointer-events-none"
        viewBox="0 0 100 50"
        initial={{ opacity: 0, rotate: 295 }}
        animate={{ opacity: 0.7, rotate: 295 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <motion.path
          d="M8 40 C25 38, 30 10, 50 15 S75 42, 92 20"
          fill="none"
          stroke="#6b4a2b"
          strokeWidth="1.3"
          strokeDasharray="2,4"
          strokeLinecap="round"
          animate={{ strokeDashoffset: [0, -24] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle cx="8" cy="40" r="2.5" fill="#b85450" animate={{ opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
        <motion.circle cx="92" cy="20" r="2.5" fill="#b85450" animate={{ opacity: [0.5, 0.9, 0.5] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }} />
        <circle cx="50" cy="15" r="1.8" fill="#6b4a2b" opacity="0.55" />
      </motion.svg>

      {/* Route scribble - larger */}
      <motion.svg
        className="absolute right-[18%] top-[18%] w-36 h-20 z-5 pointer-events-none"
        viewBox="0 0 100 50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.path
          d="M5 35 Q20 10, 40 25 T70 15 T95 30"
          fill="none"
          stroke="#8b7355"
          strokeWidth="1.5"
          strokeDasharray="3,3"
          strokeLinecap="round"
          animate={{ strokeDashoffset: [0, -24] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle cx="5" cy="35" r="3" fill="#b85450" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
        <motion.circle cx="95" cy="30" r="3" fill="#b85450" animate={{ opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }} />
        <circle cx="40" cy="25" r="2" fill="#8b7355" opacity="0.4" />
      </motion.svg>

      {/* Paper clip - near field notes */}
      <motion.div
        className="absolute left-[18%] top-[4%] z-25 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={{ transform: "rotate(25deg)" }}
      >
        <svg viewBox="0 0 14 32" className="w-4 h-9">
          <path 
            d="M3.5 2C3.5 1 4.5 0.5 5.5 0.5h3c1 0 2 0.5 2 1.5v23c0 2.5-2 4.5-4.5 4.5S1.5 27 1.5 24.5V7c0-2 1.2-3 3-3s3 1 3 3v16"
            stroke="#9ca3af"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Handwritten annotation - near center bottom */}
      <MemoriesText />

      {/* Small passport stamp - slams every 7s */}
      <StampAnimation />

    </>
  )
}
