"use client"

import { useEffect, useRef, useState } from "react"

interface ScaleToFitProps {
  designWidth?: number
  designHeight?: number
  children: React.ReactNode
}

export function ScaleToFit({
  designWidth = 1280,
  designHeight = 800,
  children,
}: ScaleToFitProps) {
  const [scale, setScale] = useState(1)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const next = Math.min(w / designWidth, h / designHeight, 1)
      setScale(next)
    }
    compute()
    window.addEventListener("resize", compute)
    return () => window.removeEventListener("resize", compute)
  }, [designWidth, designHeight])

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 overflow-hidden flex items-center justify-center"
      style={{ background: "#dcc8a0" }}
    >
      <div
        style={{
          width: designWidth,
          height: designHeight,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink: 0,
        }}
      >
        {children}
      </div>
    </div>
  )
}
