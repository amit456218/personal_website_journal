"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import type { WorkExperience } from "@/lib/work-data"

interface WorkDetailPageProps {
  work: WorkExperience
}

export function WorkDetailPage({ work }: WorkDetailPageProps) {
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
      
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link href="/work" className="inline-flex items-center gap-2 group mb-8">
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 bg-paper-light rounded border border-border vintage-shadow"
            whileHover={{ x: -4 }}
            transition={{ duration: 0.2 }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-sepia">
              <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
            </svg>
            <span className="font-typewriter text-xs text-sepia">Back to Archive</span>
          </motion.div>
        </Link>
        
        {/* Journal entry card */}
        <motion.article
          className="relative bg-paper-light rounded-sm p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            boxShadow: "6px 8px 24px rgba(44, 36, 22, 0.2), 2px 3px 8px rgba(44, 36, 22, 0.1)",
          }}
        >
          {/* Paper texture */}
          <div 
            className="absolute inset-0 opacity-20 rounded-sm pointer-events-none"
            style={{
              backgroundImage: `url('/textures/paper-texture.jpg')`,
              backgroundSize: '200px',
              mixBlendMode: 'multiply'
            }}
          />
          
          {/* Decorative border */}
          <div className="absolute inset-4 border border-sepia/15 rounded-sm pointer-events-none" />
          
          {/* Corner stamp */}
          <div className="absolute top-6 right-6 w-16 h-16 border-2 border-dashed border-stamp-red/30 rounded-full flex items-center justify-center">
            <div className="text-center">
              <span className="font-typewriter text-xs text-stamp-red/50 block">{work.period}</span>
            </div>
          </div>
          
          {/* Header */}
          <header className="relative mb-8 pr-20">
            <p className="font-typewriter text-xs text-sepia/50 uppercase tracking-[0.2em] mb-2">
              {work.location}
            </p>
            
            <h1 className="font-serif text-3xl md:text-4xl text-ink font-semibold tracking-tight mb-1">
              {work.company}
            </h1>
            {work.subtitle && (
              <p className="font-typewriter text-sm text-sepia/60">
                {work.subtitle}
              </p>
            )}
            
            <div className="flex items-center gap-3 mt-4">
              <div className="w-8 h-px bg-brass/50" />
              <p className="font-handwriting text-xl text-brass">
                {work.role}
              </p>
            </div>
          </header>
          
          {/* Decorative divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-sepia/20" />
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-sepia/40">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            <div className="flex-1 h-px bg-sepia/20" />
          </div>
          
          {/* Description */}
          <div className="relative mb-8">
            <p className="font-serif text-lg text-ink/80 leading-relaxed first-letter:text-4xl first-letter:font-serif first-letter:text-brass first-letter:float-left first-letter:mr-2 first-letter:leading-none">
              {work.description}
            </p>
          </div>
          
          {/* Highlights */}
          <div className="relative">
            <h2 className="font-typewriter text-xs text-sepia/60 uppercase tracking-[0.2em] mb-4">
              Key Achievements
            </h2>
            
            <ul className="space-y-3">
              {work.highlights.map((highlight, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 bg-brass rounded-full mt-2 flex-shrink-0" />
                  <span className="font-serif text-ink/70">{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Footer flourish */}
          <div className="mt-12 flex items-center justify-center">
            <svg viewBox="0 0 80 16" className="w-20 h-4 opacity-30">
              <path d="M0 8 Q20 0 40 8 Q60 16 80 8" stroke="currentColor" fill="none" strokeWidth="0.5" className="text-sepia"/>
              <circle cx="40" cy="8" r="2" fill="currentColor" className="text-sepia"/>
            </svg>
          </div>
        </motion.article>
        
        {/* Navigation footer */}
        <div className="mt-8 flex items-center justify-between text-center">
          <Link href="/" className="font-typewriter text-xs text-sepia/50 hover:text-sepia transition-colors">
            Return to Desk
          </Link>
          <Link href="/atlas" className="font-typewriter text-xs text-sepia/50 hover:text-sepia transition-colors">
            View Atlas
          </Link>
        </div>
      </div>
    </div>
  )
}
