import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Header } from '@/components/layout/Header';

const meta: Meta<typeof Header> = {
  title: '04-Organisms/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: { appDirectory: true },
  },
};
export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  name: 'Desktop – Default',
};
