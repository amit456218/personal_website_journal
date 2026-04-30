"use client"

import { motion, useMotionValue, animate } from "framer-motion"
import { useCallback, useEffect, useRef } from "react"

const PATH1 =
  "M 75,118 C 120,90 165,145 220,112 C 275,79 330,136 390,105 C 440,84 475,118 510,100"
const PATH2 =
  "M 75,196 C 125,168 170,220 230,190 C 290,160 345,212 405,182 C 450,162 475,196 510,178"
const PATH3 =
  "M 75,272 C 130,246 175,294 240,264 C 305,234 360,284 420,254 C 465,234 490,272 510,260"

export function FountainPen() {
  const path1Ref = useRef<SVGPathElement>(null)
  const path2Ref = useRef<SVGPathElement>(null)
  const path3Ref = useRef<SVGPathElement>(null)
  const penRef = useRef<SVGGElement>(null)

  const line1 = useMotionValue(0)
  const line2 = useMotionValue(0)
  const line3 = useMotionValue(0)
  const penOpacity = useMotionValue(0)
  const inkOpacity = useMotionValue(1)

  const movePen = useCallback((p: number, pathEl: SVGPathElement | null) => {
    if (!pathEl || !penRef.current) return
    const total = pathEl.getTotalLength()
    const pt = pathEl.getPointAtLength(Math.max(0, Math.min(p, 1)) * total)
    penRef.current.setAttribute("transform", `translate(${pt.x},${pt.y}) rotate(45) scale(2.4)`)
  }, [])

  useEffect(() => {
    const u1 = line1.on("change", (p) => movePen(p, path1Ref.current))
    const u2 = line2.on("change", (p) => movePen(p, path2Ref.current))
    const u3 = line3.on("change", (p) => movePen(p, path3Ref.current))
    return () => { u1(); u2(); u3() }
  }, [movePen, line1, line2, line3])

  useEffect(() => {
    let cancelled = false

    const run = async () => {
      while (!cancelled) {
        line1.set(0); line2.set(0); line3.set(0)
        inkOpacity.set(1)
        movePen(0, path1Ref.current)

        await animate(penOpacity, 1, { duration: 0.18 })
        if (cancelled) break
        await animate(line1, 1, { duration: 2.6, ease: [0.25, 0.05, 0.4, 1] })
        if (cancelled) break

        await animate(penOpacity, 0, { duration: 0.12 })
        movePen(0, path2Ref.current)
        await animate(penOpacity, 1, { duration: 0.12 })
        if (cancelled) break
        await animate(line2, 1, { duration: 2.6, ease: [0.25, 0.05, 0.4, 1] })
        if (cancelled) break

        await animate(penOpacity, 0, { duration: 0.12 })
        movePen(0, path3Ref.current)
        await animate(penOpacity, 1, { duration: 0.12 })
        if (cancelled) break
        await animate(line3, 1, { duration: 2.6, ease: [0.25, 0.05, 0.4, 1] })
        if (cancelled) break

        await animate(penOpacity, 0, { duration: 0.3 })
        await animate(inkOpacity, 0, { duration: 1.4, ease: "easeOut" })
        if (cancelled) break

        await new Promise<void>((res) => setTimeout(res, 500))
      }
    }

    run()
    return () => { cancelled = true }
  }, [movePen, line1, line2, line3, penOpacity, inkOpacity])

  return (
    <motion.div
      className="relative pointer-events-none"
      style={{ width: 200, height: 148 }}
      initial={{ opacity: 0, rotate: -10 }}
      animate={{ opacity: 1, rotate: -10 }}
      transition={{ duration: 0.7, delay: 0.6 }}
    >
      <svg viewBox="0 0 720 380" width="100%" height="100%" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="inkG" gradientUnits="userSpaceOnUse" x1="75" y1="0" x2="635" y2="0">
            <stop offset="0%" stopColor="#0b1520" />
            <stop offset="50%" stopColor="#1a2f48" />
            <stop offset="100%" stopColor="#0b1520" />
          </linearGradient>
          <radialGradient id="glowG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6baed6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0b1520" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="capSheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" />
            <stop offset="40%" stopColor="transparent" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>
          <linearGradient id="barrelSheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" />
            <stop offset="35%" stopColor="transparent" />
            <stop offset="100%" stopColor="black" />
          </linearGradient>
          <linearGradient id="nibSheen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="penShadow" x="-10%" y="-40%" width="120%" height="180%">
            <feDropShadow dx="1" dy="2" stdDeviation="2.5" floodColor="#08111e" floodOpacity="0.45" />
          </filter>
          <filter id="inkBloom" x="-4%" y="-80%" width="108%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <path ref={path1Ref} d={PATH1} fill="none" stroke="none" style={{ visibility: "hidden" }} />
        <path ref={path2Ref} d={PATH2} fill="none" stroke="none" style={{ visibility: "hidden" }} />
        <path ref={path3Ref} d={PATH3} fill="none" stroke="none" style={{ visibility: "hidden" }} />

        <motion.g style={{ opacity: inkOpacity }}>
          {([
            [PATH1, line1],
            [PATH2, line2],
            [PATH3, line3],
          ] as const).map(([d, mv], i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke="url(#inkG)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#inkBloom)"
              style={{ pathLength: mv }}
            />
          ))}
        </motion.g>

        <motion.g style={{ opacity: penOpacity }}>
          <g ref={penRef} filter="url(#penShadow)">
            <g transform="translate(0, -12)">
              <rect x="118" y="4" width="2" height="14" rx="1" fill="#8a7040" opacity="0.9" />
              <rect x="110" y="3" width="46" height="18" rx="9" fill="#1a1a1a" />
              <rect x="110" y="3" width="46" height="18" rx="9" fill="url(#capSheen)" opacity="0.4" />
              <rect x="108" y="5" width="6" height="14" rx="2" fill="#b8965c" />
              <rect x="109" y="6" width="4" height="12" rx="1.5" fill="#d4a84b" opacity="0.6" />
              <rect x="38" y="4" width="72" height="16" rx="5" fill="#1c1c1c" />
              <rect x="38" y="4" width="72" height="16" rx="5" fill="url(#barrelSheen)" opacity="0.35" />
              <rect x="24" y="5" width="16" height="14" rx="3" fill="#2a2a2a" />
              {[26, 29, 32, 35].map((x, j) => (
                <rect key={j} x={x} y="5" width="1.2" height="14" rx="0.5" fill="#444" opacity="0.5" />
              ))}
              <path d="M24 7 L8 10 L8 14 L24 17 Z" fill="#b8965c" />
              <path d="M24 7 L8 10 L8 14 L24 17 Z" fill="url(#nibSheen)" opacity="0.3" />
              <path d="M8 10 L0 12 L8 14 Z" fill="#d4a84b" />
              <line x1="4" y1="12" x2="20" y2="12" stroke="#8a7040" strokeWidth="0.6" opacity="0.8" />
              <rect x="152" y="5" width="6" height="14" rx="3" fill="#2a2a2a" />
            </g>
          </g>
        </motion.g>
      </svg>
    </motion.div>
  )
}
