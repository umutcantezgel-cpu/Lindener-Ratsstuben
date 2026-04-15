import React from 'react';
import { PageTransition } from '@/components/effects/PageTransition';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "AGB - Lindener Ratsstuben",
  description: "Allgemeine Geschäftsbedingungen der Lindener Ratsstuben. Erfahren Sie mehr über unsere Vertragsbedingungen und Richtlinien.",
  alternates: {
    canonical: "/agb",
  },
  robots: {
    index: false,
    follow: true,
  }
};


const AGB = () => {
    return (
        <PageTransition>
            
            <div className="pt-24 pb-20 min-h-screen bg-bg-beige">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-surface bg-brand-header px-8 py-5 rounded-2xl uppercase tracking-widest mb-8 shadow-warm inline-block w-full max-w-3xl">Allgemeine Geschäftsbedingungen</h1>
                    <div className="prose prose-lg text-text-secondary">
                        <p><strong>1. Geltungsbereich</strong></p>
                        <p>Für die Geschäftsbeziehung zwischen Lindener Ratsstuben (nachfolgend „Anbieter“) und dem Kunden (nachfolgend „Kunde“) gelten ausschließlich die nachfolgenden Allgemeinen Geschäftsbedingungen in ihrer zum Zeitpunkt der Bestellung gültigen Fassung.</p>
                        <p><strong>2. Vertragsschluss</strong></p>
                        <p>Die Präsentation der Speisen und Getränke auf der Website stellt kein rechtlich bindendes Angebot, sondern eine Aufforderung zur Bestellung dar.</p>
                        <p><strong>3. Preise und Zahlung</strong></p>
                        <p>Es gelten die zum Zeitpunkt der Bestellung angegebenen Preise. Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer.</p>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default AGB;
