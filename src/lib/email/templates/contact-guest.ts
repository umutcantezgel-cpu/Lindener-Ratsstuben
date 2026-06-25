/**
 * Kontaktformular — Bestätigungs-E-Mail an den Absender.
 */
import { baseLayout } from './base-layout';

interface ContactGuestData {
  name: string;
  subject: string;
}

export function contactGuestEmail(data: ContactGuestData): string {
  const content = `
    <h2>Vielen Dank für Ihre Nachricht, ${data.name}!</h2>
    <p>Wir haben Ihre Anfrage zum Thema <strong>„${data.subject}"</strong> erhalten und werden uns schnellstmöglich bei Ihnen melden.</p>
    
    <p>In der Regel antworten wir innerhalb von <strong>24 Stunden</strong> während unserer Öffnungszeiten.</p>
    
    <hr class="divider" />
    
    <p>Sie erreichen uns auch direkt:</p>
    <ul style="padding-left: 20px; color: #6B6055;">
      <li>Telefonisch: <strong>06403 - 64556</strong></li>
      <li>Öffnungszeiten: Di–Sa 12:00–14:30 & 17:30–22:00 Uhr, So 12:00–14:30 & 17:30–21:00 Uhr</li>
    </ul>
    
    <p style="margin-top: 24px;">
      Mit herzlichen Grüßen,<br />
      <strong>Ihr Team der Lindener Ratsstuben</strong>
    </p>
  `;

  return baseLayout(
    content,
    `Wir haben Ihre Nachricht erhalten – ${data.subject}`
  );
}
