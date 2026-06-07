import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import MobileCarousel from './MobileCarousel';

type Props<T> = {
  /** Items to render */
  items: T[];
  /** Renders one card given an item + index. The same renderer is used for mobile + desktop. */
  renderCard: (item: T, index: number) => ReactNode;
  /** Stable key for each item — defaults to index */
  getKey?: (item: T, index: number) => string | number;

  /** Mobile carousel options */
  carouselTitle?: string;
  carouselAriaLabel?: string;
  carouselItemClassName?: string;
  /** Disable autoplay on the carousel */
  noAutoplay?: boolean;

  /** Desktop grid columns config (Tailwind class). Default: "md:grid-cols-2 lg:grid-cols-3" */
  desktopGridClass?: string;
  /** Desktop grid gap (Tailwind class). Default: "gap-5" */
  desktopGapClass?: string;
  /** Tailwind breakpoint at which the desktop grid takes over from the carousel.
   *  Use "md" for content-light cards (Services, Portfolio), "lg" for richer cards (Spotlight). */
  desktopBreakpoint?: 'md' | 'lg';
};

/**
 * Renders the same card list as a swipe-carousel on mobile and a grid on desktop.
 *
 * Replaces the duplicated pair (one `MobileCarousel`, one `<div className="hidden lg:grid ...">`)
 * that previously appeared in Portfolio, Services, EnviromasterSpotlight, Testimonials,
 * and EngineeringPractices.
 *
 *   <ResponsiveCards
 *     items={projects}
 *     getKey={(p) => p.id}
 *     carouselTitle={`Work · ${projects.length} projects`}
 *     desktopGridClass="md:grid-cols-2 xl:grid-cols-3"
 *     renderCard={(p, i) => <ProjectCard proj={p} delay={i * 0.1} />}
 *   />
 */
export default function ResponsiveCards<T>({
  items,
  renderCard,
  getKey = (_item, i) => i,
  carouselTitle,
  carouselAriaLabel,
  carouselItemClassName,
  noAutoplay,
  desktopGridClass = 'md:grid-cols-2 lg:grid-cols-3',
  desktopGapClass = 'gap-5',
  desktopBreakpoint = 'lg',
}: Props<T>) {
  const desktopGridVisibility =
    desktopBreakpoint === 'md' ? 'hidden md:grid' : 'hidden lg:grid';

  return (
    <>
      {/* Mobile / tablet: swipe carousel */}
      <MobileCarousel
        title={carouselTitle}
        ariaLabel={carouselAriaLabel}
        itemClassName={carouselItemClassName}
        autoplay={!noAutoplay}
      >
        {items.map((item, i) => (
          <div key={getKey(item, i)} className="h-full">
            {renderCard(item, i)}
          </div>
        ))}
      </MobileCarousel>

      {/* Desktop: grid */}
      <div className={cn(desktopGridVisibility, desktopGridClass, desktopGapClass)}>
        {items.map((item, i) => (
          <div key={getKey(item, i)}>{renderCard(item, i)}</div>
        ))}
      </div>
    </>
  );
}
