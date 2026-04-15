import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const containerVariants = cva(
  'mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12',
  {
    variants: {
      variant: {
        narrow: 'max-w-2xl',       // 42rem / 672px
        standard: 'max-w-5xl',     // 64rem / 1024px
        wide: 'max-w-6xl',         // 72rem / 1152px
        xl: 'max-w-7xl',           // 80rem / 1280px
        full: 'max-w-[1440px]',    // Ultra-wide max
      },
    },
    defaultVariants: {
      variant: 'standard',
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, variant, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(containerVariants({ variant, className }))}
        {...props}
      />
    );
  }
);

Container.displayName = 'Container';
