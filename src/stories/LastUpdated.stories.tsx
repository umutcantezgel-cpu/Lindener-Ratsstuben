import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { LastUpdated } from '@/components/seo/LastUpdated';

const meta: Meta<typeof LastUpdated> = {
  title: '02-Atoms/LastUpdated',
  component: LastUpdated,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof LastUpdated>;

export const Default: Story = {
  args: {
    date: '15. März 2024',
  },
  name: 'Zuletzt aktualisiert',
};
