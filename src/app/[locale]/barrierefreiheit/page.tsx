import React from 'react';
import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';

export const metadata: Metadata = {
    title: 'Erklärung zur Barrierefreiheit',
    description: 'Erfahren Sie mehr über unsere Bemühungen und Maßnahmen zur Barrierefreiheit auf der Website der Lindener Ratsstuben.',
};

export default function Barrierefreiheit() {
    return (
        <Container className="py-24">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-text-primary text-center mb-6">
                Erklärung zur Barrierefreiheit
            </h1>
            <p className="text-xl text-text-secondary text-center max-w-2xl mx-auto mb-16">
                Unser Engagement für eine inklusive und zugängliche Web-Erfahrung für alle Gäste.
            </p>
            <Container className="py-16 md:py-24">
                <div className="prose prose-lg max-w-3xl mx-auto text-text-primary">
                    <h2>Unser Anspruch an Inklusion</h2>
                    <p>
                        Wir sind stets bemüht, unsere Website für jeden zugänglich zu machen, unabhängig von visuellen, auditiven, motorischen oder kognitiven Einschränkungen. Wir orientieren uns dabei an den Richtlinien für barrierefreie Webinhalte (WCAG) 2.1, Level AA, und erfüllen in zentralen Bereichen bereits Standards der Stufe AAA.
                    </p>

                    <h2>Maßnahmen zur Barrierefreiheit</h2>
                    <ul>
                        <li><strong>Kontrastreiche Darstellung:</strong> Alle unsere Texte übertreffen die geforderten Kontrastwerte deutlich, um eine leichte Lesbarkeit zu sichern. Unterstützt wird auch der Windows High-Contrast Mode.</li>
                        <li><strong>Volle Tastaturbedienbarkeit:</strong> Die gesamte Website lässt sich ohne Maus bedienen. Fokussierte Elemente werden durch einen deutlichen, doppelten Ring hervorgehoben.</li>
                        <li><strong>Screenreader-Optimierung:</strong> Wir haben uns auf semantisches HTML fokussiert, ARIA-Attribute für dynamische Inhalte gesetzt und unsere Bilder alle (sofern nicht rein dekorativ) mit aussagekräftigen Textalternativen versehen.</li>
                        <li><strong>Reduzierte Animationen:</strong> Wir respektieren systemweite Einstellungen zur Animationsreduzierung (<code>prefers-reduced-motion</code>).</li>
                        <li><strong>Tastaturkürzel:</strong> Für Power-User haben wir einfache Shortcuts (z.B. &lsquo;/&rsquo; zum Suchen) etabliert.</li>
                    </ul>

                    <h2>Feedback und Kontaktangaben</h2>
                    <p>
                        Die kontinuierliche Verbesserung der Barrierefreiheit ist ein laufender Prozess. Wenn Sie auf Barrieren stoßen oder Verbesserungsvorschläge für unsere Website haben, freuen wir uns über Ihre Rückmeldung.
                    </p>
                    <p>
                        Bitte kontaktieren Sie uns:<br/>
                        Telefon: 06403 2345<br/>
                        E-Mail: kontakt@lindener-ratsstuben.de
                    </p>

                    <p className="text-sm text-text-muted mt-12">
                        Diese Erklärung wurde zuletzt aktualisiert am: {new Date().toLocaleDateString('de-DE')}
                    </p>
                </div>
            </Container>
        </Container>
    );
}
