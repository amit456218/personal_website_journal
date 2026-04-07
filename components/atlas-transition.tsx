"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function AtlasTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [showTransition, setShowTransition] = useState(false)
  const [transitionDirection, setTransitionDirection] = useState<"to-atlas" | "from-atlas" | null>(null)

  useEffect(() => {
    // Check sessionStorage for transition flag
    const shouldTransition = sessionStorage.getItem("atlas-transition")
    if (shouldTransition) {
      setTransitionDirection(shouldTransition as "to-atlas" | "from-atlas")
      setShowTransition(true)
      sessionStorage.removeItem("atlas-transition")
      
      // Hide transition after animation completes
      const timer = setTimeout(() => {
        setShowTransition(false)
        setTransitionDirection(null)
      }, 1500)
      
      return () => clearTimeout(timer)
    }
  }, [pathname])

  return (
    <>
      {children}
      
      <AnimatePresence>
        {showTransition && transitionDirection === "to-atlas" && (
          <motion.div
            className="fixed inset-0 z-[100] pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            {/* Folded map that unfolds */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ scale: 0.15 }}
              animate={{ scale: 1.5 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div 
                className="w-full h-full"
                style={{ background: "#e8dcc8" }}
              >
                {/* Map unfold animation layers */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ 
                    clipPath: "polygon(45% 45%, 55% 45%, 55% 55%, 45% 55%)" 
                  }}
                  animate={{ 
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" 
                  }}
                  transition={{ 
                    duration: 1, 
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.1
                  }}
                  style={{ background: "#e8dcc8" }}
                >
                  {/* Fold lines that fade out */}
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    {/* Horizontal fold */}
                    <div 
                      className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2"
                      style={{ 
                        background: "linear-gradient(90deg, transparent 5%, rgba(92, 74, 50, 0.3) 20%, rgba(92, 74, 50, 0.3) 80%, transparent 95%)",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
                      }}
                    />
                    {/* Vertical folds */}
                    <div 
                      className="absolute top-0 bottom-0 left-1/3 w-0.5"
                      style={{ 
                        background: "linear-gradient(180deg, transparent 5%, rgba(92, 74, 50, 0.2) 20%, rgba(92, 74, 50, 0.2) 80%, transparent 95%)" 
                      }}
                    />
                    <div 
                      className="absolute top-0 bottom-0 right-1/3 w-0.5"
                      style={{ 
                        background: "linear-gradient(180deg, transparent 5%, rgba(92, 74, 50, 0.2) 20%, rgba(92, 74, 50, 0.2) 80%, transparent 95%)" 
                      }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Paper texture overlay */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                backgroundImage: "url('/textures/paper-texture.jpg')",
                backgroundSize: "400px",
                mixBlendMode: "multiply",
                pointerEvents: "none"
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
