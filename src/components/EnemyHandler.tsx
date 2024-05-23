"use client";

import { useGameStore } from "@/game/store";
import { Enemy } from "./Enemy";
import useIntervalFrame from "@/game/utils/useIntervalFrame";
import { useFrame } from "@react-three/fiber";
import { getNextDirection } from "@/game/utils/getNextDirection";

function positionEauals(
  position1: [number, number],
  position2: [number, number],
  tolerance: number = 0.1
) {
  return (
    Math.abs(position1[0] - position2[0]) < tolerance &&
    Math.abs(position1[1] - position2[1]) < tolerance
  );
}

export default function EnemyHandler() {
  const { grid, enemies, spawnEnemy, updateEnemy, removeEnemy } = useGameStore(
    (state) => state
  );

  useIntervalFrame(() => {
    spawnEnemy(grid.start);
  }, 1000);

  useFrame(() => {
    enemies.forEach((enemy) => {
      const nextDirection = getNextDirection(grid, enemy, []);
      const position: [number, number] = [
        enemy.position[0] + Math.cos(nextDirection) * enemy.speed,
        enemy.position[1] + Math.sin(nextDirection) * enemy.speed,
      ];

      if (positionEauals(position, grid.end)) {
        removeEnemy(enemy.id);
      } else {
        updateEnemy({
          ...enemy,
          position,
        });
      }
    });
  });

  return enemies.map((enemy) => (
    <Enemy key={enemy.id} position={enemy.position} color="red" />
  ));
}
