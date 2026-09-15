"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { projects, type Project } from "@/lib/projects-data"

const EASE = [0.22, 1, 0.36, 1] as const

// Deterministic tilt per card — Math.random would desync hydration.
const ROTATIONS = [-0.6, 0.5, -0.4, 0.7, -0.5, 0.4]

function PaperGrain({ size = 200 }: { size?: number }) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 opacity-20 rounded-sm pointer-events-none"
      style={{
        backgroundImage: "url('/textures/paper-texture.jpg')",
        backgroundSize: `${size}px`,
        mixBlendMode: "multiply",
      }}
    />
  )
}

function YearStamp({ year, size = "md" }: { year: string; size?: "sm" | "md" }) {
  const dims = size === "sm" ? "w-9 h-9" : "w-12 h-12"
  const text = size === "sm" ? "text-[9px]" : "text-[10px]"
  return (
    <div
      aria-hidden
      className={`${dims} border-2 border-dashed border-stamp-red/40 rounded-full flex items-center justify-center -rotate-12`}
    >
      <span className={`font-typewriter ${text} text-stamp-red/60 leading-none`}>{year}</span>
    </div>
  )
}

function StackTags({ stack, limit }: { stack: string[]; limit?: number }) {
  const items = limit ? stack.slice(0, limit) : stack
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1">
      {items.map((s) => (
        <li key={s} className="font-typewriter text-[10px] uppercase tracking-[0.12em] text-sepia/55">
          {s}
        </li>
      ))}
    </ul>
  )
}

function EntryNumber({ n }: { n: number }) {
  return (
    <span className="font-typewriter text-[10px] uppercase tracking-[0.2em] text-sepia/50">
      No. {String(n).padStart(2, "0")}
    </span>
  )
}

// A full notebook page for the substantial entries.
function FieldEntry({ project, index, number }: { project: Project; index: number; number: number }) {
  const rotation = ROTATIONS[index % ROTATIONS.length]
  return (
    <Link href={`/projects/${project.slug}`} className="block group" aria-label={`${project.title}: ${project.tagline}`}>
      <motion.article
        className="relative bg-paper-light rounded-sm"
        style={{ boxShadow: "4px 6px 18px rgba(44, 36, 22, 0.18), 1px 2px 6px rgba(44, 36, 22, 0.1)" }}
        initial={{ opacity: 0, y: 24, rotate: rotation + 1.5 }}
        animate={{ opacity: 1, y: 0, rotate: rotation }}
        transition={{ duration: 0.6, delay: 0.15 + index * 0.1, ease: EASE }}
        whileHover={{ rotate: 0, y: -4, scale: 1.01, transition: { duration: 0.25 } }}
      >
        <PaperGrain />

        {/* Notebook ruling */}
        <div aria-hidden className="absolute left-14 md:left-20 top-0 bottom-0 w-px bg-stamp-red/30" />
        <div
          aria-hidden
          className="absolute inset-x-0 top-14 bottom-6 pointer-events-none opacity-60"
          style={{
            backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 27px, rgba(61, 86, 117, 0.16) 27px 28px)",
          }}
        />

        {/* Pin hole */}
        <div
          aria-hidden
          className="absolute top-3 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 border-sepia/35"
          style={{ background: "radial-gradient(circle, transparent 30%, rgba(92, 74, 50, 0.12) 100%)" }}
        />

        <div className="relative grid grid-cols-[3.5rem_1fr] md:grid-cols-[5rem_1fr_auto] gap-x-4 md:gap-x-6 px-5 md:px-8 pt-8 pb-7">
          {/* Margin column */}
          <div className="flex flex-col items-start gap-3 pt-1">
            <EntryNumber n={number} />
            <YearStamp year={project.year} size="sm" />
          </div>

          {/* Body */}
          <div className="min-w-0">
            <p className="font-typewriter text-[10px] uppercase tracking-[0.2em] text-sepia/55 mb-2">
              {project.kind}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-ink font-semibold tracking-tight leading-tight group-hover:text-brass transition-colors">
              {project.title}
            </h2>
            <p className="font-handwriting text-xl text-sepia/85 mt-1.5 leading-snug">
              {project.tagline}
            </p>
            <p className="font-serif text-base text-ink/70 leading-relaxed mt-4 line-clamp-2 max-w-2xl">
              {project.summary}
            </p>
            <div className="mt-4">
              <StackTags stack={project.stack} limit={5} />
            </div>
          </div>

          {/* Read cue */}
          <div className="hidden md:flex flex-col items-end justify-end">
            <span className="font-typewriter text-[10px] uppercase tracking-[0.2em] text-brass/70 group-hover:text-brass transition-colors whitespace-nowrap">
              Read entry &rarr;
            </span>
          </div>
        </div>

        {/* Worn corner */}
        <div
          aria-hidden
          className="absolute bottom-0 right-0 w-5 h-5"
          style={{ background: "linear-gradient(135deg, transparent 50%, rgba(200, 185, 155, 0.5) 50%)" }}
        />
      </motion.article>
    </Link>
  )
}

