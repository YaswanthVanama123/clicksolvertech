import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building2,
  FileText,
  Boxes,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Calculator,
  ClipboardList,
  Truck,
  WifiOff,
} from 'lucide-react';
import MobilePillTabs from './MobilePillTabs';

const builtForFranchise = [
  {
    icon: FileText,
    name: 'Sales & Pricing Platform',
    sub: 'Salesform — Enviromaster NoVA',
    desc: 'Customer proposals, dynamic service pricing, profitability calculations, and automated PDF quotation generation with branded LaTeX templates.',
    bullets: ['Dynamic pricing rules', 'Auto PDF quotations', 'Sales workflow automation'],
    href: '/projects/enviromaster',
    accent: 'text-cyan-400',
    badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
    gradient: 'from-cyan-500/20 to-blue-500/10',
  },
  {
    icon: Boxes,
    name: 'Inventory Management System',
    sub: 'Stock ops & reconciliation',
    desc: 'Real-time stock checkout, reconciliation, quantity discrepancy handling, and delivery tracking — with Playwright automation for repetitive checks.',
    bullets: ['Real-time stock', 'Discrepancy workflow', 'Playwright automation'],
    href: '/projects/inventory-management',
    accent: 'text-violet-400',
    badge: 'bg-violet-500/10 text-violet-300 border-violet-500/25',
    gradient: 'from-violet-500/20 to-purple-500/10',
  },
  {
    icon: Smartphone,
    name: 'Inventory & Sales Mobile App',
    sub: 'React Native field app',
    desc: 'Mobile inventory operations and on-site sales entry for field teams. Stock checkouts, delivery confirmations, sales capture — with offline-friendly forms that sync the moment connectivity returns.',
    bullets: ['Mobile inventory ops', 'Field sales entry', 'Offline-friendly'],
    href: '/projects/salesform-mobile',
    accent: 'text-amber-400',
    badge: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    gradient: 'from-amber-500/20 to-orange-500/10',
  },
];

const whyOtherOwners = [
  { icon: Calculator, title: 'We already know your pricing model', desc: 'Service frequency tiers, profitability rules, customer types — we\'ve modeled them in production.' },
  { icon: ClipboardList, title: 'We know the proposal workflow', desc: 'From customer entry to signed agreement, every step already lives in our codebase.' },
  { icon: Truck, title: 'We know the delivery & inventory loops', desc: 'Stock checkout, reconciliation, route handoffs — built and battle-tested for daily ops.' },
  { icon: WifiOff, title: 'We know the field-team reality', desc: 'Patchy connectivity, gloved hands, fast turnaround — our mobile app is built for it.' },
];

export default function EnviromasterSpotlight() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="enviromaster"
      ref={ref}
      className="py-12 sm:py-16 md:py-24 lg:py-28 relative overflow-hidden"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/[0.03] to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-cyan-500/[0.05] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex justify-center mb-5">
            <span className="section-badge">
              <Building2 size={12} className="text-cyan-400" />
              Built For Enviromaster Franchises
            </span>
          </div>
          <h2 className="section-title mb-5">
            The Engineering Team Behind{' '}
            <span className="gradient-text bg-[length:200%_200%] animate-gradient-x">
              Enviromaster Northern Virginia
            </span>
          </h2>
          <p className="section-desc mx-auto">
            We built the full operations stack for Jeffrey Bolden's Enviromaster
            franchise — pricing, proposals, inventory, and field-team mobile —
            and we're ready to do the same for yours.
          </p>
        </motion.div>

        {/* Three projects we built */}
        {/* Mobile: pill tabs */}
        <MobilePillTabs
          ariaLabel="Projects we built for Enviromaster Northern Virginia"
          className="mb-12"
          tabs={builtForFranchise.map((p) => ({
            id: p.name,
            label: p.name.replace(' & ', ' / ').replace(' System', '').replace(' App', ''),
            icon: p.icon,
          }))}
          renderPanel={(tab) => {
            const idx = builtForFranchise.findIndex((p) => p.name === tab.id);
            const p = builtForFranchise[idx];
            return <FranchiseCard p={p} index={idx} inView />;
          }}
        />

        {/* Desktop: 3-col grid */}
        <div className="hidden lg:grid grid-cols-3 gap-5 mb-16">
          {builtForFranchise.map((p, i) => (
            <FranchiseCard key={p.name} p={p} index={i} inView={inView} />
          ))}
        </div>

        {/* Why other Enviromaster owners should pick us */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative glass-card rounded-2xl sm:rounded-3xl p-5 sm:p-10 lg:p-14 overflow-hidden border border-white/[0.08]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.06] via-blue-500/[0.04] to-violet-500/[0.04] pointer-events-none" />
          <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-cyan-500/[0.08] rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles size={14} className="text-cyan-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                For Enviromaster Franchise Owners
              </span>
            </div>
            <h3 className="font-display font-[800] text-white text-2xl sm:text-3xl tracking-tight leading-[1.15] mb-5 max-w-3xl">
              Skip the 12-month learning curve. <br className="hidden sm:block" />
              <span className="gradient-text bg-[length:200%_200%] animate-gradient-x">
                We already know your business.
              </span>
            </h3>
            <p className="text-slate-300 text-[0.95rem] leading-[1.75] max-w-2xl mb-8">
              Other agencies will spend months learning the Enviromaster pricing
              model, sales workflow, and field-ops patterns — at your expense.
              We've shipped all of it to production for Northern Virginia. You
              get a head start, and so does your bottom line.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-9">
              {whyOtherOwners.map((w, i) => (
                <motion.div
                  key={w.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                  className="flex gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center flex-shrink-0">
                    <w.icon size={16} className="text-cyan-300" />
                  </div>
                  <div>
                    <h4 className="font-display font-600 text-white text-sm mb-1">{w.title}</h4>
                    <p className="text-slate-400 text-xs leading-[1.7]">{w.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <a
                href="#contact"
                className="btn-primary inline-flex items-center justify-center gap-2 text-sm"
              >
                Talk to Us About Your Franchise
                <ArrowRight size={15} />
              </a>
              <a
                href="mailto:hanithavanama@clicksolvertech.com"
                className="btn-ghost inline-flex items-center justify-center gap-2 text-sm"
              >
                Email the founder direct
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

type FranchiseCardData = (typeof builtForFranchise)[number];

function FranchiseCard({ p, index, inView }: { p: FranchiseCardData; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.15 + index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link
        to={p.href}
        className={`relative glass-card rounded-2xl p-5 sm:p-7 group block h-full bg-gradient-to-br ${p.gradient} hover:border-white/[0.18] active:scale-[0.99] transition-all overflow-hidden`}
      >
        <div className="flex items-start justify-between mb-5">
          <div className="card-icon-wrap transition-transform group-hover:scale-110 group-hover:-rotate-3">
            <p.icon size={20} className={p.accent} />
          </div>
          <span className={`text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full border ${p.badge}`}>
            Live
          </span>
        </div>
        <h3 className="font-display font-700 text-white text-[1.05rem] mb-1">
          {p.name}
        </h3>
        <p className={`text-xs font-medium mb-4 ${p.accent}`}>{p.sub}</p>
        <p className="text-slate-400 text-sm leading-[1.75] mb-5">{p.desc}</p>

        <ul className="space-y-2 mb-5">
          {p.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle2 size={13} className={`flex-shrink-0 ${p.accent}`} />
              {b}
            </li>
          ))}
        </ul>

        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold pt-4 border-t border-white/[0.06] w-full ${p.accent}`}>
          View Case Study
          <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.div>
  );
}
