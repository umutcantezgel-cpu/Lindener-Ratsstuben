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
        title: t('impressum.title'),
        description: t('impressum.description'),
        alternates: getAlternates(locale, 'impressum'),
    };
}

export default async function ImpressumPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations(locale as LocaleType, 'meta');
    const title = t('impressum.title').split(' |')[0];

    // We hardcode the language check to provide multi-lang support or keep it universally German since it's a legal DACH requirement
    // Usually Impressum is kept in German, but we can do a localized intro if needed.

    return (
        <LegalPageLayout title={title} lastUpdated="April 2026" locale={locale}>
            <h2>Angaben gemäß § 5 TMG</h2>
            <p>
                {companyData.companyName}<br />
                {companyData.address.street}<br />
                {companyData.address.zip} {companyData.address.city}<br />
                Deutschland
            </p>

            <h2>Vertreten durch</h2>
            <p>Inhaber: {companyData.ownerName}</p>

            <h2>Kontakt</h2>
            <p>
                Telefon: {companyData.phone}<br />
                E-Mail: {companyData.email}
            </p>

            <h2>Aufsichtsbehörde und Gewerbeordnung</h2>
            <p>
                Das Betreiben einer gastronomischen Einrichtung bedarf der Erlaubnis nach § 2 GastG. Zuständige Aufsichtsbehörde für die Erteilung und Überwachung ist:<br />
                <strong>Gewerbeamt Linden</strong><br />
                [Beispieladresse des Amts, ggf. 35440 Linden]<br />
                Mögliche Kammerzugehörigkeit: Industrie- und Handelskammer (IHK) Linden-Friedberg.
            </p>

            <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p>
                {companyData.ownerName}<br />
                {companyData.address.street}<br />
                {companyData.address.zip} {companyData.address.city}
            </p>

            <h2>Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle</h2>
            <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie unter folgendem Link finden: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br />
                Unsere E-Mail-Adresse lautet: {companyData.email}
            </p>
            <p>
                Gemäß § 36 VSBG weisen wir darauf hin, dass wir nicht bereit oder verpflichtet sind, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Die Beilegung rechtlicher Differenzen lösen wir stets direkt und lösungsorientiert mit unseren Gästen.
            </p>

            <h2>Haftung für Inhalte</h2>
            <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
            <p>
                Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </p>

            <h2>Haftung für Links (Externe Verweise)</h2>
            <p>
                Unser Angebot enthält Links zu externen Websites Dritter (beispielsweise Bewertungsportale wie Google Maps oder Social Media Plattformen wie Instagram und Facebook), auf deren Inhalte wir keinen Einfluss haben. Wir können für diese fremden Inhalte aus diesen Gründen auch keine Gewähr übernehmen, da für die Inhalte der verlinkten Seiten stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich ist. 
            </p>
            <p>
                Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft und rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung für uns unzumutbar. Sollten Rechtsverletzungen bekannt werden, so werden wir derartige Links selbstverständlich umgehend entfernen.
            </p>

            <h2>Urheberrecht und Leistungsschutzrechte</h2>
            <p>
                Die durch die Seitenbetreiber erstellten und auf dieser Website veröffentlichten Inhalte und Werke (insbesondere Texte, Fotografien, Grafiken, Design der Speisekarte sowie Quellcode) unterliegen dem strengen deutschen Urheber- und Leistungsschutzrecht. Die Vervielfältigung, Bearbeitung, Verbreitung, öffentliche Zugänglichmachung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der vorherigen ausdrücklichen und schriftlichen Zustimmung des jeweiligen Autors, Fotografen bzw. Erstellers. 
            </p>
            <p>
                Darstellung dieser Website in fremden Frames ist nur mit schriftlicher Erlaubnis zulässig. Soweit die Inhalte auf dieser Seite nicht vom Betreiber selbst erstellt wurden, werden die Urheberrechte Dritter konsequent beachtet und in der Regel auch als solche gekennzeichnet (z.B. Stock-Fotografien oder fremde Bibliotheken). Sollten Sie trotzdem auf eine vermeintliche Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden formlosen Hinweis zur raschen Klärung. Bei Bekanntwerden von Rechtsverletzungen werden wir betroffene Inhalte umgehend entfernen.
            </p>
            
            <p className="mt-8 text-sm text-text-muted">
                Quelle: Rechtsgrundlagen auf Basis von <a href="https://www.e-recht24.de" target="_blank" rel="noopener noreferrer">e-recht24.de</a> sowie individuellen gastronomischen Anforderungen.
            </p>
        </LegalPageLayout>
    );
}
