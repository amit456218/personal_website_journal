import { NextRequest, NextResponse } from 'next/server'
import { spotifyFetch } from '@/lib/spotify'

// GET — full player state
export async function GET() {
  try {
    const res = await spotifyFetch('/me/player')
    if (res.status === 204) return NextResponse.json({ isPlaying: false, item: null })
    const data = await res.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ isPlaying: false, item: null })
  }
}

// POST — control actions: play | pause | next | prev | play-uri
export async function POST(req: NextRequest) {
  try {
    const { action, uri, uris, contextUri, offset, position_ms, device_id } = await req.json()

    let res
    if (action === 'play') {
      const body: Record<string, unknown> = {}
      if (contextUri) body.context_uri = contextUri
      else if (uris) body.uris = uris
      else if (uri) body.uris = [uri]
      if (offset !== undefined) body.offset = { position: offset }
      const qs = device_id ? `?device_id=${device_id}` : ''
      res = await spotifyFetch(`/me/player/play${qs}`, { method: 'PUT', body: JSON.stringify(body) })
    } else if (action === 'pause') {
      res = await spotifyFetch('/me/player/pause', { method: 'PUT' })
    } else if (action === 'next') {
      res = await spotifyFetch('/me/player/next', { method: 'POST' })
    } else if (action === 'prev') {
      res = await spotifyFetch('/me/player/previous', { method: 'POST' })
    } else if (action === 'seek') {
      res = await spotifyFetch(`/me/player/seek?position_ms=${position_ms}`, { method: 'PUT' })
    }

    if (res && !res.ok && res.status !== 204) {
      const err = await res.json().catch(() => ({}))
      console.error('Spotify error:', res.status, err)
      return NextResponse.json({ ok: false, status: res.status, error: err }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Player route error:', e)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
