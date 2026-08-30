import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Boxes,
  Bot,
  ChevronRight,
  Clock,
  Database,
  Globe,
  LayoutDashboard,
  Lightbulb,
  Mail,
  Plug,
  Repeat,
  Sparkles,
  TrendingUp,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { COMPANY_EMAIL, COMPANY_MAILTO, OWNER_MAILTO } from '@/data/contact';
import { ease } from '@/lib/motion';
import { track } from '@/services/analytics';
import {
  AiVisual,
  AppsVisual,
  AutomationVisual,
  DashboardVisual,
  DataHubVisual,
  IntegrationVisual,
  ToolsVisual,
} from './visuals';

const VISUALS = {
  hub: DataHubVisual,
  automation: AutomationVisual,
  tools: ToolsVisual,
  dashboard: DashboardVisual,
  apps: AppsVisual,
  integration: IntegrationVisual,
  ai: AiVisual,
};

type VisualKey = keyof typeof VISUALS;

type Capability = {
  icon: LucideIcon;
  visual: VisualKey;
  title: string;
  body: string[];
  examples?: string[];
  examplesLabel?: string;
  gradient: string;
  accent: string;
  dot: string;
};

const capabilities: Capability[] = [
  {
    icon: Boxes,
    visual: 'hub',
    title: 'Bring All Your Data Into One Place',
    body: [
      'If your company uses different websites, spreadsheets, emails, portals, or software, we can connect them and bring the important information into one centralized system.',
      'You can view your business data from one place instead of checking multiple platforms every day.',
    ],
    gradient: 'from-indigo-500/20 to-violet-500/10',
    accent: 'text-indigo-400',
    dot: 'bg-indigo-400',
  },
  {
    icon: Repeat,
    visual: 'automation',
    title: 'Automate Repetitive Work',
    body: [
      'If your employees are repeatedly copying data, preparing reports, updating spreadsheets, sending notifications, or entering the same information in different systems, we can automate those tasks for you.',
      'This helps save time and reduce manual errors.',
    ],
    gradient: 'from-violet-500/20 to-pink-500/10',
    accent: 'text-violet-400',
    dot: 'bg-violet-400',
  },
  {
    icon: Wrench,
    visual: 'tools',
    title: 'Build Custom Business Tools',
    body: [
      'Every business works differently. If you need a specific tool for your company, we can build it based on your requirements.',
    ],
    examplesLabel: 'For example, we can create',
    examples: [
      'Pricing and quotation tools',
      'Commission calculators',
      'Employee management tools',
      'Attendance and scheduling systems',
      'Sales tracking tools',
      'Customer follow-up systems',
      'Inventory management tools',
      'Invoice and billing tools',
      'Route and distance calculators',
      'Expense tracking tools',
      'Automated report generators',
      'PDF generation tools',
      'Approval systems',
      'Customer portals',
      'Employee portals',
      'Admin dashboards',
    ],
    gradient: 'from-cyan-500/20 to-blue-500/10',
    accent: 'text-cyan-400',
    dot: 'bg-cyan-400',
  },
  {
    icon: LayoutDashboard,
    visual: 'dashboard',
    title: 'Create Business Dashboards',
    body: [
      'Want to understand your business performance quickly? We can create dashboards where you can easily view your numbers at a glance.',
    ],
    examplesLabel: 'See in one view',
    examples: [
      'Sales',
      'Revenue',
      'Expenses',
      'Employee performance',
      'Customer activity',
      'Inventory',
      'Service information',
      'Business KPIs',
      'Daily, weekly, and monthly reports',
    ],
    gradient: 'from-emerald-500/20 to-teal-500/10',
    accent: 'text-emerald-400',
    dot: 'bg-emerald-400',
  },
  {
    icon: Globe,
    visual: 'apps',
    title: 'Build Websites and Applications',
    body: [
      'Need a website, internal company portal, web application, or mobile application? We can design and build a solution based on your business needs.',
      'Whether you need something simple or a complete business management system, we can help.',
    ],
    gradient: 'from-amber-500/20 to-orange-500/10',
    accent: 'text-amber-400',
    dot: 'bg-amber-400',
  },
  {
    icon: Plug,
    visual: 'integration',
    title: 'Connect Your Existing Software',
    body: [
      'Already using different systems in your company? We can integrate your existing websites, APIs, databases, emails, and software so they can work together.',
      'Instead of manually moving information from one system to another, we can automate the process.',
    ],
    gradient: 'from-rose-500/20 to-pink-500/10',
    accent: 'text-rose-400',
    dot: 'bg-rose-400',
  },
  {
    icon: Bot,
    visual: 'ai',
    title: 'Use AI in Your Business',
    body: [
      'We can also help you use AI to improve your business — practically, where it actually saves time.',
    ],
    examplesLabel: 'Examples include',
    examples: [
      'AI chatbots',
      'Customer support assistants',
      'Internal AI assistants',
      'Document analysis',
      'Intelligent search',
      'Automatic data summaries',
      'AI-powered reporting',
      'Automated responses',
      'Business knowledge assistants',
    ],
    gradient: 'from-fuchsia-500/20 to-purple-500/10',
    accent: 'text-fuchsia-400',
    dot: 'bg-fuchsia-400',
  },
];

