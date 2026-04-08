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
          className="relative w-40 h-40 rounded-sm overflow-hidden"
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
          <div className="absolute inset-2.5 border border-sepia/30 rounded-sm" />
          
          {/* Spinning vinyl record */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-sepia/20"
            style={{ background: "radial-gradient(circle, #2c2420 0%, #1a1815 60%, #2c2420 100%)" }}
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "linear"
            }}
          >
            {/* Vinyl grooves - multiple rings */}
            <div className="absolute inset-2 rounded-full border border-white/5" />
            <div className="absolute inset-3 rounded-full border border-white/5" />
            <div className="absolute inset-4 rounded-full border border-white/5" />
            <div className="absolute inset-5 rounded-full border border-white/5" />
            <div className="absolute inset-6 rounded-full border border-white/5" />
            
            {/* Shine reflection on vinyl */}
            <div 
              className="absolute inset-0 rounded-full opacity-20"
              style={{
                background: "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)"
              }}
            />
            
            {/* Label center */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full"
              style={{ background: "linear-gradient(135deg, #c9a86c 0%, #a68c5b 100%)" }}
            >
              {/* Label text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-typewriter text-[5px] text-ink/70 tracking-wider">RECORDS</span>
                <span className="font-serif text-[7px] text-ink/80 font-medium">33 RPM</span>
              </div>
              {/* Center hole */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-ink/40" />
            </div>
          </motion.div>
          
          {/* Tonearm */}
          <div className="absolute top-3 right-3">
            {/* Arm base */}
            <div 
              className="w-3 h-3 rounded-full"
              style={{ 
                background: "linear-gradient(135deg, #8b8b8b 0%, #5a5a5a 100%)",
                boxShadow: "1px 1px 2px rgba(0,0,0,0.3)"
              }}
            />
            {/* Arm */}
            <div 
              className="absolute top-1 left-1 w-12 h-1 origin-left"
              style={{ 
                background: "linear-gradient(180deg, #9a9a9a 0%, #6a6a6a 100%)",
                transform: "rotate(35deg)",
                borderRadius: "2px",
                boxShadow: "1px 1px 2px rgba(0,0,0,0.2)"
              }}
            >
              {/* Headshell */}
              <div 
                className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2"
                style={{
                  background: "linear-gradient(180deg, #7a7a7a 0%, #4a4a4a 100%)",
                  borderRadius: "1px"
                }}
              />
            </div>
          </div>
          
          {/* Corner text */}
          <div className="absolute top-3 left-3">
            <span className="font-typewriter text-[9px] text-sepia/50 tracking-wider">VOL. 1</span>
          </div>
          
          {/* Title */}
          <div className="absolute bottom-3 left-0 right-0 text-center">
            <span className="font-handwriting text-base text-sepia/80">Music</span>
          </div>
        </div>
        
        {/* Tap to explore */}
        <motion.p
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-handwriting text-sm text-sepia/60 whitespace-nowrap"
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
