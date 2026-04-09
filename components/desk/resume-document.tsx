"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function ResumeDocument() {
  return (
    <Link href="/resume">
      <motion.div
        className="relative w-32 h-20 cursor-pointer group"
        style={{ transform: "rotate(3deg)" }}
        initial={{ opacity: 0, y: 20, scale: 1.125 }}
        animate={{ opacity: 1, y: 0, scale: 1.125 }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{
          y: -4,
          rotate: 1,
          scale: 1.17,
          transition: { duration: 0.2 }
        }}
      >
        {/* Paper with fold effect - showing just the top portion peeking out */}
        <div 
          className="absolute inset-0 bg-paper-light"
          style={{
            boxShadow: "3px 3px 10px rgba(44, 36, 22, 0.15), 1px 1px 4px rgba(44, 36, 22, 0.1)",
          }}
        >
          {/* Fold line */}
          <div 
            className="absolute left-0 right-0 top-1/2 h-px"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(92, 74, 50, 0.15) 20%, rgba(92, 74, 50, 0.15) 80%, transparent 100%)"
            }}
          />
          
          {/* Typewriter text preview */}
          <div className="p-3">
            <div className="font-typewriter text-sm text-ink/80 leading-relaxed">
              <p className="mb-1">ALMA MATER</p>
              <div className="w-14 h-px bg-sepia/30 mb-1" />
              <p className="text-xs text-sepia/60">Education...</p>
            </div>
          </div>
          
          {/* Graduation cap - top right corner */}
          <div
            className="absolute -top-3 -right-4 z-10"
            style={{ transform: "rotate(25deg)" }}
          >
            <svg viewBox="0 0 40 32" className="w-12 h-10 drop-shadow-sm">
              {/* Mortarboard top (square, tilted) */}
              <polygon
                points="20,3 37,10 20,17 3,10"
                fill="#1a1a1a"
                stroke="#0a0a0a"
                strokeWidth="0.5"
              />
              {/* Highlight on top */}
              <polygon
                points="20,3 37,10 20,11 3,10"
                fill="#2a2a2a"
              />
              {/* Cap band */}
              <path
                d="M8 11 Q8 20 20 20 Q32 20 32 11 L30 10 Q30 17 20 17 Q10 17 10 10 Z"
                fill="#1a1a1a"
              />
              {/* Button on top */}
              <circle cx="20" cy="10" r="1.2" fill="#c9a04a" />
              {/* Tassel cord */}
              <path
                d="M20 10 Q28 12 30 22"
                fill="none"
                stroke="#c9a04a"
                strokeWidth="0.8"
              />
              {/* Tassel */}
              <line x1="30" y1="22" x2="29" y2="27" stroke="#c9a04a" strokeWidth="0.8" />
              <line x1="30" y1="22" x2="30" y2="27.5" stroke="#c9a04a" strokeWidth="0.8" />
              <line x1="30" y1="22" x2="31" y2="27" stroke="#c9a04a" strokeWidth="0.8" />
              <circle cx="30" cy="22" r="0.8" fill="#e0b858" />
            </svg>
          </div>

          {/* Paper clip */}
          <div
            className="absolute -top-2 -left-1 w-4 h-8"
            style={{ transform: "rotate(-12deg)" }}
          >
            <svg viewBox="0 0 16 32" className="w-full h-full">
              <path
                d="M4 0 L4 24 Q4 28 8 28 Q12 28 12 24 L12 6 Q12 4 10 4 L10 22 Q10 24 8 24 Q6 24 6 22 L6 4"
                fill="none"
                stroke="#888"
                strokeWidth="1.5"
                className="group-hover:stroke-brass transition-colors"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
