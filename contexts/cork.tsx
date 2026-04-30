"use client"

import { createContext, useContext, useState, useEffect } from "react"

export interface CorkDesign {
  base: string
  speckle: string
  speckleSize: string
  bgColor: string
}

export interface FrameDesign {
  dark: string
  light: string
  glow: string
}

export const DARK_FRAME_PALETTE: FrameDesign[] = [
  { dark: "#2d3e30", light: "#4a5d45", glow: "30, 50, 35" },
  { dark: "#3d2817", light: "#5c3d22", glow: "60, 40, 20" },
  { dark: "#1e2a44", light: "#344260", glow: "25, 35, 60" },
  { dark: "#4a1f1f", light: "#6b3030", glow: "70, 30, 30" },
  { dark: "#2a2a2a", light: "#454545", glow: "40, 40, 40" },
  { dark: "#3a2545", light: "#553a62", glow: "55, 35, 70" },
  { dark: "#1f3a3a", light: "#345454", glow: "30, 60, 60" },
  { dark: "#3d2a1a", light: "#5c4024", glow: "60, 40, 25" },
]

export const CORK_DESIGNS: CorkDesign[] = [
  {
    base: "radial-gradient(ellipse at center, #e8d4a8 0%, #d4bc88 70%, #b89a66 100%)",
    speckle: `
      radial-gradient(circle at 15% 20%, rgba(90,60,25,0.35) 0.8px, transparent 1.5px),
      radial-gradient(circle at 42% 65%, rgba(110,75,30,0.3) 1px, transparent 1.8px),
      radial-gradient(circle at 78% 35%, rgba(75,50,20,0.38) 0.6px, transparent 1.3px),
      radial-gradient(circle at 25% 85%, rgba(120,85,35,0.28) 1.2px, transparent 2px),
      radial-gradient(circle at 60% 15%, rgba(85,55,22,0.32) 0.7px, transparent 1.4px),
      radial-gradient(circle at 88% 75%, rgba(100,70,28,0.3) 0.9px, transparent 1.6px),
      radial-gradient(circle at 5% 50%, rgba(80,55,22,0.35) 0.8px, transparent 1.5px),
      radial-gradient(circle at 50% 50%, rgba(115,80,32,0.22) 1px, transparent 1.7px)
    `,
    speckleSize: "40px 40px, 55px 55px, 30px 30px, 70px 70px, 45px 45px, 60px 60px, 35px 35px, 50px 50px",
    bgColor: "#dcc8a0",
  },
  {
    base: `
      radial-gradient(ellipse at 30% 20%, #f5edd8 0%, #ede0c4 40%, #ddd0b0 100%),
      linear-gradient(170deg, rgba(255,248,230,0.6) 0%, transparent 60%)
    `,
    speckle: `
      radial-gradient(circle at 12% 22%, rgba(120,90,40,0.12) 1.5px, transparent 3px),
      radial-gradient(circle at 40% 60%, rgba(100,75,30,0.1) 1px, transparent 2.5px),
      radial-gradient(circle at 70% 18%, rgba(110,82,35,0.13) 1.8px, transparent 3.5px),
      radial-gradient(circle at 85% 72%, rgba(90,68,28,0.1) 1.2px, transparent 2.8px),
      radial-gradient(circle at 25% 80%, rgba(115,85,38,0.11) 1px, transparent 2.2px),
      radial-gradient(circle at 58% 90%, rgba(105,78,32,0.12) 1.4px, transparent 2.6px),
      radial-gradient(circle at 92% 35%, rgba(95,70,28,0.1) 1.6px, transparent 3px),
      radial-gradient(circle at 48% 42%, rgba(108,80,33,0.09) 2px, transparent 4px)
    `,
    speckleSize: "80px 80px, 65px 65px, 90px 90px, 72px 72px, 58px 58px, 85px 85px, 70px 70px, 95px 95px",
    bgColor: "#ede0c4",
  },
  {
    base: `
      radial-gradient(ellipse at 65% 35%, #e8c9a0 0%, #d4a878 55%, #c09060 100%),
      linear-gradient(135deg, rgba(180,100,60,0.08) 0%, transparent 70%)
    `,
    speckle: `
      radial-gradient(circle at 18% 15%, rgba(130,65,30,0.3) 1px, transparent 2px),
      radial-gradient(circle at 45% 55%, rgba(110,55,25,0.25) 1.5px, transparent 3px),
      radial-gradient(circle at 72% 28%, rgba(140,70,32,0.28) 0.8px, transparent 1.8px),
      radial-gradient(circle at 30% 75%, rgba(120,60,28,0.22) 1.2px, transparent 2.5px),
      radial-gradient(circle at 60% 82%, rgba(115,58,26,0.26) 1px, transparent 2.2px),
      radial-gradient(circle at 88% 50%, rgba(105,52,24,0.24) 1.4px, transparent 2.8px),
      radial-gradient(circle at 8% 60%, rgba(125,62,29,0.28) 0.9px, transparent 1.9px),
      radial-gradient(circle at 52% 30%, rgba(118,59,27,0.2) 1.6px, transparent 3px)
    `,
    speckleSize: "42px 42px, 58px 58px, 35px 35px, 64px 64px, 48px 48px, 54px 54px, 39px 39px, 66px 66px",
    bgColor: "#d8b888",
  },
  {
    base: `
      radial-gradient(ellipse at 50% 60%, #d8d4b8 0%, #c8c4a4 55%, #b0ac8c 100%),
      linear-gradient(45deg, rgba(80,90,60,0.06) 0%, transparent 60%)
    `,
    speckle: `
      radial-gradient(circle at 20% 25%, rgba(80,85,55,0.2) 1.2px, transparent 2.5px),
      radial-gradient(circle at 50% 65%, rgba(70,75,48,0.17) 1px, transparent 2px),
      radial-gradient(circle at 75% 22%, rgba(85,88,58,0.22) 1.5px, transparent 3px),
      radial-gradient(circle at 35% 82%, rgba(75,80,52,0.18) 0.8px, transparent 1.8px),
      radial-gradient(circle at 65% 75%, rgba(78,82,54,0.2) 1.3px, transparent 2.6px),
      radial-gradient(circle at 90% 48%, rgba(72,76,50,0.18) 1px, transparent 2.2px),
      radial-gradient(circle at 10% 70%, rgba(82,86,56,0.2) 1.4px, transparent 2.8px),
      radial-gradient(circle at 44% 38%, rgba(76,80,52,0.15) 1.8px, transparent 3.5px)
    `,
    speckleSize: "52px 52px, 68px 68px, 40px 40px, 75px 75px, 46px 46px, 62px 62px, 55px 55px, 80px 80px",
    bgColor: "#ccc8a8",
  },
]

