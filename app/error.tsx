'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center px-8 text-center"
      style={{ background: 'radial-gradient(ellipse at center, #f7eed5 0%, #ecdfbe 60%, #d8c79a 100%)' }}
    >
      <p className="font-typewriter text-[11px] uppercase tracking-[0.45em] text-sepia/55">
        A smudge on the page
      </p>
      <h1 className="mt-5 font-serif text-5xl leading-[0.95] tracking-tight text-ink md:text-6xl">
        The ink <span className="italic font-light text-brass">ran</span>.
      </h1>
      <p className="mx-auto mt-6 max-w-md font-handwriting text-xl text-sepia/80">
        Something went wrong rendering this entry. Trying again usually settles it.
      </p>
      <div className="mt-10 flex items-center gap-8">
        <button
          onClick={reset}
          className="font-typewriter text-[11px] uppercase tracking-[0.3em] text-sepia/70 underline-offset-8 transition-colors hover:text-ink hover:underline"
        >
          Try again
        </button>
        {/* A plain anchor on purpose: a full document load discards whatever
            client state caused the error, which a soft <Link> nav would keep. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/"
          className="font-typewriter text-[11px] uppercase tracking-[0.3em] text-sepia/70 underline-offset-8 transition-colors hover:text-ink hover:underline"
        >
          &larr; Back to the desk
        </a>
      </div>
      {error.digest && (
        <p className="mt-8 font-typewriter text-[10px] tracking-widest text-sepia/40">
          ref {error.digest}
        </p>
      )}
    </main>
  )
}
