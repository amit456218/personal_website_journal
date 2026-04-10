"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function AwardsSkillsToken() {
  return (
    <Link href="/awards" className="block">
      <motion.div
        className="relative cursor-pointer group"
        initial={{ opacity: 0, rotate: 5, scale: 0.9 }}
        animate={{ opacity: 1, rotate: 3, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileHover={{
          scale: 1.08,
          rotate: 0,
          transition: { duration: 0.2 }
        }}
      >
        {/* Scout/merit badge patch on felt */}
        <div
          className="relative overflow-visible"
          style={{
            width: "90px",
            height: "105px",
          }}
        >
          {/* Felt backing — dark green swatch */}
          <div
            className="absolute inset-0 rounded-sm"
            style={{
              background: "linear-gradient(160deg, #2a4a28 0%, #1e3820 50%, #1a3018 100%)",
              boxShadow: "3px 4px 10px rgba(0,0,0,0.35), inset 0 1px 3px rgba(255,255,255,0.05)",
              border: "1px solid #14260f",
            }}
          />
          {/* Felt texture */}
          <div
            className="absolute inset-0 rounded-sm opacity-20"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0.5px, transparent 1px),
                radial-gradient(circle at 70% 60%, rgba(255,255,255,0.06) 0.5px, transparent 1px),
                radial-gradient(circle at 40% 80%, rgba(255,255,255,0.07) 0.5px, transparent 1px)
              `,
              backgroundSize: "8px 8px, 12px 12px, 6px 6px",
            }}
          />

          {/* Stitching around edge */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 90 105">
            <rect x="3" y="3" width="84" height="99" rx="2" fill="none" stroke="#4a7a40" strokeWidth="0.6" strokeDasharray="3,2" opacity="0.5" />
          </svg>

          {/* TOP: Gold medal with ribbon bar */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2">
            <svg viewBox="0 0 50 52" className="w-12 h-13">
              {/* Ribbon bar — striped */}
              <rect x="10" y="0" width="30" height="10" rx="1" fill="url(#barGrad)" stroke="#6a4a20" strokeWidth="0.4" />
              <rect x="14" y="1" width="3" height="8" fill="#c0392b" opacity="0.8" />
              <rect x="19" y="1" width="2" height="8" fill="#f0d478" opacity="0.6" />
              <rect x="23.5" y="1" width="3" height="8" fill="#1e3a6a" opacity="0.7" />
              <rect x="29" y="1" width="2" height="8" fill="#f0d478" opacity="0.6" />
              <rect x="33" y="1" width="3" height="8" fill="#c0392b" opacity="0.8" />

              {/* V-ribbon connecting bar to medal */}
              <path d="M18 10 L25 22 L32 10" fill="url(#vRibbon)" stroke="#8a2020" strokeWidth="0.3" />
              <path d="M20 10 L25 20 L30 10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

              {/* Medal — gold star */}
              <circle cx="25" cy="34" r="14" fill="url(#medalGold)" stroke="#8a6c20" strokeWidth="0.6" />
              <circle cx="25" cy="34" r="11.5" fill="none" stroke="#c9a04a" strokeWidth="0.4" opacity="0.5" />
              <circle cx="25" cy="34" r="9.5" fill="none" stroke="#c9a04a" strokeWidth="0.3" opacity="0.3" />
              {/* Star */}
              <path d="M25 23 L27.8 30 L35.5 30 L29.2 34.5 L31.5 42 L25 37.5 L18.5 42 L20.8 34.5 L14.5 30 L22.2 30 Z" fill="url(#starG)" stroke="#8a6c20" strokeWidth="0.3" />
              {/* Shine */}
              <ellipse cx="21" cy="29" rx="5" ry="4" fill="rgba(255,255,255,0.12)" transform="rotate(-15 21 29)" />

              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2a4a28" />
                  <stop offset="100%" stopColor="#1e3820" />
                </linearGradient>
                <linearGradient id="vRibbon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c0392b" />
                  <stop offset="100%" stopColor="#922020" />
                </linearGradient>
                <radialGradient id="medalGold" cx="40%" cy="38%">
                  <stop offset="0%" stopColor="#f5de6e" />
                  <stop offset="40%" stopColor="#d4a838" />
                  <stop offset="100%" stopColor="#a88020" />
                </radialGradient>
                <linearGradient id="starG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f8e878" />
                  <stop offset="50%" stopColor="#d4a838" />
                  <stop offset="100%" stopColor="#c09028" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* BOTTOM: Enamel skill pins */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {/* Pin 1 — code */}
            <svg viewBox="0 0 22 22" className="w-5 h-5">
              <circle cx="11" cy="11" r="10" fill="url(#pin1)" stroke="#333" strokeWidth="0.5" />
              <circle cx="11" cy="11" r="8" fill="none" stroke="#555" strokeWidth="0.3" />
              <text x="11" y="14" textAnchor="middle" fontSize="8" fill="#ffd700" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>
              <defs>
                <radialGradient id="pin1" cx="40%" cy="35%">
                  <stop offset="0%" stopColor="#3a3a3a" />
                  <stop offset="100%" stopColor="#1a1a1a" />
                </radialGradient>
              </defs>
            </svg>
            {/* Pin 2 — star/design */}
            <svg viewBox="0 0 22 22" className="w-5 h-5">
              <circle cx="11" cy="11" r="10" fill="url(#pin2)" stroke="#1a3a6a" strokeWidth="0.5" />
              <circle cx="11" cy="11" r="8" fill="none" stroke="#2a4a7a" strokeWidth="0.3" />
              <path d="M11 5 L12.5 9 L17 9 L13.5 11.5 L14.8 16 L11 13 L7.2 16 L8.5 11.5 L5 9 L9.5 9 Z" fill="#ffd700" opacity="0.8" />
              <defs>
                <radialGradient id="pin2" cx="40%" cy="35%">
                  <stop offset="0%" stopColor="#2a5090" />
                  <stop offset="100%" stopColor="#1a3060" />
                </radialGradient>
              </defs>
            </svg>
            {/* Pin 3 — lightning/energy */}
            <svg viewBox="0 0 22 22" className="w-5 h-5">
              <circle cx="11" cy="11" r="10" fill="url(#pin3)" stroke="#5a1a1a" strokeWidth="0.5" />
              <circle cx="11" cy="11" r="8" fill="none" stroke="#7a2a2a" strokeWidth="0.3" />
              <path d="M13 4 L8 12 L11 12 L9 18 L15 10 L12 10 Z" fill="#ffd700" opacity="0.85" />
              <defs>
                <radialGradient id="pin3" cx="40%" cy="35%">
                  <stop offset="0%" stopColor="#8a2020" />
                  <stop offset="100%" stopColor="#5a1515" />
                </radialGradient>
              </defs>
            </svg>
          </div>

          {/* Label */}
          <div className="absolute bottom-[-18px] left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="font-handwriting text-xs text-sepia/80">awards &amp; skills</span>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
