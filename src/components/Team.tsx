import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users } from 'lucide-react';

const disciplines = [
  {
    initials: 'LA',
    role: 'Lead Architect',
    focus: 'System Design · Domain-Driven Architecture · Tech Strategy',
    gradient: 'from-indigo-500 to-violet-600',
    desc: 'Every engagement begins here. Our architects define the blueprint — scalable, maintainable, and built for the long run before a single line of code is written.',
  },
  {
    initials: 'FS',
    role: 'Senior Full-Stack Engineer',
    focus: 'React · Node.js · Spring Boot · Django · .NET',
    gradient: 'from-violet-500 to-purple-600',
    desc: 'Multi-framework engineers who move fluidly between frontend and backend. They own features end-to-end and never pass the buck.',
  },
  {
    initials: 'ML',
    role: 'Mobile Engineering Lead',
    focus: 'Swift · Kotlin · React Native · Flutter',
    gradient: 'from-pink-500 to-rose-600',
    desc: 'Native and cross-platform specialists who obsess over performance, UX, and App Store standards. iOS and Android, done right.',
  },
  {
    initials: 'DO',
    role: 'DevOps & Cloud Architect',
    focus: 'AWS · GCP · Azure · Kubernetes · Docker · CI/CD',
    gradient: 'from-cyan-500 to-sky-600',
    desc: 'They build the infrastructure your product runs on. Zero-downtime deployments, auto-scaling clusters, and pipelines that ship code with confidence.',
  },
  {
    initials: 'DB',
    role: 'Database Architect',
    focus: 'PostgreSQL · MongoDB · MySQL · Redis · Query Optimization',
    gradient: 'from-emerald-500 to-teal-600',
    desc: 'Schema design, indexing strategy, sharding, and replication — our data engineers ensure your database is never the bottleneck.',
  },
  {
    initials: 'SE',
    role: 'Security Engineer',
    focus: 'OWASP · OAuth 2.0 · HIPAA · SOC2 · Penetration Awareness',
    gradient: 'from-amber-500 to-orange-600',
    desc: 'Security isn\'t layered on at the end. Our security engineers review every architecture decision and enforce standards from day one.',
  },
  {
    initials: 'QA',
    role: 'QA & Test Automation Lead',
    focus: 'TDD · BDD · E2E Testing · CI Integration · Performance Testing',
    gradient: 'from-lime-500 to-green-600',
    desc: 'Our QA leads build test suites that catch regressions before they reach production. No manual testing bottlenecks — automation all the way.',
  },
  {
    initials: 'EM',
    role: 'Engineering Manager',
    focus: 'Agile · Sprint Planning · Stakeholder Communication · Delivery',
    gradient: 'from-slate-500 to-slate-600',
    desc: 'The bridge between your business goals and engineering execution. They keep sprints tight, communication clear, and delivery on track.',
  },
];

export default function Team() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="team" className="py-16 md:py-24 lg:py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary/[0.05] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="flex justify-center mb-5">
            <span className="section-badge">
              <Users size={12} />
              Our Team
            </span>
          </div>
          <h2 className="section-title mb-5">
            Every Specialist You Need,{' '}
            <span className="gradient-text">Already On Our Team.</span>
          </h2>
        </motion.div>

        {/* Trust statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <p className="text-slate-400 text-base sm:text-lg leading-[1.8]">
            When you bring a project to ClickSolver, you don't get reassigned to whoever is
            available. You get the exact discipline mix your project demands — architects,
            engineers, DevOps, QA, and a manager — all senior, all experienced, all already here.
          </p>
          <p className="text-slate-500 text-sm mt-4 leading-[1.8]">
            No ramp-up. No outsourcing. No juniors learning on your budget.
            Our bench runs deep across every domain of modern software engineering.
          </p>
        </motion.div>

        {/* Discipline cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {disciplines.map((d, i) => (
            <motion.div
              key={d.role}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass-card rounded-2xl p-6 flex flex-col group"
            >
              {/* Avatar */}
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${d.gradient} flex items-center justify-center text-white font-display font-700 text-sm mb-4 flex-shrink-0 shadow-glow-sm`}
              >
                {d.initials}
              </div>

              {/* Role */}
              <h3 className="font-display font-700 text-[0.95rem] text-white mb-1.5 leading-snug">
                {d.role}
              </h3>

              {/* Focus */}
              <p className="text-[11px] text-primary-light font-mono mb-3 leading-[1.6]">
                {d.focus}
              </p>

              {/* Desc */}
              <p className="text-slate-400 text-xs leading-[1.8] flex-1">
                {d.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 glass-card rounded-2xl p-6 sm:p-8 text-center bg-gradient-to-br from-primary/[0.07] to-secondary/[0.04]"
        >
          <p className="text-white font-display font-600 text-base sm:text-lg mb-2">
            "We staff every project with the disciplines it actually needs —
            <span className="gradient-text"> no padding, no gaps."</span>
          </p>
          <p className="text-slate-500 text-sm">
            Your project gets a purpose-built team, not a random assignment.
            Architects on architecture. DevOps on infrastructure. Engineers on code.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
