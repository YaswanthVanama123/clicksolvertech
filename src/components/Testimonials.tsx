import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote, MessageSquare } from 'lucide-react';

const testimonials = [
  {
    name: 'James Whitfield',
    role: 'CTO, EnviroMaster Inc.',
    company: 'US Environmental Technology',
    quote: 'ClickSolver delivered what three previous vendors couldn\'t. The EnviroMaster platform they built handles 200+ sensor stations in real time, hasn\'t gone down once, and the codebase is the cleanest we\'ve ever seen. These guys don\'t just write code — they engineer solutions.',
    stars: 5,
    avatar: 'JW',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    name: 'Priya Mehta',
    role: 'VP Engineering',
    company: 'FinTech Platform, India',
    quote: 'Our loan origination platform processes over $50M monthly with sub-3-minute approval times. The architecture ClickSolver designed scaled from 10 loans/day to 1,000 without a single re-write. Their security implementation passed our SOC2 audit first try.',
    stars: 5,
    avatar: 'PM',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    name: 'Michael Torres',
    role: 'Head of Product',
    company: 'Multi-Chain Retail, USA',
    quote: 'We had a legacy inventory system built in 2009. ClickSolver modernized it incrementally — zero downtime, zero data loss, and our warehouse teams didn\'t even notice the transition. The new React + Spring Boot platform is a 10x improvement in every metric.',
    stars: 5,
    avatar: 'MT',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    name: 'Sarah Kim',
    role: 'COO',
    company: 'HealthBridge, Singapore',
    quote: 'HIPAA compliance in healthcare apps is notoriously hard to get right. ClickSolver nailed it on the first submission. More importantly, our patients love the app — 4.8 stars on the App Store and our support tickets dropped 60% after launch.',
    stars: 5,
    avatar: 'SK',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    name: 'Arjun Ramamurthy',
    role: 'Founder & CEO',
    company: 'Logistics SaaS, Australia',
    quote: 'Brought ClickSolver in to build our Flutter delivery app from scratch. 8 weeks from first commit to App Store approval. Clean Dart code, great CI/CD pipeline, and the backend Spring Boot API is rock solid. They\'re our exclusive tech partner now.',
    stars: 5,
    avatar: 'AR',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    name: 'David Okonkwo',
    role: 'Director of Infrastructure',
    company: 'SaaS Cloud Company, UK',
    quote: 'The Kubernetes multi-cloud setup they built for us reduced our infrastructure costs by 60% while improving reliability. Auto-scaling, self-healing, Prometheus monitoring — it\'s enterprise-grade DevOps work that would have taken our internal team 18 months.',
    stars: 5,
    avatar: 'DO',
    gradient: 'from-sky-500 to-indigo-600',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="testimonials" className="py-16 md:py-24 lg:py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/40 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />

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
              <MessageSquare size={12} />
              Client Voices
            </span>
          </div>
          <h2 className="section-title mb-5">
            Trusted by Leaders{' '}
            <span className="gradient-text">Worldwide</span>
          </h2>
          <p className="section-desc mx-auto">
            Don't take our word for it. Here's what the engineering and product
            leaders we've worked with say about us.
          </p>

          {/* Stars aggregate */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="text-white font-600">5.0</span>
            <span className="text-slate-500 text-sm">· From clients across India &amp; the US</span>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-7 flex flex-col"
            >
              {/* Quote icon */}
              <Quote size={28} className="text-primary/40 mb-5 flex-shrink-0" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(t.stars)].map((_, si) => (
                  <Star key={si} size={13} className="text-amber-400 fill-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-slate-300 text-[0.9rem] leading-[1.85] flex-1 mb-6 italic">
                "{t.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-white/[0.06]">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-xs font-700 flex-shrink-0`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-display font-600 text-white text-sm">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role} · {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
