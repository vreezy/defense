import PF from "pathfinding";
import { getAngle } from "./getAngle";
import { Grid } from "../types";

export interface Obstacle {
  position: [number, number];
}
export interface Follower {
  position: [number, number];
  direction: number;
}

function getMatrix(grid: Grid, obstacles: Obstacle[]) {
  const matrix = new Array(grid.rows)
    .fill(0)
    .map(() => new Array(grid.columns).fill(0));

  obstacles.forEach((obstacle) => {
    const [x, y] = obstacle.position;
    matrix[y][x] = 1;
  }, []);

  return matrix;
}

export function findPath(
  from: [number, number],
  grid: Grid,
  obstacles: Obstacle[]
): [number, number][] | undefined {
  const finder = new PF.AStarFinder({
    diagonalMovement: PF.DiagonalMovement.OnlyWhenNoObstacles,
  });

  // console.log("Finding path", from, [Math.round(from[0]), Math.round(from[1])]);

  try {
    const path = finder.findPath(
      Math.round(from[0]),
      Math.round(from[1]),
      grid.end[0],
      grid.end[1],
      new PF.Grid(getMatrix(grid, obstacles))
    );
    return path.map(([x, y]) => [x, y]);
  } catch (e) {
    return undefined;
  }
}

export function getNextDirection(
  follower: Follower,
  grid: Grid,
  obstacles: Obstacle[],
  smoothingThreshold: number = 0.5
) {
  const path = findPath(follower.position, grid, obstacles);

  const next: [number, number] =
    path && path[1] ? [path[1][0], path[1][1]] : grid.end;
  let currentAngle = getAngle(follower.position, next);

  if (Math.abs(currentAngle - follower.direction) > smoothingThreshold) {
    // Smooth out the direction change
    currentAngle =
      follower.direction +
      Math.sign(currentAngle - follower.direction) * smoothingThreshold;
  }

  return currentAngle;
}

export function checkPaths(
  froms: {
    position: [number, number];
  }[],
  grid: Grid,
  obstacles: Obstacle[]
) {
  return !froms.some(({ position }) => {
    const path = findPath(position, grid, obstacles);
    return !(path && path.length > 0);
  });
}

export function checkPath(
  grid: Grid,
  obstacles: Obstacle[],
  newObstacle: Obstacle
) {
  const path = findPath(grid.start, grid, [...obstacles, newObstacle]);
  return path && path.length > 0;
}

export function distanceOfPath(path: [number, number][]): number {
  let distance = 0;
  for (let i = 1; i < path.length; i++) {
    distance += Math.hypot(
      path[i][0] - path[i - 1][0],
      path[i][1] - path[i - 1][1]
    );
  }
  return distance;
}
