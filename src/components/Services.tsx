import { motion, type Variants } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Globe, Smartphone, Cloud, Database, ShieldCheck, RefreshCw,
  ArrowRight, Layers
} from 'lucide-react';

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

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="py-16 md:py-24 lg:py-28 relative" ref={ref}>
      {/* Section glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/[0.04] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              custom={i}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={cardVariants}
              className="glass-card rounded-2xl p-7 group cursor-default"
            >
              {/* Icon */}
              <div className={`card-icon-wrap mb-5 bg-gradient-to-br ${svc.color}`}>
                <svc.icon size={22} className={svc.iconColor} />
              </div>

              <h3 className="font-display font-700 text-[1.05rem] text-white mb-3 group-hover:gradient-text transition-all">
                {svc.title}
              </h3>

              <p className="text-slate-400 text-sm leading-[1.8] mb-5">
                {svc.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {svc.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

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
