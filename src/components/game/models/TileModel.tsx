"use client";

import * as THREE from "three";
import React, { forwardRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import getTintedColor from "@/game/utils/getTintedColor";

type GLTFResult = GLTF & {
  nodes: {
    Mesh_tile: THREE.Mesh;
    Mesh_tile_1: THREE.Mesh;
  };
  materials: {
    dirt: THREE.MeshStandardMaterial;
    foliage: THREE.MeshStandardMaterial;
  };
};

const Model = forwardRef(
  (
    props: JSX.IntrinsicElements["group"] & {
      tint?: string;
    },
    ref: React.Ref<THREE.Group>
  ) => {
    const { nodes, materials } = useGLTF("/models/tile.glb") as GLTFResult;
    const tintedMaterials = useMemo(() => {
      const dirtMaterial = materials.dirt.clone();
      const foliageMaterial = materials.foliage.clone();

      if (props.tint) {
        // foliageMaterial.color.lerp(tintColor, 0.5); // 0.5 is the blend factor, adjust it as needed
        foliageMaterial.color = getTintedColor(
          foliageMaterial.color,
          props.tint
        );
      }

      return {
        dirt: dirtMaterial,
        foliage: foliageMaterial,
      };
    }, [props.tint, materials.dirt, materials.foliage]);

    return (
      <group {...props} dispose={null} ref={ref}>
        <mesh
          geometry={nodes.Mesh_tile.geometry}
          material={tintedMaterials.dirt}
        />
        <mesh
          geometry={nodes.Mesh_tile_1.geometry}
          material={tintedMaterials.foliage}
        />
      </group>
    );
  }
);

useGLTF.preload("/models/tile.glb");

Model.displayName = "TileModel";

export default Model;
