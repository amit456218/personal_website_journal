// Field notes — projects and experiments.
// Edit freely: the /projects pages render whatever's here.
// Entries are listed newest first; `tier` decides how much room each one gets.

export interface ProjectLink {
  label: string
  href: string
}

export interface Project {
  slug: string
  title: string
  tagline: string
  year: string
  kind: string
  stack: string[]
  summary: string
  highlights?: string[]
  links?: ProjectLink[]
  /** The code exists but the repository isn't public. */
  privateSource?: boolean
  tier: "field-work" | "earlier"
}

export const projects: Project[] = [
  {
    slug: "caught",
    title: "Caught",
    tagline: "A desk camera that learns your bad habits and, at the end of the week, shows you the chart.",
    year: "2026",
    kind: "Computer vision · Personal model",
    stack: ["Python", "MediaPipe", "YOLO11n", "PyTorch (Metal)", "FastAPI"],
    summary:
      "Caught runs all day on a Mac's built-in camera. It never uploads anything and never stores video. It notices when you pick up your phone, slouch, stare at your lap, chew your nails, rub your eyes, yawn, doze, fidget, eat, drink, look away or leave, and each one becomes an episode with a start, an end and a confidence. A local dashboard shows today's timeline, the week's heatmap, streaks and one uncomfortable bar chart. It does not nag.",
    highlights: [
      "A rule-based detector stack you can read in one sitting, built on MediaPipe and YOLO11n.",
      "A personal temporal model that trains on your own footage, with an active-learning loop that asks about the episodes it is least sure of and retrains overnight.",
      "Focus sessions of 25, 50 or 90 minutes that end with a score: phone pickups, minutes on the phone, longest clean run, posture, and the one thing to fix first.",
      "A weekly report, a menu-bar app, a posture calibration step, and a replay mode that runs recorded clips through the same pipeline for development.",
    ],
    privateSource: true,
    tier: "field-work",
  },
  {
    slug: "llm-inference-engine",
    title: "LLM Inference Engine",
    tagline: "Llama 3 running on Apple Silicon with no PyTorch, no MLX and no llama.cpp.",
    year: "2026",
    kind: "Systems · GPU kernels",
    stack: ["C++20", "Metal", "Objective-C++", "GGUF"],
    summary:
      "An inference engine written from scratch for Apple Silicon. It loads a GGUF model file, tokenizes with a Llama 3 byte-level BPE tokenizer, runs the transformer and generates text. The CPU reference path came first, then Metal GPU kernels compiled at runtime, so the whole thing builds with Command Line Tools alone. The target model is Llama 3.2 3B Instruct, and llama.cpp is the reference for both correctness and speed.",
    highlights: [
      "A GGUF parser that memory-maps tensor data, a Llama 3 tokenizer, and a CPU forward pass that serves as ground truth.",
      "Metal matvec kernels written for the memory-bound decode step: quantized blocks are streamed with one SIMD group per four rows, sharing the input loads.",
      "A sampler with temperature, top-k, top-p and repetition penalty, and a multi-turn chat REPL that keeps the KV cache across turns.",
      "An HTTP server that speaks the OpenAI chat-completions API with streaming over SSE, so any existing client works unchanged.",
      "Tests that check token ids and greedy output against llama.cpp, plus a benchmark scoreboard against it on Metal.",
    ],
    privateSource: true,
    tier: "field-work",
  },
  {
    slug: "kuhn-poker-cfr",
    title: "Kuhn Poker Solver",
    tagline: "A Nash equilibrium solver whose every claim can be checked against a closed-form answer.",
    year: "2026",
    kind: "Game theory · Solver",
    stack: ["TypeScript", "Python", "Next.js", "CFR+"],
    summary:
      "Counterfactual Regret Minimization applied to Kuhn poker, with an exact exploitability measurement and a dashboard for watching an equilibrium converge, playing against it, and being coached on every decision. Kuhn poker was chosen for one reason: its Nash equilibria are known in closed form, which turns every result into something checkable against ground truth rather than against a previous run.",
    highlights: [
      "CFR+ reaches 1.23 × 10⁻⁶ chips per hand of exploitability at 250K iterations, 363× lower than vanilla CFR, and recovers the exact game value of −1/18.",
      "The TypeScript port runs 100,000 iterations in the browser in 0.46 seconds, about 14× faster than the Python reference it was ported from. Both are re-derived and compared on every push.",
      "Duplicate-scored matches against seven rule-based opponents, with exact expected value by enumeration and win rates over 200K simulated hands.",
      "47 passing tests.",
    ],
    links: [
      { label: "Live dashboard", href: "https://amit456218.github.io/kuhn-poker-cfr/" },
      { label: "Repository", href: "https://github.com/amit456218/kuhn-poker-cfr" },
    ],
    tier: "field-work",
  },
  {
    slug: "dental-ai-receptionist",
    title: "AI Receptionist for Dental Clinics",
    tagline: "A voice agent that handles the whole call, not just a script.",
    year: "2026",
    kind: "Voice AI · Agent",
    stack: ["Real-time speech recognition", "Voice pipeline", "Scheduling integration", "Insurance verification"],
    summary:
      "A patient calls in, the agent works out what they want through real-time speech recognition, checks the schedule or verifies their insurance, and books the appointment, all without it feeling like a robot reading options at you. The hard part was making it actually sound like a conversation: knowing when someone is done talking instead of just pausing, and keeping the response fast enough that there is no awkward gap.",
    highlights: [
      "Built the voice pipeline, the scheduling integration and the insurance verification end to end.",
      "Turn-taking that tells a finished thought from a pause mid-sentence.",
      "Response latency kept low enough that the reply lands before the silence gets awkward.",
      "Handles a full booking call, insurance check included, start to finish without anyone stepping in.",
    ],
    privateSource: true,
    tier: "field-work",
  },
  {
    slug: "skimify",
    title: "Skimify",
    tagline: "Instant, no-fluff summaries of whatever you're reading, as you read it.",
    year: "2025",
    kind: "Browser tool · LLM",
    stack: ["TypeScript", "OpenAI API"],
    summary:
      "Skimify gives you the gist of a page in real time. Whether you are scrolling or highlighting text, it jumps in with a summary without breaking your flow: no clicks needed, and a clean overlay that floats with you and never blocks the content underneath.",
    links: [
      { label: "Repository", href: "https://github.com/amit456218/Skimify" },
      { label: "Demo (slow first load)", href: "https://skimify.onrender.com" },
    ],
    tier: "earlier",
  },
  {
    slug: "chagas-disease-detection",
    title: "Chagas Disease Detection",
    tagline: "Early signs of Chagas heart damage, read from ECG and heart-rate variability.",
    year: "2025",
    kind: "Machine learning · Health",
    stack: ["Python", "Random Forest", "XGBoost", "Jupyter"],
    summary:
      "Chagas disease can lead to cardiomyopathy decades after infection; up to 45% of untreated people develop heart disease 10 to 30 years later. Inspired by Dr. Manu Prakash's low-cost Foldscope work, this pipeline predicts early Chagas-related heart damage from ECG and HRV features in the CODE-15 dataset. Physiologically implausible values are filtered on clinical bounds, features are ranked by information gain, and Random Forest and XGBoost models are tuned by cross-validation, reaching 0.72 F1 and 0.78 AUC-ROC under stratified k-fold evaluation.",
    links: [{ label: "Repository", href: "https://github.com/amit456218/Chagas-Disease-Detection" }],
    tier: "earlier",
  },
  {
    slug: "this-journal",
    title: "This Journal",
    tagline: "The site you're reading, built as a worn vintage travel journal.",
    year: "2026",
    kind: "Web · Interaction design",
    stack: ["Next.js 16", "React 19", "Tailwind 4", "Framer Motion", "Web Audio API"],
    summary:
      "A cork-board desk of physical objects, each one a door into a section. The record sleeve plays real preview clips from a Spotify playlist, with a turntable wind-down synthesized in the Web Audio API between tracks, and the radio keeps playing as you move around the site.",
    links: [
      { label: "Repository", href: "https://github.com/amit456218/personal_website_journal" },
    ],
    tier: "earlier",
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
