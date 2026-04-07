"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import type { JournalEntry } from "@/lib/journal-data"
import { Polaroid } from "./polaroid"
import { Stamp } from "./stamp"
import { TicketStub } from "./ticket-stub"

interface JournalSpreadProps {
  entry: JournalEntry
}

export function JournalSpread({ entry }: JournalSpreadProps) {
  return (
    <div className="min-h-screen bg-paper-dark py-8 px-4 md:py-16">
      {/* Book binding shadow in center */}
      <div 
        className="fixed left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 pointer-events-none z-30 hidden lg:block"
        style={{
          background: "linear-gradient(90deg, rgba(44, 36, 22, 0.15) 0%, rgba(44, 36, 22, 0.05) 30%, transparent 50%, rgba(44, 36, 22, 0.05) 70%, rgba(44, 36, 22, 0.15) 100%)"
        }}
      />
      
      {/* Back button */}
      <motion.div
        className="fixed top-6 left-6 z-40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link 
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-paper-light border border-sepia/30 vintage-shadow hover:bg-secondary transition-colors group"
        >
          <svg 
            className="w-4 h-4 text-sepia group-hover:-translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-typewriter text-xs text-sepia">BACK TO MAP</span>
        </Link>
      </motion.div>
      
      {/* Two-page spread container */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-0">
          {/* LEFT PAGE - Writing */}
          <motion.div
            className="bg-paper-light p-8 md:p-12 lg:p-16 relative min-h-[80vh] lg:min-h-screen"
            initial={{ opacity: 0, x: -30, rotateY: 5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              boxShadow: "inset -10px 0 20px -10px rgba(44, 36, 22, 0.1)"
            }}
          >
            {/* Paper texture overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage: "url('/textures/paper-texture.jpg')",
                backgroundSize: "300px",
                backgroundRepeat: "repeat"
              }}
            />
            
            {/* Ruled lines background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
              {Array.from({ length: 40 }).map((_, i) => (
                <div 
                  key={i}
                  className="absolute left-0 right-0 h-px bg-stamp-blue/40"
                  style={{ top: 60 + i * 28 }}
                />
              ))}
              {/* Red margin line */}
              <div className="absolute top-0 bottom-0 w-px bg-stamp-red/40 left-16 md:left-20" />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              {/* Date header */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="font-typewriter text-sm text-sepia tracking-widest">
                  {entry.date.toUpperCase()}
                </p>
                <p className="font-typewriter text-xs text-muted-foreground mt-1">
                  {entry.location}, {entry.country}
                </p>
              </motion.div>
              
              {/* Title */}
              <motion.h1
                className="font-serif text-4xl md:text-5xl text-ink mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {entry.title}
              </motion.h1>
              
              {/* Hand-drawn underline */}
              <motion.svg
                viewBox="0 0 200 10"
                className="w-32 h-3 mb-8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.path
                  d="M0,5 Q50,0 100,5 T200,5"
                  fill="none"
                  stroke="#5c4a32"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
              </motion.svg>
              
              {/* Body text */}
              <motion.div
                className="prose prose-lg max-w-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {entry.content.split('\n\n').map((paragraph, i) => (
                  <p 
                    key={i} 
                    className="font-serif text-base md:text-lg text-foreground leading-relaxed mb-6 first-letter:text-3xl first-letter:font-serif first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:leading-none"
                  >
                    {paragraph}
                  </p>
                ))}
              </motion.div>
              
              {/* Margin notes */}
              <div className="mt-12 space-y-6">
                {entry.marginNotes.map((note, i) => (
                  <motion.div
                    key={i}
                    className="relative pl-6 border-l-2 border-brass/40"
                    style={{ transform: `rotate(${Math.random() * 1 - 0.5}deg)` }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                  >
                    <p className="font-handwriting text-lg md:text-xl text-sepia/80 leading-relaxed">
                      {note}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Page number */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <p className="font-typewriter text-xs text-muted-foreground">
                — {entry.id.charAt(0).toUpperCase() + entry.id.slice(1)} —
              </p>
            </div>
          </motion.div>
          
          {/* RIGHT PAGE - Photos and ephemera */}
          <motion.div
            className="bg-paper-light p-8 md:p-12 lg:p-16 relative min-h-[80vh] lg:min-h-screen"
            initial={{ opacity: 0, x: 30, rotateY: -5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            style={{
              boxShadow: "inset 10px 0 20px -10px rgba(44, 36, 22, 0.1)"
            }}
          >
            {/* Paper texture overlay */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage: "url('/textures/paper-texture.jpg')",
                backgroundSize: "300px",
                backgroundRepeat: "repeat"
              }}
            />
            
            {/* Coffee stain decoration */}
            <div 
              className="absolute top-20 right-20 w-24 h-24 opacity-[0.06] pointer-events-none"
              style={{
                backgroundImage: "url('/textures/coffee-stain.jpg')",
                backgroundSize: "cover"
              }}
            />
            
            {/* Content */}
            <div className="relative z-10">
              {/* Polaroids */}
              <div className="flex flex-wrap gap-6 justify-center mb-12">
                {entry.photos.map((photo, i) => (
                  <Polaroid
                    key={i}
                    src={photo.src}
                    caption={photo.caption}
                    rotation={photo.rotation}
                    index={i}
                  />
                ))}
              </div>
              
              {/* Stamps section */}
              <div className="flex flex-wrap gap-4 justify-center mb-10">
                {entry.stamps.map((stamp, i) => (
                  <Stamp
                    key={i}
                    text={stamp.text}
                    type={stamp.type}
                    color={stamp.color}
                    index={i}
                  />
                ))}
              </div>
              
              {/* Tickets */}
              <div className="space-y-4 max-w-xs mx-auto">
                {entry.tickets.map((ticket, i) => (
                  <TicketStub
                    key={i}
                    title={ticket.title}
                    details={ticket.details}
                    index={i}
                  />
                ))}
              </div>
              
              {/* Decorative postmark */}
              <motion.div
                className="absolute bottom-20 right-8 md:right-16"
                initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                animate={{ opacity: 0.15, scale: 1, rotate: -15 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="w-32 h-32 rounded-full border-4 border-ink flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-typewriter text-xs text-ink">POSTMARKED</p>
                    <p className="font-typewriter text-lg text-ink font-bold">{entry.date.split(' ')[0]}</p>
                    <p className="font-typewriter text-[10px] text-ink">{entry.location.toUpperCase()}</p>
                  </div>
                </div>
                {/* Lines through postmark */}
                <div className="absolute inset-0 flex flex-col justify-center gap-2 overflow-hidden opacity-50">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-px bg-ink" style={{ transform: `rotate(-15deg)` }} />
                  ))}
                </div>
              </motion.div>
            </div>
            
            {/* Page number */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <p className="font-typewriter text-xs text-muted-foreground">
                — Ephemera —
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Navigation to other entries */}
      <motion.div
        className="max-w-7xl mx-auto mt-16 px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <p className="font-handwriting text-xl text-sepia/70 text-center mb-8">
          Continue reading...
        </p>
      </motion.div>
    </div>
  )
}
