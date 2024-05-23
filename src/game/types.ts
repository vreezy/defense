export interface Enemy {
  id: string;
  position: [number, number, number];
  health: number;
  speed: number;
}

export interface Grid {
  rows: number;
  columns: number;
}
