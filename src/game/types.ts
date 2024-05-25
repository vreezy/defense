export type EnemyRemoveType = "fly" | "explode";
// export type WeaponFocusMode = "nearest" | "oldest" | "youngest";
export const WeaponFocusModes = ["nearest", "oldest", "youngest"] as const;
export type WeaponFocusMode = (typeof WeaponFocusModes)[number];

export interface Enemy {
  id: string;
  spawnTime: number;
  position: [number, number];
  health: number;
  speed: number;
  direction: number;
  removed?: EnemyRemoveType;
}

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
