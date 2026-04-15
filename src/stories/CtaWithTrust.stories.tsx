import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CtaWithTrust } from '@/components/ui/CtaWithTrust';

const meta: Meta<typeof CtaWithTrust> = {
  title: '02-Atoms/CtaWithTrust',
  component: CtaWithTrust,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary'] },
    trustKey: { control: 'select', options: ['form', 'booking', 'default'] },
    actionKey: { control: 'select', options: ['reserve', 'contact', 'call', 'menu', 'gallery', 'privacy'] },
  },
};
export default meta;
type Story = StoryObj<typeof CtaWithTrust>;

export const Primary: Story = {
  args: {
    actionKey: 'reserve',
    variant: 'primary',
    trustKey: 'booking',
    href: '/reservation',
  },
  name: 'Primary – Reservierung',
};

export const Secondary: Story = {
  args: {
    actionKey: 'menu',
    variant: 'secondary',
    trustKey: 'default',
    href: '/menu',
  },
  name: 'Secondary – Speisekarte',
};

export const ContactSubmit: Story = {
  args: {
    actionKey: 'contact',
    variant: 'primary',
    trustKey: 'form',
    isSubmit: true,
  },
  name: 'Submit – Kontaktformular',
};

export const CustomText: Story = {
  args: {
    customText: 'Individuelle Aktion',
    variant: 'primary',
    trustKey: 'default',
    href: '#',
  },
};
