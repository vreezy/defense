import { Enemy, Weapon } from "../types";

export type Heuristic = (enemy: Enemy, weapon: Weapon) => number;

export function findTarget(
  weapon: Weapon,
  enemies: Enemy[],
  heuristic: Heuristic = getHeuristic(weapon)
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
    const h = heuristic(enemy, weapon);
    if (h < min) {
      min = h;
      target = enemy;
    }
  });
  return target;
}

function oldestHeuristic(enemy: Enemy, _weapon: Weapon) {
  return enemy.spawnedAt.valueOf();
}
function youngestHeuristic(enemy: Enemy, _weapon: Weapon) {
  return -enemy.spawnedAt.valueOf();
}
function closestHeuristic(enemy: Enemy, weapon: Weapon) {
  return Math.hypot(
    enemy.position[0] - weapon.position[0],
    enemy.position[2] - weapon.position[1]
  );
}
function weakestHeuristic(enemy: Enemy, _weapon: Weapon) {
  return enemy.health;
}
function strongestHeuristic(enemy: Enemy, _weapon: Weapon) {
  return -enemy.health;
}

function getHeuristic(weapon: Weapon) {
  switch (weapon.focusMode) {
    case "nearest":
      return closestHeuristic;
    case "oldest":
      return oldestHeuristic;
    case "youngest":
      return youngestHeuristic;
    case "weakest":
      return weakestHeuristic;
    case "strongest":
      return strongestHeuristic;
    default:
      return closestHeuristic;
  }
}
