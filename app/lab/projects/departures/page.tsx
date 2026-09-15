import { ProjectsDepartures } from "@/components/lab/projects-departures"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Departures Board (lab)",
  description: "A design exploration for the projects section.",
  robots: { index: false, follow: false },
}

export default function Page() {
  return <ProjectsDepartures />
}
