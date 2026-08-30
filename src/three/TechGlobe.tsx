import { useMemo, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import type { Group } from 'three';
import Scene3D from './Scene3D';

const INDIGO = '#6366F1';
const CYAN = '#22D3EE';
const VIOLET = '#8B5CF6';

function Globe({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null);

  const nodes = useMemo(() => {
    const count = 22;
    const radius = 1.62;
    const golden = Math.PI * (3 - Math.sqrt(5));
    return Array.from({ length: count }, (_, i) => {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      return [
        Math.cos(theta) * r * radius,
        y * radius,
        Math.sin(theta) * r * radius,
      ] as [number, number, number];
    });
  }, []);

  useFrame((_, delta) => {
    if (group.current && !reduced) group.current.rotation.y += delta * 0.18;
  });

  return (
    <Float speed={reduced ? 0 : 1} rotationIntensity={0} floatIntensity={reduced ? 0 : 0.6}>
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[1.6, 3]} />
          <meshBasicMaterial color={INDIGO} wireframe transparent opacity={0.28} />
        </mesh>
        <mesh scale={0.985}>
          <sphereGeometry args={[1.6, 32, 32]} />
          <meshStandardMaterial
            color="#0D0D1E"
            emissive={VIOLET}
            emissiveIntensity={0.12}
            roughness={0.6}
            metalness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>
        {nodes.map((position, i) => (
          <mesh key={i} position={position}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? CYAN : INDIGO}
              emissive={i % 3 === 0 ? CYAN : INDIGO}
              emissiveIntensity={0.9}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

export default function TechGlobe({ className }: { className?: string }) {
  const reduced = useReducedMotion() ?? false;
  return (
    <Scene3D cameraPosition={[0, 0, 5]} fov={45} className={className}>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 4, 5]} intensity={30} color={INDIGO} />
      <pointLight position={[-4, -2, 2]} intensity={20} color={CYAN} />
      <Globe reduced={reduced} />
    </Scene3D>
  );
}
