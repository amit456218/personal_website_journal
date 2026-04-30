import { NextResponse } from 'next/server'
import { spotifyFetch } from '@/lib/spotify'

export async function GET() {
  try {
    const res = await spotifyFetch('/me/player/queue')
    if (res.status === 204) return NextResponse.json({ queue: [] })
    const data = await res.json()
    return NextResponse.json({ queue: data.queue ?? [] })
  } catch {
    return NextResponse.json({ queue: [] })
  }
}
