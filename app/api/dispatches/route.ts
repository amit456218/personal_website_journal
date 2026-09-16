import { NextResponse } from 'next/server'
import { fetchDispatches } from '@/lib/dispatches'

export const revalidate = 900

export async function GET() {
  try {
    const dispatches = await fetchDispatches(12)
    return NextResponse.json({ dispatches, fetchedAt: new Date().toISOString() })
  } catch (e) {
    console.warn('[dispatches] failed:', e)
    return NextResponse.json({ dispatches: [], error: String(e) }, { status: 200 })
  }
}
