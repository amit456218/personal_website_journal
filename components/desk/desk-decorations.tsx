"use client"

import { motion } from "framer-motion"

export function DeskDecorations() {
  return (
    <>
      {/* Small passport stamp - top area */}
      <motion.div
        className="absolute left-[42%] top-[6%] z-5 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div 
          className="w-10 h-10 rounded-full border-2 border-stamp-red/50 flex items-center justify-center"
          style={{ transform: "rotate(-15deg)" }}
        >
          <div className="text-center">
            <div className="font-typewriter text-[5px] text-stamp-red/60 tracking-wider">APPROVED</div>
            <div className="font-typewriter text-[4px] text-stamp-red/50">2024</div>
          </div>
        </div>
      </motion.div>

      {/* Tiny route scribble - near atlas */}
      <motion.svg
        className="absolute right-[22%] top-[20%] w-16 h-8 z-5 pointer-events-none"
        viewBox="0 0 60 30"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <path
          d="M5 20 Q15 5, 25 15 T45 10 T55 18"
          fill="none"
          stroke="#8b7355"
          strokeWidth="1"
          strokeDasharray="2,2"
          strokeLinecap="round"
        />
        <circle cx="5" cy="20" r="2" fill="#b85450" opacity="0.6" />
        <circle cx="55" cy="18" r="2" fill="#b85450" opacity="0.6" />
      </motion.svg>

      {/* Paper clip - near field notes */}
      <motion.div
        className="absolute left-[14%] top-[5%] z-25 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={{ transform: "rotate(25deg)" }}
      >
        <svg viewBox="0 0 12 28" className="w-3 h-7">
          <path 
            d="M3 2C3 1 4 0.5 5 0.5h2c1 0 2 0.5 2 1.5v20c0 2-1.5 3.5-3.5 3.5S2 24 2 22V6c0-1.5 1-2.5 2.5-2.5S7 4.5 7 6v14"
            stroke="#9ca3af"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Wax seal - bottom right area */}
      <motion.div
        className="absolute right-[8%] bottom-[28%] z-5 pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.2 }}
      >
        <div 
          className="w-8 h-8 rounded-full relative"
          style={{
            background: "radial-gradient(circle at 35% 35%, #c94a4a 0%, #8b2020 60%, #6b1515 100%)",
            boxShadow: "2px 2px 4px rgba(0,0,0,0.3), inset -1px -1px 2px rgba(0,0,0,0.2)"
          }}
        >
          <div className="absolute inset-1.5 rounded-full border border-amber-200/20 flex items-center justify-center">
            <span className="font-serif text-[8px] text-amber-100/60">AG</span>
          </div>
        </div>
      </motion.div>

      {/* Tiny ticket fragment - left side */}
      <motion.div
        className="absolute left-[2%] top-[38%] z-5 pointer-events-none"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 0.35, x: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        style={{ transform: "rotate(-12deg)" }}
      >
        <div 
          className="w-6 h-12 bg-paper-light rounded-sm relative overflow-hidden"
          style={{ boxShadow: "1px 1px 3px rgba(0,0,0,0.15)" }}
        >
          {/* Perforated edge */}
          <div className="absolute right-0 top-0 bottom-0 w-0.5 flex flex-col justify-around">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-0.5 h-0.5 rounded-full bg-paper-dark" />
            ))}
          </div>
          {/* Ticket text */}
          <div className="p-1">
            <div className="font-typewriter text-[4px] text-sepia/50 tracking-tight">ADMIT</div>
            <div className="font-typewriter text-[6px] text-sepia/70 mt-1">ONE</div>
            <div className="w-3 h-px bg-sepia/30 mt-1" />
            <div className="font-typewriter text-[3px] text-sepia/40 mt-1">No. 0247</div>
          </div>
        </div>
      </motion.div>

      {/* Handwritten annotation - near center */}
      <motion.div
        className="absolute left-[35%] bottom-[18%] z-5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        style={{ transform: "rotate(-3deg)" }}
      >
        <span className="font-handwriting text-[10px] text-sepia/50 italic">
          memories...
        </span>
      </motion.div>

      {/* Map scrap - right side */}
      <motion.div
        className="absolute right-[3%] top-[42%] z-5 pointer-events-none"
        initial={{ opacity: 0, rotate: 20 }}
        animate={{ opacity: 0.3, rotate: 15 }}
        transition={{ duration: 0.5, delay: 1.3 }}
      >
        <div 
          className="w-10 h-8 relative overflow-hidden rounded-sm"
          style={{ 
            background: "linear-gradient(135deg, #e8dcc8 0%, #d8ccb8 100%)",
            boxShadow: "1px 1px 3px rgba(0,0,0,0.1)"
          }}
        >
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 40 32">
            <line x1="0" y1="8" x2="40" y2="8" stroke="#8b7355" strokeWidth="0.3" opacity="0.3" />
            <line x1="0" y1="16" x2="40" y2="16" stroke="#8b7355" strokeWidth="0.3" opacity="0.3" />
            <line x1="0" y1="24" x2="40" y2="24" stroke="#8b7355" strokeWidth="0.3" opacity="0.3" />
            <line x1="10" y1="0" x2="10" y2="32" stroke="#8b7355" strokeWidth="0.3" opacity="0.3" />
            <line x1="20" y1="0" x2="20" y2="32" stroke="#8b7355" strokeWidth="0.3" opacity="0.3" />
            <line x1="30" y1="0" x2="30" y2="32" stroke="#8b7355" strokeWidth="0.3" opacity="0.3" />
            {/* Route line */}
            <path d="M5 25 Q15 10, 35 15" fill="none" stroke="#b85450" strokeWidth="0.8" opacity="0.5" />
          </svg>
        </div>
      </motion.div>

      {/* Small stamp mark - bottom */}
      <motion.div
        className="absolute left-[48%] bottom-[6%] z-5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 0.4, delay: 1.4 }}
        style={{ transform: "rotate(8deg)" }}
      >
        <div className="w-12 h-6 border border-dashed border-sepia/40 rounded-sm flex items-center justify-center">
          <span className="font-typewriter text-[5px] text-sepia/50 tracking-widest">VERIFIED</span>
        </div>
      </motion.div>
    </>
  )
}
