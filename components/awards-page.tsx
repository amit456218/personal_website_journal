"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { awardsData } from "@/lib/awards-data"

// — A small gold seal medallion (SVG) for each award.
function Medallion({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <radialGradient id="seal-bg" cx="38%" cy="32%">
          <stop offset="0%" stopColor="#fbe9a8" />
          <stop offset="55%" stopColor="#d6a93f" />
          <stop offset="100%" stopColor="#8a661c" />
        </radialGradient>
        <radialGradient id="seal-rim" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#caa14a" />
          <stop offset="100%" stopColor="#6f5012" />
        </radialGradient>
      </defs>
      {/* Outer rim with engraved ticks */}
      <circle cx="32" cy="32" r="30" fill="url(#seal-rim)" />
      {Array.from({ length: 48 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 48
        const x1 = 32 + Math.cos(a) * 28
        const y1 = 32 + Math.sin(a) * 28
        const x2 = 32 + Math.cos(a) * 30
        const y2 = 32 + Math.sin(a) * 30
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#3d2a08"
            strokeOpacity="0.55"
            strokeWidth="0.6"
          />
        )
      })}
      <circle cx="32" cy="32" r="26" fill="url(#seal-bg)" stroke="#5b3f0d" strokeWidth="0.6" />
      <circle cx="32" cy="32" r="22" fill="none" stroke="#5b3f0d" strokeOpacity="0.4" strokeWidth="0.4" />
      {/* Laurel */}
      <g transform="translate(32 32)" fill="none" stroke="#3a2806" strokeWidth="1.2" strokeLinecap="round" opacity="0.7">
        <path d="M-13 -2 Q-15 4 -10 12" />
        <path d="M13 -2 Q15 4 10 12" />
      </g>
      {[-1, 1].flatMap((s) =>
        [-4, 0, 4, 8].map((dy, i) => (
          <ellipse
            key={`${s}-${i}`}
            cx={32 + s * (12 - i * 0.4)}
            cy={32 + dy}
            rx="2.1"
            ry="3.4"
            fill="#5a3f0a"
            transform={`rotate(${s * (-25 + i * 8)} ${32 + s * (12 - i * 0.4)} ${32 + dy})`}
            opacity="0.85"
          />
        ))
      )}
      {/* Star */}
      <path
        d="M32 19 L34 27 L42 27 L35 32 L37 40 L32 35 L27 40 L29 32 L22 27 L30 27 Z"
        fill="#fef3c8"
        stroke="#5b3f0d"
        strokeWidth="0.5"
      />
      {/* Specular highlight */}
      <ellipse cx="22" cy="20" rx="6" ry="3" fill="white" opacity="0.22" transform="rotate(-30 22 20)" />
    </svg>
  )
}

function Ornament() {
  return (
    <div aria-hidden className="flex items-center justify-center gap-3 my-8">
      <span className="h-px w-24 bg-gradient-to-r from-transparent via-brass/60 to-brass/80" />
      <svg width="22" height="22" viewBox="0 0 22 22" className="text-brass/80">
        <path
          d="M11 1 L13 9 L21 11 L13 13 L11 21 L9 13 L1 11 L9 9 Z"
          fill="currentColor"
          opacity="0.85"
        />
      </svg>
      <span className="h-px w-24 bg-gradient-to-l from-transparent via-brass/60 to-brass/80" />
    </div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.05 + i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export function AwardsPage() {
  const { heroLine, awards, skills } = awardsData

  return (
    <main
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ background: "radial-gradient(ellipse at center, #f7eed5 0%, #ecdfbe 60%, #d8c79a 100%)" }}
    >
      {/* Faint paper grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply"
        style={{
          backgroundImage: "url('/textures/paper-texture.jpg')",
          backgroundSize: "420px",
        }}
      />
      {/* Vignette */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 50%, rgba(60, 40, 16, 0.22) 100%)",
        }}
      />

      {/* Header strip */}
      <div className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-8 pt-8">
        <Link
          href="/"
          className="font-typewriter text-[10px] uppercase tracking-[0.25em] text-sepia/55 transition-colors hover:text-sepia/90"
        >
          &larr; Back to desk
        </Link>
        <span className="font-typewriter text-[10px] uppercase tracking-[0.3em] text-sepia/45">
          Folio &middot; II
        </span>
      </div>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-4xl px-8 pt-20 pb-12 text-center">
        <motion.p
          className="font-typewriter text-[11px] uppercase tracking-[0.45em] text-sepia/55"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Honors &amp; Distinctions
        </motion.p>
        <motion.h1
          className="mt-5 font-serif text-6xl md:text-8xl leading-[0.95] tracking-tight text-ink"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          The <span className="italic font-light text-brass">quiet</span> mantel.
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-xl font-handwriting text-xl text-sepia/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          {heroLine}
        </motion.p>
        <Ornament />
      </section>

      {/* Awards list */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 md:px-10 pb-24">
        <ul className="space-y-12">
          {awards.map((a, i) => (
            <motion.li
              key={`${a.year}-${a.title}`}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="group relative grid grid-cols-[80px_1fr] gap-6 md:grid-cols-[110px_88px_1fr] md:gap-8 items-start border-t border-brass/30 pt-10"
            >
              {/* Year column */}
              <div className="font-typewriter text-[11px] uppercase tracking-[0.3em] text-sepia/55 pt-2">
                <span className="block text-2xl md:text-3xl font-serif text-ink/85 leading-none">
                  {a.year}
                </span>
                <span className="mt-2 block">Year</span>
              </div>

              {/* Medallion */}
              <div className="hidden md:flex justify-center pt-1">
                <motion.div
                  whileHover={{ rotate: -8, scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  style={{ filter: "drop-shadow(2px 4px 6px rgba(60,40,10,0.25))" }}
                >
                  <Medallion size={72} />
                </motion.div>
              </div>

              {/* Body */}
              <div className="min-w-0">
                <h3 className="font-serif text-2xl md:text-3xl leading-tight text-ink">
                  {a.title}
                </h3>
                <p className="mt-1 font-handwriting text-lg text-sepia/80">{a.issuer}</p>
                {a.description && (
                  <p className="mt-3 max-w-prose font-serif text-[15px] leading-relaxed text-sepia/85">
                    {a.description}
                  </p>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Divider */}
      <Ornament />

      {/* Skills */}
      <section className="relative z-10 mx-auto max-w-5xl px-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-typewriter text-[11px] uppercase tracking-[0.45em] text-sepia/55">
            The Craft
          </p>
          <h2 className="mt-4 font-serif text-5xl md:text-6xl text-ink">
            What I <span className="italic font-light text-brass">do</span>.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {skills.map((g, gi) => (
            <motion.div
              key={g.heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: gi * 0.08 }}
              className="border-t border-brass/30 pt-6"
            >
              <h4 className="font-typewriter text-[10px] uppercase tracking-[0.4em] text-sepia/55 mb-5">
                {g.heading}
              </h4>
              <ul className="flex flex-wrap items-baseline gap-x-3 gap-y-2 font-serif text-xl md:text-2xl text-ink/90">
                {g.items.map((s, si) => (
                  <li key={s} className="flex items-baseline gap-3">
                    <span>{s}</span>
                    {si < g.items.length - 1 && (
                      <span aria-hidden className="text-brass/60 text-base translate-y-[-3px]">·</span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer ornament */}
      <div className="relative z-10 pb-12">
        <Ornament />
        <p className="text-center font-handwriting text-sepia/50 text-base">
          — fin —
        </p>
      </div>
    </main>
  )
}
