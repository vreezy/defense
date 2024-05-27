import { Enemy, Weapon } from "../types";

export function findTarget(
  weapon: Weapon,
  enemies: Enemy[],
  heuristic: (enemy: Enemy) => number
): Enemy | null {
  let min = Infinity;
  let target: Enemy | null = null;
  enemies.forEach((enemy) => {
    if (enemy.state !== "moving") {
      return;
    }

    const dist = Math.hypot(
      enemy.position[0] - weapon.position[0],
      enemy.position[2] - weapon.position[1]
    );
    if (dist > weapon.radius) {
      return;
    }
    const h = heuristic(enemy);
    if (h < min) {
      min = h;
      target = enemy;
    }
  });
  return target;
}
