"use client"

import { useState, type FormEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"

/**
 * Write a postcard. The front is the picture side; click it to turn it over.
 * The back is the real form: a ruled message side, the address block, a
 * postage stamp. Posting it cancels the stamp with a postmark, then the card
 * flies off to the mailbox.
 */

type Stage = "front" | "back" | "sending" | "sent"

let audioCtx: AudioContext | null = null
function ctx() {
  if (typeof window === "undefined") return null
  try {
    if (!audioCtx) {
      const Ctx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!Ctx) return null
      audioCtx = new Ctx()
    }
    if (audioCtx.state === "suspended") audioCtx.resume()
    return audioCtx
  } catch {
    return null
  }
}

/** Rubber-stamp thunk. */
function thunk() {
  const c = ctx()
  if (!c) return
  const t = c.currentTime
  const o = c.createOscillator()
  const g = c.createGain()
  o.type = "sine"
  o.frequency.setValueAtTime(160, t)
  o.frequency.exponentialRampToValueAtTime(55, t + 0.12)
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(0.6, t + 0.006)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18)
  o.connect(g).connect(c.destination)
  o.start(t)
  o.stop(t + 0.2)
}

/** Paper leaving in a hurry. */
function whoosh() {
  const c = ctx()
  if (!c) return
  const t = c.currentTime
  const len = Math.floor(c.sampleRate * 0.7)
  const buf = c.createBuffer(1, len, c.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len)
  const src = c.createBufferSource()
  src.buffer = buf
  const f = c.createBiquadFilter()
  f.type = "bandpass"
  f.Q.value = 0.9
  f.frequency.setValueAtTime(300, t)
  f.frequency.exponentialRampToValueAtTime(3200, t + 0.25)
  f.frequency.exponentialRampToValueAtTime(600, t + 0.7)
  const g = c.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(0.35, t + 0.08)
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7)
  src.connect(f).connect(g).connect(c.destination)
  src.start(t)
  src.stop(t + 0.75)
}

function todayStamp() {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }).toUpperCase()
}

function Stamp() {
  return (
    <div
      className="relative h-[72px] w-[58px] shrink-0"
      style={{
        background: "radial-gradient(circle, transparent 2.2px, #f9f4e8 2.4px) -4px -4px / 8px 8px",
      }}
      aria-hidden
    >
      <div className="absolute inset-[5px] flex flex-col items-center justify-between border border-sepia/30 bg-[#dfe6dc] px-1 py-1.5">
        <span className="font-typewriter text-[6px] uppercase tracking-[0.2em] text-forest/80">First class</span>
        <svg viewBox="0 0 40 30" className="h-7 w-9" fill="none" stroke="#3d5c4a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 26 L14 12 L20 20 L26 10 L36 26 Z" fill="#3d5c4a" fillOpacity="0.25" />
          <circle cx="30" cy="8" r="3" />
          <path d="M2 27 H38" />
        </svg>
        <span className="font-serif text-[9px] font-semibold text-forest">the desk</span>
      </div>
    </div>
  )
}

