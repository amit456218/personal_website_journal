"use client"

import { motion } from "framer-motion"

interface TicketStubProps {
  title: string
  details: string
  rotation?: number
  index?: number
}

export function TicketStub({ title, details, rotation = 0, index = 0 }: TicketStubProps) {
  const randomRotation = rotation || (Math.random() * 8 - 4)
  
  return (
    <motion.div
      className="relative"
      style={{ transform: `rotate(${randomRotation}deg)` }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: 0.5 + index * 0.1 
      }}
    >
      {/* Tape */}
      <div 
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 tape z-10"
        style={{ transform: "rotate(-5deg)" }}
      />
      
      {/* Ticket body */}
      <div 
        className="bg-paper-light border border-sepia/30 px-4 py-3 relative overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 5% 50%, 0 100%, 100% 100%, 95% 50%, 100% 0)"
        }}
      >
        {/* Perforated edge visual */}
        <div className="absolute left-0 top-0 bottom-0 w-3 flex flex-col justify-around py-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-paper-dark"
            />
          ))}
        </div>
        
        {/* Content */}
        <div className="pl-4">
          <p className="font-typewriter text-xs md:text-sm text-ink font-bold tracking-wide">
            {title}
          </p>
          <p className="font-typewriter text-[10px] md:text-xs text-sepia mt-1">
            {details}
          </p>
        </div>
        
        {/* Barcode decoration */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-0.5 opacity-30">
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i}
              className="bg-ink"
              style={{ 
                width: Math.random() > 0.5 ? 2 : 1,
                height: 16 + Math.random() * 8
              }}
            />
          ))}
        </div>
        
        {/* Worn effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background: "linear-gradient(90deg, rgba(139, 115, 85, 0.3) 0%, transparent 20%, transparent 80%, rgba(139, 115, 85, 0.3) 100%)"
          }}
        />
      </div>
    </motion.div>
  )
}
