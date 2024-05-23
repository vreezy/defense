"use client";

import { useGameStore } from "@/game/store";
import { Weapon } from "./Weapon";
import { useEffect } from "react";

export default function WeaponHandler() {
  const { weapons } = useGameStore((state) => state);

  return weapons.map((weapon) => (
    <Weapon key={weapon.id} position={weapon.position} color="blue" />
  ));
}
