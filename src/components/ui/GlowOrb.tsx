import { cn } from '@/lib/cn';

type Props = {
  /** Tailwind position classes — e.g. "top-0 left-1/2 -translate-x-1/2" */
  position?: string;
  /** Width / height as Tailwind sizing — accepts arbitrary values like "w-[800px] h-[400px]" */
  size?: string;
  /** Tailwind background color class — e.g. "bg-primary/[0.04]" */
  color?: string;
  /** Tailwind blur class — e.g. "blur-[100px]" */
  blur?: string;
  /** Extra classes (rare) */
  className?: string;
};

/**
 * Decorative blurred glow orb used in section backdrops.
 * Replaces the dozen-plus inline `<div className="absolute ... rounded-full blur-..." />`
 * blocks that were copy-pasted across sections.
 *
 *   <GlowOrb position="top-0 left-1/2 -translate-x-1/2" size="w-[800px] h-[400px]" />
 *   <GlowOrb position="bottom-0 right-0" size="w-[400px] h-[400px]" color="bg-cyan-500/[0.06]" />
 */
export default function GlowOrb({
  position = 'top-0 left-1/2 -translate-x-1/2',
  size = 'w-[600px] h-[400px]',
  color = 'bg-primary/[0.04]',
  blur = 'blur-[100px]',
  className,
}: Props) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute rounded-full',
        position,
        size,
        color,
        blur,
        className,
      )}
    />
  );
}
