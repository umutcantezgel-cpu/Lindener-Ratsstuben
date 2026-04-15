import { cn } from '@/lib/utils';

interface DividerProps {
  /** Visual direction of the divider */
  orientation?: 'horizontal' | 'vertical';
  /** Spacing around the divider */
  spacing?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

const spacingMap = {
  horizontal: { sm: 'my-2', md: 'my-4', lg: 'my-8' },
  vertical: { sm: 'mx-2', md: 'mx-4', lg: 'mx-8' },
} as const;

/**
 * Visual separator component for content segmentation.
 * Uses project theme tokens for consistent styling.
 */
export function Divider({
  orientation = 'horizontal',
  spacing = 'md',
  className,
}: DividerProps) {
  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        isHorizontal
          ? 'h-px w-full bg-border'
          : 'w-px h-full bg-border',
        spacingMap[orientation][spacing],
        className
      )}
    />
  );
}
