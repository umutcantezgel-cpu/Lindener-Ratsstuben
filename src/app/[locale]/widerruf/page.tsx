import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { companyData } from '@/data/company';
import { Metadata } from 'next';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';
import { getAlternates } from '@/lib/seo/metadata';
import { LocaleLink } from '@/components/ui/LocaleLink';

export async function generateMetadata({ params }: { params: Promise<{ locale: LocaleType }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations(locale as LocaleType, 'meta');
    return {
        title: t('widerruf.title', 'Widerruf | Lindener Ratsstuben'),
        description: t('widerruf.description'),
        alternates: getAlternates('de', 'widerruf'),
        robots: locale === 'de' ? 'index, follow' : 'noindex, follow',
    };
}

export default async function WiderrufPage({ params }: { params: Promise<{ locale: LocaleType }> }) {
    const { locale } = await params;
    const title = locale === 'de' ? "Widerrufsbelehrung & Stornierungsbedingungen der Lindener Ratsstuben" : "Right of Withdrawal & Cancellation Policy for Lindener Ratsstuben";

    return (
        <LegalPageLayout title={title} lastUpdated="April 2026" locale={locale} pageKey="widerruf">
            <h2>Präambel: Kein Widerrufsrecht in der Gastronomie für Termingeschäfte</h2>
            <p>
                Der Gesetzgeber hat für Dienstleistungen, die einen spezifischen Termin oder Zeitraum vorsehen (sogenannte Termingeschäfte), im Bereich der Gastronomie, Freizeitbetätigung und Beherbergung strikte Ausnahmeregelungen vom sonst üblichen 14-tägigen Fernabsatz-Widerrufsrecht geschaffen. Dies dient dem Schutz planungsintensiver Betriebe vor ungerechtfertigten Einnahmeausfällen und unkalkulierbaren Warenverlusten (Verderb von Lebensmitteln).
            </p>

            <h2>1. Ausschluss des Widerrufsrechts gemäß § 312g Abs. 2 Nr. 9 BGB</h2>
            <p>
                Ein gesetzliches Widerrufsrecht für Verbraucher besteht gemäß § 312g Abs. 2 Nr. 9 BGB ausdrücklich nicht bei Verträgen zur Erbringung von Dienstleistungen in den Bereichen Beherbergung zu anderen Zwecken als zu Wohnzwecken, Beförderung von Waren, Kraftfahrzeugvermietung, Lieferung von Speisen und Getränken sowie zur Erbringung weiterer Dienstleistungen im Zusammenhang mit Freizeitbetätigungen, wenn der Vertrag für die Erbringung einen spezifischen Termin oder Zeitraum vorsieht.
            </p>

            <h3>Tischreservierungen à la carte (Normale Reservierungen):</h3>
            <p>
                Tischreservierungen können grundsätzlich jederzeit kostenfrei telefonisch oder per E-Mail storniert werden. Wir bitten jedoch aus Fairnessgründen um eine Absage spätestens 24 Stunden vor dem reservierten Termin. Bei Nichterscheinen (No-Show) ohne vorherige Absage behalten wir uns vor, für künftige Reservierungen eine Vorauszahlung zu verlangen. 
                Bitte beachten Sie hierzu auch unsere <LocaleLink href="/agb" className="text-primary hover:text-primary-hover underline">AGB</LocaleLink> bezüglich möglicher Ausfallgebühren bei größeren Gruppen.
            </p>

            <h3>Veranstaltungen (Hochzeiten, Geburtstage, Firmenfeiern):</h3>
            <p>
                Für die Ausrichtung von Veranstaltungen mit vorbestellten Speisen, Buffets oder Menüs gelten gesonderte Stornierungsbedingungen, da hierfür im Vorfeld Wareneinkäufe und Personalplanungen getätigt werden. 
            </p>
            <p>
                Die wesentlichen Kulanz-Stornierungsfristen lauten wie folgt:
            </p>

            <h2>2. Keine Anwendung des Fernabsatzgesetzes auf reguläre Reservierungen</h2>
            <p>
                Da eine Tischreservierung die Zurverfügungstellung von Sitzplätzen und die Vorbereitung gastronomischer Dienstleistungen zu einem fixen Termin umfasst, greift das klassische Widerrufsrecht für Online-Käufe (wie etwa bei Kleidung oder Elektronik) bei uns rechtlich nicht. Ein einmal geschlossener Reservierungs- oder Veranstaltungsvertrag ist bindend.
            </p>

            <h2>3. Freiwillige Kulanz-Stornierungsregelungen (Ersatz für den vertraglichen Widerruf)</h2>
            <p>
                Obwohl ein gesetzlicher Anspruch auf Widerruf rechtlich nicht existiert, verstehen wir, dass unvorhergesehene Umstände (Krankheit, Notfälle) eine Planänderung erzwingen können. Daher gewähren wir unseren Gästen aus reiner Kulanz weitreichende vertragliche Rücktrittsrechte (Stornierungsmöglichkeiten), welche in unseren <a href={`/${locale}/agb`} className="text-secondary hover:text-accent underline">Allgemeinen Geschäftsbedingungen (AGB)</a> detailliert dargelegt sind.
            </p>
            <p><span className="font-bold">Die wesentlichen Kulanz-Stornierungsfristen lauten wie folgt:</span></p>
            <ul>
                <li><span className="font-bold">Reguläre Reservierungen (bis zu 7 Personen):</span> Kostenfrei stornierbar, jedoch bitten wir um eine faire Absage so früh wie möglich, im Idealfall mindestens 12 bis 24 Stunden vor dem Termin.</li>
                <li><span className="font-bold">Gruppen ab 8 Personen:</span> Eine vollumfänglich kostenfreie Stornierung der Gruppe ist bis exakt 48 Stunden vor dem Termin möglich. Bei späteren Absagen behalten wir uns gemäß AGB eine No-Show-Gebühr in Höhe von 35,00 € pro nicht erschiener Person vor, um vorbereitete Speisen und geblocktes Personal zu kompensieren.</li>
                <li><span className="font-bold">Bankett und Großveranstaltungen:</span> Es gelten gestaffelte Stornierungsgebühren je nach Zeitraum des Einreichens der Rücktrittserklärung (z.B. bis 60 Tage vorab kostenfrei). Details hierzu entnehmen Sie bitte § 3.3 unserer AGB.</li>
            </ul>

            <h2>4. Ausnahmeregelung: Terminumgebundene Gutscheine</h2>
            <p>
                Eine rechtliche Ausnahme bilden <span>Gutscheine, die keinen fest fixierten Termin tragen (Wertgutscheine)</span>, sofern diese ausschließlich im Fernabsatz (z.B. über einen Webshop) vom Verbraucher erworben werden. Für solche Online-Wertgutscheinkäufe würde zwingend ein 14-tägiges Verbraucher-Widerrufsrecht gelten.
            </p>
            <p>
                <span className="font-bold">Hinweis zur Gutschein-Situation der Lindener Ratsstuben:</span><br/>
                Wir bieten zum aktuellen Zeitpunkt <span className="font-bold">keinen</span> postialischen oder elektronischen Fernabsatz von Gutscheinen über unsere Internetseite an. Weder über einen eigenen Webshop noch über Drittanbieter. Wertgutscheine sind ausnahmslos nur über den direkten physischen Kauf in unseren Geschäftsräumen (Lokal vor Ort) erwerblich. Für derartige <i>klassische Ladenkäufe (Face-to-Face)</i> existiert im deutschen Recht grundsätzlich kein 14-tägiges gesetzliches Widerrufs- oder Rückgaberecht. Rücknahme und Barauszahlung von vor Ort erworbenen Gutscheinen sind entsprechend ausgeschlossen.
            </p>

            <h2>5. Verfahren bei Kulanz-Stornierungen</h2>
            <p>
                Wenn Sie von unseren Kulanz-Rücktrittsrechten (AGB) Gebrauch machen möchten, so richten Sie Ihre Absage in Form einer eindeutigen Erklärung (ideal telefonisch, optional per E-Mail) bitte direkt an:
            </p>
            <div className="bg-surface p-6 rounded-lg border border-border mt-4">
                <span className="font-bold">{companyData.companyName}</span><br />
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
