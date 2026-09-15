import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects lab",
  description: "Design explorations for the projects section.",
  robots: { index: false, follow: false },
}

const VARIANTS = [
  { href: "/lab/projects/notebook", name: "Field Notebook", pitch: "An open pocket notebook. Contents on the left, one project per page on the right, and the page turns." },
  { href: "/lab/projects/board", name: "Evidence Board", pitch: "Cork board. Every project is a different physical object, tied by red thread to a case card." },
  { href: "/lab/projects/departures", name: "Departures Board", pitch: "A split-flap airport board. Pick a flight and it prints the boarding pass." },
  { href: "/projects", name: "Current: Field Notes", pitch: "What's live now. Notebook pages for the big work, index cards for the rest." },
]

export default function ProjectsLab() {
  return (
    <main className="min-h-screen bg-paper-dark px-6 py-16">
      <div className="mx-auto max-w-2xl">
        <p className="font-typewriter text-[10px] uppercase tracking-[0.3em] text-sepia/55">Lab &middot; not linked from the desk</p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight text-ink">Projects section, three ways</h1>
        <p className="mt-2 font-handwriting text-xl text-sepia/75">same seven projects, different objects. pick the one that feels right.</p>
        <ul className="mt-10 space-y-4">
          {VARIANTS.map((v) => (
            <li key={v.href}>
              <Link href={v.href} className="group block border border-sepia/25 bg-paper-light px-5 py-4 vintage-shadow transition-transform hover:-translate-y-0.5">
                <p className="font-serif text-2xl text-ink transition-colors group-hover:text-brass">{v.name}</p>
                <p className="mt-1 font-serif text-base text-sepia/75">{v.pitch}</p>
                <p className="mt-2 font-typewriter text-[10px] uppercase tracking-[0.2em] text-sepia/50">{v.href}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
