"use client"

import { motion } from "framer-motion"
import { MapPin } from "./map-pin"
import { CompassRose } from "./compass-rose"
import { IntroCard } from "./intro-card"
import { mapPins } from "@/lib/journal-data"

interface WorldMapProps {
  compact?: boolean
}

export function WorldMap({ compact = false }: WorldMapProps) {
  return (
    <div className={`relative overflow-hidden bg-paper-dark rounded-lg shadow-2xl ${
      compact ? "h-[60vh] w-full" : "min-h-screen w-full"
    }`}>
      {/* Decorative border */}
      <div className={`absolute border-2 border-sepia/30 pointer-events-none z-30 ${
        compact ? "inset-2 md:inset-4" : "inset-4 md:inset-8"
      }`}>
        {/* Corner ornaments */}
        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-sepia/50" />
        <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-sepia/50" />
        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-sepia/50" />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-sepia/50" />
      </div>

      {/* Map title - decorative */}
      <motion.div
        className={`absolute left-1/2 -translate-x-1/2 z-20 text-center ${
          compact ? "top-2 md:top-4" : "top-4 md:top-8"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className={`font-typewriter text-sepia/60 tracking-[0.3em] uppercase ${
          compact ? "text-[10px] md:text-xs" : "text-xs md:text-sm"
        }`}>
          A Chronicle of Wanderings
        </h2>
      </motion.div>

      {/* Intro card - hide in compact mode */}
      {!compact && <IntroCard />}

      {/* Compass Rose - hide in compact mode */}
      {!compact && (
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20">
          <CompassRose />
        </div>
      )}

      {/* Map container */}
      <div className={`relative w-full ${compact ? "h-full" : "h-screen"}`}>
        {/* SVG World Map - simplified vintage style */}
        <motion.svg
          viewBox="0 0 1000 500"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid slice"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Map background */}
          <rect width="1000" height="500" fill="#e8dcc8" />
          
          {/* Grid lines */}
          {Array.from({ length: 19 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 27.78}
              x2="1000"
              y2={i * 27.78}
              stroke="#c4b49a"
              strokeWidth="0.5"
              opacity="0.4"
            />
          ))}
          {Array.from({ length: 37 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 27.78}
              y1="0"
              x2={i * 27.78}
              y2="500"
              stroke="#c4b49a"
              strokeWidth="0.5"
              opacity="0.4"
            />
          ))}
          
          {/* Continents - simplified vintage style shapes */}
          {/* North America */}
          <path
            d="M50,80 Q120,60 180,80 Q220,100 240,140 Q250,180 230,220 Q200,250 160,260 Q140,280 100,300 Q80,280 60,250 Q40,200 50,150 Q45,120 50,80 Z"
            fill="#d4c5a9"
            stroke="#a89878"
            strokeWidth="1.5"
          />
          {/* Greenland */}
          <path
            d="M280,40 Q320,30 350,50 Q360,80 340,100 Q310,110 280,90 Q270,60 280,40 Z"
            fill="#d4c5a9"
            stroke="#a89878"
            strokeWidth="1.5"
          />
          {/* South America */}
          <path
            d="M180,300 Q220,280 250,320 Q280,380 270,430 Q250,470 220,480 Q180,470 170,430 Q160,380 180,340 Q175,320 180,300 Z"
            fill="#d4c5a9"
            stroke="#a89878"
            strokeWidth="1.5"
          />
          {/* Europe */}
          <path
            d="M420,80 Q480,60 520,80 Q540,100 530,130 Q500,150 460,140 Q420,130 410,100 Q415,85 420,80 Z"
            fill="#d4c5a9"
            stroke="#a89878"
            strokeWidth="1.5"
          />
          {/* Africa */}
          <path
            d="M440,180 Q500,160 540,200 Q560,260 550,320 Q530,380 490,400 Q440,390 420,340 Q400,280 420,220 Q430,190 440,180 Z"
            fill="#d4c5a9"
            stroke="#a89878"
            strokeWidth="1.5"
          />
          {/* Asia */}
          <path
            d="M540,60 Q620,40 720,50 Q800,70 860,100 Q900,150 880,200 Q840,230 780,220 Q720,240 660,220 Q600,200 560,160 Q530,120 540,60 Z"
            fill="#d4c5a9"
            stroke="#a89878"
            strokeWidth="1.5"
          />
          {/* India */}
          <path
            d="M660,200 Q700,190 720,220 Q730,270 700,300 Q670,290 660,260 Q650,230 660,200 Z"
            fill="#d4c5a9"
            stroke="#a89878"
            strokeWidth="1.5"
          />
          {/* Southeast Asia */}
          <path
            d="M740,220 Q780,210 810,240 Q830,280 800,310 Q760,300 750,270 Q740,240 740,220 Z"
            fill="#d4c5a9"
            stroke="#a89878"
            strokeWidth="1.5"
          />
          {/* Australia */}
          <path
            d="M780,340 Q850,320 900,360 Q920,400 900,440 Q850,460 800,440 Q760,410 770,370 Q775,350 780,340 Z"
            fill="#d4c5a9"
            stroke="#a89878"
            strokeWidth="1.5"
          />
          {/* Japan */}
          <path
            d="M870,140 Q890,130 900,150 Q905,180 890,200 Q870,190 865,170 Q862,155 870,140 Z"
            fill="#d4c5a9"
            stroke="#a89878"
            strokeWidth="1.5"
          />
          {/* UK */}
          <path
            d="M400,80 Q420,70 430,85 Q435,100 420,110 Q400,105 395,90 Q395,82 400,80 Z"
            fill="#d4c5a9"
            stroke="#a89878"
            strokeWidth="1.5"
          />
          {/* Iceland */}
          <path
            d="M360,50 Q380,45 390,60 Q385,75 370,75 Q355,70 360,50 Z"
            fill="#d4c5a9"
            stroke="#a89878"
            strokeWidth="1.5"
          />
          {/* New Zealand */}
          <path
            d="M940,420 Q960,410 970,430 Q975,455 955,465 Q935,460 940,440 Q938,430 940,420 Z"
            fill="#d4c5a9"
            stroke="#a89878"
            strokeWidth="1.5"
          />
          
          {/* Decorative ship routes - dotted lines */}
          <path
            d="M200,200 Q350,220 420,180"
            fill="none"
            stroke="#8b7355"
            strokeWidth="1"
            strokeDasharray="4,4"
            opacity="0.4"
          />
          <path
            d="M500,200 Q600,260 700,240"
            fill="none"
            stroke="#8b7355"
            strokeWidth="1"
            strokeDasharray="4,4"
            opacity="0.4"
          />
          <path
            d="M420,350 Q550,380 700,350"
            fill="none"
            stroke="#8b7355"
            strokeWidth="1"
            strokeDasharray="4,4"
            opacity="0.4"
          />
          
          {/* Decorative sea monster */}
          <text
            x="600"
            y="440"
            className="font-serif italic"
            fontSize="12"
            fill="#a89878"
            opacity="0.5"
          >
            Here be dragons
          </text>
        </motion.svg>

        {/* Map pins */}
        {mapPins.map((pin, index) => (
          <MapPin
            key={pin.id}
            id={pin.id}
            location={pin.location}
            country={pin.country}
            date={pin.date}
            coordinates={pin.coordinates}
            index={index}
          />
        ))}
      </div>

      {/* Scale bar - hide in compact mode */}
      {!compact && (
        <motion.div
          className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-sepia/60 relative">
              <div className="absolute left-0 top-0 w-1/2 h-full bg-sepia" />
            </div>
            <span className="font-typewriter text-[10px] text-sepia/80">
              1000 km
            </span>
          </div>
        </motion.div>
      )}

      {/* Navigation hint */}
      <motion.div
        className={`absolute left-1/2 -translate-x-1/2 z-20 text-center ${
          compact ? "bottom-3" : "bottom-8"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <p className={`font-handwriting text-sepia/70 ${
          compact ? "text-sm" : "text-lg"
        }`}>
          Click a pin to read the story
        </p>
      </motion.div>
    </div>
  )
}
