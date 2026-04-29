"use client"

import { motion } from "framer-motion"

const PINS = [
  { x: 0,   y: 0,   color: "#c0392b", shine: "#e74c3c", delay: 0.5 },
  { x: 28,  y: 18,  color: "#2980b9", shine: "#3498db", delay: 0.65 },
  { x: -14, y: 32,  color: "#c9a04a", shine: "#d4b568", delay: 0.8 },
  { x: 42,  y: 8,   color: "#27ae60", shine: "#2ecc71", delay: 0.7 },
]

function Pin({ x, y, color, shine, delay }: { x: number; y: number; color: string; shine: string; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, y: -8, scale: 0.5 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay, type: "spring", stiffness: 400, damping: 18 }}
    >
      <svg viewBox="0 0 18 28" width="18" height="28" style={{ filter: "drop-shadow(1px 3px 3px rgba(0,0,0,0.4))" }}>
        {/* Pin head */}
        <circle cx="9" cy="8" r="7.5" fill={color} />
        <circle cx="9" cy="8" r="7.5" fill="url(#pinGrad)" opacity="0.5" />
        {/* Shine dot */}
        <circle cx="6.5" cy="5.5" r="2.5" fill={shine} opacity="0.55" />
        {/* Rim */}
        <circle cx="9" cy="8" r="7.5" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
        {/* Needle */}
        <line x1="9" y1="15" x2="9" y2="27" stroke="#888" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="9" y1="15" x2="9" y2="20" stroke="#bbb" strokeWidth="0.5" strokeLinecap="round" />
        <defs>
          <radialGradient id="pinGrad" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  )
}

export function Pushpins() {
  return (
    <div className="relative w-16 h-16 pointer-events-none">
      {PINS.map((pin, i) => (
        <Pin key={i} {...pin} />
      ))}
    </div>
  )
}
