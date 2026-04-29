"use client"

import { motion } from "framer-motion"

export function WaxSeal() {
  return (
    <motion.div
      className="relative pointer-events-none"
      initial={{ opacity: 0, scale: 0.4, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: -12 }}
      transition={{ duration: 0.4, delay: 0.9, type: "spring", stiffness: 300, damping: 14 }}
    >
      <svg viewBox="0 0 80 80" width="72" height="72" style={{ filter: "drop-shadow(2px 3px 5px rgba(0,0,0,0.35))" }}>
        {/* Wax blob — slightly irregular circle */}
        <path
          d="M40 4 C52 3, 64 10, 70 22 C77 34, 76 50, 68 60 C60 71, 46 76, 33 73 C20 70, 9 60, 6 47 C2 33, 8 17, 19 10 C27 5, 33 4.5, 40 4 Z"
          fill="#8b2020"
        />
        {/* Wax depth / shadow layer */}
        <path
          d="M40 4 C52 3, 64 10, 70 22 C77 34, 76 50, 68 60 C60 71, 46 76, 33 73 C20 70, 9 60, 6 47 C2 33, 8 17, 19 10 C27 5, 33 4.5, 40 4 Z"
          fill="url(#waxShade)"
        />
        {/* Outer emboss ring */}
        <circle cx="40" cy="40" r="29" fill="none" stroke="rgba(255,200,180,0.25)" strokeWidth="1.5" />
        <circle cx="40" cy="40" r="25" fill="none" stroke="rgba(255,200,180,0.15)" strokeWidth="0.8" />
        {/* AG monogram */}
        <text
          x="40" y="47"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="22"
          fontWeight="700"
          fill="rgba(255,220,200,0.9)"
          letterSpacing="1"
        >AG</text>
        {/* Surface sheen */}
        <ellipse cx="30" cy="26" rx="10" ry="6" fill="rgba(255,160,140,0.18)" transform="rotate(-20 30 26)" />
        <defs>
          <radialGradient id="waxShade" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(200,80,80,0.3)" />
            <stop offset="60%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  )
}
