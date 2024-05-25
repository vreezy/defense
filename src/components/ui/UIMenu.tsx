"use client";

import { useGameStore } from "@/game/store";
import { WeaponFocusModes } from "@/game/types";
import { cn } from "@/utils/cn";
import { useEffect, useMemo } from "react";

export default function UIMenu() {
  const {
    setWeaponSpawnState,
    weaponSpawnState,
    selectedWeapon: id,
    weapons,
    setSelectedWeapon,
    updateWeapon,
  } = useGameStore((state) => state);

  const selectedWeapon = useMemo(
    () => weapons.find((w) => w.id === id),
    [weapons, id]
  );

  return (
    <div className="backdrop-blur shadow border border-white/50 bg-neutral-200/50 p-8 w-full flex justify-center">
      {selectedWeapon ? (
        <div className="flex flex-row gap-6">
          <button
            className="px-4 py-3 font-semibold rounded-xl bg-red-300"
            onClick={() => {
              setSelectedWeapon(null);
            }}
          >
            {"Unselect"}
          </button>
          <div className="flex flex-row gap-2">
            {WeaponFocusModes.map((mode) => (
              <button
                key={mode}
                className={cn(
                  "px-4 py-3 font-semibold rounded-xl",
                  selectedWeapon.focusMode === mode
                    ? "bg-green-300"
                    : "bg-blue-300"
                )}
                onClick={() => {
                  updateWeapon({
                    ...selectedWeapon,
                    focusMode: mode,
                  });
                }}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
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
