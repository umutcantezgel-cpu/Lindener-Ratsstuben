
import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { companyData } from '@/data/company';
import { Metadata } from 'next';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';

export async function generateMetadata({ params }: { params: Promise<{ locale: LocaleType }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations(locale as LocaleType, 'meta');
    return {
        title: t('cookies.title'),
        description: 'Details zur Verwendung und Speicherung von Cookies.',
    };
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: LocaleType }> }) {
    const { locale } = await params;
    const t = await getTranslations(locale as LocaleType, 'meta');
    const title = t('cookies.title').split('|')[0].trim() + " (Cookie Policy)";

    return (
        <LegalPageLayout title={title} lastUpdated="April 2026">
            <h2>Transparenz & 20X Scale Zero-Script Architektur</h2>
            <p>
                Diese Cookie-Richtlinie informiert Sie detailliert über die Art, den Umfang und die Zwecke der Verarbeitung von Cookies und lokal gespeicherten Daten (Local Storage) auf der Webseite der {companyData.companyName}.
            </p>
            <p>
                Wir verwenden eine <strong>&quot;Strict Opt-In Zero-Script Policy&quot;</strong>. Das bedeutet: Mit Ausnahme von rein technisch notwendigen (essenziellen) System-Cookies werden absolut <strong>keine Drittanbieter-Scripte, keine externen Tracker und keine Marketing-Cookies</strong> in Ihren Browser geladen, bevor Sie nicht explizit in unserem Consent-Banner auf &quot;Alle Akzeptieren&quot; oder &quot;Auswahl Speichern&quot; geklickt haben.
            </p>

            <h2>1. Was sind Cookies und Local Storage?</h2>
            <p>
                <strong>Cookies</strong> sind kleine Textdateien, die durch den Internetbrowser auf dem Endgerät des Nutzers gespeichert werden. Sie dienen dazu, das Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Einige Cookies (&quot;Session-Cookies&quot;) werden nach Ende der Browser-Sitzung automatisch gelöscht, andere bleiben auf dem Endgerät gespeichert, bis sie manuell gelöscht werden (&quot;Persistente Cookies&quot;).
            </p>
            <p>
                <strong>Local Storage</strong> ist eine moderne Web-Technologie, die es ermöglicht, kleine Datenmengen im Cache Ihres Browsers zu speichern. Im Gegensatz zu Cookies werden Daten im Local Storage nur lokal auf Ihrem Gerät gespeichert und nicht automatisch bei jeder Server-Anfrage mitgeschickt. Wir nutzen diese Methode primär für UI-Präferenzen (z. B. Sprachwahl).
            </p>

            <h2>2. Kategorien der verwendeten Cookies & Daten</h2>

            <h3>A) Technisch Notwendige Cookies (Immer Aktiv)</h3>
            <p>
                Diese Cookies sind zwingend erforderlich, da ohne sie die Grundfunktionen der Webseite (z. B. Navigation, Speicherung Ihres Consent-Status, Spracheinstellung) nicht bereitgestellt werden können. Für den Einsatz essenzieller Cookies holen wir keine gesonderte Einwilligung ein (vgl. § 25 Abs. 2 TDDDG).
            </p>
            <div className="overflow-x-auto my-6">
                <table className="min-w-full bg-surface border border-border text-sm text-left shadow-sm rounded-xl overflow-hidden">
                    <thead className="bg-bg-secondary text-text-primary">
                        <tr>
                            <th className="px-4 py-3 font-medium">Name</th>
                            <th className="px-4 py-3 font-medium">Anbieter</th>
                            <th className="px-4 py-3 font-medium">Zweck</th>
                            <th className="px-4 py-3 font-medium">Speicherdauer</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        <tr className="hover:bg-bg-secondary/50">
                            <td className="px-4 py-3 font-mono text-xs">lr-cookie-preferences</td>
                            <td className="px-4 py-3">{companyData.companyName}</td>
                            <td className="px-4 py-3">Speichert die in unserem Banner getroffenen Privatsphäre-Einstellungen, um diese bei erneuten Besuchen anzuwenden.</td>
                            <td className="px-4 py-3">6 Monate (Local Storage)</td>
                        </tr>
                        <tr className="hover:bg-bg-secondary/50">
                            <td className="px-4 py-3 font-mono text-xs">NEXT_LOCALE</td>
                            <td className="px-4 py-3">{companyData.companyName}</td>
                            <td className="px-4 py-3">Speichert die bevorzugte Sprache des Nutzers (de, en, fr, ar) für das i18n-Routing, sodass Seitenübergänge nahtlos funktionieren.</td>
                            <td className="px-4 py-3">Session</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>B) Analytics & Statistik (Opt-In erforderlich)</h3>
            <p>
                Sobald Sie im Banner der Analytics-Nutzung zugestimmt haben, aktivieren wir spezifische Scripte zur Reichweitenmessung. Diese Daten werden strikt anonymisiert erhoben und dienen der rein internen Performance-Evaluation, Fehlererkennung und UX-Optimierung.
            </p>
            <div className="overflow-x-auto my-6">
                <table className="min-w-full bg-surface border border-border text-sm text-left shadow-sm rounded-xl overflow-hidden">
                    <thead className="bg-bg-secondary text-text-primary">
                        <tr>
                            <th className="px-4 py-3 font-medium">Name</th>
                            <th className="px-4 py-3 font-medium">Anbieter</th>
                            <th className="px-4 py-3 font-medium">Zweck</th>
                            <th className="px-4 py-3 font-medium">Speicherdauer</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        <tr className="hover:bg-bg-secondary/50">
                            <td colSpan={4} className="px-4 py-3 text-center text-text-muted italic">Aktuell setzen wir keine externen Analytics-Cookies ein. Unsere Vercel Web Analytics laufen Cookie-frei auf Server-Edge-Ebene.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h3>C) Marketing & Externe Medien (Opt-In erforderlich)</h3>
            <p>
                Marketing-Cookies werden genutzt, um Ihnen browserübergreifend relevante Inhalte/Angebote zu zeigen oder Drittanbieter-Services (wie interaktive API-Karten) zu entsperren.
            </p>
            <div className="overflow-x-auto my-6">
                <table className="min-w-full bg-surface border border-border text-sm text-left shadow-sm rounded-xl overflow-hidden">
                    <thead className="bg-bg-secondary text-text-primary">
                        <tr>
                            <th className="px-4 py-3 font-medium">Name</th>
                            <th className="px-4 py-3 font-medium">Anbieter</th>
                            <th className="px-4 py-3 font-medium">Zweck</th>
                            <th className="px-4 py-3 font-medium">Speicherdauer</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        <tr className="hover:bg-bg-secondary/50">
                            <td colSpan={4} className="px-4 py-3 text-center text-text-muted italic">Aktuell setzen wir keine Marketing-Cookies oder Retargeting-Pixel ein.</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2>3. Widerspruch und Opt-out</h2>
            <p>
                Sie haben jederzeit das Recht und die technische Möglichkeit, Ihre uns erteilte Einwilligung zu widerrufen oder anzupassen. Bitte beachten Sie, dass ein Widerruf die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung nicht berührt.
            </p>
            {/* Hier könnte ein Button implementiert werden, um das Banner erneut zu öffnen */}
            <div className="bg-bg-secondary p-4 rounded-xl mt-4 border border-border">
                <p className="font-medium text-text-primary !mt-0 !mb-2">Möchten Sie Ihre Privatsphäre-Einstellungen ändern?</p>
                <p className="text-sm">Sie können das Consent-Banner jederzeit reaktivieren, indem Sie Ihre Local-Storage-Daten im Browser löschen oder (sobald das Feature live ist) den &quot;Cookie Preferences&quot; Button im Footer klicken.</p>
            </div>

            <h2>4. Browser-Einstellungen</h2>
            <p>
                Zusätzlich können Sie Ihren Webbrowser so einstellen, dass das Speichern von Cookies generell blockiert wird oder Sie in jedem Einzelfall gefragt werden. Wenn Sie Cookies deaktivieren, kann die Funktionalität dieser und anderer Webseiten ggf. leicht eingeschränkt sein (z.B. Verlust der Spracheinstellungen). Anleitungen zur Löschung und Blockierung finden Sie im Hilfemenü Ihres Browsers.
            </p>
        </LegalPageLayout>
    );
}
