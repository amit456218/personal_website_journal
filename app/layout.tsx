import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Caveat, Special_Elite } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AtlasTransition } from '@/components/atlas-transition'
import { SpotifyProvider } from '@/contexts/spotify'
import { CorkProvider } from '@/contexts/cork'
import { ClickSounds } from '@/components/click-sounds'
import './globals.css'

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif"
})

const caveat = Caveat({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-handwriting"
})

const specialElite = Special_Elite({ 
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-typewriter"
})

const SITE_URL = 'https://amitabhgulati.com'
const DESCRIPTION =
  'The portfolio of Amitabh Gulati — designer, developer and traveler — laid out as a worn vintage travel journal of projects, journeys and stories.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Amitabh Gulati | Designer & Developer',
    template: '%s | Amitabh Gulati',
  },
  description: DESCRIPTION,
  keywords: ['Amitabh Gulati', 'portfolio', 'product designer', 'developer', 'UX', 'travel journal'],
  authors: [{ name: 'Amitabh Gulati', url: SITE_URL }],
  creator: 'Amitabh Gulati',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Amitabh Gulati',
    title: 'Amitabh Gulati | Designer & Developer',
    description: DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amitabh Gulati | Designer & Developer',
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#f4ecd8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${cormorant.variable} ${caveat.variable} ${specialElite.variable} font-serif antialiased`}>
        <SpotifyProvider>
          <CorkProvider>
            <ClickSounds />
            <AtlasTransition>
              {children}
            </AtlasTransition>
          </CorkProvider>
        </SpotifyProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
