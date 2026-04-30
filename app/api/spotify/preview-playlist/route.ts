import { NextResponse } from 'next/server'

const PLAYLIST_ID = '1tMu5VHwOgUnHyHpfbxpvG'

interface PreviewTrack {
  id: string
  uri: string
  name: string
  artist: string
  duration_ms: number
  preview_url: string
  album_image: string | null
}

let cache: { tracks: PreviewTrack[]; ts: number } | null = null
const TTL_MS = 60 * 1000 // 60 seconds — new playlist additions show up within a minute

export async function GET() {
  try {
    if (cache && Date.now() - cache.ts < TTL_MS) {
      return NextResponse.json({ tracks: cache.tracks, cached: true })
    }

    const html = await fetch(`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}`, {
      cache: 'no-store',
    }).then(r => r.text())

    const tracks: PreviewTrack[] = []
    const seen = new Set<string>()

    // Find all track entries with audioPreview
    const re = /\{"uri":"(spotify:track:[^"]+)","uid":"[^"]*","title":"([^"]*)","subtitle":"([^"]*)"[^}]*?"duration":(\d+)[^}]*?"audioPreview":\{"format":"[^"]*","url":"([^"]+)"/g
    let m: RegExpExecArray | null
    while ((m = re.exec(html))) {
      const [, uri, title, subtitle, duration, previewUrl] = m
      if (seen.has(uri)) continue
      seen.add(uri)
      const id = uri.replace('spotify:track:', '')
      tracks.push({
        id,
        uri,
        name: title.replace(/\\u002F/g, '/').replace(/\\&/g, '&'),
        artist: subtitle.replace(/\\u002F/g, '/').replace(/\\&/g, '&'),
        duration_ms: parseInt(duration),
        preview_url: previewUrl,
        album_image: null,
      })
    }

    // Fetch album art via Spotify's public oEmbed (no auth needed)
    await Promise.all(tracks.map(async (t) => {
      try {
        const oe = await fetch(`https://open.spotify.com/oembed?url=https://open.spotify.com/track/${t.id}`, { cache: 'no-store' }).then(r => r.json())
        t.album_image = oe.thumbnail_url ?? null
      } catch {
        t.album_image = null
      }
    }))

    cache = { tracks, ts: Date.now() }
    return NextResponse.json({ tracks, cached: false })
  } catch (e) {
    return NextResponse.json({ tracks: [], error: String(e) }, { status: 500 })
  }
}
