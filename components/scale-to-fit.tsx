"use client"

import { useEffect, useRef, useState } from "react"
import { useCork } from "@/contexts/cork"

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
  const cork = useCork()
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
      style={{ background: cork.bgColor }}
    >
      {/* Cork base — fills viewport so bands extend the cork seamlessly */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: cork.base }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: cork.speckle,
          backgroundSize: cork.speckleSize,
          opacity: 0.85,
        }}
      />
      <div
        style={{
          width: designWidth,
          height: designHeight,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink: 0,
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  )
}
