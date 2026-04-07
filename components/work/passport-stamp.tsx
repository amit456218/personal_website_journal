"use client"

import { motion } from "framer-motion"
import type { WorkExperience } from "@/lib/work-data"

interface PassportStampProps {
  work: WorkExperience
  index: number
}

export function PassportStamp({ work, index }: PassportStampProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Passport page background */}
      <div className="bg-[#f5f0e1] rounded-sm p-8 vintage-shadow relative overflow-hidden">
        {/* Page texture */}
        <div className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: `url('/textures/paper-texture.jpg')`,
            backgroundSize: '200px'
          }}
        />
        
        {/* Passport page header */}
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="font-typewriter text-[10px] text-sepia/60 tracking-widest uppercase mb-1">
                Employment Record
              </p>
              <h3 className="font-serif text-2xl text-ink font-semibold tracking-wide">
                {work.company}
              </h3>
              {work.subtitle && (
                <p className="font-typewriter text-xs text-sepia/70 mt-0.5">
                  via {work.subtitle}
                </p>
              )}
            </div>
            
            {/* Circular stamp */}
            <div className="relative">
              <svg viewBox="0 0 100 100" className="w-20 h-20">
                {/* Outer circle */}
                <circle cx="50" cy="50" r="46" fill="none" stroke="#a84444" strokeWidth="2" opacity="0.8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#a84444" strokeWidth="1" opacity="0.5" strokeDasharray="4 2" />
                
                {/* Location text curved along top */}
                <defs>
                  <path id={`stamp-path-top-${work.id}`} d="M 15 50 A 35 35 0 0 1 85 50" fill="none" />
                  <path id={`stamp-path-bottom-${work.id}`} d="M 85 50 A 35 35 0 0 1 15 50" fill="none" />
                </defs>
                <text fill="#a84444" fontSize="7" fontFamily="monospace" opacity="0.9">
                  <textPath href={`#stamp-path-top-${work.id}`} startOffset="50%" textAnchor="middle">
                    {work.location.toUpperCase()}
                  </textPath>
                </text>
                <text fill="#a84444" fontSize="7" fontFamily="monospace" opacity="0.9">
                  <textPath href={`#stamp-path-bottom-${work.id}`} startOffset="50%" textAnchor="middle">
                    VERIFIED EMPLOYMENT
                  </textPath>
                </text>
                
                {/* Center date */}
                <text x="50" y="54" textAnchor="middle" fill="#a84444" fontSize="14" fontWeight="bold" fontFamily="monospace">
                  {work.period}
                </text>
              </svg>
            </div>
          </div>
          
          {/* Divider line */}
          <div className="h-px bg-gradient-to-r from-transparent via-sepia/30 to-transparent mb-6" />
          
          {/* Role and details */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p className="font-typewriter text-[9px] text-sepia/50 uppercase tracking-wider mb-1">Position</p>
              <p className="font-serif text-lg text-ink">{work.role}</p>
            </div>
            <div>
              <p className="font-typewriter text-[9px] text-sepia/50 uppercase tracking-wider mb-1">Duration</p>
              <p className="font-serif text-lg text-ink">{work.period}</p>
            </div>
          </div>
          
          {/* Description */}
          <p className="font-serif text-sm text-sepia/80 leading-relaxed mb-6">
            {work.description}
          </p>
          
          {/* Highlights as handwritten notes */}
          <div className="bg-paper-dark/50 rounded p-4 border-l-2 border-brass/50">
            <p className="font-handwriting text-xs text-sepia/60 mb-2">Notable achievements:</p>
            <ul className="space-y-1">
              {work.highlights.map((highlight, i) => (
                <li key={i} className="font-handwriting text-sm text-ink/80 flex items-start gap-2">
                  <span className="text-stamp-red mt-0.5">•</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Corner decoration */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-sepia/20" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-sepia/20" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-sepia/20" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-sepia/20" />
      </div>
    </motion.div>
  )
}
