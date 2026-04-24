import { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Flyer | Lindener Ratsstuben',
  description: 'Druckbarer Flyer der Lindener Ratsstuben mit Speisekarte und Kontaktdaten.',
  robots: {
    index: false,
    follow: false,
  },
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '600', '700'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '700'],
});

export default function FlyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} ${playfairDisplay.variable}`}>
      {children}
    </div>
  );
}
