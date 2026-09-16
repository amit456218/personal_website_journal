"use client"

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react"
import { AnimatePresence, motion } from "framer-motion"

/**
 * Desk lighting.
 *
 * The board's light follows the visitor's own sun: sunrise and sunset come
 * from Open-Meteo for their location (via /api/weather), and the phase of
 * day sets how much the room darkens and how warm the lamp pool is. A
 * pull-chain at the top right switches the lamp on or off by hand, and that
 * choice sticks. Overcast or rainy weather cools the daylight a little.
 *
 * ?light=day|dusk|night forces a phase, for previewing.
 */

type Phase = "day" | "dawn" | "dusk" | "night"

interface Weather {
  city: string | null
  tempC: number | null
  code: number
  description: string
  isDay: boolean
  cloudCover: number
  precipitation: number
  sunrise: string | null
  sunset: string | null
  localTime: string | null
}

const LAMP_KEY = "desk-lamp-v1" // "on" | "off" | absent = automatic

function minutesOf(iso: string | null): number | null {
  if (!iso) return null
  const m = /T(\d{2}):(\d{2})/.exec(iso)
  return m ? Number(m[1]) * 60 + Number(m[2]) : null
}

function phaseFrom(weather: Weather | null, now: Date): Phase {
  const cur = now.getHours() * 60 + now.getMinutes()
  // Open-Meteo gives local times for the visitor's zone, which is what the
  // browser clock is in as well, so minutes-of-day compare directly.
  const rise = minutesOf(weather?.sunrise ?? null) ?? 6 * 60 + 45
  const set = minutesOf(weather?.sunset ?? null) ?? 19 * 60 + 15
  const twilight = 40
  if (cur < rise - twilight || cur > set + twilight) return "night"
  if (cur < rise + twilight) return "dawn"
  if (cur > set - twilight) return "dusk"
  return "day"
}

const subscribeNoop = () => () => {}

export function useDeskLighting() {
  // The phase depends on the visitor's clock, so none of this renders on the
  // server: the layers mount after hydration and settle straight into place.
  const ready = useSyncExternalStore(subscribeNoop, () => true, () => false)
  const forcedRaw = ready ? new URLSearchParams(window.location.search).get("light") : null
  const forced = forcedRaw && ["day", "dawn", "dusk", "night"].includes(forcedRaw) ? (forcedRaw as Phase) : null
  const [weather, setWeather] = useState<Weather | null>(null)
  const [lamp, setLamp] = useState<"on" | "off" | null>(() => {
    try {
      const saved = localStorage.getItem(LAMP_KEY)
      return saved === "on" || saved === "off" ? saved : null
    } catch {
      return null
    }
  })
  const [tick, setTick] = useState(0)

  useEffect(() => {
    let cancelled = false
    fetch("/api/weather")
      .then((r) => (r.ok ? r.json() : null))
      .then((w) => { if (!cancelled && w && !w.error) setWeather(w as Weather) })
      .catch(() => {})
    // Re-evaluate the phase every minute so dusk actually arrives while you watch.
    const id = setInterval(() => setTick((t) => t + 1), 60_000)
    return () => { cancelled = true; clearInterval(id) }
  }, [])

  const phase: Phase = useMemo(() => {
    if (!ready) return "day"
    if (forced) return forced
    return phaseFrom(weather, new Date())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, forced, weather, tick])

  // Lamp: manual choice wins; otherwise it is on whenever the sun is not.
  const lampOn = lamp ? lamp === "on" : phase !== "day"

  const toggleLamp = useCallback(() => {
    setLamp((prev) => {
      const wasOn = prev ? prev === "on" : phase !== "day"
      const next = wasOn ? "off" : "on"
      try { localStorage.setItem(LAMP_KEY, next) } catch {}
      return next
    })
  }, [phase])

  const overcast = weather ? weather.cloudCover > 70 || weather.precipitation > 0 : false
  return { ready, phase, lampOn, toggleLamp, weather, overcast, manual: lamp !== null }
}

/* ---------- Visual layers ---------- */

const DARKNESS: Record<Phase, number> = { day: 0, dawn: 0.32, dusk: 0.42, night: 0.66 }

function DustMotes({ count = 16 }: { count?: number }) {
  // Deterministic positions so server and client agree.
  const motes = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const a = ((i * 137.508) % 360) / 360
        const b = ((i * 97.13) % 100) / 100
        return {
          left: 58 + a * 34, // % across the beam
          top: 4 + b * 44,
          size: 1.2 + ((i * 7) % 5) * 0.35,
          dur: 9 + (i % 6) * 2.3,
          delay: -((i * 1.7) % 9),
          drift: 8 + (i % 4) * 5,
        }
      }),
    [count]
  )
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      {motes.map((m, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-[#fff1c8]"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: m.size,
            height: m.size,
            opacity: 0,
            boxShadow: "0 0 3px 1px rgba(255, 236, 190, 0.35)",
            animation: `desk-mote ${m.dur}s ease-in-out ${m.delay}s infinite`,
            ["--drift" as string]: `${m.drift}px`,
          }}
        />
      ))}
    </div>
  )
}

