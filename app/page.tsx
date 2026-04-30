"use client"

import { Desk } from "@/components/desk"
import { ScaleToFit } from "@/components/scale-to-fit"
import { MobileDesk } from "@/components/mobile-desk"
import { useIsMobile } from "@/hooks/use-mobile"

export default function Home() {
  const isMobile = useIsMobile()

  return (
    <main className="relative">
      {isMobile ? (
        <MobileDesk />
      ) : (
        <ScaleToFit>
          <Desk />
        </ScaleToFit>
      )}
    </main>
  )
}
