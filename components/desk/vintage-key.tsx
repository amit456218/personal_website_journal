"use client"

import { motion } from "framer-motion"

export function VintageKey() {
  return (
    <motion.div
      className="relative pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.9 }}
      transition={{ duration: 0.7, delay: 0.85 }}
    >
      {/* Pivot at the bow ring — key swings from there */}
      <motion.div
        style={{ originX: "14%", originY: "44%" }}
        animate={{
          rotate: [15, 15, 26, 4, 20, 8, 16, 13, 15, 15, 15],
          y:      [0,  0,  -4,  4, -2,  2,  -1,  1,  0,  0,  0],
        }}
        transition={{
          duration: 3.2,
          times: [0, 0.18, 0.28, 0.40, 0.52, 0.62, 0.70, 0.78, 0.84, 0.92, 1],
          repeat: Infinity,
          repeatDelay: 5,
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 120 36" width="108" height="32" style={{ filter: "drop-shadow(2px 3px 4px rgba(0,0,0,0.35))" }}>
          {/* Key bow (ring) */}
          <circle cx="16" cy="16" r="13" fill="none" stroke="url(#keyGold)" strokeWidth="4.5" />
          <circle cx="16" cy="16" r="13" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          {/* Inner hole */}
          <circle cx="16" cy="16" r="6" fill="none" stroke="url(#keyGold)" strokeWidth="2.5" />

          {/* Key shank */}
          <rect x="28" y="13.5" width="78" height="9" rx="4.5" fill="url(#keyGold)" />
          <rect x="28" y="14.5" width="78" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />

          {/* Teeth */}
          <rect x="68" y="22" width="7" height="9" rx="1.5" fill="url(#keyGold)" />
          <rect x="82" y="22" width="5" height="6" rx="1.5" fill="url(#keyGold)" />
          <rect x="93" y="22" width="7" height="11" rx="1.5" fill="url(#keyGold)" />

          {/* Bow detail */}
          <circle cx="16" cy="16" r="3" fill="url(#keyGold)" opacity="0.6" />

          <defs>
            <linearGradient id="keyGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d4a84b" />
              <stop offset="40%" stopColor="#b8965c" />
              <stop offset="100%" stopColor="#8a6a30" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  )
}
