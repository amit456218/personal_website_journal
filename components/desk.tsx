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

      {/* Desktop Layout - Single viewport */}
      <div className="hidden md:flex h-screen w-full items-center justify-center p-4 lg:p-8">
        <div className="relative w-full max-w-4xl h-full max-h-[90vh] flex flex-col justify-center">
          {/* Top row - Intro and Atlas */}
          <div className="flex items-start justify-between gap-6 mb-6">
            {/* Intro Note */}
            <motion.div 
              className="flex-shrink-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{ transform: "rotate(-1deg)" }}
            >
              <IntroNote 
                name={deskData.intro.name} 
                tagline={deskData.intro.tagline} 
              />
            </motion.div>

            {/* Atlas Portal */}
            <motion.div 
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <AtlasPortal />
            </motion.div>
          </div>

          {/* Bottom row - Company Suitcase centered */}
          <div className="flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <CompanyCluster companies={deskData.companies} />
            </motion.div>
          </div>

          {/* Decorative coffee ring stain */}
          <div 
            className="absolute right-[15%] top-[25%] w-16 h-16 pointer-events-none opacity-10 z-0"
            style={{
              backgroundImage: "url('/textures/coffee-stain.jpg')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              transform: "rotate(15deg)"
            }}
          />

          {/* Decorative pencil */}
          <motion.div
            className="absolute right-[5%] bottom-[20%] z-5 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ transform: "rotate(-25deg)" }}
          >
            <svg width="80" height="10" viewBox="0 0 120 12" fill="none">
              <rect x="0" y="2" width="100" height="8" fill="#f4d03f" rx="1" />
              <rect x="0" y="2" width="100" height="4" fill="#f5d76e" rx="1" />
              <polygon points="100,2 100,10 112,6" fill="#e8c4a8" />
              <polygon points="108,4 108,8 112,6" fill="#2c2416" />
              <rect x="0" y="2" width="8" height="8" fill="#d4a5a5" rx="1" />
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Mobile Layout - Vertical stack, fits in viewport */}
      <div className="md:hidden h-screen flex flex-col items-center justify-center py-8 px-5 gap-8">
        {/* Intro Note */}
        <IntroNote 
          name={deskData.intro.name} 
          tagline={deskData.intro.tagline} 
        />

        {/* Atlas Portal */}
        <AtlasPortal />

        {/* Company Suitcase */}
        <div className="scale-90">
          <CompanyCluster companies={deskData.companies} />
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
