import React, { useEffect, useRef, useState } from "react";
import { MeshProps, useFrame, useThree } from "@react-three/fiber";
import { Mesh } from "three";

interface TileProps extends Omit<MeshProps, "position"> {
  position: [number, number];
  color?: string;
}

export const Tile: React.FC<TileProps> = ({ position, color }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovering, setHovering] = React.useState(false);
  const { raycaster, mouse, camera, scene } = useThree();

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

  return (
    <mesh
      ref={meshRef}
      position={[position[0], hovering ? 0.05 : 0, position[1]]}
    >
      <boxGeometry args={[1, hovering ? 0.2 : 0.1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
