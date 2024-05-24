import GameCanvas from "@/components/game/GameCanvas";
import UIMenu from "@/components/ui/UIMenu";

export default function Home() {
  return (
    <main className="flex justify-center w-dvw h-dvh">
      <div className="w-full h-full absolute">
        <GameCanvas />
        <div className="absolute bottom-0 left-0 w-full">
          <UIMenu />
        </div>
      </div>
    </main>
  );
}
