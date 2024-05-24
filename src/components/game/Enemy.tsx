import React from "react";
import { MeshProps } from "@react-three/fiber";

interface EnemyProps extends Omit<MeshProps, "position"> {
  position: [number, number];
  color?: string;
}

export const Enemy: React.FC<EnemyProps> = ({ position, color }) => {
  return (
    <mesh position={[position[0], 0.3, position[1]]}>
      <sphereGeometry args={[0.25, 32, 16]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
