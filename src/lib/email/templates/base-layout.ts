/**
 * Basis-Layout für alle E-Mail-Templates der Lindener Ratsstuben.
 * Professionelles HTML-E-Mail-Design mit Restaurant-Branding.
 */
import { EMAIL_CONFIG } from '../resend-client';

const { restaurant } = EMAIL_CONFIG;

// ═══ FARB-PALETTE (aus dem Restaurant-Design) ═══
const COLORS = {
  brand: '#6B4F3A',       // Warmes Braun (Primärfarbe)
  brandDark: '#4A3628',   // Dunkles Braun
  gold: '#B8965A',        // Gold-Akzent
  beige: '#F5F0E8',       // Hintergrund-Beige
  white: '#FFFFFF',
  textMain: '#2D2319',    // Haupttext
  textSecondary: '#6B6055', // Sekundärtext
  border: '#E8DFD4',      // Rahmenfarbe
} as const;

/**
 * Wraps email content in the branded restaurant layout.
 */
export function baseLayout(content: string, preheader?: string): string {
  return `
<!DOCTYPE html>
<html lang="de" dir="ltr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${restaurant.name}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    body { margin: 0; padding: 0; width: 100%; background-color: ${COLORS.beige}; font-family: 'Georgia', 'Times New Roman', serif; }
    .email-wrapper { width: 100%; background-color: ${COLORS.beige}; padding: 32px 16px; }
    .email-container { max-width: 600px; margin: 0 auto; background-color: ${COLORS.white}; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    .header { background-color: ${COLORS.brandDark}; padding: 32px 40px; text-align: center; }
    .header h1 { color: ${COLORS.white}; font-size: 28px; margin: 0 0 4px 0; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; }
    .header p { color: ${COLORS.gold}; font-size: 14px; margin: 0; letter-spacing: 3px; text-transform: uppercase; }
    .content { padding: 40px; color: ${COLORS.textMain}; font-size: 16px; line-height: 1.7; }
    .content h2 { color: ${COLORS.brand}; font-size: 22px; margin: 0 0 16px 0; }
    .content p { margin: 0 0 16px 0; }
    .info-card { background-color: ${COLORS.beige}; border-radius: 12px; padding: 24px; margin: 24px 0; border-left: 4px solid ${COLORS.gold}; }
    .info-card table { width: 100%; border-collapse: collapse; }
    .info-card td { padding: 8px 0; vertical-align: top; font-size: 15px; }
    .info-card td:first-child { color: ${COLORS.textSecondary}; width: 120px; font-weight: 600; }
    .info-card td:last-child { color: ${COLORS.textMain}; }
    .divider { border: none; border-top: 1px solid ${COLORS.border}; margin: 24px 0; }
    .footer { background-color: ${COLORS.beige}; padding: 24px 40px; text-align: center; font-size: 13px; color: ${COLORS.textSecondary}; }
    .footer a { color: ${COLORS.brand}; text-decoration: none; }
    .footer a:hover { text-decoration: underline; }
    .cta-button { display: inline-block; background-color: ${COLORS.brand}; color: ${COLORS.white} !important; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; margin: 8px 0; }
    @media only screen and (max-width: 600px) {
      .content { padding: 24px 20px !important; }
      .header { padding: 24px 20px !important; }
      .footer { padding: 20px !important; }
    }
  </style>
</head>
<body>
  ${preheader ? `<div style="display:none;font-size:1px;color:#f5f0e8;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preheader}</div>` : ''}
  <div class="email-wrapper">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center">
          <div class="email-container">
            <!-- Header -->
            <div class="header">
              <h1>${restaurant.name}</h1>
              <p>${restaurant.tagline}</p>
            </div>
            
            <!-- Content -->
            <div class="content">
              ${content}
            </div>
            
            <!-- Footer -->
            <div class="footer">
              <p style="margin: 0 0 8px 0;">
                <strong>${restaurant.name}</strong><br />
                ${restaurant.address}<br />
                Tel: ${restaurant.phone}
              </p>
              <p style="margin: 0 0 8px 0;">
                <a href="${restaurant.website}">${restaurant.website.replace('https://', '')}</a>
              </p>
              <p style="margin: 0; font-size: 11px; color: #999;">
                Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese Nachricht.
              </p>
            </div>
          </div>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`;
}

/**
 * Creates a formatted info-card block with key-value pairs.
 */
export function infoCard(items: Array<{ label: string; value: string }>): string {
  const rows = items
    .map(({ label, value }) => `<tr><td>${label}:</td><td>${value}</td></tr>`)
    .join('');
  return `<div class="info-card"><table>${rows}</table></div>`;
}
