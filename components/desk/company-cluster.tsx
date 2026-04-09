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

export function CompanyCluster({ companies }: CompanyClusterProps) {
  return (
    <Link href="/work" className="block">
      <motion.div
        className="relative cursor-pointer group"
        initial={{ opacity: 0, y: 20, rotate: 12, scale: 1.1 }}
        animate={{ opacity: 1, y: 0, rotate: 8, scale: 1.1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        whileHover={{
          scale: 1.15,
          rotate: 0,
          transition: { duration: 0.3 }
        }}
      >
        {/* Vintage Passport */}
        <div 
          className="relative w-36 h-48 rounded-sm overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #1a3a52 0%, #0d2538 50%, #1a3a52 100%)",
            boxShadow: "6px 6px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Leather texture overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
            }}
          />
          
          {/* Gold embossed border */}
          <div 
            className="absolute inset-2 border border-brass/40 rounded-sm"
          />
          <div 
            className="absolute inset-3 border border-brass/20 rounded-sm"
          />
          
          {/* Inner content area */}
          <div className="absolute inset-4 flex flex-col items-center justify-center text-center">
            {/* Globe icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <svg viewBox="0 0 48 48" className="w-12 h-12 mb-2">
                {/* Globe outline */}
                <circle 
                  cx="24" cy="24" r="18" 
                  fill="none" 
                  stroke="#c9a962" 
                  strokeWidth="1.5"
                  opacity="0.8"
                />
                {/* Latitude lines */}
                <ellipse 
                  cx="24" cy="24" rx="18" ry="7" 
                  fill="none" 
                  stroke="#c9a962" 
                  strokeWidth="0.8"
                  opacity="0.5"
                />
                <ellipse 
                  cx="24" cy="16" rx="14" ry="4" 
                  fill="none" 
                  stroke="#c9a962" 
                  strokeWidth="0.6"
                  opacity="0.4"
                />
                <ellipse 
                  cx="24" cy="32" rx="14" ry="4" 
                  fill="none" 
                  stroke="#c9a962" 
                  strokeWidth="0.6"
                  opacity="0.4"
                />
                {/* Longitude line */}
                <ellipse 
                  cx="24" cy="24" rx="7" ry="18" 
                  fill="none" 
                  stroke="#c9a962" 
                  strokeWidth="0.8"
                  opacity="0.5"
                />
                {/* Center meridian */}
                <line 
                  x1="24" y1="6" x2="24" y2="42" 
                  stroke="#c9a962" 
                  strokeWidth="0.6"
                  opacity="0.4"
                />
              </svg>
            </motion.div>
            
            {/* Title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-0.5"
            >
              <p className="font-typewriter text-sm text-brass/80 tracking-[0.2em] uppercase">
                Passport
              </p>
              <div className="w-10 h-px bg-brass/50 mx-auto my-1.5" />
              <h3 className="font-serif text-[13px] text-brass tracking-wide font-medium leading-tight">
                Companies &amp;
              </h3>
              <h3 className="font-serif text-[13px] text-brass tracking-wide font-medium">
                Experiences
              </h3>
            </motion.div>
          </div>
          
          {/* Spine effect on left edge */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-3"
            style={{
              background: "linear-gradient(90deg, rgba(0,0,0,0.3) 0%, transparent 100%)",
            }}
          />
          
          {/* Page edge hint on right */}
          <div 
            className="absolute right-0 top-4 bottom-4 w-1"
            style={{
              background: "repeating-linear-gradient(180deg, #f5f0e1 0px, #f5f0e1 2px, #e8e0cc 2px, #e8e0cc 4px)",
              opacity: 0.4,
            }}
          />
          
          {/* Corner wear */}
          <div 
            className="absolute bottom-0 right-0 w-4 h-4"
            style={{
              background: "linear-gradient(315deg, rgba(255,255,255,0.05) 0%, transparent 60%)",
            }}
          />
        </div>
        
        {/* Handwritten label */}
        <motion.p
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-handwriting text-base text-sepia/90 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          tap to explore
        </motion.p>
      </motion.div>
    </Link>
  )
}
