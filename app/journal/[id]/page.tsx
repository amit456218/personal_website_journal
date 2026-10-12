import { redirect } from "next/navigation"

// The atlas is a "coming soon" note for now; the entries in lib/journal-data.ts
// are placeholders, so individual pages send visitors back to it.
export default function JournalEntryPage() {
  redirect("/atlas")
}
