import React, { useMemo } from "react";
import { MeshProps } from "@react-three/fiber";
import GreenUFOModel from "./models/GreenUFOModel";
import { a, useSpring } from "@react-spring/three";
import usePulse from "@/game/utils/usePulse";
import { type Enemy as EnemyType } from "@/game/types";

interface EnemyProps extends Omit<MeshProps, "position"> {
  enemy: EnemyType;
}

export const Enemy: React.FC<EnemyProps> = ({ enemy }) => {
  const offset = useMemo(() => Math.random() * Math.PI, []);
  const height = usePulse(0.1, 0.2, 2, offset);

  const { positionY, scale } = useSpring({
    from: { positionY: 5, scale: 0 },
    to: {
      positionY: enemy.removed === "fly" ? 10 : height, // Fly up if removed

      scale: enemy.removed === "fly" ? 0 : 0.5, // Scale to 0 if removed
    },
    config: { mass: 1, tension: 100, friction: 20 },
    delay: 0,
    loop: false,
  });

  return (
    <a.group
      position={[enemy.position[0], positionY.get(), enemy.position[1]]}
      scale={scale}
    >
      <GreenUFOModel />
    </a.group>
  );
};
