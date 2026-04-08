"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface Company {
  name: string
  subtitle?: string
  date: string
  type: "stamp" | "tag"
}

interface CompanyClusterProps {
  companies: Company[]
}

// Sticker positions on the suitcase
const STICKER_POSITIONS = [
  { x: 15, y: 25, rotate: -8, scale: 1 },
  { x: 120, y: 15, rotate: 12, scale: 0.9 },
  { x: 45, y: 95, rotate: -3, scale: 0.95 },
  { x: 140, y: 85, rotate: 6, scale: 0.85 },
]

// Sticker colors for variety
const STICKER_STYLES = [
  { bg: "#c44536", text: "#fff8f0", accent: "#8b2e20" }, // Vintage red
  { bg: "#1a4f5c", text: "#e8f4f8", accent: "#0d2e35" }, // Deep teal
  { bg: "#d4a03a", text: "#3d2c0a", accent: "#a67c2a" }, // Gold/mustard
  { bg: "#4a6741", text: "#f0f5ee", accent: "#2d3f28" }, // Forest green
]

export function CompanyCluster({ companies }: CompanyClusterProps) {
  return (
    <Link href="/work" className="block">
      <motion.div
        className="relative w-72 h-64 cursor-pointer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Decorative label */}
        <motion.div
          className="absolute -top-7 left-2 font-handwriting text-base text-sepia/70 italic"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          my journey so far...
        </motion.div>

        {/* VINTAGE SUITCASE */}
        <motion.div 
          className="relative w-full h-full"
          whileHover={{ rotate: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Suitcase shadow */}
          <div 
            className="absolute inset-0 translate-x-2 translate-y-2 rounded-lg bg-ink/20 blur-sm"
          />
          
          {/* Main suitcase body */}
          <div 
            className="relative w-full h-full rounded-lg overflow-hidden"
            style={{
              background: "linear-gradient(145deg, #8b6914 0%, #6b5210 50%, #4a3a0d 100%)",
              boxShadow: "inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.3)"
            }}
          >
            {/* Leather texture overlay */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
            
            {/* Top leather trim */}
            <div 
              className="absolute top-0 left-0 right-0 h-6"
              style={{
                background: "linear-gradient(180deg, #5c4210 0%, #6b5210 100%)",
                borderBottom: "2px solid #3d2d0a"
              }}
            />
            
            {/* Metal clasp left */}
            <div className="absolute top-4 left-8 w-8 h-4">
              <div 
                className="w-full h-full rounded-sm"
                style={{
                  background: "linear-gradient(180deg, #d4b86a 0%, #8b7635 50%, #6b5825 100%)",
                  boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.3)"
                }}
              />
              <div 
                className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                style={{
                  background: "linear-gradient(180deg, #2d2008 0%, #1a1205 100%)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1)"
                }}
              />
            </div>
            
            {/* Metal clasp right */}
            <div className="absolute top-4 right-8 w-8 h-4">
              <div 
                className="w-full h-full rounded-sm"
                style={{
                  background: "linear-gradient(180deg, #d4b86a 0%, #8b7635 50%, #6b5825 100%)",
                  boxShadow: "inset 0 1px 2px rgba(255,255,255,0.4), 0 1px 2px rgba(0,0,0,0.3)"
                }}
              />
              <div 
                className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                style={{
                  background: "linear-gradient(180deg, #2d2008 0%, #1a1205 100%)",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1)"
                }}
              />
            </div>
            
            {/* Handle */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6">
              <div 
                className="w-full h-full rounded-t-full"
                style={{
                  background: "linear-gradient(180deg, #5c4210 0%, #3d2d0a 100%)",
                  boxShadow: "inset 0 2px 4px rgba(255,255,255,0.15), 0 2px 4px rgba(0,0,0,0.4)"
                }}
              />
              {/* Handle grip lines */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 flex justify-between">
                <div className="w-0.5 h-2 bg-black/20 rounded-full" />
                <div className="w-0.5 h-2 bg-black/20 rounded-full" />
                <div className="w-0.5 h-2 bg-black/20 rounded-full" />
              </div>
            </div>
            
            {/* Bottom leather trim */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-4"
              style={{
                background: "linear-gradient(0deg, #3d2d0a 0%, #5c4210 100%)",
                borderTop: "1px solid #2d2008"
              }}
            />
            
            {/* Corner protectors */}
            {[
              { pos: "bottom-0 left-0", radius: "rounded-tl-lg rounded-br-lg" },
              { pos: "bottom-0 right-0", radius: "rounded-tr-lg rounded-bl-lg" },
            ].map((corner, i) => (
              <div 
                key={i}
                className={`absolute ${corner.pos} w-6 h-6 ${corner.radius}`}
                style={{
                  background: "linear-gradient(135deg, #d4b86a 0%, #8b7635 100%)",
                  boxShadow: "inset 0 1px 2px rgba(255,255,255,0.3)"
                }}
              />
            ))}

            {/* TRAVEL STICKERS */}
            {companies.slice(0, 4).map((company, i) => {
              const pos = STICKER_POSITIONS[i]
              const style = STICKER_STYLES[i]
              
              return (
                <motion.div
                  key={company.name}
                  className="absolute"
                  style={{ 
                    left: pos.x, 
                    top: pos.y,
                    transform: `rotate(${pos.rotate}deg) scale(${pos.scale})`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: pos.scale, opacity: 1 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.7 + i * 0.15,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {/* Sticker with worn edges */}
                  <div 
                    className="relative px-3 py-2 min-w-[70px]"
                    style={{
                      background: style.bg,
                      borderRadius: "4px",
                      boxShadow: `
                        0 2px 4px rgba(0,0,0,0.3),
                        inset 0 1px 1px rgba(255,255,255,0.2)
                      `,
                      transform: `rotate(${pos.rotate}deg)`,
                    }}
                  >
                    {/* Worn/peeling edge effect */}
                    <div 
                      className="absolute -top-0.5 -right-0.5 w-3 h-3"
                      style={{
                        background: style.bg,
                        clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                        filter: "brightness(1.1)",
                        transform: "rotate(5deg)",
                      }}
                    />
                    
                    {/* Sticker content */}
                    <div className="relative text-center">
                      {/* City/destination style header */}
                      <div 
                        className="font-typewriter text-[10px] font-bold tracking-wider leading-tight"
                        style={{ color: style.text }}
                      >
                        {company.name.toUpperCase()}
                      </div>
                      
                      {/* Decorative line */}
                      <div 
                        className="w-8 h-0.5 mx-auto my-1 rounded-full opacity-60"
                        style={{ background: style.text }}
                      />
                      
                      {/* Date as "vintage travel date" */}
                      <div 
                        className="font-handwriting text-[9px] opacity-90"
                        style={{ color: style.text }}
                      >
                        {company.date}
                      </div>
                    </div>
                    
                    {/* Subtle texture overlay */}
                    <div 
                      className="absolute inset-0 rounded opacity-10 pointer-events-none"
                      style={{
                        background: `
                          radial-gradient(circle at 30% 70%, rgba(255,255,255,0.3) 0%, transparent 50%),
                          radial-gradient(circle at 70% 30%, rgba(0,0,0,0.2) 0%, transparent 50%)
                        `
                      }}
                    />
                  </div>
                </motion.div>
              )
            })}
            
            {/* "FRAGILE" sticker accent */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{ delay: 1.3 }}
            >
              <div 
                className="px-2 py-0.5 border-2 border-dashed border-red-700/60 text-red-700/70 font-typewriter text-[8px] tracking-widest"
                style={{ transform: "rotate(-4deg)" }}
              >
                HANDLE WITH CARE
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Tap hint */}
        <motion.div
          className="absolute -bottom-5 right-2 font-handwriting text-xs text-sepia/50 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          click to unpack →
        </motion.div>
      </motion.div>
    </Link>
  )
}
