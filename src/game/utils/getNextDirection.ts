import PF from "pathfinding";
import { getAngle } from "./getAngle";
import { Grid } from "../types";

export function getMatrix(
  grid: Grid,
  obstacles: { position: [number, number] }[]
) {
  const matrix = new Array(grid.rows)
    .fill(0)
    .map(() => new Array(grid.columns).fill(0));

  obstacles.forEach((obstacle) => {
    const [x, y] = obstacle.position;
    matrix[y][x] = 1;
  }, []);

  return matrix;
}

export function getNextDirection(
  start: [number, number],
  grid: Grid,
  obstacles: {
    position: [number, number];
    radius: number;
  }[]
) {
  const finder = new PF.AStarFinder({
    diagonalMovement: PF.DiagonalMovement.OnlyWhenNoObstacles,
  });

  const path = finder.findPath(
    Math.floor(start[0]),
    Math.floor(start[1]),
    grid.end[0],
    grid.end[1],
    new PF.Grid(getMatrix(grid, obstacles))
  );

  const next: [number, number] =
    path && path[1] ? [path[1][0], path[1][1]] : grid.end;
  return getAngle(start, next);
}
