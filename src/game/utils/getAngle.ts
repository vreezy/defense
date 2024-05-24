export function getAngle(
  start: [number, number],
  goal: [number, number]
): number {
  const dx = goal[0] - start[0];
  const dy = goal[1] - start[1];
  return Math.atan2(dy, dx);
}
