import { NextResponse, type NextRequest } from 'next/server'

/**
 * Postcards from visitors.
 *
 * Delivery goes through Resend when RESEND_API_KEY and POSTCARD_TO are set
 * (POSTCARD_FROM optionally overrides the sender). Without them the postcard
 * is logged server-side and the response says delivered:false, so the page
 * can be honest about it. A hidden "website" field is a honeypot: bots fill
 * it, people never see it.
 */

const WINDOW_MS = 60 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function tooMany(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) return true
  recent.push(now)
  hits.set(ip, recent)
  return false
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as Record<string, unknown> | null
  if (!body) return NextResponse.json({ ok: false, error: 'That postcard was blank.' }, { status: 400 })

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const message = String(body.message ?? '').trim()
  const website = String(body.website ?? '').trim()

  // Honeypot: say thanks and drop it.
  if (website) return NextResponse.json({ ok: true, delivered: false })

  if (name.length < 2 || name.length > 80) return NextResponse.json({ ok: false, error: 'Sign it with your name.' }, { status: 400 })
  if (!EMAIL.test(email) || email.length > 200) return NextResponse.json({ ok: false, error: 'That return address doesn’t look right.' }, { status: 400 })
  if (message.length < 10) return NextResponse.json({ ok: false, error: 'Write a little more than that.' }, { status: 400 })
  if (message.length > 2000) return NextResponse.json({ ok: false, error: 'That’s a letter, not a postcard. Keep it under 2000 characters.' }, { status: 400 })

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'local'
  if (tooMany(ip)) return NextResponse.json({ ok: false, error: 'The mailbox is full for now. Try again in an hour.' }, { status: 429 })

  const key = process.env.RESEND_API_KEY
  const to = process.env.POSTCARD_TO
  if (!key || !to) {
    console.log('[postcard] no mail configured; postcard logged instead:', { name, email, message })
    return NextResponse.json({ ok: true, delivered: false })
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.POSTCARD_FROM ?? 'Postcards <onboarding@resend.dev>',
        to: [to],
        reply_to: email,
        subject: `Postcard from ${name}`,
        text: `${message}\n\n— ${name} <${email}>\n\nSent from the postcard on amitabhgulati.com`,
      }),
    })
    if (!res.ok) {
      console.error('[postcard] resend failed:', res.status, await res.text())
      return NextResponse.json({ ok: false, error: 'The mail truck broke down. Try again in a minute.' }, { status: 502 })
    }
    return NextResponse.json({ ok: true, delivered: true })
  } catch (e) {
    console.error('[postcard] send error:', e)
    return NextResponse.json({ ok: false, error: 'The mail truck broke down. Try again in a minute.' }, { status: 502 })
  }
}
