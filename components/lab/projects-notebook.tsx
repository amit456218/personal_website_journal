"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { projects, type Project } from "@/lib/projects-data"
import { Sketch } from "./project-sketches"

const EASE = [0.22, 1, 0.36, 1] as const

const DOT_GRID = {
  backgroundImage: "radial-gradient(rgba(61, 86, 117, 0.28) 0.9px, transparent 1.1px)",
  backgroundSize: "18px 18px",
  backgroundPosition: "9px 9px",
}

function PencilCircle({ active }: { active: boolean }) {
  // A red-pencil ring around the active entry's number.
  return (
    <svg viewBox="0 0 44 30" className="pointer-events-none absolute -left-2 -top-1 h-[30px] w-[44px]" aria-hidden>
      <motion.path
        d="M8 15 C6 6 22 2 32 5 C42 8 41 22 30 26 C18 30 4 26 8 15 C10 10 18 8 24 8"
        fill="none"
        stroke="#a84444"
        strokeWidth="1.6"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.85 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
    </svg>
  )
}

function Contents({ page, onPick }: { page: number; onPick: (i: number) => void }) {
  return (
    <div className="relative h-full p-7 md:p-10 lg:p-12" style={DOT_GRID}>
      <div aria-hidden className="absolute inset-y-0 left-12 w-px bg-stamp-red/25 md:left-16" />

      <p className="font-typewriter text-[10px] uppercase tracking-[0.3em] text-sepia/55">Field notebook &middot; contents</p>
      <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-ink md:text-4xl">Things I built</h1>
      <p className="mt-1 font-handwriting text-lg text-sepia/75">newest first. tap an entry and the page turns.</p>

      <ol className="mt-8 space-y-1.5">
        {projects.map((p, i) => {
          const active = i === page
          return (
            <li key={p.slug}>
              <button
                type="button"
                onClick={() => onPick(i)}
                aria-current={active ? "page" : undefined}
                className="group flex w-full items-baseline gap-3 rounded-sm px-1 py-1.5 text-left transition-colors hover:bg-sepia/[0.06]"
              >
                <span className="relative w-7 shrink-0 font-typewriter text-xs text-sepia/70">
                  <PencilCircle active={active} />
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`font-serif text-lg leading-tight transition-colors md:text-xl ${active ? "text-brass" : "text-ink group-hover:text-sepia"}`}>
                  {p.title}
                </span>
                <span aria-hidden className="mx-1 flex-1 translate-y-[-4px] border-b border-dotted border-sepia/40" />
                <span className="shrink-0 font-typewriter text-[11px] text-sepia/60">p.{i + 1}</span>
              </button>
              <p className="ml-10 mt-0.5 font-typewriter text-[9px] uppercase tracking-[0.18em] text-sepia/45">
                {p.year} &middot; {p.kind}
              </p>
            </li>
          )
        })}
      </ol>

      <div className="mt-8 flex flex-wrap gap-x-5 gap-y-1 font-typewriter text-[9px] uppercase tracking-[0.2em] text-sepia/45">
        <span>&#9679; private code</span>
        <span>&#8599; has a demo</span>
      </div>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-typewriter text-[10px] text-sepia/45">&mdash; i &mdash;</p>
    </div>
  )
}

