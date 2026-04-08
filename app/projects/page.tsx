import Link from "next/link"

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-paper-dark p-8">
      {/* Back to Desk */}
      <Link 
        href="/"
        className="inline-flex items-center gap-2 font-handwriting text-sepia/70 hover:text-sepia transition-colors mb-8"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Desk
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl text-ink mb-2">Field Notes</h1>
        <p className="font-handwriting text-xl text-sepia/70 mb-12">A collection of projects and experiments</p>
        
        <div className="grid gap-6">
          {/* Placeholder project cards */}
          <div className="bg-paper-light p-6 rounded shadow-md border border-border">
            <span className="font-typewriter text-xs text-sepia/50 uppercase tracking-wider">Coming Soon</span>
            <h2 className="font-serif text-2xl text-ink mt-2">Projects will appear here</h2>
            <p className="font-handwriting text-lg text-sepia/70 mt-2">
              This page is under construction. Check back soon for a collection of work and experiments.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
