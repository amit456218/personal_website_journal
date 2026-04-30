import { NextResponse } from 'next/server'
import { spotifyFetch } from '@/lib/spotify'

export async function GET() {
  try {
    const res = await spotifyFetch('/me/playlists?limit=50')
    const data = await res.json()
    return NextResponse.json(data.items ?? [])
  } catch {
    return NextResponse.json([])
  }
}
