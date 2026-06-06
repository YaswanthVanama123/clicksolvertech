import { useRef, useState, useEffect, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
  /** Children rendered as carousel items. Each becomes one snapping card. */
  children: ReactNode;
  ariaLabel?: string;
  /** Width of each card on mobile. Default: 82vw on phone, 55vw at sm. */
  itemClassName?: string;
  /** Header label shown next to the paddles, e.g. "Pipeline". Optional. */
  title?: string;
  className?: string;
};

/**
 * Mobile-first horizontal carousel. Renders ONLY on mobile (`lg:hidden`).
 * Pair it with a hidden-on-mobile desktop grid to get full responsive behavior:
 *
 *   <MobileCarousel>{cards}</MobileCarousel>
 *   <div className="hidden lg:grid grid-cols-4 gap-4">{cards}</div>
 *
 * Features:
 *  - CSS scroll-snap for native-feeling swipes
 *  - Left/right paddle buttons that disable at the edges
 *  - Active dot indicator (the active dot grows wide)
 *  - Hidden scrollbar
 */
export default function MobileCarousel({
  children,
  ariaLabel,
  itemClassName = 'w-[82vw] sm:w-[55vw]',
  title,
  className = '',
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  // Normalize children into an array so we can render dots and detect count.
  const items = Array.isArray(children) ? children : [children];

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-carousel-item]');
    if (!card) return;
    const gap = 16;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' });
  };

  const scrollToIndex = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelectorAll<HTMLElement>('[data-carousel-item]')[i];
    if (!card) return;
    const offset = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
    el.scrollTo({ left: offset, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => {
      setCanPrev(el.scrollLeft > 4);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);

      const center = el.scrollLeft + el.clientWidth / 2;
      const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-carousel-item]'));
      let bestIndex = 0;
      let bestDistance = Infinity;
      cards.forEach((c, i) => {
        const cardCenter = c.offsetLeft + c.offsetWidth / 2;
        const dist = Math.abs(cardCenter - center);
        if (dist < bestDistance) {
          bestDistance = dist;
          bestIndex = i;
        }
      });
      setActive(bestIndex);
    };

    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      className={`lg:hidden ${className}`}
      role="region"
      aria-label={ariaLabel ?? title ?? 'Card carousel'}
    >
      {/* Paddle nav row */}
      <div className="flex items-center justify-between gap-3 mb-4 px-1">
        {title ? (
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
            {title}
          </span>
        ) : (
          <span className="text-[11px] text-slate-500">
            Swipe — {active + 1} / {items.length}
          </span>
        )}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous"
            disabled={!canPrev}
            onClick={() => scrollByCard(-1)}
            className="w-9 h-9 rounded-full glass border border-white/[0.1] flex items-center justify-center text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Next"
            disabled={!canNext}
            onClick={() => scrollByCard(1)}
            className="w-9 h-9 rounded-full glass border border-white/[0.1] flex items-center justify-center text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Scroller — content fades to transparent at the page edges via mask. */}
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-5 sm:-mx-8 px-5 sm:px-8 pb-4 [&::-webkit-scrollbar]:hidden"
        style={{
          scrollbarWidth: 'none',
          maskImage:
            'linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0, black 24px, black calc(100% - 24px), transparent 100%)',
        }}
      >
        {items.map((child, i) => (
          <div
            key={i}
            data-carousel-item
            className={`snap-center flex-shrink-0 ${itemClassName}`}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Dot indicators */}
      {items.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active
                  ? 'bg-primary-light w-6'
                  : 'bg-white/[0.15] w-1.5 hover:bg-white/[0.3]'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
