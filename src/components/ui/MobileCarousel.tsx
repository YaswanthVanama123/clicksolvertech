import { useRef, useState, useEffect, useCallback, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

type Props = {
  children: ReactNode;
  ariaLabel?: string;
  itemClassName?: string;
  title?: string;
  className?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
};

export default function MobileCarousel({
  children,
  ariaLabel,
  itemClassName = 'w-[82vw] sm:w-[55vw]',
  title,
  className = '',
  autoplay = true,
  autoplayInterval = 5000,
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [playing, setPlaying] = useState(autoplay);
  const interactingRef = useRef(false);

  const items = Array.isArray(children) ? children : [children];

  const scrollToIndex = useCallback((i: number, behavior: ScrollBehavior = 'smooth') => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>('[data-carousel-item]');
    const card = cards[i];
    if (!card) return;
    const offset = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
    el.scrollTo({ left: Math.max(0, offset), behavior });
  }, []);

  const scrollByCard = useCallback(
    (dir: 1 | -1) => {
      const el = scrollerRef.current;
      if (!el) return;
      const card = el.querySelector<HTMLElement>('[data-carousel-item]');
      if (!card) return;
      const gap = 16;
      el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' });
    },
    [],
  );

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

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const start = () => { interactingRef.current = true; };
    const end = () => {
      setTimeout(() => { interactingRef.current = false; }, 1500);
    };

    el.addEventListener('touchstart', start, { passive: true });
    el.addEventListener('touchend', end, { passive: true });
    el.addEventListener('pointerdown', start);
    el.addEventListener('pointerup', end);
    el.addEventListener('wheel', start, { passive: true });
    return () => {
      el.removeEventListener('touchstart', start);
      el.removeEventListener('touchend', end);
      el.removeEventListener('pointerdown', start);
      el.removeEventListener('pointerup', end);
      el.removeEventListener('wheel', start);
    };
  }, []);

  useEffect(() => {
    if (!playing || items.length <= 1) return;
    const id = setInterval(() => {
      if (interactingRef.current) return;
      const el = scrollerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.bottom > 0 && rect.top < window.innerHeight;
      if (!inView) return;

      const cards = el.querySelectorAll<HTMLElement>('[data-carousel-item]');
      const lastIndex = cards.length - 1;
      const nextIndex = active >= lastIndex ? 0 : active + 1;
      scrollToIndex(nextIndex);
    }, autoplayInterval);
    return () => clearInterval(id);
  }, [playing, items.length, active, autoplayInterval, scrollToIndex]);

  return (
    <div
      className={`lg:hidden ${className}`}
      role="region"
      aria-label={ariaLabel ?? title ?? 'Card carousel'}
      aria-roledescription="carousel"
    >
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
            onClick={() => {
              setPlaying(false);
              scrollByCard(-1);
            }}
            className="w-9 h-9 rounded-full glass border border-white/[0.1] flex items-center justify-center text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            aria-label="Next"
            disabled={!canNext}
            onClick={() => {
              setPlaying(false);
              scrollByCard(1);
            }}
            className="w-9 h-9 rounded-full glass border border-white/[0.1] flex items-center justify-center text-slate-200 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

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
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${items.length}`}
          >
            {child}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="flex items-center justify-center gap-3 mt-2 relative">
          <div className="flex items-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === active ? 'true' : undefined}
                onClick={() => {
                  setPlaying(false);
                  scrollToIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? 'bg-primary-light w-6'
                    : 'bg-white/[0.15] w-1.5 hover:bg-white/[0.3]'
                }`}
              />
            ))}
          </div>

          {autoplay && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? 'Pause carousel' : 'Play carousel'}
              className="absolute right-0 w-7 h-7 rounded-full glass border border-white/[0.1] flex items-center justify-center text-slate-300 hover:text-white active:scale-95 transition"
            >
              {playing ? <Pause size={11} fill="currentColor" /> : <Play size={11} fill="currentColor" className="ml-0.5" />}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
