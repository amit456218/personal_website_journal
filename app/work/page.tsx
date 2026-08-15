import { WorkPage } from "@/components/work-page"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Work',
  description: 'A curated archive of professional journeys, roles and the companies behind them.',
}

export default function Work() {
  return <WorkPage />
}
