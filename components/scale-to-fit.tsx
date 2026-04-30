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
        // Cover-fit: scale up so the design fills the viewport (crops sides for portrait)
        setScale(Math.max(w / designWidth, h / designHeight))
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
