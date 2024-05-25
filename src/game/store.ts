import { create } from "zustand";
import { Enemy, EnemyRemoveType, Grid, Weapon } from "./types";
import { getAngle } from "./utils/getAngle";

export type WeaponSpawnState = "sphere" | null;
export interface GameState {
  grid: Grid;
  enemies: Enemy[];
  weapons: Weapon[];
  weaponSpawnState: WeaponSpawnState;
  weaponSelected: Weapon | null;
}

export interface GameActions {
  spawnEnemy: (position: [number, number]) => void;
  updateEnemy: (enemy: Enemy) => void;
  removeEnemy: (id: string, type: EnemyRemoveType) => void;
  despawnEnemy: (id: string) => void;

  spawnWeapon: (position: [number, number]) => void;
  removeWeapon: (id: string) => void;

  setWeaponSpawnState: (state: WeaponSpawnState) => void;
  setWeaponSelected: (weapon: Weapon | null) => void;
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
  weaponSelected: null,

  spawnEnemy: (position: [number, number]) =>
    set((state) => ({
      enemies: [
        ...state.enemies,
        {
          id: Date.now().toString(),
          spawnTime: Date.now(),
          position,
          health: 100,
          speed: 0.01,
          direction: getAngle(state.grid.start, state.grid.end),
        },
      ],
    })),
  despawnEnemy: (id: string) =>
    set((state) => ({
      enemies: state.enemies.filter((enemy) => enemy.id !== id),
    })),
  removeEnemy: (id: string, type: EnemyRemoveType) =>
    set((state) => ({
      enemies: state.enemies.map((enemy) =>
        enemy.id === id ? { ...enemy, removed: type } : enemy
      ),
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
          id: Date.now().toString(),
          spawnTime: Date.now(),
          position,
          radius: 2,
        },
      ],
    })),
  removeWeapon: (id) =>
    set((state) => ({
      weapons: state.weapons.filter((weapon) => weapon.id !== id),
    })),

  setWeaponSpawnState: (state: WeaponSpawnState) =>
    set((prev) => ({
      ...prev,
      weaponSpawnState: state,
      weaponSelected: state === null ? prev.weaponSelected : null,
    })),
  setWeaponSelected: (weapon: Weapon | null) =>
    set((prev) => ({
      ...prev,
      weaponSelected: weapon,
      weaponSpawnState: weapon === null ? prev.weaponSpawnState : null,
    })),
}));
