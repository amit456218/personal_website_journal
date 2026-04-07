import { WorldMap } from "@/components/world-map"
import { BackToDesk } from "@/components/back-to-desk"

export default function AtlasPage() {
  return (
    <main className="relative min-h-screen bg-paper-dark">
      <BackToDesk />
      <div className="absolute top-8 right-8 md:top-12 md:right-12 w-[85vw] max-w-4xl">
        <WorldMap compact />
      </div>
    </main>
  )
}
