"use client"

import { useEffect, useRef } from "react"

function playClick(ctx: AudioContext) {
  const t = ctx.currentTime

  // Body — soft mid-range tone with quick pitch drop, like a pen click
  const body = ctx.createOscillator()
  const bodyGain = ctx.createGain()
  body.type = "sine"
  body.frequency.setValueAtTime(700, t)
  body.frequency.exponentialRampToValueAtTime(280, t + 0.05)
  bodyGain.gain.setValueAtTime(0.0001, t)
  bodyGain.gain.exponentialRampToValueAtTime(0.45, t + 0.004)
  bodyGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09)
  body.connect(bodyGain).connect(ctx.destination)
  body.start(t); body.stop(t + 0.1)

  // Soft low thump for satisfaction
  const thump = ctx.createOscillator()
  const thumpGain = ctx.createGain()
  thump.type = "sine"
  thump.frequency.setValueAtTime(140, t)
  thump.frequency.exponentialRampToValueAtTime(70, t + 0.07)
  thumpGain.gain.setValueAtTime(0.0001, t)
  thumpGain.gain.exponentialRampToValueAtTime(0.3, t + 0.006)
  thumpGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1)
  thump.connect(thumpGain).connect(ctx.destination)
  thump.start(t); thump.stop(t + 0.12)
}

export function ClickSounds() {
  const ctxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target) return
      const interactive = target.closest("button, a, [role='button'], input, select, textarea, [data-clickable]")
      if (!interactive) return
      if (target.closest("[data-no-click-sound]")) return

      try {
        const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
        if (!ctxRef.current) ctxRef.current = new Ctx()
        const ctx = ctxRef.current
        if (ctx.state === "suspended") ctx.resume()
        playClick(ctx)
      } catch {}
    }

    document.addEventListener("click", handler)
    return () => document.removeEventListener("click", handler)
  }, [])

  return null
}
