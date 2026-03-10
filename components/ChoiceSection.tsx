'use client'

import { useState } from 'react'
import { gsap } from 'gsap'

interface ChoiceSectionProps {
  onComplete: () => void
}

export default function ChoiceSection({ onComplete }: ChoiceSectionProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showMessage, setShowMessage] = useState(false)

  const handleChoice = (choice: string) => {
    setSelected(choice)
    setShowMessage(true)
    
    setTimeout(() => {
      onComplete()
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-valorant-dark via-purple-900 to-valorant-dark flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-bold text-glow mb-12">
          a5tar wahda eli theb aliha
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-8">
          <button
            onClick={() => handleChoice('fanta')}
            disabled={selected !== null}
            className={`px-12 py-6 text-3xl md:text-4xl font-bold border-4 transition-all duration-300 ${
              selected === 'fanta'
                ? 'bg-orange-500 border-orange-500 text-white'
                : selected === null
                ? 'bg-transparent border-valorant-red text-valorant-red hover:bg-valorant-red hover:text-white border-glow cursor-pointer'
                : 'bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            FANTA
          </button>
          
          <button
            onClick={() => handleChoice('black')}
            disabled={selected !== null}
            className={`px-12 py-6 text-3xl md:text-4xl font-bold border-4 transition-all duration-300 ${
              selected === 'black'
                ? 'bg-gray-800 border-gray-800 text-white'
                : selected === null
                ? 'bg-transparent border-valorant-red text-valorant-red hover:bg-valorant-red hover:text-white border-glow cursor-pointer'
                : 'bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Black...
          </button>
        </div>

        {showMessage && (
          <div className="mt-12 text-3xl md:text-5xl font-bold text-valorant-red text-glow animate-glow">
            Quiet now… Mommy loves it when you listen 😏
          </div>
        )}
      </div>
    </div>
  )
}
