/**
 * Deterministic stand-in for Math.random() in render paths.
 *
 * The desk pieces want an organic, hand-placed look — slightly different tape,
 * rotation and perforation per item. Math.random() gets that, but it makes
 * render impure: the server and the browser produce different values, the
 * markup disagrees, and React refuses to patch up the mismatched subtree.
 * (The awards medallion hit exactly this.)
 *
 * Seeding on a stable input instead keeps the variety while guaranteeing both
 * sides compute the same number.
 */
export function seededRandom(seed: number, salt = 0): number {
  // mulberry32 — small, fast, well-distributed for this purpose.
  let t = (seed * 2654435761 + salt * 1013904223 + 0x6d2b79f5) >>> 0
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

/** Seeded value in [min, max). */
export function seededRange(seed: number, min: number, max: number, salt = 0): number {
  return min + seededRandom(seed, salt) * (max - min)
}
