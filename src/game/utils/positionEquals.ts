export function positionEquals(
  position1: [number, number],
  position2: [number, number],
  tolerance: number = 0.1
) {
  return (
    Math.abs(position1[0] - position2[0]) < tolerance &&
    Math.abs(position1[1] - position2[1]) < tolerance
  );
}
