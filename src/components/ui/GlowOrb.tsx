import { cn } from '@/lib/cn';

type Props = {
  position?: string;
  size?: string;
  color?: string;
  blur?: string;
  className?: string;
};

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
