"use client"

import { useEffect, useRef, useState } from "react"
import { animate, motion, useMotionValue } from "framer-motion"
import { useSpotify } from "@/contexts/spotify"
import { STATIONS, BAND, freqToFraction, fractionToFreq, nearestStation } from "@/lib/stations"

/**
 * The tuning dial. Drag the needle along the band: the hiss rises between
 * stations and dies as you land on one; let go and it snaps to the nearest
 * station and retunes. Station names above the band tune directly, and the
 * arrow keys step through them.
 */
export function RadioDial() {
  const { stationIndex, tune, isTuning, setStaticLevel } = useSpotify()
  const bandRef = useRef<HTMLDivElement>(null)
  const [liveFreq, setLiveFreq] = useState<number | null>(null)
  // Measured on demand rather than kept in state: ResizeObserver callbacks can
  // be deferred in background tabs, and the dial must work the moment it's touched.
  const bandWidth = () => bandRef.current?.getBoundingClientRect().width ?? 0
  const x = useMotionValue(0)
  const dragging = useRef(false)
  const moved = useRef(false)

  // Park the needle on the current station whenever it changes, and keep it
  // there when the band resizes.
  useEffect(() => {
    const park = (instant = false) => {
      if (dragging.current) return
      const target = freqToFraction(STATIONS[stationIndex].freq) * bandWidth()
      if (instant) x.set(target)
      else animate(x, target, { type: "spring", stiffness: 110, damping: 17 })
    }
    park()
    const onResize = () => park(true)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [stationIndex, x])

  const freqAtNeedle = () => {
    const w = bandWidth()
    return fractionToFreq(w ? x.get() / w : 0)
  }

  // Put the needle under the pointer and let the hiss follow how far it is from a station.
  const follow = (clientX: number) => {
    const band = bandRef.current
    if (!band) return
    const rect = band.getBoundingClientRect()
    if (!rect.width) return
    const px = Math.max(0, Math.min(rect.width, clientX - rect.left))
    x.set(px)
    const freq = fractionToFreq(px / rect.width)
    setLiveFreq(freq)
    const { distance } = nearestStation(freq)
    // Fully clear within ~0.4 MHz, full static past ~1.6 MHz.
    setStaticLevel(Math.max(0, Math.min(1, (distance - 0.4) / 1.2)))
  }

  // Settle on the nearest station from wherever the needle is.
  const settle = () => {
    const w = bandWidth()
    if (!w) return
    const { index } = nearestStation(freqAtNeedle())
    animate(x, freqToFraction(STATIONS[index].freq) * w, { type: "spring", stiffness: 160, damping: 20 })
    setLiveFreq(null)
    if (index !== stationIndex) tune(index)
    else setStaticLevel(0)
  }

  // Press anywhere on the band: the needle jumps to the finger and follows it.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return
    dragging.current = true
    moved.current = false
    follow(e.clientX)
    // Capture so the drag keeps tracking outside the band; some synthetic
    // pointers refuse capture, and that must not abort the press itself.
    try { e.currentTarget.setPointerCapture(e.pointerId) } catch {}
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    moved.current = true
    follow(e.clientX)
  }
  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return
    dragging.current = false
    try { e.currentTarget.releasePointerCapture(e.pointerId) } catch {}
    settle()
  }

  const station = STATIONS[stationIndex]
  const shownFreq = liveFreq ?? station.freq
  const ticks = Array.from({ length: (BAND.max - BAND.min) * 2 + 1 })

  return (
    <div className="w-full max-w-3xl mx-auto select-none" data-no-click-sound>
      {/* Station names */}
      <div className="relative h-6 mb-1">
        {STATIONS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            onClick={() => tune(i)}
            className={`absolute -translate-x-1/2 whitespace-nowrap font-typewriter text-[10px] uppercase tracking-[0.2em] transition-colors ${i === stationIndex ? "text-sepia" : "text-sepia/45 hover:text-sepia/85"}`}
            style={{ left: `${freqToFraction(s.freq) * 100}%` }}
            aria-pressed={i === stationIndex}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Band */}
      <div
        ref={bandRef}
        role="slider"
        tabIndex={0}
        aria-label="Tuning dial"
        aria-valuemin={BAND.min}
        aria-valuemax={BAND.max}
        aria-valuenow={Number(station.freq.toFixed(1))}
        aria-valuetext={`${station.freq.toFixed(1)} FM, ${station.name}`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") { e.preventDefault(); tune(Math.min(STATIONS.length - 1, stationIndex + 1)) }
          if (e.key === "ArrowLeft") { e.preventDefault(); tune(Math.max(0, stationIndex - 1)) }
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative h-16 rounded-[4px] overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-brass/60 cursor-ew-resize touch-none"
        style={{
          background: "linear-gradient(180deg, #faf0d8 0%, #e8d8b0 50%, #dcc8a0 100%)",
          border: "1px solid #a88840",
          boxShadow: "inset 0 2px 6px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.4)",
        }}
      >
        {/* Warm glow behind the tuned station */}
        <motion.div
          className="absolute top-0 bottom-0 w-24 -ml-12 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,190,80,0.45) 0%, rgba(255,190,80,0) 70%)" }}
          animate={{ left: `${freqToFraction(station.freq) * 100}%`, opacity: isTuning ? 0.2 : 1 }}
          transition={{ type: "spring", stiffness: 110, damping: 17 }}
        />
        {/* Numbers */}
        {[88, 92, 96, 100, 104, 108].map((f) => (
          <span
            key={f}
            className="absolute top-1.5 font-typewriter text-[10px] text-sepia/70 pointer-events-none"
            style={{
              left: `${freqToFraction(f) * 100}%`,
              // Keep the end labels inside the band instead of half-clipped.
              transform: f === BAND.min ? "translateX(5px)" : f === BAND.max ? "translateX(calc(-100% - 5px))" : "translateX(-50%)",
            }}
          >
            {f}
          </span>
        ))}
        {/* Ticks */}
        <div className="absolute inset-x-0 bottom-0 h-5 pointer-events-none">
          {ticks.map((_, i) => {
            const f = BAND.min + i * 0.5
            const major = f % 4 === 0
            const mid = f % 1 === 0
            return (
              <span
                key={i}
                className="absolute bottom-0 w-px bg-sepia/45"
                style={{ left: `${freqToFraction(f) * 100}%`, height: major ? 14 : mid ? 8 : 4 }}
              />
            )
          })}
        </div>
        {/* Station markers */}
        {STATIONS.map((s) => (
          <span
            key={s.id}
            className="absolute bottom-[18px] -translate-x-1/2 pointer-events-none"
            style={{ left: `${freqToFraction(s.freq) * 100}%`, width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderBottom: "7px solid #b8965c" }}
          />
        ))}
        {/* Needle */}
        <motion.div
          style={{ x }}
          className="absolute top-0 bottom-0 left-0 w-7 -ml-3.5 pointer-events-none"
          aria-hidden
        >
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 rounded bg-red-600" style={{ boxShadow: "0 0 6px rgba(200,50,50,0.55)" }} />
          <div className="absolute left-1/2 -translate-x-1/2 -top-0.5 w-3 h-3 rounded-full" style={{ background: "radial-gradient(circle at 35% 30%, #e06060 0%, #9a1f1f 70%)", boxShadow: "0 1px 3px rgba(0,0,0,0.4)" }} />
        </motion.div>
      </div>

      {/* Readout */}
      <div className="mt-3 flex items-baseline justify-between gap-4">
        <div className="flex items-baseline gap-3 min-w-0">
          <span className="font-typewriter text-xs text-sepia/60 tabular-nums">{shownFreq.toFixed(1)} FM</span>
          <span className="font-serif text-lg text-ink truncate">{liveFreq !== null ? "—" : station.name}</span>
        </div>
        <span className="font-handwriting text-base text-sepia/70 whitespace-nowrap">
          {isTuning ? "tuning…" : liveFreq !== null ? "between stations" : station.blurb}
        </span>
      </div>
    </div>
  )
}
