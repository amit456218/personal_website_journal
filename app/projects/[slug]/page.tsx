import { projects, getProject } from "@/lib/projects-data"
import { ProjectDetailPage } from "@/components/project-detail-page"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

type Params = Promise<{ slug: string }>

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.tagline,
  }
}

export default async function ProjectDetail({ params }: { params: Params }) {
  const { slug } = await params
  const index = projects.findIndex((p) => p.slug === slug)
  if (index === -1) notFound()

  const project = projects[index]
  const prev = index > 0 ? projects[index - 1] : undefined
  const next = index < projects.length - 1 ? projects[index + 1] : undefined

  return <ProjectDetailPage project={project} number={index + 1} prev={prev} next={next} />
}
