import { NextResponse } from 'next/server'

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    response_type: 'code',
    redirect_uri: 'http://127.0.0.1:3000/api/spotify/callback',
    scope: [
      'streaming',
      'user-read-email',
      'user-read-private',
      'user-read-currently-playing',
      'user-read-recently-played',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-library-read',
      'playlist-read-private',
      'playlist-read-collaborative',
    ].join(' '),
  })
  return NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`
  )
}
