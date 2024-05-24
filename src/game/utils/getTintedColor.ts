import * as THREE from "three";

export default function getTintedColor(
  color: THREE.Color | string,
  tint: string
): THREE.Color {
  const baseColor = new THREE.Color(color);
  let tintColor = "#ffffff"; // Default to white tint

  let lerpFactor = 1; // Default blend factor

  if (typeof tint === "string") {
    if (tint.startsWith("#")) {
      // Check for alpha in hex format (8-digit hex)
      if (tint.length === 9) {
        const alphaHex = tint.slice(7, 9);
        lerpFactor = parseInt(alphaHex, 16) / 255; // Convert hex alpha to 0-1 range
        console.log("lerpFactor", lerpFactor);
      } else {
        lerpFactor = 1; // Default to 1 if no alpha channel
      }
      tintColor = tint.slice(0, 7); // Remove alpha channel from tint color
    }
  }

  // Tint the base color using the lerp factor
  baseColor.lerp(new THREE.Color(tintColor), lerpFactor);
  return baseColor;
}
