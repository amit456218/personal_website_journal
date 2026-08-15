import type { MetadataRoute } from 'next'
import { workExperiences } from '@/lib/work-data'
import { journalEntries } from '@/lib/journal-data'

const SITE_URL = 'https://amitabhgulati.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/about',
    '/work',
    '/projects',
    '/awards',
    '/atlas',
    '/gallery',
    '/music',
    '/resume',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }))

  const workRoutes = workExperiences.map((w) => ({
    url: `${SITE_URL}/work/${w.id}`,
    changeFrequency: 'yearly' as const,
    priority: 0.6,
  }))

  const journalRoutes = journalEntries.map((e) => ({
    url: `${SITE_URL}/journal/${e.id}`,
    changeFrequency: 'yearly' as const,
    priority: 0.5,
  }))

  return [...staticRoutes, ...workRoutes, ...journalRoutes]
}
