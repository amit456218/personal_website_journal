"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function AwardsSkillsToken() {
  return (
    <Link href="/awards" className="block">
      <motion.div
        className="relative cursor-pointer group"
        initial={{ opacity: 0, rotate: 8, scale: 1.3 }}
        animate={{ opacity: 1, rotate: 6, scale: 1.3 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{
          scale: 1.55,
          rotate: 0,
          transition: { duration: 0.25 }
        }}
      >
        {/* Vintage certificate/diploma ribbon rosette */}
        <div className="relative" style={{ width: "100px", height: "85px" }}>
          
          {/* Ribbon tails hanging down */}
          <svg className="absolute top-[45px] left-1/2 -translate-x-1/2 w-20 h-12" viewBox="0 0 80 48">
            {/* Left ribbon tail */}
            <path 
              d="M25 0 L20 45 L28 38 L36 48 L32 0" 
              fill="url(#ribbonLeft)" 
              stroke="#903838" 
              strokeWidth="0.5"
            />
            {/* Right ribbon tail */}
            <path 
              d="M48 0 L44 48 L52 38 L60 45 L55 0" 
              fill="url(#ribbonRight)" 
              stroke="#903838" 
              strokeWidth="0.5"
            />
            {/* Ribbon shine */}
            <path d="M27 5 L24 35" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
            <path d="M51 5 L48 35" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
            
            <defs>
              <linearGradient id="ribbonLeft" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#b04848" />
                <stop offset="50%" stopColor="#cc5858" />
                <stop offset="100%" stopColor="#c05050" />
              </linearGradient>
              <linearGradient id="ribbonRight" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#c05050" />
                <stop offset="50%" stopColor="#cc5858" />
                <stop offset="100%" stopColor="#b04848" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Rosette layers */}
          <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-[70px] h-[70px]" viewBox="0 0 70 70">
            {/* Outer pleated rosette */}
            {Array.from({ length: 24 }).map((_, i) => {
              const r = (n: number) => n.toFixed(3)
              const angle = (i * 15) * (Math.PI / 180)
              const x1 = r(35 + 28 * Math.cos(angle))
              const y1 = r(35 + 28 * Math.sin(angle))
              const x2 = r(35 + 34 * Math.cos(angle + 0.13))
              const y2 = r(35 + 34 * Math.sin(angle + 0.13))
              const x3 = r(35 + 28 * Math.cos(angle + 0.26))
              const y3 = r(35 + 28 * Math.sin(angle + 0.26))
              return (
                <path
                  key={i}
                  d={`M35,35 L${x1},${y1} L${x2},${y2} L${x3},${y3} Z`}
                  fill={i % 2 === 0 ? "#c45858" : "#b44848"}
                  stroke="#9a4040"
                  strokeWidth="0.3"
                />
              )
            })}
            
            {/* Inner gold ring */}
            <circle cx="35" cy="35" r="20" fill="url(#goldRing)" stroke="#8a6c20" strokeWidth="1" />
            <circle cx="35" cy="35" r="17" fill="none" stroke="#c9a04a" strokeWidth="0.5" opacity="0.6" />
            
            {/* Center medallion */}
            <circle cx="35" cy="35" r="15" fill="url(#centerGold)" stroke="#8a6c20" strokeWidth="0.5" />
            
            {/* Trophy/laurel icon */}
            <g transform="translate(35, 35)">
              {/* Left laurel */}
              <path d="M-8,-6 Q-10,-3 -9,0 Q-11,2 -9,5 Q-10,7 -8,8" fill="none" stroke="#5a4a20" strokeWidth="1.2" strokeLinecap="round" />
              <ellipse cx="-9" cy="-4" rx="2" ry="3" fill="#7a6a30" transform="rotate(-20 -9 -4)" />
              <ellipse cx="-10" cy="1" rx="2" ry="3" fill="#7a6a30" transform="rotate(-10 -10 1)" />
              <ellipse cx="-9" cy="6" rx="2" ry="3" fill="#7a6a30" transform="rotate(10 -9 6)" />
              
              {/* Right laurel */}
              <path d="M8,-6 Q10,-3 9,0 Q11,2 9,5 Q10,7 8,8" fill="none" stroke="#5a4a20" strokeWidth="1.2" strokeLinecap="round" />
              <ellipse cx="9" cy="-4" rx="2" ry="3" fill="#7a6a30" transform="rotate(20 9 -4)" />
              <ellipse cx="10" cy="1" rx="2" ry="3" fill="#7a6a30" transform="rotate(10 10 1)" />
              <ellipse cx="9" cy="6" rx="2" ry="3" fill="#7a6a30" transform="rotate(-10 9 6)" />
              
              {/* Star center */}
              <path d="M0,-7 L1.8,-2 L7,-2 L2.8,1.5 L4.5,7 L0,4 L-4.5,7 L-2.8,1.5 L-7,-2 L-1.8,-2 Z" fill="url(#starGold)" stroke="#8a6c20" strokeWidth="0.3" />
            </g>
            
            {/* Shine */}
            <ellipse cx="28" cy="28" rx="6" ry="5" fill="rgba(255,255,255,0.15)" transform="rotate(-30 28 28)" />
            
            <defs>
              <radialGradient id="goldRing" cx="40%" cy="35%">
                <stop offset="0%" stopColor="#f5de6e" />
                <stop offset="60%" stopColor="#d4a838" />
                <stop offset="100%" stopColor="#a88020" />
              </radialGradient>
              <radialGradient id="centerGold" cx="35%" cy="30%">
                <stop offset="0%" stopColor="#faf0c8" />
                <stop offset="50%" stopColor="#e8c860" />
                <stop offset="100%" stopColor="#c9a040" />
              </radialGradient>
              <linearGradient id="starGold" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d4a020" />
                <stop offset="100%" stopColor="#a07818" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Push pin at top */}
          <div 
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10"
            style={{
              background: "radial-gradient(circle at 35% 35%, #e8e8e8 0%, #b0b0b0 50%, #888 100%)",
              boxShadow: "1px 1px 2px rgba(0,0,0,0.3)"
            }}
          />
        </div>
        
        {/* Label */}
        <motion.p
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-handwriting text-sm text-sepia/70 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          awards & skills
        </motion.p>
      </motion.div>
    </Link>
  )
}
