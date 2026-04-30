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
      year: "2024",
      title: "Dean's List, Honors with Distinction",
      issuer: "University of Illinois Urbana-Champaign",
      description:
        "Awarded across consecutive semesters for sustained academic excellence in computer science and design coursework.",
    },
    {
      year: "2024",
      title: "Best Student Project — HCI Capstone",
      issuer: "Department of Computer Science, UIUC",
      description:
        "For a research-driven interaction design that turned a year of fieldwork into a working prototype.",
    },
    {
      year: "2023",
      title: "Hackillinois — Top 10 Finalist",
      issuer: "Hackillinois Organizing Committee",
      description:
        "Built a calm-tech interface for first-time travelers; selected from 600+ submissions.",
    },
    {
      year: "2022",
      title: "Outstanding Junior Designer",
      issuer: "Impekable",
      description:
        "Recognized for craft, ownership, and the quiet kind of leadership that ships.",
    },
  ],

  skills: [
    {
      heading: "Design",
      items: [
        "Product Design",
        "Interaction",
        "Typography",
        "Brand Systems",
        "Prototyping",
        "Motion",
      ],
    },
    {
      heading: "Engineering",
      items: [
        "TypeScript",
        "React / Next.js",
        "Framer Motion",
        "Tailwind",
        "Node",
        "WebGL",
        "Python",
      ],
    },
    {
      heading: "Tools",
      items: [
        "Figma",
        "Rhino",
        "Blender",
        "Webflow",
        "After Effects",
        "Photoshop",
      ],
    },
    {
      heading: "Languages",
      items: ["English", "Hindi", "French (conversational)"],
    },
  ],
}
