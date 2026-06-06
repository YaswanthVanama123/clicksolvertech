import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2 } from 'lucide-react';

const techCategories = [
  {
    label: 'Frontend',
    color: 'from-blue-500/20 to-indigo-500/10',
    dotColor: 'bg-blue-400',
    techs: ['React', 'TypeScript', 'Next.js', 'Vue.js', 'Tailwind CSS'],
  },
  {
    label: 'Backend',
    color: 'from-violet-500/20 to-purple-500/10',
    dotColor: 'bg-violet-400',
    techs: ['Node.js', 'Spring Boot', 'Django', '.NET Core', 'GraphQL'],
  },
  {
    label: 'Mobile',
    color: 'from-pink-500/20 to-rose-500/10',
    dotColor: 'bg-pink-400',
    techs: ['React Native', 'Flutter', 'Swift / iOS', 'Kotlin / Android'],
  },
  {
    label: 'Databases',
    color: 'from-emerald-500/20 to-teal-500/10',
    dotColor: 'bg-emerald-400',
    techs: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Firebase'],
  },
  {
    label: 'Cloud & DevOps',
    color: 'from-cyan-500/20 to-sky-500/10',
    dotColor: 'bg-cyan-400',
    techs: ['AWS', 'GCP', 'Azure', 'Kubernetes', 'Docker', 'DigitalOcean'],
  },
  {
    label: 'Architecture & Practices',
    color: 'from-amber-500/20 to-orange-500/10',
    dotColor: 'bg-amber-400',
    techs: ['Microservices', 'CI/CD Pipelines', 'REST & GraphQL APIs', 'SOLID Principles', 'TDD / BDD'],
  },
];

// Flat marquee list for the scroll band
const allTechs = [
  'React', 'Node.js', 'Spring Boot', 'Django', '.NET Core',
  'PostgreSQL', 'MongoDB', 'MySQL', 'Redis',
  'React Native', 'Flutter', 'Swift', 'Kotlin',
  'AWS', 'GCP', 'Azure', 'Kubernetes', 'Docker', 'DigitalOcean',
  'TypeScript', 'GraphQL', 'Microservices', 'CI/CD', 'Next.js',
];

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="tech" className="py-12 sm:py-16 md:py-24 lg:py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />

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
              <Code2 size={12} />
              Technology Stack
            </span>
          </div>
          <h2 className="section-title mb-5">
            Mastery Across{' '}
            <span className="gradient-text">Every Stack</span>
          </h2>
          <p className="section-desc mx-auto">
            Our team holds deep expertise across 25+ technologies — from frontend
            to infrastructure. We select the right tool for every challenge.
          </p>
        </motion.div>

        {/* Category cards */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mb-16">
          {techCategories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
              className={`glass-card rounded-2xl p-6 bg-gradient-to-br ${cat.color}`}
            >
              <div className="flex items-center gap-2.5 mb-5">
                <span className={`w-2.5 h-2.5 rounded-full ${cat.dotColor}`} />
                <span className="font-display font-600 text-[0.9rem] text-white">
                  {cat.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.06] transition-colors"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${cat.dotColor}`} />
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Marquee tech band */}
        <div className="relative overflow-hidden py-5 border-y border-white/[0.06]">
          <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-24 bg-gradient-to-r from-bg to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-24 bg-gradient-to-l from-bg to-transparent z-10" />
          <div className="flex gap-6 animate-marquee whitespace-nowrap">
            {[...allTechs, ...allTechs].map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 text-slate-400 text-sm font-medium px-4 py-2 glass rounded-lg border border-white/[0.06] flex-shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary-light" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
