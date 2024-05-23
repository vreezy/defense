import { Grid } from "../types";

interface Node {
  position: [number, number];
  g: number; // Cost from start to current node
  h: number; // Heuristic cost from current node to end
  f: number; // Total cost (g + h)
  parent?: Node; // To trace the path back
}
class PriorityQueue<T> {
  private items: { item: T; priority: number }[] = [];

  enqueue(item: T, priority: number) {
    this.items.push({ item, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  dequeue(): T | undefined {
    return this.items.shift()?.item;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}
function heuristic(a: [number, number], b: [number, number]): number {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

export function astar(grid: Grid, curr: [number, number]) {
  const start: Node = {
    position: grid.start,
    g: 0,
    h: heuristic(grid.start, grid.end),
    f: 0,
  };

  const openSet = new PriorityQueue<Node>();
  openSet.enqueue(start, start.f);

  const closedSet: Set<string> = new Set();

  while (!openSet.isEmpty()) {
    const current = openSet.dequeue();

    if (!current) break;
    if (
      current.position[0] === grid.end[0] &&
      current.position[1] === grid.end[1]
    ) {
      // Found the path
      const path: [number, number][] = [];
      let temp: Node | undefined = current;
      while (temp) {
        path.push(temp.position);
        temp = temp.parent;
      }
      return path.reverse();
    }

    closedSet.add(current.position.toString());

    // Explore neighbors (4-directional)
    const neighbors: [number, number][] = [
      [current.position[0] - 1, current.position[1]],
      [current.position[0] + 1, current.position[1]],
      [current.position[0], current.position[1] - 1],
      [current.position[0], current.position[1] + 1],
    ];

    for (const neighbor of neighbors) {
      const [row, col] = neighbor;
      if (row < 0 || col < 0 || row >= grid.rows || col >= grid.columns)
        continue; // Skip out-of-bounds
      if (closedSet.has(neighbor.toString())) continue; // Skip if already evaluated

      const g = current.g + 1; // Assuming uniform cost for simplicity
      const h = heuristic(neighbor, grid.end);
      const f = g + h;

      const neighborNode: Node = {
        position: neighbor,
        g,
        h,
        f,
        parent: current,
      };
      openSet.enqueue(neighborNode, neighborNode.f);
    }
  }

  return []; // Return empty path if no path found
}