// A smaller index card for the earlier entries.
function EarlierEntry({ project, index, number }: { project: Project; index: number; number: number }) {
  const rotation = ROTATIONS[(index + 3) % ROTATIONS.length] * 1.5
  return (
    <Link href={`/projects/${project.slug}`} className="block group h-full" aria-label={`${project.title}: ${project.tagline}`}>
      <motion.article
        className="relative h-full bg-paper-light rounded-sm"
        style={{ boxShadow: "3px 4px 12px rgba(44, 36, 22, 0.18), 1px 2px 4px rgba(44, 36, 22, 0.1)" }}
        initial={{ opacity: 0, y: 20, rotate: rotation + 2 }}
        animate={{ opacity: 1, y: 0, rotate: rotation }}
        transition={{ duration: 0.5, delay: 0.5 + index * 0.08, ease: EASE }}
        whileHover={{ rotate: 0, y: -4, scale: 1.02, transition: { duration: 0.2 } }}
      >
        <PaperGrain size={150} />
        <div aria-hidden className="absolute inset-2 border border-sepia/15 rounded-sm pointer-events-none" />

        <div className="relative h-full flex flex-col p-5">
          <div className="flex items-start justify-between mb-3">
            <EntryNumber n={number} />
            <YearStamp year={project.year} size="sm" />
          </div>

          <p className="font-typewriter text-[9px] uppercase tracking-[0.18em] text-sepia/50 mb-1.5">
            {project.kind}
          </p>
          <h3 className="font-serif text-xl text-ink font-semibold tracking-tight leading-tight group-hover:text-brass transition-colors">
            {project.title}
          </h3>
          <p className="font-handwriting text-lg text-sepia/80 mt-1 leading-snug">
            {project.tagline}
          </p>

          <div className="mt-auto pt-4">
            <StackTags stack={project.stack} limit={3} />
          </div>
        </div>

        <div
          aria-hidden
          className="absolute bottom-0 right-0 w-4 h-4"
          style={{ background: "linear-gradient(135deg, transparent 50%, rgba(200, 185, 155, 0.4) 50%)" }}
        />
      </motion.article>
    </Link>
  )
}

function SectionHeading({ label, count, delay }: { label: string; count: number; delay: number }) {
  return (
    <motion.div
      className="flex items-center gap-4 mb-6"
      initial={{ opacity: 0, scaleX: 0.9 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      <span className="font-typewriter text-[10px] uppercase tracking-[0.25em] text-sepia/60 whitespace-nowrap">
        {label}
      </span>
      <div className="flex-1 h-px bg-gradient-to-r from-sepia/30 via-sepia/20 to-transparent" />
      <span className="font-handwriting text-sm text-brass whitespace-nowrap">
        {count} {count === 1 ? "entry" : "entries"}
      </span>
    </motion.div>
  )
}

export function ProjectsPage() {
  const fieldWork = projects.filter((p) => p.tier === "field-work")
  const earlier = projects.filter((p) => p.tier === "earlier")
  const years = projects.map((p) => Number(p.year)).filter((y) => !Number.isNaN(y))
  const span = years.length ? `${Math.min(...years)}–${Math.max(...years)}` : ""

  return (
    <div className="min-h-screen bg-paper-dark">
      {/* Paper texture overlay */}
      <div
        aria-hidden
        className="fixed inset-0 opacity-30 pointer-events-none z-0"
        style={{ backgroundImage: "url('/textures/paper-texture.jpg')", backgroundSize: "300px" }}
      />

      <div className="relative z-10">
        <header className="pt-12 pb-6 px-6 md:px-12">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center gap-2 group mb-8">
              <motion.div
                className="flex items-center gap-2 px-3 py-1.5 bg-paper-light rounded border border-border vintage-shadow"
                whileHover={{ x: -4 }}
                transition={{ duration: 0.2 }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-sepia" aria-hidden>
                  <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                </svg>
                <span className="font-typewriter text-xs text-sepia">Back to Desk</span>
              </motion.div>
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
              <div className="flex items-end gap-4 mb-4">
                <h1 className="font-serif text-4xl md:text-5xl text-ink font-semibold tracking-tight">
                  Field Notes
                </h1>
                {span && (
                  <div className="flex items-center gap-2 pb-2">
                    <div className="w-12 h-px bg-sepia/30" />
                    <span className="font-typewriter text-xs text-sepia/60">{span}</span>
                  </div>
                )}
              </div>
              <p className="font-serif text-lg text-sepia/70 max-w-2xl leading-relaxed">
                Things built, and the notes taken while building them. Cameras that watch you study,
                GPU kernels written by hand, a poker solver you can check against the textbook, and a
                voice agent that answers the phone. Newest entries first.
              </p>
            </motion.div>
          </div>
        </header>

        <main className="px-6 md:px-12 pb-16">
          <div className="max-w-4xl mx-auto">
            <section aria-labelledby="field-work" className="mb-16">
              <h2 id="field-work" className="sr-only">Field work</h2>
              <SectionHeading label="Field work" count={fieldWork.length} delay={0.1} />
              <div className="flex flex-col gap-6">
                {fieldWork.map((p, i) => (
                  <FieldEntry key={p.slug} project={p} index={i} number={i + 1} />
                ))}
              </div>
            </section>

            {earlier.length > 0 && (
              <section aria-labelledby="earlier-entries">
                <h2 id="earlier-entries" className="sr-only">Earlier entries</h2>
                <SectionHeading label="Earlier entries" count={earlier.length} delay={0.45} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {earlier.map((p, i) => (
                    <EarlierEntry key={p.slug} project={p} index={i} number={fieldWork.length + i + 1} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>

        <footer className="border-t border-sepia/20 py-8 px-6 md:px-12">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <p className="font-typewriter text-xs text-sepia/50">
              {projects.length} entries and counting
            </p>
            <div className="flex items-center gap-4">
              <Link href="/work" className="font-typewriter text-xs text-sepia/60 hover:text-sepia transition-colors">
                Work Archive
              </Link>
              <span className="text-sepia/30">•</span>
              <Link href="/" className="font-typewriter text-xs text-sepia/60 hover:text-sepia transition-colors">
                Return Home
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
