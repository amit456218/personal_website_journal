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
        className="relative bg-paper-light p-5 w-56 cursor-pointer group"
        style={{
          transform: "rotate(2deg)",
          boxShadow: "5px 5px 15px rgba(44, 36, 22, 0.18), 2px 2px 6px rgba(44, 36, 22, 0.1)",
        }}
        initial={{ opacity: 0, y: 20, rotate: 5 }}
        animate={{ opacity: 1, y: 0, rotate: 2 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ 
          y: -4, 
          rotate: 0,
          boxShadow: "8px 8px 24px rgba(44, 36, 22, 0.22), 4px 4px 10px rgba(44, 36, 22, 0.12)",
          transition: { duration: 0.2 }
        }}
      >
        {/* Index card lines */}
        <div className="absolute inset-x-5 top-12 bottom-5 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="w-full h-px bg-stamp-blue/20 mb-5"
            />
          ))}
        </div>
        
        {/* Red margin line */}
        <div className="absolute left-8 top-4 bottom-4 w-px bg-stamp-red/40" />
        
        {/* Pin hole */}
        <div 
          className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-sepia/40"
          style={{ background: "radial-gradient(circle, transparent 30%, rgba(92, 74, 50, 0.1) 100%)" }}
        />
        
        {/* Content */}
        <div className="relative z-10 pt-4 pl-5">
          <p className="font-typewriter text-[10px] text-sepia/60 uppercase tracking-wider mb-1">
            Featured
          </p>
          <h3 className="font-serif text-xl text-ink group-hover:text-brass transition-colors">
            {title}
          </h3>
          <p className="font-handwriting text-base text-sepia/80 mt-1 leading-tight">
            {description}
          </p>
        </div>
        
        {/* Corner fold effect */}
        <div 
          className="absolute bottom-0 right-0 w-6 h-6"
          style={{
            background: "linear-gradient(135deg, transparent 50%, rgba(200, 185, 155, 0.6) 50%)",
          }}
        />
      </motion.div>
    </Link>
  )
}
