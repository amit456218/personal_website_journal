"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function BackToDesk() {
  return (
    <motion.div
      className="fixed top-4 left-4 md:top-8 md:left-8 z-40"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href="/" className="group">
        <div 
          className="relative flex items-center gap-2 px-3 py-2 bg-paper-light border-l-4 border-brass/60"
          style={{
            boxShadow: "2px 2px 8px rgba(44, 36, 22, 0.15)",
            clipPath: "polygon(0 0, 100% 0, 95% 50%, 100% 100%, 0 100%)"
          }}
        >
          <ArrowLeft className="w-3 h-3 text-sepia/70 group-hover:text-brass transition-colors" />
          <span className="font-typewriter text-xs text-sepia/80 group-hover:text-brass transition-colors">
            Back to Desk
          </span>
          
          {/* Paper tab effect */}
          <div 
            className="absolute -right-1 top-0 bottom-0 w-2"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(92, 74, 50, 0.05) 100%)"
            }}
          />
        </div>
      </Link>
    </motion.div>
  )
}
