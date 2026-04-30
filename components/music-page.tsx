"use client"

import { useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useSpotify } from "@/contexts/spotify"

function fmt(ms: number) {
  const s = Math.floor(ms / 1000)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`
}

function Controls({ isPlaying, onPrev, onPlayPause, onNext }: {
  isPlaying: boolean; onPrev: () => void; onPlayPause: () => void; onNext: () => void
}) {
  return (
    <div className="flex items-center justify-center gap-8 mt-6">
      <button onClick={onPrev} className="opacity-60 hover:opacity-100 transition-opacity">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#2c2416">
          <polygon points="19,5 9,12 19,19"/>
          <rect x="5" y="5" width="2.5" height="14" rx="1"/>
        </svg>
      </button>
      <button
        onClick={onPlayPause}
        className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        style={{
          background: "radial-gradient(circle at 35% 35%, #d4a84b 0%, #b8965c 55%, #8a6a30 100%)",
          boxShadow: "2px 3px 10px rgba(0,0,0,0.4), inset 1px 1px 3px rgba(255,255,255,0.2)"
        }}
      >
        {isPlaying ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <rect x="6" y="5" width="4" height="14" rx="1"/>
            <rect x="14" y="5" width="4" height="14" rx="1"/>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" style={{ marginLeft: 2 }}>
            <polygon points="5,3 19,12 5,21"/>
          </svg>
        )}
      </button>
      <button onClick={onNext} className="opacity-60 hover:opacity-100 transition-opacity">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#2c2416">
          <polygon points="5,5 15,12 5,19"/>
          <rect x="16.5" y="5" width="2.5" height="14" rx="1"/>
        </svg>
      </button>
    </div>
  )
}

function ProgressBar({ progress, duration, onSeek }: { progress: number; duration: number; onSeek: (ms: number) => void }) {
  const barRef = useRef<HTMLDivElement>(null)
  const pct = duration > 0 ? Math.min((progress / duration) * 100, 100) : 0
  return (
    <div className="mt-5 px-1">
      <div ref={barRef} onClick={e => {
        if (!barRef.current) return
        const rect = barRef.current.getBoundingClientRect()
        onSeek(Math.floor(((e.clientX - rect.left) / rect.width) * duration))
      }} className="h-1.5 rounded-full cursor-pointer" style={{ background: "rgba(44,36,22,0.18)" }}>
        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#b8965c,#d4a84b)", transition: "width 0.3s linear" }}/>
      </div>
      <div className="flex justify-between mt-1">
        <span className="font-typewriter text-[9px] text-sepia/45">{fmt(progress)}</span>
        <span className="font-typewriter text-[9px] text-sepia/45">{fmt(duration)}</span>
      </div>
    </div>
  )
}

export function MusicPage() {
  const { isPlaying, currentTrack, tracks, progress, duration, toggle, next, prev, seek, playTrack } = useSpotify()

  return (
    <div className="h-screen flex flex-col overflow-hidden"
      style={{ background: "radial-gradient(ellipse at center, #e8d4a8 0%, #d4bc88 70%, #b89a66 100%)" }}>
      <div className="flex items-center justify-between px-8 py-3 border-b border-sepia/20 shrink-0">
        <Link href="/" className="font-typewriter text-[10px] text-sepia/55 hover:text-sepia/90 tracking-widest uppercase transition-colors">
          &larr; Desk
        </Link>
        <span className="font-serif text-xl text-sepia/80 italic">Current Listens</span>
        <div className="w-16"/>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Now Playing */}
        <div className="flex-1 flex flex-col items-center justify-center px-8 relative">
          <AnimatePresence mode="wait">
            <motion.div key={currentTrack?.id ?? "empty"} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }} className="w-full max-w-[280px]">
              <div className="mx-auto rounded-sm overflow-hidden"
                style={{ background: "#f5ede0", padding: "10px 10px 36px", width: 240, boxShadow: "4px 6px 20px rgba(0,0,0,0.3)" }}>
                <div className="w-full aspect-square overflow-hidden rounded-sm bg-sepia/10">
                  {currentTrack?.album_image
                    ? <Image src={currentTrack.album_image} alt="album" width={220} height={220} className="object-cover w-full h-full" unoptimized/>
                    : <div className="w-full h-full flex items-center justify-center"><span className="font-typewriter text-sepia/30 text-3xl">&#9835;</span></div>
                  }
                </div>
                <p className="font-handwriting text-sepia/50 text-sm text-center mt-2 leading-none">
                  {isPlaying ? "now playing" : currentTrack ? "paused" : "loading..."}
                </p>
              </div>

              <div className="text-center mt-5">
                <p className="font-serif text-[22px] text-sepia/90 leading-tight truncate">{currentTrack?.name ?? "—"}</p>
                <p className="font-typewriter text-[11px] text-sepia/50 mt-1 truncate">
                  {currentTrack?.artist ?? ""}
                </p>
              </div>

              <ProgressBar progress={progress} duration={Math.min(30000, duration)} onSeek={seek}/>
              <Controls isPlaying={isPlaying} onPrev={prev} onPlayPause={toggle} onNext={next}/>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Track list */}
        <div className="w-96 border-l border-sepia/20 flex flex-col overflow-hidden shrink-0">
          <div className="flex-1 overflow-y-auto pb-2 pt-3">
            {tracks.map((t, i) => (
              <button key={`${t.id}-${i}`} onClick={() => playTrack(i)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-sm text-left group transition-colors hover:bg-sepia/10"
                style={{ background: t.id === currentTrack?.id ? "rgba(184,150,92,0.18)" : "" }}>
                <span className="font-typewriter text-[12px] text-sepia/35 w-6 text-right shrink-0">
                  {t.id === currentTrack?.id ? "♪" : i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`font-typewriter text-[13px] truncate ${t.id === currentTrack?.id ? "text-sepia font-bold" : "text-sepia/65 group-hover:text-sepia/90"}`}>{t.name}</p>
                  <p className="font-typewriter text-[11px] text-sepia/38 truncate">{t.artist}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
