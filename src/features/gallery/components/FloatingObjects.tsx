import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

export function FloatingShard({
  position,
  scale,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
}) {
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

export function InkBlob() {
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

export function Paintbrush({
  position,
  rotation,
  scale = 0.35,
  floatSpeed = 1.5,
  rotSpeed = 0.4,
}: {
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
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.06, 0.05, 1.8, 8]} />
          <meshStandardMaterial color="#3d2b1f" roughness={0.7} metalness={0.05} />
        </mesh>
        <mesh position={[0, 0.98, 0]}>
          <cylinderGeometry args={[0.065, 0.065, 0.18, 8]} />
          <meshStandardMaterial color="#b0b0b0" roughness={0.15} metalness={0.9} />
        </mesh>
        <mesh position={[0, 1.2, 0]}>
          <coneGeometry args={[0.06, 0.35, 8]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.85} metalness={0} />
        </mesh>
        <mesh position={[0.02, 1.35, 0.02]}>
          <sphereGeometry args={[0.025, 6, 6]} />
          <meshStandardMaterial
            color="#f0f0f0"
            roughness={0.4}
            metalness={0.1}
            emissive="#cccccc"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

export function PaintPalette({
  position,
  scale = 0.3,
  floatSpeed = 1,
  rotSpeed = 0.3,
}: {
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

  const blobs = useMemo(
    () => [
      { x: 0.35, z: 0.1, color: "#ffffff", s: 0.08 },
      { x: 0.15, z: 0.35, color: "#cccccc", s: 0.07 },
      { x: -0.2, z: 0.3, color: "#888888", s: 0.09 },
      { x: -0.35, z: 0, color: "#444444", s: 0.06 },
      { x: -0.1, z: -0.3, color: "#222222", s: 0.08 },
      { x: 0.25, z: -0.25, color: "#aaaaaa", s: 0.065 },
    ],
    [],
  );

  return (
    <Float speed={floatSpeed} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={ref} position={position} scale={scale}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.06, 32]} />
          <meshStandardMaterial color="#3d2b1f" roughness={0.6} metalness={0.05} />
        </mesh>

        <mesh position={[0.15, 0.035, -0.15]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.04, 16]} />
          <meshStandardMaterial color="#1a0f0a" roughness={0.8} metalness={0} />
        </mesh>

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

export function Pencil({
  position,
  scale = 0.3,
  floatSpeed = 1.2,
  rotSpeed = 0.5,
}: {
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
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 1.6, 6]} />
          <meshStandardMaterial color="#2c2c2c" roughness={0.5} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.85, 0]}>
          <coneGeometry args={[0.04, 0.2, 6]} />
          <meshStandardMaterial color="#c4a36e" roughness={0.65} metalness={0.02} />
        </mesh>
        <mesh position={[0, 1.0, 0]}>
          <coneGeometry args={[0.015, 0.1, 6]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.5} />
        </mesh>
        <mesh position={[0, -0.85, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.12, 8]} />
          <meshStandardMaterial color="#d4d4d4" roughness={0.7} metalness={0} />
        </mesh>
      </group>
    </Float>
  );
}

export function Particles({ count = 200 }) {
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
