import React from 'react';
import { LocaleLink } from '@/components/ui/LocaleLink';
import { PageTransition } from '@/components/effects/PageTransition';
import { Metadata } from 'next';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';

import { getAlternates } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: LocaleType }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale as LocaleType, 'meta');
  return {
    title: t('cookie_richtlinie.title', 'Erklärung zu Speichertechnologien & Cookies | Lindener Ratsstuben'),
    description: t('cookie_richtlinie.description'),
    alternates: getAlternates(locale, 'cookie-richtlinie'),
    robots: {
      index: false,
      follow: true,
    }
  };
}

const CookieRichtlinie = async ({ params }: { params: Promise<{ locale: LocaleType }> }) => {
    const { locale } = await params;
    const t = await getTranslations(locale as LocaleType, 'meta');
    const tLegal = await getTranslations(locale as LocaleType, 'legal');
    const title = t('cookie_richtlinie.title', 'Erklärung zu Speichertechnologien & Cookies | Lindener Ratsstuben').split('|')[0].trim();
    const isNonGerman = locale !== 'de';
    const bindingNotice = isNonGerman ? tLegal('legal.binding_notice') : '';

    return (
        <PageTransition>
            <h1 className="sr-only">{title}</h1>
            <article className="pt-24 pb-20 min-h-screen bg-bg-beige" itemProp="mainContentOfPage">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-surface bg-brand-header px-8 py-5 rounded-2xl uppercase tracking-widest mb-10 shadow-warm inline-block w-full max-w-3xl text-center">
                        {title}
                    </h2>

                    {isNonGerman && bindingNotice && (
                        <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl flex items-start gap-3">
                            <span className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">ℹ️</span>
                            <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">{bindingNotice}</p>
                        </div>
                    )}

                    <div className="prose prose-lg text-text-secondary space-y-8">
                        {/* Einleitung */}
                        <section>
                            <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">Was sind Cookies?</h2>
                            <p>
                                Cookies sind kleine Textdateien, die von Ihrem Webbrowser auf Ihrem Gerät gespeichert werden,
                                wenn Sie eine Website besuchen. Sie dienen dazu, bestimmte Einstellungen und Informationen
                                für spätere Besuche zu speichern.
                            </p>
                            <p>
                                Neben klassischen Cookies verwendet diese Website auch den <strong>localStorage</strong> —
                                eine moderne Browser-Speichertechnologie, die ähnlich wie Cookies funktioniert, aber Daten
                                ausschließlich lokal auf Ihrem Gerät speichert und nicht automatisch an Server übertragen wird.
                            </p>
                        </section>

                        {/* Eingesetzte Technologien */}
                        <section>
                            <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">Eingesetzte Speichertechnologien</h2>
                            <p>
                                Diese Website setzt <strong>ausschließlich technisch notwendige Speichertechnologien</strong> ein.
                                Wir verwenden <strong>keine</strong> Marketing-, Analyse-, Tracking- oder Werbe-Cookies.
                            </p>

                            {/* Tabelle */}
                            <div className="overflow-x-auto mt-6">
                                <table className="w-full border-collapse text-sm">
                                    <thead>
                                        <tr className="bg-bg-secondary">
                                            <th className="text-left p-3 border border-border font-bold text-text-main">Name</th>
                                            <th className="text-left p-3 border border-border font-bold text-text-main">Typ</th>
                                            <th className="text-left p-3 border border-border font-bold text-text-main">Zweck</th>
                                            <th className="text-left p-3 border border-border font-bold text-text-main">Dauer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border border-border font-mono text-xs">i18n-locale</td>
                                            <td className="p-3 border border-border">localStorage</td>
                                            <td className="p-3 border border-border">Speichert Ihre gewählte Sprache (de, en, ar, fr)</td>
                                            <td className="p-3 border border-border">Dauerhaft (bis manuell gelöscht)</td>
                                        </tr>
                                        <tr className="bg-bg-secondary/50">
                                            <td className="p-3 border border-border font-mono text-xs">cookie-consent</td>
                                            <td className="p-3 border border-border">localStorage</td>
                                            <td className="p-3 border border-border">Speichert, ob das Cookie-Banner bereits bestätigt wurde</td>
                                            <td className="p-3 border border-border">Dauerhaft (bis manuell gelöscht)</td>
                                        </tr>
                                        <tr>
                                            <td className="p-3 border border-border font-mono text-xs">theme-preference</td>
                                            <td className="p-3 border border-border">localStorage</td>
                                            <td className="p-3 border border-border">Speichert die Farbschema-Präferenz (hell/dunkel), falls zutreffend</td>
                                            <td className="p-3 border border-border">Dauerhaft (bis manuell gelöscht)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Drittanbieter */}
                        <section>
                            <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">Drittanbieter-Cookies</h2>
                            <p>
                                Beim Laden von eingebetteten Inhalten Dritter (z.B. Google Maps) können diese Anbieter
                                eigene Cookies setzen. Dies geschieht außerhalb unserer Kontrolle. Für Details zu den
                                eingesetzten Drittanbieter-Diensten verweisen wir auf unsere{' '}
                                <LocaleLink href="/datenschutz" className="text-primary hover:text-primary-hover underline">
                                    Datenschutzerklärung
                                </LocaleLink>.
                            </p>
                            <p>
                                <strong>Hinweis:</strong> Google Maps kann folgende Cookies setzen:
                            </p>
                            <div className="overflow-x-auto mt-4">
                                <table className="w-full border-collapse text-sm">
                                    <thead>
                                        <tr className="bg-bg-secondary">
                                            <th className="text-left p-3 border border-border font-bold text-text-main">Cookie</th>
                                            <th className="text-left p-3 border border-border font-bold text-text-main">Anbieter</th>
                                            <th className="text-left p-3 border border-border font-bold text-text-main">Zweck</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="p-3 border border-border font-mono text-xs">NID</td>
                                            <td className="p-3 border border-border">Google</td>
                                            <td className="p-3 border border-border">Kartendarstellung und Standort-Funktionalität</td>
                                        </tr>
                                        <tr className="bg-bg-secondary/50">
                                            <td className="p-3 border border-border font-mono text-xs">CONSENT</td>
                                            <td className="p-3 border border-border">Google</td>
                                            <td className="p-3 border border-border">Speichert Cookie-Einwilligung bei Google-Diensten</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </section>

                        {/* Rechtsgrundlage */}
                        <section>
                            <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">Rechtsgrundlage</h2>
                            <p>
                                Die Verwendung technisch notwendiger Cookies erfolgt auf Grundlage von{' '}
                                <strong>Art. 6 Abs. 1 lit. f DSGVO</strong> (berechtigtes Interesse an der funktionalen
                                Bereitstellung der Website) sowie <strong>§ 25 Abs. 2 TDDDG</strong> (ehemals TTDSG), wonach
                                die Einwilligung entfällt, sofern die Speicherung technisch unbedingt erforderlich ist.
                            </p>
                        </section>

                        {/* Verwaltung */}
                        <section>
                            <h2 className="text-2xl font-bold text-text-main mt-8 mb-4">Cookies verwalten und löschen</h2>
                            <p>
                                Sie können Cookies und localStorage-Einträge jederzeit über die Einstellungen Ihres Browsers
                                verwalten oder löschen:
                            </p>
                            <ul className="list-disc list-inside space-y-2 mt-4">
                                <li>
                                    <strong>Google Chrome:</strong> Einstellungen → Datenschutz und Sicherheit → Browserdaten löschen
                                </li>
                                <li>
                                    <strong>Mozilla Firefox:</strong> Einstellungen → Datenschutz & Sicherheit → Cookies und Website-Daten
                                </li>
                                <li>
                                    <strong>Apple Safari:</strong> Einstellungen → Datenschutz → Websitedaten verwalten
                                </li>
                                <li>
                                    <strong>Microsoft Edge:</strong> Einstellungen → Datenschutz, Suche und Dienste → Browserdaten löschen
                                </li>
                            </ul>
                            <p className="mt-4">
                                <strong>Hinweis:</strong> Wenn Sie technisch notwendige Speicherungen löschen, können bestimmte
                                Funktionen der Website (z.B. Spracheinstellung) zurückgesetzt werden.
                            </p>
                        </section>

                        <p className="text-sm text-text-tertiary mt-12 pt-6 border-t border-border">
                            Stand: April 2026 | <LocaleLink href="/datenschutz" className="text-primary hover:text-primary-hover underline">Datenschutz</LocaleLink> | <LocaleLink href="/impressum" className="text-primary hover:text-primary-hover underline">Impressum</LocaleLink>
                        </p>
                    </div>
                </div>
            </article>
        </PageTransition>
    );
};

export default CookieRichtlinie;
