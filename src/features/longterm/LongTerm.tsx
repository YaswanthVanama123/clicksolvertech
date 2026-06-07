import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Handshake, CalendarCheck, RefreshCw, Shield, TrendingUp,
  MessageCircle, GitBranch, BarChart3, ArrowRight, CheckCircle2,
  Infinity, Users
} from 'lucide-react';

const engagements = [
  {
    icon: GitBranch,
    title: 'Project-Based Delivery',
    tag: 'Fixed Scope',
    tagColor: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    desc: 'Defined requirements, milestone-driven sprints, and a production-ready delivery. Ideal for greenfield builds and well-scoped features.',
    points: [
      'Clear deliverables from sprint one',
      'Fixed timeline & transparent pricing',
      'Full handover with documentation',
    ],
    gradient: 'from-indigo-500/10 to-violet-500/5',
  },
  {
    icon: Users,
    title: 'Dedicated Team Embed',
    tag: 'Most Popular',
    tagColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    desc: 'A committed squad of senior engineers works exclusively on your product — functioning as your in-house engineering team, just without the overhead.',
    points: [
      'Engineers who know your codebase deeply',
      'Daily standups, weekly demos',
      'Scales up or down with your roadmap',
    ],
    gradient: 'from-violet-500/10 to-purple-500/5',
    featured: true,
  },
  {
    icon: CalendarCheck,
    title: 'Monthly Retainer',
    tag: 'Long-Term',
    tagColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    desc: 'Reserved monthly capacity for ongoing development, feature releases, maintenance, and technical leadership. No project gaps, no cold starts.',
    points: [
      'Guaranteed monthly engineering hours',
      'Proactive tech debt & performance work',
      'Architecture reviews every quarter',
    ],
    gradient: 'from-cyan-500/10 to-sky-500/5',
  },
];

const longTermBenefits = [
  {
    icon: TrendingUp,
    title: 'No Ramp-Up Tax',
    desc: 'Engineers who\'ve been on your codebase for months ship features in days, not weeks. Institutional knowledge compounds over time.',
  },
  {
    icon: Shield,
    title: 'Proactive, Not Reactive',
    desc: 'We don\'t wait for things to break. Long-term partners get quarterly architecture reviews, dependency audits, and performance checks.',
  },
  {
    icon: MessageCircle,
    title: 'One Dedicated Contact',
    desc: 'A senior engineering manager who knows your product as well as you do. One call, full context, no repetition.',
  },
  {
    icon: BarChart3,
    title: 'Your Roadmap Is Our Roadmap',
    desc: 'We align our capacity to your release calendar. Product sprints, marketing deadlines, investor demos — we plan around what matters to you.',
  },
  {
    icon: RefreshCw,
    title: 'Continuous Improvement',
    desc: 'Every quarter we\'re not just building new features — we\'re refactoring tech debt, upgrading dependencies, and strengthening your foundation.',
  },
  {
    icon: Handshake,
    title: 'You Own Everything',
    desc: 'Full IP transfer, complete code ownership, zero vendor lock-in. You can take your codebase anywhere. We bank on the relationship, not the contract.',
  },
];

const testimonialPull = {
  quote: 'We started with a 6-week project. Three years later, ClickSolver is still our engineering team. They know our product better than some of our own employees.',
  name: 'Michael Torres',
  role: 'Head of Product · Multi-Chain Retail, USA',
  avatar: 'MT',
  gradient: 'from-emerald-500 to-teal-600',
};

// Import workaround removed

export default function LongTerm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="longterm" className="py-12 sm:py-16 md:py-24 lg:py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/50 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-secondary/[0.05] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="flex justify-center mb-5">
            <span className="section-badge">
              <Infinity size={12} />
              Long-Term Partnership
            </span>
          </div>
          <h2 className="section-title mb-5">
            Don't Hire a Vendor.{' '}
            <span className="gradient-text">Build a Partnership.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="text-slate-400 text-base sm:text-lg leading-[1.8]">
            The companies that get the most value from us aren't the ones who ship one project —
            they're the ones who bring us into their roadmap and never look back.
            When your engineering partner knows your product, your team, and your ambitions,
            <span className="text-white font-medium"> everything gets faster, better, and cheaper over time.</span>
          </p>
        </motion.div>

        {/* Engagement model cards */}
        <div className="grid md:grid-cols-3 gap-5 mb-20">
          {engagements.map((eng, i) => (
            <motion.div
              key={eng.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className={`relative glass-card rounded-2xl p-7 flex flex-col bg-gradient-to-br ${eng.gradient} ${
                eng.featured ? 'ring-1 ring-primary/30' : ''
              }`}
            >
              {eng.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-primary text-white text-[11px] font-700 px-4 py-1 rounded-full shadow-button whitespace-nowrap">
                  Most Chosen
                </div>
              )}

              <div className="flex items-start justify-between mb-5">
                <div className="card-icon-wrap">
                  <eng.icon size={20} className="text-primary-light" />
                </div>
                <span className={`text-[11px] font-600 px-3 py-1 rounded-full border ${eng.tagColor}`}>
                  {eng.tag}
                </span>
              </div>

              <h3 className="font-display font-700 text-[1.05rem] text-white mb-3">
                {eng.title}
              </h3>
              <p className="text-slate-400 text-sm leading-[1.8] mb-5 flex-1">
                {eng.desc}
              </p>

              <ul className="space-y-2.5">
                {eng.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    {pt}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Why stay long-term */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h3 className="font-display font-700 text-xl sm:text-2xl text-white text-center mb-3">
            Why Our Clients Stay for{' '}
            <span className="gradient-text">Years, Not Months</span>
          </h3>
          <p className="text-slate-500 text-sm text-center mb-10 max-w-xl mx-auto">
            A long-term engineering partner isn't a luxury — it's the highest-ROI
            decision a growing product company can make.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {longTermBenefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                className="glass-card rounded-xl p-5 flex gap-4"
              >
                <div className="card-icon-wrap flex-shrink-0">
                  <b.icon size={18} className="text-primary-light" />
                </div>
                <div>
                  <h4 className="font-display font-600 text-[0.9rem] text-white mb-1.5">
                    {b.title}
                  </h4>
                  <p className="text-slate-400 text-xs leading-[1.8]">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="glass-card rounded-2xl p-7 sm:p-10 bg-gradient-to-br from-primary/[0.07] to-secondary/[0.04] mb-12"
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div
              className={`w-14 h-14 rounded-xl bg-gradient-to-br ${testimonialPull.gradient} flex items-center justify-center text-white font-display font-700 flex-shrink-0`}
            >
              {testimonialPull.avatar}
            </div>
            <div>
              <p className="text-white text-base sm:text-lg leading-[1.8] italic mb-4">
                "{testimonialPull.quote}"
              </p>
              <p className="text-slate-500 text-sm">
                — {testimonialPull.name} · {testimonialPull.role}
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            Ready to stop cycling through agencies and build something that lasts?
            Let's talk about a long-term engagement.
          </p>
          <a href="#contact" className="btn-primary inline-flex items-center gap-2">
            Explore a Partnership
            <ArrowRight size={16} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
