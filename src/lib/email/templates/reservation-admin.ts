/**
 * Reservierung — Admin-Benachrichtigung an den Restaurantbesitzer.
 * Enthält alle Gast-Daten und einen Button zum Bestätigen/Antworten.
 */
import { baseLayout, infoCard } from './base-layout';

import he from 'he';

interface ReservationAdminData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  message?: string;
}

export function reservationAdminEmail(data: ReservationAdminData): string {
  const content = `
    <h2>🔔 Neue Reservierungsanfrage</h2>
    <p>Eine neue <strong>Reservierungsanfrage</strong> wurde über die Webseite eingereicht. 
    Der Gast wurde informiert, dass dies <strong>keine Bestätigung</strong> ist und wartet auf Ihre Rückmeldung.</p>
    
    ${infoCard([
      { label: 'Name', value: he.encode(data.name) },
      { label: 'E-Mail', value: `<a href="mailto:${he.encode(data.email)}">${he.encode(data.email)}</a>` },
      { label: 'Telefon', value: `<a href="tel:${he.encode(data.phone)}">${he.encode(data.phone)}</a>` },
      { label: 'Gewünschtes Datum', value: he.encode(data.date) },
      { label: 'Gewünschte Uhrzeit', value: `${he.encode(data.time)} Uhr` },
      { label: 'Personen', value: he.encode(data.guests) },
      ...(data.message ? [{ label: 'Nachricht', value: he.encode(data.message) }] : []),
    ])}
    
    <p style="text-align: center; margin-top: 24px;">
      <a href="mailto:${data.email}?subject=Reservierungsbestätigung – Lindener Ratsstuben am ${data.date}&body=Sehr geehrte(r) ${data.name},%0A%0Awir freuen uns, Ihnen mitteilen zu können, dass Ihre Reservierung für ${data.guests} Personen am ${data.date} um ${data.time} Uhr bestätigt ist.%0A%0AWir freuen uns auf Ihren Besuch!%0A%0AMit freundlichen Grüßen,%0AIhr Team der Lindener Ratsstuben" class="cta-button">
        ✅ Reservierung bestätigen
      </a>
    </p>
    
    <p style="text-align: center; margin-top: 12px;">
      <a href="mailto:${data.email}?subject=Ihre Reservierungsanfrage bei Lindener Ratsstuben am ${data.date}" 
         style="color: #c5a028; text-decoration: underline; font-size: 14px;">
        Dem Gast antworten
      </a>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <a href="tel:${data.phone}" 
         style="color: #c5a028; text-decoration: underline; font-size: 14px;">
        Gast anrufen
      </a>
    </p>
  `;

  return baseLayout(
    content,
    `Neue Reservierungsanfrage: ${data.name} – ${data.guests} Pers. am ${data.date}`
  );
}
