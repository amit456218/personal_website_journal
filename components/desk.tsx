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
import { PostcardObject } from "./desk/postcard-object"
import { TelegramObject } from "./desk/telegram-object"
import { deskData } from "@/lib/desk-data"
import { DeskArrangeProvider, DeskArrangeControls, DeskItem, useDeskArrange } from "./desk/desk-arrange"
import { DeskLighting, PullChain, WeatherNote, useDeskLighting } from "./desk/desk-lighting"
import { Desk3DBoard, FrameSides } from "./desk/desk-3d"

export function Desk() {
  return (
    <DeskArrangeProvider>
      <DeskBoard />
    </DeskArrangeProvider>
  )
}

function DeskBoard() {
  const cork = useCork()
  const frame = useFrame()
  const { constraintsRef } = useDeskArrange()
  const light = useDeskLighting()

  return (
    <div className="relative h-full w-full overflow-hidden" style={{ background: "#1a1108", perspective: 1600, perspectiveOrigin: "50% 42%" }}>
      <Desk3DBoard style={{ background: cork.bgColor }}>
      {/* Cork bulletin board base */}
      <div
        data-desk-bg
        className="absolute inset-0 pointer-events-none"
        style={{ background: cork.base }}
      />

      {/* Cork speckle texture */}
      <div
        data-desk-bg
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: cork.speckle,
          backgroundSize: cork.speckleSize,
          opacity: 0.85,
        }}
      />

      {/* The shadow box's wooden walls */}
      <FrameSides />

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
      {/* onDragStartCapture here is the *native* HTML drag: links and images
          would otherwise start a browser drag and swallow the pointer gesture. */}
      <div ref={constraintsRef} data-desk-bg className="desk-surface relative h-full w-full" style={{ transformStyle: "preserve-3d" }} onDragStartCapture={(e) => e.preventDefault()}>
        
        {/* CENTER: Intro Note - main focal point */}
        <DeskItem id="intro" depth={10} className="inset-0 flex items-center justify-center pointer-events-none" z={30} duration={0.6}>
          <IntroNote 
            name={deskData.intro.name} 
            tagline={deskData.intro.tagline} 
          />
        </DeskItem>

        {/* TOP LEFT: Field Notes Book */}
        <DeskItem id="field-notes" depth={26} className="left-[6%] top-[8%]" z={20} scale={1.25} from={{ x: -20 }} delay={0.1}>
          <FieldNotesBook />
        </DeskItem>

        {/* TOP RIGHT: Atlas Portal */}
        <DeskItem id="atlas" depth={8} className="right-[6%] top-[8%]" z={20} from={{ y: -20 }} delay={0.15} duration={0.6}>
          <AtlasPortal />
        </DeskItem>

        {/* LEFT: Featured Project Card - angled for bulletin board feel */}
        <DeskItem id="featured" depth={6} className="left-[3%] top-[50%] -translate-y-1/2" z={10} from={{ x: -30 }} delay={0.2}>
          <FeaturedProjectCard 
            title={deskData.featuredProject.title}
            description={deskData.featuredProject.description}
            slug={deskData.featuredProject.slug}
          />
        </DeskItem>

        {/* TOP LEFT MIDDLE: Company Passport - between field notes and name */}
        <DeskItem id="passport" depth={30} className="left-[24%] top-[17%]" z={15} from={{ y: -20 }} delay={0.25}>
          <CompanyCluster companies={deskData.companies} />
        </DeskItem>

        {/* BOTTOM LEFT: Accent Polaroid - moved more right */}
        <DeskItem id="polaroid" depth={9} className="left-[17%] bottom-[5%]" z={20} scale={0.8} from={{ y: 20 }} delay={0.3}>
          <AccentPolaroid />
        </DeskItem>

        {/* BOTTOM RIGHT: Resume Document */}
        <DeskItem id="resume" depth={7} className="right-[11%] bottom-[10%]" z={20} scale={1.2} from={{ y: 20 }} delay={0.35}>
          <ResumeDocument />
        </DeskItem>

        {/* RIGHT SIDE: Vinyl Sleeve (Music) - below name on right */}
        <DeskItem id="record" depth={18} className="right-[24%] top-[37%]" style={{ marginLeft: "-34px" }} z={15} from={{ x: 20 }} delay={0.4}>
          <CassetteTape />
        </DeskItem>

        {/* RIGHT SIDE LOWER: Polaroid Stack (Gallery) */}
        <DeskItem id="gallery" depth={12} className="right-[6%] top-[39%]" z={15} from={{ x: 20 }} delay={0.45}>
          <FilmStrip />
        </DeskItem>

        {/* About Me Token - bottom center */}
        <DeskItem id="about" depth={8} className="left-[32.5%] bottom-[15.5%]" z={15} from={{ y: 20 }} delay={0.5}>
          <AboutMeToken />
        </DeskItem>

        {/* Vintage Radio — Current Listens */}
        <DeskItem id="radio" depth={34} className="right-[30%] bottom-[11%]" z={15} scale={0.9} from={{ y: 20 }} delay={0.55}>
          <VintageRadio />
        </DeskItem>

        {/* Awards & Skills Token — top center */}
        <DeskItem id="awards" depth={14} className="left-[46%] top-[9%]" z={20} from={{ y: -15 }} delay={0.2}>
          <AwardsSkillsToken />
        </DeskItem>

        {/* Telegram — latest dispatch from GitHub */}
        <DeskItem id="telegram" depth={5} className="left-[52%] top-[5%]" z={12} from={{ y: -10 }} delay={0.75}>
          <TelegramObject />
        </DeskItem>

        {/* Postcard — write me */}
        <DeskItem id="postcard" depth={5} className="right-[30%] top-[7%]" z={12} from={{ y: -10 }} delay={0.7}>
          <PostcardObject />
        </DeskItem>

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
      </Desk3DBoard>

      {/* Flat layers over the board: hint, lighting, chain. They don't tilt with it. */}
      <DeskArrangeControls />
      {light.ready && (
        <>
          <DeskLighting phase={light.phase} lampOn={light.lampOn} overcast={light.overcast} />
          <PullChain lampOn={light.lampOn} onPull={light.toggleLamp} label={light.manual ? undefined : light.phase} />
          <WeatherNote weather={light.weather} />
        </>
      )}

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
