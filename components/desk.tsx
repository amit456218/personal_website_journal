"use client"

import { motion } from "framer-motion"
import { IntroNote } from "./desk/intro-note"
import { FeaturedProjectCard } from "./desk/featured-project-card"
import { CompanyCluster } from "./desk/company-cluster"
import { FieldNotesBook } from "./desk/field-notes-book"
import { ResumeDocument } from "./desk/resume-document"
import { AtlasPortal } from "./desk/atlas-portal"
import { AccentPolaroid } from "./desk/accent-polaroid"
import { deskData } from "@/lib/desk-data"

export function Desk() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-paper-dark">
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

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen items-center justify-center p-8 xl:p-16">
        <div className="relative w-full max-w-5xl h-[700px]">
          
          {/* Intro Note - main focal point, center-left */}
          <motion.div 
            className="absolute left-[3%] top-[15%] z-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <IntroNote 
              name={deskData.intro.name} 
              tagline={deskData.intro.tagline} 
            />
          </motion.div>

          {/* Featured Project Card - overlapping intro note */}
          <motion.div 
            className="absolute left-[32%] top-[5%] z-20"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <FeaturedProjectCard 
              title={deskData.featuredProject.title}
              description={deskData.featuredProject.description}
              slug={deskData.featuredProject.slug}
            />
          </motion.div>

          {/* Company Cluster - vintage stamps collection, bottom left */}
          <motion.div 
            className="absolute left-[0%] top-[52%] z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CompanyCluster companies={deskData.companies} />
          </motion.div>

          {/* Field Notes Book - center, tucked under items */}
          <motion.div 
            className="absolute left-[28%] top-[48%] z-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <FieldNotesBook />
          </motion.div>

          {/* Resume Document - lower center-right */}
          <motion.div 
            className="absolute left-[52%] top-[58%] z-15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <ResumeDocument />
          </motion.div>

          {/* Atlas Portal - hero element, upper right */}
          <motion.div 
            className="absolute right-[5%] top-[8%] z-25"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <AtlasPortal />
          </motion.div>

          {/* Accent Polaroid - right side decoration */}
          <motion.div 
            className="absolute right-[8%] top-[52%] z-15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <AccentPolaroid />
          </motion.div>

          {/* Decorative elements */}
          {/* Paper clip */}
          <motion.div
            className="absolute left-[25%] top-[38%] z-5 pointer-events-none"
            initial={{ opacity: 0, rotate: -20 }}
            animate={{ opacity: 0.6, rotate: 15 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <svg width="24" height="48" viewBox="0 0 24 48" fill="none" className="text-sepia/50">
              <path 
                d="M12 4C7.58 4 4 7.58 4 12v24c0 4.42 3.58 8 8 8s8-3.58 8-8V8" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none"
                strokeLinecap="round"
              />
              <path 
                d="M12 8c2.21 0 4 1.79 4 4v24c0 2.21-1.79 4-4 4" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* Coffee ring stain */}
          <div 
            className="absolute left-[58%] top-[35%] w-20 h-20 pointer-events-none opacity-15 z-0"
            style={{
              backgroundImage: "url('/textures/coffee-stain.jpg')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              transform: "rotate(15deg)"
            }}
          />

          {/* Pencil decoration */}
          <motion.div
            className="absolute right-[28%] top-[75%] z-5 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ transform: "rotate(-25deg)" }}
          >
            <svg width="120" height="12" viewBox="0 0 120 12" fill="none">
              <rect x="0" y="2" width="100" height="8" fill="#f4d03f" rx="1" />
              <rect x="0" y="2" width="100" height="4" fill="#f5d76e" rx="1" />
              <polygon points="100,2 100,10 112,6" fill="#e8c4a8" />
              <polygon points="108,4 108,8 112,6" fill="#2c2416" />
              <rect x="0" y="2" width="8" height="8" fill="#d4a5a5" rx="1" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Tablet Layout */}
      <div className="hidden md:flex lg:hidden min-h-screen items-center justify-center p-6">
        <div className="relative w-full max-w-2xl h-[600px]">
          <motion.div className="absolute left-[5%] top-[10%] z-30">
            <IntroNote name={deskData.intro.name} tagline={deskData.intro.tagline} />
          </motion.div>
          <motion.div className="absolute right-[5%] top-[5%] z-25">
            <AtlasPortal />
          </motion.div>
          <motion.div className="absolute left-[5%] top-[45%] z-20">
            <CompanyCluster companies={deskData.companies} />
          </motion.div>
          <motion.div className="absolute right-[10%] top-[50%] z-15">
            <FieldNotesBook />
          </motion.div>
        </div>
      </div>

      {/* Mobile Layout - elegant vertical stack */}
      <div className="md:hidden min-h-screen py-12 px-5">
        <div className="flex flex-col items-center gap-10">
          {/* Intro Note */}
          <IntroNote 
            name={deskData.intro.name} 
            tagline={deskData.intro.tagline} 
          />

          {/* Atlas Portal */}
          <div className="relative">
            <AtlasPortal />
          </div>

          {/* Company stamps with label */}
          <div className="relative w-full max-w-xs">
            <CompanyCluster companies={deskData.companies} />
          </div>

          {/* Featured Project */}
          <FeaturedProjectCard 
            title={deskData.featuredProject.title}
            description={deskData.featuredProject.description}
            slug={deskData.featuredProject.slug}
          />

          {/* Field Notes */}
          <FieldNotesBook />

          {/* Resume */}
          <ResumeDocument />

          {/* Accent Polaroid */}
          <AccentPolaroid />
        </div>
      </div>

      {/* Atmospheric vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(44, 36, 22, 0.06) 100%),
            linear-gradient(to bottom, rgba(249, 244, 232, 0.03) 0%, transparent 10%, transparent 90%, rgba(44, 36, 22, 0.05) 100%)
          `
        }}
      />
    </div>
  )
}
