import React from "react";
import { MeshProps } from "@react-three/fiber";

interface TileProps extends Omit<MeshProps, "position"> {
  position: [number, number];
  color?: string;
}

export const Tile: React.FC<TileProps> = ({ position, color }) => {
  return (
    <mesh position={[position[0], 0, position[1]]}>
      <boxGeometry args={[1, 0.1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
