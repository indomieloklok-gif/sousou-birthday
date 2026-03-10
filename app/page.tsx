'use client'

import { useState, useEffect } from 'react'
import TerminalIntro from '@/components/TerminalIntro'
import LizardGame from '@/components/LizardGame'
import StoryTimeline from '@/components/StoryTimeline'
import ChoiceSection from '@/components/ChoiceSection'
import FinalSurprise from '@/components/FinalSurprise'
import EasterEggs from '@/components/EasterEggs'
import ThreeBackground from '@/components/ThreeBackground'

type Stage = 'intro' | 'game' | 'story' | 'choice' | 'final'

export default function Home() {
  const [stage, setStage] = useState<Stage>('intro')
  const [showFinal, setShowFinal] = useState(false)

  const handleIntroComplete = () => {
    setStage('game')
  }

  const handleGameWin = () => {
    setStage('story')
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  const handleStoryComplete = () => {
    setStage('choice')
  }

  const handleChoiceComplete = () => {
    setStage('final')
    setShowFinal(true)
  }

  useEffect(() => {
    if (stage === 'final') {
      setShowFinal(true)
    }
  }, [stage])

  return (
    <main className="relative">
      <EasterEggs />
      {stage !== 'intro' && <ThreeBackground />}
      
      {stage === 'intro' && <TerminalIntro onComplete={handleIntroComplete} />}
      
      {stage === 'game' && <LizardGame onWin={handleGameWin} />}
      
      {stage === 'story' && <StoryTimeline onComplete={handleStoryComplete} />}
      
      {stage === 'choice' && <ChoiceSection onComplete={handleChoiceComplete} />}
      
      {showFinal && <FinalSurprise />}
    </main>
  )
}
