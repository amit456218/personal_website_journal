"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function FieldNotesBook() {
  return (
    <Link href="/projects">
      <motion.div
        className="relative w-24 h-36 cursor-pointer group"
        initial={{ opacity: 0, x: -20, rotate: -12 }}
        animate={{ opacity: 1, x: 0, rotate: -8 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ 
          y: -6, 
          rotate: -5,
          transition: { duration: 0.2 }
        }}
      >
        {/* Notebook cover */}
        <div 
          className="absolute inset-0 rounded-sm"
          style={{
            background: "linear-gradient(145deg, #5c4a32 0%, #4a3b28 100%)",
            boxShadow: "4px 4px 12px rgba(44, 36, 22, 0.3), 2px 2px 6px rgba(44, 36, 22, 0.2)",
          }}
        >
          {/* Spine detail */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-3"
            style={{
              background: "linear-gradient(90deg, rgba(0,0,0,0.2) 0%, transparent 100%)"
            }}
          />
          
          {/* Cover texture lines */}
          <div className="absolute inset-3 border border-brass/30" />
          
          {/* Title */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-2">
            <span 
              className="font-typewriter text-sm text-brass/90 tracking-[0.12em] text-center leading-tight"
            >
              FIELD
            </span>
            <span 
              className="font-typewriter text-sm text-brass/90 tracking-[0.12em] text-center"
            >
              NOTES
            </span>
            <div className="w-8 h-px bg-brass/40 mt-2 mb-1" />
            <span className="font-handwriting text-base text-brass/70">
              Projects
            </span>
          </div>
          
          {/* Elastic band */}
          <div 
            className="absolute right-2 top-0 bottom-0 w-1 bg-stamp-red/80 group-hover:bg-stamp-red transition-colors"
            style={{ borderRadius: "0 2px 2px 0" }}
          />
        </div>
        
        {/* Pages peeking out */}
        <div 
          className="absolute -right-0.5 top-2 bottom-2 w-1 rounded-r-sm"
          style={{ background: "linear-gradient(90deg, #e8dcc8 0%, #f4ecd8 100%)" }}
        />
        
        {/* Tap to explore label */}
        <motion.p
          className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-handwriting text-sm text-sepia/60 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          tap to explore
        </motion.p>
      </motion.div>
    </Link>
  )
}
