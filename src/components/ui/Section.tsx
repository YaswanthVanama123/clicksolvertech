import { type ReactNode, type CSSProperties, forwardRef } from 'react';
import { cn } from '@/lib/cn';

type Props = {
  /** Anchor id for in-page navigation, e.g. `services`, `portfolio` */
  id?: string;
  children: ReactNode;
  className?: string;
  /** Extra classes on the inner max-width container */
  containerClassName?: string;
  /** Override the default 7xl max width — e.g. for prose-narrow sections like FAQ */
  maxWidth?: 'prose' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
  /** Render without a max-width inner container (rare — for full-bleed sections like marquees) */
  fullBleed?: boolean;
  style?: CSSProperties;
};

const maxWidthClass: Record<NonNullable<Props['maxWidth']>, string> = {
  prose: 'max-w-3xl',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
};

/**
 * Standard page section. Bakes in the canonical vertical padding ramp,
 * `relative + overflow-hidden` (so decorative orbs can extend safely),
 * and an inner max-width container with the responsive horizontal padding.
 *
 *   <Section id="services">
 *     <SectionHeader badge="What We Do" title="Engineering Across Every Layer" ... />
 *     ...content...
 *   </Section>
 */
const Section = forwardRef<HTMLElement, Props>(function Section(
  {
    id,
    children,
    className,
    containerClassName,
    maxWidth = '7xl',
    fullBleed = false,
    style,
  },
  ref,
) {
  return (
    <section
      ref={ref}
      id={id}
      style={style}
      className={cn(
        'relative overflow-hidden py-12 sm:py-16 md:py-24 lg:py-28',
        className,
      )}
    >
      {fullBleed ? (
        children
      ) : (
        <div
          className={cn(
            maxWidthClass[maxWidth],
            'relative z-10 mx-auto px-5 sm:px-8 lg:px-10',
            containerClassName,
          )}
        >
          {children}
        </div>
      )}
    </section>
  );
});

export default Section;
