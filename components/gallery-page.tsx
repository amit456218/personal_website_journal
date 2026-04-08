"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function GalleryPage() {
  return (
    <div className="min-h-screen bg-paper-dark">
      {/* Paper texture */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/textures/paper-texture.jpg')",
          backgroundSize: "600px",
          opacity: 0.4,
          mixBlendMode: "multiply"
        }}
      />

      {/* Back link */}
      <motion.div
        className="fixed top-6 left-6 z-50"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link 
          href="/"
          className="font-handwriting text-sepia/70 hover:text-sepia transition-colors flex items-center gap-2"
        >
          <span className="text-lg">&larr;</span>
          <span>Back to Desk</span>
        </Link>
      </motion.div>

      {/* Content */}
      <div className="relative pt-24 pb-16 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="font-serif text-4xl text-ink mb-4">Gallery</h1>
            <p className="font-handwriting text-xl text-sepia/70">
              Moments captured along the way
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-paper-light p-8 rounded-sm shadow-lg"
            style={{ boxShadow: "4px 4px 12px rgba(44, 36, 22, 0.15)" }}
          >
            <p className="font-serif text-lg text-ink/80 leading-relaxed text-center">
              Coming soon... a curated collection of photographs from my travels and experiences.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
