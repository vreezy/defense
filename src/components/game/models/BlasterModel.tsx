import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Mesh_weapon_blaster: THREE.Mesh;
    Mesh_weapon_blaster_1: THREE.Mesh;
    Mesh_weapon_blaster_2: THREE.Mesh;
  };
  materials: {
    stone: THREE.MeshStandardMaterial;
    red: THREE.MeshStandardMaterial;
    stoneDark: THREE.MeshStandardMaterial;
  };
};

export default function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/weapon_blaster.glb"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group scale={2}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_weapon_blaster.geometry}
          material={materials.stone}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_weapon_blaster_1.geometry}
          material={materials.red}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_weapon_blaster_2.geometry}
          material={materials.stoneDark}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/weapon_blaster.glb");
