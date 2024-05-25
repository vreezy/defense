/**
 * Linearly interpolates between two angles in radians.
 * @param from The starting angle in radians.
 * @param to The ending angle in radians.
 * @param t The interpolation factor (0.0 to 1.0).
 * @returns The interpolated angle in radians.
 */
export function angleLerp(from: number, to: number, t: number): number {
  const twoPi = Math.PI * 2;

  // Calculate the difference and wrap around
  let difference = (to - from) % twoPi;
  if (difference < -Math.PI) {
    difference += twoPi;
  } else if (difference > Math.PI) {
    difference -= twoPi;
  }

  return from + difference * t;
}
