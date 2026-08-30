import { type ReactNode } from 'react';
import { cn } from '@/lib/cn';
import MobileCarousel from './MobileCarousel';

type Props<T> = {
  items: T[];
  renderCard: (item: T, index: number) => ReactNode;
  getKey?: (item: T, index: number) => string | number;

  carouselTitle?: string;
  carouselAriaLabel?: string;
  carouselItemClassName?: string;
  noAutoplay?: boolean;

  desktopGridClass?: string;
  desktopGapClass?: string;
  desktopBreakpoint?: 'md' | 'lg';
};

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

      <div className={cn(desktopGridVisibility, desktopGridClass, desktopGapClass)}>
        {items.map((item, i) => (
          <div key={getKey(item, i)}>{renderCard(item, i)}</div>
        ))}
      </div>
    </>
  );
}
