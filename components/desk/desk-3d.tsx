"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react"
import { animate, motion, useMotionValue, useReducedMotion, useSpring, type MotionValue } from "framer-motion"
import { useRouter } from "next/navigation"
import { useFrame } from "@/contexts/cork"

/**
 * The desk in three dimensions.
 *
 * The cork board is a shadow box with wooden sides that leans toward the
 * cursor. Every object hangs at its own height above the cork and casts a
 * contact shadow that moves with the tilt; hovering lifts one, dragging
 * raises it further. Drag empty cork to look around the board; it settles
 * back when you let go. Clicking an object flies the camera into it before
 * the page changes. Reduced motion turns all of this off.
 */

interface Desk3DContextValue {
  enabled: boolean
  rotX: MotionValue<number>
  rotY: MotionValue<number>
  flyTo: (rect: DOMRect, href: string) => void
}

const noopMv = { get: () => 0 } as unknown as MotionValue<number>
const Desk3DContext = createContext<Desk3DContextValue>({ enabled: false, rotX: noopMv, rotY: noopMv, flyTo: () => {} })

export function useDesk3D() {
  return useContext(Desk3DContext)
}

const MOUSE_X = 6.5 // max degrees from the cursor, around the X axis
const MOUSE_Y = 9
const ORBIT = 24 // max degrees added by dragging the cork
const FLY_SCALE = 2.6

