import { ProjectsNotebook } from "@/components/lab/projects-notebook"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Field Notebook (lab)",
  description: "A design exploration for the projects section.",
  robots: { index: false, follow: false },
}

export default function Page() {
  return <ProjectsNotebook />
}
