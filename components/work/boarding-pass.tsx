"use client"

import { motion } from "framer-motion"
import type { WorkExperience } from "@/lib/work-data"

interface BoardingPassProps {
  work: WorkExperience
  index: number
}

export function BoardingPass({ work, index }: BoardingPassProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Boarding pass container */}
      <div className="bg-paper-light rounded-lg vintage-shadow overflow-hidden border border-border">
        <div className="flex">
          {/* Main section */}
          <div className="flex-1 p-6 border-r-2 border-dashed border-sepia/30">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stamp-blue/10 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-stamp-blue">
                    <path fill="currentColor" d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-typewriter text-[10px] text-sepia/50 tracking-widest">BOARDING PASS</p>
                  <p className="font-serif text-xs text-sepia/70">Career Journey Airlines</p>
                </div>
              </div>
              <div className="bg-stamp-blue/10 border border-stamp-blue/30 rounded px-2 py-0.5">
                <p className="font-typewriter text-[10px] text-stamp-blue font-bold">
                  {work.period === "Incoming" ? "UPCOMING" : "COMPLETED"}
                </p>
              </div>
            </div>
            
            {/* Flight info */}
            <div className="flex items-center gap-8 mb-6">
              <div>
                <p className="font-typewriter text-[9px] text-sepia/50 uppercase">From</p>
                <p className="font-serif text-2xl text-ink font-bold">PRV</p>
                <p className="font-typewriter text-[10px] text-sepia/60">Previous Role</p>
              </div>
              
              <div className="flex-1 flex items-center gap-2">
                <div className="h-px flex-1 bg-sepia/20" />
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-sepia/40">
                  <path fill="currentColor" d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                </svg>
                <div className="h-px flex-1 bg-sepia/20" />
              </div>
              
              <div className="text-right">
                <p className="font-typewriter text-[9px] text-sepia/50 uppercase">To</p>
                <p className="font-serif text-2xl text-ink font-bold">
                  {work.company.substring(0, 3).toUpperCase()}
                </p>
                <p className="font-typewriter text-[10px] text-sepia/60">{work.company}</p>
              </div>
            </div>
            
            {/* Details grid */}
            <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-paper-dark/30 rounded">
              <div>
                <p className="font-typewriter text-[8px] text-sepia/50 uppercase">Position</p>
                <p className="font-serif text-sm text-ink">{work.role}</p>
              </div>
              <div>
                <p className="font-typewriter text-[8px] text-sepia/50 uppercase">Departure</p>
                <p className="font-serif text-sm text-ink">{work.period}</p>
              </div>
              <div>
                <p className="font-typewriter text-[8px] text-sepia/50 uppercase">Gate</p>
                <p className="font-serif text-sm text-ink">{work.location}</p>
              </div>
            </div>
            
            {/* Description */}
            <p className="font-serif text-sm text-sepia/70 leading-relaxed">
              {work.description}
            </p>
          </div>
          
          {/* Stub section */}
          <div className="w-36 p-4 bg-paper-dark/30 flex flex-col justify-between">
            <div>
              <p className="font-typewriter text-[8px] text-sepia/50 uppercase tracking-wider text-center mb-2">
                Passenger
              </p>
              <p className="font-serif text-sm text-ink text-center font-semibold">
                Alex Chen
              </p>
            </div>
            
            <div className="text-center">
              <p className="font-typewriter text-[8px] text-sepia/50 uppercase mb-1">Seat</p>
              <p className="font-serif text-3xl text-ink font-bold">1A</p>
              <p className="font-typewriter text-[9px] text-brass">First Class</p>
            </div>
            
            {/* Barcode */}
            <div className="flex justify-center gap-px">
              {[2,1,3,1,2,3,1,2,1,3,2,1,2,1,3].map((w, i) => (
                <div key={i} className="bg-ink/70 h-8" style={{ width: `${w}px` }} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Highlights footer */}
        <div className="border-t border-sepia/20 px-6 py-3 bg-paper-dark/20">
          <div className="flex items-center gap-4 flex-wrap">
            <p className="font-typewriter text-[9px] text-sepia/50 uppercase">Mission Objectives:</p>
            {work.highlights.map((highlight, i) => (
              <span key={i} className="font-serif text-xs text-sepia/70">
                {i > 0 && <span className="text-sepia/30 mx-2">•</span>}
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
