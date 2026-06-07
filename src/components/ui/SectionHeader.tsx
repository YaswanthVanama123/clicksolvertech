import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { fadeUp, inViewOnce } from '@/lib/motion';

type Props = {
  /** Pill text shown above the title, e.g. "What We Do" */
  badge?: string;
  /** Optional icon for the badge */
  badgeIcon?: LucideIcon;
  /** Optional accent class for the badge icon (e.g. "text-cyan-400") */
  badgeIconClass?: string;
  /** The main title — pass as a string OR a fragment if part of it should be gradient */
  title: ReactNode;
  /** Optional gradient-highlighted suffix for the title (animated gradient) */
  accent?: string;
  /** Subtitle / description below the title */
  description?: ReactNode;
  /** Alignment of the header block */
  align?: 'center' | 'left';
  className?: string;
};

/**
 * The canonical section header used across the site.
 * Replaces the badge + title + desc block that was duplicated in every section.
 *
 *   <SectionHeader
 *     badge="FAQ"
 *     badgeIcon={MessageCircleQuestion}
 *     title="Questions?"
 *     accent="Answers."
 *     description="The questions every founder asks before hiring..."
 *   />
 */
export default function SectionHeader({
  badge,
  badgeIcon: BadgeIcon,
  badgeIconClass,
  title,
  accent,
  description,
  align = 'center',
  className,
}: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={inViewOnce}
      variants={fadeUp}
      className={cn(
        'mb-10 sm:mb-14',
        align === 'center' ? 'text-center' : 'text-left',
        className,
      )}
    >
      {badge && (
        <div className={cn('mb-5 flex', align === 'center' ? 'justify-center' : 'justify-start')}>
          <span className="section-badge">
            {BadgeIcon && <BadgeIcon size={12} className={badgeIconClass} />}
            {badge}
          </span>
        </div>
      )}

      <h2 className="section-title mb-4">
        {title}
        {accent && (
          <>
            {' '}
            <span className="gradient-text animate-gradient-x bg-[length:200%_200%]">
              {accent}
            </span>
          </>
        )}
      </h2>

      {description && (
        <p className={cn('section-desc', align === 'center' && 'mx-auto')}>{description}</p>
      )}
    </motion.div>
  );
}
