"use client";

import { useGameStore } from "@/game/store";
import { Canvas } from "@react-three/fiber";

export default function GameCanvas() {
  const { count, increase } = useGameStore((state) => state);

  return (
    <Canvas
      onMouseDown={() => {
        increase(1);
      }}
    >
      <ambientLight intensity={2} />

      {Array.from({ length: count }).map((_, index) => (
        <mesh key={index} position={[index * 2, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="hotpink" />
        </mesh>
      ))}
    </Canvas>
  );
}
