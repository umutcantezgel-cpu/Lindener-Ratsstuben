import { cn } from '@/lib/utils';

interface SpinnerProps {
  /** Size of the spinner */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

const sizeMap = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-[3px]',
  lg: 'w-10 h-10 border-4',
} as const;

/**
 * Rotating loading spinner.
 * Uses project primary color for the accent arc.
 */
export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Wird geladen"
      className={cn(
        'inline-block animate-spin rounded-full border-border border-t-primary',
        sizeMap[size],
        className
      )}
    >
      <span className="sr-only">Wird geladen...</span>
    </div>
  );
}
