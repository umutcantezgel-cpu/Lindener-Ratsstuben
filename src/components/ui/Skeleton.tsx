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
        'relative overflow-hidden bg-surface/80 border border-border/40',
        circle ? 'rounded-full' : 'rounded-lg',
        className
      )}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    >
      <div 
        className="absolute inset-0 -translate-x-full"
        style={{
          animation: 'shimmer 1.5s infinite linear',
          backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.06) 50%, transparent 100%)'
        }}
      />
    </div>
  );
}
