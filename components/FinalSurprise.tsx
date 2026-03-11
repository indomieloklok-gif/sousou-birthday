'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import confetti from 'canvas-confetti'

export default function FinalSurprise() {
  const containerRef = useRef<HTMLDivElement>(null)
  const messageRef = useRef<HTMLParagraphElement>(null)
  const secondMessageRef = useRef<HTMLParagraphElement>(null)
  const thirdMessageRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    // Confetti explosion
    const duration = 5000
    const end = Date.now() + duration

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval)
        return
      }

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF4655', '#ECE8E1', '#FFFFFF'],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF4655', '#ECE8E1', '#FFFFFF'],
      })
    }, 200)

    // GSAP animations
    if (messageRef.current) {
      gsap.fromTo(
        messageRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
        }
      )
    }

    if (secondMessageRef.current) {
      gsap.fromTo(
        secondMessageRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: 'power3.out',
        }
      )
    }

    if (thirdMessageRef.current) {
      gsap.fromTo(
        thirdMessageRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 1,
          ease: 'power3.out',
        }
      )
    }

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-4"
    >
      <div className="text-center space-y-8 px-4">
        <p
          ref={messageRef}
          className="text-3xl sm:text-4xl md:text-6xl font-bold text-valorant-light animate-glow"
        >
          hezzy bezzy to u haboub {'<3'}
        </p>
        
        <p
          ref={secondMessageRef}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-valorant-red text-glow animate-glow"
        >
          Behave… Mommy&apos;s watching
        </p>
        
        <p
          ref={thirdMessageRef}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-valorant-light animate-glow"
        >
          we are close {'<3'}
        </p>
      </div>
    </div>
  )
}
