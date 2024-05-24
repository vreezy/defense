"use client";

import { useGameStore } from "@/game/store";
import { cn } from "@/utils/cn";
import { useState } from "react";

export default function UIMenu() {
  const [toggled, setToggled] = useState(false);
  const setWeaponSpawnState = useGameStore(
    (state) => state.setWeaponSpawnState
  );
  return (
    <div className="backdrop-blur shadow border border-white/50 bg-neutral-200/50 p-8 w-full flex justify-center">
      <button
        className={cn(
          "px-4 py-3 font-semibold rounded-xl",
          toggled ? "bg-green-300" : "bg-blue-300"
        )}
        onClick={() => {
          setToggled(!toggled);
          setWeaponSpawnState(toggled ? null : "sphere");
        }}
      >
        {"Sphere"}
      </button>
    </div>
  );
}
