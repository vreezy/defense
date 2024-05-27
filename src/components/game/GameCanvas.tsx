"use client";

import { useGameStore } from "@/game/store";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Grid } from "@/game/types";
import { Tile } from "./Tile";
import EnemyHandler from "./EnemyHandler";
import WeaponHandler from "./WeaponHandler";

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
    return "#00ff00c0";
  }
  if (grid.end[0] === rowIndex && grid.end[1] === colIndex) {
    return "#ff0000c0";
  }
  // return undefined;
  return (rowIndex + colIndex) % 2 === 0 ? "#ffffff10" : "#00000010";
}

export default function GameCanvas() {
  const { grid, setSelectedWeapon } = useGameStore((state) => state);

  const centerX = (grid.columns - 1) / 2;
  const centerZ = (grid.rows - 1) / 2;

  return (
    <Canvas
      onPointerMissed={() => {
        console.log("Pointer missed");
        setSelectedWeapon(null);
      }}
      camera={{
        position: [centerX, 10, centerZ + 10],
        fov: 50,
      }}
    >
      <Environment preset="apartment" />
      <color attach="background" args={["#5eabe6"]} />
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
      <WeaponHandler />
    </Canvas>
  );
}
