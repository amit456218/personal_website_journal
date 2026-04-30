import { NextResponse } from 'next/server'
import { spotifyFetch } from '@/lib/spotify'

export async function GET() {
  try {
    const res = await spotifyFetch('/me/player/currently-playing')

    if (res.status === 204 || res.status >= 400) {
      const recent = await spotifyFetch('/me/player/recently-played?limit=1')
      const data = await recent.json()
      const track = data.items?.[0]?.track
      if (!track) return NextResponse.json({ isPlaying: false, title: null })
      return NextResponse.json({
        isPlaying: false,
        title: track.name,
        artist: track.artists.map((a: { name: string }) => a.name).join(', '),
        albumImage: track.album.images[1]?.url ?? track.album.images[0]?.url,
        songUrl: track.external_urls.spotify,
      })
    }

    const data = await res.json()
    const item = data.item
    return NextResponse.json({
      isPlaying: data.is_playing,
      title: item?.name,
      artist: item?.artists.map((a: { name: string }) => a.name).join(', '),
      albumImage: item?.album.images[1]?.url ?? item?.album.images[0]?.url,
      songUrl: item?.external_urls.spotify,
    })
  } catch {
    return NextResponse.json({ isPlaying: false, title: null })
  }
}
