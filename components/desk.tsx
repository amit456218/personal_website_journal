"use client"

import { motion } from "framer-motion"
import { useCork, useFrame } from "@/contexts/cork"
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

export function Desk() {
  const cork = useCork()
  const frame = useFrame()

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

      {/* Soft wooden frame edge — hidden on mobile (frame is rendered at viewport level by ScaleToFit) */}
      <div
        className="absolute inset-0 pointer-events-none hidden md:block"
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
