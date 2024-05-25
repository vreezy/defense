import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Mesh_enemy_ufoGreen: THREE.Mesh;
    Mesh_enemy_ufoGreen_1: THREE.Mesh;
    Mesh_enemy_ufoGreen_2: THREE.Mesh;
  };
  materials: {
    snowRoad: THREE.MeshStandardMaterial;
    glass: THREE.MeshStandardMaterial;
    foliage: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/enemy_ufoGreen.glb"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_enemy_ufoGreen.geometry}
        material={materials.snowRoad}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_enemy_ufoGreen_1.geometry}
        material={materials.glass}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_enemy_ufoGreen_2.geometry}
        material={materials.foliage}
      />
    </group>
  );
}

useGLTF.preload("/models/enemy_ufoGreen.glb");
