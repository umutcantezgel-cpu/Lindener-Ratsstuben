/**
 * Reservierung — Admin-Benachrichtigung an den Restaurantbesitzer.
 */
import { baseLayout, infoCard } from './base-layout';

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
    <p>Eine neue Reservierung wurde über die Webseite eingereicht:</p>
    
    ${infoCard([
      { label: 'Name', value: data.name },
      { label: 'E-Mail', value: `<a href="mailto:${data.email}">${data.email}</a>` },
      { label: 'Telefon', value: `<a href="tel:${data.phone}">${data.phone}</a>` },
      { label: 'Datum', value: data.date },
      { label: 'Uhrzeit', value: `${data.time} Uhr` },
      { label: 'Personen', value: data.guests },
      ...(data.message ? [{ label: 'Nachricht', value: data.message }] : []),
    ])}
    
    <p style="text-align: center; margin-top: 24px;">
      <a href="mailto:${data.email}?subject=Ihre Reservierung bei Lindener Ratsstuben am ${data.date}" class="cta-button">
        Dem Gast antworten
      </a>
    </p>
  `;

  return baseLayout(
    content,
    `Neue Reservierung: ${data.name} – ${data.guests} Pers. am ${data.date}`
  );
}
