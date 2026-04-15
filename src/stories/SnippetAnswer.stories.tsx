import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SnippetAnswer } from '@/components/seo/SnippetAnswer';
import React from 'react';

const meta: Meta<typeof SnippetAnswer> = {
  title: '03-Molecules/SnippetAnswer',
  component: SnippetAnswer,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SnippetAnswer>;

export const Default: Story = {
  args: {
    question: 'Was macht die Lindener Ratsstuben besonders?',
    shortAnswer: 'Die Lindener Ratsstuben vereinen traditionelle italienische und mediterrane Küche mit regionalen Zutaten aus Hannover-Linden. Seit über 25 Jahren servieren wir saisonale Gerichte in einer einladenden, familienfreundlichen Atmosphäre mit persönlichem Service.',
    headingLevel: 'h2',
  },
  name: 'Featured Snippet – Paragraph',
};

export const WithDetail: Story = {
  args: {
    question: 'Welche vegetarischen Optionen bieten die Lindener Ratsstuben?',
    shortAnswer: 'Wir bieten über 48 vegetarische Gerichte, darunter hausgemachten Paneer in Spinat, mediterrane Gemüseplatten und frische Pasta-Variationen. Alle Gerichte werden täglich frisch mit regionalen Zutaten zubereitet.',
    detailedAnswer: (
      <div>
        <p>Unsere vegetarische Karte umfasst unter anderem:</p>
        <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
          <li>Palak Paneer – Hausgemachter Käse in würzigem Spinat</li>
          <li>Mediterrane Gemüseplatte – Saisonales Grillgemüse</li>
          <li>Pasta Primavera – Frische Pasta mit Gartengemüse</li>
        </ul>
      </div>
    ),
    headingLevel: 'h3',
  },
  name: 'Featured Snippet – Mit Details',
};