interface DeskLightingProps {
  phase: Phase
  lampOn: boolean
  overcast: boolean
}

/** Sits above the objects (z 55) and below the frame vignette. */
export function DeskLighting({ phase, lampOn, overcast }: DeskLightingProps) {
  const darkness = DARKNESS[phase] + (overcast && phase === "day" ? 0.12 : 0)
  const lit = lampOn && darkness > 0
  return (
    <div className="absolute inset-0 pointer-events-none z-[55]" aria-hidden>
      {/* Cool, flat daylight when it's grey outside */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "#8fa2b8", mixBlendMode: "multiply" }}
        initial={false}
        animate={{ opacity: overcast && phase === "day" ? 0.22 : 0 }}
        transition={{ duration: 1.4 }}
      />
      {/* Room darkness, with the lamp pool cut out of it when the lamp is on */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: phase === "dusk" || phase === "dawn" ? "#3a2412" : "#120c06",
          mixBlendMode: "multiply",
          maskImage: lit
            ? "radial-gradient(ellipse 62% 78% at 80% 6%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 38%, rgba(0,0,0,0.85) 70%, #000 100%)"
            : undefined,
          WebkitMaskImage: lit
            ? "radial-gradient(ellipse 62% 78% at 80% 6%, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 38%, rgba(0,0,0,0.85) 70%, #000 100%)"
            : undefined,
        }}
        initial={false}
        animate={{ opacity: darkness }}
        transition={{ duration: 1.4 }}
      />
      {/* Warm pool from the lamp */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 48% 62% at 80% 4%, rgba(255, 214, 140, 0.55) 0%, rgba(255, 196, 110, 0.22) 40%, rgba(255, 180, 90, 0) 72%)",
          mixBlendMode: "soft-light",
        }}
        initial={false}
        animate={{ opacity: lit ? 1 : 0 }}
        transition={{ duration: 1.2 }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 52% at 80% 4%, rgba(255, 224, 160, 0.34) 0%, rgba(255, 210, 140, 0.1) 45%, rgba(255, 200, 120, 0) 70%)",
        }}
        initial={false}
        animate={{ opacity: lit ? 1 : 0 }}
        transition={{ duration: 1.2 }}
      />
      <AnimatePresence>
        {lit && (
          <motion.div key="motes" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>
            <DustMotes />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Dusk/dawn amber wash */}
      <motion.div
        className="absolute inset-0"
        style={{ background: "linear-gradient(200deg, rgba(255,150,70,0.35) 0%, rgba(120,60,90,0.25) 100%)", mixBlendMode: "overlay" }}
        initial={false}
        animate={{ opacity: phase === "dusk" || phase === "dawn" ? 1 : 0 }}
        transition={{ duration: 1.4 }}
      />
    </div>
  )
}

/** The lamp's pull chain, hanging from the top edge of the frame. */
export function PullChain({ lampOn, onPull, label }: { lampOn: boolean; onPull: () => void; label?: string }) {
  const [pulling, setPulling] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pull = () => {
    setPulling(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setPulling(false), 260)
    onPull()
  }
  return (
    <div className="absolute right-[3.2%] top-0 z-[62] flex flex-col items-center" style={{ width: 40 }}>
      <motion.button
        type="button"
        onClick={pull}
        aria-label={lampOn ? "Turn the desk lamp off" : "Turn the desk lamp on"}
        aria-pressed={lampOn}
        className="group flex flex-col items-center cursor-pointer"
        animate={{ y: pulling ? 16 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 22 }}
        whileHover={{ y: 4 }}
      >
        <svg width="14" height="58" viewBox="0 0 14 58" aria-hidden style={{ filter: "drop-shadow(1px 2px 2px rgba(0,0,0,0.35))" }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <circle key={i} cx="7" cy={4 + i * 5.2} r="2" fill={i % 2 ? "#c9a04a" : "#a8843a"} />
          ))}
          <ellipse cx="7" cy="52" rx="5" ry="6" fill="url(#chain-bead)" />
          <defs>
            <radialGradient id="chain-bead" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#8a5a34" />
              <stop offset="100%" stopColor="#3d2414" />
            </radialGradient>
          </defs>
        </svg>
        <span className="font-handwriting text-[11px] text-sepia/70 group-hover:text-sepia whitespace-nowrap -mt-1">
          {lampOn ? "lamp on" : "lamp off"}
        </span>
      </motion.button>
      {label && (
        <span className="font-typewriter text-[8px] uppercase tracking-[0.15em] text-sepia/50 whitespace-nowrap mt-1">
          {label}
        </span>
      )}
    </div>
  )
}

/** A line of handwriting that says what the sky is doing where the visitor is. */
export function WeatherNote({ weather }: { weather: Weather | null }) {
  if (!weather) return null
  const where = weather.city ? ` in ${weather.city}` : ""
  const temp = weather.tempC !== null ? `, ${weather.tempC}°` : ""
  return (
    <motion.p
      className="absolute left-[38%] top-[1.8%] z-[62] font-handwriting text-[13px] text-sepia/70 whitespace-nowrap pointer-events-none"
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      style={{ rotate: -1 }}
    >
      {weather.description}{where}{temp}
    </motion.p>
  )
}
