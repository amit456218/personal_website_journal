import { WorldMap } from "@/components/world-map"
import { BackToDesk } from "@/components/back-to-desk"

export default function AtlasPage() {
  return (
    <main className="relative">
      <BackToDesk />
      <WorldMap />
    </main>
  )
}
