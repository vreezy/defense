"use client";

import React, { useEffect } from "react";
import { MeshProps, useFrame } from "@react-three/fiber";
import { useGameStore } from "@/game/store";
import { type Weapon } from "@/game/types";
import BlasterModel from "./models/BlasterModel";
import { useSpring, a } from "@react-spring/three";
import usePulse from "@/game/utils/usePulse";

export function Weapon({
  weapon,
}: Omit<MeshProps, "position"> & {
  weapon: Weapon;
}) {
  const { setWeaponSelected, weaponSelected } = useGameStore((state) => state);
  const [selected, setSelected] = React.useState(false);

  useEffect(() => {
    setSelected(weaponSelected?.id === weapon.id);
    console.log("Weapon selected", weaponSelected?.id === weapon.id);
  }, [weaponSelected, weapon.id]);
  const pulse = usePulse(1.15, 1.3, 2);

  // Use spring for smooth scaling transitions
  const { scale } = useSpring({
    scale: selected ? pulse : 1,
    config: { tension: 170, friction: 26 }, // Adjust the config for smoothness
  });

  return (
    <a.group
      position={[weapon.position[0], 0.05, weapon.position[1]]}
      scale={scale}
    >
      <BlasterModel
        onClick={(e) => {
          e.stopPropagation();
          setWeaponSelected(weapon);
        }}
      />
    </a.group>
  );
}
