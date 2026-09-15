"use client"

import { motion } from "framer-motion"

// Hand-drawn ink sketches, one per project, that draw themselves on.
// Strokes only, so they sit on any paper colour.

interface SketchProps {
  slug: string
  size?: number
  delay?: number
  color?: string
  className?: string
}

const draw = (delay: number, i: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { pathLength: { duration: 0.9, delay: delay + i * 0.18, ease: "easeInOut" as const }, opacity: { duration: 0.2, delay: delay + i * 0.18 } },
})

const PATHS: Record<string, string[]> = {
  caught: [
    "M18 38 Q17 32 23 32 L36 32 L41 24 L59 24 L64 32 L77 32 Q83 32 82 38 L82 74 Q82 80 76 80 L24 80 Q18 80 18 74 Z",
    "M50 56 m-15 0 a15 15 0 1 0 30 0 a15 15 0 1 0 -30 0",
    "M50 56 m-7 0 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0",
    "M70 40 l6 0",
    "M12 22 q10 -6 22 -3",
  ],
  "llm-inference-engine": [
    "M30 30 L70 30 L70 70 L30 70 Z",
    "M40 40 L60 40 L60 60 L40 60 Z",
    "M37 30 L37 20 M50 30 L50 20 M63 30 L63 20 M37 70 L37 80 M50 70 L50 80 M63 70 L63 80",
    "M30 37 L20 37 M30 50 L20 50 M30 63 L20 63 M70 37 L80 37 M70 50 L80 50 M70 63 L80 63",
    "M44 50 L56 50 M50 44 L50 56",
  ],
  "kuhn-poker-cfr": [
    "M34 18 L66 18 Q70 18 70 22 L70 78 Q70 82 66 82 L34 82 Q30 82 30 78 L30 22 Q30 18 34 18 Z",
    "M36 24 L36 34 M36 24 L42 24",
    "M50 62 C42 56 38 50 42 44 C45 40 50 43 50 47 C50 43 55 40 58 44 C62 50 58 56 50 62 Z",
    "M64 76 L64 66 M64 76 L58 76",
  ],
  "dental-ai-receptionist": [
    "M22 34 C20 24 30 20 36 26 L42 36 C40 40 36 42 34 46 C40 56 48 64 58 70 C62 66 66 64 70 62 L80 70 C86 76 80 86 72 84 C46 78 24 58 22 34 Z",
    "M60 24 q10 4 12 14",
    "M64 16 q16 6 18 22",
    "M56 32 q5 2 6 7",
  ],
  skimify: [
    "M26 14 L74 14 L74 86 L26 86 Z",
    "M34 28 L66 28 M34 38 L66 38 M34 48 L58 48 M34 58 L66 58 M34 68 L52 68",
    "M31 46 L62 46",
    "M60 12 l8 -4 M62 20 l10 0",
  ],
  "chagas-disease-detection": [
    "M50 80 C30 66 16 54 18 40 C20 28 34 24 42 32 C46 36 48 38 50 42 C52 38 54 36 58 32 C66 24 80 28 82 40 C84 54 70 66 50 80 Z",
    "M22 52 L36 52 L40 44 L45 62 L50 40 L55 58 L60 52 L78 52",
  ],
  "this-journal": [
    "M30 16 L70 16 L70 84 L30 84 Z",
    "M62 16 L62 84",
    "M30 24 L26 24 M30 40 L26 40 M30 56 L26 56 M30 72 L26 72",
    "M36 30 L54 30 M36 38 L50 38",
    "M46 62 m-5 0 a5 5 0 1 0 10 0 a5 5 0 1 0 -10 0",
  ],
}

export function Sketch({ slug, size = 96, delay = 0.3, color = "#5c4a32", className = "" }: SketchProps) {
  const paths = PATHS[slug] ?? PATHS["this-journal"]
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths.map((d, i) => (
        <motion.path key={i} d={d} {...draw(delay, i)} />
      ))}
    </svg>
  )
}

export function hasSketch(slug: string) {
  return slug in PATHS
}