export function Desk3DBoard({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const reduced = useReducedMotion()
  const enabled = !reduced
  const router = useRouter()

  const targetX = useMotionValue(0)
  const targetY = useMotionValue(0)
  const rotX = useSpring(targetX, { stiffness: 55, damping: 14, mass: 0.9 })
  const rotY = useSpring(targetY, { stiffness: 55, damping: 14, mass: 0.9 })
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const scale = useMotionValue(1)
  const veil = useMotionValue(0)

  const mouse = useRef({ x: 0, y: 0 })
  const orbit = useRef({ x: 0, y: 0 })
  const dragging = useRef<{ id: number; lastX: number; lastY: number } | null>(null)
  const flying = useRef(false)

  const applyTargets = useCallback(() => {
    if (flying.current) return
    targetX.set(mouse.current.x + orbit.current.x)
    targetY.set(mouse.current.y + orbit.current.y)
  }, [targetX, targetY])

  // Lean toward the cursor.
  useEffect(() => {
    if (!enabled) return
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      mouse.current = { x: -ny * 2 * MOUSE_X, y: nx * 2 * MOUSE_Y }
      applyTargets()
    }
    const onLeave = () => { mouse.current = { x: 0, y: 0 }; applyTargets() }
    window.addEventListener("pointermove", onMove)
    document.documentElement.addEventListener("mouseleave", onLeave)
    return () => {
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("mouseleave", onLeave)
    }
  }, [enabled, applyTargets])

  // Tablets without a mouse: lean with the device itself, where no permission prompt is needed.
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return
    const coarse = window.matchMedia?.("(pointer: coarse)").matches
    const DOE = window.DeviceOrientationEvent as (typeof DeviceOrientationEvent & { requestPermission?: unknown }) | undefined
    if (!coarse || !DOE || typeof DOE.requestPermission === "function") return
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return
      mouse.current = {
        x: Math.max(-MOUSE_X, Math.min(MOUSE_X, (45 - e.beta) / 5)),
        y: Math.max(-MOUSE_Y, Math.min(MOUSE_Y, e.gamma / 5)),
      }
      applyTargets()
    }
    window.addEventListener("deviceorientation", onTilt)
    return () => window.removeEventListener("deviceorientation", onTilt)
  }, [enabled, applyTargets])

  // Drag empty cork to look around; let go and it settles.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled) return
    const t = e.target as HTMLElement
    if (t.closest("a, button, [role='button'], input, textarea, [data-desk-item]")) return
    if (!t.closest("[data-desk-bg]")) return
    dragging.current = { id: e.pointerId, lastX: e.clientX, lastY: e.clientY }
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch {}
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = dragging.current
    if (!d || d.id !== e.pointerId) return
    const dx = e.clientX - d.lastX
    const dy = e.clientY - d.lastY
    d.lastX = e.clientX
    d.lastY = e.clientY
    orbit.current = {
      x: Math.max(-ORBIT, Math.min(ORBIT, orbit.current.x - dy * 0.18)),
      y: Math.max(-ORBIT, Math.min(ORBIT, orbit.current.y + dx * 0.18)),
    }
    applyTargets()
  }
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || dragging.current.id !== e.pointerId) return
    dragging.current = null
    try { e.currentTarget.releasePointerCapture(e.pointerId) } catch {}
    orbit.current = { x: 0, y: 0 }
    applyTargets()
  }

  // Fly the camera into an object, then go where it points.
  const flyTo = useCallback((rect: DOMRect, href: string) => {
    if (!enabled || flying.current) { router.push(href); return }
    flying.current = true
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (window.innerWidth / 2 - cx) * FLY_SCALE
    const dy = (window.innerHeight / 2 - cy) * FLY_SCALE
    const ease = [0.55, 0, 0.85, 0.25] as const
    targetX.set(0)
    targetY.set(0)
    animate(x, dx, { duration: 0.6, ease })
    animate(y, dy, { duration: 0.6, ease })
    animate(scale, FLY_SCALE, { duration: 0.6, ease })
    animate(veil, 1, { duration: 0.25, delay: 0.4 })
    setTimeout(() => router.push(href), 620)
  }, [enabled, router, targetX, targetY, x, y, scale, veil])

  const value = useMemo(() => ({ enabled, rotX, rotY, flyTo }), [enabled, rotX, rotY, flyTo])

  return (
    <Desk3DContext.Provider value={value}>
      <motion.div
        className={`absolute inset-0 ${className}`}
        style={{
          ...style,
          rotateX: enabled ? rotX : 0,
          rotateY: enabled ? rotY : 0,
          x,
          y,
          scale,
          transformStyle: "preserve-3d",
          cursor: enabled ? "grab" : undefined,
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        {children}
      </motion.div>
      {/* Veil that closes over the fly-in so the page swap isn't a jump cut */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 z-[90] bg-paper-dark" style={{ opacity: veil }} />
    </Desk3DContext.Provider>
  )
}

/** The wooden walls of the shadow box, standing up from the board's edges. */
export function FrameSides({ thickness = 28 }: { thickness?: number }) {
  const frame = useFrame()
  const common: React.CSSProperties = { position: "absolute", pointerEvents: "none", backfaceVisibility: "hidden" }
  const wood = (shade: string) => `linear-gradient(180deg, ${frame.light} 0%, ${frame.dark} 55%, ${shade} 100%)`
  return (
    <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }} data-desk-bg>
      <div style={{ ...common, left: 0, right: 0, top: 0, height: thickness, transformOrigin: "top", transform: "rotateX(90deg)", background: wood("#0e0905") }} />
      <div style={{ ...common, left: 0, right: 0, bottom: 0, height: thickness, transformOrigin: "bottom", transform: "rotateX(-90deg)", background: wood("#0e0905"), filter: "brightness(0.7)" }} />
      <div style={{ ...common, top: 0, bottom: 0, left: 0, width: thickness, transformOrigin: "left", transform: "rotateY(-90deg)", background: `linear-gradient(90deg, ${frame.light}, ${frame.dark})`, filter: "brightness(0.85)" }} />
      <div style={{ ...common, top: 0, bottom: 0, right: 0, width: thickness, transformOrigin: "right", transform: "rotateY(90deg)", background: `linear-gradient(270deg, ${frame.light}, ${frame.dark})`, filter: "brightness(0.85)" }} />
    </div>
  )
}
