"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { IntroNote } from "./desk/intro-note"
import { CompanyCluster } from "./desk/company-cluster"
import { AtlasPortal } from "./desk/atlas-portal"
import { FeaturedProjectCard } from "./desk/featured-project-card"
import { FieldNotesBook } from "./desk/field-notes-book"
import { ResumeDocument } from "./desk/resume-document"
import { AccentPolaroid } from "./desk/accent-polaroid"
import { CassetteTape } from "./desk/cassette-tape"
import { FilmStrip } from "./desk/film-strip"
import { DeskDecorations } from "./desk/desk-decorations"
import { AboutMeToken } from "./desk/about-me-token"
import { deskData } from "@/lib/desk-data"

// Curated palette of rich, dark frame colors that complement the cork board
const DARK_FRAME_PALETTE = [
  { dark: "#2d3e30", light: "#4a5d45", glow: "30, 50, 35" },    // forest green
  { dark: "#3d2817", light: "#5c3d22", glow: "60, 40, 20" },    // walnut
  { dark: "#1e2a44", light: "#344260", glow: "25, 35, 60" },    // navy
  { dark: "#4a1f1f", light: "#6b3030", glow: "70, 30, 30" },    // burgundy
  { dark: "#2a2a2a", light: "#454545", glow: "40, 40, 40" },    // charcoal
  { dark: "#3a2545", light: "#553a62", glow: "55, 35, 70" },    // aubergine
  { dark: "#1f3a3a", light: "#345454", glow: "30, 60, 60" },    // teal
  { dark: "#3d2a1a", light: "#5c4024", glow: "60, 40, 25" },    // mahogany
]

export function Desk() {
  const [frame, setFrame] = useState(DARK_FRAME_PALETTE[0])

  useEffect(() => {
    setFrame(DARK_FRAME_PALETTE[Math.floor(Math.random() * DARK_FRAME_PALETTE.length)])
    let timeout: ReturnType<typeof setTimeout>
    const scheduleNext = () => {
      const delay = 3000 + Math.random() * 1000
      timeout = setTimeout(() => {
        setFrame((current) => {
          let next = current
          while (next === current) {
            next = DARK_FRAME_PALETTE[Math.floor(Math.random() * DARK_FRAME_PALETTE.length)]
          }
          return next
        })
        scheduleNext()
      }, delay)
    }
    scheduleNext()
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden" style={{ background: "#dcc8a0" }}>
      {/*
        ORIGINAL DESK BACKGROUND (called "v1" — the plain paper desk) — uncomment this block and remove the cork block below to revert.
        Also change the outer div back to: className="... bg-paper-dark" (no inline style).

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(90deg,
                rgba(139, 115, 85, 0.03) 0%,
                transparent 2%,
                transparent 98%,
                rgba(139, 115, 85, 0.03) 100%
              ),
              linear-gradient(0deg,
                rgba(92, 74, 50, 0.04) 0%,
                transparent 50%,
                rgba(232, 220, 200, 0.02) 100%
              )
            `,
            backgroundSize: "120px 100%, 100% 100%",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/textures/paper-texture.jpg')",
            backgroundSize: "600px",
            opacity: 0.35,
            mixBlendMode: "multiply"
          }}
        />
      */}

      {/* Light cork bulletin board base */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at center, #e8d4a8 0%, #d4bc88 70%, #b89a66 100%)
          `,
        }}
      />

      {/* Cork speckle texture — subtle dots */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 20%, rgba(90, 60, 25, 0.35) 0.8px, transparent 1.5px),
            radial-gradient(circle at 42% 65%, rgba(110, 75, 30, 0.3) 1px, transparent 1.8px),
            radial-gradient(circle at 78% 35%, rgba(75, 50, 20, 0.38) 0.6px, transparent 1.3px),
            radial-gradient(circle at 25% 85%, rgba(120, 85, 35, 0.28) 1.2px, transparent 2px),
            radial-gradient(circle at 60% 15%, rgba(85, 55, 22, 0.32) 0.7px, transparent 1.4px),
            radial-gradient(circle at 88% 75%, rgba(100, 70, 28, 0.3) 0.9px, transparent 1.6px),
            radial-gradient(circle at 5% 50%, rgba(80, 55, 22, 0.35) 0.8px, transparent 1.5px),
            radial-gradient(circle at 50% 50%, rgba(115, 80, 32, 0.22) 1px, transparent 1.7px)
          `,
          backgroundSize: "40px 40px, 55px 55px, 30px 30px, 70px 70px, 45px 45px, 60px 60px, 35px 35px, 50px 50px",
          opacity: 0.85,
        }}
      />

      {/* Soft wooden frame edge */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: `
            inset 0 0 0 10px ${frame.dark},
            inset 0 0 0 12px ${frame.light},
            inset 0 0 35px rgba(${frame.glow}, 0.25)
          `,
          transition: "box-shadow 0.6s ease"
        }}
      />

      {/* All desk elements with absolute positioning */}
      <div className="relative h-full w-full">
        
        {/* CENTER: Intro Note - main focal point */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="pointer-events-auto">
            <IntroNote 
              name={deskData.intro.name} 
              tagline={deskData.intro.tagline} 
            />
          </div>
        </motion.div>

        {/* TOP LEFT: Field Notes Book */}
        <motion.div 
          className="absolute left-[6%] top-[8%] z-20"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FieldNotesBook />
        </motion.div>

        {/* TOP RIGHT: Atlas Portal */}
        <motion.div 
          className="absolute right-[8%] top-[8%] z-20 scale-[0.85]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <AtlasPortal />
        </motion.div>

        {/* LEFT: Featured Project Card - angled for bulletin board feel */}
        <motion.div 
          className="absolute left-[3%] top-[50%] -translate-y-1/2 z-10"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FeaturedProjectCard 
            title={deskData.featuredProject.title}
            description={deskData.featuredProject.description}
            slug={deskData.featuredProject.slug}
          />
        </motion.div>

        {/* TOP LEFT MIDDLE: Company Passport - between field notes and name */}
        <motion.div 
          className="absolute left-[24%] top-[12%] z-15"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <CompanyCluster companies={deskData.companies} />
        </motion.div>

        {/* BOTTOM LEFT: Accent Polaroid - moved more right */}
        <motion.div 
          className="absolute left-[17%] bottom-[5%] z-20 scale-[0.8]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <AccentPolaroid />
        </motion.div>

        {/* BOTTOM RIGHT: Resume Document */}
        <motion.div 
          className="absolute right-[15%] bottom-[10%] z-20 scale-90"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <ResumeDocument />
        </motion.div>

        {/* RIGHT SIDE: Vinyl Sleeve (Music) - below name on right */}
        <motion.div
          className="absolute right-[27%] top-[42%] z-15"
          style={{ marginLeft: "-34px", marginTop: "129px" }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CassetteTape />
        </motion.div>

        {/* RIGHT SIDE LOWER: Polaroid Stack (Gallery) */}
        <motion.div 
          className="absolute right-[8%] top-[43%] z-15"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <FilmStrip />
        </motion.div>

        {/* About Me Token - bottom center */}
        <motion.div 
          className="absolute left-[31%] bottom-[14%] z-15"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <AboutMeToken />
        </motion.div>

        {/* Decorative elements */}
        <DeskDecorations />

      </div>

      {/* Atmospheric vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(44, 36, 22, 0.08) 100%),
            linear-gradient(to bottom, rgba(249, 244, 232, 0.03) 0%, transparent 10%, transparent 90%, rgba(44, 36, 22, 0.06) 100%)
          `
        }}
      />
    </div>
  )
}
