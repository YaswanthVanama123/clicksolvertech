import {
  Suspense,
  useEffect,
  useRef,
  useSyncExternalStore,
  type ReactElement,
  type RefObject,
} from 'react';
import { useReducedMotion, useScroll, type MotionValue } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import {
  CloudPiece,
  CorePiece,
  LatticePiece,
  PipelinePiece,
  SlabsPiece,
  VortexPiece,
  type PieceProps,
} from './setpieces';
import { SPACING } from './stage';

let webglSupport: boolean | null = null;
function hasWebGL(): boolean {
  if (webglSupport !== null) return webglSupport;
  try {
    const canvas = document.createElement('canvas');
    webglSupport = !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    webglSupport = false;
  }
  return webglSupport;
}

const DESKTOP_QUERY = '(min-width: 1024px)';

function subscribeDesktop(cb: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}

function useIsDesktop() {
  return useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );
}

function subscribeVisibility(cb: () => void) {
  document.addEventListener('visibilitychange', cb);
  return () => document.removeEventListener('visibilitychange', cb);
}

function usePageVisible() {
  return useSyncExternalStore(
    subscribeVisibility,
    () => !document.hidden,
    () => true,
  );
}

const STAGE: {
  section: string | null;
  Piece: (p: PieceProps) => ReactElement;
  x: number;
  y: number;
  lead: number;
}[] = [
  { section: null, Piece: CorePiece, x: -2.4, y: 0.0, lead: 8 },
  { section: 'services', Piece: LatticePiece, x: 3.4, y: 0.6, lead: 15 },
  { section: 'portfolio', Piece: SlabsPiece, x: -3.6, y: -0.4, lead: 14 },
  { section: 'enviromaster', Piece: PipelinePiece, x: 3.2, y: 0.8, lead: 16 },
  { section: 'how-we-ship', Piece: LatticePiece, x: -3.2, y: -0.6, lead: 15 },
  { section: 'tech', Piece: CloudPiece, x: 2.9, y: 0.5, lead: 15 },
  { section: 'team', Piece: SlabsPiece, x: -3.0, y: 0.6, lead: 15 },
  { section: 'longterm', Piece: PipelinePiece, x: 3.2, y: -0.5, lead: 16 },
  { section: 'about', Piece: CloudPiece, x: -2.9, y: 0.5, lead: 15 },
  { section: 'testimonials', Piece: LatticePiece, x: 3.0, y: -0.4, lead: 15 },
  { section: 'faq', Piece: SlabsPiece, x: -3.0, y: 0.4, lead: 15 },
  { section: 'contact', Piece: VortexPiece, x: 0.0, y: 0.0, lead: 13 },
];

const LAST = STAGE.length - 1;

const smoothstep = (t: number) => t * t * (3 - 2 * t);
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

const evenAnchors = () => STAGE.map((_, i) => i / LAST);

function measureAnchors(): number[] {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  if (max <= 0) return evenAnchors();

  const out = STAGE.map((stop, i) => {
    if (!stop.section) return 0;
    const el = document.getElementById(stop.section);
    if (!el) return i / LAST;
    const rect = el.getBoundingClientRect();
    const centre = rect.top + window.scrollY + rect.height / 2 - window.innerHeight / 2;
    return clamp01(centre / max);
  });

  for (let i = 1; i <= LAST; i++) {
    if (out[i] <= out[i - 1]) out[i] = Math.min(1, out[i - 1] + 0.001);
  }
  return out;
}

function sampleTrack(p: number, anchors: number[], out: Vector3) {
  if (p <= anchors[0]) {
    out.set(STAGE[0].x, STAGE[0].y, STAGE[0].lead);
    return;
  }
  if (p >= anchors[LAST]) {
    out.set(STAGE[LAST].x, STAGE[LAST].y, -LAST * SPACING + STAGE[LAST].lead);
    return;
  }

  let i = 0;
  while (i < LAST && p > anchors[i + 1]) i++;

  const a = STAGE[i];
  const b = STAGE[i + 1];
  const span = anchors[i + 1] - anchors[i];
  const t = smoothstep(clamp01(span > 0 ? (p - anchors[i]) / span : 0));

  const az = -i * SPACING + a.lead;
  const bz = -(i + 1) * SPACING + b.lead;

  out.set(a.x + (b.x - a.x) * t, a.y + (b.y - a.y) * t, az + (bz - az) * t);
}

function CameraRig({
  progress,
  anchors,
  reduced,
}: {
  progress: MotionValue<number>;
  anchors: RefObject<number[]>;
  reduced: boolean;
}) {
  const target = useRef(new Vector3(STAGE[0].x, STAGE[0].y, STAGE[0].lead));
  const lights = useRef<import('three').Group>(null);

  useFrame((state, delta) => {
    sampleTrack(progress.get(), anchors.current, target.current);

    if (!reduced) {
      target.current.x += state.pointer.x * 0.55;
      target.current.y += state.pointer.y * 0.4;
    }

    if (reduced) {
      state.camera.position.copy(target.current);
    } else {
      state.camera.position.lerp(target.current, 1 - Math.pow(0.0016, delta));
    }

    state.camera.lookAt(
      state.camera.position.x,
      state.camera.position.y,
      state.camera.position.z - 10,
    );

    if (lights.current) lights.current.position.copy(state.camera.position);
  });

  return (
    <group ref={lights}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 0]} intensity={45} color="#6366F1" />
      <pointLight position={[-5, -3, -2]} intensity={32} color="#22D3EE" />
      <pointLight position={[0, 4, -6]} intensity={22} color="#8B5CF6" />
    </group>
  );
}

export default function ScrollStage({ className }: { className?: string }) {
  const reduced = useReducedMotion() ?? false;
  const isDesktop = useIsDesktop();
  const visible = usePageVisible();
  const { scrollYProgress } = useScroll();
  const anchors = useRef<number[]>(evenAnchors());
  const supported = typeof window === 'undefined' ? false : hasWebGL();

  useEffect(() => {
    if (!isDesktop) return;
    const measure = () => {
      anchors.current = measureAnchors();
    };
    measure();
    const settle = setTimeout(measure, 600);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(settle);
      window.removeEventListener('resize', measure);
    };
  }, [isDesktop]);

  if (!isDesktop || !supported) return null;

  return (
    <div className={className} aria-hidden>
      <Canvas
        frameloop={visible ? 'always' : 'never'}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        camera={{
          position: [STAGE[0].x, STAGE[0].y, STAGE[0].lead],
          fov: 45,
          far: STAGE.length * SPACING + 60,
        }}
      >
        <fogExp2 attach="fog" args={['#03030A', 0.042]} />
        <CameraRig progress={scrollYProgress} anchors={anchors} reduced={reduced} />
        <Suspense fallback={null}>
          {STAGE.map((entry, i) => (
            <entry.Piece key={i} index={i} reduced={reduced} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
