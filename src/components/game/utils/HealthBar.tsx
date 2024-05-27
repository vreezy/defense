import React from "react";
import { Cylinder } from "@react-three/drei";

export default function HealthBar({
  position,
  rotation,
  scale = [1, 1, 1],
  radius = 0.1,
  length = 1,
  percent,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale?: [number, number, number];
  radius?: number;
  length?: number;
  percent: number;
}) {
  const greenLength = length * percent;
  const redLength = length * (1 - percent);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Cylinder
        args={[radius, radius, redLength, 32, 1, false]}
        position={[0, -length / 2 + redLength / 2, 0]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
      >
        <meshBasicMaterial attach="material" color="red" />
      </Cylinder>
      <Cylinder
        args={[radius, radius, greenLength, 32, 1, false]}
        position={[0, length / 2 - greenLength / 2, 0]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
      >
        <meshBasicMaterial attach="material" color="green" />
      </Cylinder>
    </group>
  );
}
