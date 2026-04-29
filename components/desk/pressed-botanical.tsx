"use client"

import { motion } from "framer-motion"

export function PressedBotanical() {
  return (
    <motion.div
      className="relative pointer-events-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 0.82, scale: 1, rotate: [8, 11, 8] }}
      transition={{ duration: 0.8, delay: 0.7, rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 } }}
    >
<svg viewBox="0 0 70 110" width="60" height="95" style={{ filter: "drop-shadow(1px 2px 3px rgba(0,0,0,0.15))" }}>
        {/* Main stem */}
        <path d="M35 105 C34 80, 33 55, 35 15" stroke="#6b5a30" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Leaves — left side */}
        <path d="M34 80 C20 72, 12 60, 18 50 C22 44, 32 50, 34 65 Z" fill="#7a8c50" opacity="0.85" />
        <path d="M18 50 C22 44, 32 50, 34 65" stroke="#5a6a35" strokeWidth="0.5" fill="none" opacity="0.6" />
        <line x1="34" y1="65" x2="18" y2="50" stroke="#5a6a35" strokeWidth="0.4" opacity="0.5" />

        <path d="M34 55 C18 48, 10 35, 16 25 C20 18, 32 25, 34 42 Z" fill="#8a9c5c" opacity="0.8" />
        <path d="M16 25 C20 18, 32 25, 34 42" stroke="#6a7a40" strokeWidth="0.5" fill="none" opacity="0.5" />

        {/* Leaves — right side */}
        <path d="M36 70 C50 62, 58 50, 52 40 C48 34, 37 40, 36 56 Z" fill="#7a8c50" opacity="0.8" />
        <path d="M52 40 C48 34, 37 40, 36 56" stroke="#5a6a35" strokeWidth="0.5" fill="none" opacity="0.6" />

        <path d="M36 45 C50 38, 56 26, 50 17 C46 10, 36 17, 35 33 Z" fill="#8a9c5c" opacity="0.75" />

        {/* Small flower at top */}
        <circle cx="35" cy="13" r="5" fill="#c9a04a" opacity="0.7" />
        <circle cx="35" cy="13" r="3" fill="#e8c878" opacity="0.8" />
        <ellipse cx="41" cy="13" rx="3" ry="2" fill="#d4b868" opacity="0.6" transform="rotate(0 41 13)" />
        <ellipse cx="38" cy="7.8" rx="3" ry="2" fill="#d4b868" opacity="0.6" transform="rotate(60 38 7.8)" />
        <ellipse cx="32" cy="7.8" rx="3" ry="2" fill="#d4b868" opacity="0.6" transform="rotate(120 32 7.8)" />
        <ellipse cx="29" cy="13" rx="3" ry="2" fill="#d4b868" opacity="0.6" transform="rotate(180 29 13)" />
        <ellipse cx="32" cy="18.2" rx="3" ry="2" fill="#d4b868" opacity="0.6" transform="rotate(240 32 18.2)" />
        <ellipse cx="38" cy="18.2" rx="3" ry="2" fill="#d4b868" opacity="0.6" transform="rotate(300 38 18.2)" />

        {/* Vein details on leaves */}
        <line x1="34" y1="80" x2="20" y2="57" stroke="#5a6a35" strokeWidth="0.4" opacity="0.4" />
        <line x1="36" y1="70" x2="50" y2="48" stroke="#5a6a35" strokeWidth="0.4" opacity="0.4" />
      </svg>
    </motion.div>
  )
}
