"use client"

import { useEffect, useMemo } from "react"
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion"
import data from "@/lib/handwriting/tagline.json"

/**
 * The tagline, written by hand. Glyph outlines come from the Caveat font at
 * build time (scripts/build-handwriting.mjs); here each letter is traced as
 * a stroke and then filled, in order, while a fountain pen rides the
 * baseline. If the tagline in desk-data ever changes without regenerating
 * the outlines, this quietly falls back to plain text.
 */

const INK = "#5c4a32"
const START = 1.15 // s after mount, once the note has uncrumpled
const PER_GLYPH = 0.055
const GLYPH_DUR = 0.24

interface Glyph { d: string; x: number; adv: number; baseline: number }

export function HandwrittenTagline({ text, className = "" }: { text: string; className?: string }) {
  const reduced = useReducedMotion()
  const usable = data.text === text && !reduced

  const glyphs = useMemo<Glyph[]>(
    () => data.lines.flatMap((l) => l.glyphs.map((g) => ({ ...g, baseline: l.baseline }))),
    []
  )
  const total = START + (glyphs.length - 1) * PER_GLYPH + GLYPH_DUR

  const penX = useMotionValue(glyphs[0]?.x ?? 0)
  const penY = useMotionValue(glyphs[0]?.baseline ?? 0)
  const penOpacity = useMotionValue(0)

  useEffect(() => {
    if (!usable || glyphs.length === 0) return
    const xs = glyphs.map((g) => g.x + g.adv * 0.55)
    const ys = glyphs.map((g) => g.baseline - 1)
    const times = glyphs.map((_, i) => (START + i * PER_GLYPH + GLYPH_DUR * 0.5) / total)
    const cx = animate(penX, [xs[0], xs[0], ...xs.slice(1)], { duration: total, times: [0, START / total, ...times.slice(1)], ease: "linear" })
    const cy = animate(penY, [ys[0], ys[0], ...ys.slice(1)], { duration: total, times: [0, START / total, ...times.slice(1)], ease: "linear" })
    const co = animate(penOpacity, [0, 0, 1, 1, 0], { duration: total + 0.5, times: [0, (START - 0.25) / (total + 0.5), START / (total + 0.5), total / (total + 0.5), 1] })
    return () => { cx.stop(); cy.stop(); co.stop() }
  }, [usable, glyphs, total, penX, penY, penOpacity])

  if (!usable) return <p className={className}>{text}</p>

  return (
    <svg
      viewBox={`-2 -6 ${data.width + 4} ${data.height}`}
      className="block w-full h-auto"
      style={{ overflow: "visible" }}
      role="img"
      aria-label={text}
    >
      {glyphs.map((g, i) =>
        g.d ? (
          <path
            key={i}
            d={g.d}
            pathLength={1}
            className="hw-glyph"
            fill={INK}
            stroke={INK}
            strokeWidth={1.1}
            strokeLinejoin="round"
            strokeLinecap="round"
            style={{ ["--d" as string]: `${(START + i * PER_GLYPH).toFixed(3)}s`, ["--dur" as string]: `${GLYPH_DUR}s` }}
          />
        ) : null
      )}
      {/* The pen: nib at the origin, barrel rising to the upper right */}
      <motion.g style={{ x: penX, y: penY, opacity: penOpacity }} aria-hidden>
        <g transform="rotate(-38)" style={{ filter: "drop-shadow(1px 2px 1.5px rgba(30,20,8,0.35))" }}>
          <path d="M0 0 L9 -7 L9 7 Z" fill="#d4a84b" />
          <path d="M0 0 L9 -3 L9 3 Z" fill="#b8965c" />
          <rect x="9" y="-7" width="12" height="14" rx="2" fill="#2a2a2a" />
          <rect x="21" y="-8" width="56" height="16" rx="6" fill="#1c1c1c" />
          <rect x="21" y="-8" width="56" height="6" rx="3" fill="#ffffff" opacity="0.12" />
          <rect x="62" y="-9" width="6" height="18" rx="2" fill="#b8965c" />
          <rect x="68" y="-8" width="14" height="16" rx="6" fill="#1a1a1a" />
        </g>
      </motion.g>
    </svg>
  )
}
