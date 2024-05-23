import GameCanvas from "@/components/GameCanvas";

export default function Home() {
  return (
    <main className="flex justify-center">
      <div className="w-[500px] h-[500px]">
        <GameCanvas />
      </div>
    </main>
  );
}
