"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Line } from "@react-three/drei";
import * as THREE from "three";

// Simple wireframe globe
function GlobeMesh({ activeIndex }: { activeIndex: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[1.5, 32, 32]}>
        <meshBasicMaterial 
          color="#1a253a" 
          wireframe={true} 
          transparent 
          opacity={0.3} 
        />
      </Sphere>
      
      {/* Add a subtle solid core to prevent seeing completely through */}
      <Sphere args={[1.48, 32, 32]}>
        <meshBasicMaterial color="#050a15" />
      </Sphere>
    </group>
  );
}

export default function JourneyGlobe({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <GlobeMesh activeIndex={activeIndex} />
      </Canvas>
    </div>
  );
}
