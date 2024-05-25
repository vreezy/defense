import { useMemo } from "react";
import { RingGeometry } from "three";

const Ring = ({
  radius,
  position,
  color = "#000000",
}: {
  radius: number;
  position: [number, number, number];
  color?: string;
}) => {
  const ringGeometry = useMemo(
    () => new RingGeometry(radius, radius + 0.1, 32),
    [radius]
  );
  return (
    <mesh
      position={position}
      geometry={ringGeometry}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <meshBasicMaterial color={color} side={2} />
    </mesh>
  );
};

export default Ring;
