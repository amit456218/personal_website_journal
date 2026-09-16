"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { projects, type Project } from "@/lib/projects-data"
import { seededRandom } from "@/lib/seeded-random"
import { useIsMobile } from "@/hooks/use-mobile"

const EASE = [0.22, 1, 0.36, 1] as const

function flightCode(i: number) {
  return `FN ${String(i + 1).padStart(2, "0")}`
}

function gateLabel(p: Project) {
  const g = p.stack[0].toUpperCase()
  if (g.length <= 12) return g
  const cut = g.lastIndexOf(" ", 12)
  return cut > 4 ? g.slice(0, cut) : g.slice(0, 12)
}

function remarks(p: Project, short = false) {
  if (p.links?.some((l) => /demo|dashboard|live/i.test(l.label))) return short ? "BOARDING" : "NOW BOARDING"
  if (p.privateSource) return "PRIVATE"
  return "DEPARTED"
}

// One split-flap character tile.
function Flap({ ch, delay, dim }: { ch: string; delay: number; dim?: boolean }) {
  return (
    <motion.span
      className={`relative inline-flex h-[1.55em] w-[0.95ch] shrink-0 items-center justify-center overflow-hidden rounded-[2px] font-typewriter ${dim ? "text-[#cdbf9f]/55" : "text-[#f4ecd8]"}`}
      style={{ background: "linear-gradient(#3b3129 0 49%, #2a221b 51% 100%)", boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.4)", transformOrigin: "center", perspective: 400 }}
      initial={{ rotateX: 90, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{ duration: 0.35, delay, ease: EASE }}
    >
      {ch === " " ? " " : ch}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-black/45" />
    </motion.span>
  )
}

function FlapText({ text, width, delay, dim, align = "left" }: { text: string; width: number; delay: number; dim?: boolean; align?: "left" | "right" }) {
  const padded = align === "right" ? text.slice(0, width).padStart(width, " ") : text.slice(0, width).padEnd(width, " ")
  return (
    <span className="flex gap-[2px]">
      {padded.split("").map((ch, i) => (
        <Flap key={i} ch={ch} delay={delay + i * 0.018} dim={dim || ch === " "} />
      ))}
    </span>
  )
}

function Barcode({ seed }: { seed: number }) {
  return (
    <div className="flex h-10 items-end gap-[2px]" aria-hidden>
      {Array.from({ length: 34 }).map((_, i) => (
        <span
          key={i}
          className="bg-ink/80"
          style={{ width: seededRandom(seed, i) > 0.6 ? 3 : 1.5, height: `${Number((70 + seededRandom(seed, 100 + i) * 30).toFixed(2))}%` }}
        />
      ))}
    </div>
  )
}

function BoardingPass({ project, index }: { project: Project; index: number }) {
  const cls = project.tier === "field-work" ? "FIELD WORK" : "EARLIER"
  return (
    <motion.div
      key={project.slug}
      className="relative mx-auto mt-8 w-full max-w-4xl"
      initial={{ opacity: 0, y: 28, rotate: -1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, y: -16, transition: { duration: 0.2 } }}
      transition={{ duration: 0.55, ease: EASE }}
    >
      <div
        className="relative grid grid-cols-1 overflow-hidden rounded-sm bg-paper-light md:grid-cols-[1fr_16rem]"
        style={{ boxShadow: "6px 8px 24px rgba(44, 36, 22, 0.22), 2px 3px 8px rgba(44, 36, 22, 0.12)" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{ backgroundImage: "url('/textures/paper-texture.webp')", backgroundSize: "220px", mixBlendMode: "multiply" }}
        />

        {/* Main portion */}
        <div className="relative p-6 md:p-8">
          <div className="flex items-center justify-between border-b border-sepia/25 pb-3">
            <span className="font-typewriter text-[10px] uppercase tracking-[0.3em] text-sepia/70">Boarding pass</span>
            <span className="font-typewriter text-[10px] uppercase tracking-[0.2em] text-sepia/50">Field Notes Air &middot; {cls}</span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
            <div className="col-span-2 sm:col-span-4">
              <p className="font-typewriter text-[9px] uppercase tracking-[0.25em] text-sepia/50">Destination</p>
              <p className="font-serif text-2xl font-semibold leading-tight tracking-tight text-ink md:text-3xl">{project.title}</p>
              <p className="mt-1 font-handwriting text-lg leading-snug text-brass">{project.tagline}</p>
            </div>
            <div>
              <p className="font-typewriter text-[9px] uppercase tracking-[0.25em] text-sepia/50">Flight</p>
              <p className="font-typewriter text-sm text-ink">{flightCode(index)}</p>
            </div>
            <div>
              <p className="font-typewriter text-[9px] uppercase tracking-[0.25em] text-sepia/50">Year</p>
              <p className="font-typewriter text-sm text-ink">{project.year}</p>
            </div>
            <div>
              <p className="font-typewriter text-[9px] uppercase tracking-[0.25em] text-sepia/50">Route</p>
              <p className="font-typewriter text-sm text-ink">{project.kind}</p>
            </div>
            <div>
              <p className="font-typewriter text-[9px] uppercase tracking-[0.25em] text-sepia/50">Seat</p>
              <p className="font-typewriter text-sm text-ink">{project.stack[0]}</p>
            </div>
          </div>

          <p className="mt-5 line-clamp-3 max-w-2xl font-serif text-base leading-relaxed text-ink/75">{project.summary}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-sm bg-ink px-4 py-2 font-typewriter text-xs uppercase tracking-[0.15em] text-paper-light transition-colors hover:bg-sepia"
            >
              Board &rarr;
            </Link>
            {project.links?.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-sm border border-sepia/30 px-3 py-2 font-typewriter text-[11px] text-sepia transition-colors hover:border-brass/60 hover:text-brass"
              >
                {l.label} &#8599;
              </a>
            ))}
            {!project.links?.length && project.privateSource && (
              <span className="font-handwriting text-base text-sepia/60">private hangar — ask me about it</span>
            )}
          </div>
        </div>

        {/* Perforation */}
        <div aria-hidden className="relative hidden md:block">
          <div className="absolute inset-y-3 left-0 border-l-2 border-dashed border-sepia/30" />
          <div className="absolute -top-3 left-0 h-6 w-6 -translate-x-1/2 rounded-full bg-paper-dark" />
          <div className="absolute -bottom-3 left-0 h-6 w-6 -translate-x-1/2 rounded-full bg-paper-dark" />
          {/* Stub */}
          <div className="flex h-full flex-col justify-between p-6 pl-8">
            <div>
              <p className="font-typewriter text-[9px] uppercase tracking-[0.25em] text-sepia/50">Stub</p>
              <p className="mt-1 font-serif text-lg font-semibold leading-tight text-ink">{project.title}</p>
              <p className="mt-2 font-typewriter text-[11px] text-sepia/70">{flightCode(index)} &middot; {project.year}</p>
              <p className="font-typewriter text-[11px] text-sepia/70">{project.stack.slice(0, 2).join(" · ")}</p>
            </div>
            <div>
              <Barcode seed={index + 11} />
              <p className="mt-1 font-typewriter text-[9px] tracking-[0.3em] text-sepia/50">{project.slug.toUpperCase().slice(0, 14)}</p>
            </div>
          </div>
        </div>
        {/* Mobile stub */}
        <div className="border-t border-dashed border-sepia/30 p-5 md:hidden">
          <Barcode seed={index + 11} />
        </div>
      </div>
    </motion.div>
  )
}

export function ProjectsDepartures() {
  const [selected, setSelected] = useState<number>(0)
  const isMobile = useIsMobile()
  const project = projects[selected]
  // Fewer tiles on phones so the board never scrolls sideways.
  const destWidth = isMobile ? 20 : 34
  const remarksWidth = isMobile ? 8 : 12

  return (
    <div className="min-h-screen bg-paper-dark">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-30"
        style={{ backgroundImage: "url('/textures/paper-texture.webp')", backgroundSize: "300px" }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-20 pt-10 md:px-8 md:pt-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <Link href="/" className="font-typewriter text-[10px] uppercase tracking-[0.25em] text-sepia/55 transition-colors hover:text-sepia/90">
              &larr; Back to desk
            </Link>
            <h1 className="mt-4 font-typewriter text-2xl uppercase tracking-[0.25em] text-ink md:text-3xl">Departures</h1>
            <p className="mt-1 font-handwriting text-xl text-sepia/80">every project is a trip somewhere. pick a row for the boarding pass.</p>
          </div>
          <span className="hidden font-typewriter text-[10px] uppercase tracking-[0.3em] text-sepia/45 md:block">Terminal F &middot; Field Notes</span>
        </div>

        {/* The board */}
        <motion.div
          className="relative overflow-hidden rounded-md p-3 md:p-5"
          style={{
            background: "linear-gradient(180deg, #2a2119 0%, #1d1711 100%)",
            boxShadow: "inset 0 0 0 3px #6b5230, inset 0 0 0 5px #2a2119, 0 18px 40px rgba(44,36,22,0.35)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {/* Header strip */}
          <div className="flex items-center justify-between border-b border-[#6b5230]/60 px-2 pb-3 pt-1">
            <span className="font-typewriter text-[11px] uppercase tracking-[0.35em] text-[#d4a84b]">Field departures</span>
            <span className="font-typewriter text-[10px] uppercase tracking-[0.25em] text-[#cdbf9f]/60">{projects.length} scheduled</span>
          </div>

          {/* Column heads */}
          <div className="grid grid-cols-[2.6rem_1fr_auto] items-center gap-3 px-2 pb-2 pt-4 font-typewriter text-[9px] uppercase tracking-[0.25em] text-[#cdbf9f]/55 md:grid-cols-[3.2rem_4.2rem_1fr_9.5rem_9rem] md:gap-4">
            <span>Time</span>
            <span className="hidden md:block">Flight</span>
            <span>Destination</span>
            <span className="hidden md:block">Gate</span>
            <span className="text-right md:text-left">Remarks</span>
          </div>

          <ul>
            {projects.map((p, i) => {
              const active = i === selected
              const base = 0.2 + i * 0.12
              const rem = remarks(p, isMobile)
              return (
                <li key={p.slug}>
                  <button
                    type="button"
                    onClick={() => setSelected(i)}
                    aria-pressed={active}
                    className={`grid w-full grid-cols-[2.6rem_1fr_auto] items-center gap-3 rounded-sm px-2 py-2 text-left text-[11px] transition-colors md:grid-cols-[3.2rem_4.2rem_1fr_9.5rem_9rem] md:gap-4 md:text-[13px] ${active ? "bg-[#d4a84b]/12" : "hover:bg-white/[0.04]"}`}
                  >
                    <FlapText text={p.year} width={4} delay={base} />
                    <span className="hidden md:block"><FlapText text={flightCode(i)} width={5} delay={base + 0.05} /></span>
                    <span className="flex items-center gap-2">
                      <span aria-hidden className={`h-0 w-0 border-y-[5px] border-l-[7px] border-y-transparent transition-colors ${active ? "border-l-[#d4a84b]" : "border-l-transparent"}`} />
                      <FlapText text={p.title.toUpperCase()} width={destWidth} delay={base + 0.08} />
                    </span>
                    <span className="hidden md:block"><FlapText text={gateLabel(p)} width={12} delay={base + 0.3} /></span>
                    <span className="justify-self-end md:justify-self-start">
                      <FlapText text={rem} width={remarksWidth} delay={base + 0.4} dim={rem === "DEPARTED"} align="left" />
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="mt-3 flex items-center justify-between border-t border-[#6b5230]/60 px-2 pt-3 font-typewriter text-[9px] uppercase tracking-[0.25em] text-[#cdbf9f]/45">
            <span>Now boarding &middot; has a live demo</span>
            <span>Private &middot; code not public</span>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {project && <BoardingPass key={project.slug} project={project} index={selected} />}
        </AnimatePresence>
      </div>
    </div>
  )
}
