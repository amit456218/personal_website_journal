import { MusicPage } from "@/components/music-page"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Music',
  description: 'Current listens — what is on the turntable while the work gets made.',
}

export default function Music() {
  return <MusicPage />
}
