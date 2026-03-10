'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function FloatingParticles() {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const count = 100

  useEffect(() => {
    if (!meshRef.current) return

    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20
    }

    meshRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color="#FF4655" emissive="#FF4655" emissiveIntensity={0.5} />
    </instancedMesh>
  )
}

function SimpleStars() {
  const starsRef = useRef<THREE.Points>(null)
  const count = 2000

  useEffect(() => {
    if (!starsRef.current) return

    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 200
    }

    starsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  }, [])

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.x = state.clock.elapsedTime * 0.01
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.015
    }
  })

  return (
    <points ref={starsRef}>
      <bufferGeometry />
      <pointsMaterial color="#FFFFFF" size={0.5} sizeAttenuation={false} />
    </points>
  )
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10 opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingParticles />
        <SimpleStars />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
