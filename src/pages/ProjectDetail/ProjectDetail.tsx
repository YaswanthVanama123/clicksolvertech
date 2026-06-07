import { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2, AlertCircle, Sparkles, Target, Code2, Wrench, ChevronRight } from 'lucide-react';
import { projects } from '@/data/projects';
import { track } from '@/services/analytics';

const LOGO_URL =
  'https://i.postimg.cc/c1jjNGSz/49838C81-6436-48A7-8999-491E779EEF19-2-removebg-preview-%282%29.png';

function pad2(n: number) {
  return n.toString().padStart(2, '0');
}

function SectionHeader({ num, title, accent }: { num: number; title: string; accent: string }) {
  return (
    <div className="flex items-center gap-4 mb-7">
      <span className={`font-mono text-xs font-600 ${accent} tracking-widest`}>
        {pad2(num)}
      </span>
      <h2 className="font-display font-700 text-white text-xl sm:text-2xl tracking-tight">
        {title}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent" />
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const index = projects.findIndex((p) => p.slug === slug);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

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

  if (index === -1) return <Navigate to="/" replace />;
  const project = projects[index];
  const prev = index > 0 ? projects[index - 1] : null;
  const next = index < projects.length - 1 ? projects[index + 1] : null;

  return (
    <div className="bg-bg text-white min-h-screen">
      <div className="noise-overlay" />

      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-gradient-primary origin-left"
        style={{ transform: `scaleX(${progress / 100})` }}
      />

      {/* Sticky top nav */}
      <header className="sticky top-0 z-40 glass border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <img
              src={LOGO_URL}
              alt="ClickSolver Technologies"
              className="w-8 h-8 object-contain"
            />
            <span className="hidden sm:inline font-display font-800 text-[0.95rem] text-white tracking-tight">
              Click<span className="gradient-text">Solver</span>
            </span>
          </Link>

          {/* Breadcrumb */}
          <nav className="hidden md:flex items-center gap-1.5 text-xs text-slate-500">
            <Link to="/" className="hover:text-slate-300 transition">Home</Link>
            <ChevronRight size={11} />
            <Link to="/#portfolio" className="hover:text-slate-300 transition">Work</Link>
            <ChevronRight size={11} />
            <span className="text-slate-300 truncate max-w-[200px]">{project.title}</span>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/#portfolio"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition px-3 py-2 rounded-lg hover:bg-white/[0.04]"
            >
              <ArrowLeft size={13} />
              All Projects
            </Link>
            <Link to="/#contact" className="btn-primary text-xs px-4 py-2">
              Start a Project
            </Link>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* ── Hero ────────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-white/[0.06]">
          {/* Backdrop layers */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60 pointer-events-none`} />
          <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" />
          <div className="absolute -top-40 -right-32 w-[500px] h-[500px] bg-primary/[0.10] rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-40 -left-32 w-[400px] h-[400px] bg-secondary/[0.08] rounded-full blur-[100px] pointer-events-none" />

          <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-12 sm:pt-20 pb-14 sm:pb-20">
            <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14 items-start">
              {/* Left — Title block */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Eyebrow */}
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="section-badge">
                    <Sparkles size={11} className={project.accentColor} />
                    Case Study
                  </span>
                  <span className={`text-[11px] font-semibold px-3 py-1 rounded-full border ${project.badgeColor}`}>
                    {project.category}
                  </span>
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => track('project_live_click', { slug: project.slug, url: project.href })}
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full border border-white/[0.12] text-white hover:bg-white/[0.06] transition"
                    >
                      Visit Live <ExternalLink size={10} />
                    </a>
                  )}
                </div>

                {/* Title */}
                <h1 className="font-display font-[900] text-[2.4rem] sm:text-5xl lg:text-[3.5rem] text-white tracking-[-0.03em] leading-[1.04] mb-5">
                  {project.title}
                </h1>

                {/* Subtitle */}
                <p className="text-slate-300 text-lg sm:text-xl leading-[1.55] max-w-2xl mb-8">
                  {project.client}
                </p>

                {/* Impact strip */}
                <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3">
                  {project.impact.split(' · ').map((bit, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-2 text-xs font-medium text-slate-300 bg-white/[0.04] border border-white/[0.08] rounded-full px-3.5 py-1.5"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full bg-current ${project.accentColor}`} />
                      {bit}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Right — Meta panel */}
              <motion.aside
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card rounded-2xl p-6 border border-white/[0.08]"
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-5">
                  Project Facts
                </div>
                <dl className="space-y-4">
                  <MetaRow label="Category" value={project.category} accent={project.accentColor} />
                  <MetaRow label="Role" value="Full-Stack Engineering" accent={project.accentColor} />
                  <MetaRow label="Status" value="In Production" accent={project.accentColor} />
                  <MetaRow label="Engagement" value="End-to-end build" accent={project.accentColor} />
                  <div className="pt-4 border-t border-white/[0.06]">
                    <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500 mb-3">
                      Primary Stack
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </dl>
              </motion.aside>
            </div>
          </div>
        </section>

        {/* ── Body ────────────────────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20 space-y-16 sm:space-y-20">
          {/* 01. Overview */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader num={1} title="Overview" accent={project.accentColor} />
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2 space-y-5 text-slate-300 text-[1rem] leading-[1.85]">
                {project.details.overview.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <aside className={`glass-card rounded-2xl p-6 self-start bg-gradient-to-br ${project.gradient} border border-white/[0.08]`}>
                <Target size={18} className={`${project.accentColor} mb-3`} />
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mb-2">
                  The Outcome
                </div>
                <p className="text-white text-sm font-display font-600 leading-[1.5]">
                  {project.impact}
                </p>
              </aside>
            </div>
          </motion.section>

          {/* 02. Our Role */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader num={2} title="Our Role" accent={project.accentColor} />
            <div className="grid sm:grid-cols-2 gap-3">
              {project.details.role.map((r, i) => (
                <div
                  key={i}
                  className="glass-card rounded-xl p-5 flex gap-3 hover:border-white/[0.15] transition"
                >
                  <CheckCircle2 size={18} className={`flex-shrink-0 mt-0.5 ${project.accentColor}`} />
                  <p className="text-slate-300 text-sm leading-[1.75]">{r}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 03. Tech Stack */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader num={3} title="Tech Stack & Architecture" accent={project.accentColor} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.details.techStack.map((t) => (
                <div key={t.label} className="glass-card rounded-xl p-5 hover:border-white/[0.15] transition">
                  <div className="flex items-center gap-2 mb-4">
                    <Code2 size={14} className={project.accentColor} />
                    <div className="text-[11px] font-bold text-white uppercase tracking-wider">
                      {t.label}
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {t.items.map((it) => (
                      <li key={it} className="flex items-center gap-2 text-slate-300 text-sm">
                        <span className={`w-1 h-1 rounded-full bg-current ${project.accentColor}`} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 04. Key Features */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader num={4} title="Key Features" accent={project.accentColor} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.details.features.map((f, i) => (
                <div
                  key={f.title}
                  className="glass-card rounded-xl p-5 hover:border-white/[0.15] transition relative overflow-hidden group"
                >
                  <div className={`absolute top-3 right-4 font-mono text-[10px] font-700 ${project.accentColor} opacity-50`}>
                    {pad2(i + 1)}
                  </div>
                  <h3 className="font-display font-700 text-white text-[0.95rem] mb-2.5 pr-8">
                    {f.title}
                  </h3>
                  <p className="text-slate-400 text-[0.85rem] leading-[1.7]">{f.desc}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 05. Challenges & Solutions */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader num={5} title="Challenges & Solutions" accent={project.accentColor} />
            <div className="space-y-4">
              {project.details.challenges.map((c, i) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl overflow-hidden grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]"
                >
                  <div className="p-5 sm:p-6 bg-rose-500/[0.04]">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle size={14} className="text-rose-400" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-rose-400/90">
                        Challenge
                      </span>
                    </div>
                    <p className="text-slate-300 text-sm leading-[1.75]">{c.challenge}</p>
                  </div>
                  <div className={`p-5 sm:p-6 bg-gradient-to-br ${project.gradient}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <Wrench size={14} className={project.accentColor} />
                      <span className={`text-[10px] font-bold uppercase tracking-[0.18em] ${project.accentColor}`}>
                        Solution
                      </span>
                    </div>
                    <p className="text-slate-100 text-sm leading-[1.75]">{c.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* 06. Outcomes */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader num={6} title="Outcomes & Learnings" accent={project.accentColor} />
            <div className="grid sm:grid-cols-2 gap-3">
              {project.details.outcomes.map((o, i) => (
                <div key={i} className="glass-card rounded-xl p-5 flex gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-white/[0.04] border border-white/[0.06]`}>
                    <span className={`font-mono text-[10px] font-700 ${project.accentColor}`}>
                      {pad2(i + 1)}
                    </span>
                  </div>
                  <p className="text-slate-300 text-sm leading-[1.75]">{o}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* CTA banner */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="relative glass-card rounded-2xl p-7 sm:p-12 overflow-hidden border border-white/[0.08]"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 pointer-events-none`} />
            <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="font-display font-[800] text-white text-xl sm:text-2xl tracking-tight mb-2">
                  Need something like <span className="gradient-text">{project.title}</span>?
                </h3>
                <p className="text-slate-300 text-sm sm:text-[0.95rem] max-w-xl leading-[1.7]">
                  Tell us about your problem. We'll respond within 4 hours with an honest
                  assessment and a path forward.
                </p>
              </div>
              <Link to="/#contact" className="btn-primary inline-flex items-center gap-2 text-sm flex-shrink-0">
                Start the Conversation
                <ArrowRight size={15} />
              </Link>
            </div>
          </motion.section>

          {/* Prev / Next */}
          <nav className="grid sm:grid-cols-2 gap-3 pt-2">
            {prev ? (
              <Link
                to={`/projects/${prev.slug}`}
                className="glass-card rounded-xl p-5 sm:p-6 hover:border-white/[0.18] transition group"
              >
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.18em] mb-2">
                  <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-0.5" />
                  Previous Case Study
                </div>
                <div className="text-white font-display font-700 text-base mb-1">{prev.title}</div>
                <div className="text-slate-500 text-xs truncate">{prev.client}</div>
              </Link>
            ) : (
              <div className="hidden sm:block" />
            )}
            {next ? (
              <Link
                to={`/projects/${next.slug}`}
                className="glass-card rounded-xl p-5 sm:p-6 hover:border-white/[0.18] transition group sm:text-right"
              >
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.18em] mb-2 sm:justify-end">
                  Next Case Study
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                </div>
                <div className="text-white font-display font-700 text-base mb-1">{next.title}</div>
                <div className="text-slate-500 text-xs truncate">{next.client}</div>
              </Link>
            ) : (
              <Link
                to="/#portfolio"
                className="glass-card rounded-xl p-5 sm:p-6 hover:border-white/[0.18] transition group sm:text-right"
              >
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.18em] mb-2 sm:justify-end">
                  Back to Work
                  <ArrowRight size={12} />
                </div>
                <div className="text-white font-display font-700 text-base">All Projects</div>
              </Link>
            )}
          </nav>
        </div>
      </main>

      {/* Footer strip */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>© {new Date().getFullYear()} ClickSolver Technologies. All rights reserved.</span>
          <Link to="/" className="hover:text-slate-400 transition">
            ← Back to home
          </Link>
        </div>
      </footer>
    </div>
  );
}

function MetaRow({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">{label}</dt>
      <dd className={`text-sm font-display font-600 text-right ${accent}`}>{value}</dd>
    </div>
  );
}