const questions = [
  'What is taking too much time?',
  'What work is being repeated every day?',
  'What process is difficult to manage?',
  'What information is spread across different systems?',
  'What would you like to make easier for your employees or customers?',
];

const goals = [
  { icon: Clock, label: 'Save your time', color: 'text-indigo-400' },
  { icon: Repeat, label: 'Reduce manual work', color: 'text-violet-400' },
  { icon: Database, label: 'Organize your data', color: 'text-cyan-400' },
  { icon: TrendingUp, label: 'Improve your business process', color: 'text-emerald-400' },
];

const painPoints = [
  'Manual work',
  'Spreadsheets',
  'Multiple websites',
  'Repeated data entry',
  'Complicated processes',
];

const HEADLINE = ['We', 'Build', 'Technology', 'That', 'Makes', 'Your', 'Business'];

const wordStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: '0.55em', filter: 'blur(8px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease },
  }),
};

function CapabilityRow({ cap, index }: { cap: Capability; index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const live = useInView(rowRef, { margin: '-15% 0px -15% 0px' });
  const revealed = useInView(rowRef, { once: true, margin: '-90px' });

  const flipped = index % 2 === 1;
  const slide = reduce ? 0 : 56;

  const Visual = VISUALS[cap.visual];

  return (
    <div
      ref={rowRef}
      className="relative grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-20 xl:gap-24"
    >
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.4 }}
        animate={revealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
        transition={{ duration: 0.45, delay: 0.15, ease }}
        className="ring-bg absolute left-1/2 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.1] bg-[#07071A] ring-8 lg:flex"
      >
        <span className={`font-mono text-[11px] font-700 ${cap.accent}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        {!reduce && (
          <motion.span
            className={`absolute inset-0 rounded-full ${cap.dot} opacity-20`}
            animate={live ? { scale: [1, 1.55], opacity: [0.25, 0] } : { opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: flipped ? slide : -slide }}
        animate={revealed ? { opacity: 1, x: 0 } : { opacity: 0, x: flipped ? slide : -slide }}
        transition={{ duration: 0.7, ease }}
        className={flipped ? 'lg:order-2' : ''}
      >
        <div className="mb-5 flex items-center gap-3">
          <motion.div
            className={`card-icon-wrap h-11 w-11 bg-gradient-to-br ${cap.gradient}`}
            whileHover={{ scale: 1.1, rotate: -6 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
          >
            <cap.icon size={19} className={cap.accent} />
          </motion.div>
          <span className="font-mono text-[11px] font-600 tracking-widest text-slate-600 lg:hidden">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        <h3 className="font-display mb-4 text-xl font-700 tracking-tight text-white sm:text-2xl lg:text-[1.75rem] lg:leading-[1.2]">
          {cap.title}
        </h3>

        <motion.div
          className={`mb-5 h-[2px] w-16 origin-left rounded-full ${cap.dot} opacity-60`}
          initial={{ scaleX: 0 }}
          animate={revealed ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
        />

        <div className="space-y-3.5">
          {cap.body.map((p, i) => (
            <motion.p
              key={p}
              initial={{ opacity: 0, y: 12 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease }}
              className="text-sm leading-[1.85] text-slate-400 sm:text-[0.95rem]"
            >
              {p}
            </motion.p>
          ))}
        </div>

        {cap.examples && (
          <div className="mt-6">
            <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              {cap.examplesLabel}
            </div>
            <div className="flex flex-wrap gap-2">
              {cap.examples.map((ex, i) => (
                <motion.span
                  key={ex}
                  className="tag cursor-default"
                  initial={{ opacity: 0, y: 8, scale: 0.94 }}
                  animate={
                    revealed
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 8, scale: 0.94 }
                  }
                  transition={{ duration: 0.32, delay: 0.3 + i * 0.035, ease }}
                  whileHover={{ y: -2, scale: 1.04 }}
                >
                  {ex}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: flipped ? -slide : slide, scale: 0.96 }}
        animate={
          revealed
            ? { opacity: 1, x: 0, scale: 1 }
            : { opacity: 0, x: flipped ? -slide : slide, scale: 0.96 }
        }
        transition={{ duration: 0.75, delay: 0.1, ease }}
        className={flipped ? 'lg:order-1' : ''}
      >
        <motion.div whileHover={reduce ? undefined : { y: -6, scale: 1.015 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}>
          <Visual active={live} />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function WhatWeBuild() {
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  const heroRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, reduce ? 0 : 110]);
  const heroOpacity = useTransform(heroScroll, [0, 0.75], [1, reduce ? 1 : 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, reduce ? 1 : 0.96]);

  const { scrollYProgress: railScroll } = useScroll({
    target: railRef,
    offset: ['start 65%', 'end 55%'],
  });
  const railFill = useSpring(railScroll, { stiffness: 90, damping: 26, restDelta: 0.001 });

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'What We Build — ClickSolver Technologies';
    return () => {
      document.title = prevTitle;
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-bg min-h-screen text-white">
      <div className="noise-overlay" />

      <div
        className="bg-gradient-primary fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left"
        style={{ transform: `scaleX(${progress / 100})` }}
      />

      <header className="glass sticky top-0 z-40 border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <Link to="/" className="group flex flex-shrink-0 items-center gap-2.5">
            <img
              src="/logo.png"
              alt="ClickSolver Technologies"
              className="h-8 w-8 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="font-display hidden text-[0.95rem] font-800 tracking-tight text-white sm:inline">
              Click<span className="gradient-text">Solver</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1.5 text-xs text-slate-500 md:flex">
            <Link to="/" className="transition hover:text-slate-300">
              Home
            </Link>
            <ChevronRight size={11} />
            <span className="text-slate-300">What We Build</span>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-400 transition hover:bg-white/[0.04] hover:text-white sm:inline-flex"
            >
              <ArrowLeft size={13} />
              Back Home
            </Link>
            <Link to="/#contact" className="btn-primary px-4 py-2 text-xs">
              Start a Project
            </Link>
          </div>
        </div>
      </header>

      <main className="relative">
        <section ref={heroRef} className="relative overflow-hidden border-b border-white/[0.06]">
          <div className="bg-gradient-hero pointer-events-none absolute inset-0" />
          <div className="dot-grid pointer-events-none absolute inset-0 opacity-25" />

          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-40 h-[500px] w-[500px] rounded-full bg-primary/[0.10] blur-[100px]"
            animate={reduce ? {} : { x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -left-32 h-[400px] w-[400px] rounded-full bg-secondary/[0.09] blur-[100px]"
            animate={reduce ? {} : { x: [0, 50, 0], y: [0, -25, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
            className="relative mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-20"
          >
            <motion.div initial="hidden" animate="visible" className="max-w-3xl">
              <motion.div variants={fadeUp} className="mb-6">
                <span className="section-badge">
                  <Lightbulb size={12} />
                  How We Help Your Business
                </span>
              </motion.div>

              <motion.h1
                variants={wordStagger}
                className="font-display mb-6 text-[2.1rem] font-[900] leading-[1.06] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.4rem]"
              >
                {HEADLINE.map((w) => (
                  <motion.span key={w} variants={word} className="mr-[0.25em] inline-block">
                    {w}
                  </motion.span>
                ))}
                <motion.span variants={word} className="gradient-text inline-block">
                  Easier
                </motion.span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={7}
                className="mb-6 text-base leading-[1.75] text-slate-300 sm:text-lg"
              >
                Is your business spending too much time on manual work, spreadsheets,
                multiple websites, repeated data entry, or complicated processes?{' '}
                <span className="font-600 text-white">We can help.</span>
              </motion.p>

              <motion.p
                variants={fadeUp}
                custom={8}
                className="mb-8 max-w-2xl text-sm leading-[1.8] text-slate-400 sm:text-base"
              >
                We build custom websites, applications, dashboards, automation systems,
                and business tools that make your daily work faster, easier, and more
                organized.
              </motion.p>

              <div className="mb-9 flex flex-wrap gap-2">
                {painPoints.map((p, i) => (
                  <motion.span
                    key={p}
                    initial={{ opacity: 0, y: 10, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.75 + i * 0.07, ease }}
                    whileHover={{ y: -2 }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400/80" />
                    {p}
                  </motion.span>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 1.05, ease }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <Link
                  to="/#contact"
                  onClick={() => track('what_we_build_cta_click', { position: 'hero' })}
                  className="btn-primary group inline-flex items-center justify-center gap-2 text-sm"
                >
                  Tell Us Your Problem
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={COMPANY_MAILTO}
                  onClick={() => track('what_we_build_email_click', { position: 'hero' })}
                  className="btn-ghost inline-flex items-center justify-center gap-2 text-sm"
                >
                  <Mail size={15} />
                  {COMPANY_EMAIL}
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              aria-hidden
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
              className="mt-14 hidden items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-slate-600 lg:flex"
            >
              <motion.span
                animate={reduce ? {} : { y: [0, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown size={13} />
              </motion.span>
              Seven ways we can help
            </motion.div>
          </motion.div>
        </section>

        <div className="mx-auto max-w-6xl space-y-20 px-5 py-14 sm:px-8 sm:py-20 lg:space-y-28">
          <section>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-14 text-center sm:mb-20"
            >
              <div className="mb-5 flex justify-center">
                <span className="section-badge">
                  <Sparkles size={12} />
                  Our Capabilities
                </span>
              </div>
              <h2 className="section-title mb-5">
                What Can We Do for <span className="gradient-text">Your Business?</span>
              </h2>
              <p className="section-desc mx-auto text-center">
                Seven ways we turn slow, manual, scattered work into systems that run
                themselves.
              </p>
            </motion.div>

            <div ref={railRef} className="relative">
              <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-white/[0.06] lg:block">
                <motion.div
                  className="h-full w-full origin-top bg-gradient-to-b from-indigo-400 via-violet-400 to-cyan-400"
                  style={{ scaleY: railFill }}
                />
              </div>

              <div className="relative space-y-20 lg:space-y-32">
                {capabilities.map((cap, i) => (
                  <CapabilityRow key={cap.title} cap={cap} index={i} />
                ))}
              </div>
            </div>
          </section>

          <section>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease }}
              className="glass-card relative overflow-hidden rounded-3xl border border-white/[0.08] p-6 sm:p-10 lg:p-14"
            >
              <div className="dot-grid pointer-events-none absolute inset-0 opacity-20" />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-1/4 h-[300px] w-[420px] rounded-full bg-primary/[0.10] blur-[100px]"
                animate={reduce ? {} : { x: [0, 60, 0], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              />

              <div className="relative grid items-start gap-9 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease }}
                >
                  <div className="mb-5">
                    <span className="section-badge">
                      <Lightbulb size={12} />
                      No Tech Knowledge Needed
                    </span>
                  </div>
                  <h2 className="font-display mb-5 text-2xl font-[800] leading-[1.12] tracking-[-0.03em] text-white sm:text-3xl lg:text-[2.4rem]">
                    You Tell Us the Problem.{' '}
                    <span className="gradient-text">We Build the Solution.</span>
                  </h2>
                  <p className="mb-5 text-sm leading-[1.8] text-slate-400 sm:text-base">
                    You don't need to know what technology or software you need. Just tell
                    us what's slowing you down.
                  </p>
                  <p className="text-sm leading-[1.8] text-slate-400 sm:text-base">
                    We will understand your process and recommend a practical technology
                    solution for your business.
                  </p>
                </motion.div>

                <ul className="space-y-3">
                  {questions.map((q, i) => (
                    <motion.li
                      key={q}
                      initial={{ opacity: 0, x: 44 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.55, delay: i * 0.09, ease }}
                      whileHover={{ x: 6 }}
                      className="group flex items-start gap-4 rounded-xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 transition-colors hover:border-primary/30 hover:bg-white/[0.05]"
                    >
                      <span className="mt-0.5 flex-shrink-0 font-mono text-[11px] font-700 text-primary-light">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm leading-[1.7] text-slate-200 sm:text-[0.95rem]">
                        {q}
                      </span>
                      <ArrowRight
                        size={14}
                        className="ml-auto mt-0.5 flex-shrink-0 text-slate-700 transition-all group-hover:translate-x-0.5 group-hover:text-primary-light"
                      />
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </section>

          <section>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mb-10 text-center sm:mb-12"
            >
              <div className="mb-5 flex justify-center">
                <span className="section-badge">
                  <TrendingUp size={12} />
                  Our Goal Is Simple
                </span>
              </div>
              <h2 className="section-title mb-5">
                Four things every build has to <span className="gradient-text">deliver</span>
              </h2>
              <p className="section-desc mx-auto text-center">
                From a small business tool to a complete centralized business platform, we
                can build a solution that works for you.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {goals.map((g, i) => (
                <motion.div
                  key={g.label}
                  initial={{ opacity: 0, y: 30, rotateX: -12 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease }}
                  whileHover={{ y: -6 }}
                  className="glass-card group rounded-2xl p-5 text-center sm:p-7"
                >
                  <motion.div
                    className="card-icon-wrap mx-auto mb-4"
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 16 }}
                  >
                    <g.icon size={20} className={g.color} />
                  </motion.div>
                  <div className="font-display text-sm font-700 leading-[1.4] text-white sm:text-base">
                    {g.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease }}
            className="relative overflow-hidden rounded-3xl p-[1.5px]"
          >
            {!reduce && (
              <motion.div
                aria-hidden
                className="absolute left-1/2 top-1/2 h-[160%] w-[160%] -translate-x-1/2 -translate-y-1/2"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 0%, #6366F1 12%, #22D3EE 22%, transparent 40%, transparent 60%, #8B5CF6 72%, transparent 88%)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
              />
            )}
            <div className="absolute inset-0 rounded-3xl border border-white/[0.08]" />

            <div className="relative overflow-hidden rounded-[calc(1.5rem-1.5px)] bg-[#06060F] p-7 text-center sm:p-12 lg:p-16">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.12] to-secondary/[0.06]" />
              <div className="dot-grid pointer-events-none absolute inset-0 opacity-20" />

              <div className="relative z-10">
                <h2 className="font-display mb-5 text-2xl font-[900] leading-[1.1] tracking-[-0.03em] text-white sm:text-3xl lg:text-[2.6rem]">
                  Have a Business Problem <span className="gradient-text">or an Idea?</span>
                </h2>
                <p className="mx-auto mb-9 max-w-xl text-sm leading-[1.8] text-slate-300 sm:text-base">
                  Tell us what you need, and let's build a solution for your business.
                </p>

                <div className="flex flex-col justify-center gap-3 sm:flex-row">
                  <Link
                    to="/#contact"
                    onClick={() => track('what_we_build_cta_click', { position: 'footer' })}
                    className="btn-primary group inline-flex items-center justify-center gap-2 text-sm"
                  >
                    Start the Conversation
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a
                    href={OWNER_MAILTO}
                    onClick={() => track('what_we_build_owner_email_click')}
                    className="btn-ghost inline-flex items-center justify-center gap-2 text-sm"
                  >
                    <Mail size={15} />
                    Email the Founder
                  </a>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>

      <footer className="border-t border-white/[0.06] py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} ClickSolver Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/" className="text-xs text-slate-500 transition hover:text-slate-300">
              Home
            </Link>
            <Link
              to="/#portfolio"
              className="text-xs text-slate-500 transition hover:text-slate-300"
            >
              Our Work
            </Link>
            <a
              href={COMPANY_MAILTO}
              className="text-xs text-slate-500 transition hover:text-slate-300"
            >
              {COMPANY_EMAIL}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
