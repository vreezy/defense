"use client";

import { useGameStore } from "@/game/store";
import { Enemy } from "./Enemy";
import useIntervalFrame from "@/game/utils/useIntervalFrame";
import { useFrame } from "@react-three/fiber";
import { getNextDirection } from "@/game/utils/pathfinding";
import { positionEquals } from "@/game/utils/positionEquals";
import { useMemo } from "react";

export default function EnemyHandler() {
  const { grid, enemies, weapons, spawnEnemy, updateEnemy, removeEnemy } =
    useGameStore((state) => state);

  const obstacles = useMemo(() => {
    return weapons.map((weapon) => ({
      position: weapon.position,
      radius: weapon.radius,
    }));
  }, [weapons]);

  useIntervalFrame(() => {
    spawnEnemy(grid.start);
  }, 1000);

  useFrame(() => {
    enemies.forEach((enemy, i) => {
      const direction = getNextDirection(enemy, grid, obstacles);
      if (i == 0) {
        console.log("Next direction", direction);
      }
      const position: [number, number] = [
        enemy.position[0] + Math.cos(direction) * enemy.speed,
        enemy.position[1] + Math.sin(direction) * enemy.speed,
      ];

      if (positionEquals(position, grid.end)) {
        removeEnemy(enemy.id);
      } else {
        updateEnemy({
          ...enemy,
          position,
          direction,
        });
      }
    });
  });

  return enemies.map((enemy) => (
    <Enemy key={enemy.id} position={enemy.position} color="red" />
  ));
}
