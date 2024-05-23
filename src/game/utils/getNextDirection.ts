import { Grid } from "../types";

export function getNextDirection(
  grid: Grid,
  curr: {
    position: [number, number];
  },
  osbtacles: {
    position: [number, number];
  }[]
) {
  const dirToEnd = Math.atan2(
    grid.end[1] - curr.position[1],
    grid.end[0] - curr.position[0]
  );

  return dirToEnd;
}
