import React from 'react';
import { PageTransition } from '@/components/effects/PageTransition';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Datenschutz - Lindener Ratsstuben",
  description: "Datenschutzerklärung der Lindener Ratsstuben. Ihre Daten sind bei uns sicher - erfahren Sie, wie wir Ihre Daten verarbeiten und schützen.",
  alternates: {
    canonical: "/datenschutz",
  },
  robots: {
    index: false,
    follow: true,
  }
};


const Datenschutz = () => {
    return (
        <PageTransition>
            
            <div className="pt-24 pb-20 min-h-screen bg-bg-beige">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-white bg-brand-header px-8 py-5 rounded-2xl uppercase tracking-widest mb-8 shadow-warm inline-block w-full max-w-3xl">Datenschutzerklärung</h1>
                    <div className="prose prose-lg text-text-secondary">
                        <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">Verantwortlicher</h2>
                        <p>Diese Website wird von Lindener Ratsstuben, Konrad-Adenauer-Straße 26, 35440 Linden, Germany, hasantoker38@hotmail.de (nachfolgend „wir“ oder „uns“) betrieben.</p>
                        <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">1. Datenschutz auf einen Blick</h2>
                        <h3 className="text-xl font-bold text-text-main mt-6 mb-3">Allgemeine Hinweise</h3>
                        <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
                        <h3 className="text-xl font-bold text-text-main mt-6 mb-3">Datenerfassung auf dieser Website</h3>
                        <h4 className="text-lg font-bold text-text-main mt-4 mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
                        <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>
                        <h4 className="text-lg font-bold text-text-main mt-4 mb-2">Wie erfassen wir Ihre Daten?</h4>
                        <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.</p>
                        <p>Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).</p>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Datenschutz;
