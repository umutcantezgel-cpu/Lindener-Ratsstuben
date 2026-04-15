import React from 'react';
import { cn } from '@/lib/utils';
import { type TypographyVariant } from '@/styles/tokens/typography';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: React.ElementType;
  weight?: 'regular' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  maxWidth?: string;
  margin?: 'none' | 'default';
}

const variantStyles: Record<TypographyVariant, string> = {
  display: 'text-display leading-display tracking-display font-display',
  h1: 'text-h1 leading-h1 tracking-h1 font-display',
  h2: 'text-h2 leading-h2 tracking-h2 font-display',
  h3: 'text-h3 leading-h3 tracking-h3 font-display',
  h4: 'text-h4 leading-h4 tracking-h4 font-display',
  body: 'text-body leading-body tracking-body font-sans',
  lead: 'text-lead leading-lead tracking-lead font-sans',
  small: 'text-small leading-small tracking-small font-sans',
  tiny: 'text-tiny leading-tiny tracking-tiny font-sans',
};

const defaultTags: Record<TypographyVariant, React.ElementType> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  body: 'p',
  lead: 'p',
  small: 'small',
  tiny: 'small',
};

const defaultWeights: Record<TypographyVariant, string> = {
  display: 'font-bold',
  h1: 'font-bold',
  h2: 'font-bold',
  h3: 'font-bold',
  h4: 'font-semibold',
  body: 'font-normal',
  lead: 'font-normal',
  small: 'font-normal',
  tiny: 'font-normal',
};

const weightMap = {
  regular: 'font-normal',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const alignMap = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const defaultMaxWidths: Record<TypographyVariant, string> = {
  display: 'max-w-[20ch]',
  h1: 'max-w-[65ch]',
  h2: 'max-w-[65ch]',
  h3: 'max-w-[65ch]',
  h4: 'max-w-[65ch]',
  body: 'max-w-[65ch]',
  lead: 'max-w-[75ch]',
  small: 'max-w-[65ch]',
  tiny: 'max-w-[65ch]',
};

export function Typography({
  variant = 'body',
  as,
  weight,
  align,
  maxWidth,
  margin = 'default',
  className,
  children,
  style,
  ...props
}: TypographyProps) {
  const Component = as || defaultTags[variant];

  // 4:1 Vertical Rhythm (Asymmetric Margins) for Headings
  const isHeading = ['display', 'h1', 'h2', 'h3', 'h4'].includes(variant);
  const addMargin = margin === 'default';

  const marginClasses = addMargin
    ? isHeading
      ? 'mt-16 mb-4' // 64px top, 16px bottom equivalent
      : 'mb-6' // 24px bottom
    : '';

  return (
    <Component
      className={cn(
        variantStyles[variant],
        weight ? weightMap[weight] : defaultWeights[variant],
        align && alignMap[align],
        marginClasses,
        className
      )}
      style={{
        ...style,
        ...(maxWidth ? { maxWidth } : { maxWidth: defaultMaxWidths[variant].replace('max-w-[', '').replace(']', '') }),
      }}
      {...props}
    >
      {children}
    </Component>
  );
}
