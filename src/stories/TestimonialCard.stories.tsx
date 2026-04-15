import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TestimonialCard } from '@/components/cards/TestimonialCard';

const meta: Meta<typeof TestimonialCard> = {
  title: '02-Atoms/TestimonialCard',
  component: TestimonialCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof TestimonialCard>;

export const FiveStar: Story = {
  args: {
    testimonial: {
      id: '1' as unknown as import('@/types').Id,
      name: 'Maria S.',
      quote: 'Fantastisches Essen und ein wundervoller Service. Die Atmosphäre ist einladend und gemütlich. Wir kommen definitiv wieder!',
      rating: 5,
      source: 'Google Reviews',
      date: 'Vor 2 Wochen',
    },
  },
};

export const FourStar: Story = {
  args: {
    testimonial: {
      id: '2' as unknown as import('@/types').Id,
      name: 'Thomas K.',
      quote: 'Sehr gutes Essen, die Wartezeit war etwas länger als erwartet, aber das Ergebnis hat sich gelohnt.',
      rating: 4,
      source: 'TripAdvisor',
      date: 'Vor 1 Monat',
    },
  },
};
