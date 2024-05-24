import React from "react";
import { MeshProps } from "@react-three/fiber";
import GreenUFOModel from "./models/GreenUFOModel";

interface EnemyProps extends Omit<MeshProps, "position"> {
  position: [number, number];
  color?: string;
}

export const Enemy: React.FC<EnemyProps> = ({ position, color }) => {
  return (
    <GreenUFOModel position={[position[0], 0.2, position[1]]} scale={0.5} />
  );
};
