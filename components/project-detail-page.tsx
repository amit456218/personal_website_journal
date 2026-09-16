"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import type { Project } from "@/lib/projects-data"

const EASE = [0.22, 1, 0.36, 1] as const

interface ProjectDetailPageProps {
  project: Project
  number: number
  prev?: Pick<Project, "slug" | "title">
  next?: Pick<Project, "slug" | "title">
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 16 16" className="w-3 h-3" aria-hidden>
      <path fill="currentColor" d="M6 3v1.5h4.44L3 11.94 4.06 13l7.44-7.44V10H13V3z" />
    </svg>
  )
}

export function ProjectDetailPage({ project, number, prev, next }: ProjectDetailPageProps) {
  return (
    <div className="min-h-screen bg-paper-dark">
      {/* Paper texture overlay */}
      <div
        aria-hidden
        className="fixed inset-0 opacity-30 pointer-events-none z-0"
        style={{ backgroundImage: "url('/textures/paper-texture.webp')", backgroundSize: "300px" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        <Link href="/projects" className="inline-flex items-center gap-2 group mb-8">
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 bg-paper-light rounded border border-border vintage-shadow"
            whileHover={{ x: -4 }}
            transition={{ duration: 0.2 }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-sepia" aria-hidden>
              <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
            <span className="font-typewriter text-xs text-sepia">Back to Field Notes</span>
          </motion.div>
        </Link>

        <motion.article
          className="relative bg-paper-light rounded-sm p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ boxShadow: "6px 8px 24px rgba(44, 36, 22, 0.2), 2px 3px 8px rgba(44, 36, 22, 0.1)" }}
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-20 rounded-sm pointer-events-none"
            style={{ backgroundImage: "url('/textures/paper-texture.webp')", backgroundSize: "200px", mixBlendMode: "multiply" }}
          />
          <div aria-hidden className="absolute inset-4 border border-sepia/15 rounded-sm pointer-events-none" />

          {/* Corner stamp */}
          <div
            aria-hidden
            className="absolute top-6 right-6 w-16 h-16 border-2 border-dashed border-stamp-red/30 rounded-full flex items-center justify-center -rotate-12"
          >
            <span className="font-typewriter text-xs text-stamp-red/50">{project.year}</span>
          </div>

          <header className="relative mb-8 pr-20">
            <p className="font-typewriter text-[10px] text-sepia/50 uppercase tracking-[0.2em] mb-2">
              Entry No. {String(number).padStart(2, "0")} &middot; {project.kind}
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-ink font-semibold tracking-tight leading-tight mb-1">
              {project.title}
            </h1>
            <div className="flex items-start gap-3 mt-4">
              <div className="w-8 h-px bg-brass/50 mt-3 shrink-0" />
              <p className="font-handwriting text-xl text-brass leading-snug">{project.tagline}</p>
            </div>
          </header>

          <div className="flex items-center gap-4 my-8" aria-hidden>
            <div className="flex-1 h-px bg-sepia/20" />
            <svg viewBox="0 0 22 22" className="w-4 h-4 text-brass/70">
              <path d="M11 1 L13 9 L21 11 L13 13 L11 21 L9 13 L1 11 L9 9 Z" fill="currentColor" opacity="0.85" />
            </svg>
            <div className="flex-1 h-px bg-sepia/20" />
          </div>

          <div className="relative mb-8">
            <p className="font-serif text-lg text-ink/80 leading-relaxed first-letter:text-4xl first-letter:font-serif first-letter:text-brass first-letter:float-left first-letter:mr-2 first-letter:leading-none">
              {project.summary}
            </p>
          </div>

          {project.highlights && project.highlights.length > 0 && (
            <div className="relative mb-8">
              <h2 className="font-typewriter text-xs text-sepia/60 uppercase tracking-[0.2em] mb-4">What I built</h2>
              <ul className="space-y-3">
                {project.highlights.map((h, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, ease: EASE }}
                  >
                    <span aria-hidden className="mt-2.5 w-1.5 h-1.5 rounded-full bg-brass/70 shrink-0" />
                    <span className="font-serif text-base text-ink/75 leading-relaxed">{h}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          <div className="relative mb-8">
            <h2 className="font-typewriter text-xs text-sepia/60 uppercase tracking-[0.2em] mb-3">Made with</h2>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li
                  key={s}
                  className="font-typewriter text-[10px] uppercase tracking-[0.12em] text-sepia/70 px-2 py-1 border border-sepia/25 rounded-sm bg-paper-dark/40"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <h2 className="font-typewriter text-xs text-sepia/60 uppercase tracking-[0.2em] mb-3">Where to find it</h2>
            {project.links && project.links.length > 0 ? (
              <ul className="flex flex-wrap gap-3">
                {project.links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-paper-light border border-border rounded vintage-shadow font-typewriter text-xs text-sepia hover:text-brass hover:border-brass/50 transition-colors"
                    >
                      {l.label}
                      <ExternalIcon />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-handwriting text-lg text-sepia/70">
                {project.privateSource ? "The code lives in a private repository. Ask me about it." : "Not published yet."}
              </p>
            )}
          </div>
        </motion.article>

        {/* Prev / next entries */}
        {(prev || next) && (
          <motion.nav
            aria-label="Neighbouring entries"
            className="mt-8 flex items-center justify-between gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {prev ? (
              <Link href={`/projects/${prev.slug}`} className="group font-typewriter text-xs text-sepia/60 hover:text-sepia transition-colors">
                &larr; <span className="group-hover:text-brass transition-colors">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/projects/${next.slug}`} className="group font-typewriter text-xs text-sepia/60 hover:text-sepia transition-colors text-right">
                <span className="group-hover:text-brass transition-colors">{next.title}</span> &rarr;
              </Link>
            ) : (
              <span />
            )}
          </motion.nav>
        )}
      </div>
    </div>
  )
}
