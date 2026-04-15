import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';

const colorTokens = {
  primary: { label: 'Primary (Rot)', value: 'var(--color-primary)', hex: '#C53030' },
  primaryHover: { label: 'Primary Hover', value: 'var(--color-primary-hover)', hex: '#9B2C2C' },
  accent: { label: 'Accent (Gold)', value: 'var(--color-accent)', hex: '#D69E2E' },
  accentHover: { label: 'Accent Hover', value: 'var(--color-accent-hover)', hex: '#B7791F' },
  bgPrimary: { label: 'BG Primary', value: 'var(--color-bg-primary)', hex: '#FFFDF7' },
  bgSecondary: { label: 'BG Secondary', value: 'var(--color-bg-secondary)', hex: '#FFF5E6' },
  textPrimary: { label: 'Text Primary', value: 'var(--color-text-primary)', hex: '#1A202C' },
  textSecondary: { label: 'Text Secondary', value: 'var(--color-text-secondary)', hex: '#4A5568' },
};

const spacingTokens = [
  { name: 'space-1', value: '0.25rem (4px)' },
  { name: 'space-2', value: '0.5rem (8px)' },
  { name: 'space-3', value: '0.75rem (12px)' },
  { name: 'space-4', value: '1rem (16px)' },
  { name: 'space-6', value: '1.5rem (24px)' },
  { name: 'space-8', value: '2rem (32px)' },
  { name: 'space-10', value: '2.5rem (40px)' },
  { name: 'space-12', value: '3rem (48px)' },
  { name: 'space-16', value: '4rem (64px)' },
  { name: 'space-20', value: '5rem (80px)' },
  { name: 'space-24', value: '6rem (96px)' },
  { name: 'space-32', value: '8rem (128px)' },
];

const typographyTokens = [
  { name: 'Hero', className: 'text-hero font-display font-bold', sample: 'Kulinarische Exzellenz' },
  { name: 'H1', className: 'text-5xl font-display font-bold', sample: 'Überschrift Eins' },
  { name: 'H2', className: 'text-4xl font-display font-bold', sample: 'Überschrift Zwei' },
  { name: 'H3', className: 'text-2xl font-bold', sample: 'Überschrift Drei' },
  { name: 'H4', className: 'text-xl font-bold', sample: 'Überschrift Vier' },
  { name: 'Body Large', className: 'text-lg', sample: 'Dies ist ein Beispieltext für die Körpergröße Large.' },
  { name: 'Body', className: 'text-base', sample: 'Dies ist Standardtext in der regulären Körpergröße.' },
  { name: 'Small', className: 'text-sm', sample: 'Kleiner Text für Nebenbemerkungen.' },
  { name: 'Caption', className: 'text-xs', sample: 'Besonders kleiner Caption-Text.' },
];

function ColorSwatches() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
        🎨 Farbpalette
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {Object.entries(colorTokens).map(([key, token]) => (
          <div key={key} style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={{ backgroundColor: token.hex, height: '80px' }} />
            <div style={{ padding: '0.75rem', background: 'white' }}>
              <strong style={{ fontSize: '0.875rem' }}>{token.label}</strong>
              <div style={{ fontSize: '0.75rem', color: '#718096', marginTop: '0.25rem' }}>{token.hex}</div>
              <code style={{ fontSize: '0.65rem', color: '#A0AEC0' }}>{token.value}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpacingScale() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
        📐 Spacing-Skala
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {spacingTokens.map((token) => (
          <div key={token.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <code style={{ width: '120px', fontSize: '0.75rem', color: '#4A5568' }}>{token.name}</code>
            <div style={{ 
              width: token.value.split('(')[0].trim(),
              height: '24px',
              borderRadius: '4px',
              background: 'linear-gradient(135deg, #C53030, #D69E2E)',
            }} />
            <span style={{ fontSize: '0.75rem', color: '#718096' }}>{token.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypographyScale() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
        🔤 Typografie-Skala
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {typographyTokens.map((token) => (
          <div key={token.name} style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '1rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#A0AEC0', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
              {token.name}
            </div>
            <div className={token.className}>{token.sample}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta = {
  title: '01-Tokens/Design Tokens',
};
export default meta;

export const Colors: StoryObj = {
  render: () => <ColorSwatches />,
  name: 'Farbpalette',
};

export const Spacing: StoryObj = {
  render: () => <SpacingScale />,
  name: 'Spacing-Skala',
};

export const Typography: StoryObj = {
  render: () => <TypographyScale />,
  name: 'Typografie-Skala',
};
