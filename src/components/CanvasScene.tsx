// src/components/CanvasScene.tsx
import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Float, Stars } from "@react-three/drei";
import { TextureLoader } from "three";

const FloatingObjects: React.FC = () => (
  <>
    {/* Sphere */}
    <Float speed={1} rotationIntensity={1} floatIntensity={2}>
      <mesh position={[-2, 1, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#5032a8" metalness={0.7} roughness={0.2} emissive="#5032a8" emissiveIntensity={0.3} />
      </mesh>
    </Float>

    {/* Box */}
    <Float speed={0.8} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh position={[2, 1.5, -1]}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial color="#ff6f61" metalness={0.5} roughness={0.3} emissive="#ff6f61" emissiveIntensity={0.2} />
      </mesh>
    </Float>

    {/* Torus */}
    <Float speed={1.2} rotationIntensity={1} floatIntensity={2.5}>
      <mesh position={[0, 2, -2]} rotation={[0.5, 0, 0]}>
        <torusGeometry args={[0.6, 0.2, 16, 100]} />
        <meshStandardMaterial color="#facc15" metalness={0.6} roughness={0.2} emissive="#facc15" emissiveIntensity={0.25} />
      </mesh>
    </Float>
  </>
);

const CanvasScene: React.FC = () => {
  const bgTexture = useLoader(TextureLoader, "/assets/herobg.jpg"); // public/assets/herobg.jpg

  return (
    <Canvas className="w-full h-full" camera={{ position: [0, 1, 5], fov: 50 }}>
      {/* Lights */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />

      {/* Stars for depth */}
      <Stars radius={20} depth={50} count={200} factor={4} saturation={0} fade />

      {/* Background image */}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[50, 30]} />
        <meshBasicMaterial map={bgTexture} />
      </mesh>

      {/* Floating objects */}
      <Suspense fallback={null}>
        <FloatingObjects />
      </Suspense>

      {/* Controls */}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.15} />
    </Canvas>
  );
};

export default CanvasScene;
