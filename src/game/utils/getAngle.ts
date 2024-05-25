export function getAngle(from: [number, number], to: [number, number]): number {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  return Math.atan2(dy, dx);
}
