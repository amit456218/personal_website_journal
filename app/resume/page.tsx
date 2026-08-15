import { AlmaMaterPage } from "@/components/alma-mater-page"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Education',
  description: 'Alma mater and academic background — where the foundations were laid.',
}

export default function ResumePage() {
  return <AlmaMaterPage />
}
