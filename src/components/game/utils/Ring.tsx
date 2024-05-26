import { useMemo } from "react";
import { TorusGeometry, CylinderGeometry } from "three";

const Ring = ({
  radius,
  tube = 0.1,
  radialSegments = 16,
  tubularSegments = 100,
  position,
  color = "#000000",
  dashCount = 0,
  dashGap = Math.PI / 16,
  rotation = [0, 0, 0],
}: {
  radius: number;
  tube?: number;
  radialSegments?: number;
  tubularSegments?: number;
  position: [number, number, number];
  color?: string;
  dashCount?: number;
  dashGap?: number;
  rotation?: [number, number, number];
}) => {
  const arcLength = useMemo(() => (Math.PI * 2) / dashCount, [dashCount]);
  const dashArcLength = useMemo(() => arcLength - dashGap, [arcLength, dashGap]);
  const torusGeometry = useMemo(
    () => new TorusGeometry(radius, tube, radialSegments, tubularSegments, dashArcLength),
    [radius, tube, radialSegments, tubularSegments, dashArcLength]
  );
  const capGeometry = useMemo(
    () => new CylinderGeometry(tube, tube, 0.01, radialSegments),
    [tube, radialSegments]
  );
  const dashes = useMemo(
    () =>
      Array.from({ length: dashCount }, (_, i) => {
        return {
          rotation: i * arcLength,
        };
      }),
    [arcLength, dashCount]
  );

  return (
    <group position={position} rotation={rotation}>
      {dashes.map(({ rotation }, index) => (
        <group key={index} rotation={[Math.PI / 2, 0, rotation]}>
          <mesh geometry={torusGeometry}>
            <meshBasicMaterial color={color} side={2} />
          </mesh>
          <mesh geometry={capGeometry} position={[radius, 0, 0]}>
            <meshBasicMaterial color={color} side={2} />
          </mesh>
          <mesh geometry={capGeometry} position={[-radius, 0, 0]}>
            <meshBasicMaterial color={color} side={2} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default Ring;
