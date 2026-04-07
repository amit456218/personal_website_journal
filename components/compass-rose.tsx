"use client"

import { motion } from "framer-motion"

export function CompassRose() {
  return (
    <motion.svg
      viewBox="0 0 200 200"
      className="w-32 h-32 md:w-40 md:h-40"
      initial={{ opacity: 0, rotate: -20 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
    >
      {/* Outer decorative circle */}
      <circle
        cx="100"
        cy="100"
        r="95"
        fill="none"
        stroke="#5c4a32"
        strokeWidth="1"
        opacity="0.6"
      />
      <circle
        cx="100"
        cy="100"
        r="88"
        fill="none"
        stroke="#5c4a32"
        strokeWidth="0.5"
        opacity="0.4"
      />
      
      {/* Degree markers */}
      {Array.from({ length: 36 }).map((_, i) => {
        const angle = i * 10 * (Math.PI / 180)
        const innerR = i % 9 === 0 ? 75 : 80
        const outerR = 85
        return (
          <line
            key={i}
            x1={100 + innerR * Math.sin(angle)}
            y1={100 - innerR * Math.cos(angle)}
            x2={100 + outerR * Math.sin(angle)}
            y2={100 - outerR * Math.cos(angle)}
            stroke="#5c4a32"
            strokeWidth={i % 9 === 0 ? "1.5" : "0.5"}
            opacity={i % 9 === 0 ? "0.8" : "0.4"}
          />
        )
      })}
      
      {/* Main compass star - 8 points */}
      <g>
        {/* North - primary point */}
        <polygon
          points="100,15 95,70 100,60 105,70"
          fill="#2c2416"
        />
        <polygon
          points="100,15 105,70 100,60 95,70"
          fill="#5c4a32"
        />
        
        {/* South */}
        <polygon
          points="100,185 95,130 100,140 105,130"
          fill="#5c4a32"
        />
        <polygon
          points="100,185 105,130 100,140 95,130"
          fill="#8b7355"
        />
        
        {/* East */}
        <polygon
          points="185,100 130,95 140,100 130,105"
          fill="#5c4a32"
        />
        <polygon
          points="185,100 130,105 140,100 130,95"
          fill="#8b7355"
        />
        
        {/* West */}
        <polygon
          points="15,100 70,95 60,100 70,105"
          fill="#2c2416"
        />
        <polygon
          points="15,100 70,105 60,100 70,95"
          fill="#5c4a32"
        />
        
        {/* NE */}
        <polygon
          points="160,40 115,85 120,80 125,85"
          fill="#8b7355"
        />
        
        {/* NW */}
        <polygon
          points="40,40 85,85 80,80 75,85"
          fill="#5c4a32"
        />
        
        {/* SE */}
        <polygon
          points="160,160 115,115 120,120 125,115"
          fill="#c4b49a"
        />
        
        {/* SW */}
        <polygon
          points="40,160 85,115 80,120 75,115"
          fill="#8b7355"
        />
      </g>
      
      {/* Center circle */}
      <circle
        cx="100"
        cy="100"
        r="12"
        fill="none"
        stroke="#5c4a32"
        strokeWidth="2"
      />
      <circle
        cx="100"
        cy="100"
        r="6"
        fill="#b8965c"
      />
      <circle
        cx="100"
        cy="100"
        r="3"
        fill="#5c4a32"
      />
      
      {/* Cardinal direction labels */}
      <text
        x="100"
        y="35"
        textAnchor="middle"
        className="font-typewriter"
        fontSize="10"
        fill="#2c2416"
        fontWeight="bold"
      >
        N
      </text>
      <text
        x="100"
        y="175"
        textAnchor="middle"
        className="font-typewriter"
        fontSize="10"
        fill="#5c4a32"
      >
        S
      </text>
      <text
        x="170"
        y="104"
        textAnchor="middle"
        className="font-typewriter"
        fontSize="10"
        fill="#5c4a32"
      >
        E
      </text>
      <text
        x="30"
        y="104"
        textAnchor="middle"
        className="font-typewriter"
        fontSize="10"
        fill="#5c4a32"
      >
        W
      </text>
    </motion.svg>
  )
}
