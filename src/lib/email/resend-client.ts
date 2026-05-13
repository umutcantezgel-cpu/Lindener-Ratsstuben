/**
 * Zentraler Resend E-Mail-Client für Lindener Ratsstuben.
 * Wird von allen API-Routen (Kontakt + Reservierung) verwendet.
 */
import { Resend } from 'resend';

// ═══ SINGLETON CLIENT ═══
let resendInstance: Resend | null = null;

export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[Email] RESEND_API_KEY nicht konfiguriert. E-Mail-Versand deaktiviert.');
    return null;
  }
  if (!resendInstance) {
    resendInstance = new Resend(apiKey);
  }
  return resendInstance;
}

// ═══ KONFIGURATION ═══
export const EMAIL_CONFIG = {
  /** Verifizierte Absender-Adresse (Resend Domain) */
  from: process.env.RESEND_FROM_EMAIL || 'Lindener Ratsstuben <onboarding@resend.dev>',
  
  /** E-Mail-Adresse des Restaurantbesitzers */
  adminEmail: 'hasantoker3868@gmail.com', // Explicitly setting this as requested by the owner
  
  /** Restaurant-Daten für Templates */
  restaurant: {
    name: 'Lindener Ratsstuben',
    tagline: 'Deutsch-Italienische Küche',
    address: 'Konrad-Adenauer-Straße 26, 35440 Linden',
    phone: '06403 - 64556',
    email: 'hasantoker3868@gmail.com',
    website: 'https://www.lindener-ratsstuben.de',
  },
} as const;

// ═══ HELPER: E-Mail senden mit Logging ═══
interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail(params: SendEmailParams): Promise<{ success: boolean; error?: string }> {
  const client = getResendClient();
  if (!client) {
    console.warn('[Email] Kein Resend-Client verfügbar. E-Mail wurde NICHT gesendet:', params.subject);
    return { success: false, error: 'RESEND_API_KEY nicht konfiguriert' };
  }

  try {
    const toArray = Array.isArray(params.to) ? params.to : [params.to];
    const { data, error: resendError } = await client.emails.send({
      from: EMAIL_CONFIG.from,
      to: toArray,
      subject: params.subject,
      html: params.html,
      ...(params.replyTo ? { replyTo: params.replyTo } : {}),
    });

    // Resend SDK returns { data: null, error: {...} } on failure instead of throwing
    if (resendError) {
      console.error(`[Email] ✗ Resend API Fehler an ${toArray.join(', ')}: ${resendError.name} – ${resendError.message}`);
      return { success: false, error: `${resendError.name}: ${resendError.message}` };
    }

    console.info(`[Email] ✓ Gesendet an ${toArray.join(', ')}: "${params.subject}" (ID: ${data?.id})`);
    return { success: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unbekannter Fehler';
    console.error(`[Email] ✗ Fehler beim Senden an ${params.to}: ${message}`);
    return { success: false, error: message };
  }
}
