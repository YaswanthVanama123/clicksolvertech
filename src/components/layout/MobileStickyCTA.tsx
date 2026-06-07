import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, type LucideIcon, Workflow, Building2, Sparkles } from 'lucide-react';

type ContextualAction = {
  /** id of a section element on the page */
  sectionId: string;
  label: string;
  icon?: LucideIcon;
  /** anchor target (defaults to #contact) */
  href?: string;
};

/**
 * Contextual CTAs — when one of these sections is the most-visible section in
 * the viewport, the pill swaps to its label. Otherwise the default pill shows.
 */
const contextual: ContextualAction[] = [
  {
    sectionId: 'enviromaster',
    label: 'Franchise owner? Let\'s talk',
    icon: Building2,
  },
  {
    sectionId: 'how-we-ship',
    label: 'Book a pipeline walkthrough',
    icon: Workflow,
  },
];

const HIDE_OVER = ['contact']; // don't show when these sections are in view

/**
 * Apple-style floating action pill, mobile only.
 * Sits at the bottom of the viewport once the user scrolls past the hero,
 * and changes its label based on which section is currently most visible.
 */
export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Show once the hero is mostly out of view (≈ 70vh scrolled)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track which contextual / hide section is currently most visible
  useEffect(() => {
    const ids = [...contextual.map((c) => c.sectionId), ...HIDE_OVER];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    let current: { id: string; ratio: number } | null = null;

    const obs = new IntersectionObserver(
      (entries) => {
        // Update each entry's ratio in our running map
        entries.forEach((entry) => {
          if (!current || entry.intersectionRatio > current.ratio) {
            if (entry.isIntersecting) {
              current = { id: entry.target.id, ratio: entry.intersectionRatio };
            }
          }
          if (current && entry.target.id === current.id && !entry.isIntersecting) {
            current = null;
          }
        });
        setActiveId(current?.id ?? null);
      },
      { threshold: [0.25, 0.5, 0.75] },
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const isHidden = activeId !== null && HIDE_OVER.includes(activeId);
  const ctx = contextual.find((c) => c.sectionId === activeId);

  const label = ctx?.label ?? 'Start a Project';
  const Icon = ctx?.icon ?? Sparkles;
  const href = ctx?.href ?? '#contact';

  const show = visible && !isHidden;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed left-0 right-0 z-40 lg:hidden flex justify-center pointer-events-none"
          style={{ bottom: 'max(16px, env(safe-area-inset-bottom))' }}
        >
          <a
            href={href}
            className="pointer-events-auto inline-flex items-center gap-3 pl-5 pr-2 py-2 rounded-full shadow-card border border-white/[0.08] active:scale-95 transition-transform"
            style={{
              background: 'rgba(8, 8, 20, 0.92)',
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            }}
          >
            <span className="inline-flex items-center gap-2 text-white text-sm font-display font-600 tracking-tight whitespace-nowrap">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                  className="inline-flex items-center gap-2"
                >
                  <Icon size={14} className="text-primary-light flex-shrink-0" />
                  {label}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="w-9 h-9 rounded-full bg-gradient-primary flex items-center justify-center shadow-button flex-shrink-0">
              <ArrowRight size={15} className="text-white" />
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
