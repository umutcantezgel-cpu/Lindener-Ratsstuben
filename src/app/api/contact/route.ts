/**
 * API-Route: Kontaktformular
 * POST /api/contact
 * 
 * Empfängt Kontaktanfragen, validiert mit Zod, persistiert in Sanity CMS,
 * und sendet professionelle E-Mails an den Gast und den Restaurantbesitzer.
 */
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/lib/sanity/env';
import { sendEmail, EMAIL_CONFIG } from '@/lib/email/resend-client';
import { contactGuestEmail } from '@/lib/email/templates/contact-guest';
import { contactAdminEmail } from '@/lib/email/templates/contact-admin';

// ═══ VALIDATION SCHEMA ═══
const contactSchema = z.object({
  name: z.string().min(2, 'Name ist erforderlich').max(80),
  email: z.string().email('Ungültige E-Mail-Adresse').max(120),
  subject: z.string().min(1, 'Betreff ist erforderlich').max(100),
  message: z.string().min(10, 'Nachricht muss mindestens 10 Zeichen lang sein').max(2000),
  privacy: z.literal(true).optional(), // Client sends this, we accept but don't require in API
});

// ═══ SIMPLE RATE LIMITER (In-Memory) ═══
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5;         // Max requests per window
const RATE_LIMIT_WINDOW = 60_000; // 1 minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// ═══ POST HANDLER ═══
export async function POST(request: Request) {
  try {
    // Rate Limiting
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check (spam bots fill hidden fields)
    if (body._honeypot || body._gotcha) {
      // Return fake success to not alert bots
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Zod validation
    const validatedData = contactSchema.parse(body);

    // ─── Sanity CMS Persistierung ───
    const SANITY_WRITE_TOKEN = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;
    if (SANITY_WRITE_TOKEN && projectId && dataset) {
      try {
        const mutationClient = createClient({
          projectId,
          dataset,
          apiVersion,
          useCdn: false,
          token: SANITY_WRITE_TOKEN,
        });

        await mutationClient.create({
          _type: 'contactMessage',
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject,
          message: validatedData.message,
          status: 'new',
          receivedAt: new Date().toISOString(),
        });
        console.info('[Contact] ✓ Nachricht in Sanity CMS gespeichert.');
      } catch (sanityError) {
        console.error('[Contact] ✗ Sanity-Fehler (E-Mail wird trotzdem gesendet):', sanityError);
      }
    }

    // ─── E-Mail-Versand ───
    // 1. Admin-Benachrichtigung
    const adminResult = await sendEmail({
      to: EMAIL_CONFIG.adminEmail,
      subject: `[Kontakt] ${validatedData.subject} – ${validatedData.name}`,
      html: contactAdminEmail({
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
      }),
      replyTo: validatedData.email,
    });

    // 2. Gast-Bestätigung
    const guestResult = await sendEmail({
      to: validatedData.email,
      subject: `Ihre Anfrage bei Lindener Ratsstuben – ${validatedData.subject}`,
      html: contactGuestEmail({
        name: validatedData.name,
        subject: validatedData.subject,
      }),
    });

    console.info(`[Contact] Admin-E-Mail: ${adminResult.success ? '✓' : '✗ ' + adminResult.error} | Gast-E-Mail: ${guestResult.success ? '✓' : '✗ ' + guestResult.error}`);

    // If both emails failed, inform the user
    if (!adminResult.success && !guestResult.success) {
      console.error('[Contact] ✗ Beide E-Mails fehlgeschlagen!');
      return NextResponse.json(
        { success: false, message: 'Ihre Nachricht konnte leider nicht verarbeitet werden. Bitte kontaktieren Sie uns telefonisch.' },
        { status: 500 }
      );
    }

    // IMPORTANT FIX: Wenn die Bestätigungs-E-Mail an den Gast fehlschlägt (oft wegen fehlender Domain-Verifizierung bei Resend),
    // benachrichtigen wir den Admin zusätzlich darüber, damit er den Kunden manuell kontaktieren kann.
    if (adminResult.success && !guestResult.success) {
        console.error(`[Contact] ✗ Gast-E-Mail fehlgeschlagen. Sende Warnung an Admin.`);
        await sendEmail({
            to: EMAIL_CONFIG.adminEmail,
            subject: `⚠️ ACHTUNG: System konnte keine Bestätigung an ${validatedData.name} senden!`,
            html: `<p>Hallo,</p>
                   <p>eine neue Kontaktanfrage von <strong>${validatedData.name}</strong> wurde empfangen, aber das System konnte dem Gast <strong>keine Bestätigungs-E-Mail</strong> senden.</p>
                   <p><strong>Fehlergrund:</strong> ${guestResult.error}</p>
                   <p>Wahrscheinlich muss die Domain in Resend noch verifiziert werden (DNS-Einträge), um E-Mails an beliebige Gäste senden zu dürfen.</p>
                   <p>Bitte kontaktieren Sie den Gast manuell:</p>
                   <ul>
                       <li>E-Mail: ${validatedData.email}</li>
                   </ul>`,
        });
    }

    return NextResponse.json({ success: true, warning: !guestResult.success ? 'guest_email_failed' : undefined }, { status: 200 });
  } catch (error) {
    console.error('[Contact] Fehler:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: 'Ungültige Daten', errors: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}
