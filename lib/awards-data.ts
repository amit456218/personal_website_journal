// Honors, distinctions, and the craft beneath them.
// Edit freely — the page renders whatever's here.

export interface Award {
  year: string
  title: string
  issuer: string
  description?: string
}

export interface SkillGroup {
  heading: string
  items: string[]
}

export const awardsData: {
  heroLine: string
  awards: Award[]
  skills: SkillGroup[]
} = {
  heroLine:
    "A short ledger of recognition — for the work, the patience, and the people who said yes.",

  awards: [
    {
      year: "2026",
      title: "1st Place",
      issuer: "Illinois Trading Competition",
    },
    {
      year: "H.S.",
      title: "USACO Gold",
      issuer: "USA Computing Olympiad",
      description:
        "Self-taught, about four hours a day for months on top of school. Gold problems can't be brute-forced and give no partial credit, so most of that time went into failed contests and working back through the problems I couldn't solve until I'd learned the missing technique.",
    },
    {
      year: "H.S.",
      title: "AIME Qualifier (2x) with Distinction",
      issuer: "Mathematical Association of America",
    },
  ],

  skills: [
    {
      heading: "Languages",
      items: ["Python", "C++", "C", "Java", "TypeScript", "SQL", "Bash"],
    },
    {
      heading: "Systems",
      items: [
        "Concurrency",
        "Memory Management",
        "TCP / epoll Networking",
        "JVM & Heap Profiling",
        "Metal GPU Kernels",
        "RTOS & Device Drivers",
      ],
    },
    {
      heading: "ML & AI",
      items: [
        "PyTorch",
        "TensorFlow / Keras",
        "XGBoost",
        "Hugging Face",
        "LangGraph",
        "RAG & Vector Search",
      ],
    },
    {
      heading: "Web & Cloud",
      items: [
        "React / Next.js",
        "FastAPI",
        "PostgreSQL",
        "Google Cloud",
        "AWS",
        "Docker & Kubernetes",
      ],
    },
  ],
}
