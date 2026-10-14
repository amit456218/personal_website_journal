"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { BackToDesk } from "@/components/back-to-desk"
import { Stamp } from "@/components/stamp"

// UIUC-vintage color constants
const ILLINI_ORANGE = "#c4622d"
const ILLINI_BLUE = "#1e3a5f"

function BlockISeal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 160" className={className} fill="none">
      {/* Outer circle border */}
      <circle cx="60" cy="80" r="58" stroke={ILLINI_ORANGE} strokeWidth="3" opacity="0.9" />
      <circle cx="60" cy="80" r="52" stroke={ILLINI_ORANGE} strokeWidth="1" opacity="0.5" />
      {/* ILLINOIS text arc top */}
      <path id="topArc" d="M 16 60 A 46 46 0 0 1 104 60" fill="none" />
      <text fontSize="9" fontFamily="monospace" fill={ILLINI_ORANGE} letterSpacing="3">
        <textPath href="#topArc" startOffset="8%">UNIVERSITY OF ILLINOIS</textPath>
      </text>
      {/* Block I */}
      {/* Top serif */}
      <rect x="36" y="48" width="48" height="10" rx="1" fill={ILLINI_ORANGE} />
      {/* Stem */}
      <rect x="50" y="57" width="20" height="46" rx="1" fill={ILLINI_ORANGE} />
      {/* Bottom serif */}
      <rect x="36" y="102" width="48" height="10" rx="1" fill={ILLINI_ORANGE} />
      {/* URBANA-CHAMPAIGN text arc bottom */}
      <path id="botArc" d="M 16 100 A 46 46 0 0 0 104 100" fill="none" />
      <text fontSize="8" fontFamily="monospace" fill={ILLINI_ORANGE} letterSpacing="2">
        <textPath href="#botArc" startOffset="10%">URBANA-CHAMPAIGN · EST. 1867</textPath>
      </text>
    </svg>
  )
}

