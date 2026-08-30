import { useEffect, useState } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion';
import {
  Activity,
  Bot,
  Calculator,
  CalendarClock,
  CheckCircle2,
  Cloud,
  CreditCard,
  Database,
  FileSpreadsheet,
  FileText,
  Globe,
  Mail,
  Package,
  Receipt,
  Route,
  Send,
  Server,
  Smartphone,
  Sparkles,
  Timer,
  UserCheck,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { ease } from '@/lib/motion';

type VisualProps = { active: boolean };

function useLoopStep(active: boolean, steps: number, intervalMs: number) {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!active || reduce) return;
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [active, reduce, intervalMs]);

  return reduce ? steps : tick % (steps + 1);
}

function Shimmer({ active, delay = 0 }: { active: boolean; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 skew-x-[-20deg]"
      style={{
        background:
          'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
      }}
      animate={active ? { x: ['0%', '400%'] } : { x: '0%' }}
      transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.6, delay, ease: 'linear' }}
    />
  );
}

function Counter({
  to,
  active,
  prefix = '',
  suffix = '',
}: {
  to: number;
  active: boolean;
  prefix?: string;
  suffix?: string;
}) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const text = useTransform(
    mv,
    (v) => `${prefix}${Math.round(v).toLocaleString('en-US')}${suffix}`,
  );

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      mv.set(to);
      return;
    }
    const controls = animate(mv, to, { duration: 1.5, ease });
    return () => controls.stop();
  }, [active, to, mv, reduce]);

  return <motion.span>{text}</motion.span>;
}

