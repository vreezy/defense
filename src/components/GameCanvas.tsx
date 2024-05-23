"use client";

import { useGameStore } from "@/game/store";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Grid } from "@/game/types";
import { Tile } from "./Tile";

function iterateGrid(
  grid: Grid,
  callback: (rowIndex: number, colIndex: number) => any
) {
  return Array.from({ length: grid.rows }, (_, rowIndex) =>
    Array.from({ length: grid.columns }, (_, colIndex) =>
      callback(rowIndex, colIndex)
    )
  );
}

export default function GameCanvas() {
  const { grid } = useGameStore((state) => state);

  return (
    <Canvas camera={{ position: [5, 10, 5], fov: 50 }}>
      <ambientLight intensity={2} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {iterateGrid(grid, (rowIndex, colIndex) => (
        <Tile
          key={`${rowIndex}-${colIndex}`}
          position={[colIndex, 0, rowIndex]}
          color={rowIndex % 2 === colIndex % 2 ? "gray" : "white"}
        />
      ))}
    </Canvas>
  );
}
