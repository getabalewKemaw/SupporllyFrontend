"use client"

import type React from "react"
import { Suspense, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Stars, Sphere, MeshDistortMaterial } from "@react-three/drei"
import type * as THREE from "three"

const AnimatedSphere: React.FC<{ position: [number, number, number]; color: string; scale?: number }> = ({
  position,
  color,
  scale = 1,
}) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[0.6 * scale, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  )
}

const FloatingShapes: React.FC = () => {
  return (
    <>
      {/* Main Hero Shapes */}
      <AnimatedSphere position={[-3, 1, -2]} color="#8b5cf6" scale={1.2} />
      <AnimatedSphere position={[3, 0.5, -3]} color="#ec4899" scale={1} />
      <AnimatedSphere position={[0, 2.5, -4]} color="#f59e0b" scale={0.8} />

      {/* Secondary floating objects */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2.5}>
        <mesh position={[-2, -1, 0]} rotation={[0.5, 0.5, 0]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial
            color="#06b6d4"
            metalness={0.9}
            roughness={0.1}
            emissive="#06b6d4"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>

      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={3}>
        <mesh position={[2.5, 1.8, -1]} rotation={[0.3, 0.8, 0]}>
          <torusGeometry args={[0.7, 0.25, 16, 100]} />
          <meshStandardMaterial
            color="#f43f5e"
            metalness={0.8}
            roughness={0.2}
            emissive="#f43f5e"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.8}>
        <mesh position={[-3.5, 2, -2.5]}>
          <octahedronGeometry args={[0.5]} />
          <meshStandardMaterial
            color="#10b981"
            metalness={0.9}
            roughness={0.1}
            emissive="#10b981"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>

      {/* Ambient particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Float key={i} speed={1 + Math.random() * 2} rotationIntensity={0.5} floatIntensity={1 + Math.random()}>
          <mesh position={[(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 5 - 2]}>
            <sphereGeometry args={[0.1 + Math.random() * 0.15, 16, 16]} />
            <meshStandardMaterial
              color={`hsl(${Math.random() * 360}, 70%, 60%)`}
              metalness={0.8}
              roughness={0.2}
              emissive={`hsl(${Math.random() * 360}, 70%, 60%)`}
              emissiveIntensity={0.3}
              transparent
              opacity={0.6}
            />
          </mesh>
        </Float>
      ))}
    </>
  )
}

const RotatingRing: React.FC = () => {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.getElapsedTime() * 0.1
      ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.15
    }
  })

  return (
    <mesh ref={ringRef} position={[0, 0, -5]}>
      <torusGeometry args={[3, 0.1, 16, 100]} />
      <meshStandardMaterial
        color="#8b5cf6"
        metalness={0.9}
        roughness={0.1}
        emissive="#8b5cf6"
        emissiveIntensity={0.3}
        transparent
        opacity={0.4}
      />
    </mesh>
  )
}

const CanvasScene: React.FC = () => {
  return (
    <Canvas
      className="w-full h-full"
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      {/* Lighting setup */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-5, 3, -3]} intensity={0.8} color="#8b5cf6" />
      <pointLight position={[0, 0, 3]} intensity={1.2} color="#ec4899" />
      <pointLight position={[-3, 2, 0]} intensity={0.8} color="#06b6d4" />
      <spotLight position={[0, 5, 0]} angle={0.6} penumbra={1} intensity={0.5} color="#f59e0b" />

      {/* Starfield */}
      <Stars radius={50} depth={60} count={400} factor={6} saturation={0} fade speed={0.8} />

      {/* Animated background gradient */}
      <mesh position={[0, 0, -20]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#0a0015" transparent opacity={0.9} />
      </mesh>

      {/* Rotating ring for depth */}
      <Suspense fallback={null}>
        <RotatingRing />
      </Suspense>

      {/* Main floating shapes */}
      <Suspense fallback={null}>
        <FloatingShapes />
      </Suspense>

      {/* Interactive controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 2.5}
        makeDefault
      />
    </Canvas>
  )
}
export default CanvasScene
