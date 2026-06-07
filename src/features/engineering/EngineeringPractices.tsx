import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Terminal,
  FlaskConical,
  ShieldCheck,
  Globe,
  GitMerge,
  TestTube2,
  Eye,
  Database,
  AlertCircle,
  History,
  ArrowRight,
  Workflow,
} from 'lucide-react';
import MobilePillTabs from '@/components/ui/MobilePillTabs';

type EnvStep = {
  icon: typeof Terminal;
  name: string;
  tag: string;
  desc: string;
  bullets: string[];
  accent: string;
  dot: string;
  tint: string;
};

const environments: EnvStep[] = [
  {
    icon: Terminal,
    name: 'Local / Dev',
    tag: 'Engineer machine',
    desc: 'Where every change starts. Hot reload, mocked data, fast feedback loops.',
    bullets: ['Feature branches', 'Linting + type-checks', 'Pre-commit hooks'],
    accent: 'text-slate-300',
    dot: 'bg-slate-400',
    tint: 'from-slate-500/15 to-slate-700/5',
  },
  {
    icon: FlaskConical,
    name: 'Staging',
    tag: 'Mirror of production',
    desc: 'Same infrastructure, scrubbed seed data. Where QA, integration tests, and stakeholder reviews happen.',
    bullets: ['Auto-deploys from main', 'End-to-end tests run', 'Stakeholder UAT'],
    accent: 'text-cyan-300',
    dot: 'bg-cyan-400',
    tint: 'from-cyan-500/15 to-blue-500/5',
  },
  {
    icon: ShieldCheck,
    name: 'Pre-Production',
    tag: 'Final dress rehearsal',
    desc: 'Production-like data volume and traffic. Smoke tests, performance checks, last gate before customers see it.',
    bullets: ['Performance & load tests', 'Migrations dry-run', 'Security scans'],
    accent: 'text-violet-300',
    dot: 'bg-violet-400',
    tint: 'from-violet-500/15 to-purple-500/5',
  },
  {
    icon: Globe,
    name: 'Production',
    tag: 'Your customers',
    desc: 'Versioned releases, zero-downtime deploys, full observability, one-click rollback when needed.',
    bullets: ['Zero-downtime deploys', 'Live monitoring', 'One-click rollback'],
    accent: 'text-emerald-300',
    dot: 'bg-emerald-400',
    tint: 'from-emerald-500/15 to-teal-500/5',
  },
];

const practices = [
  {
    icon: GitMerge,
    title: 'CI/CD Pipelines',
    desc: 'Every push runs the full test suite, builds artifacts, and gates merges on quality. No "works on my machine" surprises.',
  },
  {
    icon: TestTube2,
    title: 'Automated Testing',
    desc: 'Unit, integration, and end-to-end coverage with Playwright. Tests run before every deploy and on every pull request.',
  },
  {
    icon: Eye,
    title: 'Code Review on Every Change',
    desc: 'No solo merges. Every change is reviewed by a senior engineer before it lands — including our own work.',
  },
  {
    icon: Database,
    title: 'Versioned DB Migrations',
    desc: 'All schema changes are versioned, reversible, and tested in staging before they ever touch production data.',
  },
  {
    icon: AlertCircle,
    title: 'Monitoring & Alerts',
    desc: 'Logs, metrics, and uptime checks wired up from day one. We see incidents before your customers do.',
  },
  {
    icon: History,
    title: 'Backups & Rollback',
    desc: 'Automated daily backups and tested restore drills. If something goes wrong, we roll back to the last good release in minutes.',
  },
];

