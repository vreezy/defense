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

export function useGreenUFOModel() {
  const { nodes, materials } = useGLTF("/models/enemy_ufoGreen.glb") as GLTFResult;
  return { nodes, materials };
}

useGLTF.preload("/models/enemy_ufoGreen.glb");
