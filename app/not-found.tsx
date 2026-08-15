import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center px-8 text-center"
      style={{ background: 'radial-gradient(ellipse at center, #f7eed5 0%, #ecdfbe 60%, #d8c79a 100%)' }}
    >
      <p className="font-typewriter text-[11px] uppercase tracking-[0.45em] text-sepia/55">
        Page 404 of the journal
      </p>
      <h1 className="mt-5 font-serif text-6xl leading-[0.95] tracking-tight text-ink md:text-7xl">
        This page came <span className="italic font-light text-brass">unstuck</span>.
      </h1>
      <p className="mx-auto mt-6 max-w-md font-handwriting text-xl text-sepia/80">
        Some entries fall out of the binding. Whatever was here has wandered off.
      </p>
      <Link
        href="/"
        className="mt-10 font-typewriter text-[11px] uppercase tracking-[0.3em] text-sepia/70 underline-offset-8 transition-colors hover:text-ink hover:underline"
      >
        &larr; Back to the desk
      </Link>
    </main>
  )
}
