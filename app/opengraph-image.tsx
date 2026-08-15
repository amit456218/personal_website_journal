import { ImageResponse } from 'next/og'

export const alt = 'Amitabh Gulati — Designer, developer, traveler'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(ellipse at center, #f7eed5 0%, #ecdfbe 60%, #d8c79a 100%)',
          color: '#3a2c14',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 48,
            border: '2px solid rgba(122, 92, 42, 0.35)',
          }}
        />
        <div
          style={{
            fontSize: 26,
            letterSpacing: 14,
            textTransform: 'uppercase',
            color: 'rgba(90, 68, 30, 0.75)',
          }}
        >
          Field Notes
        </div>
        <div style={{ fontSize: 92, fontWeight: 700, marginTop: 26, letterSpacing: -1 }}>
          Amitabh Gulati
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginTop: 30,
          }}
        >
          <div style={{ width: 90, height: 1, background: 'rgba(122, 92, 42, 0.5)' }} />
          <div style={{ fontSize: 30, color: 'rgba(74, 56, 26, 0.85)' }}>
            Designer · Developer · Traveler
          </div>
          <div style={{ width: 90, height: 1, background: 'rgba(122, 92, 42, 0.5)' }} />
        </div>
      </div>
    ),
    size,
  )
}
