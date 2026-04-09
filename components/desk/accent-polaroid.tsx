"use client"

import { motion } from "framer-motion"

export function AccentPolaroid() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, rotate: -6, y: 20 }}
      animate={{ opacity: 1, rotate: -4, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: 0, scale: 1.05, y: -5 }}
    >
      {/* Polaroid frame */}
      <div 
        className="relative bg-paper-light p-2 pb-8 w-28 md:w-32"
        style={{
          boxShadow: "6px 6px 20px rgba(44, 36, 22, 0.2), 2px 2px 8px rgba(44, 36, 22, 0.1)",
        }}
      >
        {/* Photo area - vintage travel scene */}
        <div 
          className="aspect-square relative overflow-hidden"
          style={{ 
            background: "linear-gradient(165deg, #c9b896 0%, #a89070 40%, #8b7355 100%)" 
          }}
        >
          {/* Layered travel scene illustration */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
            {/* Sky gradient */}
            <defs>
              <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d4c5a9" />
                <stop offset="100%" stopColor="#c4b49a" />
              </linearGradient>
            </defs>
            <rect width="100" height="60" fill="url(#sky)" />
            
            {/* Sun/moon */}
            <circle cx="75" cy="22" r="10" fill="#e8d4a8" opacity="0.9" />
            <circle cx="75" cy="22" r="8" fill="#f0e4c4" opacity="0.7" />
            
            {/* Distant mountains */}
            <path d="M0 55 L20 30 L35 45 L50 25 L70 40 L85 28 L100 50 L100 60 L0 60 Z" fill="#9b8970" opacity="0.5" />
            
            {/* Closer mountain */}
            <path d="M0 60 L25 35 L40 50 L60 30 L80 45 L100 35 L100 70 L0 70 Z" fill="#8b7355" opacity="0.7" />
            
            {/* Ground/field */}
            <rect y="60" width="100" height="40" fill="#7a6548" />
            
            {/* Path/road */}
            <path d="M45 100 Q50 80 55 70 Q52 65 50 60" fill="none" stroke="#a89070" strokeWidth="3" opacity="0.6" />
            
            {/* Small building silhouette */}
            <rect x="70" y="55" width="12" height="10" fill="#5c4a32" opacity="0.4" />
            <polygon points="70,55 76,48 82,55" fill="#5c4a32" opacity="0.4" />
            
            {/* Birds */}
            <g opacity="0.4" fill="none" stroke="#5c4a32" strokeWidth="0.8">
              <path d="M25 25 Q28 22 31 25" />
              <path d="M35 28 Q37 26 39 28" />
              <path d="M20 32 Q22 30 24 32" />
            </g>
            
            {/* Foreground grass texture */}
            <g stroke="#5c4a32" strokeWidth="0.5" opacity="0.3">
              <line x1="10" y1="95" x2="12" y2="88" />
              <line x1="20" y1="92" x2="22" y2="86" />
              <line x1="30" y1="94" x2="31" y2="89" />
              <line x1="65" y1="93" x2="67" y2="87" />
              <line x1="80" y1="95" x2="81" y2="90" />
              <line x1="90" y1="92" x2="92" y2="85" />
            </g>
          </svg>
          
          {/* Vintage photo overlay effects */}
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, rgba(255, 250, 240, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 70% 70%, rgba(92, 74, 50, 0.1) 0%, transparent 40%)
              `
            }}
          />
          
          {/* Film grain effect */}
          <div 
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
          
          {/* Corner vignette */}
          <div 
            className="absolute inset-0"
            style={{
              boxShadow: "inset 0 0 30px rgba(44, 36, 22, 0.3)"
            }}
          />
        </div>
        
        {/* Caption area */}
        <div className="mt-2 text-center">
          <span className="font-handwriting text-sm text-sepia/80">
            somewhere, sometime
          </span>
        </div>
      </div>
      
      {/* Tape strip */}
      <div 
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-5 z-10"
        style={{
          background: "linear-gradient(180deg, rgba(255, 248, 220, 0.85) 0%, rgba(245, 235, 200, 0.8) 100%)",
          transform: "translateX(-50%) rotate(2deg)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.06)"
        }}
      />
    </motion.div>
  )
}
