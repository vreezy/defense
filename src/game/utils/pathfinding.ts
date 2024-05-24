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

function findPath(from: [number, number], grid: Grid, obstacles: Obstacle[]) {
  const finder = new PF.AStarFinder({
    diagonalMovement: PF.DiagonalMovement.OnlyWhenNoObstacles,
  });

  try {
    return finder.findPath(
      Math.floor(from[0]),
      Math.floor(from[1]),
      grid.end[0],
      grid.end[1],
      new PF.Grid(getMatrix(grid, obstacles))
    );
  } catch (e) {
    console.error(e);
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
