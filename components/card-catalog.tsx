"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { useSpotify } from "@/contexts/spotify"
import { projects } from "@/lib/projects-data"
import { journalEntries } from "@/lib/journal-data"

/**
 * The card catalog: ⌘K (or "/") pulls a drawer out of the wall. Type, and
 * index cards for pages, projects, trips, stations and the tracks on the
 * radio come up; arrow keys and Enter pull one. Everything is searchable
 * from anywhere, without a menu on the desk.
 */

type Kind = "page" | "project" | "trip" | "station" | "track" | "lab"

interface Item {
  id: string
  kind: Kind
  title: string
  subtitle?: string
  keywords: string
  run: () => void
}

const KIND_LABEL: Record<Kind, string> = {
  page: "Page",
  project: "Project",
  trip: "Trip",
  station: "Station",
  track: "Track",
  lab: "Lab",
}

const RECENT_KEY = "catalog-recent-v1"

function scoreItem(query: string, item: Item): number {
  const q = query.trim().toLowerCase()
  if (!q) return 0
  const title = item.title.toLowerCase()
  const hay = `${title} ${(item.subtitle ?? "").toLowerCase()} ${item.keywords.toLowerCase()}`
  let total = 0
  for (const tok of q.split(/\s+/)) {
    if (!tok) continue
    if (title === tok) total += 6
    else if (title.startsWith(tok)) total += 4
    else if (title.split(/\W+/).some((w) => w.startsWith(tok))) total += 3
    else if (title.includes(tok)) total += 2
    else if (hay.includes(tok)) total += 1
    else return 0 // every token has to land somewhere
  }
  return total
}

function clack() {
  try {
    const Ctx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctx) return
    const c = new Ctx()
    const t = c.currentTime
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = "triangle"
    o.frequency.setValueAtTime(220, t)
    o.frequency.exponentialRampToValueAtTime(90, t + 0.09)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(0.25, t + 0.005)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16)
    o.connect(g).connect(c.destination)
    o.start(t)
    o.stop(t + 0.18)
    setTimeout(() => c.close(), 400)
  } catch {}
}

