import { AboutPage } from "@/components/about-page"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Who I am beyond the resume — the short version of a longer story.',
}

export default function About() {
  return <AboutPage />
}
