import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, animate, useInView, useScroll } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2, Users, Briefcase, Globe, Award, Lightbulb } from 'lucide-react';

type StatItem =
  | { icon: typeof Briefcase; mode: 'count'; end: number; suffix: string; label: string }
  | { icon: typeof Briefcase; mode: 'text'; value: string; label: string };

const stats: StatItem[] = [
  { icon: Briefcase, mode: 'count', end: 4, suffix: '+', label: 'Projects Delivered' },
  { icon: Users, mode: 'count', end: 100, suffix: '%', label: 'Senior Engineers' },
  { icon: Globe, mode: 'text', value: 'US & India', label: 'Where We Work' },
  { icon: Award, mode: 'text', value: '24/7', label: 'On-Call Support' },
];

const trust = [
  'Trusted by Enviromaster Northern Virginia',
  'US Enterprise Clients',
  'NDA-First, Senior Engineering',
  'Production-Hardened Architecture',
];

function AnimatedHeadline() {
  const lines: { text: string; gradient?: boolean }[] = [
    { text: 'We Build Software' },
    { text: 'That Scales,', gradient: true },
    { text: 'Performs & Lasts.' },
  ];

  return (
    <h1 className="font-display font-[900] text-[2.1rem] sm:text-5xl xl:text-[3.75rem] leading-[1.08] sm:leading-[1.06] tracking-[-0.035em] sm:tracking-[-0.04em] text-white mb-5 sm:mb-6">
      {lines.map((line, li) => (
        <span key={li} className={li === 1 ? 'block' : 'block'}>
          {line.text.split(' ').map((word, wi) => (
            <span key={`${li}-${wi}`} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
              <motion.span
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  delay: 0.15 + (li * 3 + wi) * 0.07,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`inline-block ${line.gradient ? 'gradient-text bg-[length:200%_200%] animate-gradient-x' : ''}`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const value = useMotionValue(0);
  const rounded = useTransform(value, (v) => Math.round(v).toString());
  const [text, setText] = useState('0');

  useEffect(() => {
    const unsub = rounded.on('change', setText);
    return unsub;
  }, [rounded]);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, end, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [inView, end, value]);

  return (
    <span ref={ref}>
      {text}
      {suffix}
    </span>
  );
}

function MagneticButton({
  children,
  className = '',
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set(dx * 0.18);
        y.set(dy * 0.18);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const scrollY1 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const scrollY2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const scrollY3 = useTransform(scrollYProgress, [0, 1], [0, -240]);
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.6, 0]);
  const codeScrollY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const orb1X = useTransform(smx, [-1, 1], [-40, 40]);
  const orb1Y = useTransform(smy, [-1, 1], [-30, 30]);
  const orb2X = useTransform(smx, [-1, 1], [30, -30]);
  const orb2Y = useTransform(smy, [-1, 1], [25, -25]);
  const orb3X = useTransform(smx, [-1, 1], [-20, 20]);
  const orb3Y = useTransform(smy, [-1, 1], [-15, 15]);
  const codeX = useTransform(smx, [-1, 1], [-12, 12]);
  const codeY = useTransform(smy, [-1, 1], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px * 2);
    my.set(py * 2);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden"
    >
      <motion.div
        style={{ y: scrollY1, opacity: scrollOpacity }}
        className="absolute inset-0 bg-gradient-hero pointer-events-none"
      />
      <motion.div
        style={{ y: scrollY2 }}
        className="absolute inset-0 dot-grid opacity-40 pointer-events-none"
      />

      <motion.div style={{ y: scrollY3 }} className="absolute inset-0 pointer-events-none">
        <motion.div
          style={{ x: orb1X, y: orb1Y }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/[0.07] rounded-full blur-[120px]"
        />
        <motion.div
          style={{ x: orb2X, y: orb2Y }}
          className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/[0.07] rounded-full blur-[100px]"
        />
        <motion.div
          style={{ x: orb3X, y: orb3Y }}
          className="absolute bottom-1/4 left-1/2 w-[300px] h-[300px] bg-accent/[0.05] rounded-full blur-[80px]"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="section-badge">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Trusted by US &amp; India Enterprises
              </span>
            </motion.div>

            <AnimatedHeadline />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="text-slate-400 text-base sm:text-lg leading-[1.75] mb-8 max-w-lg"
            >
              From greenfield architecture to legacy modernization — we deliver
              enterprise-grade applications with clean code, bulletproof security,
              and cloud-native infrastructure on AWS, GCP &amp; Azure.
            </motion.p>

            <motion.ul
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08, delayChildren: 0.95 } },
              }}
              className="flex flex-col gap-2 mb-10"
            >
              {trust.map((t) => (
                <motion.li
                  key={t}
                  variants={{
                    hidden: { opacity: 0, x: -10 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="flex items-center gap-2.5 text-sm text-slate-300"
                >
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                  {t}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.25 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            >
              <MagneticButton
                href="#contact"
                className="btn-primary flex items-center justify-center gap-2 text-sm w-full sm:w-auto"
              >
                Start Your Project
                <ArrowRight size={16} />
              </MagneticButton>
              <a
                href="#portfolio"
                className="btn-ghost flex items-center justify-center gap-2 text-sm w-full sm:w-auto group"
              >
                <span className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.08] border border-white/[0.1] group-hover:bg-white/[0.12] transition">
                  <Play size={12} fill="white" className="text-white ml-0.5" />
                </span>
                View Our Work
              </a>
              <Link
                to="/what-we-build"
                className="btn-ghost flex items-center justify-center gap-2 text-sm w-full sm:w-auto group border-primary/30 hover:border-primary/60"
              >
                <span className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/15 border border-primary/30 group-hover:bg-primary/25 transition">
                  <Lightbulb size={13} className="text-primary-light" />
                </span>
                What We Build
                <ArrowRight size={14} className="text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-primary-light" />
              </Link>
            </motion.div>
          </div>

          <motion.div style={{ y: codeScrollY }} className="relative hidden lg:block">
            <motion.div
              style={{ x: codeX, y: codeY }}
              className="relative h-[520px]"
            >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-64 h-64 rounded-full bg-primary/20 blur-[80px]" />
            </motion.div>

            {stats.map((stat, i) => {
              const positions = [
                '-top-2 -left-6',
                '-top-2 -right-6',
                '-bottom-2 -left-6',
                '-bottom-2 -right-6',
              ];
              const delays = [0.6, 0.75, 0.9, 1.05];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.6, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: delays[i], ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4, scale: 1.04 }}
                  className={`absolute ${positions[i]} z-10 glass rounded-xl px-4 py-3 flex items-center gap-3 border border-white/[0.1] shadow-card`}
                >
                  <div className="card-icon-wrap !w-9 !h-9 !rounded-xl">
                    <stat.icon size={16} className="text-primary-light" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-white text-lg leading-none">
                      {stat.mode === 'count' ? <CountUp end={stat.end} suffix={stat.suffix} /> : stat.value}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="grid grid-cols-2 gap-3 mt-12 sm:mt-14 lg:hidden pt-8 border-t border-white/[0.06]"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card rounded-2xl p-4 flex items-center gap-3"
            >
              <div className="card-icon-wrap !w-10 !h-10 !rounded-xl flex-shrink-0">
                <stat.icon size={16} className="text-primary-light" />
              </div>
              <div className="min-w-0">
                <div className="font-display font-[800] text-lg leading-none gradient-text bg-[length:200%_200%] animate-gradient-x truncate">
                  {stat.mode === 'count' ? <CountUp end={stat.end} suffix={stat.suffix} /> : stat.value}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 leading-tight">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
