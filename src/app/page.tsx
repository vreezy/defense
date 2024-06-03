import GameCanvas from "@/components/game/GameCanvas";
import Github from "@/components/icon/Github";
import UIMenu from "@/components/ui/UIMenu";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center w-dvw h-dvh">
      <div className="w-full h-full absolute">
        <GameCanvas />
        <div className="absolute bottom-0 right-0 w-full">
          <UIMenu />
        </div>

        <Link
          className="absolute top-0 right-0 m-2"
          href={"https://github.com/epoll31/defense"}
        >
          <Github className=" w-6 h-6" />
        </Link>
      </div>
    </main>
  );
}
