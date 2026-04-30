import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Caveat, Special_Elite } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AtlasTransition } from '@/components/atlas-transition'
import { SpotifyProvider } from '@/contexts/spotify'
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

export const metadata: Metadata = {
  title: 'Travel Journal | A Personal Portfolio',
  description: 'A personal portfolio designed as a worn vintage travel journal — documenting journeys, projects, and stories from around the world.',
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
          <ClickSounds />
          <AtlasTransition>
            {children}
          </AtlasTransition>
        </SpotifyProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
