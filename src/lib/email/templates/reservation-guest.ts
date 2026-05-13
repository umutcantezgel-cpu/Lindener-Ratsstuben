/**
 * Reservierung — Bestätigungs-E-Mail an den Gast.
 */
import { baseLayout, infoCard } from './base-layout';

interface ReservationGuestData {
  name: string;
  date: string;
  time: string;
  guests: string;
  message?: string;
}

export function reservationGuestEmail(data: ReservationGuestData): string {
  const content = `
    <h2>Vielen Dank, ${data.name}!</h2>
    <p>Wir haben Ihre Reservierungsanfrage erhalten und freuen uns, Sie bei uns begrüßen zu dürfen.</p>
    
    ${infoCard([
      { label: 'Datum', value: data.date },
      { label: 'Uhrzeit', value: `${data.time} Uhr` },
      { label: 'Personen', value: data.guests },
      ...(data.message ? [{ label: 'Nachricht', value: data.message }] : []),
    ])}
    
    <p><strong>Bitte beachten Sie:</strong> Dies ist eine <em>Anfrage</em>. Wir werden uns schnellstmöglich bei Ihnen melden, um Ihre Reservierung verbindlich zu bestätigen.</p>
    
    <hr class="divider" />
    
    <p>Bei Fragen oder Änderungswünschen erreichen Sie uns telefonisch unter <strong>06403 - 64556</strong> oder per E-Mail.</p>
    
    <p style="margin-top: 24px;">
      Mit herzlichen Grüßen,<br />
      <strong>Ihr Team der Lindener Ratsstuben</strong>
    </p>
  `;

  return baseLayout(
    content,
    `Ihre Reservierung für ${data.guests} Personen am ${data.date} um ${data.time} Uhr`
  );
}
