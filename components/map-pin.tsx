"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

interface MapPinProps {
  id: string
  location: string
  country: string
  date: string
  coordinates: {
    x: number
    y: number
  }
  index: number
}

export function MapPin({ id, location, country, date, coordinates, index }: MapPinProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      className="absolute z-10"
      style={{
        left: `${coordinates.x}%`,
        top: `${coordinates.y}%`,
        transform: "translate(-50%, -100%)"
      }}
      initial={{ opacity: 0, y: -20, scale: 0 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: 0.8 + index * 0.15,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
    >
      <Link
        href={`/journal/${id}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative block group"
      >
        {/* Pin shadow */}
        <motion.div
          className="absolute -bottom-1 left-1/2 w-4 h-2 bg-ink/20 rounded-full blur-sm"
          style={{ transform: "translateX(-50%)" }}
          animate={{ 
            scale: isHovered ? 1.3 : 1,
            opacity: isHovered ? 0.3 : 0.2
          }}
        />
        
        {/* Pin body */}
        <motion.div
          className="relative"
          animate={{ 
            y: isHovered ? -4 : 0,
            rotate: isHovered ? [0, -5, 5, 0] : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <svg
            width="28"
            height="36"
            viewBox="0 0 28 36"
            className="drop-shadow-md"
          >
            {/* Pin shape */}
            <path
              d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.27 21.73 0 14 0z"
              fill="#a84444"
              className="group-hover:fill-[#8b3a3a] transition-colors"
            />
            {/* Highlight */}
            <ellipse
              cx="10"
              cy="10"
              rx="4"
              ry="5"
              fill="#c45555"
              opacity="0.5"
            />
            {/* Center dot */}
            <circle
              cx="14"
              cy="13"
              r="5"
              fill="#f4ecd8"
            />
            <circle
              cx="14"
              cy="13"
              r="3"
              fill="#a84444"
            />
          </svg>
        </motion.div>
        
        {/* Tooltip */}
        <motion.div
          className="absolute left-1/2 bottom-full mb-2 pointer-events-none"
          style={{ transform: "translateX(-50%)" }}
          initial={{ opacity: 0, y: 5, scale: 0.9 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 5,
            scale: isHovered ? 1 : 0.9
          }}
          transition={{ duration: 0.2 }}
        >
          <div 
            className="bg-paper-light px-4 py-3 rounded shadow-lg border border-border whitespace-nowrap"
            style={{ 
              transform: `rotate(${Math.random() * 2 - 1}deg)`,
              boxShadow: "4px 4px 12px rgba(44, 36, 22, 0.2)"
            }}
          >
            <p className="font-handwriting text-xl text-ink font-semibold">
              {location}
            </p>
            <p className="font-typewriter text-xs text-sepia mt-0.5">
              {country}
            </p>
            <p className="font-typewriter text-[10px] text-muted-foreground mt-1">
              {date}
            </p>
            {/* Little tape on corner */}
            <div 
              className="absolute -top-2 -right-1 w-6 h-3 tape"
              style={{ transform: "rotate(15deg)" }}
            />
          </div>
          {/* Arrow */}
          <div 
            className="absolute left-1/2 -bottom-2 w-4 h-4 bg-paper-light border-r border-b border-border"
            style={{ 
              transform: "translateX(-50%) rotate(45deg)",
              boxShadow: "2px 2px 4px rgba(44, 36, 22, 0.1)"
            }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}
