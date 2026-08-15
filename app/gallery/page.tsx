import { GalleryPage } from "@/components/gallery-page"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Moments captured along the way — a photographic record of the journey.',
}

export default function Gallery() {
  return <GalleryPage />
}
