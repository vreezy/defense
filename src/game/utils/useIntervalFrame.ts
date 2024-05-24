import { useState } from "react";
import { useFrame } from "@react-three/fiber";

export default function useIntervalFrame(
  callback: () => void,
  interval: number
) {
  const [lastExecution, setLastExecution] = useState(0);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime() * 1000; // Convert to milliseconds
    if (elapsedTime - lastExecution >= interval) {
      console.log(
        `Callback executed at ${elapsedTime}ms, interval: ${interval}ms`
      );
      callback();
      setLastExecution(elapsedTime);
    }
  });
}
