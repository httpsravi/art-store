import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { SceneLighting } from "@/features/gallery/components/LightingSetup";
import {
  FloatingShard,
  InkBlob,
  Paintbrush,
  PaintPalette,
  Pencil,
  Particles,
} from "@/features/gallery/components/FloatingObjects";

export function Scene3D({ className = "" }: { className?: string }) {
  const [ready, setReady] = useState(false);

  return (
    <div
      className={className}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        opacity: ready ? 1 : 0,
        transition: "opacity 1.2s ease",
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={() => setReady(true)}
      >
        <Suspense fallback={null}>
          <SceneLighting />

          <InkBlob />

          <FloatingShard position={[-3, 1.5, -1]} scale={0.5} speed={1} />
          <FloatingShard position={[3, -1.2, -2]} scale={0.7} speed={0.7} />
          <FloatingShard position={[2.5, 2, 0]} scale={0.35} speed={1.3} />
          <FloatingShard position={[-2.5, -1.8, 0.5]} scale={0.45} speed={0.9} />

          <Paintbrush
            position={[-4.5, 2.5, -1.5]}
            rotation={[0.3, 0, 0.8]}
            scale={0.32}
            floatSpeed={1.3}
            rotSpeed={0.35}
          />
          <Paintbrush
            position={[4.2, -0.5, -1]}
            rotation={[-0.2, 0.5, -0.6]}
            scale={0.25}
            floatSpeed={1.6}
            rotSpeed={0.5}
          />
          <PaintPalette position={[-4, -2, 0]} scale={0.55} floatSpeed={0.9} rotSpeed={0.25} />
          <PaintPalette position={[4.5, 2.5, -0.5]} scale={0.5} floatSpeed={1.1} rotSpeed={0.2} />
          <PaintPalette position={[5.5, -1.8, 0.5]} scale={0.45} floatSpeed={0.8} rotSpeed={0.3} />
          <PaintPalette position={[-5, 1.2, -0.5]} scale={0.5} floatSpeed={1.2} rotSpeed={0.15} />
          <PaintPalette position={[-1.5, -3, 0]} scale={0.4} floatSpeed={1.0} rotSpeed={0.35} />
          <Pencil position={[5, -2.5, -1.5]} scale={0.28} floatSpeed={1.4} rotSpeed={0.45} />
          <Pencil position={[-5.2, 0.5, -2]} scale={0.22} floatSpeed={1.0} rotSpeed={0.3} />

          <Particles count={300} />
        </Suspense>
      </Canvas>
    </div>
  );
}
