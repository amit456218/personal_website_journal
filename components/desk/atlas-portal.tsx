"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface AtlasPortalProps {
  onNavigate?: () => void
}

export function AtlasPortal({ onNavigate }: AtlasPortalProps) {
  const router = useRouter()
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    if (isAnimating) return
    setIsAnimating(true)
    
    // Set transition flag for the cinematic animation
    sessionStorage.setItem("atlas-transition", "to-atlas")
    
    onNavigate?.()
    
    // Navigate after a brief delay to let the exit animation start
    setTimeout(() => {
      router.push("/atlas")
    }, 50)
  }

  return (
    <motion.button
      onClick={handleClick}
      className="relative cursor-pointer group focus:outline-none"
      style={{ transform: "rotate(5deg)" }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ 
        scale: 1.05,
        rotate: 3,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      disabled={isAnimating}
    >
      {/* Folded map */}
      <div 
        className="relative w-24 h-20 md:w-28 md:h-24"
        style={{
          background: "#e8dcc8",
          boxShadow: "4px 4px 12px rgba(44, 36, 22, 0.2), 2px 2px 6px rgba(44, 36, 22, 0.12)",
        }}
      >
        {/* Fold lines creating accordion effect */}
        <div className="absolute inset-0">
          {/* Horizontal fold */}
          <div 
            className="absolute left-0 right-0 top-1/2 h-px"
            style={{ background: "rgba(92, 74, 50, 0.2)" }}
          />
          {/* Vertical folds */}
          <div 
            className="absolute top-0 bottom-0 left-1/3 w-px"
            style={{ background: "rgba(92, 74, 50, 0.15)" }}
          />
          <div 
            className="absolute top-0 bottom-0 right-1/3 w-px"
            style={{ background: "rgba(92, 74, 50, 0.15)" }}
          />
        </div>
        
        {/* Map preview illustration */}
        <svg 
          viewBox="0 0 100 80" 
          className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] opacity-40"
        >
          {/* Grid lines */}
          {[...Array(5)].map((_, i) => (
            <line 
              key={`h-${i}`}
              x1="0" y1={i * 20} x2="100" y2={i * 20}
              stroke="#a89878" strokeWidth="0.3"
            />
          ))}
          {[...Array(6)].map((_, i) => (
            <line 
              key={`v-${i}`}
              x1={i * 20} y1="0" x2={i * 20} y2="80"
              stroke="#a89878" strokeWidth="0.3"
            />
          ))}
          {/* Simplified continent shapes */}
          <ellipse cx="25" cy="35" rx="12" ry="15" fill="#c4b49a" />
          <ellipse cx="55" cy="30" rx="15" ry="12" fill="#c4b49a" />
          <ellipse cx="75" cy="45" rx="10" ry="12" fill="#c4b49a" />
        </svg>
        
        {/* Label */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="font-typewriter text-[10px] md:text-xs text-sepia/80 tracking-wider block">
              THE ROUTES
            </span>
            <span className="font-handwriting text-sm md:text-base text-sepia group-hover:text-brass transition-colors">
              Open Atlas
            </span>
          </div>
        </div>
        
        {/* Worn corner */}
        <div 
          className="absolute bottom-0 right-0 w-4 h-4"
          style={{
            background: "linear-gradient(135deg, transparent 50%, rgba(200, 185, 155, 0.4) 50%)",
          }}
        />
      </div>
      
      {/* Subtle string/tag attached */}
      <div 
        className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-4 bg-sepia/40"
      />
      <div 
        className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-sepia/50 bg-paper-light"
      />
    </motion.button>
  )
}
