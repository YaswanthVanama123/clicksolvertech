import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion, ArrowRight } from 'lucide-react';

type FaqItem = {
  id: string;
  q: string;
  a: string;
};

const faqs: FaqItem[] = [
  {
    id: 'how-quickly-can-you-start',
    q: 'How quickly can you start a new project?',
    a: 'Most engagements kick off within 1–2 weeks of a signed NDA — sooner for urgent work. Discovery and architecture review happen in parallel with contracting, so you don\'t lose a week to paperwork.',
  },
  {
    id: 'do-you-sign-an-nda',
    q: 'Do you sign an NDA before we discuss anything?',
    a: 'Yes — every engagement starts with a mutual NDA before we look at your code, business logic, or any sensitive details. It\'s our default, not an upsell.',
  },
  {
    id: 'who-owns-the-code',
    q: 'Who owns the code we build together?',
    a: 'You do. 100% of the IP transfers to you on payment — source code, design files, deployment configs, infrastructure, and credentials, all in repositories and accounts you control. We never lock work behind our own accounts.',
  },
  {
    id: 'senior-engineers-only',
    q: 'What does "senior engineers only" mean in practice?',
    a: 'Every developer who touches your project has shipped production software at scale. No interns, no offshore juniors, no learning on your dollar. You\'ll know each engineer by name and review their track record before work begins.',
  },
  {
    id: 'how-do-you-charge',
    q: 'How do you charge — fixed bid, hourly, or retainer?',
    a: 'Whichever fits your project: fixed-bid for clearly-scoped builds, time-and-materials for evolving products, and monthly retainer for ongoing partnerships. Pricing is transparent — itemized weekly with no hidden fees.',
  },
  {
    id: 'take-over-existing-codebase',
    q: 'Can you take over a codebase another vendor started?',
    a: 'Yes, and we do it often. We begin with an architecture audit, document the existing system, fix what\'s broken, then move forward on a clean roadmap. Inheriting another vendor\'s codebase is a normal week for us.',
  },
  {
    id: 'time-zones',
    q: 'What time zones do you cover?',
    a: 'We work US Eastern hours and India Standard Time, with daily overlap windows for live calls and demos. Production incidents are covered 24/7 — someone is always on-call once your software is live.',
  },
  {
    id: 'not-happy-with-the-work',
    q: 'What if we\'re not happy with the work?',
    a: 'Every engagement comes with a 30-day post-launch warranty — if something breaks because of how we built it, we fix it free. Friday sprint demos let you course-correct early, before money is spent on the wrong thing.',
  },
  {
    id: 'work-with-in-house-team',
    q: 'Will you work with our in-house team?',
    a: 'Absolutely. Many of our clients have internal engineers — we slot in as architects, mentors, or hands-on builders depending on what\'s needed. We follow your team\'s process, not the other way around.',
  },
  {
    id: 'non-technical-founders',
    q: 'Do you work with non-technical founders?',
    a: 'Yes — most of our clients run businesses, not engineering teams. We translate business requirements into clean architecture, walk you through tradeoffs in plain English, and never use jargon to hide complexity. You\'ll know exactly what\'s being built and why.',
  },
];

export default function Faq() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  // Open the item referenced by the URL hash on mount (deep-linking)
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    if (faqs.some((f) => f.id === hash)) {
      setOpenIds(new Set([hash]));
      // Scroll the matched item into view after layout
      requestAnimationFrame(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }
  }, []);

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        // Update hash so users can copy the URL to a specific Q&A
        history.replaceState(null, '', `#${id}`);
      }
      return next;
    });
  };

  // FAQ schema for Google rich results
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <section
      id="faq"
      ref={ref}
      className="py-12 sm:py-16 md:py-24 lg:py-28 relative overflow-hidden"
    >
      {/* Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <div className="flex justify-center mb-5">
            <span className="section-badge">
              <MessageCircleQuestion size={12} />
              FAQ
            </span>
          </div>
          <h2 className="section-title mb-4">
            Questions?{' '}
            <span className="gradient-text bg-[length:200%_200%] animate-gradient-x">
              Answers.
            </span>
          </h2>
          <p className="section-desc mx-auto">
            The questions every founder asks before hiring an engineering partner —
            answered up front so you don't have to.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="border-t border-white/[0.06]">
          {faqs.map((f, i) => {
            const isOpen = openIds.has(f.id);
            return (
              <motion.div
                key={f.id}
                id={f.id}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.04 }}
                className="border-b border-white/[0.06] scroll-mt-24"
              >
                <button
                  type="button"
                  onClick={() => toggle(f.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${f.id}-panel`}
                  className="w-full flex items-center justify-between gap-5 py-5 sm:py-6 text-left active:opacity-80 transition group"
                >
                  <span className="font-display font-600 text-white text-[1rem] sm:text-[1.1rem] tracking-tight leading-snug">
                    {f.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center border transition-all ${
                      isOpen
                        ? 'bg-gradient-primary border-transparent text-white shadow-button rotate-180'
                        : 'bg-white/[0.04] border-white/[0.1] text-slate-300 group-hover:border-white/[0.2] group-hover:text-white'
                    }`}
                  >
                    <ChevronDown size={15} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`${f.id}-panel`}
                      role="region"
                      key="panel"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { height: 'auto', opacity: 1 },
                        collapsed: { height: 0, opacity: 0 },
                      }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p className="text-slate-300 text-[0.95rem] leading-[1.85] pb-6 sm:pb-7 pr-12 max-w-prose">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still curious CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 glass-card rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/[0.08] bg-gradient-to-br from-primary/[0.06] to-secondary/[0.04]"
        >
          <div>
            <h3 className="font-display font-700 text-white text-base sm:text-lg mb-1">
              Have a question we didn't answer?
            </h3>
            <p className="text-slate-400 text-sm leading-snug">
              Email the founder direct — usually a reply within a few hours.
            </p>
          </div>
          <a
            href="mailto:hanithavanama@clicksolvertech.com"
            className="btn-primary inline-flex items-center justify-center gap-2 text-sm flex-shrink-0"
          >
            Ask the Founder
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
