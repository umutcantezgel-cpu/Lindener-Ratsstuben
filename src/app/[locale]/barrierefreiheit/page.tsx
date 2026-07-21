import React from 'react';
import { LocaleLink } from '@/components/ui/LocaleLink';
import { PageTransition } from '@/components/effects/PageTransition';
import { Metadata } from 'next';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';

import { getAlternates } from '@/lib/seo/metadata';
import { companyData } from '@/data/company';

export async function generateMetadata({ params }: { params: Promise<{ locale: LocaleType }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale as LocaleType, 'meta');
  return {
    title: t('barrierefreiheit.title', 'Barrierefreiheit | Lindener Ratsstuben'),
    description: t('barrierefreiheit.description'),
    alternates: getAlternates(locale, 'barrierefreiheit'),
    robots: {
      index: false,
      follow: true,
    }
  };
}

const Barrierefreiheit = async ({ params }: { params: Promise<{ locale: LocaleType }> }) => {
    const { locale } = await params;
    const t = await getTranslations(locale as LocaleType, 'meta');
    const tLegal = await getTranslations(locale as LocaleType, 'legal');
    const title = t('barrierefreiheit.title', 'Barrierefreiheit | Lindener Ratsstuben').split('|')[0].trim();
    const isNonGerman = locale !== 'de';
    const bindingNotice = isNonGerman ? tLegal('legal.binding_notice') : '';

    return (
        <PageTransition>
            <article className="pt-24 pb-20 min-h-screen bg-bg-beige" itemProp="mainContentOfPage">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-surface bg-brand-header px-8 py-5 rounded-2xl uppercase tracking-widest mb-10 shadow-warm inline-block w-full max-w-3xl text-center">
                        {title}
                    </h1>

                    {isNonGerman && bindingNotice && (
                        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl flex items-start gap-3">
                            <span className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">ℹ️</span>
                            <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">{bindingNotice}</p>
                        </div>
                    )}

                    <div className="prose prose-lg text-text-secondary space-y-8">
                        {/* Einleitung */}
                        <section>
                            <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">Erklärung zur Barrierefreiheit</h2>
                            <p>
                                Die Lindener Ratsstuben sind bestrebt, die Website in Übereinstimmung mit den nationalen und
                                europäischen Rechtsvorschriften zur Umsetzung der <strong>Richtlinie (EU) 2016/2102</strong> des
                                Europäischen Parlaments barrierefrei zugänglich zu machen.
                            </p>
                            <p>
                                Diese Erklärung zur Barrierefreiheit gilt für die Website{' '}
                                <strong>www.lindener-ratsstuben.de</strong>.
                            </p>
                        </section>

                        {/* Standards */}
                        <section>
                            <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">Angewandte Standards</h2>
                            <p>
                                Diese Website orientiert sich an folgenden Standards:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>WCAG 2.1</strong> (Web Content Accessibility Guidelines) – Konformitätsstufe AA</li>
                                <li><strong>BITV 2.0</strong> (Barrierefreie-Informationstechnik-Verordnung) – Konformität angestrebt</li>
                                <li><strong>EN 301 549</strong> – Europäische Norm für die Barrierefreiheit von IKT-Produkten</li>
                            </ul>
                        </section>

                        {/* Stand der Umsetzung */}
                        <section>
                            <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">Stand der Konformität</h2>
                            <p>
                                Diese Website ist <strong>teilweise konform</strong> mit WCAG 2.1 Stufe AA. Die folgenden
                                Maßnahmen wurden bereits umgesetzt:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Semantische HTML5-Elemente für eine klare Dokumentstruktur</li>
                                <li>ARIA-Attribute (Landmarks, Labels, Live-Regions) für Screenreader-Kompatibilität</li>
                                <li>Tastaturnavigation für alle interaktiven Elemente</li>
                                <li>Kontrastverhältnisse gemäß WCAG 2.1 AA (mindestens 4.5:1 für Text)</li>
                                <li>Responsive Design für unterschiedliche Bildschirmgrößen und Zoom-Stufen bis 200%</li>
                                <li>Alternativtexte für alle informativen Bilder</li>
                                <li>Sprachauszeichnung (<code>lang</code>-Attribut) für die Hauptsprache und mehrsprachige Inhalte</li>
                                <li>Fokussichtbarkeit (sichtbare Fokusindikatoren für Tastaturbedienung)</li>
                            </ul>
                        </section>

                        {/* Bekannte Einschränkungen */}
                        <section>
                            <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">Bekannte Einschränkungen</h2>
                            <p>
                                Trotz unserer Bemühungen können derzeit folgende Bereiche Einschränkungen aufweisen:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>PDF-Speisekarte:</strong> Die als PDF bereitgestellte Speisekarte ist möglicherweise nicht vollständig barrierefrei. Die vollständige Speisekarte ist alternativ als HTML auf der <LocaleLink href="/menu" className="text-primary hover:text-primary-hover underline">Menü-Seite</LocaleLink> verfügbar.</li>
                                <li><strong>Google Maps:</strong> Die eingebettete Karte stammt von einem Drittanbieter und unterliegt dessen Barrierefreiheitsstandards. Alternativ stellen wir die Adresse und den Link zur Kartenansicht als Text bereit.</li>
                                <li><strong>Animationen:</strong> Die Website nutzt bewegte Elemente. Nutzer können Animationen über die Betriebssystem-Einstellung &quot;Bewegung reduzieren&quot; deaktivieren (<code>prefers-reduced-motion</code>).</li>
                            </ul>
                        </section>

                        {/* Physische Barrierefreiheit */}
                        <section>
                            <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">Barrierefreiheit vor Ort</h2>
                            <p>
                                Die Lindener Ratsstuben sind auch physisch barrierefrei zugänglich:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Stufenloser Zugang zum Gastraum</li>
                                <li>Barrierefreie Sanitäreinrichtungen</li>
                                <li>Ausreichend breite Durchgänge für Rollstühle und Gehhilfen</li>
                                <li>Parkplätze in unmittelbarer Nähe des Eingangs</li>
                            </ul>
                        </section>

                        {/* Feedback & Kontakt */}
                        <section>
                            <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">Feedback und Kontakt</h2>
                            <p>
                                Sollten Ihnen Barrieren auf dieser Website auffallen oder haben Sie Fragen zur
                                Barrierefreiheit, kontaktieren Sie uns bitte:
                            </p>
                            <div className="bg-bg-secondary rounded-xl p-6 border border-border mt-4">
                                <p className="font-bold text-text-main">Lindener Ratsstuben</p>
                                <p>Inhaber: Hasan Toker</p>
                                <p>Konrad-Adenauer-Straße 26, 35440 Linden</p>
                                <p className="mt-2">
                                    Telefon: <a href="tel:+49640364556" className="text-primary hover:text-primary-hover">06403 – 64556</a><br />
                                    E-Mail: <a href={`mailto:${companyData.email}`} className="text-primary hover:text-primary-hover">{companyData.email}</a>
                                </p>
                            </div>
                            <p className="mt-4">
                                Wir bemühen uns, Ihr Feedback innerhalb von 2 Wochen zu bearbeiten und etwaige Probleme
                                schnellstmöglich zu beheben.
                            </p>
                        </section>

                        {/* Durchsetzungsverfahren */}
                        <section>
                            <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">Durchsetzungsverfahren</h2>
                            <p>
                                Sollten Sie trotz Kontaktaufnahme keine zufriedenstellende Lösung erhalten, können Sie sich
                                an die zuständige Durchsetzungsstelle wenden:
                            </p>
                            <div className="bg-bg-secondary rounded-xl p-6 border border-border mt-4">
                                <p className="font-bold text-text-main">Hessisches Ministerium für Soziales und Integration</p>
                                <p>Referat für digitale Barrierefreiheit</p>
                                <p>Sonnenberger Str. 2/2a</p>
                                <p>65193 Wiesbaden</p>
                                <p className="mt-2">
                                    Website:{' '}
                                    <a
                                        href="https://soziales.hessen.de"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:text-primary-hover underline"
                                    >
                                        soziales.hessen.de
                                    </a>
                                </p>
                            </div>
                        </section>

                        <p className="text-sm text-text-tertiary mt-12 pt-6 border-t border-border">
                            Stand: April 2026 | Diese Erklärung wurde zuletzt am 16. April 2026 überarbeitet. | <LocaleLink href="/impressum" className="text-primary hover:text-primary-hover underline">Impressum</LocaleLink>
                        </p>
                    </div>
                </div>
            </article>
        </PageTransition>
    );
};

export default Barrierefreiheit;
