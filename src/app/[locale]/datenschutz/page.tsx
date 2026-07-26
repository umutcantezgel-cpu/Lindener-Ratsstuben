import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { companyData } from '@/data/company';
import { Metadata } from 'next';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';
import { getAlternates } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations(locale as LocaleType, 'meta');
    return {
        title: t('datenschutz.title', 'Datenschutz | Lindener Ratsstuben'),
        description: t('datenschutz.description'),
        alternates: getAlternates('de', 'datenschutz'),
        robots: locale === 'de' ? 'index, follow' : 'noindex, follow',
    };
}

export default async function DatenschutzPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations(locale as LocaleType, 'meta');
    const title = t('datenschutz.title', 'Datenschutz | Lindener Ratsstuben');
    
    return (
        <LegalPageLayout title={title} lastUpdated="April 2026" locale={locale} pageKey="datenschutz">
            <h2>1. Datenschutz auf einen Blick</h2>
            <h3>Allgemeine Hinweise</h3>
            <p>
                Die folgenden Hinweise geben einen detaillierten Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen, mit uns kommunizieren oder unsere Dienste als Restaurantgast in Anspruch nehmen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Wir behandeln Ihre Daten stets vertraulich und nach den aktuellsten Vorschriften der europäischen Datenschutz-Grundverordnung (DSGVO) und des Bundesdatenschutzgesetzes (BDSG).
            </p>
            <h3>Datenerfassung auf dieser Website</h3>
            <h3 className="text-xl font-bold text-text-main mt-6 mb-3">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
            <p>
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.
            </p>
            <h3 className="text-xl font-bold text-text-main mt-6 mb-3">Wie erfassen wir Ihre Daten?</h3>
            <p>
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese aktiv mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in unser Online-Reservierungssystem oder in ein Kontaktformular eingeben. Zum anderen werden Daten automatisch oder nach Ihrer expliziten Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. IP-Adresse, genutzter Internetbrowser, Betriebssystem, Referrer-URL oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser technischen Daten erfolgt automatisch, sobald Sie diese Website betreten.
            </p>
            <h3 className="text-xl font-bold text-text-main mt-6 mb-3">Wofür nutzen wir Ihre Daten?</h3>
            <p>
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten (Technisch notwendige Verarbeitung). Andere Daten werden verwendet, um unsere Reservierungen softwarebasiert rechtssicher dokumentieren zu können. Wenn Sie uns eine explizite Einwilligung erteilt haben (Cookie Consent), können zudem pseudonymisierte Nutzungsdaten zu Statistikzwecken verwendet werden, um unser digitales Angebot für Sie zu optimieren.
            </p>
            <h3 className="text-xl font-bold text-text-main mt-6 mb-3">Welche Rechte haben Sie bezüglich Ihrer Daten?</h3>
            <p>
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </p>

            <h2>2. Hosting, Content Delivery Networks (CDN) und Edge Architektur</h2>
            <p>
                Unsere Plattform nutzt modernste cloudbasierte Technologien, um ein hohes Maß an Sicherheit, Ausfallsicherheit und Lade-Geschwindigkeit zu gewährleisten.
            </p>
            <h3>Vercel (Frontend & Analytics)</h3>
            <p>
                Wir hosten unsere Website bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA (nachfolgend „Vercel“ genannt).
            </p>
            <p>
                Vercel ist eine Cloud-Entwicklungsplattform. Wenn Sie unsere Website besuchen, werden die serverseitigen Anfragen über die Vercel-Infrastruktur verarbeitet. Die Kommunikation erfolgt verschlüsselt. Hierbei werden auf den Edge-Servern von Vercel temporär Verbindungsdaten (z. B. Ihre IP-Adresse und Browser-Metadaten) erfasst, um die Website dDoS-sicher und schnell ausliefern zu können.
            </p>
            <p>
                Soweit Daten in die USA übertragen werden, weisen wir darauf hin, dass die USA vom EuGH als Land mit unzureichendem Datenschutzniveau beurteilt wurden. Die Datenübertragung stützt sich jedoch auf die Standardvertragsklauseln der EU-Kommission sowie auf das aktuelle EU-US Data Privacy Framework, dem sich Vercel unterworfen hat.
            </p>
            <p>
                Die Nutzung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer performanten, sicheren und datenschutzkonformen Auslieferung unserer Webseite. Wir haben einen entsprechenden Vertrag über Auftragsverarbeitung (AVV) mit Vercel geschlossen.
            </p>

            <h3>Sanity CMS (Headless Content Management)</h3>
            <p>
                Wir nutzen zur Bereitstellung unserer digitalen Inhalte (Texte, Bilder, PDF-Speisekarten, Metadaten) das Content-Management-System Sanity, betrieben von der Sanity AS, Bakkehaugveien 54, 0873 Oslo, Norwegen.
            </p>
            <p>
                Sanity speichert die Inhalte auf europäischen Servern und liefert diese über deren hauseigenes Content Delivery Network (CDN) direkt an Ihren Browser aus. Bei diesem Abruf, z. B. beim Herunterladen der aktuellen PDF-Speisekarte, tauscht Ihr Browser notwendigerweise technische Metadaten inklusive Ihrer IP-Adresse mit den Sanity-Servern aus. Die Datenübertragung nutzt modernste TLS/SSL-Verschlüsselungen (https).
            </p>
            <p>
                Die Verarbeitung dieser Verbindungsdaten erfolgt auf Grundlage unseres berechtigten Interesses gemäß Art. 6 Abs. 1 lit. f DSGVO an der hochverfügbaren Bereitstellung unserer redaktionellen Inhalte. Auch hier garantieren entsprechende Auftragsverarbeitungsverträge den DSGVO-Normstandard.
            </p>

            <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3>Datenschutz und Vertraulichkeit</h3>
            <p>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten extrem ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und strikt nach den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung. Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Die hier vorliegende Erklärung erläutert, wie, warum und welche Daten wir erheben und wofür wir sie nutzen.
            </p>

            <h3>Hinweis zur verantwortlichen Stelle</h3>
            <p>
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website (im Sinne der DSGVO) ist:
            </p>
            <div className="bg-surface p-4 rounded-md my-4 border border-border">
                <strong>{companyData.companyName}</strong><br />
                Oruc Cantezgel<br />
                {companyData.address.street}<br />
                {companyData.address.zip} {companyData.address.city}<br />
                Deutschland / Germany<br /><br />
                Telefon: {companyData.phone}<br />
                E-Mail: {companyData.email}
            </div>

            <h3>Sicherheit der Datenübertragung (SSL / TLS)</h3>
            <p>
                Unsere Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Ihrer Reservierungsanfragen oder sonstiger Nachrichten, die Sie an uns als Seitenbetreiber senden, eine hochgradige SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile. Durch die Aktivierung dieser Verschlüsselung können die von Ihnen übermittelten Daten in aller Regel nicht von Dritten mitgelesen werden.
            </p>

            <h3>Speicherdauer</h3>
            <p>
                Soweit innerhalb dieser Datenschutzerklärung keine individuell abweichende Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten unmittelbar gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. finanzrechtliche oder handelsrechtliche Aufbewahrungsfristen von 6 bis 10 Jahren bei Rechnungen für Veranstaltungsbuchungen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser rechtlichen Gründe.
            </p>

            <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
            <p>
                Viele Datenverarbeitungsvorgänge (beispielsweise das Setzen nicht-essenzieller Cookies zur Analyse) sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>

            <h2>4. Datenerfassung auf unserer Website</h2>
            
            <h3>Cookies (Consent, TTDSG und DSGVO-Konformität)</h3>
            <p>
                Unsere Website nutzt ein erweitertes, striktes Consent-Cookie-Verfahren (&quot;Zero-Script Policy&quot;, &quot;Opt-In by Default&quot;). Das bedeutet konkret:
            </p>
            <ul className="list-disc ms-6 space-y-2 my-4">
                <li><strong>Technische Cookies:</strong> Für die Bereitstellung der Website-Infrastruktur setzen wir (und unser Hoster Vercel) essenzielle Session-Tokens oder Routing-Cookies. Diese enthalten niemals personenbezogene Identifikationsmerkmale und dienen ausschließlich der Sicherheit, der Bot-Erkennung und der Lastenverteilung. Die Rechtsgrundlage hierfür bildet unser überwiegendes berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO in Verbindung mit § 25 Abs. 2 TTDSG.</li>
                <li><strong>Zustimmungspflichtige Cookies:</strong> Alle externen Marketing-Scripts, Analyse-Tracker von Drittherstellern, externe Webfonts (Google Fonts sofern nicht lokal gehostet) und sonstige Drittanbieter-Elemente, die Ihr Verhalten studieren könnten, sind standardmäßig physikalisch aus dem Quellcode <strong>blockiert</strong>. Sie werden erst nach Ihrer ausdrücklichen Bestätigung im Consent Banner (Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TTDSG) freigegeben und geladen.</li>
            </ul>
            <p>
                Sie können Ihre Cookie-Einstellungen jederzeit über unser Datenschutz-Einstellungsmenü anpassen. Detailinformationen zu jedem potentiell eingesetzten Cookie entnehmen Sie bitte unserer <a href={`/${locale}/cookies`} className="text-secondary hover:text-accent underline">separaten Cookie-Richtlinie</a>.
            </p>

            <h3>Verarbeitung von Reservierungsdaten (API, Resend & Backend)</h3>
            <p>
                Wenn Sie unser digitales System zur Reservierung von Tischen nutzen, erheben und verarbeiten wir die folgenden, bei der Nutzung verpflichtenden oder freiwilligen Daten:
            </p>
            <ul className="list-disc ms-6 space-y-2 my-4">
                <li>Vollständiger Vor- und Nachname</li>
                <li>E-Mail-Adresse (Einfache Überprüfung mittels Pattern-Matching)</li>
                <li>Telefonnummer (Zwecks kurzfristiger Rückfragen zur Reservierung)</li>
                <li>Gewähltes Datum, Uhrzeit und Personenanzahl</li>
                <li>Freitextnachrichten, Wünsche oder Hinweise auf eventuelle Allergien</li>
            </ul>
            <p>
                <strong>Zweck:</strong> Die primäre Datenverarbeitung dient ausschließlich der Bearbeitung, Bestätigung und Durchführung Ihrer Tischbuchung. Rechtsgrundlage ist Artikel 6 Abs. 1 lit. b DSGVO (Vertragserfüllung und vorvertragliche Maßnahmen).
            </p>
            <p>
                <strong>Technologie-Stack & Resend:</strong> Die Abwicklung der Reservierung läuft vollautomatisiert über die API-Services unserer Webseite. Das System sendet Ihnen nach Eintreffen eine elektronische Reservierungsanfragebestätigung per E-Mail zu. Zum Versand dieser Transaktionsmails bedienen wir uns dem E-Mail-Provider <strong>Resend</strong> (Resend Inc., 2261 Market Street #5039, San Francisco, CA 94114). Die E-Mail-Inhalte sowie Ihre Adresse werden hierfür TLS-verschlüsselt an die Server von Resend in den USA übertragen, verarbeitet und schnellstmöglich ausgeliefert. Ein AV-Vertrag sowie Standardvertragsklauseln der EU sichern Ihre Daten ab. Die Angabe Ihrer Kontaktdaten ist zur Nutzung der Online-Reservierung technisch zwingend erforderlich. Falls Sie dies nicht wünschen, können Sie gerne telefonisch reservieren.
            </p>

            <h3>Externe Komponenten und APIs (z.B. Google Maps)</h3>
            <p>
                Um Ihnen die Orientierung und die Routenplanung zu unseren Räumlichkeiten so einfach wie möglich zu machen, greifen wir unter Umständen auf Kartenmaterial der Google Maps Services zurück (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland).<br/>
                Wenn das Kartenmaterial eingebunden ist und von Ihnen im Rahmen des Cookie-Consents aktiviert wurde, baut Ihr Browser eine direkte Verbindung mit den Servern von Google auf. Dabei übermittelt Google möglicherweise Cookies auf Ihr Endgerät und erfasst Ihre IP-Adresse sowie etwaige Standortdaten. Die Rechtsgrundlage für die Verarbeitung liegt in Ihrer ausdrücklichen Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können diese Einwilligung jederzeit in den Cookie-Einstellungen widerrufen.
            </p>

            <h2>5. Bonitätsprüfung, Inkasso und Bezahlung</h2>
            <p>
                Bei geschlossenen Gesellschaften (Bankett / Hochzeiten) und Unternehmensaufträgen (Catering), bei denen Dienstleistungen in Form einer klassischen Rechnungsstellung erbracht werden, behalten wir uns aus berechtigtem wirtschaftlichem Interesse (Art. 6 Abs. 1 lit. f DSGVO) vor, bei Neukunden im Vorfeld eine Überprüfung der Bonität durch Auskunfteien einzuholen. Wir weisen ferner darauf hin, dass die Daten von Gästen/Firmen im Zuge offener und fälliger Forderungen im Falle eines langwierigen Zahlungsverzugs an zugelassene Inkassodienstleister oder juristische Vertreter weitergegeben werden können. Dies dient der legitimen Durchsetzung rechtmäßiger vertraglicher Ansprüche.
            </p>

            <h2>6. Aktualität und Änderung dieser Datenschutzerklärung</h2>
            <p>
                Diese Datenschutzerklärung ist aktuell gültig und hat den Stand April 2026. Durch die stetige Weiterentwicklung unserer digitalen Systeme (wie z.B. Sanity CMS, Vercel-Infrastruktur) oder aufgrund geänderter gesetzlicher respektive höchstrichterlicher Vorgaben kann es geboten oder verpflichtend sein, diese Datenschutzerklärung anzupassen. Die jeweils aktuelle Datenschutzerklärung kann jederzeit an dieser Stelle auf unserer Website aufgerufen und ausgedruckt werden.
            </p>
        </LegalPageLayout>
    );
}
