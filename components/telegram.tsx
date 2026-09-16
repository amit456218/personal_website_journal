"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"
import type { Dispatch } from "@/lib/dispatches"

/** Types text on, one character at a time, once the telegram scrolls into view. */
export function Typewriter({ text, speed = 26, start = true, className = "" }: { text: string; speed?: number; start?: boolean; className?: string }) {
  const reduced = useReducedMotion()
  const [n, setN] = useState(reduced ? text.length : 0)
  const done = n >= text.length

  useEffect(() => {
    if (!start || reduced) return
    if (n >= text.length) return
    const id = setInterval(() => setN((c) => Math.min(text.length, c + 1)), speed)
    return () => clearInterval(id)
  }, [start, reduced, n, text.length, speed])

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden>{text.slice(0, n)}</span>
      {!done && start && <span aria-hidden className="inline-block w-[0.6em] h-[1em] align-[-0.15em] bg-ink/70 animate-pulse ml-0.5" />}
    </span>
  )
}

function formatAt(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }).toUpperCase()
}

const KIND_LABEL: Record<string, string> = {
  push: "PUSH",
  create: "NEW",
  public: "OPEN",
  release: "RELEASE",
  pull: "PULL",
  issue: "ISSUE",
  star: "STAR",
  fork: "FORK",
}

export function Telegram({ d, index }: { d: Dispatch; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const rotate = [-0.8, 0.6, -0.4, 0.9, -0.6][index % 5]
  return (
    <motion.article
      ref={ref}
      className="relative mx-auto w-full max-w-2xl"
      initial={{ opacity: 0, y: 18, rotate: rotate + 1 }}
      animate={inView ? { opacity: 1, y: 0, rotate } : {}}
      transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Perforated edges */}
      <div aria-hidden className="absolute -top-1 left-2 right-2 h-2" style={{ background: "radial-gradient(circle, transparent 2.5px, #e8dcc8 2.7px) -5px 0 / 10px 10px" }} />
      <div className="relative overflow-hidden" style={{ background: "#efe4c2", boxShadow: "4px 6px 18px rgba(44,36,22,0.22)" }}>
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-25" style={{ backgroundImage: "url('/textures/paper-texture.webp')", backgroundSize: "260px", mixBlendMode: "multiply" }} />
        {/* Header band */}
        <div className="relative flex items-center justify-between border-b-2 border-ink/70 px-5 py-2.5">
          <div className="flex items-baseline gap-3">
            <span className="font-serif text-lg font-bold tracking-[0.12em] text-ink">DESK TELEGRAPH CO.</span>
            <span className="hidden font-typewriter text-[9px] tracking-[0.3em] text-ink/60 sm:inline">WIRE SERVICE</span>
          </div>
          <span className="rounded-sm border border-brass/60 px-1.5 py-0.5 font-typewriter text-[9px] tracking-[0.2em] text-brass">
            {KIND_LABEL[d.kind] ?? d.kind.toUpperCase()}
          </span>
        </div>
        {/* Routing */}
        <div className="relative grid grid-cols-2 gap-x-4 gap-y-1 border-b border-ink/25 px-5 py-2 font-typewriter text-[10px] uppercase tracking-[0.15em] text-ink/70 sm:grid-cols-4">
          <span>From: GitHub</span>
          <span>To: The desk</span>
          <span className="col-span-2 sm:col-span-2 sm:text-right">Recd {formatAt(d.at)}</span>
        </div>
        {/* Message */}
        <div className="relative px-5 py-5">
          <p className="font-typewriter text-[13px] leading-[1.9] tracking-[0.04em] text-ink sm:text-sm">
            <Typewriter text={d.text} start={inView} />
          </p>
        </div>
        {/* Footer */}
        <div className="relative flex items-center justify-between border-t border-ink/25 px-5 py-2">
          <a href={d.repoUrl} target="_blank" rel="noopener noreferrer" className="font-typewriter text-[10px] uppercase tracking-[0.15em] text-ink/60 hover:text-brass">
            {d.repo}
          </a>
          <a href={d.url} target="_blank" rel="noopener noreferrer" className="font-typewriter text-[10px] uppercase tracking-[0.15em] text-brass hover:text-ink">
            Reply via wire &#8599;
          </a>
        </div>
      </div>
      <div aria-hidden className="absolute -bottom-1 left-2 right-2 h-2" style={{ background: "radial-gradient(circle, transparent 2.5px, #e8dcc8 2.7px) -5px 0 / 10px 10px" }} />
    </motion.article>
  )
}
