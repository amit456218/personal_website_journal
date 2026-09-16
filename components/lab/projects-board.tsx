"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useCork, useFrame } from "@/contexts/cork"
import { useIsMobile } from "@/hooks/use-mobile"
import { projects, type Project } from "@/lib/projects-data"
import { seededRandom } from "@/lib/seeded-random"
import { Sketch } from "./project-sketches"

const EASE = [0.22, 1, 0.36, 1] as const
const W = 1200
const H = 780

// Where each exhibit hangs on the board (design pixels) and how it's tilted.
const LAYOUT: Record<string, { x: number; y: number; rot: number }> = {
  caught: { x: 70, y: 90, rot: -5 },
  "kuhn-poker-cfr": { x: 360, y: 60, rot: 3 },
  "llm-inference-engine": { x: 800, y: 70, rot: 2.5 },
  "this-journal": { x: 985, y: 285, rot: -7 },
  "dental-ai-receptionist": { x: 90, y: 480, rot: 3 },
  skimify: { x: 400, y: 505, rot: -2 },
  "chagas-disease-detection": { x: 850, y: 500, rot: 4 },
}
const CASE_CARD = { x: 440, y: 300 }

function Pin({ color = "#c0392b", shine = "#e74c3c", className = "" }: { color?: string; shine?: string; className?: string }) {
  return (
    <svg viewBox="0 0 18 28" width="18" height="28" className={className} style={{ filter: "drop-shadow(1px 3px 3px rgba(0,0,0,0.4))" }} aria-hidden>
      <circle cx="9" cy="8" r="7.5" fill={color} />
      <circle cx="6.5" cy="5.5" r="2.5" fill={shine} opacity="0.55" />
      <circle cx="9" cy="8" r="7.5" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="0.8" />
      <line x1="9" y1="15" x2="9" y2="27" stroke="#888" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function Grain({ opacity = 0.18 }: { opacity?: number }) {
  return <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: "url('/textures/paper-texture.webp')", backgroundSize: "180px", mixBlendMode: "multiply", opacity }} />
}

/* ---------- Exhibits: one physical object per project ---------- */

