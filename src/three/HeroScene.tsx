import { useMemo, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import { Float, Icosahedron, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import type { Group, Mesh } from 'three';
import Scene3D from './Scene3D';

const INDIGO = '#6366F1';
const VIOLET = '#8B5CF6';
const CYAN = '#22D3EE';
const INDIGO_DEEP = '#4338CA';

type Reduced = { reduced: boolean };

function Core({ reduced }: Reduced) {
  const mesh = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current || reduced) return;
    mesh.current.rotation.y += delta * 0.15;
    mesh.current.rotation.x += delta * 0.05;
  });

  return (
    <Float
      speed={reduced ? 0 : 1.4}
      rotationIntensity={reduced ? 0 : 0.4}
      floatIntensity={reduced ? 0 : 0.8}
    >
      <Icosahedron ref={mesh} args={[1.35, 16]}>
        <MeshDistortMaterial
          color={INDIGO}
          emissive={INDIGO_DEEP}
          emissiveIntensity={0.18}
          roughness={0.35}
          metalness={0.35}
          distort={reduced ? 0 : 0.18}
          speed={1.5}
        />
      </Icosahedron>

      <Icosahedron args={[1.62, 1]}>
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.14} />
      </Icosahedron>
    </Float>
  );
}

function OrbitNodes({ reduced }: Reduced) {
  const group = useRef<Group>(null);

  const nodes = useMemo(() => {
    const count = 7;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.5;
      return {
        position: [
          Math.cos(angle) * radius,
          Math.sin(angle * 1.6) * 0.7,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        color: i % 2 === 0 ? CYAN : VIOLET,
        size: 0.13 + (i % 3) * 0.03,
      };
    });
  }, []);

  useFrame((_, delta) => {
    if (group.current && !reduced) group.current.rotation.y += delta * 0.28;
  });

  return (
    <group ref={group}>
      {nodes.map((node, i) => (
        <Float key={i} speed={reduced ? 0 : 2} floatIntensity={reduced ? 0 : 1.4}>
          <mesh position={node.position}>
            <icosahedronGeometry args={[node.size, 0]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.7}
              roughness={0.3}
              metalness={0.4}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function OrbitRings({ reduced }: Reduced) {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (group.current && !reduced) group.current.rotation.z += delta * 0.06;
  });
  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.5, 0.006, 16, 120]} />
        <meshBasicMaterial color={INDIGO} transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 1.7, Math.PI / 5, 0]}>
        <torusGeometry args={[2.9, 0.005, 16, 120]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

function ParallaxRig({ reduced, children }: Reduced & { children: React.ReactNode }) {
  const group = useRef<Group>(null);
  useFrame((state) => {
    if (!group.current || reduced) return;
    const { x, y } = state.pointer;
    group.current.rotation.y += (x * 0.35 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-y * 0.25 - group.current.rotation.x) * 0.05;
  });
  return <group ref={group}>{children}</group>;
}

export default function HeroScene() {
  const reduced = useReducedMotion() ?? false;

  return (
    <Scene3D
      cameraPosition={[0, 0, 6]}
      fov={45}
      className="absolute inset-0"
      fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 rounded-full bg-primary/20 blur-[80px]" />
        </div>
      }
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={40} color={INDIGO} />
      <pointLight position={[-5, -3, 2]} intensity={30} color={CYAN} />
      <pointLight position={[0, 4, -4]} intensity={20} color={VIOLET} />

      <ParallaxRig reduced={reduced}>
        <Core reduced={reduced} />
        <OrbitRings reduced={reduced} />
        <OrbitNodes reduced={reduced} />
        <Sparkles
          count={60}
          scale={7}
          size={2}
          speed={reduced ? 0 : 0.4}
          opacity={0.6}
          color={INDIGO}
        />
      </ParallaxRig>
    </Scene3D>
  );
}
