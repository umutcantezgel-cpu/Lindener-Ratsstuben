import { cn } from '@/lib/utils';

interface SkeletonProps {
  /** Width of the skeleton (CSS value or number for px) */
  width?: string | number;
  /** Height of the skeleton (CSS value or number for px) */
  height?: string | number;
  /** Render as circle instead of rectangle */
  circle?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Animated loading placeholder for content that is not yet available.
 * Uses `animate-pulse` for a subtle breathing effect.
 */
export function Skeleton({
  width,
  height,
  circle = false,
  className,
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-pulse bg-border',
        circle ? 'rounded-full' : 'rounded-lg',
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    />
  );
}
