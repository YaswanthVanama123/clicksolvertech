import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Folder, ExternalLink } from 'lucide-react';
import { projects, type Category } from '../data/projects';

type Filter = 'All' | Category;

const categories: Filter[] = ['All', 'Web', 'Mobile'];

export default function Portfolio() {
  const [active, setActive] = useState<Filter>('All');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

  return (
    <section id="portfolio" className="py-16 md:py-24 lg:py-28 relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/30 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
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
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((proj, i) => (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              layout
            >
              <Link
                to={`/projects/${proj.slug}`}
                className={`glass-card rounded-2xl p-7 bg-gradient-to-br ${proj.gradient} group block h-full hover:border-white/[0.18] transition-all`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="card-icon-wrap">
                    <proj.icon size={20} className={proj.accentColor} />
                  </div>
                  <span className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${proj.badgeColor}`}>
                    {proj.category}
                  </span>
                </div>

                <h3 className="font-display font-700 text-[1.1rem] text-white mb-1">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-500 mb-4">{proj.client}</p>
                <p className="text-slate-400 text-sm leading-[1.8] mb-5">{proj.desc}</p>

                {/* Impact */}
                <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-3 mb-5">
                  <p className="text-xs text-slate-500 font-mono">{proj.impact}</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {proj.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>

                {/* CTA row */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${proj.accentColor}`}>
                    View Case Study
                    <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                  {proj.href && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
                      Live <ExternalLink size={10} />
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
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
