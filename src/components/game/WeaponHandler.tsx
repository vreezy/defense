import { useGameStore } from "@/game/store";
import { Weapon } from "./Weapon";

export default function WeaponHandler() {
  const { weapons } = useGameStore((state) => state);

  return weapons.map((weapon) => <Weapon key={weapon.id} weapon={weapon} />);
}
