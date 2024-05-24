import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, Group, Object3D } from "three";

export default function useClickOrDrag<T extends Object3D>(handlers?: {
  onClick?: () => void;
  onDrag?: () => void;
}) {
  const ref = useRef<T>(null);
  const [hovering, setHovering] = useState(false);
  const { raycaster, mouse, camera, scene } = useThree();
  const [dragDistance, setDragDistance] = useState(0);

  const handlePointerDown = () => {
    setDragDistance(0);
  };

  const handlePointerUp = () => {
    if (dragDistance < 10 && hovering) {
      handlers && handlers.onClick && handlers.onClick();
    } else {
      handlers && handlers.onDrag && handlers.onDrag();
    }
    setDragDistance(0);
  };

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    const deltaDistance = Math.sqrt(
      Math.pow(event.movementX, 2) + Math.pow(event.movementY, 2)
    );
    setDragDistance((prev) => prev + deltaDistance);
  };

  useFrame(() => {
    if (!ref.current) return;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0 && intersects[0].object === ref.current) {
      setHovering(true);
    } else {
      setHovering(false);
    }
  });

  return {
    props: {
      ref,
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerMove: handlePointerMove,
    },
    hovering,
    dragDistance,
  };
}
