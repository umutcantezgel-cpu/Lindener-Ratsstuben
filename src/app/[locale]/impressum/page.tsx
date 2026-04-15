import React from 'react';
import { PageTransition } from '@/components/effects/PageTransition';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Impressum - Lindener Ratsstuben",
  description: "Impressum der Lindener Ratsstuben. Angaben gemäß § 5 TMG sowie Kontaktinformationen für geschäftliche Anfragen.",
  alternates: {
    canonical: "/impressum",
  },
  robots: {
    index: false,
    follow: true,
  }
};


const Impressum = () => {
    return (
        <PageTransition>
            
            <div className="pt-24 pb-20 min-h-screen bg-bg-beige">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-surface bg-brand-header px-8 py-5 rounded-2xl uppercase tracking-widest mb-8 shadow-warm inline-block w-full max-w-3xl">Impressum</h1>
                    <div className="prose prose-lg text-text-secondary">
                        <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">Angaben gemäß § 5 TMG</h2>
                        <p>
                            Hasan Toker<br />
                            Konrad-Adenauer-Straße 26<br />
                            35440 Linden<br />
                            Deutschland
                        </p>
                        <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">Kontakt</h2>
                        <p>
                            Telefon: +49640364556<br />
                            E-Mail: hasantoker38@hotmail.de
                        </p>
                        <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">Streitschlichtung</h2>
                        <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr.<br /> Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
                        <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Impressum;
