"use client"

import { motion } from "framer-motion"

export function FountainPen() {
  return (
    <motion.div
      className="relative pointer-events-none"
      initial={{ opacity: 0, rotate: -30 }}
      animate={{ opacity: 1, rotate: -30 }}
      transition={{ duration: 0.7, delay: 0.6 }}
    >
      <svg viewBox="0 0 160 24" className="w-40 h-6" fill="none">
        {/* Clip */}
        <rect x="118" y="4" width="2" height="14" rx="1" fill="#8a7040" opacity="0.9"/>

        {/* Cap (rear end) */}
        <rect x="110" y="3" width="46" height="18" rx="9" fill="#1a1a1a"/>
        <rect x="110" y="3" width="46" height="18" rx="9" fill="url(#capSheen)" opacity="0.4"/>
        {/* Cap ring */}
        <rect x="108" y="5" width="6" height="14" rx="2" fill="#b8965c"/>
        <rect x="109" y="6" width="4" height="12" rx="1.5" fill="#d4a84b" opacity="0.6"/>

        {/* Barrel */}
        <rect x="38" y="4" width="72" height="16" rx="5" fill="#1c1c1c"/>
        <rect x="38" y="4" width="72" height="16" rx="5" fill="url(#barrelSheen)" opacity="0.35"/>

        {/* Grip section */}
        <rect x="24" y="5" width="16" height="14" rx="3" fill="#2a2a2a"/>
        {/* Grip ridges */}
        {[26, 29, 32, 35].map((x, i) => (
          <rect key={i} x={x} y="5" width="1.2" height="14" rx="0.5" fill="#444" opacity="0.5"/>
        ))}

        {/* Nib base */}
        <path d="M24 7 L8 10 L8 14 L24 17 Z" fill="#b8965c"/>
        <path d="M24 7 L8 10 L8 14 L24 17 Z" fill="url(#nibSheen)" opacity="0.3"/>

        {/* Nib tip */}
        <path d="M8 10 L0 12 L8 14 Z" fill="#d4a84b"/>
        {/* Nib slit */}
        <line x1="4" y1="12" x2="20" y2="12" stroke="#8a7040" strokeWidth="0.6" opacity="0.8"/>

        {/* Barrel end cap */}
        <rect x="152" y="5" width="6" height="14" rx="3" fill="#2a2a2a"/>

        {/* Ink drop at tip */}
        <ellipse cx="1" cy="12.5" rx="1" ry="1.2" fill="#2c2416" opacity="0.5"/>

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
  )
}
