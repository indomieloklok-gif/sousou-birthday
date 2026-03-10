'use client'

import { useEffect } from 'react'
import confetti from 'canvas-confetti'

export default function EasterEggs() {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Flash grenade effect (F key)
      if (e.key.toLowerCase() === 'f') {
        const flash = document.createElement('div')
        flash.className = 'fixed inset-0 bg-white z-[100] opacity-90'
        flash.style.animation = 'flash 0.3s ease-out'
        document.body.appendChild(flash)
        
        setTimeout(() => {
          flash.remove()
        }, 300)

        // Add flash animation if not exists
        if (!document.getElementById('flash-style')) {
          const style = document.createElement('style')
          style.id = 'flash-style'
          style.textContent = `
            @keyframes flash {
              0% { opacity: 0.9; }
              100% { opacity: 0; }
            }
          `
          document.head.appendChild(style)
        }
      }

      // Confetti burst (C key)
      if (e.key.toLowerCase() === 'c') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF4655', '#ECE8E1', '#FFFFFF', '#FFD700'],
        })
      }

      // Random bubble popup (B key)
      if (e.key.toLowerCase() === 'b') {
        const bubble = document.createElement('div')
        bubble.className = 'fixed text-4xl z-[100] animate-bounce'
        bubble.textContent = '💥'
        bubble.style.left = `${Math.random() * 80 + 10}%`
        bubble.style.top = `${Math.random() * 80 + 10}%`
        document.body.appendChild(bubble)

        setTimeout(() => {
          bubble.remove()
        }, 2000)
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  return null
}
