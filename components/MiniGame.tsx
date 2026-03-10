'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'

interface Bubble {
  id: number
  x: number
  y: number
  size: number
  speed: number
  memory: string
  clicked: boolean
}

interface MiniGameProps {
  onWin: () => void
}

const MEMORIES = ['bared', 'cv ta9es', 'flash', 'ace', 'clutch', 'noob', 'pro', 'gg']

export default function MiniGame({ onWin }: MiniGameProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [score, setScore] = useState(0)
  const [clicks, setClicks] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [showMessage, setShowMessage] = useState('')
  const gameRef = useRef<HTMLDivElement>(null)
  const targetScore = 10
  const clickLimit = 50

  const createBubble = useCallback((): Bubble => {
    return {
      id: Date.now() + Math.random(),
      x: Math.random() * 80 + 10,
      y: -10,
      size: Math.random() * 40 + 30,
      speed: Math.random() * 2 + 1.5,
      memory: MEMORIES[Math.floor(Math.random() * MEMORIES.length)],
      clicked: false,
    }
  }, [])

  useEffect(() => {
    if (!gameStarted) return

    const interval = setInterval(() => {
      setBubbles((prev) => [...prev, createBubble()])
    }, 800)

    const moveInterval = setInterval(() => {
      setBubbles((prev) =>
        prev
          .map((bubble) => ({
            ...bubble,
            y: bubble.y + bubble.speed,
          }))
          .filter((bubble) => bubble.y < 110)
      )
    }, 50)

    return () => {
      clearInterval(interval)
      clearInterval(moveInterval)
    }
  }, [gameStarted, createBubble])

  useEffect(() => {
    if (score >= targetScore) {
      if (clicks <= clickLimit) {
        setShowMessage('KYS 9erd')
        setTimeout(() => {
          onWin()
        }, 2000)
      } else {
        setShowMessage('Nice try cheater 😏')
      }
    }
  }, [score, clicks, onWin])

  const handleBubbleClick = (id: number) => {
    setClicks((prev) => prev + 1)
    setBubbles((prev) =>
      prev.map((bubble) => {
        if (bubble.id === id && !bubble.clicked) {
          setScore((s) => s + 1)
          return { ...bubble, clicked: true }
        }
        return bubble
      })
    )
  }

  const startGame = () => {
    setGameStarted(true)
    setBubbles([])
    setScore(0)
    setClicks(0)
    setShowMessage('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-valorant-dark via-purple-900 to-valorant-dark flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {!gameStarted ? (
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-glow mb-8">
            The Challenge
          </h2>
          <p className="text-xl mb-8 text-valorant-light">
            Click {targetScore} memory bubbles to unlock the secret!
          </p>
          <button
            onClick={startGame}
            className="px-8 py-4 bg-valorant-red text-white font-bold text-xl border-2 border-valorant-red hover:bg-transparent hover:text-valorant-red transition-all duration-300 border-glow"
          >
            Start Challenge
          </button>
        </div>
      ) : (
        <>
          <div className="absolute top-4 left-4 text-xl">
            Score: <span className="text-valorant-red font-bold">{score}/{targetScore}</span>
          </div>
          <div className="absolute top-4 right-4 text-xl">
            Clicks: <span className="text-valorant-red font-bold">{clicks}</span>
          </div>
          
          <div
            ref={gameRef}
            className="relative w-full max-w-4xl h-[500px] md:h-[600px] border-2 border-valorant-red border-glow rounded-lg overflow-hidden touch-none"
          >
            {bubbles.map((bubble) => (
              <div
                key={bubble.id}
                onClick={() => handleBubbleClick(bubble.id)}
                className={`absolute cursor-pointer touch-none transition-all duration-200 ${
                  bubble.clicked ? 'opacity-0 scale-0' : 'hover:scale-110 active:scale-95'
                }`}
                style={{
                  left: `${bubble.x}%`,
                  top: `${bubble.y}%`,
                  width: `${bubble.size}px`,
                  height: `${bubble.size}px`,
                }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-valorant-red to-pink-600 border-2 border-white flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-lg border-glow animate-pulse-slow">
                  {bubble.memory}
                </div>
              </div>
            ))}
          </div>

          {showMessage && (
            <div className="mt-8 text-3xl md:text-5xl lg:text-6xl font-bold text-glow animate-glow text-center px-4">
              {showMessage}
            </div>
          )}
        </>
      )}
    </div>
  )
}
