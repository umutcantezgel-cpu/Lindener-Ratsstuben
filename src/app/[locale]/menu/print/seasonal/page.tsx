import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Saisonkarte – Hausgemachte Burger & Limonaden | Lindener Ratsstuben',
  description: 'Saisonale Burger- & Limonaden-Karte der Lindener Ratsstuben. Saftig. Frisch. Genussvoll.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SeasonalMenuPage() {
  // Prevent direct access to the seasonal menu until the CMS integration is complete
  notFound();
}
