import React from 'react';
import { cn } from '@/lib/utils';
import { SpacingToken } from '@/styles/tokens/spacing';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  gap?: SpacingToken | 'section' | 'container' | 'gap';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
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

export function Stack({ 
  as: Component = 'div', 
  gap = 4, 
  align = 'stretch', 
  justify = 'start', 
  className, 
  children, 
  style,
  ...props 
}: StackProps) {
  return (
    <Component
      className={cn(
        'flex flex-col',
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
