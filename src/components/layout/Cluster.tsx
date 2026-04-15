import React from 'react';
import { cn } from '@/lib/utils';
import { SpacingToken } from '@/styles/tokens/spacing';

export interface ClusterProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  gap?: SpacingToken | 'section' | 'container' | 'gap';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: boolean;
  className?: string;
  children: React.ReactNode;
}

const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
};

export function Cluster({ 
  as: Component = 'div', 
  gap = 4, 
  align = 'center', 
  justify = 'start', 
  wrap = true,
  className, 
  children, 
  style,
  ...props 
}: ClusterProps) {
  return (
    <Component
      className={cn(
        'flex flex-row',
        wrap ? 'flex-wrap' : 'flex-nowrap',
        alignMap[align],
        justifyMap[justify],
        className
      )}
      style={{ ...style, gap: `var(--space-${gap})` }}
      {...props}
    >
      {children}
    </Component>
  );
}
