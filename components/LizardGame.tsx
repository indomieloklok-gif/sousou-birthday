'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

interface Obstacle {
  id: number
  x: number
  width: number
  height: number
}

interface LizardGameProps {
  onWin: () => void
}

export default function LizardGame({ onWin }: LizardGameProps) {
  const [gameStarted, setGameStarted] = useState(false)
  const [score, setScore] = useState(0)
  const [lizardY, setLizardY] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [showWinMessage, setShowWinMessage] = useState(false)
  const [showContinueButton, setShowContinueButton] = useState(false)
  const lizardRef = useRef<HTMLDivElement>(null)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const [obstacles, setObstacles] = useState<Obstacle[]>([])
  const obstaclesRef = useRef<Obstacle[]>([])
  const gameLoopRef = useRef<number>()
  const velocityRef = useRef(0)
  const isJumpingRef = useRef(false)
  const targetScore = 50

  const startGame = () => {
    setGameStarted(true)
    setScore(0)
    setGameOver(false)
    setShowWinMessage(false)
    setShowContinueButton(false)
    setObstacles([])
    setLizardY(0)
    obstaclesRef.current = []
    velocityRef.current = 0
    isJumpingRef.current = false
  }

  const jump = useCallback(() => {
    if (!isJumpingRef.current && !gameOver && gameStarted) {
      isJumpingRef.current = true
      velocityRef.current = -15 // Instant jump velocity
    }
  }, [gameOver, gameStarted])

  useEffect(() => {
    if (!gameStarted || gameOver) return

    // Create obstacles - well spaced
    const obstacleInterval = setInterval(() => {
      if (gameOver) {
        clearInterval(obstacleInterval)
        return
      }
      if (Math.random() > 0.75) {
        const newObstacle = {
          id: Date.now() + Math.random(),
          x: 100,
          width: 35,
          height: 35,
        }
        setObstacles((prev) => {
          const updated = [...prev, newObstacle]
          obstaclesRef.current = updated
          return updated
        })
      }
    }, 2000) // Spawn every 2 seconds max

    // Physics loop - runs at 60fps
    const gameLoop = () => {
      if (gameOver) return

      // Physics: gravity and jump
      if (isJumpingRef.current || lizardY < 0) {
        velocityRef.current += 0.8 // Gravity
        const newY = lizardY + velocityRef.current
        
        if (newY >= 0) {
          setLizardY(0)
          velocityRef.current = 0
          isJumpingRef.current = false
        } else {
          setLizardY(newY)
        }
      }

      // Move obstacles
      setObstacles((prev) => {
        const updated = prev
          .map((obstacle) => ({
            ...obstacle,
            x: obstacle.x - 1.2,
          }))
          .filter((obstacle) => obstacle.x > -10)
        obstaclesRef.current = updated
        return updated
      })

      // Collision detection
      const lizardRect = lizardRef.current?.getBoundingClientRect()
      const gameAreaRect = gameAreaRef.current?.getBoundingClientRect()
      
      if (lizardRect && gameAreaRect) {
        obstaclesRef.current.forEach((obstacle) => {
          const obstacleLeft = gameAreaRect.left + (obstacle.x / 100) * gameAreaRect.width
          const obstacleRight = obstacleLeft + obstacle.width
          const obstacleTop = gameAreaRect.bottom - 80 - obstacle.height
          const obstacleBottom = gameAreaRect.bottom - 80
          
          const lizardLeft = lizardRect.left
          const lizardRight = lizardRect.right
          const lizardTop = lizardRect.top
          const lizardBottom = lizardRect.bottom
          
          if (
            lizardRight > obstacleLeft + 5 &&
            lizardLeft < obstacleRight - 5 &&
            lizardBottom > obstacleTop &&
            lizardTop < obstacleBottom
          ) {
            setGameOver(true)
            if (gameLoopRef.current) {
              cancelAnimationFrame(gameLoopRef.current)
            }
            return
          }
        })
      }

      // Score
      if (!gameOver) {
        setScore((prev) => {
          const newScore = prev + 0.15
          if (newScore >= targetScore && !showWinMessage) {
            setShowWinMessage(true)
            setShowContinueButton(true)
            return targetScore
          }
          return newScore
        })
      }

      if (!gameOver) {
        gameLoopRef.current = requestAnimationFrame(gameLoop)
      }
    }

    gameLoopRef.current = requestAnimationFrame(gameLoop)

    // Controls
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.code === 'Space' || e.key === 'ArrowUp') && !gameOver) {
        e.preventDefault()
        jump()
      }
    }

    const handleClick = () => {
      if (!gameOver && gameStarted) {
        jump()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    const gameAreaElement = gameAreaRef.current
    if (gameAreaElement) {
      gameAreaElement.addEventListener('click', handleClick)
    }

    return () => {
      clearInterval(obstacleInterval)
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current)
      }
      window.removeEventListener('keydown', handleKeyPress)
      if (gameAreaElement) {
        gameAreaElement.removeEventListener('click', handleClick)
      }
    }
  }, [gameStarted, gameOver, jump, showWinMessage, targetScore, lizardY])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
      {!gameStarted ? (
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-glow mb-8">
            The Lizard Game
          </h2>
          <p className="text-xl mb-4 text-valorant-light">
            Press SPACE or UP ARROW to jump!
          </p>
          <p className="text-lg mb-8 text-gray-400">
            Reach {targetScore} points to win!
          </p>
          <button
            onClick={startGame}
            className="px-8 py-4 bg-valorant-red text-white font-bold text-xl border-2 border-valorant-red hover:bg-transparent hover:text-valorant-red transition-all duration-300 border-glow"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="w-full max-w-4xl">
          <div className="text-center mb-4 text-2xl font-bold">
            Score: <span className="text-valorant-red">{Math.floor(score)}/{targetScore}</span>
          </div>

          {showWinMessage && (
            <div className="text-center mb-4">
              <div className="text-4xl md:text-6xl font-bold text-green-400 text-glow animate-glow mb-4">
                GOOD BOY
              </div>
            </div>
          )}

          {showContinueButton && (
            <div className="text-center mb-4">
              <button
                onClick={onWin}
                className="px-8 py-4 bg-green-500 text-white font-bold text-xl border-2 border-green-500 hover:bg-transparent hover:text-green-500 transition-all duration-300 border-glow"
              >
                Continue
              </button>
            </div>
          )}

          <div
            ref={gameAreaRef}
            className="relative w-full h-[400px] bg-gradient-to-b from-sky-300 via-sky-200 to-gray-700 border-4 border-valorant-red border-glow rounded-lg overflow-hidden cursor-pointer"
          >
            {/* Ground */}
            <div className="absolute bottom-0 w-full h-20 bg-gray-600 border-t-4 border-gray-500">
              <div className="absolute bottom-0 w-full h-2 bg-gray-500"></div>
            </div>

            {/* Lizard */}
            <div
              ref={lizardRef}
              className="absolute bottom-20 left-[15%] w-16 h-16 text-6xl z-10"
              style={{ 
                transform: `translateY(${lizardY}px)`,
                transition: 'none'
              }}
            >
              🦎
            </div>

            {/* Obstacles */}
            {obstacles.map((obstacle) => (
              <div
                key={obstacle.id}
                className="absolute bottom-20"
                style={{
                  left: `${obstacle.x}%`,
                  width: `${obstacle.width}px`,
                  height: `${obstacle.height}px`,
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  🌵
                </div>
              </div>
            ))}

            {gameOver && !showWinMessage && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 z-20">
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-bold text-red-500 mb-4 animate-pulse">
                    hhhhhhhhh 9erd
                  </div>
                  <div className="text-xl mb-6 text-gray-300">
                    Try again to reach the score!
                  </div>
                  <button
                    onClick={startGame}
                    className="px-8 py-4 bg-valorant-red text-white font-bold text-xl border-2 border-valorant-red hover:bg-transparent hover:text-valorant-red transition-all border-glow"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="text-center mt-4 text-gray-400">
            Press SPACE, ↑ or CLICK to jump
          </div>
        </div>
      )}
    </div>
  )
}
