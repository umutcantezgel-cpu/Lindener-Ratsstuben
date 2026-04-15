import React from 'react';
import { headers } from 'next/headers';
import type { VisitorSegment } from '@/hooks/useVisitorSegment';

type HeroContent = {
  headline: string;
  subheadline: string;
};

const segmentContent: Record<VisitorSegment, HeroContent> = {
  'new-visitor': {
    headline: "Professionelle Webentwicklung für Ihr Geschäft",
    subheadline: "Wir skalieren Ihren digitalen Erfolg mit Next.js."
  },
  'returning-explorer': {
    headline: "Willkommen zurück! Sehen Sie unsere neuen Services",
    subheadline: "Entdecken Sie, wie wir Ihr nächstes Projekt realisieren."
  },
  'service-interested': {
    headline: "Maßgeschneiderte Services — Speziell für Ihr Projekt",
    subheadline: "Lassen Sie uns Ihre Vision in die Realität umsetzen."
  },
  'high-intent': {
    headline: "Starten Sie noch heute. Kostenlose Beratung in 24h",
    subheadline: "Buchen Sie Ihren Termin und lassen Sie uns direkt durchstarten."
  },
  'converted': {
    headline: "Danke für Ihr Vertrauen! Lesen Sie unsere Case Studies",
    subheadline: "Sehen Sie sich ähnliche, erfolgreiche Projekte an."
  },
  'blog-reader': {
    headline: "Insights & Case Studies: Von Strategie zur Realität",
    subheadline: "Vertiefen Sie Ihr Wissen mit unseren aktuellen Artikeln."
  }
};

export function PersonalizedHero() {
  // SSR logic to extract segment from middleware header = 0 FOUC
  const headersList = headers();
  const segmentHeader = headersList.get('x-visitor-segment') as VisitorSegment || 'new-visitor';
  
  // Fallback to new-visitor if somehow invalid
  const content = segmentContent[segmentHeader] || segmentContent['new-visitor'];

  return (
    <section className="w-full py-24 bg-surface text-text-primary text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-bold mb-6 tracking-tight">{content.headline}</h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto">{content.subheadline}</p>
      </div>
    </section>
  );
}
