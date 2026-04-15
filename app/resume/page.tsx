import { BackToDesk } from "@/components/back-to-desk"

export default function ResumePage() {
  return (
    <main className="relative min-h-screen bg-paper-dark">
      <BackToDesk />
      <div className="flex items-center justify-center min-h-screen p-8">
        <div className="max-w-2xl text-center">
          <h1 className="font-serif text-4xl text-ink mb-4">Alma Mater</h1>
          <p className="font-typewriter text-sepia/70">UIUC</p>
        </div>
      </div>
    </main>
  )
}
