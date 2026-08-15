import { NextResponse } from 'next/server'

const PLAYLIST_ID = process.env.SPOTIFY_PLAYLIST_ID ?? '1tMu5VHwOgUnHyHpfbxpvG'

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

interface PreviewTrack {
  id: string
  uri: string
  name: string
  artist: string
  duration_ms: number
  preview_url: string
  album_image: string | null
}

/** Shape of the entries Spotify puts in the embed page's trackList. */
interface EmbedTrack {
  uri?: string
  title?: string
  subtitle?: string
  duration?: number
  audioPreview?: { url?: string }
}

let cache: { tracks: PreviewTrack[]; ts: number } | null = null
const TTL_MS = 60 * 1000 // 60 seconds — new playlist additions show up within a minute

/**
 * Pull the trackList out of the embed page's __NEXT_DATA__ blob.
 *
 * This used to be scraped with one big regex over the raw HTML. That broke the
 * moment Spotify inserted `"contentRatings":{"labels":[]}` between `subtitle`
 * and `duration`: the pattern hopped fields with `[^}]*?`, which cannot cross a
 * closing brace. Parsing the JSON and walking to `trackList` is indifferent to
 * field order and to new keys appearing.
 */
function extractTrackList(html: string): EmbedTrack[] {
  const match = html.match(
    /<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/
  )
  if (!match) return []

  let data: unknown
  try {
    data = JSON.parse(match[1])
  } catch {
    return []
  }

  let found: EmbedTrack[] | null = null
  const walk = (node: unknown) => {
    if (found || node === null || typeof node !== 'object') return
    const obj = node as Record<string, unknown>
    if (Array.isArray(obj.trackList)) {
      found = obj.trackList as EmbedTrack[]
      return
    }
    for (const key of Object.keys(obj)) walk(obj[key])
  }
  walk(data)

  return found ?? []
}

export async function GET() {
  try {
    if (cache && Date.now() - cache.ts < TTL_MS) {
      return NextResponse.json({ tracks: cache.tracks, cached: true })
    }

    const html = await fetch(`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}`, {
      cache: 'no-store',
      headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml' },
    }).then((r) => r.text())

    const entries = extractTrackList(html)

    const tracks: PreviewTrack[] = []
    const seen = new Set<string>()
    for (const t of entries) {
      const uri = t.uri
      const preview = t.audioPreview?.url
      // Not every track carries a preview; skip those rather than ship a
      // player entry that cannot play.
      if (!uri || !preview || seen.has(uri)) continue
      seen.add(uri)
      tracks.push({
        id: uri.replace('spotify:track:', ''),
        uri,
        name: t.title ?? 'Unknown',
        artist: t.subtitle ?? '',
        duration_ms: typeof t.duration === 'number' ? t.duration : 0,
        preview_url: preview,
        album_image: null,
      })
    }

    // Album art via Spotify's public oEmbed (no auth needed).
    await Promise.all(
      tracks.map(async (t) => {
        try {
          const oe = await fetch(
            `https://open.spotify.com/oembed?url=https://open.spotify.com/track/${t.id}`,
            { cache: 'no-store', headers: { 'User-Agent': UA, Accept: 'application/json' } }
          ).then((r) => r.json())
          t.album_image = oe.thumbnail_url ?? null
        } catch {
          t.album_image = null
        }
      })
    )

    if (tracks.length === 0) {
      // An empty embed almost always means the playlist is private, deleted or
      // empty — the page still returns 200, just without a trackList. Say so
      // instead of handing back a silent [].
      console.warn(
        `[preview-playlist] no tracks for playlist ${PLAYLIST_ID}. ` +
          `Embed returned ${html.length} bytes. Is the playlist public and non-empty?`
      )
      return NextResponse.json({
        tracks: [],
        reason: 'no-tracks',
        hint: 'Playlist is private, empty or unavailable. It must be public for the embed to expose tracks.',
        playlistId: PLAYLIST_ID,
      })
    }

    cache = { tracks, ts: Date.now() }
    return NextResponse.json({ tracks, cached: false })
  } catch (e) {
    const cause = e instanceof Error ? e.cause : undefined
    console.error('[preview-playlist] failed:', e, cause)
    return NextResponse.json(
      { tracks: [], error: String(e), cause: String(cause ?? '') },
      { status: 500 }
    )
  }
}
