import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2, Users, Briefcase, Globe, Award } from 'lucide-react';

const stats = [
  { icon: Briefcase, value: '4+', label: 'Projects Delivered' },
  { icon: Users, value: '100%', label: 'Senior Engineers' },
  { icon: Globe, value: 'US & India', label: 'Where We Work' },
  { icon: Award, value: '24/7', label: 'On-Call Support' },
];

const trust = [
  'US Enterprise Clients',
  'ISO-Level Security Standards',
  'Clean Code Architecture',
  'Full Agile Delivery',
];

const codeSnippet = `// EnviroMaster — Real-time monitoring
const dashboard = await clicksolver
  .cloud('GCP')
  .deploy({
    stack: ['React', 'Node.js', 'K8s'],
    region: 'us-east-1',
    ssl: true,
    security: 'enterprise'
  });

// 99.99% uptime achieved ✓`;

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/[0.07] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/[0.07] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 w-[300px] h-[300px] bg-accent/[0.05] rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Left — Copy */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="section-badge">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Trusted by US &amp; India Enterprises
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-[900] text-[2.4rem] sm:text-5xl xl:text-[3.75rem] leading-[1.06] tracking-[-0.04em] text-white mb-6"
            >
              We Build Software{' '}
              <span className="gradient-text block">That Scales,</span>
              Performs &amp; Lasts.
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-slate-400 text-base sm:text-lg leading-[1.75] mb-8 max-w-lg"
            >
              From greenfield architecture to legacy modernization — we deliver
              enterprise-grade applications with clean code, bulletproof security,
              and cloud-native infrastructure on AWS, GCP &amp; Azure.
            </motion.p>

            {/* Trust bullets */}
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col gap-2 mb-10"
            >
              {trust.map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                  {t}
                </li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            >
              <a href="#contact" className="btn-primary flex items-center justify-center gap-2 text-sm w-full sm:w-auto">
                Start Your Project
                <ArrowRight size={16} />
              </a>
              <a href="#portfolio" className="btn-ghost flex items-center justify-center gap-2 text-sm w-full sm:w-auto">
                <span className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.08] border border-white/[0.1]">
                  <Play size={12} fill="white" className="text-white ml-0.5" />
                </span>
                View Our Work
              </a>
            </motion.div>
          </div>

          {/* Right — Code card + floating stats */}
          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="animate-float"
            >
              {/* Code card */}
              <div className="glass-card rounded-2xl p-6 shadow-card border border-white/[0.1] relative overflow-hidden">
                {/* Window chrome */}
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-3 text-xs text-slate-500 font-mono">
                    clicksolver-deploy.ts
                  </span>
                </div>
                <pre className="font-mono text-[13px] leading-[1.8] text-slate-300 overflow-x-auto">
                  <code>{codeSnippet}</code>
                </pre>
                {/* Gradient fade bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0D0D1E] to-transparent" />
              </div>
            </motion.div>

            {/* Floating stat cards */}
            {stats.map((stat, i) => {
              const positions = [
                '-top-5 -left-8',
                '-top-5 -right-8',
                '-bottom-5 -left-8',
                '-bottom-5 -right-8',
              ];
              const delays = [0.5, 0.6, 0.7, 0.8];
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: delays[i] }}
                  className={`absolute ${positions[i]} glass rounded-xl px-4 py-3 flex items-center gap-3 border border-white/[0.1] shadow-card`}
                >
                  <div className="card-icon-wrap !w-9 !h-9 !rounded-xl">
                    <stat.icon size={16} className="text-primary-light" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-white text-lg leading-none">
                      {stat.value}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 lg:mt-20 pt-10 border-t border-white/[0.06]"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display font-[800] text-3xl gradient-text">{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
