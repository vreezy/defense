import { create } from "zustand";
import { Enemy, Grid } from "./types";

export interface GameState {
  grid: Grid;
  enemies: Enemy[];
}
export interface GameActions {
  spawnEnemy: (enemy: Enemy) => void;
  removeEnemy: (id: string) => void;
}
export type GameStore = GameState & GameActions;

export const useGameStore = create<GameStore>()((set) => ({
  grid: {
    rows: 10,
    columns: 10,
    start: [0, 0],
    end: [9, 9],
  },
  enemies: [
    {
      id: "1",
      position: [5, 3],
      health: 100,
      speed: 1,
    },
  ],
  spawnEnemy: (enemy) =>
    set((state) => ({
      enemies: [...state.enemies, enemy],
    })),
  removeEnemy: (id) =>
    set((state) => ({
      enemies: state.enemies.filter((enemy) => enemy.id !== id),
    })),
}));
