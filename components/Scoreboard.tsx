'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

interface Stat {
  label: string
  value: number | string
  suffix?: string
  duration?: number
}

const stats: Stat[] = [
  { label: 'Games played', value: 157, suffix: '', duration: 2 },
  { label: 'Laughs shared', value: Infinity, suffix: '', duration: 0 },
  { label: 'Friendship level', value: 'MAX', suffix: '', duration: 0 },
  { label: 'Scares avoided', value: 100, suffix: '%', duration: 2 },
]

export default function Scoreboard() {
  const [displayStats, setDisplayStats] = useState<Record<string, number | string>>({})
  const scoreboardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    stats.forEach((stat, index) => {
      if (typeof stat.value === 'number' && stat.value !== Infinity) {
        gsap.to(
          {},
          {
            duration: stat.duration || 2,
            ease: 'power2.out',
            onUpdate: function () {
              const progress = this.progress()
              const currentValue = Math.floor(stat.value * progress)
              setDisplayStats((prev) => ({
                ...prev,
                [stat.label]: currentValue,
              }))
            },
            delay: index * 0.3,
          }
        )
      } else {
        setTimeout(() => {
          setDisplayStats((prev) => ({
            ...prev,
            [stat.label]: stat.value,
          }))
        }, index * 300)
      }
    })

    gsap.fromTo(
      scoreboardRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
      }
    )
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-valorant-dark via-valorant-dark to-purple-900 flex items-center justify-center p-4">
      <div
        ref={scoreboardRef}
        className="max-w-4xl w-full bg-valorant-dark border-2 border-valorant-red border-glow rounded-lg p-8 md:p-12"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 text-glow">
          Match Statistics
        </h2>
        
        <div className="space-y-6 md:space-y-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 md:p-6 bg-black bg-opacity-50 rounded-lg border border-valorant-red hover:border-glow transition-all duration-300 gap-2"
            >
              <span className="text-lg md:text-xl lg:text-2xl font-semibold">{stat.label}:</span>
              <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-valorant-red">
                {displayStats[stat.label] !== undefined
                  ? `${displayStats[stat.label]}${stat.suffix || ''}`
                  : '...'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
