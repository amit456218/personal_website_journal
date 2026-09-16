// Radio stations: each one is a public Spotify playlist the embed page
// exposes previews for. The dial runs 88–108 like an FM band; the
// frequencies are just where each station sits on it.

export interface Station {
  id: string
  name: string
  freq: number
  blurb: string
}

export const STATIONS: Station[] = [
  { id: "1tMu5VHwOgUnHyHpfbxpvG", name: "Current Listens", freq: 89.3, blurb: "what's on repeat this month" },
  { id: "37i9dQZF1DXcBWIGoYBM5M", name: "Today's Top Hits", freq: 97.1, blurb: "the charts, for contrast" },
  { id: "37i9dQZF1DWWQRwui0ExPn", name: "lofi beats", freq: 104.9, blurb: "for the late shift" },
]

export const BAND = { min: 88, max: 108 }

export function freqToFraction(freq: number) {
  return (freq - BAND.min) / (BAND.max - BAND.min)
}

export function fractionToFreq(f: number) {
  return BAND.min + Math.max(0, Math.min(1, f)) * (BAND.max - BAND.min)
}

/** Distance (in MHz) from a frequency to the nearest station, and which one. */
export function nearestStation(freq: number) {
  let best = 0
  let bestDist = Infinity
  STATIONS.forEach((s, i) => {
    const d = Math.abs(s.freq - freq)
    if (d < bestDist) { bestDist = d; best = i }
  })
  return { index: best, distance: bestDist }
}
