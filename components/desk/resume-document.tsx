"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function ResumeDocument() {
  return (
    <Link href="/resume">
      <motion.div
        className="relative w-32 h-20 cursor-pointer group"
        style={{ transform: "rotate(3deg)" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ 
          y: -4, 
          rotate: 1,
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
            <div className="font-typewriter text-[8px] text-ink/80 leading-relaxed">
              <p className="mb-1">CURRICULUM VITAE</p>
              <div className="w-12 h-px bg-sepia/30 mb-1" />
              <p className="text-[6px] text-sepia/60">Education...</p>
              <p className="text-[6px] text-sepia/60">Experience...</p>
            </div>
          </div>
          
          {/* Paper clip */}
          <div 
            className="absolute -top-2 right-4 w-4 h-8"
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
