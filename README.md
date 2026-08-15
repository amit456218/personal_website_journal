# personal_website_journal

Personal portfolio for Amitabh Gulati, built as a worn vintage travel journal.
Live at **[amitabhgulati.com](https://amitabhgulati.com)**.

The landing page is a cork-board desk of physical objects — a passport, a field
notebook, a record sleeve, a radio — each of which is a link into a section.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind 4 · Framer Motion · TypeScript
Deployed on Vercel; DNS at Cloudflare.

## Running locally

Requires Node 20+ and pnpm.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Other scripts:

```bash
pnpm build        # production build — type-checked, will fail on type errors
pnpm lint         # eslint
```

`pnpm dev` re-runs `install` on startup, so a blocked package build script will
stop the dev server before it boots. `pnpm-workspace.yaml` allowlists the build
scripts this project needs.

## Environment

Optional — the site renders fine without them; only the Spotify-backed pieces go quiet.

| Variable | Purpose |
| --- | --- |
| `SPOTIFY_CLIENT_ID` | Spotify app credentials, for the authenticated API routes |
| `SPOTIFY_CLIENT_SECRET` | ” |
| `SPOTIFY_REFRESH_TOKEN` | Long-lived token; mint it via the one-time flow below |
| `SPOTIFY_PLAYLIST_ID` | Overrides the playlist the music page pulls from |

To mint a refresh token: add `http://127.0.0.1:3000/api/spotify/callback` as a
redirect URI on your Spotify app, set the ID and secret in `.env.local`, run
`pnpm dev`, and visit `http://127.0.0.1:3000/api/spotify/login`. The callback
returns the refresh token as JSON. Use `127.0.0.1`, not `localhost` — the
redirect URI has to match exactly.

## Layout

```
app/            routes; each page is a thin server component that sets metadata
  api/spotify/  Spotify routes (see caveat below)
components/     page components
  desk/         the individual objects on the cork board
contexts/       cork palette, Spotify player state
lib/            content data — work, awards, journal entries, desk copy
```

Content lives in `lib/*-data.ts`, deliberately separated from the components
that render it, so copy can be edited without touching layout.

## Caveats

**The music page depends on a scrape.** Spotify removed `preview_url` from the
Web API for apps created after November 2024, so `app/api/spotify/preview-playlist`
reads the track list out of the public embed page's `__NEXT_DATA__` instead.
That is unofficial and can break whenever Spotify changes the embed payload — it
already did once, when a new field broke the regex this previously used. The
playlist must be **public**; a private or empty one returns an embed with no
track list, and the player falls back to a disabled state.

**Random values must not be used during render.** Server and browser compute
them differently, which desynchronises hydration and leaves React unable to
patch the mismatched subtree. Use `lib/seeded-random.ts` for the hand-placed
look instead. `react-hooks/purity` catches regressions.

**This repo is linked to a [v0](https://v0.app) project** that can push commits
straight to `main`. Editing by hand and via v0 chats at the same time will
conflict. Pick one workflow.
