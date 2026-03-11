'use client'

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

interface TerminalIntroProps {
  onComplete: () => void
}

export default function TerminalIntro({ onComplete }: TerminalIntroProps) {
  const [currentLine, setCurrentLine] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [showButton, setShowButton] = useState(false)

  const lines = [
    'Loading memory...',
    'Connecting to server...',
    'Match found...',
    '3asslema Sousou',
    'Two strangers met in a Valorant lobby...',
    '',
    'We are not close...',
  ]

  useEffect(() => {
    let timeout: NodeJS.Timeout

    const typeText = (lineIndex: number, charIndex: number = 0) => {
      if (lineIndex >= lines.length) {
        setShowButton(true)
        return
      }

      const line = lines[lineIndex]
      if (charIndex < line.length) {
        setDisplayText(line.substring(0, charIndex + 1))
        timeout = setTimeout(() => typeText(lineIndex, charIndex + 1), 50)
      } else {
        timeout = setTimeout(() => {
          setCurrentLine(lineIndex + 1)
          setDisplayText('')
          typeText(lineIndex + 1)
        }, 500)
      }
    }

    typeText(0)

    return () => {
      if (timeout) clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4">
      <div className="font-mono text-green-400 text-base sm:text-lg md:text-2xl text-center">
        <div className="mb-4 min-h-[100px] flex items-center justify-center">
          {displayText}
          <span className="animate-pulse">_</span>
        </div>
        {showButton && (
          <button
            onClick={onComplete}
            className="mt-8 px-6 py-3 md:px-8 md:py-4 bg-valorant-red text-white font-bold text-lg md:text-xl border-2 border-valorant-red hover:bg-transparent hover:text-valorant-red transition-all duration-300 border-glow active:scale-95"
          >
            Start the mission
          </button>
        )}
      </div>
    </div>
  )
}
