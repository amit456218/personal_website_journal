import { NextResponse, type NextRequest } from 'next/server'

/**
 * Local sky for the visitor: sunrise, sunset and current weather.
 *
 * Location comes from Vercel's geo headers in production (the visitor's IP),
 * or from ?lat=&lon= for testing. Weather is Open-Meteo, which needs no key.
 * Coordinates are rounded to one decimal so nearby visitors share a cache.
 */

const FALLBACK = { lat: 40.1164, lon: -88.2434, city: 'Champaign' }

export const revalidate = 600

function describe(code: number, isDay: boolean): string {
  if (code === 0) return isDay ? 'clear skies' : 'a clear night'
  if (code <= 2) return isDay ? 'some clouds' : 'a few clouds'
  if (code === 3) return 'overcast'
  if (code <= 48) return 'fog'
  if (code <= 57) return 'drizzle'
  if (code <= 67) return 'rain'
  if (code <= 77) return 'snow'
  if (code <= 82) return 'showers'
  if (code <= 86) return 'snow showers'
  return 'a thunderstorm'
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams
  const h = req.headers
  const latRaw = q.get('lat') ?? h.get('x-vercel-ip-latitude')
  const lonRaw = q.get('lon') ?? h.get('x-vercel-ip-longitude')
  const cityRaw = q.get('city') ?? h.get('x-vercel-ip-city')

  let lat = Number(latRaw)
  let lon = Number(lonRaw)
  let city = cityRaw ? decodeURIComponent(cityRaw) : ''
  if (!Number.isFinite(lat) || !Number.isFinite(lon) || (lat === 0 && lon === 0)) {
    lat = FALLBACK.lat
    lon = FALLBACK.lon
    city = city || FALLBACK.city
  }
  lat = Math.round(lat * 10) / 10
  lon = Math.round(lon * 10) / 10

  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,weather_code,is_day,precipitation,cloud_cover,wind_speed_10m` +
    `&daily=sunrise,sunset&timezone=auto&forecast_days=1`

  try {
    const data = await fetch(url, { next: { revalidate: 600 } }).then((r) => r.json())
    const cur = data.current ?? {}
    const code = Number(cur.weather_code ?? 0)
    const isDay = Number(cur.is_day ?? 1) === 1
    return NextResponse.json({
      city: city || null,
      tempC: typeof cur.temperature_2m === 'number' ? Math.round(cur.temperature_2m) : null,
      code,
      description: describe(code, isDay),
      isDay,
      cloudCover: Number(cur.cloud_cover ?? 0),
      precipitation: Number(cur.precipitation ?? 0),
      windKph: Number(cur.wind_speed_10m ?? 0),
      sunrise: data.daily?.sunrise?.[0] ?? null,
      sunset: data.daily?.sunset?.[0] ?? null,
      localTime: cur.time ?? null,
      timezone: data.timezone ?? null,
    })
  } catch (e) {
    return NextResponse.json({ error: String(e), city: city || null }, { status: 502 })
  }
}
