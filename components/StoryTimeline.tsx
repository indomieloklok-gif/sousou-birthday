'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const milestones = [
  {
    title: 'Valorant',
    description: 'two strangers met in a Valorant lobby ty Hama <3',
    icon: '🎮',
    color: 'from-red-500 to-pink-600',
  },
  {
    title: 'Discord',
    description: 'Fer3awn Late night calls, endless laughs and Flaming each other',
    icon: '💬',
    color: 'from-blue-500 to-purple-600',
  },
  {
    title: 'TFT',
    description: 'matchy matchyyyy',
    icon: '♟️',
    color: 'from-yellow-500 to-orange-600',
  },
  {
    title: 'Reels',
    description: 'Sharing mems and inside jokes',
    icon: '📱',
    color: 'from-green-500 to-teal-600',
  },
]

interface StoryTimelineProps {
  onComplete?: () => void
}

export default function StoryTimeline({ onComplete }: StoryTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const items = itemsRef.current.filter(Boolean)
    
    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={timelineRef} className="min-h-screen bg-valorant-dark py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-bold text-center mb-20 text-glow">
          Our Journey
        </h2>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-valorant-red via-purple-600 to-valorant-red"></div>
          
          {milestones.map((milestone, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) itemsRef.current[index] = el
              }}
              className={`relative mb-20 flex items-center ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <div className={`inline-block p-6 rounded-lg bg-gradient-to-br ${milestone.color} border-2 border-white border-glow`}>
                  <div className="text-4xl mb-2">{milestone.icon}</div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">{milestone.title}</h3>
                  <p className="text-lg">{milestone.description}</p>
                </div>
              </div>
              
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-valorant-red rounded-full border-4 border-white border-glow z-10"></div>
              
              <div className="w-1/2"></div>
            </div>
          ))}
        </div>

        {onComplete && (
          <div className="text-center mt-20">
            <button
              onClick={onComplete}
              className="px-8 py-4 bg-valorant-red text-white font-bold text-xl border-2 border-valorant-red hover:bg-transparent hover:text-valorant-red transition-all duration-300 border-glow"
            >
              Continue
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