interface CorkContextValue {
  cork: CorkDesign
  frame: FrameDesign
}

const CorkContext = createContext<CorkContextValue>({ cork: CORK_DESIGNS[0], frame: DARK_FRAME_PALETTE[0] })

export function CorkProvider({ children }: { children: React.ReactNode }) {
  const [cork, setCork] = useState<CorkDesign>(CORK_DESIGNS[0])
  const [frame, setFrame] = useState<FrameDesign>(DARK_FRAME_PALETTE[0])
  useEffect(() => {
    setCork(CORK_DESIGNS[Math.floor(Math.random() * CORK_DESIGNS.length)])
    setFrame(DARK_FRAME_PALETTE[Math.floor(Math.random() * DARK_FRAME_PALETTE.length)])
    let timeout: ReturnType<typeof setTimeout>
    const cycle = () => {
      timeout = setTimeout(() => {
        setFrame(curr => {
          let next = curr
          while (next === curr) next = DARK_FRAME_PALETTE[Math.floor(Math.random() * DARK_FRAME_PALETTE.length)]
          return next
        })
        cycle()
      }, 3000 + Math.random() * 1000)
    }
    cycle()
    return () => clearTimeout(timeout)
  }, [])
  return <CorkContext.Provider value={{ cork, frame }}>{children}</CorkContext.Provider>
}

export function useCork() {
  return useContext(CorkContext).cork
}

export function useFrame() {
  return useContext(CorkContext).frame
}
