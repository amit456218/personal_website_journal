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
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const shouldPlayRef = useRef(false) // user intent: keep playing across track changes

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

    audio.addEventListener("timeupdate", onTime)
    audio.addEventListener("ended", onEnd)
    audio.addEventListener("play", onPlay)
    audio.addEventListener("pause", onPause)

    return () => {
      audio.pause()
      audio.removeEventListener("timeupdate", onTime)
      audio.removeEventListener("ended", onEnd)
      audio.removeEventListener("play", onPlay)
      audio.removeEventListener("pause", onPause)
    }
  }, [tracks.length])

  // When currentIndex changes, swap the audio source
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || tracks.length === 0) return
    const track = tracks[currentIndex]
    if (!track) return
    audio.src = track.preview_url
    setProgress(0)
    if (shouldPlayRef.current) {
      audio.play().catch(() => { shouldPlayRef.current = false; setIsPlaying(false) })
    }
  }, [currentIndex, tracks])

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
    setCurrentIndex(index)
    const audio = audioRef.current
    if (audio) {
      audio.src = tracks[index].preview_url
      audio.play().catch(() => setIsPlaying(false))
    }
  }, [tracks])

  const currentTrack = tracks[currentIndex] ?? null
  const duration = currentTrack?.duration_ms ?? 30000 // previews are ~30s

  return (
    <SpotifyContext.Provider value={{ isPlaying, currentTrack, tracks, progress, duration, toggle, next, prev, seek, playTrack }}>
      {children}
    </SpotifyContext.Provider>
  )
}

export function useSpotify() {
  return useContext(SpotifyContext)
}
