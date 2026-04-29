"use client"

import { motion } from "framer-motion"

// Three short ink strokes that appear at the nib as the pen presses down each line
const LINES = [
  "M0,12 L-24,12",
  "M0,12 L-22,12",
  "M0,12 L-20,12",
]

// Pen y positions for each "line" of writing (press down, lift, repeat)
// Cycle: 5.5s animation + 1.5s pause = 7s total
const PEN_Y = [0, 0, 2, 2, 0, 0, 5, 5, 2, 0, 0]
const PEN_TIMES = [0, 0.06, 0.13, 0.26, 0.33, 0.4, 0.48, 0.62, 0.72, 0.82, 1]
const CYCLE = 7

export function FountainPen() {
  return (
    <motion.div
      className="relative pointer-events-none"
      initial={{ opacity: 0, rotate: -25 }}
      animate={{ opacity: 1, rotate: -25 }}
      transition={{ duration: 0.7, delay: 0.6 }}
    >
      {/* Writing motion — pen dips down for each line */}
      <motion.div
        animate={{ y: PEN_Y }}
        transition={{
          duration: 5.5,
          times: PEN_TIMES,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="-40 0 200 24" className="w-48 h-6" fill="none" overflow="visible">
          {/* Ink strokes — one per line, sequenced to match pen dip */}
          {LINES.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="#2c2416"
              strokeWidth="1.0"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.6, 0.5, 0],
              }}
              transition={{
                duration: 0.9,
                delay: 1.4 + i * 2.2,
                repeat: Infinity,
                repeatDelay: CYCLE - 0.9,
                ease: "easeOut",
              }}
            />
          ))}

          {/* Clip */}
          <rect x="118" y="4" width="2" height="14" rx="1" fill="#8a7040" opacity="0.9"/>
          {/* Cap */}
          <rect x="110" y="3" width="46" height="18" rx="9" fill="#1a1a1a"/>
          <rect x="110" y="3" width="46" height="18" rx="9" fill="url(#capSheen)" opacity="0.4"/>
          <rect x="108" y="5" width="6" height="14" rx="2" fill="#b8965c"/>
          <rect x="109" y="6" width="4" height="12" rx="1.5" fill="#d4a84b" opacity="0.6"/>
          {/* Barrel */}
          <rect x="38" y="4" width="72" height="16" rx="5" fill="#1c1c1c"/>
          <rect x="38" y="4" width="72" height="16" rx="5" fill="url(#barrelSheen)" opacity="0.35"/>
          {/* Grip */}
          <rect x="24" y="5" width="16" height="14" rx="3" fill="#2a2a2a"/>
          {[26, 29, 32, 35].map((x, i) => (
            <rect key={i} x={x} y="5" width="1.2" height="14" rx="0.5" fill="#444" opacity="0.5"/>
          ))}
          {/* Nib */}
          <path d="M24 7 L8 10 L8 14 L24 17 Z" fill="#b8965c"/>
          <path d="M24 7 L8 10 L8 14 L24 17 Z" fill="url(#nibSheen)" opacity="0.3"/>
          <path d="M8 10 L0 12 L8 14 Z" fill="#d4a84b"/>
          <line x1="4" y1="12" x2="20" y2="12" stroke="#8a7040" strokeWidth="0.6" opacity="0.8"/>
          {/* End cap */}
          <rect x="152" y="5" width="6" height="14" rx="3" fill="#2a2a2a"/>

          <defs>
            <linearGradient id="capSheen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white"/>
              <stop offset="40%" stopColor="transparent"/>
              <stop offset="100%" stopColor="black"/>
            </linearGradient>
            <linearGradient id="barrelSheen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white"/>
              <stop offset="35%" stopColor="transparent"/>
              <stop offset="100%" stopColor="black"/>
            </linearGradient>
            <linearGradient id="nibSheen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="white"/>
              <stop offset="100%" stopColor="transparent"/>
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  )
}
