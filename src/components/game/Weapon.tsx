"use client";

import React, { useEffect } from "react";
import { MeshProps } from "@react-three/fiber";
import { useGameStore } from "@/game/store";
import { type Weapon } from "@/game/types";
import useClickOrDrag from "@/game/utils/useClickOrDrag";

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

  const { props } = useClickOrDrag({
    onClick: () => setWeaponSelected(weapon),
  });

  return (
    <mesh position={[weapon.position[0], 0.3, weapon.position[1]]} {...props}>
      <boxGeometry args={selected ? [1, 1, 1] : [0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