function EntryPage({ project, index, total, onPrev, onNext }: { project: Project; index: number; total: number; onPrev: () => void; onNext: () => void }) {
  const shown = project.highlights?.slice(0, 3) ?? []
  const more = (project.highlights?.length ?? 0) - shown.length
  const hasDemo = project.links?.some((l) => /demo|dashboard|live/i.test(l.label))
  return (
    <div className="relative flex flex-1 flex-col p-7 pb-12 md:p-10 md:pb-12 lg:p-12" style={DOT_GRID}>
      {/* Taped-in sketch */}
      <motion.div
        className="absolute right-6 top-6 md:right-10 md:top-9"
        initial={{ opacity: 0, rotate: -8, y: -6 }}
        animate={{ opacity: 1, rotate: 4, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
      >
        <div className="tape absolute -top-2 left-1/2 z-10 h-4 w-12 -translate-x-1/2 -rotate-6" />
        <div className="bg-paper-light p-2 shadow-[3px_4px_10px_rgba(44,36,22,0.2)]">
          <Sketch slug={project.slug} size={88} delay={0.45} />
        </div>
      </motion.div>

      <p className="font-typewriter text-[10px] uppercase tracking-[0.3em] text-sepia/55">
        Entry {String(index + 1).padStart(2, "0")} &middot; {project.year}
      </p>
      <h2 className="mt-2 max-w-[70%] font-serif text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
        {project.title}
        {project.privateSource && <span className="ml-2 align-middle text-sm text-sepia/50" aria-label="private code">&#9679;</span>}
        {hasDemo && <span className="ml-2 align-middle text-base text-brass" aria-label="has a demo">&#8599;</span>}
      </h2>
      <p className="mt-2 max-w-[75%] font-handwriting text-xl leading-snug text-sepia/85">{project.tagline}</p>

      <motion.svg viewBox="0 0 200 8" className="mt-3 h-2 w-28" aria-hidden>
        <motion.path d="M2 5 Q50 1 100 5 T198 4" fill="none" stroke="#b8965c" strokeWidth="1.8" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.3 }} />
      </motion.svg>

      <p className="mt-5 font-serif text-[15px] leading-relaxed text-ink/80 md:text-base">{project.summary}</p>

      {shown.length > 0 && (
        <ul className="mt-5 space-y-2">
          {shown.map((h, i) => (
            <motion.li
              key={i}
              className="flex gap-3 font-serif text-[15px] leading-relaxed text-ink/75"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.1, ease: EASE }}
            >
              <span aria-hidden className="mt-[3px] font-handwriting text-lg leading-none text-brass">&#10003;</span>
              <span>{h}</span>
            </motion.li>
          ))}
          {more > 0 && (
            <li className="ml-7 font-handwriting text-base text-sepia/60">+{more} more in the full entry</li>
          )}
        </ul>
      )}

      {/* Paper-clipped spec card */}
      <motion.div
        className="relative mt-7 w-fit max-w-full"
        initial={{ opacity: 0, y: 10, rotate: 0 }}
        animate={{ opacity: 1, y: 0, rotate: -1.5 }}
        transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
      >
        <svg aria-hidden viewBox="0 0 20 44" className="absolute -top-3 left-4 h-11 w-5 text-sepia/70" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M6 40 L6 8 a4 4 0 0 1 8 0 L14 34 a2.5 2.5 0 0 1 -5 0 L9 12" />
        </svg>
        <div className="border border-sepia/25 bg-paper-light px-4 py-3 pl-10 shadow-[2px_3px_8px_rgba(44,36,22,0.15)]">
          <p className="font-typewriter text-[9px] uppercase tracking-[0.25em] text-sepia/55">Made with</p>
          <p className="mt-1 font-typewriter text-[11px] text-ink/80">{project.stack.join("  ·  ")}</p>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-8">
        <div className="flex flex-wrap items-center gap-3">
          <Link href={`/projects/${project.slug}`} className="font-typewriter text-[11px] uppercase tracking-[0.2em] text-brass transition-colors hover:text-ink">
            Read the full entry &rarr;
          </Link>
          {project.links?.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="font-typewriter text-[11px] text-sepia/70 underline decoration-sepia/30 underline-offset-4 transition-colors hover:text-brass">
              {l.label} &#8599;
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3 font-typewriter text-[11px] text-sepia/60">
          <button type="button" onClick={onPrev} disabled={index === 0} className="transition-colors hover:text-ink disabled:opacity-30">&larr; prev</button>
          <span>{index + 1} / {total}</span>
          <button type="button" onClick={onNext} disabled={index === total - 1} className="transition-colors hover:text-ink disabled:opacity-30">next &rarr;</button>
        </div>
      </div>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-typewriter text-[10px] text-sepia/45">&mdash; {index + 1} &mdash;</p>
    </div>
  )
}

export function ProjectsNotebook() {
  const [page, setPage] = useState(0)
  const [dir, setDir] = useState(1)
  const go = (i: number) => {
    if (i < 0 || i >= projects.length || i === page) return
    setDir(i > page ? 1 : -1)
    setPage(i)
  }

  return (
    <div className="min-h-screen bg-paper-dark">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-30" style={{ backgroundImage: "url('/textures/paper-texture.jpg')", backgroundSize: "300px" }} />

      <div className="relative z-10 mx-auto max-w-6xl px-3 pb-16 pt-8 md:px-6 md:pt-12">
        <div className="mb-6 flex items-center justify-between px-2">
          <Link href="/" className="font-typewriter text-[10px] uppercase tracking-[0.25em] text-sepia/55 transition-colors hover:text-sepia/90">&larr; Back to desk</Link>
          <span className="font-typewriter text-[10px] uppercase tracking-[0.3em] text-sepia/45">Field notebook &middot; No. 3</span>
        </div>

        {/* Notebook cover */}
        <div
          className="relative rounded-md p-2 md:p-3"
          style={{
            background: "linear-gradient(145deg, #6a5438 0%, #5c4a32 35%, #4a3b28 100%)",
            boxShadow: "10px 14px 30px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.08), inset 0 -2px 4px rgba(0,0,0,0.25)",
          }}
        >
          <div className="relative grid grid-cols-1 overflow-hidden rounded-sm bg-paper-light lg:grid-cols-2" style={{ perspective: 1800 }}>
            {/* Gutter */}
            <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 z-20 hidden w-10 -translate-x-1/2 lg:block" style={{ background: "linear-gradient(90deg, transparent 0%, rgba(44,36,22,0.10) 40%, rgba(44,36,22,0.16) 50%, rgba(44,36,22,0.10) 60%, transparent 100%)" }} />
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-25" style={{ backgroundImage: "url('/textures/paper-texture.jpg')", backgroundSize: "300px", mixBlendMode: "multiply" }} />

            {/* Left page */}
            <div className="relative min-h-[420px] border-b border-sepia/15 lg:border-b-0">
              <Contents page={page} onPick={go} />
            </div>

            {/* Right page (turns) */}
            <div className="relative">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={projects[page].slug}
                  className="relative flex min-h-[560px] flex-col bg-paper-light lg:min-h-[720px]"
                  style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
                  initial={{ rotateY: dir > 0 ? -55 : 25, opacity: 0, boxShadow: "-20px 0 30px rgba(44,36,22,0.0)" }}
                  animate={{ rotateY: 0, opacity: 1, boxShadow: "-20px 0 30px rgba(44,36,22,0.0)" }}
                  exit={{ rotateY: dir > 0 ? 30 : -60, opacity: 0, boxShadow: "-20px 0 30px rgba(44,36,22,0.18)", transition: { duration: 0.28, ease: "easeIn" } }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <EntryPage project={projects[page]} index={page} total={projects.length} onPrev={() => go(page - 1)} onNext={() => go(page + 1)} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Elastic band */}
          <div aria-hidden className="pointer-events-none absolute -top-1 bottom-[-4px] right-6 hidden w-3 rounded-sm md:block" style={{ background: "linear-gradient(90deg, #2a2118, #3d3226 50%, #2a2118)", boxShadow: "2px 0 6px rgba(0,0,0,0.35)" }} />
        </div>
      </div>
    </div>
  )
}
