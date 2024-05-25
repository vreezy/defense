"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MeshProps, useFrame } from "@react-three/fiber";
import { useGameStore } from "@/game/store";
import { Enemy, type Weapon as WeaponType } from "@/game/types";
import BlasterModel from "./models/BlasterModel";
import { useSpring, a } from "@react-spring/three";
import usePulse from "@/game/utils/usePulse";
import Ring from "./utils/Ring";
import DebugLine from "./utils/DebugLine";
import { distanceOfPath, findPath } from "@/game/utils/pathfinding";
import { getAngle } from "@/game/utils/getAngle";
import { angleLerp } from "@/game/utils/angleLerp";
import { findTarget } from "@/game/utils/findTarget";

function convertAngle(angle: number) {
  return Math.PI - angle + Math.PI / 2;
}

export function Weapon({
  weapon,
}: Omit<MeshProps, "position"> & {
  weapon: WeaponType;
}) {
  const { enemies, setWeaponSelected, weaponSelected, grid } = useGameStore(
    (state) => state
  );
  const [selected, setSelected] = React.useState(false);
  const [direction, setDirection] = React.useState(0);
  const [rawDirection, setRawDirection] = React.useState(
    convertAngle(getAngle(weapon.position, grid.start))
  );
  const [target, setTarget] = React.useState<Enemy | null>(null);

  useEffect(() => {
    setSelected(weaponSelected?.id === weapon.id);
    console.log("Weapon selected", weaponSelected?.id === weapon.id);
  }, [weaponSelected, weapon.id]);

  const pulse = usePulse(1.15, 1.3, 2);

  const obstacles = useMemo(() => {
    return enemies.map((enemy) => ({
      position: enemy.position,
      radius: 0.5,
    }));
  }, [enemies]);
  const youngestHeuristic = (enemy: Enemy) => {
    return -enemy.spawnTime.valueOf();
  };
  const oldestHeuristic = (enemy: Enemy) => {
    return enemy.spawnTime.valueOf();
  };
  const closestHeuristic = useCallback(
    (enemy: Enemy) => {
      return Math.hypot(
        enemy.position[0] - weapon.position[0],
        enemy.position[1] - weapon.position[1]
      );
    },
    [weapon.position]
  );

  // Use spring for smooth scaling transitions
  const { scale } = useSpring({
    scale: selected ? pulse : 1,
    config: { tension: 170, friction: 26 }, // Adjust the config for smoothness
  });

  useFrame(() => {
    const target = findTarget(weapon, enemies, oldestHeuristic);

    if (target) {
      setRawDirection(convertAngle(getAngle(weapon.position, target.position)));
      setTarget(target);
    } else {
      setRawDirection((prev) => prev + 0.01);
      setTarget(null);
    }

    setDirection((direction) => {
      return angleLerp(direction, rawDirection, 0.1);
    });
  });

  return (
    <>
      <a.group
      // scale={scale}
      >
        <BlasterModel
          rotation={[0, direction, 0]}
          position={[weapon.position[0], 0.05, weapon.position[1]]}
          onClick={(e) => {
            e.stopPropagation();
            setWeaponSelected(weapon);
          }}
        />
      </a.group>
      {selected && (
        <>
          <Ring
            position={[weapon.position[0], 0.1, weapon.position[1]]}
            radius={weapon.radius}
          />
          {target && (
            <Ring
              position={[target.position[0], 0.1, target.position[1]]}
              radius={0.25}
              color={"#f54949"}
            />
          )}
        </>
      )}

      <DebugLine
        position={[
          weapon.position[0] - Math.sin(direction) * 0.5,
          0.05,
          weapon.position[1] - Math.cos(direction) * 0.5,
        ]}
        rotation={[0, direction + Math.PI / 2, Math.PI / 2]}
        length={1}
        color={"green"}
      />
      <DebugLine
        position={[
          weapon.position[0] - Math.sin(rawDirection) * 0.5,
          0.05,
          weapon.position[1] - Math.cos(rawDirection) * 0.5,
        ]}
        rotation={[0, rawDirection + Math.PI / 2, Math.PI / 2]}
        length={1}
        color={"red"}
      />
    </>
  );
}
