"use client";
import { Game } from "@/game/Game";
import { useGame } from "@/game/useGame";
import { useEffect, useRef, useState } from "react";

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameInstance, setGameInstance] = useState<Game | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const game = new Game(canvasRef.current);
      setGameInstance(game);
    }
  }, []);

  useGame(gameInstance);

  return (
    <div>
      <canvas ref={canvasRef} id="game" width="800" height="600"></canvas>
    </div>
  );
}
