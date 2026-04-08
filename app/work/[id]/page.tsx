import { workExperiences } from "@/lib/work-data"
import { WorkDetailPage } from "@/components/work-detail-page"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  return workExperiences.map((work) => ({
    id: work.id,
  }))
}

export default async function WorkDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const work = workExperiences.find((w) => w.id === id)
  
  if (!work) {
    notFound()
  }
  
  return <WorkDetailPage work={work} />
}
