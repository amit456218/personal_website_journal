import { WorldMap } from "@/components/world-map"
import { BackToDesk } from "@/components/back-to-desk"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Atlas',
  description: 'A chronicle of wanderings — the places that shaped the work.',
}

export default function AtlasPage() {
  return (
    <main className="relative min-h-screen bg-paper-dark">
      <BackToDesk />
      <div className="absolute top-8 right-8 md:top-12 md:right-12 w-[85vw] max-w-4xl">
        <WorldMap compact />
        {/* Coming soon banner, laid across the map */}
        <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
          <div
            className="bg-paper-light border border-border px-8 py-4 text-center -rotate-3"
            style={{ boxShadow: "4px 4px 12px rgba(44, 36, 22, 0.25)" }}
          >
            <span className="block font-typewriter text-xl md:text-2xl text-ink uppercase tracking-[0.3em]">
              Coming Soon
            </span>
            <span className="block font-handwriting text-lg text-sepia/70 mt-1">
              the real routes are still being charted
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
