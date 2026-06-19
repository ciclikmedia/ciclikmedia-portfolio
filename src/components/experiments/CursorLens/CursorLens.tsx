'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';

import { useEffect, useRef } from 'react';

import * as THREE from 'three';

function Lens() {
  const groupRef = useRef<THREE.Group>(null);

  const mouse = useRef({
    x: 0,
    y: 0,
  });

  const target = useRef({
    x: 0,
    y: 0,
  });

  const { viewport } = useThree();

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      mouse.current.x =
        (e.clientX / window.innerWidth) * 2 - 1;

      mouse.current.y =
        -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener(
      'pointermove',
      handleMove
    );

    return () => {
      window.removeEventListener(
        'pointermove',
        handleMove
      );
    };
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;

    target.current.x =
      (mouse.current.x * viewport.width) / 2;

    target.current.y =
      (mouse.current.y * viewport.height) / 2;

    groupRef.current.position.x =
      THREE.MathUtils.lerp(
        groupRef.current.position.x,
        target.current.x,
        0.14
      );

    groupRef.current.position.y =
      THREE.MathUtils.lerp(
        groupRef.current.position.y,
        target.current.y,
        0.14
      );
  });

  return (
    <group ref={groupRef}>
      {/* Fill */}
      <mesh>
        <circleGeometry
          args={[0.28, 128]}
        />

        <meshBasicMaterial
          transparent
          opacity={0.15}
          color="#ffffff"
        />
      </mesh>

      {/* Border */}
      <mesh position-z={0.001}>
        <ringGeometry
          args={[
            0.276,
            0.28,
            128,
          ]}
        />

        <meshBasicMaterial
          transparent
          opacity={0.2}
          color="#ffffff"
        />
      </mesh>
    </group>
  );
}

export default function CursorLens() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 999998,
      }}
    >
      <Canvas
        orthographic
        camera={{
          zoom: 100,
          position: [0, 0, 100],
        }}
      >
        <Lens />
      </Canvas>
    </div>
  );
}