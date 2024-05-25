import React, { useEffect, useMemo } from "react";
import { MeshProps, useFrame } from "@react-three/fiber";
import GreenUFOModel from "./models/GreenUFOModel";
import { a, useSpring } from "@react-spring/three";
import usePulse from "@/game/utils/usePulse";
import { type Enemy as EnemyType } from "@/game/types";
import { useGameStore } from "@/game/store";
import { getNextDirection } from "@/game/utils/pathfinding";
import { positionEquals } from "@/game/utils/positionEquals";

interface EnemyProps extends Omit<MeshProps, "position"> {
  enemy: EnemyType;
}

export const Enemy: React.FC<EnemyProps> = ({ enemy }) => {
  const { despawnEnemy, grid, weapons, removeEnemy, updateEnemy } =
    useGameStore((state) => state);
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

  useEffect(() => {
    if (enemy.removed && scale.get() < 0.1) {
      despawnEnemy(enemy.id);
    }
  }, [enemy.id, enemy.removed, scale]);

  const obstacles = useMemo(() => {
    return weapons.map((weapon) => ({
      position: weapon.position,
      radius: weapon.radius,
    }));
  }, [weapons]);

  useFrame(() => {
    const direction = getNextDirection(enemy, grid, obstacles);
    const position: [number, number] = [
      enemy.position[0] + Math.cos(direction) * enemy.speed,
      enemy.position[1] + Math.sin(direction) * enemy.speed,
    ];

    if (positionEquals(position, grid.end)) {
      removeEnemy(enemy.id, "fly");
    } else {
      updateEnemy({
        ...enemy,
        position,
        direction,
      });
    }
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
