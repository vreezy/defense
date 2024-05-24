import React from "react";
import { MeshProps } from "@react-three/fiber";

interface WeaponProps extends Omit<MeshProps, "position"> {
  position: [number, number];
  color?: string;
}

export const Weapon: React.FC<WeaponProps> = ({ position, color }) => {
  return (
    <mesh position={[position[0], 0.3, position[1]]}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
