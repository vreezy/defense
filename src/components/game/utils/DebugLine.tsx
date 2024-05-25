import React, { useRef, useEffect } from "react";
import * as THREE from "three";

interface DebugLineProps {
  position: [number, number, number];
  rotation: [number, number, number];
  length: number;
  color?: string;
}

const DebugLine: React.FC<DebugLineProps> = ({
  position,
  rotation,
  length,
  color = "red",
}) => {
  return (
    <mesh position={position} rotation={rotation}>
      <cylinderGeometry args={[0.05, 0.05, length, 32]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
};

export default DebugLine;
