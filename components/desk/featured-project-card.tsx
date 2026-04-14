"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface FeaturedProjectCardProps {
  title: string
  description: string
  slug: string
}

export function FeaturedProjectCard({ title, description, slug }: FeaturedProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`}>
      <motion.div
        className="relative bg-paper-light p-4 w-52 cursor-pointer group"
        style={{
          transform: "rotate(-6deg)",
          boxShadow: "5px 5px 15px rgba(44, 36, 22, 0.18), 2px 2px 6px rgba(44, 36, 22, 0.1)",
        }}
        initial={{ opacity: 0, y: 20, rotate: -8 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{
          y: -4,
          rotate: 0,
          scale: 1.05,
          boxShadow: "8px 8px 24px rgba(44, 36, 22, 0.22), 4px 4px 10px rgba(44, 36, 22, 0.12)",
          transition: { duration: 0.3 }
        }}
      >
        {/* Index card lines */}
        <div className="absolute inset-x-4 top-10 bottom-4 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="w-full h-px bg-stamp-blue/20 mb-4"
            />
          ))}
        </div>
        
        {/* Red margin line */}
        <div className="absolute left-6 top-3 bottom-3 w-px bg-stamp-red/40" />
        
        {/* Pin hole */}
        <div 
          className="absolute top-2 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 border-sepia/40"
          style={{ background: "radial-gradient(circle, transparent 30%, rgba(92, 74, 50, 0.1) 100%)" }}
        />
        
        {/* Content */}
        <div className="relative z-10 pt-4 pl-4">
          <p className="font-typewriter text-xs text-sepia/60 uppercase tracking-wider mb-2">
            Project of the Day
          </p>
          <h3 className="font-serif text-xl text-ink group-hover:text-brass transition-colors">
            {title}
          </h3>
          <p className="font-handwriting text-base text-sepia/80 mt-1.5 leading-tight">
            {description}
          </p>
        </div>
        
        {/* Corner fold effect */}
        <div 
          className="absolute bottom-0 right-0 w-5 h-5"
          style={{
            background: "linear-gradient(135deg, transparent 50%, rgba(200, 185, 155, 0.6) 50%)",
          }}
        />
      </motion.div>
    </Link>
  )
}
