import { NextRequest, NextResponse } from 'next/server'
import { spotifyFetch } from '@/lib/spotify'

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const res = await spotifyFetch(`/playlists/${id}/tracks?limit=100&additional_types=track`)
    const data = await res.json()
    console.log(`Playlist ${id} response:`, JSON.stringify(data).slice(0, 500))
    return NextResponse.json({ items: data.items ?? [], debug: { status: res.status, raw_keys: Object.keys(data) } })
  } catch (e) {
    console.error('Playlist route error:', e)
    return NextResponse.json({ items: [], error: String(e) })
  }
}
