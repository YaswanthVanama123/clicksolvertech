import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Icosahedron, MeshDistortMaterial, Sparkles } from '@react-three/drei';
import { BufferAttribute, BufferGeometry, type Group, type Mesh, type Points } from 'three';
import { mulberry32, stageZ } from './stage';

const INDIGO = '#6366F1';
const VIOLET = '#8B5CF6';
const CYAN = '#22D3EE';
const INDIGO_DEEP = '#4338CA';

const CULL_DISTANCE = 34;

export type PieceProps = {
  index: number;
  reduced: boolean;
};

function useStagePlacement(index: number) {
  const root = useRef<Group>(null);

  useFrame((state) => {
    const g = root.current;
    if (!g) return;
    g.visible = Math.abs(state.camera.position.z - stageZ(index)) < CULL_DISTANCE;
  });

  return root;
}

function Core({ reduced }: { reduced: boolean }) {
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
      <Icosahedron ref={mesh} args={[1.35, 12]}>
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

function OrbitRings({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (group.current && !reduced) group.current.rotation.z += delta * 0.06;
  });
  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.5, 0.006, 12, 96]} />
        <meshBasicMaterial color={INDIGO} transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 1.7, Math.PI / 5, 0]}>
        <torusGeometry args={[2.9, 0.005, 12, 96]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

function OrbitNodes({ reduced }: { reduced: boolean }) {
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

export function CorePiece({ index, reduced }: PieceProps) {
  const root = useStagePlacement(index);

  return (
    <group ref={root} position={[0, 0, stageZ(index)]}>
      <Core reduced={reduced} />
      <OrbitRings reduced={reduced} />
      <OrbitNodes reduced={reduced} />
      <Sparkles count={50} scale={7} size={2} speed={reduced ? 0 : 0.4} opacity={0.42} color={INDIGO} />
    </group>
  );
}

export function LatticePiece({ index, reduced }: PieceProps) {
  const spin = useRef<Group>(null);
  const root = useStagePlacement(index);

  const cells = useMemo(() => {
    const out: { position: [number, number, number]; phase: number; color: string }[] = [];
    const n = 5;
    for (let ix = 0; ix < n; ix++) {
      for (let iy = 0; iy < n; iy++) {
        out.push({
          position: [(ix - (n - 1) / 2) * 1.5, (iy - (n - 1) / 2) * 1.5, 0],
          phase: ix * 0.7 + iy * 0.45,
          color: (ix + iy) % 3 === 0 ? CYAN : (ix + iy) % 3 === 1 ? INDIGO : VIOLET,
        });
      }
    }
    return out;
  }, []);

  useFrame((state, delta) => {
    const g = spin.current;
    if (!g || reduced) return;
    g.rotation.y = Math.sin(state.clock.elapsedTime * 0.16) * 0.42;
    g.rotation.x = Math.cos(state.clock.elapsedTime * 0.12) * 0.18;
    g.children.forEach((child, i) => {
      const c = cells[i];
      if (!c) return;
      child.position.z = Math.sin(state.clock.elapsedTime * 0.9 + c.phase) * 0.7;
      child.rotation.x += delta * 0.4;
      child.rotation.y += delta * 0.3;
    });
  });

  return (
    <group ref={root} position={[0, 0, stageZ(index)]} rotation={[0, 0, index * 0.42]}>
      <group ref={spin}>
        {cells.map((c, i) => (
          <mesh key={i} position={c.position}>
            <octahedronGeometry args={[0.22, 0]} />
            <meshStandardMaterial
              color={c.color}
              emissive={c.color}
              emissiveIntensity={0.24}
              roughness={0.35}
              metalness={0.5}
              transparent
              opacity={0.46}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export function SlabsPiece({ index, reduced }: PieceProps) {
  const spin = useRef<Group>(null);
  const root = useStagePlacement(index);

  const slabs = useMemo(
    () =>
      [
        { position: [-2.1, 1.0, 0.8], rotation: [0.1, 0.5, -0.08], scale: 1.35, color: INDIGO },
        { position: [1.9, 0.1, -0.5], rotation: [-0.12, -0.42, 0.06], scale: 1.15, color: VIOLET },
        { position: [-0.5, -1.6, 1.6], rotation: [0.16, 0.24, 0.1], scale: 0.95, color: CYAN },
        { position: [2.9, 2.0, -1.8], rotation: [-0.08, -0.6, -0.05], scale: 0.85, color: INDIGO },
        { position: [-3.2, -0.9, -1.3], rotation: [0.2, 0.7, 0.12], scale: 0.9, color: VIOLET },
      ] as { position: [number, number, number]; rotation: [number, number, number]; scale: number; color: string }[],
    [],
  );

  useFrame((state) => {
    if (!spin.current || reduced) return;
    spin.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
  });

  return (
    <group ref={root} position={[0, 0, stageZ(index)]} rotation={[0, index * 0.5, 0]}>
      <group ref={spin}>
        {slabs.map((s, i) => (
          <Float key={i} speed={reduced ? 0 : 1.1} rotationIntensity={reduced ? 0 : 0.25} floatIntensity={reduced ? 0 : 0.7}>
            <group position={s.position} rotation={s.rotation} scale={s.scale}>
              <mesh>
                <boxGeometry args={[1.7, 1.1, 0.035]} />
                <meshStandardMaterial
                  color="#0A0A18"
                  emissive={s.color}
                  emissiveIntensity={0.06}
                  roughness={0.25}
                  metalness={0.6}
                  transparent
                  opacity={0.5}
                />
              </mesh>
              <mesh position={[0, 0, 0.024]}>
                <boxGeometry args={[1.7, 1.1, 0.001]} />
                <meshBasicMaterial color={s.color} wireframe transparent opacity={0.26} />
              </mesh>
            </group>
          </Float>
        ))}
      </group>
    </group>
  );
}

export function PipelinePiece({ index, reduced }: PieceProps) {
  const spin = useRef<Group>(null);
  const root = useStagePlacement(index);
  const rings = useMemo(() => Array.from({ length: 9 }, (_, i) => i), []);

  useFrame((_, delta) => {
    if (!spin.current || reduced) return;
    spin.current.children.forEach((child, i) => {
      child.rotation.z += delta * (0.12 + i * 0.035) * (i % 2 === 0 ? 1 : -1);
    });
  });

  return (
    <group ref={root} position={[0, 0, stageZ(index)]} rotation={[0, 0, index * 0.3]}>
      <group ref={spin}>
        {rings.map((i) => {
          const t = i / (rings.length - 1);
          return (
            <mesh key={i} position={[0, 0, -4 + i * 1.0]} rotation={[0, 0, i * 0.3]}>
              <torusGeometry args={[2.1 + Math.sin(t * Math.PI) * 1.3, 0.018, 8, 72]} />
              <meshBasicMaterial
                color={i % 3 === 0 ? CYAN : i % 3 === 1 ? INDIGO : VIOLET}
                transparent
                opacity={0.34}
              />
            </mesh>
          );
        })}
      </group>
      <Sparkles count={40} scale={[8, 8, 10]} size={2.4} speed={reduced ? 0 : 0.5} opacity={0.34} color={CYAN} />
    </group>
  );
}

export function CloudPiece({ index, reduced }: PieceProps) {
  const points = useRef<Points>(null);
  const root = useStagePlacement(index);

  const geometry = useMemo(() => {
    const count = 700;
    const radius = 4.4;
    const rand = mulberry32(0x5eed + index * 977);
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = radius * (0.72 + rand() * 0.28);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(positions, 3));
    return geo;
  }, [index]);

  useFrame((_, delta) => {
    if (!points.current || reduced) return;
    points.current.rotation.y += delta * 0.07;
    points.current.rotation.x += delta * 0.025;
  });

  return (
    <group ref={root} position={[0, 0, stageZ(index)]}>
      <points ref={points} geometry={geometry}>
        <pointsMaterial color={INDIGO} size={0.13} transparent opacity={0.72} sizeAttenuation />
      </points>
      <Icosahedron args={[1.5, 1]}>
        <meshBasicMaterial color={VIOLET} wireframe transparent opacity={0.16} />
      </Icosahedron>
    </group>
  );
}

export function VortexPiece({ index, reduced }: PieceProps) {
  const spin = useRef<Group>(null);
  const root = useStagePlacement(index);
  const rings = useMemo(() => Array.from({ length: 14 }, (_, i) => i), []);

  useFrame((state, delta) => {
    const g = spin.current;
    if (!g || reduced) return;
    g.rotation.z += delta * 0.1;
    g.children.forEach((child, i) => {
      child.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.6 + i * 0.4) * 0.06);
    });
  });

  return (
    <group ref={root} position={[0, 0, stageZ(index)]}>
      <group ref={spin}>
        {rings.map((i) => {
          const t = i / (rings.length - 1);
          return (
            <mesh key={i} position={[0, 0, -t * 7]} rotation={[0, 0, t * 2.4]}>
              <torusGeometry args={[0.45 + t * 4.2, 0.012, 8, 64]} />
              <meshBasicMaterial color={i % 2 === 0 ? INDIGO : CYAN} transparent opacity={0.36 - t * 0.2} />
            </mesh>
          );
        })}
      </group>
      <Sparkles count={60} scale={[9, 9, 10]} size={2.6} speed={reduced ? 0 : 0.6} opacity={0.36} color={VIOLET} />
    </group>
  );
}
