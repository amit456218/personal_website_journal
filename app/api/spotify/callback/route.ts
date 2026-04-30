import { NextRequest, NextResponse } from 'next/server'

// One-time callback — exchanges auth code for refresh_token
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'No code provided' }, { status: 400 })

  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64')

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: 'http://127.0.0.1:3000/api/spotify/callback',
    }),
  })

  const data = await res.json()

  return NextResponse.json({
    refresh_token: data.refresh_token,
    next_step: 'Add SPOTIFY_REFRESH_TOKEN to your .env.local and Vercel env vars',
  })
}
