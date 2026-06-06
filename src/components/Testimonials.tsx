import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote, MessageSquare, MapPin, ArrowRight, ExternalLink } from 'lucide-react';
import { track } from '../lib/analytics';
import MobileCarousel from './MobileCarousel';

const supportingTestimonials = [
  {
    name: 'James Whitfield',
    role: 'CTO',
    company: 'US Environmental Technology',
    quote: 'ClickSolver delivered what three previous vendors couldn\'t. The platform they built handles 200+ sensor stations in real time, hasn\'t gone down once, and the codebase is the cleanest we\'ve ever seen. These guys don\'t just write code — they engineer solutions.',
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
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-24 lg:py-28 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/40 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />

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
              <MessageSquare size={12} />
              Client Voices
            </span>
          </div>
          <h2 className="section-title mb-5">
            Trusted by Real{' '}
            <span className="gradient-text">Business Owners</span>
          </h2>
          <p className="section-desc mx-auto">
            Don't take our word for it. Here's what the founders and operators
            we've shipped production software for say about us.
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

        {/* ── Featured testimonial — Jeffrey Bolden ───────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-14 mb-12 overflow-hidden border border-white/[0.08]"
        >
          {/* Backdrop accents */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.10] via-blue-500/[0.05] to-violet-500/[0.05] pointer-events-none" />
          <div className="absolute -top-32 -right-24 w-[500px] h-[500px] bg-cyan-500/[0.10] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-32 w-[400px] h-[400px] bg-violet-500/[0.08] rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-[1fr_280px] gap-6 lg:gap-14 items-center">
            {/* Quote column — order-2 on mobile so author shows first */}
            <div className="order-2 lg:order-1">
              {/* Featured tag */}
              <div className="flex flex-wrap items-center gap-2 mb-5 sm:mb-6">
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full bg-gradient-primary text-white shadow-button">
                  <Star size={11} fill="currentColor" />
                  Featured Client
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                  <MapPin size={10} />
                  Northern Virginia, USA
                </span>
              </div>

              {/* Big quote */}
              <Quote size={32} className="text-cyan-400/40 mb-4 sm:mb-5 sm:size-[42px]" />
              <blockquote className="font-display font-600 text-white text-base sm:text-2xl lg:text-[1.6rem] leading-[1.55] sm:leading-[1.45] tracking-[-0.01em] mb-6 sm:mb-8">
                "ClickSolver Technologies built our entire operations stack — the
                <span className="gradient-text bg-[length:200%_200%] animate-gradient-x"> Salesform & Pricing platform</span>,
                the <span className="gradient-text bg-[length:200%_200%] animate-gradient-x">Inventory Management system</span>,
                and the <span className="gradient-text bg-[length:200%_200%] animate-gradient-x">Inventory & Sales mobile app</span>
                for our field teams. They understand the Enviromaster business
                inside and out. If you run an Enviromaster franchise, you couldn't
                ask for a better engineering partner."
              </blockquote>

              {/* Stars */}
              <div className="flex items-center gap-1.5 mb-5 sm:mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="text-amber-400 fill-amber-400 sm:size-[17px]" />
                ))}
                <span className="text-white font-600 ml-2 text-sm">5.0</span>
              </div>

              {/* What we built for him */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-6">
                {['Sales & Pricing Platform', 'Inventory Management', 'Inventory & Sales Mobile App'].map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-cyan-200 bg-cyan-500/10 border border-cyan-500/25 rounded-full px-2.5 py-1 sm:px-3 sm:py-1.5"
                  >
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-cyan-400" />
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* Author panel — order-1 on mobile, order-2 on desktop */}
            <div className="order-1 lg:order-2 glass-card rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-cyan-500/[0.06] to-blue-500/[0.04] border border-cyan-500/20">
              {/* Mobile: horizontal layout (avatar left, name right). Desktop: stacked. */}
              <div className="flex lg:flex-col items-start gap-4 lg:gap-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden lg:mb-4 ring-2 ring-cyan-500/30 shadow-button bg-gradient-to-br from-cyan-500 to-blue-600 flex-shrink-0">
                  <img
                    src="/bolden.png"
                    alt="Jeffrey Bolden, Owner of Enviromaster Northern Virginia"
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const el = e.currentTarget;
                      el.style.display = 'none';
                      const parent = el.parentElement;
                      if (parent && !parent.querySelector('[data-fallback]')) {
                        const fallback = document.createElement('div');
                        fallback.dataset.fallback = '1';
                        fallback.className = 'w-full h-full flex items-center justify-center text-white font-display font-700 text-2xl';
                        fallback.textContent = 'JB';
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300 mb-1 lg:mb-2">
                    Owner & Operator
                  </div>
                  <div className="font-display font-700 text-white text-base sm:text-lg lg:mb-1 leading-tight">
                    Jeffrey Bolden
                  </div>
                  <div className="text-slate-400 text-xs sm:text-sm leading-snug lg:mb-4">
                    Owner, Enviromaster of Northern Virginia
                  </div>
                </div>
              </div>

              {/* Live URLs */}
              <div className="space-y-2 mt-4 lg:mt-0 mb-4 pt-4 border-t border-cyan-500/15">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-cyan-300/80 mb-2">
                  Live Production
                </div>
                <a
                  href="https://portal.enviromasternva.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('bolden_live_click', { url: 'portal.enviromasternva.com' })}
                  className="flex items-center justify-between gap-2 text-xs text-slate-300 hover:text-cyan-300 active:text-cyan-200 transition group/link"
                >
                  <span className="truncate font-mono">portal.enviromasternva.com</span>
                  <ExternalLink size={11} className="text-slate-500 group-hover/link:text-cyan-300 transition flex-shrink-0" />
                </a>
                <a
                  href="https://inventory.enviromasternva.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track('bolden_live_click', { url: 'inventory.enviromasternva.com' })}
                  className="flex items-center justify-between gap-2 text-xs text-slate-300 hover:text-cyan-300 transition group/link"
                >
                  <span className="truncate font-mono">inventory.enviromasternva.com</span>
                  <ExternalLink size={11} className="text-slate-500 group-hover/link:text-cyan-300 transition flex-shrink-0" />
                </a>
              </div>

              <a
                href="#enviromaster"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-white transition"
              >
                See what we built
                <ArrowRight size={12} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Supporting testimonials */}
        {/* Mobile: carousel */}
        <MobileCarousel
          ariaLabel="More client testimonials"
          title="More clients · Swipe"
          itemClassName="w-[82vw] sm:w-[60vw]"
        >
          {supportingTestimonials.map((t, i) => (
            <SupportingTestimonialCard key={t.name} t={t} index={i} inView={inView} />
          ))}
        </MobileCarousel>

        {/* Desktop: 3-col grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-5">
          {supportingTestimonials.map((t, i) => (
            <SupportingTestimonialCard key={t.name} t={t} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

type SupportingTestimonial = (typeof supportingTestimonials)[number];

function SupportingTestimonialCard({
  t,
  index,
  inView,
}: {
  t: SupportingTestimonial;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
      className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col h-full"
    >
      <Quote size={22} className="text-primary/40 mb-4 flex-shrink-0" />
      <div className="flex gap-1 mb-3">
        {[...Array(t.stars)].map((_, si) => (
          <Star key={si} size={12} className="text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-slate-300 text-[0.85rem] leading-[1.8] flex-1 mb-5 italic">
        "{t.quote}"
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
        <div
          className={`w-9 h-9 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white text-xs font-700 flex-shrink-0`}
        >
          {t.avatar}
        </div>
        <div className="min-w-0">
          <div className="font-display font-600 text-white text-sm truncate">{t.name}</div>
          <div className="text-xs text-slate-500 truncate">
            {t.role} · {t.company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
