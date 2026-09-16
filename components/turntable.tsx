"use client"

import { useEffect, useRef } from "react"
import { useReducedMotion } from "framer-motion"
import { useSpotify } from "@/contexts/spotify"

/**
 * A turntable that listens.
 *
 * The record spins at 33⅓ when the music plays and coasts to a stop when it
 * pauses. Its grooves are drawn from the live spectrum, so they breathe with
 * the bass; the album art is the label. The tonearm tracks progress across
 * the record, and an ink waveform underneath traces the actual signal.
 */

const SIZE = 250 // CSS pixels
const RINGS = 44

export function Turntable() {
  const { isPlaying, currentTrack, progress, duration, getAnalyser } = useSpotify()
  const reduced = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const waveRef = useRef<HTMLCanvasElement>(null)
  const angleRef = useRef(0)
  const speedRef = useRef(0) // radians per frame
  const imgRef = useRef<HTMLImageElement | null>(null)
  const stateRef = useRef({ isPlaying, progress, duration })
  useEffect(() => {
    stateRef.current = { isPlaying, progress, duration }
  }, [isPlaying, progress, duration])

  // Album art for the label.
  useEffect(() => {
    imgRef.current = null
    const url = currentTrack?.album_image
    if (!url) return
    const img = new Image()
    img.onload = () => { imgRef.current = img }
    img.src = url
  }, [currentTrack?.album_image])

  useEffect(() => {
    const canvas = canvasRef.current
    const wave = waveRef.current
    if (!canvas || !wave) return
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = SIZE * dpr
    canvas.height = SIZE * dpr
    wave.width = SIZE * dpr
    wave.height = 36 * dpr
    const ctx = canvas.getContext("2d")!
    const wctx = wave.getContext("2d")!
    const freq = new Uint8Array(128)
    const time = new Uint8Array(256)
    let raf = 0

    const draw = () => {
      const { isPlaying: playing, progress: prog, duration: dur } = stateRef.current
      const analyser = getAnalyser()
      let level = 0
      if (analyser) {
        analyser.getByteFrequencyData(freq)
        analyser.getByteTimeDomainData(time)
        let sum = 0
        for (let i = 0; i < 12; i++) sum += freq[i]
        level = sum / (12 * 255)
      } else {
        freq.fill(0)
        time.fill(128)
      }

      // Platter speed: 33⅓ rpm, eased on, coasted off.
      const target = playing && !reduced ? (2 * Math.PI * 33.333) / 60 / 60 : 0
      speedRef.current += (target - speedRef.current) * (playing ? 0.08 : 0.03)
      angleRef.current += speedRef.current

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, SIZE, SIZE)
      const cx = SIZE / 2
      const cy = SIZE / 2
      const R = 114

      // Platter body
      const body = ctx.createRadialGradient(cx - 26, cy - 30, 8, cx, cy, R)
      body.addColorStop(0, "#4a3d35")
      body.addColorStop(0.3, "#2c2420")
      body.addColorStop(0.75, "#0f0d0b")
      body.addColorStop(1, "#1a1512")
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fillStyle = body
      ctx.fill()

      // Grooves that breathe with the spectrum
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(angleRef.current * 0.15) // grooves drift slowly so the sheen crawls
      for (let i = 0; i < RINGS; i++) {
        const t = i / RINGS
        const r = 44 + t * (R - 50)
        const bin = Math.min(freq.length - 1, Math.floor((1 - t) * 40) + 2) // bass at the edge
        const amp = freq[bin] / 255
        ctx.beginPath()
        ctx.arc(0, 0, r + Math.sin(i * 1.7) * 0.4, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 245, 225, ${0.035 + amp * 0.22})`
        ctx.lineWidth = 0.6 + amp * 1.6
        ctx.stroke()
      }
      ctx.restore()

      // Label with album art, rotating with the platter
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(angleRef.current)
      ctx.beginPath()
      ctx.arc(0, 0, 38, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
      const img = imgRef.current
      if (img) {
        ctx.drawImage(img, -38, -38, 76, 76)
      } else {
        const lab = ctx.createLinearGradient(-46, -46, 46, 46)
        lab.addColorStop(0, "#c9a86c")
        lab.addColorStop(1, "#a68c5b")
        ctx.fillStyle = lab
        ctx.fillRect(-38, -38, 76, 76)
      }
      ctx.restore()
      // Label rim + spindle
      ctx.beginPath()
      ctx.arc(cx, cy, 38, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(0,0,0,0.35)"
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(cx, cy, 3.2, 0, Math.PI * 2)
      ctx.fillStyle = "#d9cbb4"
      ctx.fill()

      // Sheen (fixed, the platter turns under it)
      const sheen = ctx.createLinearGradient(cx - R, cy - R, cx + R, cy + R)
      sheen.addColorStop(0.3, "rgba(255,255,255,0)")
      sheen.addColorStop(0.47, `rgba(255,255,255,${0.16 + level * 0.12})`)
      sheen.addColorStop(0.52, "rgba(255,255,255,0.05)")
      sheen.addColorStop(0.7, "rgba(255,255,255,0)")
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fillStyle = sheen
      ctx.fill()
      ctx.strokeStyle = "rgba(255,255,255,0.12)"
      ctx.lineWidth = 1
      ctx.stroke()

      // Tonearm: pivot top-right, sweeps from the outer groove to the label as the clip plays
      const frac = dur > 0 ? Math.min(1, prog / dur) : 0
      const rest = -0.62
      const start = -0.28
      const end = 0.02
      const targetA = playing || frac > 0 ? start + (end - start) * frac : rest
      const px = SIZE - 28
      const py = 26
      ctx.save()
      ctx.translate(px, py)
      ctx.rotate(targetA)
      ctx.shadowColor = "rgba(0,0,0,0.35)"
      ctx.shadowBlur = 6
      ctx.shadowOffsetX = 2
      ctx.shadowOffsetY = 3
      const arm = ctx.createLinearGradient(0, -3, 0, 3)
      arm.addColorStop(0, "#c8c8c8")
      arm.addColorStop(1, "#6a6a6a")
      ctx.fillStyle = arm
      ctx.fillRect(-4, -3, 124, 6) // arm along +x, rotated
      ctx.fillStyle = "#5a5a5a"
      ctx.fillRect(114, -5, 18, 10) // headshell
      ctx.restore()
      ctx.beginPath()
      ctx.arc(px, py, 9, 0, Math.PI * 2)
      const piv = ctx.createRadialGradient(px - 3, py - 3, 1, px, py, 9)
      piv.addColorStop(0, "#9a9a9a")
      piv.addColorStop(1, "#4a4a4a")
      ctx.fillStyle = piv
      ctx.fill()

      // Ink waveform
      wctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      wctx.clearRect(0, 0, SIZE, 36)
      wctx.beginPath()
      for (let i = 0; i < time.length; i++) {
        const x = (i / (time.length - 1)) * SIZE
        const y = 18 + ((time[i] - 128) / 128) * 15
        if (i === 0) wctx.moveTo(x, y)
        else wctx.lineTo(x, y)
      }
      wctx.strokeStyle = "rgba(44, 36, 22, 0.75)"
      wctx.lineWidth = 1.4
      wctx.lineJoin = "round"
      wctx.stroke()

      const idle = !playing && Math.abs(speedRef.current) < 0.0004
      if (!idle) raf = requestAnimationFrame(draw)
      else raf = 0
    }

    const kick = () => { if (!raf) raf = requestAnimationFrame(draw) }
    kick()
    // Re-kick whenever playback state changes (effect deps below).
    return () => { if (raf) cancelAnimationFrame(raf) }
  }, [getAnalyser, reduced, isPlaying, currentTrack?.id])

  return (
    <div className="flex flex-col items-center" aria-label={currentTrack ? `Turntable playing ${currentTrack.name}` : "Turntable"}>
      <div
        className="relative rounded-md p-3"
        style={{
          background: "linear-gradient(160deg, #e8dcc8 0%, #d3c2a6 100%)",
          boxShadow: "4px 6px 20px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-md opacity-30" style={{ backgroundImage: "url('/textures/paper-texture.webp')", backgroundSize: "220px", mixBlendMode: "multiply" }} />
        <canvas ref={canvasRef} style={{ width: SIZE, height: SIZE, display: "block" }} />
      </div>
      <canvas ref={waveRef} className="mt-2" style={{ width: SIZE, height: 36, display: "block" }} aria-hidden />
    </div>
  )
}
