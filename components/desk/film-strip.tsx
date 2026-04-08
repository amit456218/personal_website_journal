"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function FilmStrip() {
  return (
    <Link href="/gallery" className="block">
      <motion.div
        className="relative cursor-pointer group"
        initial={{ opacity: 0, rotate: 10 }}
        animate={{ opacity: 1, rotate: 6 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        whileHover={{ 
          scale: 1.05,
          rotate: 3,
          transition: { duration: 0.2 }
        }}
      >
        {/* Film strip body */}
        <div 
          className="relative w-28 h-24 rounded-sm overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%)",
            boxShadow: "3px 3px 10px rgba(0,0,0,0.5)"
          }}
        >
          {/* Sprocket holes - left */}
          <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-around py-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-2 rounded-sm bg-paper-dark/80" />
            ))}
          </div>
          
          {/* Sprocket holes - right */}
          <div className="absolute right-1 top-0 bottom-0 flex flex-col justify-around py-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-2 rounded-sm bg-paper-dark/80" />
            ))}
          </div>
          
          {/* Photo frames */}
          <div className="absolute inset-x-4 inset-y-1.5 flex flex-col gap-1">
            {/* Frame 1 */}
            <div 
              className="flex-1 rounded-sm relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #d4c4a8 0%, #c8b89c 100%)" }}
            >
              <div className="absolute inset-0 opacity-60" style={{
                background: "linear-gradient(45deg, #a89070 25%, #c4b090 50%, #b8a480 75%)"
              }} />
              {/* Mini landscape hint */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-sepia/30 to-transparent" />
            </div>
            
            {/* Frame 2 */}
            <div 
              className="flex-1 rounded-sm relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #e0d0b8 0%, #d4c4a8 100%)" }}
            >
              <div className="absolute inset-0 opacity-50" style={{
                background: "radial-gradient(circle at 30% 40%, #f0e0c8 0%, #c8b89c 100%)"
              }} />
            </div>
            
            {/* Frame 3 */}
            <div 
              className="flex-1 rounded-sm relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #c8b89c 0%, #b8a88c 100%)" }}
            >
              <div className="absolute inset-0 opacity-40" style={{
                background: "linear-gradient(180deg, #d4c4a8 0%, #a89070 100%)"
              }} />
            </div>
          </div>
          
          {/* Film edge text */}
          <div className="absolute bottom-0.5 left-4 font-typewriter text-[5px] text-amber-500/40 tracking-wider">
            KODAK 400
          </div>
          
          {/* Frame numbers */}
          <div className="absolute top-0.5 right-4 font-typewriter text-[5px] text-amber-500/40">
            24A
          </div>
        </div>
        
        {/* Tap to explore */}
        <motion.p
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-handwriting text-xs text-sepia/50 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          tap to view
        </motion.p>
      </motion.div>
    </Link>
  )
}
