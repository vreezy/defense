import React, { useEffect, useMemo } from "react";
import { MeshProps } from "@react-three/fiber";
import GreenUFOModel from "./models/GreenUFOModel";
import { a } from "@react-spring/three";
import usePulse from "@/game/utils/usePulse";
import { type Enemy as EnemyType } from "@/game/types";

interface EnemyProps extends Omit<MeshProps, "position"> {
  enemy: EnemyType;
}

export const Enemy: React.FC<EnemyProps> = ({ enemy }) => {
  const offset = useMemo(() => Math.random() * Math.PI, []);
  const height = usePulse(0.1, 0.2, 2, offset);

  return (
    <a.group
      position={[enemy.position[0], height, enemy.position[1]]}
      scale={0.5}
    >
      <GreenUFOModel />
    </a.group>
  );
};