function Postmark({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none absolute -right-3 top-1 z-20"
          initial={{ opacity: 0, scale: 1.7, rotate: -28 }}
          animate={{ opacity: 0.82, scale: 1, rotate: -14 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 16 }}
          style={{ mixBlendMode: "multiply" }}
          aria-hidden
        >
          <svg width="150" height="90" viewBox="0 0 150 90" fill="none" stroke="#2c2416" strokeWidth="1.6">
            <circle cx="105" cy="45" r="36" />
            <circle cx="105" cy="45" r="31" strokeWidth="0.8" />
            <path id="pm-arc" d="M105 45 m-25 0 a25 25 0 1 1 50 0 a25 25 0 1 1 -50 0" fill="none" stroke="none" />
            <text fontFamily="var(--font-typewriter), monospace" fontSize="7.5" fill="#2c2416" stroke="none" letterSpacing="1.5">
              <textPath href="#pm-arc" startOffset="2%">POSTED · AMITABHGULATI.COM · THE DESK ·</textPath>
            </text>
            <text x="105" y="48" textAnchor="middle" fontFamily="var(--font-typewriter), monospace" fontSize="8" fill="#2c2416" stroke="none">
              {todayStamp()}
            </text>
            {[0, 1, 2, 3, 4].map((i) => (
              <path key={i} d={`M4 ${29 + i * 8} q 8 -4 16 0 t 16 0 t 16 0 t 16 0`} strokeWidth="1.4" />
            ))}
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Front({ onFlip, active }: { onFlip: () => void; active: boolean }) {
  return (
    <button
      type="button"
      onClick={onFlip}
      className="group absolute inset-0 overflow-hidden rounded-sm bg-paper-light text-left"
      // The two faces are coplanar in the 3D scene, so the one turned away must
      // also stop taking clicks or it steals them from the form.
      style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", pointerEvents: active ? "auto" : "none" }}
      tabIndex={active ? 0 : -1}
      aria-hidden={!active}
      aria-label="Turn the postcard over to write on it"
    >
      <div aria-hidden className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('/textures/paper-texture.webp')", backgroundSize: "260px", mixBlendMode: "multiply" }} />
      {/* Picture side: a linocut of somewhere worth writing from */}
      <svg viewBox="0 0 560 360" className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="pc-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e9d9b8" />
            <stop offset="100%" stopColor="#d9c8a4" />
          </linearGradient>
        </defs>
        <rect x="24" y="24" width="512" height="312" fill="url(#pc-sky)" />
        <circle cx="420" cy="110" r="38" fill="#c9a04a" opacity="0.85" />
        {[...Array(12)].map((_, i) => (
          <line key={i} x1={420 + Math.cos((i * Math.PI) / 6) * 48} y1={110 + Math.sin((i * Math.PI) / 6) * 48} x2={420 + Math.cos((i * Math.PI) / 6) * 60} y2={110 + Math.sin((i * Math.PI) / 6) * 60} stroke="#c9a04a" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
        ))}
        <path d="M24 250 L120 150 L180 210 L250 120 L330 220 L400 170 L470 240 L536 200 L536 336 L24 336 Z" fill="#3d5c4a" opacity="0.85" />
        <path d="M24 280 L90 230 L160 270 L230 220 L320 280 L410 240 L536 290 L536 336 L24 336 Z" fill="#2c3f33" opacity="0.9" />
        <path d="M60 336 C 200 300, 300 320, 536 296" stroke="#e8dcc8" strokeWidth="3" fill="none" strokeDasharray="10 8" opacity="0.7" />
        <rect x="24" y="24" width="512" height="312" fill="none" stroke="#f9f4e8" strokeWidth="10" />
        <rect x="29" y="29" width="502" height="302" fill="none" stroke="#5c4a32" strokeOpacity="0.35" strokeWidth="1" />
      </svg>
      <div className="absolute left-8 top-8">
        <p className="font-typewriter text-[11px] uppercase tracking-[0.35em] text-paper-light drop-shadow">Greetings from</p>
        <p className="font-handwriting text-4xl leading-none text-paper-light drop-shadow-md">the desk</p>
      </div>
      <p className="absolute bottom-6 right-8 font-handwriting text-lg text-paper-light/90 drop-shadow transition-transform group-hover:-translate-y-0.5">
        turn me over &#8635;
      </p>
    </button>
  )
}

export function PostcardContact() {
  const [stage, setStage] = useState<Stage>("front")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [hp, setHp] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [delivered, setDelivered] = useState<boolean | null>(null)
  const [card, setCard] = useState(0) // remount key for "write another"

  const flipped = stage !== "front"

  const post = async (e: FormEvent) => {
    e.preventDefault()
    if (stage === "sending") return
    setError(null)
    if (name.trim().length < 2) return setError("Sign it with your name.")
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) return setError("That return address doesn’t look right.")
    if (message.trim().length < 10) return setError("Write a little more than that.")
    setStage("sending")
    thunk()
    try {
      const r = await fetch("/api/postcard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, website: hp }),
      })
      const d = await r.json().catch(() => ({}))
      if (!r.ok || !d.ok) throw new Error(d.error || "The mailbox is jammed. Try again in a minute.")
      setDelivered(Boolean(d.delivered))
      setTimeout(() => { whoosh(); setStage("sent") }, 650)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.")
      setStage("back")
    }
  }

  const another = () => {
    setName(""); setEmail(""); setMessage(""); setHp("")
    setDelivered(null); setError(null)
    setCard((c) => c + 1)
    setStage("back")
  }

  return (
    <main className="min-h-screen bg-paper-dark px-4 py-10 md:py-16">
      <div aria-hidden className="pointer-events-none fixed inset-0 opacity-30" style={{ backgroundImage: "url('/textures/paper-texture.webp')", backgroundSize: "300px" }} />
      <div className="relative mx-auto max-w-3xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="font-typewriter text-[10px] uppercase tracking-[0.25em] text-sepia/55 transition-colors hover:text-sepia/90">&larr; Back to desk</Link>
          <span className="font-typewriter text-[10px] uppercase tracking-[0.3em] text-sepia/45">Post office</span>
        </div>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-ink md:text-4xl">Send me a postcard</h1>
        <p className="mt-1 font-handwriting text-xl text-sepia/75">a note about a project, a job, a song I should hear, anything. it lands in my inbox.</p>

        {/* The card, in a 3D scene */}
        <div className="relative mx-auto mt-10 w-full max-w-[560px]" style={{ perspective: 1600 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={card}
              className="relative aspect-[14/9] w-full"
              style={{ transformStyle: "preserve-3d" }}
              initial={{ opacity: 0, x: -80, rotate: -6, rotateY: 180 }}
              animate={
                stage === "sent"
                  ? { opacity: 0, x: 520, y: -420, rotate: 28, scale: 0.35, rotateY: 180, transition: { duration: 1.05, ease: [0.4, 0, 0.8, 0.2] } }
                  : { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1, rotateY: flipped ? 180 : 0, transition: { rotateY: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }, default: { duration: 0.5 } } }
              }
              exit={{ opacity: 0 }}
            >
              {/* Shadow */}
              {/* Shadow. Behind the card before the flip, in front of it after, so it must never take clicks. */}
              <div aria-hidden className="pointer-events-none absolute inset-0 translate-x-3 translate-y-4 rounded-sm bg-ink/20 blur-md" style={{ transform: "translateZ(-1px)" }} />

              <Front onFlip={() => setStage("back")} active={!flipped} />

              {/* Back */}
              <form
                onSubmit={post}
                className="absolute inset-0 grid grid-cols-[1.15fr_1fr] overflow-hidden rounded-sm bg-paper-light"
                style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", pointerEvents: flipped ? "auto" : "none" }}
                aria-label="Postcard"
                aria-hidden={!flipped}
              >
                <div aria-hidden className="pointer-events-none absolute inset-0 opacity-25" style={{ backgroundImage: "url('/textures/paper-texture.webp')", backgroundSize: "260px", mixBlendMode: "multiply" }} />
                <Postmark show={stage === "sending" || stage === "sent"} />

                {/* Message side */}
                <div className="relative p-5 md:p-6">
                  <p className="font-typewriter text-[9px] uppercase tracking-[0.3em] text-sepia/50">Post card</p>
                  <label htmlFor="pc-message" className="sr-only">Message</label>
                  <textarea
                    id="pc-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    maxLength={2000}
                    placeholder="Dear Amit,"
                    className="mt-2 h-[calc(100%-2.5rem)] w-full resize-none bg-transparent font-handwriting text-xl leading-[28px] text-ink placeholder:text-sepia/40 focus:outline-none"
                    style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 27px, rgba(61,86,117,0.22) 27px 28px)", backgroundPositionY: "6px" }}
                  />
                </div>

                {/* Divider */}
                <div aria-hidden className="absolute bottom-5 top-5 left-[53.5%] w-px bg-sepia/25" />

                {/* Address side */}
                <div className="relative flex flex-col p-5 pl-6 md:p-6 md:pl-8">
                  <div className="flex items-start justify-end">
                    <Stamp />
                  </div>
                  <div className="mt-3">
                    <p className="font-typewriter text-[9px] uppercase tracking-[0.3em] text-sepia/50">To</p>
                    <p className="font-serif text-lg leading-tight text-ink">Amitabh Gulati</p>
                    <p className="font-serif text-sm text-sepia/80">The Desk, amitabhgulati.com</p>
                  </div>
                  <div className="mt-auto space-y-2">
                    <div>
                      <label htmlFor="pc-name" className="font-typewriter text-[8px] uppercase tracking-[0.25em] text-sepia/50">From</label>
                      <input id="pc-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={80} autoComplete="name" className="w-full border-b border-sepia/35 bg-transparent font-handwriting text-lg text-ink placeholder:text-sepia/35 focus:border-brass focus:outline-none" placeholder="your name" />
                    </div>
                    <div>
                      <label htmlFor="pc-email" className="font-typewriter text-[8px] uppercase tracking-[0.25em] text-sepia/50">Return address</label>
                      <input id="pc-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={200} autoComplete="email" className="w-full border-b border-sepia/35 bg-transparent font-handwriting text-lg text-ink placeholder:text-sepia/35 focus:border-brass focus:outline-none" placeholder="you@somewhere.com" />
                    </div>
                    {/* Honeypot: hidden from people, irresistible to bots */}
                    <div className="absolute -left-[9999px] top-0" aria-hidden>
                      <label htmlFor="pc-website">Website</label>
                      <input id="pc-website" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} />
                    </div>
                    <button
                      type="submit"
                      disabled={stage === "sending"}
                      className="mt-1 w-full rounded-sm border-2 border-stamp-red/70 py-1.5 font-typewriter text-[11px] uppercase tracking-[0.3em] text-stamp-red transition-colors hover:bg-stamp-red hover:text-paper-light disabled:opacity-50"
                    >
                      {stage === "sending" ? "Posting…" : "Post it"}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mx-auto mt-6 max-w-[560px] min-h-[3rem] text-center" aria-live="polite">
          {error && stage !== "sent" && <p className="font-handwriting text-lg text-stamp-red">{error}</p>}
          {stage === "sent" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
              <p className="font-serif text-xl text-ink">Posted.</p>
              <p className="font-handwriting text-lg text-sepia/75">
                {delivered ? "it’s on its way to my inbox. I read every one." : "the mail isn’t hooked up on this copy of the site yet, so it went into the log instead."}
              </p>
              <button type="button" onClick={another} className="mt-3 font-typewriter text-[10px] uppercase tracking-[0.25em] text-sepia/60 underline decoration-sepia/30 underline-offset-4 hover:text-brass">
                write another
              </button>
            </motion.div>
          )}
          {stage === "front" && <p className="font-typewriter text-[10px] uppercase tracking-[0.25em] text-sepia/45">tap the card to turn it over</p>}
        </div>
      </div>
    </main>
  )
}
