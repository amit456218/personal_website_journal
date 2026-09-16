"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { Dispatch } from "@/lib/dispatches"
import { Telegram } from "./telegram"

const EMPTY: Dispatch = {
  id: "none",
  at: new Date(0).toISOString(),
  repo: "the wire",
  repoUrl: "https://github.com/amit456218",
  kind: "issue",
  text: "NO DISPATCHES RECEIVED STOP LINES DOWN OR THE OPERATOR IS ASLEEP STOP TRY AGAIN LATER STOP",
  url: "https://github.com/amit456218",
}

export function DispatchesFeed({ dispatches, fetchedAt }: { dispatches: Dispatch[]; fetchedAt: string }) {
  const list = dispatches.length ? dispatches : [EMPTY]
  return (
    <main className="min-h-screen bg-paper-dark px-4 py-10 md:py-14">
      <div aria-hidden className="pointer-events-none fixed inset-0 opacity-30" style={{ backgroundImage: "url('/textures/paper-texture.webp')", backgroundSize: "300px" }} />
      <div className="relative mx-auto max-w-2xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="font-typewriter text-[10px] uppercase tracking-[0.25em] text-sepia/55 transition-colors hover:text-sepia/90">&larr; Back to desk</Link>
          <span className="font-typewriter text-[10px] uppercase tracking-[0.3em] text-sepia/45">Telegraph office</span>
        </div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-typewriter text-2xl uppercase tracking-[0.25em] text-ink md:text-3xl">Dispatches</h1>
          <p className="mt-1 font-handwriting text-xl text-sepia/75">what&rsquo;s been happening in the workshop, wired in from GitHub as it happens.</p>
        </motion.div>
        <div className="mt-10 space-y-8">
          {list.map((d, i) => (
            <Telegram key={d.id} d={d} index={i} />
          ))}
        </div>
        <p className="mt-10 text-center font-typewriter text-[9px] uppercase tracking-[0.25em] text-sepia/40">
          Last wire check {new Date(fetchedAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })} &middot; refreshes every 15 minutes
        </p>
      </div>
    </main>
  )
}
