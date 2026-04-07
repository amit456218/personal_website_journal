"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

interface StampProps {
  text: string
  type: "round" | "rectangle"
  color: "red" | "blue" | "green"
  rotation?: number
  index?: number
}

const colorMap = {
  red: {
    border: "border-stamp-red",
    text: "text-stamp-red",
    bg: "bg-stamp-red"
  },
  blue: {
    border: "border-stamp-blue",
    text: "text-stamp-blue",
    bg: "bg-stamp-blue"
  },
  green: {
    border: "border-forest",
    text: "text-forest",
    bg: "bg-forest"
  }
}

export function Stamp({ text, type, color, rotation = 0, index = 0 }: StampProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  
  const colors = colorMap[color]
  const randomRotation = rotation || (Math.random() * 20 - 10)
  
  if (type === "round") {
    return (
      <motion.div
        ref={ref}
        className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full border-2 ${colors.border} flex items-center justify-center`}
        style={{ transform: `rotate(${randomRotation}deg)` }}
        initial={{ scale: 1.5, opacity: 0, rotate: randomRotation - 10 }}
        animate={isInView ? { 
          scale: 1, 
          opacity: 0.85, 
          rotate: randomRotation 
        } : {}}
        transition={{ 
          duration: 0.4, 
          delay: index * 0.1,
          type: "spring",
          stiffness: 300,
          damping: 15
        }}
      >
        {/* Double border effect */}
        <div className={`absolute inset-1 rounded-full border ${colors.border} opacity-60`} />
        
        {/* Text */}
        <div className="text-center px-2">
          {text.split('\n').map((line, i) => (
            <p 
              key={i} 
              className={`font-typewriter text-[10px] md:text-xs ${colors.text} leading-tight whitespace-nowrap`}
            >
              {line}
            </p>
          ))}
        </div>
        
        {/* Faded/worn effect */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none opacity-30"
          style={{
            background: "radial-gradient(circle at 30% 30%, transparent 60%, rgba(244, 236, 216, 0.5) 100%)"
          }}
        />
      </motion.div>
    )
  }
  
  return (
    <motion.div
      ref={ref}
      className={`relative px-4 py-2 md:px-5 md:py-3 border-2 ${colors.border}`}
      style={{ transform: `rotate(${randomRotation}deg)` }}
      initial={{ scale: 1.5, opacity: 0, rotate: randomRotation - 10 }}
      animate={isInView ? { 
        scale: 1, 
        opacity: 0.85, 
        rotate: randomRotation 
      } : {}}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 15
      }}
    >
      {/* Text */}
      <div className="text-center">
        {text.split('\n').map((line, i) => (
          <p 
            key={i} 
            className={`font-typewriter text-xs md:text-sm ${colors.text} leading-tight whitespace-nowrap`}
          >
            {line}
          </p>
        ))}
      </div>
      
      {/* Faded effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: "linear-gradient(135deg, transparent 50%, rgba(244, 236, 216, 0.6) 100%)"
        }}
      />
    </motion.div>
  )
}
