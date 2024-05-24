import React, { useCallback, useRef, useState } from "react";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { Mesh } from "three";
import { useGameStore } from "@/game/store";
import { positionEquals } from "@/game/utils/positionEquals";
import { checkPaths } from "@/game/utils/pathfinding";

export function Tile({
  position,
  color,
}: {
  position: [number, number];
  color?: string;
}) {
  const meshRef = useRef<Mesh>(null);
  const [hovering, setHovering] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const { raycaster, mouse, camera, scene } = useThree();
  const {
    enemies,
    weapons,
    spawnWeapon,
    removeWeapon,
    grid,
    weaponSpawnState,
  } = useGameStore((state) => state);

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
    if (weaponSpawnState !== "sphere") return;
    console.log("Trying to spawn weapon at", position);
    const taken = weapons.find((weapon) =>
      positionEquals(weapon.position, position)
    );
    if (taken) {
      console.log("Position already taken");
      removeWeapon(taken.id);
      return;
    }
    if (!checkPaths(enemies, grid, [...weapons, { position }])) {
      console.log("No path to end");
      return;
    }
    console.log("Spawning weapon at", position);
    spawnWeapon(position);
  }, [position, weapons, spawnWeapon]);

  const handlePointerDown = () => {
    setDragDistance(0);
  };

  const handlePointerUp = () => {
    if (dragDistance < 10 && hovering) {
      trySpawnWeapon();
    }
    setDragDistance(0);
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    const deltaDistance = Math.sqrt(
      Math.pow(event.movementX, 2) + Math.pow(event.movementY, 2)
    );
    setDragDistance((prev) => prev + deltaDistance);
  };

  return (
    <mesh
      ref={meshRef}
      position={[position[0], hovering ? 0.05 : 0, position[1]]}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      <boxGeometry args={[1, hovering ? 0.2 : 0.1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