function Frame({
  children,
  glow = 'bg-primary/[0.10]',
}: {
  children: React.ReactNode;
  glow?: string;
}) {
  return (
    <div className="glass-card relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/[0.08]">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" />
      <div
        className={`pointer-events-none absolute -top-1/4 left-1/2 h-[70%] w-[70%] -translate-x-1/2 rounded-full ${glow} blur-[60px]`}
      />
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}

const HUB_SOURCES: { icon: LucideIcon; label: string; x: number; y: number }[] = [
  { icon: FileSpreadsheet, label: 'Sheets', x: 66, y: 62 },
  { icon: Mail, label: 'Email', x: 62, y: 232 },
  { icon: Globe, label: 'Portals', x: 334, y: 62 },
  { icon: Server, label: 'Software', x: 338, y: 232 },
  { icon: Cloud, label: 'Web', x: 200, y: 36 },
];

export function DataHubVisual({ active }: VisualProps) {
  const reduce = useReducedMotion();

  return (
    <Frame>
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
        {HUB_SOURCES.map((s, i) => (
          <g key={s.label}>
            <motion.line
              x1={s.x}
              y1={s.y}
              x2={200}
              y2={150}
              stroke="rgba(129,140,248,0.35)"
              strokeWidth={1}
              strokeDasharray="4 6"
              animate={active && !reduce ? { strokeDashoffset: [0, -20] } : {}}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
            />
            {!reduce && (
              <motion.circle
                r={2.6}
                fill="#22D3EE"
                initial={{ cx: s.x, cy: s.y, opacity: 0 }}
                animate={
                  active
                    ? { cx: [s.x, 200], cy: [s.y, 150], opacity: [0, 1, 1, 0] }
                    : { opacity: 0 }
                }
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.7,
                  delay: i * 0.24,
                  ease: 'easeIn',
                }}
              />
            )}
          </g>
        ))}
      </svg>

      {HUB_SOURCES.map((s, i) => (
        <motion.div
          key={s.label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(s.x / 400) * 100}%`, top: `${(s.y / 300) * 100}%` }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.45, delay: 0.1 + i * 0.09, ease }}
        >
          <div className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-white/[0.1] bg-[#0D0D1E]/90 px-2.5 py-1.5 shadow-card">
            <s.icon size={12} className="flex-shrink-0 text-slate-400" />
            <span className="text-[10px] font-medium text-slate-300">{s.label}</span>
          </div>
        </motion.div>
      ))}

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {!reduce &&
          [0, 1].map((r) => (
            <motion.div
              key={r}
              className="absolute inset-0 rounded-2xl border border-primary/40"
              animate={active ? { scale: [1, 1.9], opacity: [0.5, 0] } : { opacity: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, delay: r * 1.1, ease: 'easeOut' }}
            />
          ))}
        <motion.div
          className="bg-gradient-primary shadow-glow relative flex h-14 w-14 items-center justify-center rounded-2xl"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={active ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <Database size={22} className="text-white" />
        </motion.div>
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium tracking-wide text-slate-500">
        5 systems → 1 source of truth
      </div>
    </Frame>
  );
}

const AUTOMATION_TASKS = [
  { icon: FileSpreadsheet, label: 'Pull yesterday\'s sales' },
  { icon: Activity, label: 'Reconcile inventory' },
  { icon: FileText, label: 'Generate PDF report' },
  { icon: Send, label: 'Email the team' },
];

export function AutomationVisual({ active }: VisualProps) {
  const step = useLoopStep(active, AUTOMATION_TASKS.length, 900);

  return (
    <Frame glow="bg-violet-500/[0.10]">
      <div className="flex h-full flex-col justify-center gap-2.5 p-5 sm:p-6">
        <div className="mb-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Runs every morning
            </span>
          </div>
          <Zap size={13} className="text-violet-400" />
        </div>

        {AUTOMATION_TASKS.map((t, i) => {
          const done = i < step;
          const running = i === step;
          return (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, x: -12 }}
              animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease }}
              className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-colors duration-300 ${
                done
                  ? 'border-emerald-500/25 bg-emerald-500/[0.07]'
                  : running
                    ? 'border-violet-400/40 bg-violet-500/[0.09]'
                    : 'border-white/[0.07] bg-white/[0.02]'
              }`}
            >
              <t.icon
                size={14}
                className={`flex-shrink-0 transition-colors duration-300 ${
                  done ? 'text-emerald-400' : running ? 'text-violet-300' : 'text-slate-500'
                }`}
              />
              <span
                className={`flex-1 truncate text-[11px] transition-colors duration-300 ${
                  done ? 'text-slate-300' : running ? 'text-white' : 'text-slate-500'
                }`}
              >
                {t.label}
              </span>
              {done ? (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 16 }}
                >
                  <CheckCircle2 size={14} className="text-emerald-400" />
                </motion.span>
              ) : running ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Timer size={13} className="text-violet-300" />
                </motion.span>
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
              )}
            </motion.div>
          );
        })}

        <div className="mt-2 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] px-3 py-2">
          <span className="text-[10px] text-slate-500">Manual time saved</span>
          <span className="font-mono text-[11px] font-700 text-emerald-400">
            42 min → 0 min
          </span>
        </div>
      </div>
    </Frame>
  );
}

const TOOL_TILES: { icon: LucideIcon; label: string }[] = [
  { icon: Calculator, label: 'Pricing' },
  { icon: Receipt, label: 'Invoices' },
  { icon: Users, label: 'Employees' },
  { icon: CalendarClock, label: 'Shifts' },
  { icon: Package, label: 'Inventory' },
  { icon: Route, label: 'Routes' },
  { icon: CreditCard, label: 'Expenses' },
  { icon: UserCheck, label: 'Approvals' },
  { icon: FileText, label: 'Reports' },
];

