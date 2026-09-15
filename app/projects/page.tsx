import { ProjectsPage } from "@/components/projects-page"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Field notes on things built — selected projects and the thinking behind them.',
}

export default function Projects() {
  return <ProjectsPage />
}
