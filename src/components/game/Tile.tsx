import React, { useCallback } from "react";
import { useGameStore } from "@/game/store";
import { positionEquals } from "@/game/utils/positionEquals";
import { checkPaths } from "@/game/utils/pathfinding";
import TileModel from "./models/TileModel";
import { ThreeEvent } from "@react-three/fiber";

export function Tile({
  position,
  color,
}: {
  position: [number, number];
  color?: string;
}) {
  const {
    enemies,
    weapons,
    spawnWeapon,
    grid,
    weaponSpawnType,
    setSelectedWeapon,
  } = useGameStore((state) => state);

  const onClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      console.log("Clicked tile", position);
      setSelectedWeapon(null);
      if (weaponSpawnType === null) return;
      console.log("Trying to spawn weapon at", position);
      const taken = weapons.find((weapon) =>
        positionEquals(weapon.position, position)
      );
      if (taken) {
        console.log("Position already taken");
        return;
      }
      if (
        !checkPaths(
          enemies.map((enemy) => ({
            position: [enemy.position[0], enemy.position[2]],
          })),
          grid,
          [...weapons, { position }]
        )
      ) {
        console.log("No path to end");
        return;
      }
      console.log("Spawning weapon at", position);
      spawnWeapon(position);
    },
    [position, weapons, spawnWeapon]
  );

  return (
    <TileModel
      position={[position[0], -0.15, position[1]]}
      tint={color}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
    />
  );
}
