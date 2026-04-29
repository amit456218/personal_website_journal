"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function FilmStrip() {
  return (
    <Link href="/gallery" className="block">
      <motion.div
        className="relative cursor-pointer group"
        initial={{ opacity: 0, rotate: -10, scale: 1.45 }}
        animate={{ opacity: 1, rotate: -6, scale: 1.45 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        whileHover={{
          scale: 1.65,
          rotate: -3,
          transition: { duration: 0.2 }
        }}
      >
        {/* Stacked polaroids style */}
        <div className="relative w-28 h-32">
          {/* Back polaroid */}
          <div 
            className="absolute top-0 left-2 w-24 h-28 rounded-sm"
            style={{
              background: "linear-gradient(145deg, #f8f4eb 0%, #f0e8d8 100%)",
              boxShadow: "2px 2px 8px rgba(44, 36, 22, 0.2)",
              transform: "rotate(8deg)"
            }}
          >
            <div 
              className="absolute top-2 left-2 right-2 bottom-8 rounded-[1px]"
              style={{ background: "linear-gradient(135deg, #d4c8a8 0%, #c4b898 100%)" }}
            />
          </div>
          
          {/* Middle polaroid */}
          <div 
            className="absolute top-1 left-0 w-24 h-28 rounded-sm"
            style={{
              background: "linear-gradient(145deg, #f8f4eb 0%, #f0e8d8 100%)",
              boxShadow: "2px 2px 8px rgba(44, 36, 22, 0.2)",
              transform: "rotate(-4deg)"
            }}
          >
            <div 
              className="absolute top-2 left-2 right-2 bottom-8 rounded-[1px]"
              style={{ background: "linear-gradient(145deg, #c8bca0 0%, #b8ac90 100%)" }}
            />
          </div>
          
          {/* Front polaroid */}
          <div 
            className="absolute top-2 left-1 w-24 h-28 rounded-sm"
            style={{
              background: "linear-gradient(145deg, #faf6ed 0%, #f2ece0 100%)",
              boxShadow: "3px 3px 10px rgba(44, 36, 22, 0.25)"
            }}
          >
            {/* Photo area with mountain scene hint */}
            <div 
              className="absolute top-2 left-2 right-2 bottom-8 rounded-[1px] overflow-hidden"
              style={{ background: "linear-gradient(180deg, #b8c8d8 0%, #d8c8b0 60%, #c8b898 100%)" }}
            >
              {/* Simple mountain silhouette */}
              <svg className="absolute bottom-0 left-0 right-0 h-8" viewBox="0 0 80 32" preserveAspectRatio="none">
                <path 
                  d="M0 32 L15 12 L25 20 L40 5 L55 18 L70 8 L80 32 Z" 
                  fill="#8b9878" 
                  opacity="0.6"
                />
              </svg>
            </div>
            
            {/* Handwritten caption */}
            <div className="absolute bottom-1.5 left-0 right-0 text-center">
              <span className="font-handwriting text-sm text-sepia/80">Gallery</span>
            </div>
          </div>
        </div>
        
        {/* Tap to explore */}
        <motion.p
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-handwriting text-sm text-sepia/60 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          tap to view
        </motion.p>
      </motion.div>
    </Link>
  )
}
