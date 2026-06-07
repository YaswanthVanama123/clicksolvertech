import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

export type Tab = {
  id: string;
  label: string;
  sublabel?: string;
  icon?: LucideIcon;
};

type Props<T extends Tab> = {
  tabs: T[];
  defaultId?: string;
  renderPanel: (tab: T) => ReactNode;
  ariaLabel?: string;
  className?: string;
};

/**
 * Apple-style pill tabs for mobile. Renders a horizontal, scroll-snapping row
 * of rounded pills at the top, with a single animated content panel below.
 *
 * Pattern: select-one-to-view (vs. MobileCarousel which is swipe-through-all).
 *
 * Renders only on mobile/tablet (`lg:hidden`). Pair with a desktop grid:
 *
 *   <MobilePillTabs ... />               // mobile/tablet
 *   <div className="hidden lg:grid ...">  // desktop
 */
export default function MobilePillTabs<T extends Tab>({
  tabs,
  defaultId,
  renderPanel,
  ariaLabel,
  className = '',
}: Props<T>) {
  const [activeId, setActiveId] = useState<string>(defaultId ?? tabs[0]?.id ?? '');
  const railRef = useRef<HTMLDivElement>(null);

  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  // Center the active tab in the rail whenever it changes.
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const tabEl = rail.querySelector<HTMLElement>(`[data-tab-id="${activeId}"]`);
    if (!tabEl) return;
    const offset = tabEl.offsetLeft + tabEl.offsetWidth / 2 - rail.clientWidth / 2;
    rail.scrollTo({ left: Math.max(0, offset), behavior: 'smooth' });
  }, [activeId]);

  if (!active) return null;

  return (
    <div className={`lg:hidden ${className}`} role="region" aria-label={ariaLabel}>
      {/* Pill tab rail — content itself fades at the edges via mask-image,
          so no color overlay is painted over the section. */}
      <div className="relative">
        <div
          ref={railRef}
          role="tablist"
          className="flex gap-2 overflow-x-auto scroll-smooth -mx-5 sm:-mx-8 px-5 sm:px-8 pb-1 [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: 'none',
            maskImage:
              'linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)',
          }}
        >
          {tabs.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                data-tab-id={tab.id}
                onClick={() => setActiveId(tab.id)}
                className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all active:scale-95 ${
                  isActive
                    ? 'bg-white text-bg shadow-button'
                    : 'bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-white'
                }`}
              >
                {tab.icon && <tab.icon size={14} className={isActive ? '' : 'opacity-70'} />}
                <span className="text-left leading-tight whitespace-nowrap">
                  {tab.label}
                  {tab.sublabel && (
                    <span className={`block text-[10px] -mt-0.5 ${isActive ? 'text-bg/60' : 'text-slate-500'}`}>
                      {tab.sublabel}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Animated content panel — outer `layout` smooths height changes between
          panels; `popLayout` lets exit/enter overlap so there's no empty gap. */}
      <motion.div
        layout
        transition={{ layout: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }}
        className="mt-4"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.16 } }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
          >
            {renderPanel(active)}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
