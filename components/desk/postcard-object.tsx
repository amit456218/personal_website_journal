"use client"

import { motion } from "framer-motion"
import Link from "next/link"

/** The postcard on the board: the way to write to me. */
export function PostcardObject() {
  return (
    <Link href="/contact" aria-label="Send a postcard">
      <motion.div
        className="relative cursor-pointer group"
        initial={{ rotate: 15 }}
        animate={{ rotate: 12 }}
        whileHover={{ rotate: 6, y: -4, scale: 1.05, transition: { duration: 0.3 } }}
      >
        <div
          className="w-32 rounded-sm relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #f5ede0 0%, #e0d4c0 100%)",
            boxShadow: "3px 3px 8px rgba(0,0,0,0.14)",
            height: "5.5rem",
          }}
        >
          <div className="absolute right-3 top-3 bottom-3 w-14">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full h-px bg-sepia/20 mb-3" />
            ))}
          </div>
          <div className="absolute right-2 top-2 w-7 h-9 border border-dashed border-sepia/30 rounded-[1px] flex items-center justify-center">
            <span className="font-typewriter text-[6px] text-sepia/40 rotate-[-8deg]">1st</span>
          </div>
          <div className="absolute left-2 top-2 font-typewriter text-[8px] text-sepia/40 tracking-wider">POST CARD</div>
          <svg className="absolute left-2 bottom-2 w-11 h-14" viewBox="0 0 30 40" opacity="0.6" aria-hidden>
            <rect x="13" y="30" width="4" height="8" rx="0.5" fill="#4a3018" />
            <polygon points="15,4 6,18 24,18" fill="#0e2a0a" />
            <polygon points="15,10 4,24 26,24" fill="#081e06" />
            <polygon points="15,17 3,32 27,32" fill="#041404" />
          </svg>
          <div className="absolute left-1/2 top-2 bottom-2 w-px bg-sepia/20" />
          <p className="absolute right-3 bottom-2 font-handwriting text-[11px] text-sepia/60 group-hover:text-sepia transition-colors">Dear Amit,</p>
        </div>
        <motion.p
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-handwriting text-xs text-sepia/90 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          write me
        </motion.p>
      </motion.div>
    </Link>
  )
}
