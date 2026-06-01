import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Target, Lightbulb, Heart, ArrowRight, Building2 } from 'lucide-react';

const values = [
  {
    icon: Target,
    title: 'Architecture First',
    desc: 'We design before we code. Every system starts with a solid blueprint — domain-driven design, clear boundaries, and scalability baked in from day one.',
  },
  {
    icon: Heart,
    title: 'Clean Code, Always',
    desc: 'We write code that future developers thank us for. SOLID principles, meaningful naming, comprehensive tests, and thorough documentation are non-negotiable.',
  },
  {
    icon: Users,
    title: 'Client Partnership',
    desc: 'We\'re not just vendors — we\'re your technology partner. Transparent communication, sprint reviews, and proactive problem-solving define every engagement.',
  },
  {
    icon: Lightbulb,
    title: 'Continuous Innovation',
    desc: 'Technology moves fast and so do we. Our team stays at the cutting edge — evaluating new tools, patterns, and platforms to keep your product ahead of the curve.',
  },
];

const milestones = [
  { year: '2023', event: 'First enterprise engagement — Enviromaster sales workflow & pricing automation platform shipped to production.' },
  { year: '2024', event: 'Launched Inventory Management System with Playwright-based automation for repetitive operational flows.' },
  { year: '2025', event: 'Expanded into mobile — React Native delivery for ClickSolver and the Enviromaster Salesform companion app.' },
  { year: '2026', event: 'Founded as ClickSolver Technologies. Senior engineers serving clients across India and the US.' },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-16 md:py-24 lg:py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary/[0.05] rounded-full blur-[100px] pointer-events-none" />

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
              <Building2 size={12} />
              About Us
            </span>
          </div>
          <h2 className="section-title mb-5">
            Senior Engineers.{' '}
            <span className="gradient-text">No Middlemen.</span>
          </h2>
          <p className="section-desc mx-auto">
            ClickSolver Technologies is a boutique software engineering firm made entirely of
            senior developers, architects, and DevOps engineers. Every project
            gets our A-team — always.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-14 xl:gap-20 items-start mb-16 md:mb-20">
          {/* Left — Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="font-display font-700 text-2xl text-white mb-6">
              Built by Engineers, <br />
              <span className="gradient-text">Obsessed with Excellence</span>
            </h3>
            <div className="space-y-4 text-slate-400 leading-[1.85] text-[0.95rem]">
              <p>
                We started ClickSolver Technologies because we were tired of software agencies
                that over-promised and under-delivered. Projects without architecture.
                Code without standards. Products that crumbled under real-world load.
              </p>
              <p>
                So we built something different: a team where every single developer
                is senior-level, every project follows clean architecture principles,
                and every deployment is production-hardened from the start.
              </p>
              <p>
                From our first US enterprise engagement — the EnviroMaster environmental
                monitoring platform — we've grown into a trusted partner for companies
                across healthcare, logistics, fintech, and retail. We bring the same
                rigor to a two-person startup as we do to a Fortune 500 modernization effort.
              </p>
              <p>
                Our team spans full-stack web, native mobile, cross-platform apps,
                backend services, database architecture, and cloud infrastructure.
                We don't outsource. We don't compromise. We build software that lasts.
              </p>
            </div>

            <a href="#contact" className="btn-primary inline-flex items-center gap-2 text-sm mt-8">
              Work With Us
              <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Right — Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="space-y-4"
          >
            {values.map((val, i) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="glass-card rounded-xl p-5 flex gap-4"
              >
                <div className="card-icon-wrap flex-shrink-0">
                  <val.icon size={20} className="text-primary-light" />
                </div>
                <div>
                  <h4 className="font-display font-600 text-[0.95rem] text-white mb-1.5">
                    {val.title}
                  </h4>
                  <p className="text-slate-400 text-sm leading-[1.75]">{val.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="font-display font-700 text-xl text-white text-center mb-10">
            Our Journey
          </h3>

          {/* Mobile & tablet: vertical list with left border */}
          <div className="relative lg:hidden pl-6 border-l border-primary/20 space-y-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                className="relative"
              >
                {/* Dot */}
                <span className="absolute -left-[1.55rem] top-4 w-3 h-3 rounded-full bg-gradient-primary border-2 border-bg" />
                <div className="glass-card rounded-xl p-4 sm:p-5">
                  <span className="font-mono text-primary-light text-sm font-600 mb-1.5 block">
                    {m.year}
                  </span>
                  <p className="text-slate-300 text-sm leading-[1.7]">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop: alternating layout */}
          <div className="relative hidden lg:block">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  className={`flex gap-6 items-start ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className="glass-card rounded-xl p-5">
                      <span className="font-mono text-primary-light text-sm font-600 mb-2 block">
                        {m.year}
                      </span>
                      <p className="text-slate-300 text-sm leading-[1.7]">{m.event}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-4 h-4 rounded-full bg-gradient-primary border-2 border-bg flex-shrink-0 self-start" style={{ marginTop: '22px' }} />
                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
