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
        {/* Scribbles — animated handwritten lines that draw, hold, then fade */}
        <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full" fill="none">
          {[
            { d: "M5 9 C 8 7.5, 12 10.5, 15 9 C 18 7.5, 22 10.5, 26 9 C 29 8, 31 9.2, 33 8.6", op: 0.5, delay: 0 },
            { d: "M5 16 C 9 17.4, 13 14.6, 17 16 C 21 17.4, 24 14.6, 28 16 C 30.5 16.8, 32 16, 32 16", op: 0.45, delay: 0.55 },
            { d: "M5 22 C 8 20.4, 12 23.6, 16 22 C 20 20.4, 23 23.4, 27 22 C 28.5 21.4, 29 22, 29 22", op: 0.4, delay: 1.1 },
            { d: "M5 28 C 8 29.5, 11 27.4, 14 28.4 C 17 29.4, 20 27.6, 23 28.6 C 25 29.2, 25.5 28.6, 26 28.6", op: 0.4, delay: 1.65 },
          ].map((l, i) => (
            <motion.path
              key={i}
              d={l.d}
              stroke="#7a6010"
              strokeWidth="0.9"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 1, 0],
                opacity: [0, l.op, l.op, 0],
              }}
              transition={{
                duration: 6,
                times: [0, 0.18, 0.82, 1],
                delay: l.delay,
                repeat: Infinity,
                repeatDelay: 1.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </svg>
      </div>
    </motion.div>
  )
}
