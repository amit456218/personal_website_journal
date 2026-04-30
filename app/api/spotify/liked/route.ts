import { NextRequest, NextResponse } from 'next/server'
import { spotifyFetch } from '@/lib/spotify'

export async function GET(req: NextRequest) {
  try {
    const offset = req.nextUrl.searchParams.get('offset') ?? '0'
    const res = await spotifyFetch(`/me/tracks?limit=50&offset=${offset}`)
    const data = await res.json()
    return NextResponse.json({ items: data.items ?? [], total: data.total ?? 0, next: data.next })
  } catch {
    return NextResponse.json({ items: [], total: 0, next: null })
  }
}
