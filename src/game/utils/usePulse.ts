import { useFrame } from "@react-three/fiber";
import { useState } from "react";

export default function usePulse(
  from: number,
  to: number,
  speed: number,
  offset: number = 0
) {
  const [scale, setScale] = useState(from);
  useFrame(({ clock }) => {
    const scale =
      from +
      (to - from) *
        (Math.sin(clock.getElapsedTime() * speed + offset) / 2 + 0.5);
    setScale(scale);
  });
  return scale;
}
