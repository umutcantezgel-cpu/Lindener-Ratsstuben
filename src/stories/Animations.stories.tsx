import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AnimateIn } from '@/components/animations/animate-in';
import React from 'react';

const meta: Meta<typeof AnimateIn> = {
  title: '01-Tokens/Animations',
  component: AnimateIn,
  tags: ['autodocs'],
  argTypes: {
    direction: { control: 'select', options: ['up', 'down', 'left', 'right'] },
    delay: { control: { type: 'range', min: 0, max: 1000, step: 50 } },
  },
};
export default meta;
type Story = StoryObj<typeof AnimateIn>;

export const FadeUp: Story = {
  args: {
    direction: 'up',
    delay: 0,
    children: (
      <div style={{ padding: '2rem', background: 'var(--color-bg-secondary)', borderRadius: '12px', textAlign: 'center' }}>
        <h3 style={{ fontWeight: 700 }}>Fade In – Von Unten</h3>
        <p style={{ color: '#718096' }}>Diese Karte fährt von unten ein.</p>
      </div>
    ),
  },
};

export const FadeLeft: Story = {
  args: {
    direction: 'left',
    delay: 200,
    children: (
      <div style={{ padding: '2rem', background: 'var(--color-bg-secondary)', borderRadius: '12px', textAlign: 'center' }}>
        <h3 style={{ fontWeight: 700 }}>Fade In – Von Links</h3>
        <p style={{ color: '#718096' }}>Diese Karte fährt von links ein.</p>
      </div>
    ),
  },
  name: 'Fade Left (mit Delay)',
};
