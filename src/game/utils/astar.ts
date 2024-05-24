import { positionEquals } from "./positionEquals";

type Point = [number, number];

interface Obstacle {
  position: Point;
  radius: number;
}

function heuristic(a: Point, b: Point): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

function getNeighbors(node: Point, obstacles: Obstacle[]): Point[] {
  const directions: Point[] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];
  const neighbors: Point[] = [];
  directions.forEach((dir) => {
    const neighbor: Point = [node[0] + dir[0], node[1] + dir[1]];
    const isObstacle = obstacles.some((obs) => {
      return heuristic(neighbor, obs.position) <= obs.radius;
    });
    if (!isObstacle) {
      neighbors.push(neighbor);
    }
  });
  return neighbors;
}

const asString = (point: Point) => `${point[0]},${point[1]}`;

export function astar(
  start: Point,
  goal: Point,
  obstacles: Obstacle[],
  maxIterations: number = 100
): Point[] | null {
  let openSet: Point[] = [start];
  const cameFrom: Map<string, Point | undefined> = new Map();
  const gScore: Map<string, number> = new Map();
  gScore.set(asString(start), 0);

  const fScore: Map<string, number> = new Map();
  fScore.set(asString(start), heuristic(start, goal));

  let iterations = 0;

  while (openSet.length > 0) {
    iterations++;
    if (iterations > maxIterations) {
      console.log("Exceeded maximum iterations");
      return null;
    }
    let current = openSet.reduce((lowest, node) => {
      return fScore.get(asString(node))! < fScore.get(asString(lowest))!
        ? node
        : lowest;
    }, openSet[0]);

    if (positionEquals(current, goal)) {
      const path: Point[] = [];
      while (current) {
        path.push(current);
        const prev = cameFrom.get(asString(current));
        if (prev === undefined) {
          break;
        }
        current = prev;
      }

      path.reverse();
      return path;
    }

    openSet = openSet.filter((node) => asString(node) !== asString(current));
    const neighbors = getNeighbors(current, obstacles);
    neighbors.forEach((neighbor) => {
      const tentativeGScore =
        gScore.get(asString(current))! + heuristic(current, neighbor);
      if (tentativeGScore < (gScore.get(asString(neighbor)) || Infinity)) {
        cameFrom.set(asString(neighbor), current);
        gScore.set(asString(neighbor), tentativeGScore);
        fScore.set(
          asString(neighbor),
          tentativeGScore + heuristic(neighbor, goal)
        );
        if (!openSet.find((node) => asString(node) === asString(neighbor))) {
          openSet.push(neighbor);
        }
      }
    });
  }
  return null;
}
