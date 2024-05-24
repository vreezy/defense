"use client";

import React, { useEffect } from "react";
import { MeshProps, useFrame } from "@react-three/fiber";
import { useGameStore } from "@/game/store";
import { type Weapon } from "@/game/types";
import BlasterModel from "./models/BlasterModel";

function usePulse(from: number, to: number, speed: number) {
  const [scale, setScale] = React.useState(from);
  useFrame(({ clock }) => {
    const scale =
      from + (to - from) * (Math.sin(clock.getElapsedTime() * speed) / 2 + 0.5);
    setScale(scale);
  });
  return scale;
}

export function Weapon({
  weapon,
  color,
}: Omit<MeshProps, "position"> & {
  weapon: Weapon;
  color?: string;
}) {
  const { setWeaponSelected, weaponSelected } = useGameStore((state) => state);
  const [selected, setSelected] = React.useState(false);

  useEffect(() => {
    setSelected(weaponSelected?.id === weapon.id);
    console.log("Weapon selected", weaponSelected?.id === weapon.id);
  }, [weaponSelected, weapon.id]);
  const pulse = usePulse(1.1, 1.2, 2);

  return (
    <BlasterModel
      position={[weapon.position[0], 0.05, weapon.position[1]]}
      scale={selected ? pulse : 1}
      onClick={(e) => {
        e.stopPropagation();
        setWeaponSelected(weapon);
      }}
    />
  );
}
