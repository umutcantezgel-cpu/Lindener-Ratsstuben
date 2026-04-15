import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ComparisonTable } from '@/components/seo/ComparisonTable';

const meta: Meta<typeof ComparisonTable> = {
  title: '03-Molecules/ComparisonTable',
  component: ComparisonTable,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ComparisonTable>;

export const Default: Story = {
  args: {
    title: 'Warum Lindener Ratsstuben?',
    usName: 'Lindener Ratsstuben',
    competitorName: 'Andere Restaurants',
    features: [
      { feature: 'Frische Zutaten vom Markt', us: true, competitor: false },
      { feature: 'Vegetarische Auswahl', us: '48+ Gerichte', competitor: '5–10 Gerichte' },
      { feature: 'Reservierung online', us: true, competitor: false },
      { feature: 'Familienfreundliche Atmosphäre', us: true, competitor: true },
      { feature: 'Google Bewertung', us: '4.8 ★', competitor: '3.5 ★' },
    ],
  },
  name: 'Restaurant-Vergleich',
};
