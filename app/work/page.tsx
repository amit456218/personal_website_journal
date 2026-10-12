import { WorkPage } from "@/components/work-page"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Work archive — coming soon.',
}

export default function Work() {
  return <WorkPage />
}
