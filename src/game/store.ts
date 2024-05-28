import { create } from "zustand";
import {
  Enemy,
  EnemyRemoveType,
  Grid,
  Weapon,
  WeaponFocusMode,
  WeaponType,
} from "./types";
import { getAngle } from "./utils/getAngle";

export interface GameState {
  grid: Grid;
  enemies: Enemy[];
  weapons: Weapon[];
  weaponSpawnType: WeaponType | null;
  selectedWeapon: string | null;
}

export interface GameActions {
  spawnEnemy: (position: [number, number]) => void;
  updateEnemy: (enemy: Enemy) => void;
  despawnEnemy: (id: string) => void;

  spawnWeapon: (position: [number, number]) => void;
  updateWeapon: (weapon: Weapon) => void;
  removeWeapon: (id: string) => void;

  setWeaponSpawnType: (type: WeaponType | null) => void;
  setSelectedWeapon: (id: string | null) => void;
}
export type GameStore = GameState & GameActions;

function newWeapon(state: GameState, position: [number, number]): Weapon {
  if (state.weaponSpawnType === null) {
    throw new Error("Weapon spawn type is null");
  }

  let properties: Partial<Weapon> = {};

  switch (state.weaponSpawnType) {
    case "Turret":
      properties = {
        radius: 2,
        focusMode: "nearest",
        speed: 0.1,
        damage: 0.1,
      };
      break;
    case "Cannon":
      properties = {
        radius: 3,
        focusMode: "strongest",
        speed: 0.5,
        damage: 0.5,
      };
      break;
  }

  const now = Date.now();
  return {
    id: now.toString(),
    position,
    type: state.weaponSpawnType!,
    ...properties,
  } as Weapon;
}

export const useGameStore = create<GameStore>()((set) => ({
  grid: {
    rows: 10,
    columns: 10,
    start: [0, 0],
    end: [9, 9],
  },
  enemies: [],
  weapons: [],
  weaponSpawnType: null,
  selectedWeapon: null,

  spawnEnemy: () =>
    set((state) => ({
      enemies: [
        ...state.enemies,
        {
          id: Date.now().toString(),
          position: [state.grid.start[0], 10, state.grid.start[1]],
          maxHealth: 10,
          health: 10,
          speed: 0.01,
          direction: getAngle(state.grid.start, state.grid.end),
          spawnedAt: Date.now(),
          state: "spawning",
        },
      ],
    })),
  despawnEnemy: (id: string) => {
    set((state) => ({
      enemies: state.enemies.filter((enemy) => enemy.id !== id),
    }));
  },
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
      weapons: [...state.weapons, newWeapon(state, position)],
    })),
  updateWeapon: (update: Weapon) =>
    set((state) => ({
      weapons: state.weapons.map((weapon) =>
        weapon.id === update.id ? { ...weapon, ...update } : weapon
      ),
    })),
  removeWeapon: (id) =>
    set((state) => ({
      weapons: state.weapons.filter((weapon) => weapon.id !== id),
    })),

  setWeaponSpawnType: (type: WeaponType | null) =>
    set((prev) => ({
      ...prev,
      weaponSpawnType: type,
      selectedWeapon: type === null ? prev.selectedWeapon : null,
    })),
  setSelectedWeapon: (id: string | null) =>
    set((prev) => ({
      ...prev,
      selectedWeapon: id,
      weaponSpawnType: id === null ? prev.weaponSpawnType : null,
    })),
}));
