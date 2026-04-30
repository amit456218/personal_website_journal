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
  const [fill, setFill] = useState(true)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      if (w >= 768) {
        setFill(true)
        setScale(1)
      } else {
        setFill(false)
        // Contain-fit: scale proportionally; shows narrow bands on portrait phones
        setScale(Math.min(w / designWidth, h / designHeight))
      }
    }
    compute()
    window.addEventListener("resize", compute)
    return () => window.removeEventListener("resize", compute)
  }, [designWidth, designHeight])

  if (fill) {
    return <div className="fixed inset-0">{children}</div>
  }

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 overflow-hidden flex items-center justify-center"
      style={{
        background: `
          radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.04) 0%, transparent 50%),
          repeating-radial-gradient(circle at 20% 30%, rgba(120,90,55,0.10) 0px, transparent 3px),
          repeating-radial-gradient(circle at 70% 60%, rgba(140,100,60,0.08) 0px, transparent 4px),
          repeating-radial-gradient(circle at 40% 80%, rgba(100,75,45,0.10) 0px, transparent 3px),
          linear-gradient(180deg, #c4a878 0%, #b89a66 100%)
        `,
      }}
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
