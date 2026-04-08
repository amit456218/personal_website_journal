"use client"

import { motion } from "framer-motion"
import { IntroNote } from "./desk/intro-note"
import { CompanyCluster } from "./desk/company-cluster"
import { AtlasPortal } from "./desk/atlas-portal"
import { FeaturedProjectCard } from "./desk/featured-project-card"
import { FieldNotesBook } from "./desk/field-notes-book"
import { ResumeDocument } from "./desk/resume-document"
import { AccentPolaroid } from "./desk/accent-polaroid"
import { deskData } from "@/lib/desk-data"

export function Desk() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-paper-dark">
      {/* Wood grain desk texture base */}
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

      {/* Subtle paper texture overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/textures/paper-texture.jpg')",
          backgroundSize: "600px",
          opacity: 0.35,
          mixBlendMode: "multiply"
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
          className="absolute left-[3%] top-[55%] -translate-y-1/2 z-10"
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
          className="absolute left-[22%] bottom-[8%] z-20 scale-[0.8]"
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
