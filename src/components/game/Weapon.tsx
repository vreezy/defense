import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { MeshProps, useFrame } from "@react-three/fiber";
import { useGameStore } from "@/game/store";
import { Enemy, type Weapon as WeaponType } from "@/game/types";
import BlasterModel from "./models/BlasterModel";
import { useSpring } from "@react-spring/three";
import usePulse from "@/game/utils/usePulse";
import Ring from "./utils/Ring";
import DebugLine from "./utils/DebugLine";
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
  const { enemies, setSelectedWeapon, selectedWeapon, grid } = useGameStore(
    (state) => state
  );
  const selected = useMemo(
    () => selectedWeapon === weapon.id,
    [selectedWeapon, weapon.id]
  );
  const directionRef = useRef(0);
  const rawDirectionRef = useRef(
    convertAngle(getAngle(weapon.position, grid.start))
  );
  const targetRef = useRef<Enemy | null>(null);

  const pulse = usePulse(1.15, 1.3, 2);

  const oldestHeuristic = useCallback((enemy: Enemy) => {
    return enemy.spawnTime.valueOf();
  }, []);
  const youngestHeuristic = (enemy: Enemy) => {
    return -enemy.spawnTime.valueOf();
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

  const { scale } = useSpring({
    scale: selected ? pulse : 1,
    config: { tension: 170, friction: 26 },
  });

  useFrame(() => {
    const target = findTarget(
      weapon,
      enemies,
      weapon.focusMode === "nearest"
        ? closestHeuristic
        : weapon.focusMode === "oldest"
        ? oldestHeuristic
        : youngestHeuristic
    );

    if (target && target !== targetRef.current) {
      rawDirectionRef.current = convertAngle(
        getAngle(weapon.position, target.position)
      );
      targetRef.current = target;
    } else if (!target) {
      rawDirectionRef.current += 0.01;
      targetRef.current = null;
    }

    directionRef.current = angleLerp(
      directionRef.current,
      rawDirectionRef.current,
      0.1
    );
  });

  return (
    <>
      <BlasterModel
        rotation={[0, directionRef.current, 0]}
        position={[weapon.position[0], 0.05, weapon.position[1]]}
        scale={scale.get()}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedWeapon(weapon.id);
        }}
      />
      {selected && (
        <>
          <Ring
            position={[weapon.position[0], 0.1, weapon.position[1]]}
            radius={weapon.radius}
          />
          {targetRef.current && (
            <Ring
              position={[
                targetRef.current.position[0],
                0.1,
                targetRef.current.position[1],
              ]}
              radius={0.25}
              color={"#f54949"}
            />
          )}
        </>
      )}

      <DebugLine
        position={[
          weapon.position[0] - Math.sin(directionRef.current) * 0.5,
          0.05,
          weapon.position[1] - Math.cos(directionRef.current) * 0.5,
        ]}
        rotation={[0, directionRef.current + Math.PI / 2, Math.PI / 2]}
        length={1}
        color={"green"}
      />
      <DebugLine
        position={[
          weapon.position[0] - Math.sin(rawDirectionRef.current) * 0.5,
          0.05,
          weapon.position[1] - Math.cos(rawDirectionRef.current) * 0.5,
        ]}
        rotation={[0, rawDirectionRef.current + Math.PI / 2, Math.PI / 2]}
        length={1}
        color={"red"}
      />
    </>
  );
}