export function ToolsVisual({ active }: VisualProps) {
  const step = useLoopStep(active, TOOL_TILES.length - 1, 700);

  return (
    <Frame glow="bg-cyan-500/[0.10]">
      <div className="flex h-full flex-col justify-center p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <Wrench size={13} className="text-cyan-400" />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Built to your process
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {TOOL_TILES.map((t, i) => {
            const lit = i === step;
            return (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.35, delay: i * 0.05, ease }}
              >
                <motion.div
                  animate={lit ? { scale: 1.06, y: -2 } : { scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                  className={`flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border transition-colors duration-300 ${
                    lit
                      ? 'border-cyan-400/50 bg-cyan-500/[0.12] shadow-glow-sm'
                      : 'border-white/[0.07] bg-white/[0.025]'
                  }`}
                >
                  <t.icon
                    size={15}
                    className={`transition-colors duration-300 ${
                      lit ? 'text-cyan-300' : 'text-slate-500'
                    }`}
                  />
                  <span
                    className={`text-[8.5px] font-medium transition-colors duration-300 ${
                      lit ? 'text-white' : 'text-slate-600'
                    }`}
                  >
                    {t.label}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4 text-center text-[10px] text-slate-500">
          …or anything else your team runs on
        </div>
      </div>
    </Frame>
  );
}

const BARS = [42, 68, 51, 84, 62, 95, 74];
const SPARK = 'M0,34 L20,28 L40,31 L60,18 L80,22 L100,11 L120,15 L140,4';

export function DashboardVisual({ active }: VisualProps) {
  const reduce = useReducedMotion();

  return (
    <Frame glow="bg-emerald-500/[0.10]">
      <div className="flex h-full flex-col justify-center gap-3 p-5 sm:p-6">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Revenue', prefix: '$', to: 128400, tone: 'text-emerald-400' },
            { label: 'Orders', to: 1284, tone: 'text-cyan-400' },
            { label: 'On-time', to: 96, suffix: '%', tone: 'text-indigo-400' },
          ].map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 14 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.45, delay: i * 0.08, ease }}
              className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.025] px-2.5 py-2.5"
            >
              <Shimmer active={active} delay={i * 0.4} />
              <div className="mb-1 text-[8.5px] uppercase tracking-wider text-slate-500">
                {k.label}
              </div>
              <div className={`font-display text-[13px] font-700 ${k.tone}`}>
                <Counter to={k.to} active={active} prefix={k.prefix} suffix={k.suffix} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.5, delay: 0.24, ease }}
          className="flex-1 rounded-xl border border-white/[0.07] bg-white/[0.025] p-3"
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[8.5px] uppercase tracking-wider text-slate-500">
              This week
            </span>
            <span className="flex items-center gap-1 text-[8.5px] font-600 text-emerald-400">
              <Activity size={9} /> +18%
            </span>
          </div>
          <div className="flex h-[52px] items-end gap-1.5">
            {BARS.map((h, i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-t-[3px] bg-gradient-to-t from-emerald-500/30 to-emerald-400/80"
                initial={{ height: 0 }}
                animate={active ? { height: `${h}%` } : { height: 0 }}
                transition={{ duration: 0.6, delay: 0.35 + i * 0.06, ease }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          transition={{ duration: 0.5, delay: 0.4, ease }}
          className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5"
        >
          <div className="mb-1.5 text-[8.5px] uppercase tracking-wider text-slate-500">
            Monthly trend
          </div>
          <svg viewBox="0 0 140 40" className="h-[34px] w-full" preserveAspectRatio="none">
            <motion.path
              d={SPARK}
              fill="none"
              stroke="#22D3EE"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0 }}
              animate={active ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: reduce ? 0 : 1.4, delay: 0.5, ease }}
            />
          </svg>
        </motion.div>
      </div>
    </Frame>
  );
}

