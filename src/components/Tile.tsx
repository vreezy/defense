import React, { useCallback, useRef } from "react";
import { MeshProps, useFrame, useThree } from "@react-three/fiber";
import { Mesh } from "three";
import { useGameStore } from "@/game/store";
import { positionEquals } from "@/game/utils/positionEquals";
import { checkPath } from "@/game/utils/pathfinding";

interface TileProps extends Omit<MeshProps, "position"> {
  position: [number, number];
  color?: string;
}

export const Tile: React.FC<TileProps> = ({ position, color }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovering, setHovering] = React.useState(false);
  const { raycaster, mouse, camera, scene } = useThree();
  const { weapons, spawnWeapon, removeWeapon, grid } = useGameStore(
    (state) => state
  );

  useFrame(() => {
    if (!meshRef.current) return;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0 && intersects[0].object === meshRef.current) {
      setHovering(true);
    } else {
      setHovering(false);
    }
  });

  const trySpawnWeapon = useCallback(() => {
    console.log("Trying to spawn weapon at", position);
    const taken = weapons.find((weapon) =>
      positionEquals(weapon.position, position)
    );
    if (taken) {
      console.log("Position already taken");
      removeWeapon(taken.id);
      return;
    }
    if (!checkPath(grid, weapons, { position })) {
      console.log("No path to end");
      return;
    }
    console.log("Spawning weapon at", position);
    spawnWeapon(position);
  }, [position, weapons, spawnWeapon]);

  return (
    <mesh
      ref={meshRef}
      position={[position[0], hovering ? 0.05 : 0, position[1]]}
      onPointerDown={() => {
        if (hovering) {
          trySpawnWeapon();
        }
      }}
    >
      <boxGeometry args={[1, hovering ? 0.2 : 0.1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
