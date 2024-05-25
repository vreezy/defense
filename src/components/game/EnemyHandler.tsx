"use client";

import { useGameStore } from "@/game/store";
import { Enemy } from "./Enemy";
import { useInterval } from "react-use";

export default function EnemyHandler() {
  const { grid, enemies, spawnEnemy } = useGameStore((state) => state);

  useInterval(() => {
    spawnEnemy(grid.start);
  }, 1000);

  return enemies.map((enemy) => <Enemy key={enemy.id} enemy={enemy} />);
}
