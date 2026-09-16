import type { Metadata } from "next"
import { fetchDispatches } from "@/lib/dispatches"
import { DispatchesFeed } from "@/components/dispatches-feed"

export const metadata: Metadata = {
  title: "Dispatches",
  description: "Telegrams from the workshop: what's been happening on GitHub.",
}

export const revalidate = 900

export default async function DispatchesPage() {
  let dispatches: Awaited<ReturnType<typeof fetchDispatches>> = []
  try {
    dispatches = await fetchDispatches(12)
  } catch (e) {
    console.warn("[dispatches] page fetch failed:", e)
  }
  return <DispatchesFeed dispatches={dispatches} fetchedAt={new Date().toISOString()} />
}
