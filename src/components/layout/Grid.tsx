import React from 'react';
import { cn } from '@/lib/utils';
import { SpacingToken } from '@/styles/tokens/spacing';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  gap?: SpacingToken | 'section' | 'container' | 'gap';
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  minItemWidth?: string;
  className?: string;
  children: React.ReactNode;
}

const colsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  12: 'grid-cols-4 md:grid-cols-8 lg:grid-cols-12',
};

export function Grid({ 
  as: Component = 'div', 
  gap = 4, 
  columns, 
  minItemWidth,
  className, 
  children, 
  style,
  ...props 
}: GridProps) {
  
  const gridStyle: React.CSSProperties = { ...style, gap: `var(--space-${gap})` };
  
  if (minItemWidth) {
    gridStyle.gridTemplateColumns = `repeat(auto-fit, minmax(${minItemWidth}, 1fr))`;
  }
  
  return (
    <Component
      className={cn(
        'grid',
        !minItemWidth && columns ? colsMap[columns] : '',
        className
      )}
      style={gridStyle}
      {...props}
    >
      {children}
    </Component>
  );
}
