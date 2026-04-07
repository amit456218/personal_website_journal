"use client"

import { motion } from "framer-motion"
import type { WorkExperience } from "@/lib/work-data"

interface VisaPageProps {
  work: WorkExperience
  index: number
}

export function VisaPage({ work, index }: VisaPageProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Visa document */}
      <div className="bg-gradient-to-br from-[#e8f4e8] to-[#d4e8d4] rounded-sm p-8 vintage-shadow relative overflow-hidden border border-forest/20">
        {/* Security pattern background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(61, 92, 74, 0.1) 10px,
              rgba(61, 92, 74, 0.1) 20px
            )`
          }}
        />
        
        {/* Visa header */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {/* Official seal */}
              <div className="w-16 h-16 rounded-full border-2 border-forest/60 flex items-center justify-center bg-paper-light/50">
                <div className="text-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-forest/70 mx-auto">
                    <path fill="currentColor" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
              <div>
                <p className="font-typewriter text-[10px] text-forest/60 tracking-widest uppercase">
                  Work Authorization
                </p>
                <h3 className="font-serif text-2xl text-ink font-semibold">
                  {work.company}
                </h3>
                {work.subtitle && (
                  <p className="font-typewriter text-xs text-forest/70">
                    Division: {work.subtitle}
                  </p>
                )}
              </div>
            </div>
            
            {/* Status badge */}
            <div className="bg-forest/10 border border-forest/30 rounded px-3 py-1">
              <p className="font-typewriter text-xs text-forest font-bold tracking-wider">
                APPROVED
              </p>
            </div>
          </div>
          
          {/* Visa details grid */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-paper-light/30 rounded border border-forest/10">
            <div>
              <p className="font-typewriter text-[9px] text-forest/50 uppercase tracking-wider">Position</p>
              <p className="font-serif text-sm text-ink font-medium mt-1">{work.role}</p>
            </div>
            <div>
              <p className="font-typewriter text-[9px] text-forest/50 uppercase tracking-wider">Valid Period</p>
              <p className="font-serif text-sm text-ink font-medium mt-1">{work.period}</p>
            </div>
            <div>
              <p className="font-typewriter text-[9px] text-forest/50 uppercase tracking-wider">Location</p>
              <p className="font-serif text-sm text-ink font-medium mt-1">{work.location}</p>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <p className="font-typewriter text-[9px] text-forest/50 uppercase tracking-wider mb-2">Purpose of Employment</p>
            <p className="font-serif text-sm text-sepia/80 leading-relaxed">
              {work.description}
            </p>
          </div>
          
          {/* Highlights */}
          <div className="border-t border-forest/20 pt-4">
            <p className="font-typewriter text-[9px] text-forest/50 uppercase tracking-wider mb-3">Authorized Activities</p>
            <div className="grid grid-cols-1 gap-2">
              {work.highlights.map((highlight, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-forest/40 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 text-forest/70">
                      <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  </div>
                  <p className="font-serif text-sm text-ink/80">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Bottom stamp */}
          <div className="absolute bottom-4 right-4 opacity-60">
            <div className="border-2 border-forest rounded px-3 py-1 rotate-[-8deg]">
              <p className="font-typewriter text-[10px] text-forest font-bold">
                ENTRY GRANTED
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
