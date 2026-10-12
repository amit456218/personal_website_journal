"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function WorkPage() {
  return (
    <div className="min-h-screen bg-paper-dark">
      {/* Paper texture overlay */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none z-0"
        style={{
          backgroundImage: `url('/textures/paper-texture.jpg')`,
          backgroundSize: '300px'
        }}
      />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="pt-12 pb-8 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            {/* Back link */}
            <Link href="/" className="inline-flex items-center gap-2 group mb-8">
              <motion.div
                className="flex items-center gap-2 px-3 py-1.5 bg-paper-light rounded border border-border vintage-shadow"
                whileHover={{ x: -4 }}
                transition={{ duration: 0.2 }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-sepia">
                  <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                <span className="font-typewriter text-xs text-sepia">Back to Desk</span>
              </motion.div>
            </Link>
            
            {/* Page title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-end gap-4 mb-4">
                <h1 className="font-serif text-4xl md:text-5xl text-ink font-semibold tracking-tight">
                  Work Archive
                </h1>
                <div className="flex items-center gap-2 pb-2">
                  <div className="w-12 h-px bg-sepia/30" />
                  <span className="font-typewriter text-xs text-sepia/60">EST. 2022</span>
                </div>
              </div>
              
              <p className="font-handwriting text-xl text-sepia/70">
                Roles, companies and the stories behind them
              </p>
            </motion.div>
            
            {/* Decorative divider */}
            <motion.div 
              className="mt-8 flex items-center gap-4"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-sepia/30 to-sepia/30" />
              <div className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-brass">
                  <path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l4.59-4.58L18 11l-6 6z"/>
                </svg>
                <span className="font-handwriting text-sm text-brass">being rewritten</span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-sepia/30 to-sepia/30" />
            </motion.div>
          </div>
        </header>
        
        {/* Coming soon note */}
        <main className="px-6 md:px-12 pb-16">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-paper-light p-8 rounded-sm border border-border text-center"
              style={{ boxShadow: "4px 4px 12px rgba(44, 36, 22, 0.15)" }}
            >
              <span className="font-typewriter text-xs text-sepia/50 uppercase tracking-wider">Coming Soon</span>
              <p className="font-serif text-lg text-ink/80 leading-relaxed mt-3">
                This archive is being updated. Check back soon.
              </p>
            </motion.div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="border-t border-sepia/20 py-8 px-6 md:px-12">
          <div className="max-w-4xl mx-auto flex items-center justify-end">
            <div className="flex items-center gap-4">
              <Link href="/atlas" className="font-typewriter text-xs text-sepia/60 hover:text-sepia transition-colors">
                View Atlas
              </Link>
              <span className="text-sepia/30">•</span>
              <Link href="/" className="font-typewriter text-xs text-sepia/60 hover:text-sepia transition-colors">
                Return Home
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
