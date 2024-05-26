"use client";

import { useGameStore } from "@/game/store";
import { Enemy as EnemyModel } from "./Enemy";
import { useInterval } from "react-use";
import { useCallback, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { getNextDirection } from "@/game/utils/pathfinding";
import { positionEquals } from "@/game/utils/positionEquals";
import { Enemy } from "@/game/types";

export default function EnemyHandler() {
  const { grid, enemies, spawnEnemy, updateEnemy, removeEnemy, despawnEnemy, weapons, setSelectedWeapon } = useGameStore((state) => state);

  useInterval(() => {
    spawnEnemy(grid.start);
  }, 1000);

  const obstacles = useMemo(() => {
    return weapons.map((weapon) => ({
      position: weapon.position,
      radius: weapon.radius,
    }));
  }, [weapons]);

  const handleEnemyUpdate = useCallback((enemy: Enemy, delta: number) => {
    // console.log("delta", delta)
    const direction = getNextDirection(enemy, grid, obstacles);
    const speed = enemy.speed * delta * 100; // Adjust speed based on delta time
    const position: [number, number] = [
      enemy.position[0] + Math.cos(direction) * speed,
      enemy.position[1] + Math.sin(direction) * speed,
    ];
  
    if (positionEquals(position, grid.end)) {
      if (enemy.removed !== "fly") {
        removeEnemy(enemy.id, "fly");
        setTimeout(() => {
          despawnEnemy(enemy.id);
        }, 2000);
      }
    } else {
      updateEnemy({
        ...enemy,
        position,
        direction,
      });
    }
}, []); 

  useFrame((_, delta) => {
    enemies.forEach((enemy) => {
      handleEnemyUpdate(enemy, delta);
    });
  });
  

  return enemies.map((enemy) => <EnemyModel key={enemy.id} enemy={enemy} />);
}