import { create } from "zustand";
import { Enemy, Grid, Weapon } from "./types";
import { getAngle } from "./utils/getAngle";

export type WeaponSpawnState = "sphere" | null;
export interface GameState {
  grid: Grid;
  enemies: Enemy[];
  weapons: Weapon[];
  weaponSpawnState: WeaponSpawnState;
}

export interface GameActions {
  spawnEnemy: (position: [number, number]) => void;
  removeEnemy: (id: string) => void;
  updateEnemy: (enemy: Enemy) => void;

  spawnWeapon: (position: [number, number]) => void;
  removeWeapon: (id: string) => void;

  setWeaponSpawnState: (state: WeaponSpawnState) => void;
}
export type GameStore = GameState & GameActions;

export const useGameStore = create<GameStore>()((set) => ({
  grid: {
    rows: 10,
    columns: 10,
    start: [0, 0],
    end: [9, 9],
  },
  enemies: [],
  weapons: [],
  weaponSpawnState: null,

  spawnEnemy: (position: [number, number]) =>
    set((state) => ({
      enemies: [
        ...state.enemies,
        {
          id: `${Date.now()}`,
          position,
          health: 100,
          speed: 0.01,
          direction: getAngle(state.grid.start, state.grid.end),
        },
      ],
    })),
  removeEnemy: (id) =>
    set((state) => ({
      enemies: state.enemies.filter((enemy) => enemy.id !== id),
    })),
  updateEnemy: (update: Enemy) =>
    set((state) => ({
      enemies: state.enemies.map((enemy) =>
        enemy.id === update.id ? { ...enemy, ...update } : enemy
      ),
    })),

  spawnWeapon: (position: [number, number]) =>
    set((state) => ({
      weapons: [
        ...state.weapons,
        {
          id: `${Date.now()}`,
          position,
          radius: 0.5,
        },
      ],
    })),
  removeWeapon: (id) =>
    set((state) => ({
      weapons: state.weapons.filter((weapon) => weapon.id !== id),
    })),

  setWeaponSpawnState: (state: WeaponSpawnState) =>
    set({ weaponSpawnState: state }),
}));
