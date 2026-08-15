import { AwardsPage } from "@/components/awards-page"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Awards & Skills',
  description: 'A short ledger of recognition — honors, distinctions and the craft behind them.',
}

export default function Page() {
  return <AwardsPage />
}
