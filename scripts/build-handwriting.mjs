// Generates glyph outlines for the intro note's tagline so it can be written
// on-screen stroke by stroke. Run once when the tagline changes:
//
//   node scripts/build-handwriting.mjs /path/to/Caveat[wght].ttf
//
// The font is Caveat (OFL), the same face next/font loads for handwriting;
// the TTF itself is not committed, only the generated outlines are.

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import opentype from "opentype.js"

const here = path.dirname(fileURLToPath(import.meta.url))
const fontPath = process.argv[2]
if (!fontPath) {
  console.error("usage: node scripts/build-handwriting.mjs <Caveat.ttf>")
  process.exit(1)
}

// Keep in sync with deskData.intro.tagline, wrapped the way the note wraps it.
const TEXT = "Designer, developer, traveler, and collector of stories"
const LINES = ["Designer, developer, traveler,", "and collector of stories"]
const SIZE = 40 // units; the SVG scales to fit, so this is just precision
const LINE_HEIGHT = 52

const font = opentype.parse(fs.readFileSync(fontPath).buffer.slice(0))

// opentype's own toPathData emits NaN for some control points in this font,
// so the path data is written straight from the commands instead.
const fmt = (n) => String(Math.round(n * 10) / 10)
function toPathData(commands) {
  let out = ""
  for (const c of commands) {
    if (c.type === "M") out += `M${fmt(c.x)} ${fmt(c.y)}`
    else if (c.type === "L") out += `L${fmt(c.x)} ${fmt(c.y)}`
    else if (c.type === "Q") out += `Q${fmt(c.x1)} ${fmt(c.y1)} ${fmt(c.x)} ${fmt(c.y)}`
    else if (c.type === "C") out += `C${fmt(c.x1)} ${fmt(c.y1)} ${fmt(c.x2)} ${fmt(c.y2)} ${fmt(c.x)} ${fmt(c.y)}`
    else if (c.type === "Z") out += "Z"
  }
  return out
}
const lines = LINES.map((line, li) => {
  const glyphs = []
  const baseline = SIZE + li * LINE_HEIGHT
  font.forEachGlyph(line, 0, baseline, SIZE, { kerning: true, features: { liga: false, rlig: false, calt: false } }, (glyph, x, y, size) => {
    const p = glyph.getPath(x, y, size)
    const d = toPathData(p.commands)
    const adv = (glyph.advanceWidth / font.unitsPerEm) * size
    if (d) glyphs.push({ d, x: Number(x.toFixed(2)), adv: Number(adv.toFixed(2)) })
    else glyphs.push({ d: "", x: Number(x.toFixed(2)), adv: Number(adv.toFixed(2)) }) // a space: the pen still travels
  })
  const width = font.getAdvanceWidth(line, SIZE, { kerning: true, features: { liga: false, rlig: false, calt: false } })
  return { text: line, baseline, width: Number(width.toFixed(2)), glyphs }
})

const out = {
  text: TEXT,
  size: SIZE,
  lineHeight: LINE_HEIGHT,
  width: Number(Math.max(...lines.map((l) => l.width)).toFixed(2)),
  height: SIZE * 0.35 + LINE_HEIGHT * LINES.length,
  lines,
}
const dest = path.join(here, "..", "lib", "handwriting", "tagline.json")
fs.writeFileSync(dest, JSON.stringify(out))
console.log(`wrote ${dest}: ${lines.reduce((n, l) => n + l.glyphs.length, 0)} glyphs, ${(fs.statSync(dest).size / 1024).toFixed(1)} KiB`)
