import { useEffect } from "react";
import { Game } from "./Game";

export function useGame(game: Game | null) {
  console.log("useUpdateGame");

  useEffect(() => {
    if (!game) {
      return;
    }

    const intervalTime = 1000 / game.fps; // ms
    const interval = setInterval(() => {
      game.update();
      game.draw();
    }, intervalTime);

    return () => {
      clearInterval(interval);
    };
  }, [game]);
}
