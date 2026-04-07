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
      {/* Subtle surface texture */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/textures/paper-texture.jpg')",
          backgroundSize: "500px",
          opacity: 0.5,
          mixBlendMode: "multiply"
        }}
      />

      {/* Desktop Layout */}
      <div className="hidden md:flex min-h-screen items-center justify-center p-8 lg:p-16">
        <div className="relative w-full max-w-4xl h-[600px]">
          {/* Intro Note - center-left focal point */}
          <motion.div 
            className="absolute left-[5%] top-[20%] z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <IntroNote 
              name={deskData.intro.name} 
              tagline={deskData.intro.tagline} 
            />
          </motion.div>

          {/* Featured Project Card - upper right of intro */}
          <motion.div 
            className="absolute left-[38%] top-[8%] z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FeaturedProjectCard 
              title={deskData.featuredProject.title}
              description={deskData.featuredProject.description}
              slug={deskData.featuredProject.slug}
            />
          </motion.div>

          {/* Company Cluster - lower left */}
          <motion.div 
            className="absolute left-[2%] top-[58%] z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CompanyCluster companies={deskData.companies} />
          </motion.div>

          {/* Field Notes Book - center bottom, peeking from under */}
          <motion.div 
            className="absolute left-[32%] top-[55%] z-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FieldNotesBook />
          </motion.div>

          {/* Resume Document - lower center-right */}
          <motion.div 
            className="absolute left-[48%] top-[68%] z-15"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <ResumeDocument />
          </motion.div>

          {/* Atlas Portal - upper right */}
          <motion.div 
            className="absolute right-[8%] top-[15%] z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AtlasPortal />
          </motion.div>

          {/* Accent Polaroid - right side */}
          <motion.div 
            className="absolute right-[5%] top-[55%] z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AccentPolaroid />
          </motion.div>

          {/* Coffee stain accent - purely decorative */}
          <div 
            className="absolute left-[55%] top-[40%] w-16 h-16 pointer-events-none opacity-20 z-0"
            style={{
              backgroundImage: "url('/textures/coffee-stain.jpg')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat"
            }}
          />
        </div>
      </div>

      {/* Mobile Layout - vertical stack */}
      <div className="md:hidden min-h-screen py-12 px-6">
        <div className="flex flex-col items-center gap-8">
          {/* Intro Note */}
          <IntroNote 
            name={deskData.intro.name} 
            tagline={deskData.intro.tagline} 
          />

          {/* Atlas Portal - sticky on mobile */}
          <div className="sticky top-4 z-30">
            <AtlasPortal />
          </div>

          {/* Featured Project */}
          <FeaturedProjectCard 
            title={deskData.featuredProject.title}
            description={deskData.featuredProject.description}
            slug={deskData.featuredProject.slug}
          />

          {/* Company Cluster */}
          <CompanyCluster companies={deskData.companies} />

          {/* Field Notes */}
          <FieldNotesBook />

          {/* Resume */}
          <ResumeDocument />

          {/* Accent Polaroid */}
          <AccentPolaroid />
        </div>
      </div>

      {/* Subtle vignette */}
      <div 
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(44, 36, 22, 0.08) 100%)"
        }}
      />
    </div>
  )
}
