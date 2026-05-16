/**
 * Reservierung — Eingangsbestätigung an den Gast.
 * HINWEIS: Dies ist KEINE Reservierungsbestätigung, sondern nur eine Bestätigung
 * dass die Anfrage eingegangen ist. Das Restaurant bestätigt die Reservierung separat.
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
    <h2>Vielen Dank für Ihre Anfrage, ${data.name}!</h2>
    <p>Wir haben Ihre <strong>Reservierungsanfrage</strong> erhalten und werden diese schnellstmöglich prüfen.</p>
    
    ${infoCard([
      { label: 'Gewünschtes Datum', value: data.date },
      { label: 'Gewünschte Uhrzeit', value: `${data.time} Uhr` },
      { label: 'Personen', value: data.guests },
      ...(data.message ? [{ label: 'Ihre Nachricht', value: data.message }] : []),
    ])}
    
    <div style="background: #fff8e1; border-left: 4px solid #c5a028; padding: 16px 20px; border-radius: 8px; margin: 24px 0;">
      <p style="margin: 0; font-size: 14px; color: #5d4e37;">
        <strong>⚠️ Wichtiger Hinweis:</strong> Dies ist <strong>keine Reservierungsbestätigung</strong>, 
        sondern lediglich eine Eingangsbestätigung Ihrer Anfrage. Unser Team wird sich 
        zeitnah bei Ihnen melden, um Ihre Reservierung <strong>verbindlich zu bestätigen</strong> 
        oder bei Rückfragen Kontakt aufzunehmen.
      </p>
    </div>
    
    <hr class="divider" />
    
    <p>Bei dringenden Fragen oder Änderungswünschen erreichen Sie uns telefonisch unter <strong>06403 - 64556</strong> oder per E-Mail.</p>
    
    <p style="margin-top: 24px;">
      Mit herzlichen Grüßen,<br />
      <strong>Ihr Team der Lindener Ratsstuben</strong>
    </p>
  `;

  return baseLayout(
    content,
    `Ihre Reservierungsanfrage für ${data.guests} Personen am ${data.date} um ${data.time} Uhr – Eingangsbestätigung`
  );
}
