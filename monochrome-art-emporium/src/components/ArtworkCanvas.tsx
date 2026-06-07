import { Suspense, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

function Frame({ image, hovered }: { image: string; hovered: boolean }) {
  const texture = useLoader(THREE.TextureLoader, image);
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const targetX = hovered ? state.pointer.y * 0.3 : Math.sin(t * 0.3) * 0.05;
    const targetY = hovered ? state.pointer.x * 0.4 : Math.sin(t * 0.4) * 0.08;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.08;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.08;
  });

  // aspect handling
  const aspect = texture.image ? texture.image.width / texture.image.height : 1;
  const w = aspect >= 1 ? 2.4 : 2.4 * aspect;
  const h = aspect >= 1 ? 2.4 / aspect : 2.4;

  return (
    <group ref={group}>
      {/* Frame */}
      <mesh position={[0, 0, -0.06]}>
        <boxGeometry args={[w + 0.18, h + 0.18, 0.08]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.7} metalness={0.3} />
      </mesh>
      {/* Mat */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[w + 0.08, h + 0.08]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      {/* Artwork */}
      <mesh>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial map={texture} roughness={0.6} />
      </mesh>
    </group>
  );
}

export function ArtworkCanvas({ image, hovered = false }: { image: string; hovered?: boolean }) {
  return (
    <Canvas camera={{ position: [0, 0, 3.5], fov: 40 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.4} />
        <spotLight position={[3, 4, 4]} intensity={1.5} angle={0.6} penumbra={0.8} color="#ffffff" />
        <spotLight position={[-3, -2, 3]} intensity={0.5} color="#aaaaaa" />
        <Frame image={image} hovered={hovered} />
        <Environment preset="apartment" />
      </Suspense>
    </Canvas>
  );
}
