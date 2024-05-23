"use client";

import { useGameStore } from "@/game/store";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Grid } from "@/game/types";
import { Tile } from "./Tile";
import EnemyHandler from "./EnemyHandler";

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
function getTileColor(grid: Grid, rowIndex: number, colIndex: number) {
  if (grid.start[0] === rowIndex && grid.start[1] === colIndex) {
    return "green";
  }
  if (grid.end[0] === rowIndex && grid.end[1] === colIndex) {
    return "red";
  }
  return rowIndex % 2 === colIndex % 2 ? "gray" : "white";
}

export default function GameCanvas() {
  const { grid, enemies } = useGameStore((state) => state);

  const centerX = (grid.columns - 1) / 2;
  const centerZ = (grid.rows - 1) / 2;

  return (
    <Canvas
      camera={{
        position: [centerX, 10, centerZ + 10],
        fov: 50,
      }}
    >
      <ambientLight intensity={2} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls
        enablePan={false}
        target={[centerX, 0, centerZ]}
        // maxPolarAngle={Math.PI / 2 - Math.PI / 20} // Prevent the camera from going below the ground
        maxPolarAngle={Math.PI / 2} // Prevent the camera from going below the ground
        minDistance={5} // Minimum zoom distance
        maxDistance={20} // Maximum zoom distance
      />
      {iterateGrid(grid, (rowIndex, colIndex) => (
        <Tile
          key={`${rowIndex}-${colIndex}`}
          position={[colIndex, rowIndex]}
          color={getTileColor(grid, rowIndex, colIndex)}
        />
      ))}
      <EnemyHandler />
    </Canvas>
  );
}
