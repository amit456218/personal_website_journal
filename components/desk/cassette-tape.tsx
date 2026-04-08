"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function CassetteTape() {
  return (
    <Link href="/music" className="block">
      <motion.div
        className="relative cursor-pointer group"
        initial={{ opacity: 0, rotate: 8 }}
        animate={{ opacity: 1, rotate: 5 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ 
          scale: 1.05,
          rotate: 2,
          transition: { duration: 0.2 }
        }}
      >
        {/* Vinyl sleeve / Hotel lounge setlist card */}
        <div 
          className="relative w-24 h-24 rounded-sm overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #e8dcc8 0%, #d8c8b0 100%)",
            boxShadow: "4px 4px 12px rgba(44, 36, 22, 0.25), 1px 1px 3px rgba(44, 36, 22, 0.15)"
          }}
        >
          {/* Paper texture */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: "url('/textures/paper-texture.jpg')",
              backgroundSize: "200px",
              mixBlendMode: "multiply"
            }}
          />
          
          {/* Decorative border */}
          <div className="absolute inset-1.5 border border-sepia/30 rounded-sm" />
          
          {/* Inner vinyl circle hint */}
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-sepia/20"
            style={{ background: "radial-gradient(circle, #2c2420 0%, #1a1815 60%, #2c2420 100%)" }}
          >
            {/* Label center */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full"
              style={{ background: "linear-gradient(135deg, #c9a86c 0%, #a68c5b 100%)" }}
            >
              <div className="absolute inset-1 rounded-full bg-sepia/30" />
            </div>
            {/* Grooves hint */}
            <div className="absolute inset-2 rounded-full border border-sepia/10" />
            <div className="absolute inset-3 rounded-full border border-sepia/10" />
          </div>
          
          {/* Corner text */}
          <div className="absolute top-2 left-2">
            <span className="font-typewriter text-[6px] text-sepia/50 tracking-wider">VOL. 1</span>
          </div>
          
          {/* Title */}
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="font-handwriting text-xs text-sepia/80">Music</span>
          </div>
        </div>
        
        {/* Tap to explore */}
        <motion.p
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-handwriting text-xs text-sepia/50 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          tap to play
        </motion.p>
      </motion.div>
    </Link>
  )
}
