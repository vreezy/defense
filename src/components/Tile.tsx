import React from "react";
import { MeshProps } from "@react-three/fiber";

interface TileProps extends MeshProps {
  position: [number, number, number];
  color?: string;
}

export const Tile: React.FC<TileProps> = ({ position, color }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 0.1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
