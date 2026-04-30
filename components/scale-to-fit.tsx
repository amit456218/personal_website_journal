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
  const [scaleX, setScaleX] = useState(1)
  const [scaleY, setScaleY] = useState(1)
  const [fill, setFill] = useState(true)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      if (w >= 768) {
        setFill(true)
        setScaleX(1); setScaleY(1)
      } else {
        setFill(false)
        // Stretch independently to fill the full viewport (no letterboxing)
        setScaleX(w / designWidth)
        setScaleY(h / designHeight)
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
      className="fixed inset-0 overflow-hidden"
    >
      <div
        style={{
          width: designWidth,
          height: designHeight,
          transform: `scale(${scaleX}, ${scaleY})`,
          transformOrigin: "top left",
          flexShrink: 0,
        }}
      >
        {children}
      </div>
    </div>
  )
}
