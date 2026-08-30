import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';
import { fadeUp, inViewOnce } from '@/lib/motion';

type Props = {
  badge?: string;
  badgeIcon?: LucideIcon;
  badgeIconClass?: string;
  title: ReactNode;
  accent?: string;
  description?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
};

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
