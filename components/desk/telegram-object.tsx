"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

/** A telegram slip on the board; its tape ticks the latest dispatch across. */
export function TelegramObject() {
  const [latest, setLatest] = useState<string | null>(null)
  useEffect(() => {
    let cancelled = false
    fetch("/api/dispatches")
      .then((r) => r.json())
      .then((d) => { if (!cancelled && d.dispatches?.[0]) setLatest(d.dispatches[0].text as string) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [])
  const tape = latest ?? "WIRE OPEN STOP AWAITING DISPATCHES STOP"
  return (
    <Link href="/dispatches" aria-label="Dispatches: telegrams from GitHub">
      <motion.div
        className="relative cursor-pointer group"
        initial={{ rotate: 6 }}
        animate={{ rotate: 4 }}
        whileHover={{ rotate: 0, y: -4, scale: 1.05, transition: { duration: 0.3 } }}
      >
        <div
          className="relative w-[136px] overflow-hidden rounded-[2px]"
          style={{ background: "#efe4c2", boxShadow: "3px 3px 8px rgba(0,0,0,0.16)" }}
        >
          <div className="flex items-center justify-between border-b border-ink/60 px-2 py-1">
            <span className="font-serif text-[9px] font-bold tracking-[0.12em] text-ink">TELEGRAM</span>
            <span className="font-typewriter text-[6px] tracking-[0.2em] text-ink/50">RECD</span>
          </div>
          <div className="px-2 pt-1.5 pb-1 font-typewriter text-[6px] uppercase tracking-[0.15em] text-ink/55">From GitHub</div>
          {/* Ticker tape */}
          <div className="relative mx-2 mb-2 h-[18px] overflow-hidden border-y border-dashed border-ink/25 bg-[#f7efd4]">
            <div className="telegram-tape absolute left-0 top-0 flex h-full items-center whitespace-nowrap font-typewriter text-[8px] tracking-[0.1em] text-ink/85">
              <span className="px-2">{tape}</span>
              <span className="px-2" aria-hidden>{tape}</span>
            </div>
          </div>
        </div>
        <motion.p
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-handwriting text-xs text-sepia/90 whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          latest dispatch
        </motion.p>
      </motion.div>
    </Link>
  )
}
