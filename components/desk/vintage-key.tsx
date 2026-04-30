"use client"

import { motion } from "framer-motion"

export function VintageKey() {
  return (
    <motion.div
      className="relative pointer-events-none"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 0.92, y: 0 }}
      transition={{ duration: 0.6, delay: 0.85 }}
    >
      {/* Swing pivot at top of bow ring */}
      <motion.div
        style={{ originX: "13%", originY: "8%" }}
        animate={{
          rotate: [5, 5, 5, 28, -16, 10, -5, 2, 5, 5, 5],
        }}
        transition={{
          duration: 5,
          times: [0, 0.1, 0.22, 0.34, 0.47, 0.58, 0.67, 0.75, 0.81, 0.9, 1],
          repeat: Infinity,
          repeatDelay: 4.5,
          ease: "easeInOut",
        }}
      >
        {/* Golden glow pulses gently on the idle */}
        <motion.svg
          viewBox="0 0 120 36"
          width="108"
          height="32"
          animate={{
            filter: [
              "drop-shadow(2px 3px 5px rgba(0,0,0,0.38))",
              "drop-shadow(2px 3px 10px rgba(212,168,75,0.55))",
              "drop-shadow(2px 3px 5px rgba(0,0,0,0.38))",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.5 }}
        >
          {/* Key bow (ring) */}
          <circle cx="16" cy="16" r="13" fill="none" stroke="url(#keyGold)" strokeWidth="4.5" />
          <circle cx="16" cy="16" r="13" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          {/* Inner hole */}
          <circle cx="16" cy="16" r="6" fill="none" stroke="url(#keyGold)" strokeWidth="2.5" />

          {/* Key shank */}
          <rect x="28" y="13.5" width="78" height="9" rx="4.5" fill="url(#keyGold)" />
          <rect x="28" y="14.5" width="78" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />

          {/* Teeth */}
          <rect x="68" y="22" width="7" height="9"  rx="1.5" fill="url(#keyGold)" />
          <rect x="82" y="22" width="5" height="6"  rx="1.5" fill="url(#keyGold)" />
          <rect x="93" y="22" width="7" height="11" rx="1.5" fill="url(#keyGold)" />

          {/* Bow centre detail */}
          <circle cx="16" cy="16" r="3" fill="url(#keyGold)" opacity="0.6" />

          <defs>
            <linearGradient id="keyGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#d4a84b" />
              <stop offset="40%"  stopColor="#b8965c" />
              <stop offset="100%" stopColor="#8a6a30" />
            </linearGradient>
          </defs>
        </motion.svg>
      </motion.div>
    </motion.div>
  )
}
