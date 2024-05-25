export type EnemyRemoveType = "fly" | "explode";

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
}

export interface Grid {
  rows: number;
  columns: number;
  start: [number, number];
  end: [number, number];
}
