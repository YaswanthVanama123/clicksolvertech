import { motion, useMotionValue, useMotionTemplate, type Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Globe, Smartphone, Cloud, Database, ShieldCheck, RefreshCw,
  ArrowRight, Layers, Building2, type LucideIcon,
} from 'lucide-react';
import MobilePillTabs from '@/components/ui/MobilePillTabs';

const services = [
  {
    icon: Globe,
    title: 'Full-Stack Web Development',
    desc: 'End-to-end web applications built with React, Node.js, Spring Boot, and Django. We architect scalable SPAs, SSR apps, and enterprise portals that handle millions of users.',
    tags: ['React', 'Node.js', 'Spring Boot', 'Django', '.NET'],
    color: 'from-indigo-500/20 to-violet-500/10',
    iconColor: 'text-indigo-400',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    desc: 'Native and cross-platform apps that feel like home on every device. From iOS Swift to Android Kotlin, and React Native / Flutter for unified codebases — we deliver pixel-perfect mobile experiences.',
    tags: ['Swift', 'Kotlin', 'React Native', 'Flutter'],
    color: 'from-violet-500/20 to-pink-500/10',
    iconColor: 'text-violet-400',
  },
  {
    icon: Cloud,
    title: 'Cloud & DevOps Engineering',
    desc: 'We design and manage cloud-native infrastructure across AWS, GCP, Azure, and DigitalOcean. CI/CD pipelines, Kubernetes orchestration, Docker containerization, and zero-downtime deployments.',
    tags: ['AWS', 'GCP', 'Azure', 'Kubernetes', 'Docker'],
    color: 'from-cyan-500/20 to-blue-500/10',
    iconColor: 'text-cyan-400',
  },
  {
    icon: Database,
    title: 'Database Architecture',
    desc: 'We design and optimize relational and NoSQL database schemas for performance at scale. Query tuning, sharding strategies, replication, and high-availability clusters built to survive anything.',
    tags: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'],
    color: 'from-emerald-500/20 to-teal-500/10',
    iconColor: 'text-emerald-400',
  },
  {
    icon: ShieldCheck,
    title: 'Security-First Engineering',
    desc: 'Security is not a feature — it\'s a foundation. We apply OWASP standards, end-to-end encryption, RBAC, OAuth 2.0 / JWT, penetration-testing awareness, and GDPR-compliant data handling in every project.',
    tags: ['OWASP', 'OAuth 2.0', 'JWT', 'GDPR', 'SSL/TLS'],
    color: 'from-amber-500/20 to-orange-500/10',
    iconColor: 'text-amber-400',
  },
  {
    icon: RefreshCw,
    title: 'Legacy Modernization',
    desc: 'We breathe new life into aging systems. Strategic re-architecture, incremental refactoring, API-layer extraction, and microservices migration — without business interruption.',
    tags: ['Microservices', 'API Design', 'Refactoring', 'Migration'],
    color: 'from-rose-500/20 to-pink-500/10',
    iconColor: 'text-rose-400',
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
};

type ServiceCardProps = {
  index: number;
  inView: boolean;
  svc: {
    icon: LucideIcon;
    title: string;
    desc: string;
    tags: string[];
    color: string;
    iconColor: string;
  };
};

function ServiceCard({ svc, index, inView }: ServiceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mx}px ${my}px, rgba(129,140,248,0.10), transparent 60%)`;

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial={inView ? false : 'hidden'}
      animate={inView ? 'visible' : 'hidden'}
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
      }}
      onMouseLeave={() => {
        mx.set(-200);
        my.set(-200);
      }}
      className="glass-card rounded-2xl p-5 sm:p-7 group cursor-default relative overflow-hidden active:scale-[0.99] transition-transform"
    >
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="absolute inset-0 pointer-events-none transition-opacity"
      />

      {/* Icon */}
      <div className={`card-icon-wrap mb-5 bg-gradient-to-br ${svc.color} relative transition-transform group-hover:scale-110 group-hover:-rotate-3`}>
        <svc.icon size={22} className={svc.iconColor} />
      </div>

      <h3 className="font-display font-700 text-[1.05rem] text-white mb-3 group-hover:gradient-text transition-all relative">
        {svc.title}
      </h3>

      <p className="text-slate-400 text-sm leading-[1.8] mb-5 relative">
        {svc.desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 relative">
        {svc.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="py-12 sm:py-16 md:py-24 lg:py-28 relative overflow-hidden" ref={ref}>
      {/* Section glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-5">
            <span className="section-badge">
              <Layers size={12} />
              What We Do
            </span>
          </div>
          <h2 className="section-title mb-5">
            Engineering Across{' '}
            <span className="gradient-text">Every Layer</span>
          </h2>
          <p className="section-desc mx-auto text-center">
            From idea to infrastructure — we cover the full spectrum of modern
            software engineering with senior-level expertise in every domain.
          </p>
        </motion.div>

        {/* Grid */}
        {/* Mobile: pill tabs (Apple-style) */}
        <MobilePillTabs
          ariaLabel="Our services"
          tabs={services.map((s) => ({
            id: s.title,
            label: shortServiceLabel(s.title),
            icon: s.icon,
          }))}
          renderPanel={(tab) => {
            const idx = services.findIndex((s) => s.title === tab.id);
            const svc = services[idx];
            return <ServiceCard svc={svc} index={idx} inView />;
          }}
        />

        {/* Tablet & desktop: grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <ServiceCard key={svc.title} svc={svc} index={i} inView={inView} />
          ))}
        </div>

        {/* Franchise callout — for Enviromaster branch owners */}
        <motion.a
          href="#enviromaster"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ y: -3 }}
          className="relative mt-7 glass-card rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5 overflow-hidden border border-cyan-500/25 bg-gradient-to-br from-cyan-500/[0.06] to-blue-500/[0.04] group hover:border-cyan-400/40 transition-all"
        >
          <div className="absolute -top-16 -right-16 w-[300px] h-[300px] bg-cyan-500/[0.08] rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10 flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-3 py-1">
                <Building2 size={11} />
                Enviromaster Franchise Owners
              </span>
            </div>
            <h3 className="font-display font-700 text-white text-lg sm:text-xl tracking-tight mb-2">
              We already power Enviromaster Northern Virginia's full ops stack.
            </h3>
            <p className="text-slate-400 text-sm leading-[1.7] max-w-2xl">
              Sales & pricing platform, inventory management system, and the
              inventory & sales mobile app for field teams — all built and
              shipped to production for Jeffrey Bolden's franchise. Skip the
              discovery phase.
            </p>
          </div>
          <span className="relative z-10 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 group-hover:text-white transition flex-shrink-0">
            See what we built
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </span>
        </motion.a>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-14"
        >
          <p className="text-slate-500 text-sm mb-5">
            Not sure which service fits your needs? Let's talk.
          </p>
          <a href="#contact" className="btn-primary inline-flex items-center gap-2 text-sm">
            Discuss Your Project
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// Trim long service titles for tab pills (where space is tight)
function shortServiceLabel(title: string) {
  const map: Record<string, string> = {
    'Full-Stack Web Development': 'Web',
    'Mobile App Development': 'Mobile',
    'Cloud & DevOps Engineering': 'Cloud & DevOps',
    'Database Architecture': 'Database',
    'Security-First Engineering': 'Security',
    'Legacy Modernization': 'Legacy',
  };
  return map[title] ?? title;
}
