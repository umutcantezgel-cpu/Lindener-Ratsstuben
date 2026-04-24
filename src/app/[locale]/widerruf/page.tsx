import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { companyData } from '@/data/company';
import { Metadata } from 'next';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';
import { getAlternates } from '@/lib/seo/metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: LocaleType }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations(locale as LocaleType, 'meta');
    return {
        title: t('widerruf.title'),
        description: t('widerruf.description'),
        alternates: getAlternates(locale, 'widerruf'),
    };
}

export default async function WiderrufPage({ params }: { params: Promise<{ locale: LocaleType }> }) {
    const { locale } = await params;
    const t = await getTranslations(locale as LocaleType, 'meta');
    const title = t('widerruf.title').split('|')[0].trim();

    return (
        <LegalPageLayout title={title} lastUpdated="April 2026" locale={locale}>
            <h2>Präambel: Kein Widerrufsrecht in der Gastronomie für Termingeschäfte</h2>
            <p>
                Der Gesetzgeber hat für Dienstleistungen, die einen spezifischen Termin oder Zeitraum vorsehen (sogenannte Termingeschäfte), im Bereich der Gastronomie, Freizeitbetätigung und Beherbergung strikte Ausnahmeregelungen vom sonst üblichen 14-tägigen Fernabsatz-Widerrufsrecht geschaffen. Dies dient dem Schutz planungsintensiver Betriebe vor ungerechtfertigten Einnahmeausfällen und unkalkulierbaren Warenverlusten (Verderb von Lebensmitteln).
            </p>

            <h2>1. Ausschluss des Widerrufsrechts gemäß § 312g Abs. 2 Nr. 9 BGB</h2>
            <p>
                Ein gesetzliches Widerrufsrecht für Verbraucher besteht gemäß § 312g Abs. 2 Nr. 9 BGB ausdrücklich <strong>nicht</strong> bei Verträgen zur Erbringung von Dienstleistungen in den Bereichen Beherbergung zu anderen Zwecken als zu Wohnzwecken, Beförderung von Waren, Kraftfahrzeugvermietung, Lieferung von Speisen und Getränken sowie zur Erbringung weiterer Dienstleistungen im Zusammenhang mit Freizeitbetätigungen, <strong>wenn der Vertrag für die Erbringung einen spezifischen Termin oder Zeitraum vorsieht.</strong>
            </p>
            <p>
                <strong>Bedeutung für Ihre Buchungen:</strong>
                <ul>
                    <li><strong>Tischreservierungen:</strong> Wenn Sie bei uns – egal ob telefonisch, per E-Mail oder über unser Online-Buchungsformular – einen Tisch zu einem konkreten Datum und einer konkreten Uhrzeit reservieren, schließen Sie ein Termingeschäft ab. Es gibt hierfür kein vierzehntägiges Widerrufsrecht.</li>
                    <li><strong>Veranstaltungen (Hochzeiten, Geburtstage, Firmenfeiern):</strong> Auch bei der verbindlichen Buchung unserer Räumlichkeiten und Catering-Leistungen (Speisen und Getränke) für ein festgelegtes Datum greift § 312g Abs. 2 Nr. 9 BGB. Ein Widerruf nach Vertragsabschluss ist ausgeschlossen.</li>
                </ul>
            </p>

            <h2>2. Keine Anwendung des Fernabsatzgesetzes auf reguläre Reservierungen</h2>
            <p>
                Da eine Tischreservierung die Zurverfügungstellung von Sitzplätzen und die Vorbereitung gastronomischer Dienstleistungen zu einem fixen Termin umfasst, greift das klassische Widerrufsrecht für Online-Käufe (wie etwa bei Kleidung oder Elektronik) bei uns rechtlich nicht. Ein einmal geschlossener Reservierungs- oder Veranstaltungsvertrag ist bindend.
            </p>

            <h2>3. Freiwillige Kulanz-Stornierungsregelungen (Ersatz für den vertraglichen Widerruf)</h2>
            <p>
                Obwohl ein gesetzlicher Anspruch auf Widerruf rechtlich nicht existiert, verstehen wir, dass unvorhergesehene Umstände (Krankheit, Notfälle) eine Planänderung erzwingen können. Daher gewähren wir unseren Gästen aus reiner Kulanz weitreichende vertragliche Rücktrittsrechte (Stornierungsmöglichkeiten), welche in unseren <a href="/agb" className="text-secondary hover:text-accent underline">Allgemeinen Geschäftsbedingungen (AGB)</a> detailliert dargelegt sind.
            </p>
            <p><strong>Die wesentlichen Kulanz-Stornierungsfristen lauten wie folgt:</strong></p>
            <ul>
                <li><strong>Reguläre Reservierungen (bis zu 7 Personen):</strong> Kostenfrei stornierbar, jedoch bitten wir um eine faire Absage so früh wie möglich, im Idealfall mindestens 12 bis 24 Stunden vor dem Termin.</li>
                <li><strong>Gruppen ab 8 Personen:</strong> Eine vollumfänglich kostenfreie Stornierung der Gruppe ist bis exakt 48 Stunden vor dem Termin möglich. Bei späteren Absagen behalten wir uns gemäß AGB eine No-Show-Gebühr in Höhe von 35,00 € pro nicht erschiener Person vor, um vorbereitete Speisen und geblocktes Personal zu kompensieren.</li>
                <li><strong>Bankett und Großveranstaltungen:</strong> Es gelten gestaffelte Stornierungsgebühren je nach Zeitraum des Einreichens der Rücktrittserklärung (z.B. bis 60 Tage vorab kostenfrei). Details hierzu entnehmen Sie bitte § 3.3 unserer AGB.</li>
            </ul>

            <h2>4. Ausnahmeregelung: Terminumgebundene Gutscheine</h2>
            <p>
                Eine rechtliche Ausnahme bilden <strong>Gutscheine, die keinen fest fixierten Termin tragen (Wertgutscheine)</strong>, sofern diese ausschließlich im Fernabsatz (z.B. über einen Webshop) vom Verbraucher erworben werden. Für solche Online-Wertgutscheinkäufe würde zwingend ein 14-tägiges Verbraucher-Widerrufsrecht gelten.
            </p>
            <p>
                <strong>Hinweis zur Gutschein-Situation der Lindener Ratsstuben:</strong><br/>
                Wir bieten zum aktuellen Zeitpunkt <strong>keinen</strong> postialischen oder elektronischen Fernabsatz von Gutscheinen über unsere Internetseite an. Weder über einen eigenen Webshop noch über Drittanbieter. Wertgutscheine sind ausnahmslos nur über den direkten physischen Kauf in unseren Geschäftsräumen (Lokal vor Ort) erwerblich. Für derartige <i>klassische Ladenkäufe (Face-to-Face)</i> existiert im deutschen Recht grundsätzlich kein 14-tägiges gesetzliches Widerrufs- oder Rückgaberecht. Rücknahme und Barauszahlung von vor Ort erworbenen Gutscheinen sind entsprechend ausgeschlossen.
            </p>

            <h2>5. Verfahren bei Kulanz-Stornierungen</h2>
            <p>
                Wenn Sie von unseren Kulanz-Rücktrittsrechten (AGB) Gebrauch machen möchten, so richten Sie Ihre Absage in Form einer eindeutigen Erklärung (ideal telefonisch, optional per E-Mail) bitte direkt an:
            </p>
            <div className="bg-surface p-6 rounded-lg border border-border mt-4">
                <strong>{companyData.companyName}</strong><br />
                {companyData.address.street}<br />
                {companyData.address.zip} {companyData.address.city}<br />
                Telefon: {companyData.phone}<br />
                E-Mail: {companyData.email}
            </div>
            <p className="mt-4 text-sm text-text-muted italic">
                Bitte beachten Sie, dass E-Mail-Stornierungen erst nach schriftlicher oder telefonischer Rückbestätigung durch einen Mitarbeiter der Lindener Ratsstuben rechtliche Bindung erlangen, um Überschneidungen außerhalb unserer Bürozeiten auszuschließen.
            </p>
        </LegalPageLayout>
    );
}
