import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Generates a bright cubemap for glossy reflections — instant, no network */
export function useLocalEnvMap() {
  return useMemo(() => {
    const size = 256;
    const faces: HTMLCanvasElement[] = [];

    const faceConfigs: {
      top: string;
      bottom: string;
      highlight?: boolean;
      highlightX?: number;
      highlightY?: number;
    }[] = [
      { top: "#555555", bottom: "#1a1a1a" }, // +X right
      { top: "#333333", bottom: "#0e0e0e" }, // -X left
      { top: "#ffffff", bottom: "#666666", highlight: true, highlightX: 0.55, highlightY: 0.4 }, // +Y top — bright sky
      { top: "#0a0a0a", bottom: "#030303" }, // -Y bottom — dark floor
      { top: "#444444", bottom: "#141414", highlight: true, highlightX: 0.5, highlightY: 0.5 }, // +Z front
      { top: "#222222", bottom: "#080808" }, // -Z back
    ];

    for (const cfg of faceConfigs) {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;

      const grad = ctx.createLinearGradient(0, 0, 0, size);
      grad.addColorStop(0, cfg.top);
      grad.addColorStop(1, cfg.bottom);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      if (cfg.highlight) {
        const hx = (cfg.highlightX ?? 0.5) * size;
        const hy = (cfg.highlightY ?? 0.5) * size;
        const radialGrad = ctx.createRadialGradient(hx, hy, 0, hx, hy, size * 0.55);
        radialGrad.addColorStop(0, "rgba(255,255,255,1)");
        radialGrad.addColorStop(0.15, "rgba(255,255,255,0.9)");
        radialGrad.addColorStop(0.4, "rgba(180,180,180,0.4)");
        radialGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = radialGrad;
        ctx.fillRect(0, 0, size, size);

        const r2 = ctx.createRadialGradient(hx * 0.9, hy * 0.8, 0, hx * 0.9, hy * 0.8, size * 0.2);
        r2.addColorStop(0, "rgba(255,255,255,0.8)");
        r2.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = r2;
        ctx.fillRect(0, 0, size, size);
      }

      faces.push(canvas);
    }

    const cubeTexture = new THREE.CubeTexture(faces);
    cubeTexture.needsUpdate = true;
    return cubeTexture;
  }, []);
}

export function LocalEnvironment() {
  const envMap = useLocalEnvMap();
  useFrame(({ scene }) => {
    if (scene.environment !== envMap) {
      scene.environment = envMap;
    }
  });
  return null;
}

export function SceneLighting() {
  return (
    <>
      <LocalEnvironment />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-5, -3, 2]} intensity={0.6} color="#aaaaaa" />
      <pointLight position={[0, 4, 3]} intensity={1.2} color="#ffffff" />
      <pointLight position={[4, 1, 2]} intensity={0.8} color="#eeeeee" />
      <pointLight position={[-3, -2, 1]} intensity={0.3} color="#cccccc" />
      <spotLight position={[3, 5, 4]} angle={0.35} penumbra={0.7} intensity={3.5} color="#ffffff" />
    </>
  );
}
