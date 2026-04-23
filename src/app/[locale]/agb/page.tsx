import { LegalPageLayout } from '@/components/legal/LegalPageLayout';
import { companyData } from '@/data/company';
import { Metadata } from 'next';
import { getTranslations } from '@/lib/i18n/get-translations';
import { LocaleType } from '@/lib/locales';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations(locale as LocaleType, 'meta');
    return {
        title: t('agb.title'),
        description: 'Allgemeine Geschäftsbedingungen (AGB) für Reservierungen und Veranstaltungen in den Lindener Ratsstuben.',
    };
}

export default async function AGBPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations(locale as LocaleType, 'meta');
    const title = t('agb.title').split(' |')[0];

    return (
        <LegalPageLayout title={title} lastUpdated="April 2026">
            <h2>1. Geltungsbereich und Vertragspartner</h2>
            <p>
                1.1 Diese Allgemeinen Geschäftsbedingungen (im Folgenden „AGB“ genannt) gelten für sämtliche Verträge, Leistungen und Lieferungen, die zwischen den {companyData.companyName} (im Folgenden „Restaurant“ oder „wir“) und ihren Gästen, Kunden sowie Veranstaltern (im Folgenden gemeinsam „Gast“ genannt) geschlossen bzw. erbracht werden.
            </p>
            <p>
                1.2 Vertragspartner ist die {companyData.companyName}, {companyData.address.street}, {companyData.address.zip} {companyData.address.city}, Deutschland. 
            </p>
            <p>
                1.3 Abweichende, entgegenstehende oder ergänzende Allgemeine Geschäftsbedingungen des Gastes werden nur dann und insoweit Vertragsbestandteil, als das Restaurant ihrer Geltung ausdrücklich und schriftlich zugestimmt hat. Dieses Zustimmungserfordernis gilt in jedem Fall, beispielsweise auch dann, wenn das Restaurant in Kenntnis der AGB des Gastes die Leistung an ihn vorbehaltlos ausführt.
            </p>

            <h2>2. Tischreservierungen und Stornierungsbedingungen</h2>
            <p>
                2.1 <strong>Vertragsschluss:</strong> Eine Tischreservierung stellt rechtlich ein bindendes Angebot des Gastes auf Abschluss eines Bewirtungsvertrages dar. Der Vertrag kommt mit der verbindlichen Zusage (Bestätigung durch das Restaurant, sei es mündlich, telefonisch, schriftlich oder in elektronischer Form über das Online-Reservierungssystem) zustande.
            </p>
            <p>
                2.2 <strong>Pünktlichkeit und Freigabe:</strong> Der Gast ist verpflichtet, pünktlich zur reservierten Uhrzeit zu erscheinen. Bei einer Verspätung von mehr als 15 Minuten ohne vorherige telefonische Benachrichtigung behält sich das Restaurant ausdrücklich das Recht vor, den Tisch anderweitig zu vergeben, ohne dass dem Gast hieraus Ersatzansprüche erwachsen.
            </p>
            <p>
                2.3 <strong>No-Show-Gebühr und Stornierung bei Kleingruppen (bis zu 7 Personen):</strong> Bei Reservierungen von bis zu 7 Personen bitten wir um eine faire Absage, falls der Termin nicht wahrgenommen werden kann. Eine Stornierung ist in diesen Fällen kostenfrei.
            </p>
            <p>
                2.4 <strong>No-Show-Gebühr und Stornierung bei Gruppen (ab 8 Personen):</strong> Für Gesellschaften ab 8 Personen gilt verbindlich:
                <ul>
                    <li>Eine kostenfreie Stornierung der gesamten Reservierung ist bis zu 48 Stunden vor dem vereinbarten Reservierungszeitpunkt möglich.</li>
                    <li>Änderungen der genauen Personenanzahl (Reduzierung) müssen spätestens 24 Stunden vor dem Termin mitgeteilt werden.</li>
                    <li>Sollte die Gruppe ohne rechtzeitige Absage nicht erscheinen (No-Show) oder mit deutlich weniger Personen als reserviert eintreffen, behält sich das Restaurant das Recht vor, eine pauschale Ausfallgebühr in Höhe von 35,00 EUR pro fehlender Person in Rechnung zu stellen (&quot;No-Show-Gebühr&quot;). Dem Gast bleibt stets der Nachweis gestattet, dass dem Restaurant kein oder ein wesentlich geringerer Schaden als die geforderte Pauschale entstanden ist.</li>
                </ul>
            </p>

            <h2>3. Veranstaltungen, Feierlichkeiten und Catering</h2>
            <p>
                3.1 <strong>Gesonderter Vertrag:</strong> Für geschlossene Gesellschaften, Hochzeiten, Firmenfeiern und Catering-Aufträge (Bankett-Veranstaltungen) wird ein separater, schriftlicher Veranstaltungsvertrag auf Basis eines individuellen Angebots geschlossen.
            </p>
            <p>
                3.2 <strong>Mitteilung der Teilnehmerzahl:</strong> Der Veranstalter hat dem Restaurant die endgültige verbindliche Teilnehmerzahl spätestens fünf (5) Werktage vor dem Veranstaltungstermin schriftlich mitzuteilen. Diese Zahl bildet die garantierte Mindestberechnungsgrundlage für die Erstellung der Rechnung. Erscheinen weniger Teilnehmer, wird dennoch die gemeldete Anzahl abgerechnet. Erscheinen mehr Teilnehmer, erfolgt die Abrechnung nach der tatsächlichen Teilnehmerzahl, wobei das Restaurant nicht garantieren kann, dass für die zusätzlichen Personen das gewünschte Menü in vollem Umfang verfügbar ist.
            </p>
            <p>
                3.3 <strong>Rücktritt des Veranstalters (Stornierung):</strong> Tritt der Veranstalter vom Vertrag zurück, so hat das Restaurant Anspruch auf eine angemessene Entschädigung. Wir räumen folgende Stornierungsstaffeln ein:
                <ul>
                    <li>Bis 60 Tage vor der Veranstaltung: kostenfrei</li>
                    <li>59 bis 30 Tage vor der Veranstaltung: 30% des entgangenen Speisenumsatzes</li>
                    <li>29 bis 14 Tage vor der Veranstaltung: 50% des entgangenen Speisenumsatzes</li>
                    <li>13 bis 3 Tage vor der Veranstaltung: 80% des entgangenen Speisenumsatzes</li>
                    <li>Weniger als 3 Tage vor der Veranstaltung: 100% des entgangenen Speisenumsatzes</li>
                </ul>
                Als Berechnungsgrundlage für den entgangenen Speisenumsatz gilt: <i>(Vereinbarter Menü-/Buffetpreis x gemeldete Personenzahl)</i>. Wurde noch kein Menü vereinbart, wird ein branchenüblicher Durchschnittswert von 45,00 EUR pro Person angesetzt.
            </p>
            <p>
                3.4 <strong>Mitbringen von Speisen und Getränken:</strong> Das Mitbringen jeglicher eigener Speisen und Getränke ist grundsätzlich untersagt. Ausnahmen bedürfen der vorherigen, ausdrücklichen schriftlichen Bestätigung des Restaurants. In solchen Ausnahmefällen (z.B. Hochzeitstorte, familieneigener Spezialwein) berechnet das Restaurant ein angemessenes Korkgeld für Getränke bzw. ein Gedeck- und Servicegeld für Speisen zur Deckung der Allgemeinkosten, Bereitstellung von Geschirr und Servicepersonal.
            </p>
            <p>
                3.5 <strong>Gesetzliche Bestimmungen bei Festen:</strong> Der Veranstalter verpflichtet sich, bei Musik- und Tanzveranstaltungen notwendige Anmeldungen (z.B. GEMA) selbstständig und fristgemäß durchzuführen und das Restaurant von etwaigen Ansprüchen der Verwertungsgesellschaften oder Dritter freizustellen.
            </p>

            <h2>4. Gutscheine (Verkauf und Einlösung)</h2>
            <p>
                4.1 <strong>Erwerb:</strong> Geschenkgutscheine der Lindener Ratsstuben können im Restaurant erworben werden.
            </p>
            <p>
                4.2 <strong>Gültigkeit und Einlösung:</strong> Gutscheine unterliegen der regelmäßigen gesetzlichen Verjährungsfrist von drei (3) Jahren. Diese Frist beginnt mit dem Schluss des Jahres, in dem der Gutschein erworben wurde. 
            </p>
            <p>
                4.3 <strong>Keine Barauszahlung:</strong> Eine Barauszahlung des Gutscheinwertes (auch von Teilbeträgen) ist grundsätzlich ausgeschlossen. Ebenso können Gutscheine nicht zum Kauf neuer Gutscheine verwendet werden. Bei Verlust, Diebstahl oder Unleserlichkeit des Gutscheins übernimmt das Restaurant keine Haftung; in solchen Fällen ist ein Ersatz in der Regel ausgeschlossen, es sei denn, der Erwerb lässt sich zweifelsfrei im System des Restaurants verifizieren.
            </p>

            <h2>5. Preise, Steuern und Zahlungsbedingungen</h2>
            <p>
                5.1 <strong>Preisauszeichnung:</strong> Alle auf unseren Speise- und Getränkekarten (im Restaurant sowie digital auf der Website) ausgewiesenen Preise sind Endpreise in Euro (EUR) und verstehen sich inklusive des Bedienungsgeldes und der jeweils gültigen gesetzlichen Mehrwertsteuer der Bundesrepublik Deutschland.
            </p>
            <p>
                5.2 <strong>Preisänderungen:</strong> Das Restaurant behält sich vor, Preise bei außergewöhnlichen Schwankungen im Marktumfeld (z.B. drastische Inflation bei Lebensmitteleinkäufen) kurzfristig anzupassen. Maßgeblich ist jeweils die am Tag der Leistungserbringung im Restaurant ausliegende Karte.
            </p>
            <p>
                5.3 <strong>Fälligkeit und Zahlungsmittel:</strong> Alle in Anspruch genommenen Leistungen sind, sofern keine abweichenden Vereinbarungen (etwa bei großen Veranstaltungen) getroffen wurden, unmittelbar vor Verlassen des Restaurants in voller Höhe zur Zahlung fällig. Das Restaurant akzeptiert Barzahlung in Euro sowie gängige girocard- (ehemals EC-Karte) und gängige Kreditkarten (Visa, MasterCard).
            </p>
            <p>
                5.4 <strong>Rechnungsstellung für Geschäftskunden:</strong> Die Zahlung auf Rechnung ist ausschließlich für vorher registrierte und freigegebene Firmenkunden oder bei ausdrücklicher vertraglicher Vereinbarung im Rahmen von Veranstaltungen möglich. Rechnungen des Restaurants sind in diesem Fall ohne Abzug binnen zehn (10) Tagen ab Rechnungsdatum zur Zahlung auf das angegebene Konto fällig. Im Falle des Verzugs gelten die gesetzlichen Verzugsregelungen.
            </p>

            <h2>6. Allergien, Unverträglichkeiten und Speisenbeschaffenheit</h2>
            <p>
                6.1 <strong>Aufklärung und Beratung:</strong> Das Servicepersonal der Lindener Ratsstuben bemüht sich nach besten Kräften, Gäste auf Wunsch hinsichtlich in den Speisen enthaltener deklarationspflichtiger Allergene und Zusatzstoffe zu informieren. Gästen mit schweren Allergien wird dringend geraten, das Personal bereits bei der Reservierung und nochmals bei der Bestellung ausdrücklich auf diese hinzuweisen.
            </p>
            <p>
                6.2 <strong>Kreuzkontaminationen:</strong> Wir weisen zwingend darauf hin, dass in den Küchenräumen des Restaurants eine Vielzahl unterschiedlichster Lebensmittel (inklusive sämtlicher Hauptallergene wie Nüsse, Sellerie, Gluten, Laktose, Krebstiere etc.) gleichzeitig gelagert und verarbeitet werden. <strong>Obgleich extrem hohe Hygienestandards eingehalten werden, können wir keine 100%ige Abwesenheit von Spuren bestimmter Allergene (Kreuzkontamination) garantieren.</strong> Eine absolute Haftung oder Garantie für absolute allergenfreie Speisen (z.B. &quot;100% spurenfrei glutenfrei&quot;) wird daher seitens des Restaurants zum Schutz des eigenen Betriebes ausgeschlossen. Der Verzehr der Speisen erfolgt bei schweren Allergikern auf eigene Verantwortung.
            </p>

            <h2>7. Hausordnung und Verhalten an Gästen</h2>
            <p>
                7.1 <strong>Hausrecht:</strong> Der Inhaber bzw. die Geschäftsführung der Lindener Ratsstuben und deren stellvertretende Mitarbeiter üben das Hausrecht aus. Sie sind jederzeit berechtigt, Gästen, die den Betriebsablauf stören, das Personal beleidigen oder belästigen oder andere Gäste unzumutbar beeinträchtigen, Hausverbot zu erteilen.
            </p>
            <p>
                7.2 <strong>Rauchverbot:</strong> In allen umschlossenen Gasträumen des Restaurants herrscht striktes gesetzliches Rauchverbot (inklusive E-Zigaretten und Vaporisatoren). Das Rauchen ist nur in den speziell ausgewiesenen Außenbereichen (etwa Terrasse) gestattet.
            </p>
            <p>
                7.3 <strong>Mitbringen von Tieren:</strong> Das Mitbringen von Hunden ist nach vorheriger Absprache gestattet, vorausgesetzt, diese verursachen keine Ruhestörung und werden an der (kurzen) Leine geführt. Aggressive oder stark verschmutzte Tiere können vom Restaurant verwiesen werden.
            </p>

            <h2>8. Haftungsbeschränkungen</h2>
            <p>
                8.1 <strong>Sachschäden:</strong> Das Restaurant haftet für Sachschäden, die auf einer vorsätzlichen oder grob fahrlässigen Pflichtverletzung des Restaurants, seiner gesetzlichen Vertreter oder Erfüllungsgehilfen beruhen. Bei leicht fahrlässigen Pflichtverletzungen haftet das Restaurant nur bei der Verletzung einer wesentlichen Vertragspflicht (Kardinalpflicht), wobei in diesem Fall die Haftung auf den vorhersehbaren, vertragstypischen, unmittelbaren Durchschnittsschaden begrenzt ist.
            </p>
            <p>
                8.2 <strong>Personenschäden:</strong> Die vorgenannten Haftungsbeschränkungen gelten nicht für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, die auf einer fahrlässigen Pflichtverletzung des Restaurants oder seiner Erfüllungsgehilfen basieren.
            </p>
            <p>
                8.3 <strong>Verlust von Gegenständen:</strong> Für in das Restaurant oder zu Veranstaltungen mitgebrachte Garderobe, Taschen, technische Geräte (Smartphones, Laptops) und andere Wertgegenstände der Gäste wird vom Restaurant keine Aufbewahrungspflicht übernommen. Das Restaurant haftet dementsprechend nicht für Diebstahl, Verlust oder Beschädigung mitgebrachter Sachen, es sei denn, der Verlust beruht auf vorsätzlichem oder grob fahrlässigem Verhalten des Restaurantpersonals.
            </p>
            <p>
                8.4 <strong>Fahrrad- und PKW-Stellplätze:</strong> Soweit dem Gast ein Stellplatz (z.B. Parkplatz vor dem Restaurant) zur Verfügung gestellt wird, kommt hierdurch kein Verwahrungsvertrag zustande. Bei Abhandenkommen oder Beschädigung auf dem Restaurantgrundstück abgestellter Kraftfahrzeuge, Zweiräder oder deren Inhalte haftet das Restaurant nicht, außer bei Vorsatz oder grober Fahrlässigkeit.
            </p>

            <h2>9. Datenschutz</h2>
            <p>
                Personenbezogene Daten des Gastes (z.B. Name, Telefonnummer, E-Mail-Adresse im Rahmen einer Reservierung) werden streng nach den Vorgaben der Datenschutz-Grundverordnung (DSGVO) und des Bundesdatenschutzgesetzes (BDSG) erhoben, verarbeitet und genutzt. Vollumfängliche Details entnehmen Sie bitte unserer <a href="/datenschutz" className="text-secondary hover:text-accent underline">Datenschutzerklärung</a>.
            </p>

            <h2>10. Schlussbestimmungen, Erfüllungsort und Gerichtsstand</h2>
            <p>
                10.1 <strong>Änderungen der AGB:</strong> Das Restaurant behält sich das Recht vor, diese AGB mit Wirkung für die Zukunft jederzeit zu ändern, sofern gesetzliche Änderungen, höchstrichterliche Rechtsprechung oder Marktgegebenheiten dies erfordern. Für bestehende, bereits gebuchte Verträge gelten jedoch stets die AGB in der zum Zeitpunkt der Reservierung gültigen Fassung.
            </p>
            <p>
                10.2 <strong>Anwendbares Recht:</strong> Auf das gesamte Rechts- und Vertragsverhältnis zwischen dem Restaurant und dem Gast findet ausschließlich das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG) Anwendung.
            </p>
            <p>
                10.3 <strong>Gerichtsstand:</strong> Ist der Gast ein Kaufmann, eine juristische Person des öffentlichen Rechts oder ein öffentlich-rechtliches Sondervermögen, so ist der ausschließliche Gerichtsstand für alle Streitigkeiten, die sich aus oder im Zusammenhang mit dem Vertragsverhältnis ergeben, der <strong>Sitz des Restaurants in Linden, bzw. das sachlich und örtlich zuständige Gericht in Gießen</strong>. 
            </p>
            <p>
                10.4 <strong>Salvatorische Klausel:</strong> Sollten einzelne Bestimmungen dieser Allgemeinen Geschäftsbedingungen ganz oder teilweise unwirksam oder undurchführbar sein oder nach Vertragsschluss unwirksam oder undurchführbar werden, bleibt davon die Wirksamkeit des Vertrages im Übrigen unberührt. An die Stelle der unwirksamen oder undurchführbaren Bestimmung soll diejenige wirksame und durchführbare Regelung treten, deren Wirkungen der wirtschaftlichen und rechtlichen Zielsetzung am nächsten kommen, die die Vertragsparteien mit der unwirksamen bzw. undurchführbaren Bestimmung verfolgt haben.
            </p>
        </LegalPageLayout>
    );
}
