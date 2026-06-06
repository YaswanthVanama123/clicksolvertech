import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowRight, Folder, ExternalLink } from 'lucide-react';
import { projects, type Category, type Project } from '../data/projects';
import { track } from '../lib/analytics';
import MobileCarousel from './MobileCarousel';

type Filter = 'All' | Category;

const categories: Filter[] = ['All', 'Web', 'Mobile'];

// ── Card with cursor-tracking spotlight ─────────────────────────────────────
function ProjectCard({ proj, delay }: { proj: Project; delay: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mx}px ${my}px, rgba(255,255,255,0.08), transparent 60%)`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4 }}
      layout
    >
      <Link
        ref={ref}
        to={`/projects/${proj.slug}`}
        onClick={() => track('project_card_click', { slug: proj.slug, title: proj.title, category: proj.category })}
        onMouseMove={(e) => {
          const rect = ref.current?.getBoundingClientRect();
          if (!rect) return;
          mx.set(e.clientX - rect.left);
          my.set(e.clientY - rect.top);
        }}
        className={`relative glass-card rounded-2xl p-5 sm:p-7 bg-gradient-to-br ${proj.gradient} group block h-full hover:border-white/[0.18] active:scale-[0.99] transition-all overflow-hidden`}
      >
        {/* Cursor-follow spotlight overlay */}
        <motion.div
          aria-hidden
          style={{ background: spotlight }}
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        />

        {/* Header */}
        <div className="flex items-start justify-between mb-4 relative">
          <div className="card-icon-wrap transition-transform group-hover:scale-110 group-hover:rotate-[-4deg]">
            <proj.icon size={20} className={proj.accentColor} />
          </div>
          <span className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${proj.badgeColor}`}>
            {proj.category}
          </span>
        </div>

        <h3 className="font-display font-700 text-[1.1rem] text-white mb-1 relative">
          {proj.title}
        </h3>
        <p className="text-xs text-slate-500 mb-4 relative">{proj.client}</p>
        <p className="text-slate-400 text-sm leading-[1.8] mb-5 relative">{proj.desc}</p>

        {/* Impact */}
        <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3 mb-5 relative">
          <p className="text-xs text-slate-500 font-mono">{proj.impact}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5 relative">
          {proj.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] relative">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${proj.accentColor}`}>
            View Case Study
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </span>
          {proj.href && (
            <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
              Live <ExternalLink size={10} />
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
// ────────────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [active, setActive] = useState<Filter>('All');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="py-12 sm:py-16 md:py-24 lg:py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-5">
            <span className="section-badge">
              <Folder size={12} />
              Our Work
            </span>
          </div>
          <h2 className="section-title mb-5">
            Projects That{' '}
            <span className="gradient-text">Define Standards</span>
          </h2>
          <p className="section-desc mx-auto">
            A selection of enterprise projects we've architected and delivered —
            each solving real business problems at scale.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10 md:mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-250 ${
                active === cat
                  ? 'bg-gradient-primary text-white shadow-button'
                  : 'glass text-slate-400 hover:text-white border border-white/[0.07] hover:border-white/[0.15]'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        {/* Mobile: carousel */}
        <MobileCarousel
          ariaLabel="Case studies"
          title={`Work · ${filtered.length} ${filtered.length === 1 ? 'project' : 'projects'}`}
          itemClassName="w-[82vw] sm:w-[60vw]"
        >
          {filtered.map((proj, i) => (
            <ProjectCard key={proj.id} proj={proj} delay={i * 0.05} />
          ))}
        </MobileCarousel>

        {/* Desktop / tablet: grid */}
        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((proj, i) => (
            <ProjectCard key={proj.id} proj={proj} delay={i * 0.1} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-14"
        >
          <p className="text-slate-500 text-sm mb-5">
            Want to see more? We'd love to share relevant case studies.
          </p>
          <a href="#contact" className="btn-primary inline-flex items-center gap-2 text-sm">
            Request Full Portfolio
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