export function AppsVisual({ active }: VisualProps) {
  const reduce = useReducedMotion();

  return (
    <Frame glow="bg-amber-500/[0.10]">
      <div className="relative h-full w-full p-5 sm:p-6">
        <motion.div
          initial={{ opacity: 0, y: 18, rotateX: 8 }}
          animate={active ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.6, ease }}
          className="relative h-[78%] w-[86%] overflow-hidden rounded-xl border border-white/[0.1] bg-[#0A0A18] shadow-card"
        >
          <div className="flex items-center gap-1.5 border-b border-white/[0.07] bg-white/[0.03] px-3 py-2">
            {['bg-rose-400/60', 'bg-amber-400/60', 'bg-emerald-400/60'].map((c) => (
              <span key={c} className={`h-1.5 w-1.5 rounded-full ${c}`} />
            ))}
            <div className="ml-2 h-2.5 flex-1 rounded-full bg-white/[0.05]" />
          </div>

          <div className="flex h-full">
            <div className="w-[26%] space-y-1.5 border-r border-white/[0.06] p-2.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className={`h-1.5 rounded-full ${i === 1 ? 'bg-primary/60' : 'bg-white/[0.07]'}`}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={active ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.06, ease }}
                />
              ))}
            </div>
            <div className="relative flex-1 space-y-2 overflow-hidden p-2.5">
              <Shimmer active={active} />
              <motion.div
                className="h-6 rounded-md bg-gradient-to-r from-primary/25 to-secondary/15"
                initial={{ opacity: 0, y: 6 }}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.4, ease }}
              />
              <div className="grid grid-cols-3 gap-1.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-7 rounded-md bg-white/[0.05]"
                    initial={{ opacity: 0, y: 6 }}
                    animate={active ? { opacity: 1, y: 0 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.07, ease }}
                  />
                ))}
              </div>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-1.5 rounded-full bg-white/[0.06]"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={active ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.45, delay: 0.65 + i * 0.07, ease }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26, x: 10 }}
          animate={
            active
              ? {
                  opacity: 1,
                  x: 0,
                  y: reduce ? 0 : [0, -6, 0],
                }
              : { opacity: 0, y: 26 }
          }
          transition={{
            opacity: { duration: 0.5, delay: 0.35, ease },
            x: { duration: 0.5, delay: 0.35, ease },
            y: reduce
              ? { duration: 0.5, delay: 0.35 }
              : { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.9 },
          }}
          className="absolute bottom-4 right-4 w-[27%] overflow-hidden rounded-[14px] border border-white/[0.12] bg-[#0A0A18] p-1.5 shadow-card sm:bottom-6 sm:right-6"
        >
          <div className="mx-auto mb-1.5 h-1 w-5 rounded-full bg-white/15" />
          <div className="space-y-1.5 rounded-lg bg-white/[0.03] p-1.5">
            <div className="bg-gradient-primary h-5 rounded" />
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="flex items-center gap-1"
                initial={{ opacity: 0, x: 8 }}
                animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: 8 }}
                transition={{ duration: 0.35, delay: 0.7 + i * 0.09, ease }}
              >
                <span className="h-2.5 w-2.5 flex-shrink-0 rounded bg-white/[0.09]" />
                <span className="h-1 flex-1 rounded-full bg-white/[0.07]" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="absolute bottom-1 left-5 flex items-center gap-3 text-[10px] text-slate-500 sm:left-6">
          <span className="flex items-center gap-1.5">
            <Globe size={10} /> Web
          </span>
          <span className="flex items-center gap-1.5">
            <Smartphone size={10} /> Mobile
          </span>
        </div>
      </div>
    </Frame>
  );
}

const LEFT_NODES: { icon: LucideIcon; label: string }[] = [
  { icon: Database, label: 'Your DB' },
  { icon: Globe, label: 'Vendor API' },
  { icon: Mail, label: 'Inbox' },
];
const RIGHT_NODES: { icon: LucideIcon; label: string }[] = [
  { icon: Receipt, label: 'Billing' },
  { icon: Package, label: 'Inventory' },
  { icon: FileText, label: 'Reports' },
];