function UIUCTicket({
  title,
  subtitle,
  date,
  detail,
  rotation = 0,
  index = 0,
}: {
  title: string
  subtitle: string
  date: string
  detail: string
  rotation?: number
  index?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-30px" })

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={{ transform: `rotate(${rotation}deg)` }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      {/* Tape strip */}
      <div
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-3 tape z-10"
        style={{ transform: `translateX(-50%) rotate(${rotation * -0.5}deg)` }}
      />
      <div
        className="relative overflow-hidden"
        style={{
          clipPath: "polygon(0 0, 5% 50%, 0 100%, 100% 100%, 95% 50%, 100% 0)",
          background: "#f9f4e8",
          boxShadow: "3px 3px 8px rgba(44,36,22,0.2)",
        }}
      >
        {/* Left colored bar */}
        <div
          className="absolute left-0 top-0 bottom-0 w-3"
          style={{ background: index % 2 === 0 ? ILLINI_ORANGE : ILLINI_BLUE }}
        />
        <div className="pl-6 pr-4 py-3">
          <p
            className="font-typewriter text-[11px] font-bold tracking-widest"
            style={{ color: index % 2 === 0 ? ILLINI_ORANGE : ILLINI_BLUE }}
          >
            {title}
          </p>
          <p className="font-typewriter text-[10px] text-ink/70 mt-0.5">{subtitle}</p>
          <div className="flex justify-between items-end mt-2">
            <p className="font-typewriter text-[9px] text-sepia/60">{date}</p>
            <p className="font-typewriter text-[9px] text-sepia/50">{detail}</p>
          </div>
        </div>
        {/* Barcode decoration */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-px">
          {[3, 1, 2, 1, 3, 1, 2, 1, 3].map((w, i) => (
            <div
              key={i}
              className="bg-ink/20"
              style={{ width: w, height: 24 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function OrangeTapeStrip({ top, left, width = 40, angle = 0 }: { top: number; left: number; width?: number; angle?: number }) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        top,
        left,
        width,
        height: 10,
        background: `rgba(196, 98, 45, 0.18)`,
        boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
        transform: `rotate(${angle}deg)`,
      }}
    />
  )
}

export function AlmaMaterPage() {
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  return (
    <div className="min-h-screen bg-paper-dark py-8 px-4 md:py-16">
      {/* Book binding shadow */}
      <div
        className="fixed left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 pointer-events-none z-30 hidden lg:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(44,36,22,0.15) 0%, rgba(44,36,22,0.05) 30%, transparent 50%, rgba(44,36,22,0.05) 70%, rgba(44,36,22,0.15) 100%)",
        }}
      />

      <BackToDesk />

      <div className="max-w-7xl mx-auto pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* ── LEFT PAGE – Writing ── */}
          <motion.div
            ref={leftRef}
            className="bg-paper-light p-8 md:p-12 lg:p-16 relative min-h-[85vh] lg:min-h-screen"
            initial={{ opacity: 0, x: -30, rotateY: 5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ boxShadow: "inset -10px 0 20px -10px rgba(44,36,22,0.1)" }}
          >
            {/* Paper texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage: "url('/textures/paper-texture.webp')",
                backgroundSize: "300px",
                backgroundRepeat: "repeat",
              }}
            />

            {/* Ruled lines */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
              {Array.from({ length: 42 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute left-0 right-0 h-px"
                  style={{ top: 56 + i * 28, background: `${ILLINI_BLUE}55` }}
                />
              ))}
              {/* Orange margin line */}
              <div
                className="absolute top-0 bottom-0 w-px left-16 md:left-20"
                style={{ background: `${ILLINI_ORANGE}66` }}
              />
            </div>

            {/* UIUC color ribbon top */}
            <div className="absolute top-0 left-0 right-0 h-1.5 flex pointer-events-none">
              <div className="flex-1" style={{ background: ILLINI_ORANGE }} />
              <div className="flex-1" style={{ background: ILLINI_BLUE }} />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Header */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p
                  className="font-typewriter text-xs tracking-[0.25em] uppercase"
                  style={{ color: ILLINI_ORANGE }}
                >
                  Fall 2024 — May 2028 (expected)
                </p>
                <p className="font-typewriter text-xs text-sepia/60 mt-0.5 tracking-widest">
                  Urbana-Champaign, Illinois
                </p>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="font-serif text-4xl md:text-5xl text-ink mb-2 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Class of 2028,<br />on the Prairie
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="font-typewriter text-sm text-sepia/70 mb-5 tracking-wider"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                B.S. Mathematics &amp; Computer Science — University of Illinois Urbana-Champaign
              </motion.p>

              {/* Animated underline */}
              <motion.svg
                viewBox="0 0 200 10"
                className="w-36 h-3 mb-8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.6 }}
              >
                <motion.path
                  d="M0,5 Q50,2 100,6 T200,4"
                  fill="none"
                  stroke={ILLINI_ORANGE}
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.6 }}
                />
              </motion.svg>

              {/* Body paragraphs */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="space-y-5"
              >
                <p className="font-serif text-base md:text-lg text-foreground leading-relaxed first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:leading-none">
                  I came to Urbana-Champaign in the fall of 2024 to study Mathematics and
                  Computer Science, and I&apos;m on track to finish in May 2028. The math keeps
                  me honest about proofs and probability; the CS side is where I get to build.
                </p>
                <p className="font-serif text-base md:text-lg text-foreground leading-relaxed">
                  The courses that stuck are the ones that make you write the thing yourself.
                  In CS 341 Systems Programming I built a memory allocator from scratch, with
                  boundary tags, splitting and free-list coalescing, and it scored 100/100 and
                  ranked first on the class leaderboard. The same semester meant an epoll file
                  server, a parallel make with cycle detection, a CPU scheduler, and a
                  two-level page table with a TLB. CS 357 Numerical Methods was the other half:
                  PageRank by power iteration, eigenvalue methods, topology optimization.
                </p>
                <p className="font-serif text-base md:text-lg text-foreground leading-relaxed">
                  Outside lectures I&apos;m a member of Quant @ Illinois, BuildIllinois and
                  Project Code, and in 2026 I took first place at the Illinois Trading
                  Competition.
                </p>
              </motion.div>

              {/* Margin notes */}
              <div className="mt-10 space-y-5">
                {[
                  "Go Illini! 🔸🔷",
                  "malloc: 100/100, rank #1 ✓",
                  "Advanced Algorithms · Probability · Statistics",
                  "1st, Illinois Trading Competition '26",
                ].map((note, i) => (
                  <motion.div
                    key={i}
                    className="relative pl-5"
                    style={{
                      borderLeft: `2px solid ${i % 2 === 0 ? ILLINI_ORANGE + "66" : ILLINI_BLUE + "55"}`,
                      transform: `rotate(${(i % 2 === 0 ? 1 : -1) * 0.4}deg)`,
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 + i * 0.12 }}
                  >
                    <p className="font-handwriting text-lg md:text-xl text-sepia/80 leading-relaxed">
                      {note}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Page number */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <p className="font-typewriter text-xs text-muted-foreground">— Alma Mater —</p>
            </div>
          </motion.div>

          {/* ── RIGHT PAGE – Ephemera ── */}
          <motion.div
            ref={rightRef}
            className="bg-paper-light p-8 md:p-12 lg:p-16 relative min-h-[85vh] lg:min-h-screen overflow-hidden"
            initial={{ opacity: 0, x: 30, rotateY: -5 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            style={{ boxShadow: "inset 10px 0 20px -10px rgba(44,36,22,0.1)" }}
          >
            {/* Paper texture */}
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{
                backgroundImage: "url('/textures/paper-texture.webp')",
                backgroundSize: "300px",
                backgroundRepeat: "repeat",
              }}
            />

            {/* UIUC color ribbon top */}
            <div className="absolute top-0 left-0 right-0 h-1.5 flex pointer-events-none">
              <div className="flex-1" style={{ background: ILLINI_BLUE }} />
              <div className="flex-1" style={{ background: ILLINI_ORANGE }} />
            </div>

            {/* Block-I watermark background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
              <BlockISeal className="w-80 h-80" />
            </div>

            {/* Coffee stain */}
            <div
              className="absolute top-16 right-12 w-28 h-28 opacity-[0.07] pointer-events-none"
              style={{
                backgroundImage: "url('/textures/coffee-stain.webp')",
                backgroundSize: "cover",
              }}
            />

            {/* Orange tape strips */}
            <OrangeTapeStrip top={32} left={60} width={44} angle={-3} />
            <OrangeTapeStrip top={220} left={180} width={36} angle={4} />

            {/* Content */}
            <div className="relative z-10 space-y-10">

              {/* Block-I seal card – pinned up top */}
              <motion.div
                className="mx-auto w-fit"
                initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -4 }}
                transition={{ duration: 0.7, delay: 0.5, type: "spring", stiffness: 200, damping: 14 }}
              >
                <div
                  className="polaroid p-3 pb-8 relative"
                  style={{ transform: "rotate(-4deg)" }}
                >
                  <div
                    className="w-40 h-40 flex items-center justify-center"
                    style={{ background: ILLINI_BLUE }}
                  >
                    <BlockISeal className="w-32 h-32" />
                  </div>
                  <p className="font-handwriting text-base text-sepia/80 text-center mt-2">
                    home since fall 2024
                  </p>
                </div>
              </motion.div>

              {/* Stamps row */}
              <div className="flex flex-wrap gap-4 justify-center">
                <Stamp text={"UIUC\n2024–2028"} type="rectangle" color="blue" rotation={-6} index={0} />
                <Stamp text={"MATH\n+ CS"} type="round" color="red" rotation={5} index={1} />
                <Stamp text={"CLASS OF\n2028"} type="rectangle" color="green" rotation={-3} index={2} />
                <Stamp text={"QUANT @\nILLINOIS"} type="round" color="blue" rotation={8} index={3} />
              </div>

              {/* Ticket stubs */}
              <div className="space-y-4 max-w-xs mx-auto">
                <UIUCTicket
                  title="ILLINOIS TRADING COMPETITION"
                  subtitle="First place"
                  date="2026"
                  detail="Winner"
                  rotation={-2}
                  index={0}
                />
                <UIUCTicket
                  title="CS 341 · MALLOC MP"
                  subtitle="Systems Programming"
                  date="100 / 100"
                  detail="Leaderboard #1"
                  rotation={2}
                  index={1}
                />
                <UIUCTicket
                  title="CAMPUS CLUBS"
                  subtitle="Quant @ Illinois · BuildIllinois · Project Code"
                  date="2024 –"
                  detail="Member"
                  rotation={-1}
                  index={2}
                />
              </div>

              {/* Postmark */}
              <motion.div
                className="absolute bottom-24 right-8 md:right-14"
                initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                animate={{ opacity: 0.18, scale: 1, rotate: -12 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              >
                <div
                  className="w-28 h-28 rounded-full border-4 flex items-center justify-center"
                  style={{ borderColor: ILLINI_BLUE }}
                >
                  <div className="text-center">
                    <p
                      className="font-typewriter text-[9px] tracking-widest"
                      style={{ color: ILLINI_BLUE }}
                    >
                      CLASS OF
                    </p>
                    <p
                      className="font-typewriter text-base font-bold"
                      style={{ color: ILLINI_BLUE }}
                    >
                      MAY 2028
                    </p>
                    <p
                      className="font-typewriter text-[8px] tracking-wider"
                      style={{ color: ILLINI_BLUE }}
                    >
                      URBANA, IL
                    </p>
                  </div>
                </div>
                {/* Cancellation lines */}
                <div className="absolute inset-0 flex flex-col justify-center gap-1.5 overflow-hidden opacity-60">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-px"
                      style={{ background: ILLINI_BLUE, transform: "rotate(-12deg)" }}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Handwritten note */}
              <motion.div
                className="absolute bottom-10 left-8 md:left-12"
                initial={{ opacity: 0, rotate: -6 }}
                animate={{ opacity: 1, rotate: -3 }}
                transition={{ duration: 0.6, delay: 1.5 }}
              >
                <p
                  className="font-handwriting text-xl leading-snug"
                  style={{ color: ILLINI_ORANGE + "cc" }}
                >
                  &ldquo;I am Illinois&rdquo;
                </p>
              </motion.div>
            </div>

            {/* Page number */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
              <p className="font-typewriter text-xs text-muted-foreground">— Ephemera —</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
