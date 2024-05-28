import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Mesh_weapon_cannon: THREE.Mesh;
    Mesh_weapon_cannon_1: THREE.Mesh;
    cannon: THREE.Mesh;
  };
  materials: {
    stone: THREE.MeshStandardMaterial;
    wood: THREE.MeshStandardMaterial;
    stoneDark: THREE.MeshStandardMaterial;
  };
};

export default function CannonModel(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "/models/weapon_cannon.glb"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group scale={2}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_weapon_cannon.geometry}
          material={materials.stone}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Mesh_weapon_cannon_1.geometry}
          material={materials.wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cannon.geometry}
          material={materials.stoneDark}
          position={[0, 0.131, 0.01]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.35}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/weapon_cannon.glb");
