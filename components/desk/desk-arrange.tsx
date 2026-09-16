"use client"

import { createContext, useCallback, useContext, useMemo, useRef, useState, useSyncExternalStore } from "react"
import { animate, motion, useMotionValue, useMotionTemplate, useTransform } from "framer-motion"
import { useDesk3D } from "./desk-3d"

/**
 * Rearrangeable desk.
 *
 * Every object wrapped in <DeskItem> can be picked up and dragged anywhere on
 * the board. Positions persist in localStorage, so the desk stays the way a
 * visitor left it; "tidy up" springs everything back. A drag never counts as
 * a click, so the objects' links still work when tapped in place.
 */

const STORAGE_KEY = "desk-arrangement-v1"
type Saved = Record<string, { x: number; y: number; z: number }>

interface Registration {
  reset: () => void
}

interface ArrangeContextValue {
  constraintsRef: React.RefObject<HTMLDivElement | null>
  register: (id: string, r: Registration) => () => void
  load: (id: string) => Saved[string] | undefined
  persist: (id: string, pos: Saved[string]) => void
  nextZ: () => number
  markMoved: () => void
  dirty: boolean
  tidy: () => void
}

const noop = () => {}
const subscribeNoop = () => () => {}
const ArrangeContext = createContext<ArrangeContextValue>({
  constraintsRef: { current: null },
  register: () => noop,
  load: () => undefined,
  persist: noop,
  nextZ: () => 40,
  markMoved: noop,
  dirty: false,
  tidy: noop,
})

function readSaved(): Saved {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Saved) : {}
  } catch {
    return {}
  }
}

function writeSaved(saved: Saved) {
  try {
    if (Object.keys(saved).length === 0) localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
  } catch {
    // private mode etc. — the desk just won't remember.
  }
}

export function DeskArrangeProvider({ children }: { children: React.ReactNode }) {
  const constraintsRef = useRef<HTMLDivElement | null>(null)
  const items = useRef(new Map<string, Registration>())
  const zCounter = useRef(40) // above every static z-* class on the desk
  const [dirty, setDirty] = useState(false)

  const register = useCallback((id: string, r: Registration) => {
    items.current.set(id, r)
    return () => {
      items.current.delete(id)
    }
  }, [])

  const load = useCallback((id: string) => {
    const s = readSaved()[id]
    if (s && s.z > zCounter.current) zCounter.current = s.z
    return s
  }, [])

  const persist = useCallback((id: string, pos: Saved[string]) => {
    const saved = readSaved()
    saved[id] = pos
    writeSaved(saved)
  }, [])

  const nextZ = useCallback(() => ++zCounter.current, [])
  const markMoved = useCallback(() => setDirty(true), [])

  const tidy = useCallback(() => {
    items.current.forEach((r) => r.reset())
    writeSaved({})
    zCounter.current = 40
    setDirty(false)
  }, [])

  const value = useMemo(
    () => ({ constraintsRef, register, load, persist, nextZ, markMoved, dirty, tidy }),
    [register, load, persist, nextZ, markMoved, dirty, tidy]
  )

  return <ArrangeContext.Provider value={value}>{children}</ArrangeContext.Provider>
}

export function useDeskArrange() {
  return useContext(ArrangeContext)
}

interface DeskItemProps {
  id: string
  /** Positioning classes for the absolute wrapper (left/top/right/bottom). */
  className?: string
  style?: React.CSSProperties
  /** Resting stacking order; a drag lifts the item above everything. */
  z?: number
  /** How far the object sits above the cork, in px, in the 3D desk. */
  depth?: number
  scale?: number
  /** Entrance offset, matching the old per-item motion.div initial values. */
  from?: { x?: number; y?: number }
  delay?: number
  duration?: number
  children: React.ReactNode
}

