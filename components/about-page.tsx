"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function AboutPage() {
  return (
    <div className="min-h-screen bg-paper-dark">
      {/* Paper texture */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/textures/paper-texture.jpg')",
          backgroundSize: "400px",
          opacity: 0.3,
          mixBlendMode: "multiply"
        }}
      />
      
      {/* Back link */}
      <motion.div
        className="fixed top-6 left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link 
          href="/"
          className="inline-flex items-center gap-2 font-handwriting text-sepia/70 hover:text-sepia transition-colors"
        >
          <span className="text-lg">&larr;</span>
          <span>Back to Desk</span>
        </Link>
      </motion.div>

      {/* Content */}
      <div className="relative max-w-2xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-paper-light p-8 md:p-12 rounded-sm"
          style={{ boxShadow: "6px 6px 20px rgba(44, 36, 22, 0.2)" }}
        >
          <h1 className="font-serif text-3xl md:text-4xl text-ink mb-6">About Me</h1>
          <div className="w-16 h-px bg-brass/50 mb-8" />
          
          <div className="space-y-6 font-serif text-ink/80 leading-relaxed">
            <p className="first-letter:text-4xl first-letter:font-serif first-letter:text-brass first-letter:float-left first-letter:mr-2 first-letter:leading-none">
              Hello, I&apos;m Amitabh Gulati. This is a space where I collect my thoughts, 
              projects, and experiences like artifacts in a travel journal.
            </p>
            
            <p>
              I believe in the beauty of well-crafted experiences, whether in code, 
              design, or the stories we tell. Every project is a journey, every 
              challenge an adventure worth documenting.
            </p>
            
            <p>
              When I&apos;m not building things, you&apos;ll find me exploring new places, 
              listening to music, or adding to my collection of memories captured 
              in photographs.
            </p>
          </div>
          
          <div className="mt-10 pt-8 border-t border-sepia/20">
            <p className="font-handwriting text-sepia/60 text-lg">
              Thanks for stopping by.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
