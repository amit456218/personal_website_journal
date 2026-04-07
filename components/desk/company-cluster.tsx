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
const ROTATIONS = [-8, 5, -3, 12, -6]
const OFFSETS = [
  { x: 0, y: 0 },
  { x: 45, y: 10 },
  { x: 20, y: 50 },
  { x: 70, y: 40 },
  { x: 35, y: 85 },
]

export function CompanyCluster({ companies }: CompanyClusterProps) {
  return (
    <motion.div
      className="relative w-48 h-44"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {companies.map((company, i) => {
        const rotation = ROTATIONS[i % ROTATIONS.length]
        const offset = OFFSETS[i % OFFSETS.length]
        
        if (company.type === "stamp") {
          return (
            <motion.div
              key={company.name}
              className="absolute"
              style={{ 
                left: offset.x, 
                top: offset.y,
                transform: `rotate(${rotation}deg)`,
              }}
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.85 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.4 + i * 0.1,
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              {/* Round passport stamp style */}
              <div 
                className="w-14 h-14 rounded-full border-2 border-stamp-red flex flex-col items-center justify-center"
                style={{ background: "rgba(249, 244, 232, 0.7)" }}
              >
                <span className="font-typewriter text-[8px] text-stamp-red text-center leading-tight px-1">
                  {company.name.toUpperCase()}
                </span>
                <span className="font-typewriter text-[6px] text-stamp-red/70 mt-0.5">
                  {company.date}
                </span>
              </div>
            </motion.div>
          )
        }
        
        // Luggage tag style
        return (
          <motion.div
            key={company.name}
            className="absolute"
            style={{ 
              left: offset.x, 
              top: offset.y,
              transform: `rotate(${rotation}deg)`,
            }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.4 + i * 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <div 
              className="relative px-3 py-2 bg-paper-dark border border-sepia/40"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 75%, 85% 100%, 15% 100%, 0 75%)",
              }}
            >
              {/* String hole */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-sepia/50" />
              
              <div className="pt-2 text-center">
                <span className="font-typewriter text-[9px] text-ink block leading-tight">
                  {company.name}
                </span>
                {company.subtitle && (
                  <span className="font-typewriter text-[7px] text-sepia/70 block">
                    {company.subtitle}
                  </span>
                )}
                <span className="font-handwriting text-[10px] text-sepia/80 block mt-0.5">
                  {company.date}
                </span>
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
