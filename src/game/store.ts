import { create } from "zustand";

export interface GameState {
  count: number;
}
export interface GameActions {
  increase: (by: number) => void;
}
export type GameStore = GameState & GameActions;

export const useGameStore = create<GameStore>()((set) => ({
  count: 1,
  increase: (by: number) => set((state) => ({ count: state.count + by })),
}));
