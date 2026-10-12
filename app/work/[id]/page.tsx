import { redirect } from "next/navigation"

// The archive is a "coming soon" note for now; the entries in lib/work-data.ts
// are placeholders, so individual pages send visitors back to it.
export default function WorkDetail() {
  redirect("/work")
}