function PolaroidExhibit({ p }: { p: Project }) {
  return (
    <div className="w-[210px] bg-paper-light p-3 pb-10 shadow-[5px_7px_18px_rgba(44,36,22,0.32)]">
      <div className="relative flex aspect-square items-center justify-center overflow-hidden" style={{ background: "radial-gradient(circle at 50% 45%, #6a5f4a 0%, #3a3128 70%, #241f18 100%)" }}>
        <Sketch slug={p.slug} size={120} color="#e8dcc8" delay={0.6} />
        <div aria-hidden className="absolute inset-0" style={{ boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)" }} />
        <span className="absolute bottom-2 right-2 font-typewriter text-[8px] tracking-[0.2em] text-paper-light/50">{p.year}</span>
      </div>
      <p className="mt-3 text-center font-handwriting text-xl leading-tight text-ink">{p.title}</p>
      <p className="text-center font-handwriting text-sm text-sepia/70">it saw you pick up your phone</p>
    </div>
  )
}

function BlueprintExhibit({ p }: { p: Project }) {
  return (
    <div className="deckled-edge relative w-[300px] px-5 py-5 text-[#e8eef5] shadow-[5px_7px_18px_rgba(44,36,22,0.32)]" style={{ background: "#2b4a6f", backgroundImage: "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "14px 14px" }}>
      <div className="flex items-start justify-between">
        <div>
          <p className="font-typewriter text-[9px] uppercase tracking-[0.3em] text-[#e8eef5]/60">Sheet 02 &middot; {p.year}</p>
          <p className="mt-1 font-serif text-xl font-semibold leading-tight">{p.title}</p>
        </div>
        <Sketch slug={p.slug} size={64} color="#e8eef5" delay={0.7} />
      </div>
      <p className="mt-2 font-handwriting text-base leading-snug text-[#e8eef5]/85">{p.tagline}</p>
      <p className="mt-3 border-t border-white/20 pt-2 font-typewriter text-[9px] uppercase tracking-[0.2em] text-[#e8eef5]/60">{p.stack.join(" · ")}</p>
    </div>
  )
}

function CardsExhibit({ p }: { p: Project }) {
  const ranks = ["J", "Q", "K"]
  return (
    <div className="relative h-[190px] w-[230px]">
      {ranks.map((r, i) => (
        <div
          key={r}
          className="absolute left-0 top-2 h-[150px] w-[104px] rounded-md border border-sepia/25 bg-[#fbf6ea] shadow-[3px_4px_10px_rgba(44,36,22,0.25)]"
          style={{ transform: `translateX(${i * 44}px) rotate(${-14 + i * 12}deg)`, transformOrigin: "bottom center", zIndex: i }}
        >
          <span className="absolute left-2 top-1.5 font-serif text-lg font-semibold text-ink">{r}</span>
          <span className="absolute bottom-1.5 right-2 rotate-180 font-serif text-lg font-semibold text-ink">{r}</span>
          <span className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl ${i === 2 ? "text-stamp-red" : "text-ink"}`}>{i === 2 ? "♥" : "♠"}</span>
          {i === 2 && (
            <span className="absolute inset-x-2 bottom-9 text-center font-typewriter text-[8px] uppercase tracking-[0.15em] text-sepia/70">Nash &middot; &minus;1/18</span>
          )}
        </div>
      ))}
      <div className="absolute -bottom-1 left-2 z-10 w-[210px] bg-paper-light px-3 py-2 shadow-[2px_3px_8px_rgba(44,36,22,0.2)]" style={{ transform: "rotate(-2deg)" }}>
        <p className="font-serif text-base font-semibold leading-tight text-ink">{p.title}</p>
        <p className="font-handwriting text-sm leading-tight text-sepia/75">exploitability 1.23e-6 &middot; live dashboard &#8599;</p>
      </div>
    </div>
  )
}

function CheckBox({ on, label }: { on: boolean; label: string }) {
  return (
    <span className="flex items-center gap-1.5 font-typewriter text-[9px] uppercase tracking-[0.12em] text-ink/70">
      <span className="relative inline-block h-3 w-3 border border-ink/50">
        {on && <span className="absolute -top-1 left-0.5 font-handwriting text-sm leading-none text-stamp-blue">&#10003;</span>}
      </span>
      {label}
    </span>
  )
}

function MessageSlipExhibit({ p }: { p: Project }) {
  return (
    <div className="relative w-[250px] px-4 py-3 shadow-[5px_7px_18px_rgba(44,36,22,0.3)]" style={{ background: "#efd9cf" }}>
      <Grain opacity={0.12} />
      <div className="relative">
        <p className="text-center font-typewriter text-[11px] font-bold uppercase tracking-[0.25em] text-stamp-red/90">While you were out</p>
        <div className="mt-2 space-y-1 font-typewriter text-[10px] text-ink/80">
          <p><span className="text-ink/50">M</span> a patient, on the phone</p>
          <p><span className="text-ink/50">of</span> a dental clinic</p>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1">
          <CheckBox on label="Telephoned" />
          <CheckBox on label="Booked appt" />
          <CheckBox on label="Insurance ok" />
          <CheckBox on={false} label="Needs a human" />
        </div>
        <p className="mt-2 border-t border-ink/20 pt-1.5 font-handwriting text-[15px] leading-snug text-ink/85">{p.tagline}</p>
        <div className="mt-1.5 flex items-center justify-between font-typewriter text-[9px] text-ink/50">
          <span>taken by: the agent</span>
          <span>{p.year}</span>
        </div>
      </div>
    </div>
  )
}

function ClippingExhibit({ p }: { p: Project }) {
  const lines = (n: number, seed: number) => Array.from({ length: n }).map((_, i) => (
    <span key={i} className="block h-[3px] rounded-full bg-ink/25" style={{ width: `${Number((55 + seededRandom(seed, i) * 45).toFixed(1))}%` }} />
  ))
  return (
    <div className="deckled-edge relative w-[230px] px-4 py-4 shadow-[5px_7px_18px_rgba(44,36,22,0.3)]" style={{ background: "#efe8d6" }}>
      <Grain opacity={0.25} />
      <div className="relative">
        <p className="border-b border-ink/30 pb-1 font-typewriter text-[8px] uppercase tracking-[0.25em] text-ink/50">The Daily Skim &middot; {p.year}</p>
        <p className="mt-2 font-serif text-2xl font-bold leading-none tracking-tight text-ink">{p.title}</p>
        <p className="mt-1 font-serif text-[11px] italic leading-snug text-ink/75">{p.tagline}</p>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <div className="space-y-[5px]">{lines(9, 3)}</div>
          <div className="relative space-y-[5px]">
            {lines(9, 7)}
            <span aria-hidden className="absolute left-[-4px] right-[-2px] top-[18px] h-[10px] -rotate-1 bg-[#e9c84a]/55" />
          </div>
        </div>
      </div>
    </div>
  )
}

function SpecimenTagExhibit({ p }: { p: Project }) {
  return (
    <div className="relative w-[215px]">
      <svg aria-hidden viewBox="0 0 60 40" className="absolute -top-8 left-1/2 h-10 w-16 -translate-x-1/2 text-sepia/70" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M30 38 C18 30 10 20 14 8 M30 38 C42 30 50 20 46 8" />
      </svg>
      <div className="relative px-4 py-4 shadow-[5px_7px_18px_rgba(44,36,22,0.3)]" style={{ background: "#d9c59a", clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <Grain opacity={0.2} />
        <span aria-hidden className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full border-[3px] border-[#b9a273] bg-paper-dark" />
        <div className="relative mt-3">
          <p className="font-typewriter text-[8px] uppercase tracking-[0.3em] text-ink/55">Specimen 06 &middot; ECG/HRV</p>
          <p className="mt-1 font-serif text-lg font-semibold leading-tight text-ink">{p.title}</p>
          <svg viewBox="0 0 160 30" className="mt-2 h-7 w-full text-stamp-red" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <motion.path d="M0 18 L28 18 L34 8 L40 26 L46 4 L52 22 L58 18 L92 18 L98 10 L104 24 L110 6 L116 20 L122 18 L160 18" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, delay: 0.7, ease: "easeInOut" }} />
          </svg>
          <div className="mt-1 flex items-center justify-between font-typewriter text-[9px] text-ink/60">
            <span>F1 0.72 &middot; AUC 0.78</span>
            <span>{p.year}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function LuggageTagExhibit({ p }: { p: Project }) {
  return (
    <div className="relative w-[190px]">
      <div className="relative rounded-md px-4 py-3 shadow-[5px_7px_18px_rgba(44,36,22,0.3)]" style={{ background: "linear-gradient(145deg, #7a5a3a, #5c4a32)", clipPath: "polygon(12% 0, 100% 0, 100% 100%, 12% 100%, 0 50%)" }}>
        <span aria-hidden className="absolute left-2.5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-paper-dark ring-2 ring-[#b8965c]" />
        <div className="ml-3 rounded-sm bg-paper-light px-2.5 py-2">
          <p className="font-typewriter text-[8px] uppercase tracking-[0.25em] text-sepia/55">amitabhgulati.com</p>
          <p className="font-serif text-base font-semibold leading-tight text-ink">{p.title}</p>
          <p className="font-handwriting text-sm leading-tight text-sepia/75">you are here</p>
          <p className="mt-1 font-typewriter text-[8px] uppercase tracking-[0.15em] text-sepia/55">{p.stack.slice(0, 2).join(" · ")}</p>
        </div>
      </div>
    </div>
  )
}

function Exhibit({ p }: { p: Project }) {
  switch (p.slug) {
    case "caught": return <PolaroidExhibit p={p} />
    case "llm-inference-engine": return <BlueprintExhibit p={p} />
    case "kuhn-poker-cfr": return <CardsExhibit p={p} />
    case "dental-ai-receptionist": return <MessageSlipExhibit p={p} />
    case "skimify": return <ClippingExhibit p={p} />
    case "chagas-disease-detection": return <SpecimenTagExhibit p={p} />
    default: return <LuggageTagExhibit p={p} />
  }
}

const PIN_COLORS = [
  ["#c0392b", "#e74c3c"], ["#2980b9", "#3498db"], ["#c9a04a", "#d4b568"], ["#27ae60", "#2ecc71"], ["#c0392b", "#e74c3c"], ["#2980b9", "#3498db"], ["#c9a04a", "#d4b568"],
]

function CaseCard() {
  return (
    <div className="relative w-[300px] bg-paper-light px-5 py-4 shadow-[5px_7px_18px_rgba(44,36,22,0.3)]">
      <Grain opacity={0.15} />
      <div aria-hidden className="absolute inset-x-4 top-11 bottom-3" style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 21px, rgba(61,86,117,0.18) 21px 22px)" }} />
      <div className="relative">
        <p className="font-typewriter text-[10px] uppercase tracking-[0.3em] text-stamp-red/80">Case file &middot; field work</p>
        <p className="mt-1 font-serif text-2xl font-semibold leading-tight text-ink">Everything I&rsquo;ve built, pinned up</p>
        <p className="mt-2 font-handwriting text-lg leading-snug text-sepia/80">seven exhibits. follow the thread, tap one to open its file.</p>
      </div>
    </div>
  )
}

function ExhibitLink({ p, i, children, style, className = "" }: { p: Project; i: number; children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  const [c, s] = PIN_COLORS[i % PIN_COLORS.length]
  return (
    <Link href={`/projects/${p.slug}`} aria-label={`${p.title}: ${p.tagline}`} className={`group block ${className}`} style={style}>
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 14, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: EASE }}
        whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.25 } }}
      >
        <Pin color={c} shine={s} className="absolute left-1/2 top-[-14px] z-20 -translate-x-1/2" />
        {children}
      </motion.div>
    </Link>
  )
}

function DesktopBoard() {
  const cork = useCork()
  const frame = useFrame()
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / W)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Thread endpoints: from the case card's pin to each exhibit's pin.
  const origin = { x: CASE_CARD.x + 150, y: CASE_CARD.y - 4 }
  const targets = projects.map((p) => {
    const l = LAYOUT[p.slug] ?? { x: 100, y: 100, rot: 0 }
    return { slug: p.slug, x: l.x + 110, y: l.y - 4 }
  })

  return (
    <div ref={ref} className="w-full" style={{ height: H * scale }}>
      <div className="relative origin-top-left overflow-hidden rounded-md" style={{ width: W, height: H, transform: `scale(${scale})`, background: cork.bgColor }}>
        <div className="absolute inset-0" style={{ background: cork.base }} />
        <div className="absolute inset-0" style={{ backgroundImage: cork.speckle, backgroundSize: cork.speckleSize, opacity: 0.85 }} />
        <div className="pointer-events-none absolute inset-0 z-30" style={{ boxShadow: `inset 0 0 0 10px ${frame.dark}, inset 0 0 0 12px ${frame.light}, inset 0 0 35px rgba(${frame.glow}, 0.25)`, transition: "box-shadow 0.6s ease" }} />

        {/* Red thread */}
        <svg className="pointer-events-none absolute inset-0 z-10" viewBox={`0 0 ${W} ${H}`} aria-hidden>
          {targets.map((t, i) => {
            const mx = (origin.x + t.x) / 2
            const my = (origin.y + t.y) / 2 + 26
            return (
              <motion.path
                key={t.slug}
                d={`M${origin.x} ${origin.y} Q${mx} ${my} ${t.x} ${t.y}`}
                fill="none"
                stroke="#a83232"
                strokeWidth="1.6"
                strokeLinecap="round"
                style={{ filter: "drop-shadow(1px 2px 1px rgba(0,0,0,0.25))" }}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{ duration: 0.8, delay: 0.7 + i * 0.12, ease: "easeInOut" }}
              />
            )
          })}
        </svg>

        {/* Case card */}
        <motion.div className="absolute z-20" style={{ left: CASE_CARD.x, top: CASE_CARD.y, rotate: -1.5 }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }}>
          <Pin color="#c0392b" shine="#e74c3c" className="absolute left-1/2 top-[-14px] z-20 -translate-x-1/2" />
          <CaseCard />
        </motion.div>

        {/* Exhibits */}
        {projects.map((p, i) => {
          const l = LAYOUT[p.slug] ?? { x: 100, y: 100, rot: 0 }
          return (
            <ExhibitLink key={p.slug} p={p} i={i} className="absolute z-20" style={{ left: l.x, top: l.y, rotate: `${l.rot}deg` }}>
              <Exhibit p={p} />
            </ExhibitLink>
          )
        })}
      </div>
    </div>
  )
}

function MobileBoard() {
  const cork = useCork()
  return (
    <div className="relative rounded-md px-4 py-10" style={{ background: cork.bgColor }}>
      <div className="absolute inset-0 rounded-md" style={{ background: cork.base }} />
      <div className="absolute inset-0 rounded-md" style={{ backgroundImage: cork.speckle, backgroundSize: cork.speckleSize, opacity: 0.85 }} />
      <div className="relative flex flex-col items-center gap-12">
        <div className="relative"><Pin className="absolute left-1/2 top-[-14px] z-20 -translate-x-1/2" /><CaseCard /></div>
        {projects.map((p, i) => (
          <ExhibitLink key={p.slug} p={p} i={i} style={{ rotate: `${(LAYOUT[p.slug]?.rot ?? 0) / 2}deg` }}>
            <Exhibit p={p} />
          </ExhibitLink>
        ))}
      </div>
    </div>
  )
}

export function ProjectsBoard() {
  const isMobile = useIsMobile()
  return (
    <div className="min-h-screen bg-paper-dark">
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-30" style={{ backgroundImage: "url('/textures/paper-texture.webp')", backgroundSize: "300px" }} />
      <div className="relative z-10 mx-auto max-w-6xl px-3 pb-16 pt-8 md:px-6 md:pt-12">
        <div className="mb-6 flex items-end justify-between px-2">
          <div>
            <Link href="/" className="font-typewriter text-[10px] uppercase tracking-[0.25em] text-sepia/55 transition-colors hover:text-sepia/90">&larr; Back to desk</Link>
            <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-ink md:text-4xl">The evidence board</h1>
          </div>
          <span className="hidden font-typewriter text-[10px] uppercase tracking-[0.3em] text-sepia/45 md:block">{projects.length} exhibits</span>
        </div>
        {isMobile ? <MobileBoard /> : <DesktopBoard />}
      </div>
    </div>
  )
}
