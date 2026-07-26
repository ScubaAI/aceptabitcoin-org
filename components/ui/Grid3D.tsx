// components/ui/Grid3D.tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Grid3DProps {
  cellSize?: number;
  cellColor?: string;
  cellThickness?: number;
  rotateX?: number;
  followMouse?: boolean;
  interactive?: boolean;
  position?: [number, number, number];
  scale?: [number, number, number];
}

export function Grid3D({
  cellSize = 1,
  cellColor = '#00FF41',
  cellThickness = 1,
  rotateX = 80,
  followMouse = true,
  interactive = true,
  position = [0, -4, 0],
  scale = [10, 10, 1],
}: Grid3DProps) {
  const meshRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame(({ mouse }) => {
    if (!meshRef.current) return;

    if (followMouse && interactive) {
      targetRotation.current.x = (mouse.y * Math.PI) / 20;
      targetRotation.current.y = (mouse.x * Math.PI) / 20;

      meshRef.current.rotation.x += (targetRotation.current.x - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (targetRotation.current.y - meshRef.current.rotation.y) * 0.05;
    } else {
      meshRef.current.rotation.x = (rotateX * Math.PI) / 180;
    }
  });

  return (
    <group ref={meshRef} position={position} scale={scale}>
      <gridHelper
        args={[20, 20 / cellSize, new THREE.Color(cellColor), new THREE.Color(cellColor)]}
        rotation-x={(rotateX * Math.PI) / 180}
      />
    </group>
  );
}
