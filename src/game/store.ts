import { create } from "zustand";
import { Enemy, Grid, Weapon } from "./types";

export interface GameState {
  grid: Grid;
  enemies: Enemy[];
  weapons: Weapon[];
}
export interface GameActions {
  spawnEnemy: (position: [number, number]) => void;
  removeEnemy: (id: string) => void;
  updateEnemy: (enemy: Enemy) => void;

  spawnWeapon: (position: [number, number]) => void;
  removeWeapon: (id: string) => void;
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

  spawnEnemy: (position: [number, number]) =>
    set((state) => ({
      enemies: [
        ...state.enemies,
        {
          id: `${Date.now()}`,
          position,
          health: 100,
          speed: 0.01,
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
        },
      ],
    })),
  removeWeapon: (id) =>
    set((state) => ({
      weapons: state.weapons.filter((weapon) => weapon.id !== id),
    })),
}));