export function DeskItem({ id, className = "", style, z = 15, depth = 6, scale = 1, from = {}, delay = 0, duration = 0.5, children }: DeskItemProps) {
  const ctx = useContext(ArrangeContext)
  const d3 = useDesk3D()
  // The contact shadow is computed from motion values, so it only renders on
  // the client: server markup for it would never match to the last decimal.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const zIndex = useMotionValue(z)
  const lift = useMotionValue(0)
  // Height above the cork: resting depth, plus stacking order, plus hover/drag lift.
  const height = useTransform([zIndex, lift], ([zi, l]) => depth + (Number(zi) - 10) * 0.6 + Number(l))
  // Contact shadow on the cork, thrown by a lamp up and to the right, moving with the tilt.
  const shadowX = useTransform([height, d3.rotY], ([h, ry]) => -Number(h) * 0.32 + Number(ry) * 0.9)
  const shadowY = useTransform([height, d3.rotX], ([h, rx]) => Number(h) * 0.42 - Number(rx) * 0.9)
  const shadowBlur = useTransform(height, (h) => 2 + h * 0.28)
  const shadowAlpha = useTransform(height, (h) => Math.min(0.42, 0.16 + h * 0.006))
  const shadowZ = useTransform(height, (h) => -h)
  const shadowFilter = useMotionTemplate`blur(${shadowBlur}px)`
  const shadowBg = useMotionTemplate`rgba(30, 20, 8, ${shadowAlpha})`
  const draggedRef = useRef(false)
  const restoredRef = useRef(false)

  // Restore a saved position synchronously on first client render via a ref
  // callback: no effect, no setState, and no flash at the default spot.
  const attach = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || restoredRef.current) return
      restoredRef.current = true
      const saved = ctx.load(id)
      if (saved) {
        x.set(saved.x)
        y.set(saved.y)
        zIndex.set(saved.z)
        ctx.markMoved()
      }
      ctx.register(id, {
        reset: () => {
          animate(x, 0, { type: "spring", stiffness: 260, damping: 26 })
          animate(y, 0, { type: "spring", stiffness: 260, damping: 26 })
          zIndex.set(z)
        },
      })
    },
    [ctx, id, x, y, zIndex, z]
  )

  return (
    <motion.div
      ref={attach}
      data-desk-item
      className={`absolute ${className}`}
      style={{ ...style, zIndex, z: d3.enabled ? height : 0, transformStyle: "preserve-3d" }}
      onHoverStart={() => { if (d3.enabled && !draggedRef.current) animate(lift, 14, { type: "spring", stiffness: 300, damping: 22 }) }}
      onHoverEnd={() => { if (!draggedRef.current) animate(lift, 0, { type: "spring", stiffness: 200, damping: 24 }) }}
    >
      {/* Contact shadow, laid on the cork under the object */}
      {d3.enabled && mounted && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-sm"
          style={{ x: shadowX, y: shadowY, z: shadowZ, scale, filter: shadowFilter, background: shadowBg }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration, delay: delay + 0.1 }}
        />
      )}
      {/* Entrance layer: the same choreography the items had before. */}
      <motion.div
        initial={{ opacity: 0, x: from.x ?? 0, y: from.y ?? 0 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration, delay }}
      >
        {/* Drag layer */}
        <motion.div
          drag
          dragConstraints={ctx.constraintsRef}
          dragElastic={0.06}
          dragMomentum
          dragTransition={{ power: 0.15, timeConstant: 180, bounceStiffness: 500, bounceDamping: 40 }}
          style={{ x, y, touchAction: "none" }}
          className="relative cursor-grab active:cursor-grabbing pointer-events-auto"
          whileDrag={{ scale: 1.04, rotate: 0.6 }}
          onDragStart={() => {
            draggedRef.current = true
            zIndex.set(ctx.nextZ())
            animate(lift, 26, { type: "spring", stiffness: 300, damping: 20 })
          }}
          onDragEnd={() => {
            // Let the momentum settle, then remember where it came to rest.
            setTimeout(() => {
              ctx.persist(id, { x: x.get(), y: y.get(), z: Number(zIndex.get()) })
              ctx.markMoved()
            }, 650)
            setTimeout(() => { draggedRef.current = false }, 0)
            animate(lift, 0, { type: "spring", stiffness: 200, damping: 24 })
          }}
          onClickCapture={(e) => {
            if (draggedRef.current) {
              e.preventDefault()
              e.stopPropagation()
              return
            }
            // Fly into the object before following its link (plain left clicks only).
            const a = (e.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null
            const href = a?.getAttribute("href")
            if (a && href && href.startsWith("/") && d3.enabled && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) {
              e.preventDefault()
              d3.flyTo(a.getBoundingClientRect(), href)
            }
          }}
        >
          <div style={scale !== 1 ? { transform: `scale(${scale})` } : undefined}>{children}</div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

/** The little note in the desk's bottom edge: a hint at first, "tidy up" once something moved. */
export function DeskArrangeControls() {
  const { dirty, tidy } = useContext(ArrangeContext)
  return (
    <div className="absolute left-1/2 bottom-[2.2%] z-[60] -translate-x-1/2 pointer-events-none">
      {dirty ? (
        <motion.button
          type="button"
          onClick={tidy}
          className="pointer-events-auto font-handwriting text-base text-sepia/80 hover:text-ink bg-paper-light/80 px-3 py-1 rounded-sm border border-sepia/20"
          style={{ boxShadow: "2px 2px 6px rgba(44,36,22,0.15)", rotate: -1.5 }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ rotate: 0, y: -2 }}
        >
          tidy up the desk &#8617;
        </motion.button>
      ) : (
        <motion.p
          className="font-handwriting text-sm text-sepia/70 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0, 0.9, 0.9, 0] }}
          transition={{ duration: 9, times: [0, 0.3, 0.4, 0.85, 1], delay: 1.5 }}
        >
          psst &mdash; everything here can be picked up and moved, and dragging the cork looks around
        </motion.p>
      )}
    </div>
  )
}
