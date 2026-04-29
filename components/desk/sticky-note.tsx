"use client"

import { motion } from "framer-motion"

export function StickyNote() {
  return (
    <motion.div
      className="relative pointer-events-none"
      initial={{ opacity: 0, y: -12, rotate: -6 }}
      animate={{ opacity: 1, y: 0, rotate: -4 }}
      transition={{ duration: 0.5, delay: 0.75, type: "spring", stiffness: 250, damping: 18 }}
    >
      {/* Paper */}
      <div
        className="relative w-10 h-10"
        style={{
          background: "linear-gradient(170deg, #fdf6c8 0%, #f8ee9a 100%)",
          boxShadow: "2px 3px 6px rgba(44,36,22,0.2)",
          clipPath: "polygon(0 0, 100% 0, 100% 82%, 82% 100%, 0 100%)"
        }}
      >
        {/* Folded corner shadow */}
        <div
          className="absolute bottom-0 right-0 w-4 h-4 pointer-events-none"
          style={{
            background: "linear-gradient(225deg, #d4c070 0%, transparent 60%)",
            clipPath: "polygon(100% 0, 100% 100%, 0 100%)"
          }}
        />
        {/* Scribbles — uniform ruled lines */}
        <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full" fill="none">
          <line x1="5" y1="10" x2="32" y2="10" stroke="#7a6010" strokeWidth="0.9" strokeLinecap="round" opacity="0.4"/>
          <line x1="5" y1="15" x2="30" y2="15" stroke="#7a6010" strokeWidth="0.9" strokeLinecap="round" opacity="0.35"/>
          <line x1="5" y1="20" x2="31" y2="20" stroke="#7a6010" strokeWidth="0.9" strokeLinecap="round" opacity="0.35"/>
          <line x1="5" y1="25" x2="25" y2="25" stroke="#7a6010" strokeWidth="0.9" strokeLinecap="round" opacity="0.3"/>
        </svg>
      </div>
    </motion.div>
  )
}
