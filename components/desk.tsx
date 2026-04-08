"use client"

import { motion } from "framer-motion"
import { IntroNote } from "./desk/intro-note"
import { CompanyCluster } from "./desk/company-cluster"
import { AtlasPortal } from "./desk/atlas-portal"
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

      {/* Main content - centered flexbox layout */}
      <div className="relative h-full flex items-center justify-center p-6 md:p-10">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-5xl w-full">
          
          {/* Left side - Intro Note (main focal point) */}
          <motion.div 
            className="flex-shrink-0 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <IntroNote 
              name={deskData.intro.name} 
              tagline={deskData.intro.tagline} 
            />
          </motion.div>

          {/* Right side - Atlas Portal and Company Cluster stacked */}
          <div className="flex flex-col items-center gap-6 lg:gap-8">
            {/* Atlas Portal */}
            <motion.div 
              className="flex-shrink-0 z-20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <AtlasPortal />
            </motion.div>

            {/* Company Cluster */}
            <motion.div 
              className="flex-shrink-0 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CompanyCluster companies={deskData.companies} />
            </motion.div>
          </div>
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
