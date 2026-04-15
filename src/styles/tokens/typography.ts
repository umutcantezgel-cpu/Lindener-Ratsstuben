export type TypographyVariant =
  | 'display'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body'
  | 'lead'
  | 'small'
  | 'tiny';

export interface TypographySpecs {
  fontSize: string;
  lineHeight: number;
  letterSpacing: string;
  maxWidth?: string;
  fontWeight: number;
}

export const typographyConfig: Record<TypographyVariant, TypographySpecs> = {
  display: {
    fontSize: 'clamp(2rem, 5vw + 0.75rem, 4rem)',
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    maxWidth: '20ch',
    fontWeight: 700,
  },
  h1: {
    fontSize: 'clamp(1.5rem, 3vw + 0.75rem, 3rem)',
    lineHeight: 1.2,
    letterSpacing: '-0.015em',
    maxWidth: '65ch',
    fontWeight: 700,
  },
  h2: {
    fontSize: 'clamp(1.25rem, 2.5vw + 0.625rem, 2.25rem)',
    lineHeight: 1.25,
    letterSpacing: '-0.01em',
    maxWidth: '65ch',
    fontWeight: 700,
  },
  h3: {
    fontSize: 'clamp(1.125rem, 2vw + 0.5rem, 1.75rem)',
    lineHeight: 1.3,
    letterSpacing: '-0.005em',
    maxWidth: '65ch',
    fontWeight: 700,
  },
  h4: {
    fontSize: 'clamp(1rem, 1.5vw + 0.5rem, 1.25rem)',
    lineHeight: 1.35,
    letterSpacing: '0',
    maxWidth: '65ch',
    fontWeight: 600,
  },
  body: {
    fontSize: '1rem',
    lineHeight: 1.6,
    letterSpacing: '0',
    maxWidth: '65ch',
    fontWeight: 400,
  },
  lead: {
    fontSize: '1.125rem',
    lineHeight: 1.5,
    letterSpacing: '0',
    maxWidth: '75ch',
    fontWeight: 400,
  },
  small: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
    letterSpacing: '0.01em',
    maxWidth: '65ch',
    fontWeight: 400,
  },
  tiny: {
    fontSize: '0.75rem',
    lineHeight: 1.4,
    letterSpacing: '0.02em',
    maxWidth: '65ch',
    fontWeight: 400,
  },
};