export default function EngineeringPractices() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="how-we-ship"
      ref={ref}
      className="py-12 sm:py-16 md:py-24 lg:py-28 relative overflow-hidden"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[600px] h-[400px] bg-emerald-500/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-cyan-500/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex justify-center mb-5">
            <span className="section-badge">
              <Workflow size={12} className="text-emerald-400" />
              Engineering Discipline
            </span>
          </div>
          <h2 className="section-title mb-5">
            We Don't Ship{' '}
            <span className="gradient-text bg-[length:200%_200%] animate-gradient-x">
              Surprises.
            </span>
          </h2>
          <p className="section-desc mx-auto">
            Every line of code travels through four environments before it reaches
            your customers. Same pipeline we use for Enviromaster's production —
            same pipeline we'd build for you.
          </p>
        </motion.div>

        {/* ── Environment ladder ──────────────────────────────────────────── */}
        {/* Mobile: Apple-style pill tabs, content panel below */}
        <MobilePillTabs
          ariaLabel="Engineering pipeline"
          className="mb-12"
          tabs={environments.map((env, i) => ({
            id: env.name,
            label: env.name,
            sublabel: `0${i + 1}`,
            icon: env.icon,
          }))}
          renderPanel={(tab) => {
            const idx = environments.findIndex((e) => e.name === tab.id);
            const env = environments[idx];
            return <EnvCard env={env} index={idx} inView />;
          }}
        />

        {/* Desktop: 4-col grid with horizontal connector */}
        <div className="hidden lg:block relative mb-16">
          <div className="absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-slate-500/30 via-cyan-500/40 via-violet-500/40 to-emerald-500/40" />

          <div className="grid grid-cols-4 gap-4">
            {environments.map((env, i) => (
              <EnvCard key={env.name} env={env} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* ── Practices grid ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-center mb-10"
        >
          <h3 className="font-display font-700 text-white text-xl sm:text-2xl tracking-tight mb-2">
            And the practices behind every release
          </h3>
          <p className="text-slate-500 text-sm">
            Non-negotiables on every project, regardless of size.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {practices.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.65 + i * 0.07 }}
              whileHover={{ y: -3 }}
              className="glass-card rounded-xl p-5 hover:border-emerald-500/25 transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <p.icon size={16} className="text-emerald-300" />
                </div>
                <h4 className="font-display font-700 text-white text-[0.95rem] tracking-tight">
                  {p.title}
                </h4>
              </div>
              <p className="text-slate-400 text-[0.85rem] leading-[1.7]">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 glass-card rounded-2xl p-6 sm:p-7 border border-emerald-500/15 bg-gradient-to-br from-emerald-500/[0.04] to-cyan-500/[0.03]"
        >
          <div>
            <h4 className="font-display font-700 text-white text-base sm:text-lg mb-1">
              Want to see our pipeline in action?
            </h4>
            <p className="text-slate-400 text-sm leading-[1.65]">
              We'll walk you through how Enviromaster's production pipeline is wired —
              same playbook we'd ship for you.
            </p>
          </div>
          <a
            href="#contact"
            className="btn-primary inline-flex items-center gap-2 text-sm flex-shrink-0"
          >
            Book a Walkthrough
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function EnvCard({ env, index, inView }: { env: EnvStep; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
      whileHover={{ y: -4 }}
      className={`relative glass-card rounded-2xl p-5 sm:p-6 bg-gradient-to-br ${env.tint} hover:border-white/[0.18] active:scale-[0.99] transition-all h-full`}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="card-icon-wrap">
          <env.icon size={19} className={env.accent} />
        </div>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${env.dot} animate-pulse`} />
          <span className="font-mono text-[10px] font-700 text-slate-500 tracking-widest">
            0{index + 1}
          </span>
        </div>
      </div>

      <h3 className="font-display font-700 text-white text-base mb-1">
        {env.name}
      </h3>
      <div className={`text-[11px] font-semibold uppercase tracking-[0.15em] mb-3 ${env.accent}`}>
        {env.tag}
      </div>
      <p className="text-slate-400 text-[0.85rem] leading-[1.7] mb-4">
        {env.desc}
      </p>

      <ul className="space-y-1.5 pt-3 border-t border-white/[0.06]">
        {env.bullets.map((b) => (
          <li key={b} className="flex items-center gap-2 text-xs text-slate-300">
            <span className={`w-1 h-1 rounded-full ${env.dot} flex-shrink-0`} />
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
