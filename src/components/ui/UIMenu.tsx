"use client";

import { useGameStore } from "@/game/store";
import { cn } from "@/utils/cn";

export default function UIMenu() {
  const {
    setWeaponSpawnState,
    weaponSpawnState,
    weaponSelected,
    setWeaponSelected,
  } = useGameStore((state) => state);
  return (
    <div className="backdrop-blur shadow border border-white/50 bg-neutral-200/50 p-8 w-full flex justify-center">
      {weaponSelected ? (
        <button
          className="px-4 py-3 font-semibold rounded-xl bg-red-300"
          onClick={() => {
            setWeaponSelected(null);
          }}
        >
          {"Unselect"}
        </button>
      ) : (
        <button
          className={cn(
            "px-4 py-3 font-semibold rounded-xl",
            weaponSpawnState ? "bg-green-300" : "bg-blue-300"
          )}
          onClick={() => {
            setWeaponSpawnState(weaponSpawnState ? null : "sphere");
          }}
        >
          {"Sphere"}
        </button>
      )}
    </div>
  );
}
