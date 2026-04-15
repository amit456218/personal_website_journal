export interface WorkExperience {
  id: string
  company: string
  subtitle?: string
  role: string
  period: string
  location: string
  description: string
  highlights: string[]
  artifactType: "passport" | "luggage-tag" | "visa" | "boarding-pass"
}

export const workExperiences: WorkExperience[] = [
  {
    id: "impekable",
    company: "Impekable",
    role: "Product Designer",
    period: "2022",
    location: "San Francisco, CA",
    description: "Designed enterprise solutions for Fortune 500 clients, focusing on complex data visualization and user workflows.",
    highlights: [
      "Led design for 3 major product launches",
      "Established design system used across 12 products",
      "Reduced user onboarding time by 40%"
    ],
    artifactType: "passport"
  },
  // {
  //   id: "google-rfn",
  //   company: "Google",
  //   subtitle: "RFN Tech",
  //   role: "UX Engineer",
  //   period: "2023",
  //   location: "Mountain View, CA",
  //   description: "Built interactive prototypes and design tools for Google's internal teams, bridging design and engineering.",
  //   highlights: [
  //     "Developed 5 internal design tools",
  //     "Collaborated with 20+ product teams",
  //     "Pioneered new prototyping workflows"
  //   ],
  //   artifactType: "visa"
  // },
  {
    id: "butterflo",
    company: "Butterflo",
    role: "Senior Designer",
    period: "2024",
    location: "Remote",
    description: "Shaped the visual identity and product experience for an emerging fintech startup focused on creator payments.",
    highlights: [
      "Designed brand identity from scratch",
      "Built component library with 80+ components",
      "Increased conversion rate by 25%"
    ],
    artifactType: "luggage-tag"
  },
  {
    id: "cme-group",
    company: "CME Group",
    role: "Design Lead",
    period: "Incoming",
    location: "Chicago, IL",
    description: "Leading design initiatives for derivatives trading platforms, focusing on real-time data and complex financial instruments.",
    highlights: [
      "Enterprise trading platform redesign",
      "Real-time data visualization systems",
      "Global design team leadership"
    ],
    artifactType: "boarding-pass"
  }
]
