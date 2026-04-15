import { Desk } from "@/components/desk"
import { ScaleToFit } from "@/components/scale-to-fit"

export default function Home() {
  return (
    <main className="relative">
      <ScaleToFit>
        <Desk />
      </ScaleToFit>
    </main>
  )
}