export function CardCatalog() {
  const router = useRouter()
  const pathname = usePathname()
  const { tracks, playTrack, tune, stations } = useSpotify()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [cursor, setCursor] = useState(0)
  const [recent, setRecent] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)

  const go = useCallback((href: string) => router.push(href), [router])

  const items = useMemo<Item[]>(() => {
    const pages: Item[] = [
      { id: "page:/", kind: "page", title: "The desk", subtitle: "home", keywords: "home start desk board", run: () => go("/") },
      { id: "page:/projects", kind: "page", title: "Field notes", subtitle: "projects", keywords: "projects work built code", run: () => go("/projects") },
      { id: "page:/work", kind: "page", title: "Work archive", subtitle: "companies and experiences", keywords: "work jobs passport companies resume experience", run: () => go("/work") },
      { id: "page:/awards", kind: "page", title: "Awards & skills", subtitle: "the quiet mantel", keywords: "awards honors skills medal", run: () => go("/awards") },
      { id: "page:/about", kind: "page", title: "About me", subtitle: "who am I", keywords: "about bio who", run: () => go("/about") },
      { id: "page:/atlas", kind: "page", title: "The atlas", subtitle: "a chronicle of wanderings", keywords: "atlas map travel trips journal routes", run: () => go("/atlas") },
      { id: "page:/gallery", kind: "page", title: "Gallery", subtitle: "photographs", keywords: "gallery photos pictures polaroid", run: () => go("/gallery") },
      { id: "page:/music", kind: "page", title: "Current listens", subtitle: "the radio", keywords: "music radio spotify listens turntable vinyl", run: () => go("/music") },
      { id: "page:/resume", kind: "page", title: "Education", subtitle: "alma mater", keywords: "education school university degree resume", run: () => go("/resume") },
      { id: "page:/contact", kind: "page", title: "Send a postcard", subtitle: "write me", keywords: "contact email message postcard hello hire", run: () => go("/contact") },
      { id: "page:/dispatches", kind: "page", title: "Dispatches", subtitle: "telegrams from GitHub", keywords: "github commits activity telegram wire", run: () => go("/dispatches") },
      { id: "lab:/lab/projects", kind: "lab", title: "Projects lab", subtitle: "three designs", keywords: "lab experiments notebook board departures", run: () => go("/lab/projects") },
    ]
    const proj: Item[] = projects.map((p) => ({
      id: `project:${p.slug}`,
      kind: "project",
      title: p.title,
      subtitle: p.tagline,
      keywords: `${p.kind} ${p.stack.join(" ")} ${p.year}`,
      run: () => go(`/projects/${p.slug}`),
    }))
    const trips: Item[] = journalEntries.map((e) => ({
      id: `trip:${e.id}`,
      kind: "trip",
      title: e.title,
      subtitle: `${e.location}, ${e.country}`,
      keywords: `${e.date} travel trip journal`,
      run: () => go(`/journal/${e.id}`),
    }))
    const st: Item[] = stations.map((s, i) => ({
      id: `station:${s.id}`,
      kind: "station",
      title: s.name,
      subtitle: `${s.freq.toFixed(1)} FM · ${s.blurb}`,
      keywords: "radio station tune playlist",
      run: () => { tune(i); go("/music") },
    }))
    const tr: Item[] = tracks.slice(0, 60).map((t, i) => ({
      id: `track:${t.id}`,
      kind: "track",
      title: t.name,
      subtitle: t.artist,
      keywords: "song track play music",
      run: () => { playTrack(i); go("/music") },
    }))
    return [...pages, ...proj, ...trips, ...st, ...tr]
  }, [go, tracks, playTrack, tune, stations])

  const results = useMemo(() => {
    const q = query.trim()
    if (!q) {
      const rec = recent.map((id) => items.find((i) => i.id === id)).filter((i): i is Item => Boolean(i))
      const starters = items.filter((i) => i.kind === "page").slice(0, 8 - rec.length)
      return [...rec, ...starters.filter((s) => !rec.includes(s))]
    }
    return items
      .map((i) => ({ i, s: scoreItem(q, i) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map((x) => x.i)
  }, [query, items, recent])

  const close = useCallback(() => {
    setOpen(false)
    setQuery("")
    setCursor(0)
    restoreRef.current?.focus?.()
  }, [])

  const openDrawer = useCallback(() => {
    restoreRef.current = document.activeElement as HTMLElement | null
    try {
      const raw = localStorage.getItem(RECENT_KEY)
      setRecent(raw ? (JSON.parse(raw) as string[]) : [])
    } catch {}
    setOpen(true)
    clack()
  }, [])

  const pull = useCallback((item: Item) => {
    try {
      const next = [item.id, ...recent.filter((r) => r !== item.id)].slice(0, 3)
      localStorage.setItem(RECENT_KEY, JSON.stringify(next))
    } catch {}
    close()
    item.run()
  }, [recent, close])

  // Global keys
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const typing = !!target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        if (open) close()
        else openDrawer()
        return
      }
      if (!open && e.key === "/" && !typing) {
        e.preventDefault()
        openDrawer()
        return
      }
      if (open && e.key === "Escape") {
        e.preventDefault()
        close()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, close, openDrawer])

  // Focus the card when the drawer opens; close on navigation.
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30)
  }, [open])
  // Pulling a card closes the drawer before navigating; this catches back/forward.
  const lastPath = useRef(pathname)
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname
      if (open) setTimeout(close, 0)
    }
  }, [pathname, open, close])

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(results.length - 1, c + 1)) }
    else if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(0, c - 1)) }
    else if (e.key === "Enter") { e.preventDefault(); const it = results[cursor]; if (it) pull(it) }
  }

  return (
    <>
      {/* Hint */}
      {!open && (
        <button
          type="button"
          onClick={openDrawer}
          className="fixed bottom-4 right-4 z-[70] hidden items-center gap-2 rounded-sm border border-sepia/25 bg-paper-light/85 px-2.5 py-1.5 font-typewriter text-[10px] uppercase tracking-[0.2em] text-sepia/60 shadow-sm backdrop-blur-sm transition-colors hover:text-sepia md:flex"
          aria-label="Open the card catalog"
        >
          <span className="rounded-[2px] border border-sepia/30 px-1 leading-none">&#8984;K</span>
          catalog
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[9vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onMouseDown={(e) => { if (e.target === e.currentTarget) close() }}
            style={{ background: "rgba(30, 22, 12, 0.42)", backdropFilter: "blur(2px)" }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Card catalog"
              className="relative w-full max-w-xl"
              initial={{ y: -60, opacity: 0, rotateX: 12 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -30, opacity: 0, transition: { duration: 0.15 } }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              style={{ transformPerspective: 1200 }}
            >
              {/* Drawer front */}
              <div
                className="relative rounded-t-md px-5 pt-3 pb-2"
                style={{
                  background: "linear-gradient(180deg, #6a4a2c 0%, #4e3520 60%, #3b2816 100%)",
                  boxShadow: "0 -1px 0 rgba(255,255,255,0.08) inset, 0 12px 30px rgba(0,0,0,0.35)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 rounded-[3px] border border-[#d4b46a] bg-[#b8965c] px-2 py-0.5 text-[#3b2816] shadow-inner">
                    <span className="font-typewriter text-[10px] uppercase tracking-[0.3em]">Catalog</span>
                  </div>
                  <div className="flex items-center gap-3 font-typewriter text-[9px] uppercase tracking-[0.2em] text-[#e8dcc8]/60">
                    <span>&#8593;&#8595; browse</span>
                    <span>&#9166; pull</span>
                    <span>esc close</span>
                  </div>
                </div>
                {/* Brass pull */}
                <div aria-hidden className="mx-auto mt-2 h-2 w-16 rounded-full" style={{ background: "linear-gradient(180deg, #d4b46a, #8a6a30)", boxShadow: "0 1px 2px rgba(0,0,0,0.5)" }} />
              </div>

              {/* Drawer interior */}
              <div className="rounded-b-md px-4 pb-4 pt-3" style={{ background: "linear-gradient(180deg, #2f2014 0%, #1f1509 100%)", boxShadow: "inset 0 6px 14px rgba(0,0,0,0.5)" }}>
                {/* Search card */}
                <label className="relative block rounded-sm bg-paper-light px-4 py-3" style={{ boxShadow: "0 3px 8px rgba(0,0,0,0.35)" }}>
                  <span className="sr-only">Search the catalog</span>
                  <span aria-hidden className="absolute left-0 top-0 bottom-0 w-px bg-stamp-red/40 ml-9" />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); setCursor(0) }}
                    onKeyDown={onInputKey}
                    placeholder="a page, a project, a song on the radio…"
                    autoComplete="off"
                    spellCheck={false}
                    className="w-full bg-transparent pl-8 font-serif text-xl text-ink placeholder:text-sepia/40 focus:outline-none"
                  />
                  <span aria-hidden className="absolute right-4 top-1/2 -translate-y-1/2 font-typewriter text-[9px] uppercase tracking-[0.25em] text-sepia/40">
                    {query ? `${results.length} card${results.length === 1 ? "" : "s"}` : "index"}
                  </span>
                </label>

                {/* Cards */}
                <ul className="mt-3 space-y-1.5" role="listbox" aria-label="Results">
                  {results.length === 0 && (
                    <li className="rounded-sm bg-paper-light/90 px-4 py-3 font-handwriting text-lg text-sepia/70">nothing filed under that. try a project, a city, or a song.</li>
                  )}
                  {results.map((it, i) => {
                    const active = i === cursor
                    return (
                      <li key={it.id} role="option" aria-selected={active}>
                        <button
                          type="button"
                          onMouseEnter={() => setCursor(i)}
                          onClick={() => pull(it)}
                          className={`group relative flex w-full items-center gap-3 rounded-sm px-4 py-2.5 text-left transition-transform ${active ? "bg-paper-light -translate-y-0.5" : "bg-paper-light/85 hover:bg-paper-light"}`}
                          style={{ boxShadow: active ? "0 6px 14px rgba(0,0,0,0.4)" : "0 2px 4px rgba(0,0,0,0.3)" }}
                        >
                          <span className={`shrink-0 rounded-[2px] border px-1.5 py-0.5 font-typewriter text-[8px] uppercase tracking-[0.2em] ${active ? "border-brass text-brass" : "border-sepia/30 text-sepia/55"}`}>
                            {KIND_LABEL[it.kind]}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-serif text-base text-ink">{it.title}</span>
                            {it.subtitle && <span className="block truncate font-handwriting text-sm text-sepia/70">{it.subtitle}</span>}
                          </span>
                          {active && <span aria-hidden className="font-typewriter text-[10px] text-brass">&#9166;</span>}
                        </button>
                      </li>
                    )
                  })}
                </ul>
                {!query && recent.length > 0 && (
                  <p className="mt-3 font-typewriter text-[9px] uppercase tracking-[0.25em] text-[#e8dcc8]/45">recently pulled cards first</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
