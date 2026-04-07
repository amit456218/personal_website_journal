import { notFound } from "next/navigation"
import { journalEntries } from "@/lib/journal-data"
import { JournalSpread } from "@/components/journal-spread"

export function generateStaticParams() {
  return journalEntries.map((entry) => ({
    id: entry.id,
  }))
}

export async function generateMetadata(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const entry = journalEntries.find((e) => e.id === params.id)
  
  if (!entry) {
    return {
      title: "Entry Not Found | Travel Journal",
    }
  }
  
  return {
    title: `${entry.title} — ${entry.location} | Travel Journal`,
    description: entry.excerpt,
  }
}

export default async function JournalEntryPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const entry = journalEntries.find((e) => e.id === params.id)
  
  if (!entry) {
    notFound()
  }
  
  return <JournalSpread entry={entry} />
}
