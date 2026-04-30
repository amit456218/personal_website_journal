import { NextRequest, NextResponse } from 'next/server'
import { spotifyFetch } from '@/lib/spotify'

export async function POST(req: NextRequest) {
  try {
    const { device_id, state } = await req.json()
    const qs = `?state=${state ? 'true' : 'false'}${device_id ? `&device_id=${device_id}` : ''}`
    await spotifyFetch(`/me/player/shuffle${qs}`, { method: 'PUT' })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
