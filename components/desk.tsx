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
import { VintageRadio } from "./desk/vintage-radio"
import { AboutMeToken } from "./desk/about-me-token"
import { AwardsSkillsToken } from "./desk/awards-skills-token"
import { FountainPen } from "./desk/fountain-pen"
import { PressedBotanical } from "./desk/pressed-botanical"
import { StickyNote } from "./desk/sticky-note"
import { VintageKey } from "./desk/vintage-key"
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

const CORK_DESIGNS = [
  // Design 1 — warm honey, dense fine speckle
  {
    base: "radial-gradient(ellipse at center, #e8d4a8 0%, #d4bc88 70%, #b89a66 100%)",
    speckle: `
      radial-gradient(circle at 15% 20%, rgba(90,60,25,0.35) 0.8px, transparent 1.5px),
      radial-gradient(circle at 42% 65%, rgba(110,75,30,0.3) 1px, transparent 1.8px),
      radial-gradient(circle at 78% 35%, rgba(75,50,20,0.38) 0.6px, transparent 1.3px),
      radial-gradient(circle at 25% 85%, rgba(120,85,35,0.28) 1.2px, transparent 2px),
      radial-gradient(circle at 60% 15%, rgba(85,55,22,0.32) 0.7px, transparent 1.4px),
      radial-gradient(circle at 88% 75%, rgba(100,70,28,0.3) 0.9px, transparent 1.6px),
      radial-gradient(circle at 5% 50%, rgba(80,55,22,0.35) 0.8px, transparent 1.5px),
      radial-gradient(circle at 50% 50%, rgba(115,80,32,0.22) 1px, transparent 1.7px)
    `,
    speckleSize: "40px 40px, 55px 55px, 30px 30px, 70px 70px, 45px 45px, 60px 60px, 35px 35px, 50px 50px",
    bgColor: "#dcc8a0",
  },
  // Design 2 — bleached/sun-faded cork, very pale and airy
  {
    base: `
      radial-gradient(ellipse at 30% 20%, #f5edd8 0%, #ede0c4 40%, #ddd0b0 100%),
      linear-gradient(170deg, rgba(255,248,230,0.6) 0%, transparent 60%)
    `,
    speckle: `
      radial-gradient(circle at 12% 22%, rgba(120,90,40,0.12) 1.5px, transparent 3px),
      radial-gradient(circle at 40% 60%, rgba(100,75,30,0.1) 1px, transparent 2.5px),
      radial-gradient(circle at 70% 18%, rgba(110,82,35,0.13) 1.8px, transparent 3.5px),
      radial-gradient(circle at 85% 72%, rgba(90,68,28,0.1) 1.2px, transparent 2.8px),
      radial-gradient(circle at 25% 80%, rgba(115,85,38,0.11) 1px, transparent 2.2px),
      radial-gradient(circle at 58% 90%, rgba(105,78,32,0.12) 1.4px, transparent 2.6px),
      radial-gradient(circle at 92% 35%, rgba(95,70,28,0.1) 1.6px, transparent 3px),
      radial-gradient(circle at 48% 42%, rgba(108,80,33,0.09) 2px, transparent 4px)
    `,
    speckleSize: "80px 80px, 65px 65px, 90px 90px, 72px 72px, 58px 58px, 85px 85px, 70px 70px, 95px 95px",
    bgColor: "#ede0c4",
  },
  // Design 3 — warm terracotta-tinted cork, slightly rosy
  {
    base: `
      radial-gradient(ellipse at 65% 35%, #e8c9a0 0%, #d4a878 55%, #c09060 100%),
      linear-gradient(135deg, rgba(180,100,60,0.08) 0%, transparent 70%)
    `,
    speckle: `
      radial-gradient(circle at 18% 15%, rgba(130,65,30,0.3) 1px, transparent 2px),
      radial-gradient(circle at 45% 55%, rgba(110,55,25,0.25) 1.5px, transparent 3px),
      radial-gradient(circle at 72% 28%, rgba(140,70,32,0.28) 0.8px, transparent 1.8px),
      radial-gradient(circle at 30% 75%, rgba(120,60,28,0.22) 1.2px, transparent 2.5px),
      radial-gradient(circle at 60% 82%, rgba(115,58,26,0.26) 1px, transparent 2.2px),
      radial-gradient(circle at 88% 50%, rgba(105,52,24,0.24) 1.4px, transparent 2.8px),
      radial-gradient(circle at 8% 60%, rgba(125,62,29,0.28) 0.9px, transparent 1.9px),
      radial-gradient(circle at 52% 30%, rgba(118,59,27,0.2) 1.6px, transparent 3px)
    `,
    speckleSize: "42px 42px, 58px 58px, 35px 35px, 64px 64px, 48px 48px, 54px 54px, 39px 39px, 66px 66px",
    bgColor: "#d8b888",
  },
  // Design 4 — cool sage-tinted cork, muted green-grey undertone
  {
    base: `
      radial-gradient(ellipse at 50% 60%, #d8d4b8 0%, #c8c4a4 55%, #b0ac8c 100%),
      linear-gradient(45deg, rgba(80,90,60,0.06) 0%, transparent 60%)
    `,
    speckle: `
      radial-gradient(circle at 20% 25%, rgba(80,85,55,0.2) 1.2px, transparent 2.5px),
      radial-gradient(circle at 50% 65%, rgba(70,75,48,0.17) 1px, transparent 2px),
      radial-gradient(circle at 75% 22%, rgba(85,88,58,0.22) 1.5px, transparent 3px),
      radial-gradient(circle at 35% 82%, rgba(75,80,52,0.18) 0.8px, transparent 1.8px),
      radial-gradient(circle at 65% 75%, rgba(78,82,54,0.2) 1.3px, transparent 2.6px),
      radial-gradient(circle at 90% 48%, rgba(72,76,50,0.18) 1px, transparent 2.2px),
      radial-gradient(circle at 10% 70%, rgba(82,86,56,0.2) 1.4px, transparent 2.8px),
      radial-gradient(circle at 44% 38%, rgba(76,80,52,0.15) 1.8px, transparent 3.5px)
    `,
    speckleSize: "52px 52px, 68px 68px, 40px 40px, 75px 75px, 46px 46px, 62px 62px, 55px 55px, 80px 80px",
    bgColor: "#ccc8a8",
  },
]

