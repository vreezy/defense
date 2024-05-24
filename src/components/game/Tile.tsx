import React, { useCallback } from "react";
import { useGameStore } from "@/game/store";
import { positionEquals } from "@/game/utils/positionEquals";
import { checkPaths } from "@/game/utils/pathfinding";
import useClickOrDrag from "@/game/utils/useClickOrDrag";
import TileModel from "./models/TileModel";
import { Group } from "three";

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
    weaponSpawnState,
    setWeaponSelected,
  } = useGameStore((state) => state);

  const onClick = useCallback(() => {
    setWeaponSelected(null);
    if (weaponSpawnState !== "sphere") return;
    console.log("Trying to spawn weapon at", position);
    const taken = weapons.find((weapon) =>
      positionEquals(weapon.position, position)
    );
    if (taken) {
      console.log("Position already taken");
      return;
    }
    if (!checkPaths(enemies, grid, [...weapons, { position }])) {
      console.log("No path to end");
      return;
    }
    console.log("Spawning weapon at", position);
    spawnWeapon(position);
  }, [position, weapons, spawnWeapon]);

  const { props, hovering } = useClickOrDrag<Group>({
    onClick,
  });

  return (
    <TileModel
      position={[position[0], 0, position[1]]}
      {...props}
      tint={color}
    />
  );
}
