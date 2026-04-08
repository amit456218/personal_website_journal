"use client"

import { motion } from "framer-motion"

export function DeskDecorations() {
  return (
    <>
      {/* BIGGER Admit One Ticket - underneath project of the day */}
      <motion.div
        className="absolute left-[3%] bottom-[18%] z-5 pointer-events-none"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        style={{ transform: "rotate(-8deg)" }}
      >
        <div 
          className="w-14 h-28 bg-gradient-to-b from-paper-light to-[#e8dcc8] rounded-sm relative overflow-hidden"
          style={{ boxShadow: "2px 2px 6px rgba(0,0,0,0.15)" }}
        >
          {/* Perforated edge */}
          <div className="absolute right-0 top-0 bottom-0 w-1 flex flex-col justify-around">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-paper-dark" />
            ))}
          </div>
          {/* Ticket content */}
          <div className="p-2 flex flex-col h-full justify-between">
            <div>
              <div className="font-typewriter text-[7px] text-sepia/60 tracking-wider">ADMIT</div>
              <div className="font-serif text-lg text-sepia/80 font-bold leading-tight">ONE</div>
            </div>
            <div className="w-8 h-px bg-sepia/30" />
            <div>
              <div className="font-typewriter text-[5px] text-sepia/40">No. 0247</div>
              <div className="font-typewriter text-[4px] text-sepia/30 mt-1">KEEP THIS STUB</div>
            </div>
          </div>
          {/* Decorative stripe */}
          <div className="absolute left-1 top-0 bottom-0 w-0.5 bg-stamp-red/30" />
        </div>
      </motion.div>

      {/* Vintage postcard corner - top right area */}
      <motion.div
        className="absolute right-[32%] top-[5%] z-5 pointer-events-none"
        initial={{ opacity: 0, rotate: 15 }}
        animate={{ opacity: 0.5, rotate: 12 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <div 
          className="w-20 h-14 rounded-sm relative overflow-hidden"
          style={{ 
            background: "linear-gradient(145deg, #f5ede0 0%, #e0d4c0 100%)",
            boxShadow: "2px 2px 6px rgba(0,0,0,0.12)"
          }}
        >
          {/* Postcard lines */}
          <div className="absolute right-2 top-2 bottom-2 w-10">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-full h-px bg-sepia/20 mb-2" />
            ))}
          </div>
          {/* Stamp area hint */}
          <div className="absolute right-1.5 top-1.5 w-5 h-6 border border-dashed border-sepia/30 rounded-[1px]" />
          {/* "POST CARD" text */}
          <div className="absolute left-1.5 top-1.5 font-typewriter text-[5px] text-sepia/40 tracking-wider">
            POST CARD
          </div>
          {/* Dividing line */}
          <div className="absolute left-1/2 top-2 bottom-2 w-px bg-sepia/20" />
        </div>
      </motion.div>

      {/* Compass/navigation element - right side */}
      <motion.div
        className="absolute right-[3%] top-[32%] z-5 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.45, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <div className="w-12 h-12 rounded-full border-2 border-sepia/30 relative">
          {/* Compass markings */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 font-typewriter text-[6px] text-sepia/50">N</div>
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 font-typewriter text-[5px] text-sepia/40">S</div>
          <div className="absolute left-1 top-1/2 -translate-y-1/2 font-typewriter text-[5px] text-sepia/40">W</div>
          <div className="absolute right-1 top-1/2 -translate-y-1/2 font-typewriter text-[5px] text-sepia/40">E</div>
          {/* Needle */}
          <div className="absolute inset-2 flex items-center justify-center">
            <div 
              className="w-0.5 h-6 bg-gradient-to-b from-stamp-red/60 to-sepia/40"
              style={{ transform: "rotate(15deg)" }}
            />
          </div>
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brass/60" />
        </div>
      </motion.div>

      {/* Wax seal - bottom right area */}
      <motion.div
        className="absolute right-[6%] bottom-[32%] z-5 pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.2 }}
      >
        <div 
          className="w-10 h-10 rounded-full relative"
          style={{
            background: "radial-gradient(circle at 35% 35%, #c94a4a 0%, #8b2020 60%, #6b1515 100%)",
            boxShadow: "2px 2px 5px rgba(0,0,0,0.3), inset -1px -1px 2px rgba(0,0,0,0.2)"
          }}
        >
          <div className="absolute inset-2 rounded-full border border-amber-200/20 flex items-center justify-center">
            <span className="font-serif text-[10px] text-amber-100/70">AG</span>
          </div>
        </div>
      </motion.div>

      {/* Coffee ring stain - subtle */}
      <motion.div
        className="absolute left-[45%] bottom-[25%] z-2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div 
          className="w-16 h-16 rounded-full"
          style={{
            background: "radial-gradient(circle, transparent 50%, rgba(139, 115, 85, 0.3) 55%, transparent 65%)"
          }}
        />
      </motion.div>

      {/* Route scribble - larger */}
      <motion.svg
        className="absolute right-[18%] top-[18%] w-24 h-12 z-5 pointer-events-none"
        viewBox="0 0 100 50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <path
          d="M5 35 Q20 10, 40 25 T70 15 T95 30"
          fill="none"
          stroke="#8b7355"
          strokeWidth="1.5"
          strokeDasharray="3,3"
          strokeLinecap="round"
        />
        <circle cx="5" cy="35" r="3" fill="#b85450" opacity="0.6" />
        <circle cx="95" cy="30" r="3" fill="#b85450" opacity="0.6" />
        <circle cx="40" cy="25" r="2" fill="#8b7355" opacity="0.4" />
      </motion.svg>

      {/* Paper clip - near field notes */}
      <motion.div
        className="absolute left-[14%] top-[4%] z-25 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={{ transform: "rotate(25deg)" }}
      >
        <svg viewBox="0 0 14 32" className="w-4 h-9">
          <path 
            d="M3.5 2C3.5 1 4.5 0.5 5.5 0.5h3c1 0 2 0.5 2 1.5v23c0 2.5-2 4.5-4.5 4.5S1.5 27 1.5 24.5V7c0-2 1.2-3 3-3s3 1 3 3v16"
            stroke="#9ca3af"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* Handwritten annotation - near center bottom */}
      <motion.div
        className="absolute left-[38%] bottom-[10%] z-5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ duration: 0.6, delay: 1.3 }}
        style={{ transform: "rotate(-4deg)" }}
      >
        <span className="font-handwriting text-sm text-sepia/50 italic">
          memories &amp; moments...
        </span>
      </motion.div>

      {/* Small passport stamp - top area */}
      <motion.div
        className="absolute left-[48%] top-[5%] z-5 pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.45, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div 
          className="w-12 h-12 rounded-full border-2 border-stamp-red/50 flex items-center justify-center"
          style={{ transform: "rotate(-15deg)" }}
        >
          <div className="text-center">
            <div className="font-typewriter text-[6px] text-stamp-red/60 tracking-wider">APPROVED</div>
            <div className="font-typewriter text-[5px] text-stamp-red/50">2024</div>
          </div>
        </div>
      </motion.div>

      {/* Torn map corner - bottom left */}
      <motion.div
        className="absolute left-[12%] bottom-[3%] z-5 pointer-events-none"
        initial={{ opacity: 0, rotate: 20 }}
        animate={{ opacity: 0.4, rotate: 15 }}
        transition={{ duration: 0.5, delay: 1.4 }}
      >
        <div 
          className="w-14 h-10 relative overflow-hidden"
          style={{ 
            background: "linear-gradient(135deg, #e8dcc8 0%, #d8ccb8 100%)",
            boxShadow: "1px 1px 4px rgba(0,0,0,0.1)",
            clipPath: "polygon(0 0, 100% 10%, 95% 100%, 5% 90%)"
          }}
        >
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 56 40">
            <line x1="0" y1="10" x2="56" y2="10" stroke="#8b7355" strokeWidth="0.3" opacity="0.3" />
            <line x1="0" y1="20" x2="56" y2="20" stroke="#8b7355" strokeWidth="0.3" opacity="0.3" />
            <line x1="0" y1="30" x2="56" y2="30" stroke="#8b7355" strokeWidth="0.3" opacity="0.3" />
            <line x1="14" y1="0" x2="14" y2="40" stroke="#8b7355" strokeWidth="0.3" opacity="0.3" />
            <line x1="28" y1="0" x2="28" y2="40" stroke="#8b7355" strokeWidth="0.3" opacity="0.3" />
            <line x1="42" y1="0" x2="42" y2="40" stroke="#8b7355" strokeWidth="0.3" opacity="0.3" />
            {/* Route line */}
            <path d="M8 30 Q20 15, 48 20" fill="none" stroke="#b85450" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>
      </motion.div>
    </>
  )
}
