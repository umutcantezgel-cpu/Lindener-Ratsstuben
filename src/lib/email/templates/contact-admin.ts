/**
 * Kontaktformular — Admin-Benachrichtigung an den Restaurantbesitzer.
 */
import { baseLayout, infoCard } from './base-layout';

interface ContactAdminData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function contactAdminEmail(data: ContactAdminData): string {
  const content = `
    <h2>📩 Neue Kontaktanfrage</h2>
    <p>Über das Kontaktformular der Webseite wurde eine neue Nachricht eingereicht:</p>
    
    ${infoCard([
      { label: 'Name', value: data.name },
      { label: 'E-Mail', value: `<a href="mailto:${data.email}">${data.email}</a>` },
      { label: 'Betreff', value: data.subject },
    ])}
    
    <div style="background-color: #F5F0E8; border-radius: 12px; padding: 24px; margin: 24px 0;">
      <p style="margin: 0 0 8px 0; font-weight: 600; color: #6B6055;">Nachricht:</p>
      <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
    </div>
    
    <p style="text-align: center; margin-top: 24px;">
      <a href="mailto:${data.email}?subject=Re: ${data.subject} – Lindener Ratsstuben" class="cta-button">
        Dem Absender antworten
      </a>
    </p>
  `;

  return baseLayout(
    content,
    `Kontaktanfrage von ${data.name}: ${data.subject}`
  );
}
