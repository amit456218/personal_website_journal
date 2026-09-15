import { ProjectsBoard } from "@/components/lab/projects-board"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Evidence Board (lab)",
  description: "A design exploration for the projects section.",
  robots: { index: false, follow: false },
}

export default function Page() {
  return <ProjectsBoard />
}
