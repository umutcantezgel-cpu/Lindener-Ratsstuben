export const spacing = {
  0: 'var(--space-0)', // 0px
  1: 'var(--space-1)', // 4px
  2: 'var(--space-2)', // 8px
  3: 'var(--space-3)', // 12px
  4: 'var(--space-4)', // 16px
  5: 'var(--space-5)', // 20px
  6: 'var(--space-6)', // 24px
  7: 'var(--space-7)', // 32px
  8: 'var(--space-8)', // 40px
  9: 'var(--space-9)', // 48px
  10: 'var(--space-10)', // 64px
  11: 'var(--space-11)', // 80px
  12: 'var(--space-12)', // 96px
  13: 'var(--space-13)', // 128px

  // Fluid Tokens
  section: 'var(--space-section)',
  container: 'var(--space-container)',
  gap: 'var(--space-gap)',
} as const;

export type SpacingToken = keyof typeof spacing;
