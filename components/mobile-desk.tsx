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
import { VintageRadio } from "./desk/vintage-radio"
import { AboutMeToken } from "./desk/about-me-token"
import { AwardsSkillsToken } from "./desk/awards-skills-token"
import { deskData } from "@/lib/desk-data"

interface ItemProps {
  delay?: number
  children: React.ReactNode
}

function Item({ delay = 0, children }: ItemProps) {
  return (
    <motion.div
      className="flex items-center justify-center w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

export function MobileDesk() {
  const cork = useCork()
  const frame = useFrame()

  return (
    <>
      {/* Continuous cork background covering the whole scrollable page */}
      <div
        className="fixed inset-0 -z-30 pointer-events-none"
        style={{ background: cork.bgColor }}
      />
      <div
        className="fixed inset-0 -z-20 pointer-events-none"
        style={{ background: cork.base }}
      />
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          backgroundImage: cork.speckle,
          backgroundSize: cork.speckleSize,
          opacity: 0.85,
        }}
      />

      {/* Wooden frame fixed at the viewport edge */}
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          boxShadow: `
            inset 0 0 0 8px ${frame.dark},
            inset 0 0 0 10px ${frame.light},
            inset 0 0 28px rgba(${frame.glow}, 0.25)
          `,
          transition: "box-shadow 0.6s ease",
        }}
      />

      {/* Vertical scrollable column of items */}
      <div className="relative w-full min-h-screen flex flex-col items-center gap-28 px-6 pt-24 pb-32 overflow-x-hidden">
        <Item delay={0.0}>
          <IntroNote name={deskData.intro.name} tagline={deskData.intro.tagline} />
        </Item>

        <Item delay={0.05}>
          <AwardsSkillsToken />
        </Item>

        <Item delay={0.1}>
          <FieldNotesBook />
        </Item>

        <Item delay={0.15}>
          <AtlasPortal />
        </Item>

        <Item delay={0.2}>
          <CompanyCluster companies={deskData.companies} />
        </Item>

        <Item delay={0.25}>
          <FeaturedProjectCard
            title={deskData.featuredProject.title}
            description={deskData.featuredProject.description}
            slug={deskData.featuredProject.slug}
          />
        </Item>

        <Item delay={0.3}>
          <ResumeDocument />
        </Item>

        <Item delay={0.35}>
          <AboutMeToken />
        </Item>

        <Item delay={0.4}>
          <CassetteTape />
        </Item>

        <Item delay={0.45}>
          <VintageRadio />
        </Item>

        <Item delay={0.5}>
          <FilmStrip />
        </Item>

        <Item delay={0.55}>
          <AccentPolaroid />
        </Item>
      </div>
    </>
  )
}
