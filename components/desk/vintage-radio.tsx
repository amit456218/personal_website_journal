"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function VintageRadio() {
  return (
    <Link href="/music">
      <motion.div
        className="cursor-pointer relative"
        initial={{ opacity: 0, y: -12, rotate: -8, scale: 1.16 }}
        animate={{ opacity: 1, y: 0, rotate: -5, scale: 1.16 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        whileHover={{ y: -5, rotate: 0, scale: 1.35, transition: { duration: 0.3 } }}
      >
        {/* Antenna */}
        <svg className="absolute -top-6 right-4 w-5 h-9 z-10" viewBox="0 0 20 40" style={{ filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.3))" }}>
          {/* Main rod — tapers from base to tip */}
          <line x1="10" y1="38" x2="14" y2="3" stroke="url(#antennaGrad)" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="10" y1="38" x2="14" y2="3" stroke="url(#antennaShine)" strokeWidth="0.6" strokeLinecap="round" />
          {/* Ball tip */}
          <circle cx="14" cy="3" r="2" fill="url(#antennaTip)" />
          {/* Base joint */}
          <circle cx="10" cy="38" r="2.5" fill="#666" stroke="#555" strokeWidth="0.5" />
          <circle cx="10" cy="38" r="1" fill="#888" />
          <defs>
            <linearGradient id="antennaGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#777" />
              <stop offset="100%" stopColor="#bbb" />
            </linearGradient>
            <linearGradient id="antennaShine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <radialGradient id="antennaTip">
              <stop offset="0%" stopColor="#ddd" />
              <stop offset="100%" stopColor="#999" />
            </radialGradient>
          </defs>
        </svg>

        <div
          className="relative rounded-lg overflow-visible"
          style={{
            width: "176px",
            height: "112px",
            background: "linear-gradient(175deg, #7a5530 0%, #5a3a18 40%, #4a2e12 100%)",
            boxShadow: "5px 6px 16px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,200,100,0.12), inset 0 -1px 2px rgba(0,0,0,0.3)",
            border: "1.5px solid #3a2008",
            borderRadius: "8px"
          }}
        >
          {/* Wood grain */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none rounded-lg"
            style={{
              backgroundImage: `repeating-linear-gradient(92deg, transparent, transparent 5px, rgba(0,0,0,0.1) 5px, rgba(0,0,0,0.1) 6px)`,
            }}
          />

          {/* Top shine */}
          <div
            className="absolute top-0 left-0 right-0 h-6 rounded-t-lg pointer-events-none"
            style={{ background: "linear-gradient(180deg, rgba(255,220,150,0.08) 0%, transparent 100%)" }}
          />

          {/* Gold decorative trim */}
          <div
            className="absolute inset-1.5 rounded-md pointer-events-none"
            style={{ border: "0.8px solid rgba(201,160,74,0.25)" }}
          />

          {/* Left side: speaker grille with cloth texture */}
          <div className="absolute top-2 left-2 w-14 bottom-2">
            <div
              className="w-full h-full rounded-sm overflow-hidden relative flex flex-col justify-center"
              style={{ background: "#1e1208", border: "1px solid rgba(201,160,74,0.2)", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.5)" }}
            >
              {/* Cloth backing */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `
                    repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(139,99,49,0.3) 2px, rgba(139,99,49,0.3) 3px),
                    repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(139,99,49,0.15) 2px, rgba(139,99,49,0.15) 3px)
                  `
                }}
              />
              {/* Horizontal grille slats */}
              <div style={{ marginTop: "-2px" }}>
              {[...Array(15)].map((_, i) => (
                <div key={i} className="w-full" style={{ height: "1px", marginTop: "4.5px", background: "linear-gradient(90deg, transparent 5%, #c9a04a 15%, #c9a04a 85%, transparent 95%)", opacity: 0.55 }} />
              ))}
              </div>
            </div>
          </div>

          {/* Right side: dial and text */}
          <div className="absolute top-2 left-[72px] right-2 bottom-2 flex flex-col">
            {/* Title */}
            <p className="font-typewriter text-[13px] text-amber-100 font-normal leading-tight tracking-wide uppercase" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}>
              Current Listens
            </p>
            <p className="font-typewriter text-[7px] tracking-[0.3em] text-amber-300/60">TUNED IN</p>

            {/* Frequency dial — larger and more detailed */}
            <div
              className="rounded-[3px] relative overflow-hidden mr-2"
              style={{
                marginTop: "3px",
                height: "40px",
                background: "linear-gradient(180deg, #faf0d8 0%, #e8d8b0 50%, #dcc8a0 100%)",
                border: "0.5px solid #a88840",
                boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)"
              }}
            >
              {/* Frequency numbers */}
              <div className="absolute inset-0 flex items-start justify-between px-1.5 pt-0.5">
                <span className="font-typewriter text-[5px] text-sepia/70 font-bold">55</span>
                <span className="font-typewriter text-[5px] text-sepia/50">70</span>
                <span className="font-typewriter text-[5px] text-sepia/50">88</span>
                <span className="font-typewriter text-[5px] text-sepia/50">100</span>
                <span className="font-typewriter text-[5px] text-sepia/70 font-bold">FM</span>
              </div>
              {/* Tick marks */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 flex items-end justify-between px-1">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-px bg-sepia/30" style={{ height: i % 4 === 0 ? "4px" : "2px" }} />
                ))}
              </div>
              {/* Red tuner needle */}
              <motion.div
                className="absolute top-0 bottom-0 w-[1.5px] bg-red-600 rounded-full"
                style={{ boxShadow: "0 0 2px rgba(200,50,50,0.4)" }}
                animate={{ left: ["28%", "62%", "44%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Knobs row */}
            <div className="flex items-center gap-2.5 mt-1">
              {/* Volume knob — slowly turns */}
              <div className="flex flex-col items-center gap-0.5">
                <motion.div
                  className="w-3.5 h-3.5 rounded-full relative"
                  style={{
                    background: "radial-gradient(circle at 35% 30%, #d4b068 0%, #a88c48 40%, #7a6428 100%)",
                    boxShadow: "1px 2px 3px rgba(0,0,0,0.45), inset 0 1px 2px rgba(255,255,255,0.2)"
                  }}
                  animate={{ rotate: [0, 90, 60] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-px h-2 bg-amber-900/60 rounded-full" />
                  <div className="absolute inset-0.5 rounded-full border border-amber-300/15" />
                </motion.div>
                <span className="font-typewriter text-[5px] text-amber-400/40">VOL</span>
              </div>
              {/* Tune knob — turns with the needle */}
              <div className="flex flex-col items-center gap-0.5">
                <motion.div
                  className="w-3.5 h-3.5 rounded-full relative"
                  style={{
                    background: "radial-gradient(circle at 35% 30%, #d4b068 0%, #a88c48 40%, #7a6428 100%)",
                    boxShadow: "1px 2px 3px rgba(0,0,0,0.45), inset 0 1px 2px rgba(255,255,255,0.2)"
                  }}
                  animate={{ rotate: [0, 120, 50] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-px h-2 bg-amber-900/60 rounded-full" />
                  <div className="absolute inset-0.5 rounded-full border border-amber-300/15" />
                </motion.div>
                <span className="font-typewriter text-[5px] text-amber-400/40">TUNE</span>
              </div>
              {/* Brand */}
              <div className="ml-auto text-right">
                <span className="font-serif text-[6px] text-amber-400/50 italic block leading-none">HiFi</span>
                <span className="font-typewriter text-[4px] text-amber-400/30">&#9835;</span>
              </div>
            </div>
          </div>
        </div>
        {/* Click to view label */}
        <motion.p
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-handwriting text-xs text-sepia/90 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          click to view
        </motion.p>
      </motion.div>
    </Link>
  )
}