export function Desk() {
  const [frame, setFrame] = useState(DARK_FRAME_PALETTE[0])
  const [cork, setCork] = useState(CORK_DESIGNS[0])

  useEffect(() => {
    setCork(CORK_DESIGNS[Math.floor(Math.random() * CORK_DESIGNS.length)])
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
    <div className="relative h-full w-full overflow-hidden" style={{ background: cork.bgColor }}>
      {/* Cork bulletin board base */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: cork.base }}
      />

      {/* Cork speckle texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: cork.speckle,
          backgroundSize: cork.speckleSize,
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
          className="absolute left-[6%] top-[8%] z-20 scale-[1.25]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FieldNotesBook />
        </motion.div>

        {/* TOP RIGHT: Atlas Portal */}
        <motion.div 
          className="absolute right-[6%] top-[8%] z-20"
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
          className="absolute left-[24%] top-[17%] z-15"
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
          className="absolute right-[11%] bottom-[10%] z-20 scale-[1.2]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <ResumeDocument />
        </motion.div>

        {/* RIGHT SIDE: Vinyl Sleeve (Music) - below name on right */}
        <motion.div
          className="absolute right-[24%] top-[37%] z-15"
          style={{ marginLeft: "-34px" }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CassetteTape />
        </motion.div>

        {/* RIGHT SIDE LOWER: Polaroid Stack (Gallery) */}
        <motion.div 
          className="absolute right-[6%] top-[39%] z-15"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
        >
          <FilmStrip />
        </motion.div>

        {/* About Me Token - bottom center */}
        <motion.div 
          className="absolute left-[32.5%] bottom-[15.5%] z-15"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <AboutMeToken />
        </motion.div>

        {/* Vintage Radio — Current Listens */}
        <motion.div
          className="absolute right-[30%] bottom-[11%] z-15 scale-[0.9]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <VintageRadio />
        </motion.div>

        {/* Awards & Skills Token — top center */}
        <motion.div
          className="absolute left-[46%] top-[9%] z-20"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AwardsSkillsToken />
        </motion.div>

        {/* Fountain Pen — top center gap */}
        <motion.div
          className="absolute right-[17%] bottom-[25%] z-10 pointer-events-none scale-[0.85]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
        >
          <FountainPen />
        </motion.div>

        {/* Pressed botanical — between music and gallery */}
        <div className="absolute right-[17%] top-[40%] z-10 pointer-events-none" style={{ transform: "rotate(-12deg) scale(0.72)" }}>
          <PressedBotanical />
        </div>

        {/* Sticky note — under postcard with tree */}
        <div className="absolute right-[36%] top-[25%] z-10 pointer-events-none">
          <StickyNote />
        </div>

        {/* Vintage key — above right of alma mater */}
        <div className="absolute right-[3%] bottom-[28%] z-10 pointer-events-none scale-[0.85]">
          <VintageKey />
        </div>

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
