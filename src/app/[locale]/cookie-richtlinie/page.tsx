import React from 'react';
import Link from 'next/link';
import { PageTransition } from '@/components/effects/PageTransition';
import { companyData } from '@/data/company';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie-Richtlinie',
  description: `Cookie-Richtlinie der ${companyData.companyName}. Erfahren Sie, wie und warum wir Cookies auf unserer Website einsetzen.`,
  alternates: {
    canonical: "/cookie-richtlinie",
  },
  robots: {
    index: false,
    follow: true,
  }
};

export default function CookieRichtlinie() {
  return (
    <PageTransition>
      <div className="pt-24 pb-20 min-h-screen bg-bg-beige">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <header className="mb-12">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-surface bg-brand-header px-8 py-5 rounded-2xl uppercase tracking-widest shadow-warm text-center">
                Cookie-Richtlinie
              </h1>
            </header>

            <article className="prose prose-lg max-w-none text-text-secondary space-y-8">
              <section>
                <h2 className="text-2xl font-display font-bold text-text-main mb-4">1. Was sind Cookies?</h2>
                <p className="leading-relaxed">
                  Cookies sind kleine Textdateien, die von Websites auf Ihrem Computer oder mobilen Gerät
                  gespeichert werden, wenn Sie diese besuchen. Sie dienen dazu, Ihre Präferenzen zu speichern
                  und Ihr Nutzererlebnis zu verbessern. Cookies können von der besuchten Website selbst
                  (First-Party-Cookies) oder von Drittanbietern (Third-Party-Cookies) gesetzt werden.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-text-main mb-4">2. Welche Cookies verwenden wir?</h2>

                <h3 className="text-xl font-display font-bold text-text-main mb-3 mt-6">2.1 Technisch notwendige Cookies</h3>
                <p className="leading-relaxed">
                  Diese Cookies sind für den Betrieb unserer Website unerlässlich. Sie ermöglichen
                  grundlegende Funktionen wie die Navigation auf der Seite und den Zugang zu geschützten
                  Bereichen. Ohne diese Cookies kann die Website nicht ordnungsgemäß funktionieren.
                </p>

                <h3 className="text-xl font-display font-bold text-text-main mb-3 mt-6">2.2 Eingebettete Inhalte</h3>
                <p className="leading-relaxed">
                  Unsere Website bindet Google Maps ein, um Ihnen unseren Standort anzuzeigen. Google kann
                  dabei eigene Cookies setzen. Diese werden für die Kartendarstellung und -navigation
                  benötigt. Weitere Informationen finden Sie in der{' '}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-hover underline"
                  >
                    Datenschutzerklärung von Google
                  </a>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-text-main mb-4">3. Wie können Sie Cookies verwalten?</h2>
                <p className="leading-relaxed">
                  Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert
                  werden und einzeln über die Annahme entscheiden können. Alternativ können Sie die Annahme
                  von Cookies für bestimmte Fälle oder generell ausschließen. Bei der Nichtannahme von
                  Cookies kann die Funktionalität unserer Website eingeschränkt sein.
                </p>
                <p className="leading-relaxed">
                  Die meisten Browser akzeptieren Cookies automatisch. Sie können Ihren Browser jedoch so
                  konfigurieren, dass keine Cookies auf Ihrem Computer gespeichert werden oder dass stets
                  ein Hinweis erscheint, bevor ein neuer Cookie angelegt wird of ist. Die vollständige
                  Deaktivierung von Cookies kann dazu führen, dass Sie nicht alle Funktionen unserer
                  Website nutzen können.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-display font-bold text-text-main mb-4">4. Weitere Informationen</h2>
                <p className="leading-relaxed">
                  Weitere Informationen zum Umgang mit Ihren personenbezogenen Daten finden Sie in unserer{' '}
                  <Link href="/datenschutz" className="text-primary hover:text-primary-hover underline">
                    Datenschutzerklärung
                  </Link>.
                </p>
                <p className="leading-relaxed">
                  Bei Fragen zu unserer Cookie-Richtlinie können Sie uns jederzeit kontaktieren:
                </p>
                <address className="not-italic mt-4 p-6 bg-bg-secondary rounded-xl">
                  <p className="font-bold text-text-main">{companyData.companyName}</p>
                  <p>{companyData.address.street}</p>
                  <p>{companyData.address.zip} {companyData.address.city}</p>
                  <p className="mt-2">
                    E-Mail:{' '}
                    <a href={`mailto:${companyData.email}`} className="text-primary hover:text-primary-hover underline">
                      {companyData.email}
                    </a>
                  </p>
                  <p>
                    Telefon:{' '}
                    <a href={`tel:${companyData.phone}`} className="text-primary hover:text-primary-hover underline">
                      {companyData.displayPhone}
                    </a>
                  </p>
                </address>
              </section>

              <p className="text-sm text-text-tertiary mt-8">
                Stand: April 2026
              </p>
            </article>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
