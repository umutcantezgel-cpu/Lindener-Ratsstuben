import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { EmptyState } from '@/components/ui/EmptyState';
import { Search } from 'lucide-react';
import React from 'react';

const meta: Meta<typeof EmptyState> = {
  title: '02-Atoms/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    title: 'Nichts gefunden',
    description: 'Es gibt aktuell keine Inhalte in diesem Bereich. Schauen Sie bald wieder vorbei!',
  },
  name: 'Standard',
};

export const WithCustomAction: Story = {
  args: {
    title: 'Keine Suchergebnisse',
    description: 'Ihre Suche ergab keine Treffer. Versuchen Sie einen anderen Suchbegriff.',
    actionText: 'Suche zurücksetzen',
    actionHref: '/menu',
    icon: <Search className="w-12 h-12 text-text-tertiary mb-4" />,
  },
  name: 'Custom Icon & Action',
};
