import { useRef, useMemo, useCallback } from "react";
import { InstancedMesh, Object3D } from "three";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "@/game/store";
import { Enemy } from "@/game/types";
import { getNextDirection } from "@/game/utils/pathfinding";
import { positionEquals } from "@/game/utils/positionEquals";
import { useInterval } from "react-use";
import { useGreenUFOModel } from "./models/GreenUFOModel";

export default function EnemyHandler() {
  const { grid, enemies, spawnEnemy, updateEnemy, removeEnemy, despawnEnemy, weapons } = useGameStore((state) => state);
  const { nodes, materials } = useGreenUFOModel();

  const instancedMeshRef1 = useRef<InstancedMesh>(null);
  const instancedMeshRef2 = useRef<InstancedMesh>(null);
  const instancedMeshRef3 = useRef<InstancedMesh>(null);

  const object3D = useMemo(() => new Object3D(), []);

  useInterval(() => {
    spawnEnemy(grid.start);
  }, 1000);

  const obstacles = useMemo(() => {
    return weapons.map((weapon) => ({
      position: weapon.position,
      radius: weapon.radius,
    }));
  }, [weapons]);

  const handleEnemyUpdate = useCallback((enemy: Enemy, delta: number) => {
    const direction = getNextDirection(enemy, grid, obstacles);
    const speed = enemy.speed * delta * 100; // Adjust speed based on delta time
    const position: [number, number] = [
      enemy.position[0] + Math.cos(direction) * speed,
      enemy.position[1] + Math.sin(direction) * speed,
    ];

    if (positionEquals(position, grid.end)) {
      if (enemy.removed !== "fly") {
        removeEnemy(enemy.id, "fly");
        setTimeout(() => {
          despawnEnemy(enemy.id);
        }, 2000);
      }
    } else {
      updateEnemy({
        ...enemy,
        position,
        direction,
      });
    }
  }, []);

  useFrame((_, delta) => {
    enemies.forEach((enemy, index) => {
      handleEnemyUpdate(enemy, delta);

      if (instancedMeshRef1.current && instancedMeshRef2.current && instancedMeshRef3.current) {
        object3D.position.set(enemy.position[0], 0, enemy.position[1]);
        object3D.scale.setScalar(enemy.removed === "fly" ? 0 : 0.5);
        object3D.updateMatrix();

        instancedMeshRef1.current.setMatrixAt(index, object3D.matrix);
        instancedMeshRef2.current.setMatrixAt(index, object3D.matrix);
        instancedMeshRef3.current.setMatrixAt(index, object3D.matrix);
      }
    });

    if (instancedMeshRef1.current) instancedMeshRef1.current.instanceMatrix.needsUpdate = true;
    if (instancedMeshRef2.current) instancedMeshRef2.current.instanceMatrix.needsUpdate = true;
    if (instancedMeshRef3.current) instancedMeshRef3.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={instancedMeshRef1} args={[nodes.Mesh_enemy_ufoGreen.geometry, materials.snowRoad, enemies.length]} />
      <instancedMesh ref={instancedMeshRef2} args={[nodes.Mesh_enemy_ufoGreen_1.geometry, materials.glass, enemies.length]} />
      <instancedMesh ref={instancedMeshRef3} args={[nodes.Mesh_enemy_ufoGreen_2.geometry, materials.foliage, enemies.length]} />
    </>
  );
}
