import { BackToDesk } from "@/components/back-to-desk"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Atlas',
  description: 'Atlas — coming soon.',
}

export default function AtlasPage() {
  return (
    <main className="relative min-h-screen bg-paper-dark">
      <BackToDesk />
      <div className="pt-24 pb-16 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl text-ink mb-4">Atlas</h1>
            <p className="font-handwriting text-xl text-sepia/70">
              A chronicle of wanderings
            </p>
          </div>
          <div
            className="bg-paper-light p-8 rounded-sm border border-border text-center"
            style={{ boxShadow: "4px 4px 12px rgba(44, 36, 22, 0.15)" }}
          >
            <span className="font-typewriter text-xs text-sepia/50 uppercase tracking-wider">Coming Soon</span>
            <p className="font-serif text-lg text-ink/80 leading-relaxed mt-3">
              The map is being redrawn. Check back soon.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
