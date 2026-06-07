import { Suspense, useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingShard({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    ref.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={ref} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#f5f5f5"
          roughness={0.4}
          metalness={0.1}
          distort={0.45}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

/** The big glossy dark blob — the centrepiece */
function InkBlob() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.15;
    ref.current.rotation.z = state.clock.elapsedTime * 0.08;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <sphereGeometry args={[1.6, 64, 64]} />
      <MeshDistortMaterial
        color="#080808"
        roughness={0.02}
        metalness={1.0}
        distort={0.55}
        speed={1.2}
        envMapIntensity={2.5}
      />
    </mesh>
  );
}

/** Generates a bright cubemap for glossy reflections — instant, no network */
function useLocalEnvMap() {
  return useMemo(() => {
    const size = 256;
    const faces: HTMLCanvasElement[] = [];

    // Each face: [topColor, bottomColor, highlight?]
    const faceConfigs: { top: string; bottom: string; highlight?: boolean; highlightX?: number; highlightY?: number }[] = [
      { top: "#555555", bottom: "#1a1a1a" },                                    // +X right
      { top: "#333333", bottom: "#0e0e0e" },                                    // -X left
      { top: "#ffffff", bottom: "#666666", highlight: true, highlightX: 0.55, highlightY: 0.4 },  // +Y top — bright sky
      { top: "#0a0a0a", bottom: "#030303" },                                    // -Y bottom — dark floor
      { top: "#444444", bottom: "#141414", highlight: true, highlightX: 0.5, highlightY: 0.5 },   // +Z front
      { top: "#222222", bottom: "#080808" },                                    // -Z back
    ];

    for (const cfg of faceConfigs) {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;

      // Base gradient
      const grad = ctx.createLinearGradient(0, 0, 0, size);
      grad.addColorStop(0, cfg.top);
      grad.addColorStop(1, cfg.bottom);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      // Bright highlight hotspot (simulates studio softbox)
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

        // Secondary smaller hotspot for extra punch
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

function LocalEnvironment() {
  const envMap = useLocalEnvMap();
  useFrame(({ scene }) => {
    if (scene.environment !== envMap) {
      scene.environment = envMap;
    }
  });
  return null;
}

/* ── Floating art objects ──────────────────────────────────── */

/** Small paintbrush: wooden handle + metallic ferrule + bristle tip */
function Paintbrush({ position, rotation, scale = 0.35, floatSpeed = 1.5, rotSpeed = 0.4 }: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  floatSpeed?: number;
  rotSpeed?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * rotSpeed;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * rotSpeed * 0.7) * 0.3;
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.4} floatIntensity={1.2}>
      <group ref={ref} position={position} rotation={rotation ?? [0, 0, 0.5]} scale={scale}>
        {/* Wooden handle */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.05, 1.8, 8]} />
          <meshStandardMaterial color="#3d2b1f" roughness={0.7} metalness={0.05} />
        </mesh>
        {/* Metal ferrule */}
        <mesh position={[0, 0.98, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.18, 8]} />
          <meshStandardMaterial color="#b0b0b0" roughness={0.15} metalness={0.9} />
        </mesh>
        {/* Bristle tip */}
        <mesh position={[0, 1.2, 0]}>
          <coneGeometry args={[0.06, 0.35, 8]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.85} metalness={0} />
        </mesh>
        {/* Tiny paint dab on bristle */}
        <mesh position={[0.02, 1.35, 0.02]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshStandardMaterial color="#f0f0f0" roughness={0.4} metalness={0.1} emissive="#cccccc" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

/** Paint palette: flat rounded disc with paint blobs */
function PaintPalette({ position, scale = 0.3, floatSpeed = 1, rotSpeed = 0.3 }: {
  position: [number, number, number];
  scale?: number;
  floatSpeed?: number;
  rotSpeed?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * rotSpeed;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
  });

  // Paint blob positions & shades (monochrome to match theme)
  const blobs = useMemo(() => [
    { x: 0.35, z: 0.1,  color: "#ffffff", s: 0.08 },
    { x: 0.15, z: 0.35, color: "#cccccc", s: 0.07 },
    { x: -0.2, z: 0.3,  color: "#888888", s: 0.09 },
    { x: -0.35,z: 0,    color: "#444444", s: 0.06 },
    { x: -0.1, z: -0.3, color: "#222222", s: 0.08 },
    { x: 0.25, z: -0.25,color: "#aaaaaa", s: 0.065 },
  ], []);

  return (
    <Float speed={floatSpeed} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={ref} position={position} scale={scale}>
        {/* Palette body — flat rounded shape with thumb hole */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.06, 32]} />
          <meshStandardMaterial color="#3d2b1f" roughness={0.6} metalness={0.05} />
        </mesh>

        {/* Thumb hole — darker inset */}
        <mesh position={[0.15, 0.035, -0.15]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.04, 16]} />
          <meshStandardMaterial color="#1a0f0a" roughness={0.8} metalness={0} />
        </mesh>

        {/* Paint blobs on the palette */}
        {blobs.map((b, i) => (
          <mesh key={i} position={[b.x, 0.05, b.z]}>
            <sphereGeometry args={[b.s, 8, 6]} />
            <meshStandardMaterial
              color={b.color}
              roughness={0.35}
              metalness={0.15}
              emissive={b.color}
              emissiveIntensity={0.08}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

/** A tiny pencil */
function Pencil({ position, scale = 0.3, floatSpeed = 1.2, rotSpeed = 0.5 }: {
  position: [number, number, number];
  scale?: number;
  floatSpeed?: number;
  rotSpeed?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * rotSpeed * 0.8;
    ref.current.rotation.y = Math.cos(state.clock.elapsedTime * rotSpeed * 0.5) * 0.4;
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.5} floatIntensity={1.0}>
      <group ref={ref} position={position} rotation={[0, 0, 0.7]} scale={scale}>
        {/* Pencil body (hexagonal approx with 6 sides) */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 1.6, 6]} />
          <meshStandardMaterial color="#2c2c2c" roughness={0.5} metalness={0.1} />
        </mesh>
        {/* Exposed wood near tip */}
        <mesh position={[0, 0.85, 0]}>
          <coneGeometry args={[0.04, 0.2, 6]} />
          <meshStandardMaterial color="#c4a36e" roughness={0.65} metalness={0.02} />
        </mesh>
        {/* Graphite tip */}
        <mesh position={[0, 1.0, 0]}>
          <coneGeometry args={[0.015, 0.1, 6]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
        </mesh>
        {/* Eraser at bottom */}
        <mesh position={[0, -0.85, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.12, 8]} />
          <meshStandardMaterial color="#d4d4d4" roughness={0.7} metalness={0} />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Particles ─────────────────────────────────────────────── */

function Particles({ count = 200 }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#ffffff" sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

/* ── Main scene export ─────────────────────────────────────── */

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
          {/* Local cubemap environment for glossy reflections — no network fetch */}
          <LocalEnvironment />

          <ambientLight intensity={0.35} />
          {/* Key light — bright highlight on the blob */}
          <directionalLight position={[4, 6, 5]} intensity={2.5} color="#ffffff" />
          {/* Fill light */}
          <directionalLight position={[-5, -3, 2]} intensity={0.6} color="#aaaaaa" />
          {/* Rim / accent lights */}
          <pointLight position={[0, 4, 3]} intensity={1.2} color="#ffffff" />
          <pointLight position={[4, 1, 2]} intensity={0.8} color="#eeeeee" />
          <pointLight position={[-3, -2, 1]} intensity={0.3} color="#cccccc" />
          {/* Spotlight for dramatic blob highlight */}
          <spotLight
            position={[3, 5, 4]}
            angle={0.35}
            penumbra={0.7}
            intensity={3.5}
            color="#ffffff"
          />

          {/* Central glossy ink blob */}
          <InkBlob />

          {/* Floating geometric shards */}
          <FloatingShard position={[-3, 1.5, -1]} scale={0.5} speed={1} />
          <FloatingShard position={[3, -1.2, -2]} scale={0.7} speed={0.7} />
          <FloatingShard position={[2.5, 2, 0]} scale={0.35} speed={1.3} />
          <FloatingShard position={[-2.5, -1.8, 0.5]} scale={0.45} speed={0.9} />

          {/* Floating art objects */}
          <Paintbrush position={[-4.5, 2.5, -1.5]} rotation={[0.3, 0, 0.8]} scale={0.32} floatSpeed={1.3} rotSpeed={0.35} />
          <Paintbrush position={[4.2, -0.5, -1]} rotation={[-0.2, 0.5, -0.6]} scale={0.25} floatSpeed={1.6} rotSpeed={0.5} />
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
