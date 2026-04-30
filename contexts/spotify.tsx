"use client"

import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react"

export interface PreviewTrack {
  id: string
  uri: string
  name: string
  artist: string
  duration_ms: number
  preview_url: string
  album_image: string | null
}

interface SpotifyContextValue {
  isPlaying: boolean
  currentTrack: PreviewTrack | null
  tracks: PreviewTrack[]
  progress: number
  duration: number
  toggle: () => void
  next: () => void
  prev: () => void
  seek: (ms: number) => void
  playTrack: (index: number) => void
}

const SpotifyContext = createContext<SpotifyContextValue>({
  isPlaying: false,
  currentTrack: null,
  tracks: [],
  progress: 0,
  duration: 0,
  toggle: () => {},
  next: () => {},
  prev: () => {},
  seek: () => {},
  playTrack: () => {},
})

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function SpotifyProvider({ children }: { children: React.ReactNode }) {
  const [tracks, setTracks] = useState<PreviewTrack[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [audioDurationMs, setAudioDurationMs] = useState(30000)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const shouldPlayRef = useRef(false) // user intent: keep playing across track changes
  const audioCtxRef = useRef<AudioContext | null>(null)
  const initialMountRef = useRef(true)
  const playTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const TRANSITION_MS = 1400

  // Vinyl-crackle transition burst synthesized via Web Audio
  const playTransition = useCallback(async () => {
    if (typeof window === "undefined") return
    try {
      if (!audioCtxRef.current) {
        const Ctx = window.AudioContext || (window as any).webkitAudioContext
        if (!Ctx) return
        audioCtxRef.current = new Ctx()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === "suspended") {
        try { await ctx.resume() } catch {}
      }

      // Vinyl wind-down + wind-up: rich harmonic buffer played with
      // playbackRate sliding down then back up (classic turntable stop/start).
      const now = ctx.currentTime
      const duration = 1.4
      const sampleRate = ctx.sampleRate
      const bufLen = Math.floor(sampleRate * duration)
      const buffer = ctx.createBuffer(1, bufLen, sampleRate)
      const data = buffer.getChannelData(0)

      // Build a warm harmonic source (root + fifth + octave) plus light noise
      const root = 220 // A3
      const harmonics = [
        { mult: 1.0, level: 0.28 },
        { mult: 1.5, level: 0.18 }, // perfect fifth
        { mult: 2.0, level: 0.14 }, // octave
        { mult: 3.0, level: 0.07 },
      ]
      // Pink-ish noise state
      let pn0 = 0, pn1 = 0
      for (let i = 0; i < bufLen; i++) {
        const t = i / sampleRate
        let s = 0
        for (const h of harmonics) {
          s += Math.sin(2 * Math.PI * root * h.mult * t) * h.level
        }
        const w = Math.random() * 2 - 1
        pn0 = 0.97 * pn0 + 0.05 * w
        pn1 = 0.85 * pn1 + 0.2 * w
        s += (pn0 + pn1) * 0.08 // subtle vinyl noise floor
        data[i] = Math.max(-1, Math.min(1, s))
      }

      const src = ctx.createBufferSource()
      src.buffer = buffer

      // Pitch slide: 1.0 → 0.35 (slow down) → back up past 1.0 → settle at 1.0
      src.playbackRate.setValueAtTime(1.0, now)
      src.playbackRate.linearRampToValueAtTime(0.35, now + duration * 0.45) // wind down
      src.playbackRate.linearRampToValueAtTime(1.15, now + duration * 0.85) // wind up past
      src.playbackRate.linearRampToValueAtTime(1.0, now + duration)         // settle

      // Warmth filter
      const warm = ctx.createBiquadFilter()
      warm.type = "lowpass"
      warm.frequency.value = 3500
      warm.Q.value = 0.6

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.0001, now)
      gain.gain.exponentialRampToValueAtTime(0.9, now + 0.04)
      gain.gain.setValueAtTime(0.9, now + duration * 0.7)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

      src.connect(warm).connect(gain).connect(ctx.destination)
      src.start(now)
      src.stop(now + duration + 0.05)
    } catch {
      // ignore — audio context not available or blocked
    }
  }, [])

  // Load and shuffle the playlist once
  useEffect(() => {
    fetch("/api/spotify/preview-playlist")
      .then(r => r.json())
      .then(d => {
        const shuffled = shuffle((d.tracks ?? []) as PreviewTrack[])
        setTracks(shuffled)
      })
      .catch(() => {})
  }, [])

  // Initialize audio element
  useEffect(() => {
    if (typeof window === "undefined") return
    const audio = new Audio()
    audio.preload = "auto"
    audio.volume = 0.7
    audioRef.current = audio

    const onTime = () => setProgress(audio.currentTime * 1000)
    const onEnd = () => {
      shouldPlayRef.current = true
      setCurrentIndex(i => (i + 1) % Math.max(tracks.length, 1))
    }
    const onPlay = () => { shouldPlayRef.current = true; setIsPlaying(true) }
    const onPause = () => setIsPlaying(false)
    const onMeta = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setAudioDurationMs(audio.duration * 1000)
      }
    }

    audio.addEventListener("timeupdate", onTime)
    audio.addEventListener("ended", onEnd)
    audio.addEventListener("play", onPlay)
    audio.addEventListener("pause", onPause)
    audio.addEventListener("loadedmetadata", onMeta)
    audio.addEventListener("durationchange", onMeta)

    return () => {
      audio.pause()
      audio.removeEventListener("timeupdate", onTime)
      audio.removeEventListener("ended", onEnd)
      audio.removeEventListener("play", onPlay)
      audio.removeEventListener("pause", onPause)
      audio.removeEventListener("loadedmetadata", onMeta)
      audio.removeEventListener("durationchange", onMeta)
    }
  }, [tracks.length])

  // When currentIndex changes, swap the audio source
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || tracks.length === 0) return
    const track = tracks[currentIndex]
    if (!track) return

    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current)
      playTimeoutRef.current = null
    }

    const isInitial = initialMountRef.current
    if (isInitial) initialMountRef.current = false

    // Pause any current audio while the transition plays so they don't overlap
    audio.pause()
    audio.src = track.preview_url
    setProgress(0)
    setAudioDurationMs(30000) // reset until metadata loads

    const startPlayback = () => {
      if (shouldPlayRef.current) {
        audio.play().catch(() => { shouldPlayRef.current = false; setIsPlaying(false) })
      }
    }

    if (isInitial) {
      startPlayback()
    } else {
      playTransition()
      playTimeoutRef.current = setTimeout(() => {
        playTimeoutRef.current = null
        startPlayback()
      }, TRANSITION_MS)
    }

    return () => {
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current)
        playTimeoutRef.current = null
      }
    }
  }, [currentIndex, tracks, playTransition])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio || tracks.length === 0) return
    if (!audio.src) audio.src = tracks[currentIndex]?.preview_url ?? ""
    if (audio.paused) {
      shouldPlayRef.current = true
      audio.play().catch(() => { shouldPlayRef.current = false; setIsPlaying(false) })
    } else {
      shouldPlayRef.current = false
      audio.pause()
    }
  }, [tracks, currentIndex])

  const next = useCallback(() => {
    if (tracks.length === 0) return
    setCurrentIndex(i => (i + 1) % tracks.length)
  }, [tracks.length])

  const prev = useCallback(() => {
    if (tracks.length === 0) return
    setCurrentIndex(i => (i - 1 + tracks.length) % tracks.length)
  }, [tracks.length])

  const seek = useCallback((ms: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = ms / 1000
    setProgress(ms)
  }, [])

  const playTrack = useCallback((index: number) => {
    if (index < 0 || index >= tracks.length) return
    shouldPlayRef.current = true
    setCurrentIndex(index)
  }, [tracks.length])

  const currentTrack = tracks[currentIndex] ?? null
  // Previews are ~30s — use the actual loaded audio duration, not the full
  // Spotify track length, otherwise the seek bar maps to the wrong range.
  const duration = audioDurationMs

  return (
    <SpotifyContext.Provider value={{ isPlaying, currentTrack, tracks, progress, duration, toggle, next, prev, seek, playTrack }}>
      {children}
    </SpotifyContext.Provider>
  )
}

export function useSpotify() {
  return useContext(SpotifyContext)
}
