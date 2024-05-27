export type EnemyRemoveType = "fly" | "explode";
export type EnemyState = "spawning" | "moving" | "despawning";
export interface Enemy {
  id: string;
  position: [number, number, number];
  health: number;
  speed: number;
  direction: number;
  spawnedAt: number;
  state: EnemyState;
}

export const WeaponFocusModes = ["nearest", "oldest", "youngest"] as const;
export type WeaponFocusMode = (typeof WeaponFocusModes)[number];
export interface Weapon {
  id: string;
  position: [number, number];
  radius: number;
  focusMode: WeaponFocusMode;
}

export interface Grid {
  rows: number;
  columns: number;
  start: [number, number];
  end: [number, number];
}
