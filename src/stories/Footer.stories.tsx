import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Footer } from '@/components/layout/Footer';

const meta: Meta<typeof Footer> = {
  title: '04-Organisms/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
  },
};
export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  name: 'Footer – Default',
};
