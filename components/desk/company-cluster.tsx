"use client"

import { motion } from "framer-motion"

interface Company {
  name: string
  subtitle?: string
  date: string
  type: "stamp" | "tag"
}

interface CompanyClusterProps {
  companies: Company[]
}

// Fixed rotations to avoid hydration mismatch
const ROTATIONS = [-12, 8, -5, 15, -8, 3]
const OFFSETS = [
  { x: 0, y: 0 },
  { x: 85, y: -10 },
  { x: 25, y: 75 },
  { x: 110, y: 60 },
  { x: -15, y: 140 },
  { x: 75, y: 130 },
]

export function CompanyCluster({ companies }: CompanyClusterProps) {
  return (
    <motion.div
      className="relative w-64 h-56"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Decorative label */}
      <motion.div
        className="absolute -top-6 left-0 font-handwriting text-sm text-sepia/60 italic"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
      >
        places I&apos;ve called work
      </motion.div>

      {companies.map((company, i) => {
        const rotation = ROTATIONS[i % ROTATIONS.length]
        const offset = OFFSETS[i % OFFSETS.length]
        
        if (company.type === "stamp") {
          return (
            <motion.div
              key={company.name}
              className="absolute group cursor-default"
              style={{ 
                left: offset.x, 
                top: offset.y,
              }}
              initial={{ scale: 1.4, opacity: 0, rotate: rotation - 15 }}
              animate={{ scale: 1, opacity: 1, rotate: rotation }}
              transition={{ 
                duration: 0.5, 
                delay: 0.5 + i * 0.12,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
              whileHover={{ scale: 1.08, rotate: rotation + 2 }}
            >
              {/* Vintage postage stamp style */}
              <div className="relative">
                {/* Perforated edge border */}
                <div 
                  className="absolute -inset-1.5 opacity-80"
                  style={{
                    background: `radial-gradient(circle, transparent 40%, var(--paper-dark) 40%)`,
                    backgroundSize: "6px 6px",
                  }}
                />
                
                {/* Main stamp body */}
                <div 
                  className="relative w-20 h-24 flex flex-col items-center justify-center border-2 border-stamp-red/70 overflow-hidden"
                  style={{ 
                    background: "linear-gradient(165deg, #f9f4e8 0%, #f0e8d4 50%, #e8dcc8 100%)",
                  }}
                >
                  {/* Decorative frame line */}
                  <div className="absolute inset-1.5 border border-stamp-red/30" />
                  
                  {/* Company icon - vintage building/office */}
                  <svg viewBox="0 0 32 32" className="w-8 h-8 text-stamp-red/80 mb-1">
                    <path 
                      fill="currentColor" 
                      d="M4 28V10l12-6 12 6v18H4zm2-2h8V16H6v10zm10 0h10V11.2L16 6.4 6 11.2V14h10v12zm2-10h6v2h-6v-2zm0 4h6v2h-6v-2z"
                    />
                  </svg>
                  
                  {/* Company name */}
                  <span className="font-typewriter text-[9px] text-stamp-red text-center leading-tight px-2 font-medium tracking-wide">
                    {company.name.toUpperCase()}
                  </span>
                  
                  {/* Date as denomination */}
                  <span className="font-serif text-[11px] text-stamp-red/90 mt-0.5 font-semibold">
                    {company.date}
                  </span>
                  
                  {/* Postmark overlay */}
                  <div 
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      background: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 8px,
                        rgba(168, 68, 68, 0.3) 8px,
                        rgba(168, 68, 68, 0.3) 9px
                      )`
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )
        }
        
        // Passport stamp style (circular with ornate border)
        return (
          <motion.div
            key={company.name}
            className="absolute group cursor-default"
            style={{ 
              left: offset.x, 
              top: offset.y,
            }}
            initial={{ scale: 1.5, opacity: 0, rotate: rotation }}
            animate={{ scale: 1, opacity: 0.85, rotate: rotation }}
            transition={{ 
              duration: 0.4, 
              delay: 0.5 + i * 0.12,
              type: "spring",
              stiffness: 250,
              damping: 18
            }}
            whileHover={{ scale: 1.1, opacity: 1 }}
          >
            {/* Passport stamp - circular with double border */}
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 80 80" className="w-full h-full">
                {/* Outer decorative ring */}
                <circle 
                  cx="40" cy="40" r="38" 
                  fill="none" 
                  stroke="#3d5675" 
                  strokeWidth="2"
                  strokeDasharray="4 2"
                  opacity="0.7"
                />
                {/* Inner ring */}
                <circle 
                  cx="40" cy="40" r="32" 
                  fill="none" 
                  stroke="#3d5675" 
                  strokeWidth="1.5"
                  opacity="0.8"
                />
                {/* Center fill */}
                <circle 
                  cx="40" cy="40" r="30" 
                  fill="rgba(61, 86, 117, 0.08)"
                />
                
                {/* Company name on arc */}
                <defs>
                  <path id={`arc-top-${i}`} d="M 12 40 A 28 28 0 0 1 68 40" fill="none" />
                  <path id={`arc-bottom-${i}`} d="M 68 44 A 28 28 0 0 1 12 44" fill="none" />
                </defs>
                
                <text className="font-typewriter" fontSize="7" fill="#3d5675" fontWeight="500">
                  <textPath href={`#arc-top-${i}`} startOffset="50%" textAnchor="middle">
                    {company.name.toUpperCase()}
                  </textPath>
                </text>
                
                {company.subtitle && (
                  <text className="font-typewriter" fontSize="5" fill="#3d5675" opacity="0.7">
                    <textPath href={`#arc-bottom-${i}`} startOffset="50%" textAnchor="middle">
                      {company.subtitle.toUpperCase()}
                    </textPath>
                  </text>
                )}
                
                {/* Center icon - briefcase/work */}
                <g transform="translate(30, 28)">
                  <rect x="2" y="4" width="16" height="12" rx="1" fill="none" stroke="#3d5675" strokeWidth="1.2" opacity="0.8" />
                  <path d="M6 4V2a2 2 0 012-2h4a2 2 0 012 2v2" fill="none" stroke="#3d5675" strokeWidth="1" opacity="0.7" />
                  <line x1="2" y1="8" x2="18" y2="8" stroke="#3d5675" strokeWidth="0.8" opacity="0.6" />
                </g>
                
                {/* Date at bottom */}
                <text 
                  x="40" y="58" 
                  textAnchor="middle" 
                  className="font-handwriting" 
                  fontSize="9" 
                  fill="#3d5675"
                  opacity="0.9"
                >
                  {company.date}
                </text>
                
                {/* Star decorations */}
                <text x="18" y="42" fontSize="6" fill="#3d5675" opacity="0.5">★</text>
                <text x="58" y="42" fontSize="6" fill="#3d5675" opacity="0.5">★</text>
              </svg>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