export function IntegrationVisual({ active }: VisualProps) {
  const reduce = useReducedMotion();
  const ys = [70, 150, 230];

  return (
    <Frame glow="bg-rose-500/[0.10]">
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
        {ys.map((y, i) => (
          <g key={`l-${y}`}>
            <motion.path
              d={`M108,${y} C150,${y} 158,150 200,150`}
              fill="none"
              stroke="rgba(244,114,182,0.35)"
              strokeWidth={1.2}
              strokeDasharray="5 7"
              animate={active && !reduce ? { strokeDashoffset: [0, -24] } : {}}
              transition={{ duration: 1.3, repeat: Infinity, ease: 'linear', delay: i * 0.15 }}
            />
            <motion.path
              d={`M200,150 C242,150 250,${y} 292,${y}`}
              fill="none"
              stroke="rgba(129,140,248,0.35)"
              strokeWidth={1.2}
              strokeDasharray="5 7"
              animate={active && !reduce ? { strokeDashoffset: [0, -24] } : {}}
              transition={{ duration: 1.3, repeat: Infinity, ease: 'linear', delay: i * 0.15 }}
            />
          </g>
        ))}
      </svg>

      {[
        { nodes: LEFT_NODES, side: 'left' as const },
        { nodes: RIGHT_NODES, side: 'right' as const },
      ].map(({ nodes, side }) =>
        nodes.map((n, i) => (
          <motion.div
            key={`${side}-${n.label}`}
            className="absolute -translate-y-1/2"
            style={{
              top: `${(ys[i] / 300) * 100}%`,
              [side]: '4%',
            }}
            initial={{ opacity: 0, x: side === 'left' ? -14 : 14 }}
            animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: side === 'left' ? -14 : 14 }}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.09, ease }}
          >
            <div className="flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-white/[0.1] bg-[#0D0D1E]/90 px-2.5 py-2 shadow-card">
              <n.icon size={12} className="flex-shrink-0 text-slate-400" />
              <span className="text-[9.5px] font-medium text-slate-300">{n.label}</span>
            </div>
          </motion.div>
        )),
      )}

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.5, delay: 0.25, ease }}
      >
        <div className="bg-gradient-primary shadow-glow flex flex-col items-center gap-0.5 rounded-xl px-3 py-2.5">
          <Zap size={14} className="text-white" />
          <span className="text-[8px] font-700 uppercase tracking-wider text-white/90">
            Sync
          </span>
        </div>
      </motion.div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium tracking-wide text-slate-500">
        No more copy-paste between systems
      </div>
    </Frame>
  );
}

const AI_REPLY =
  'Found 3 unpaid invoices over 30 days — total $8,420. Drafted reminders for each.';

export function AiVisual({ active }: VisualProps) {
  const reduce = useReducedMotion();
  const step = useLoopStep(active, 3, 1500);

  const typed = reduce
    ? AI_REPLY
    : step >= 3
      ? AI_REPLY
      : '';

  return (
    <Frame glow="bg-fuchsia-500/[0.10]">
      <div className="flex h-full flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-center gap-2 border-b border-white/[0.06] pb-3">
          <div className="bg-gradient-primary flex h-6 w-6 items-center justify-center rounded-lg">
            <Bot size={13} className="text-white" />
          </div>
          <span className="font-display text-[11px] font-600 text-white">
            Business Assistant
          </span>
          <Sparkles size={11} className="ml-auto text-fuchsia-400" />
        </div>

        <div className="flex flex-1 flex-col justify-end gap-2.5">
          <motion.div
            className="self-end"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={
              active && step >= 1
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 10, scale: 0.95 }
            }
            transition={{ duration: 0.35, ease }}
          >
            <div className="max-w-[80%] rounded-2xl rounded-br-sm border border-white/[0.09] bg-white/[0.06] px-3 py-2 text-[10.5px] leading-[1.6] text-slate-200">
              Which invoices are overdue?
            </div>
          </motion.div>

          <motion.div
            className="self-start"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={
              active && step >= 2
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 10, scale: 0.95 }
            }
            transition={{ duration: 0.35, ease }}
          >
            <div className="max-w-[88%] rounded-2xl rounded-bl-sm border border-fuchsia-400/25 bg-fuchsia-500/[0.09] px-3 py-2 text-[10.5px] leading-[1.65] text-slate-100">
              {typed ? (
                typed
              ) : (
                <span className="flex items-center gap-1 py-0.5">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="h-1.5 w-1.5 rounded-full bg-fuchsia-300/80"
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        delay: d * 0.15,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </span>
              )}
            </div>
          </motion.div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2">
          <span className="flex-1 text-[10px] text-slate-600">Ask anything…</span>
          <div className="bg-gradient-primary flex h-5 w-5 items-center justify-center rounded-md">
            <Send size={10} className="text-white" />
          </div>
        </div>
      </div>
    </Frame>
  );
}
