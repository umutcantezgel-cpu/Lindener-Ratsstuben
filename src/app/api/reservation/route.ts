/** 
 * API-Route: Reservierungssystem
 * POST /api/reservation
 * 
 * Empfängt Reservierungsanfragen, validiert mit Zod, persistiert in Sanity CMS,
 * und sendet professionelle E-Mails an den Gast und den Restaurantbesitzer.
 */
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/lib/sanity/env';
import { sendEmail, EMAIL_CONFIG } from '@/lib/email/resend-client';
import { reservationGuestEmail } from '@/lib/email/templates/reservation-guest';
import { reservationAdminEmail } from '@/lib/email/templates/reservation-admin';

const reservationSchema = z.object({
    name: z.string().min(2).max(80),
    email: z.string().email().max(120),
    phone: z.string().min(5).max(25),
    date: z.string().min(1).refine((val) => {
        const [year, month, day] = val.split('-').map(Number);
        const selected = new Date(year, month - 1, day);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        return selected >= tomorrow;
    }, { message: "Reservierungen sind erst ab dem morgigen Tag möglich." }),
    time: z.string().min(1),
    guests: z.string().min(1),
    message: z.string().max(500).optional(),
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
        
        // Zod validation (Backend Security)
        const validatedData = reservationSchema.parse(body);

        // Honeypot Simulation: Wenn Honeypot Felder existieren, lehnen wir direkt ab.
        if (body._honeypot_address && body._honeypot_address.length > 0) {
            return NextResponse.json({ success: true, message: "Honeypot Triggered. Fake Success." }, { status: 200 });
        }

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
                    _type: 'reservation',
                    name: validatedData.name,
                    email: validatedData.email,
                    phone: validatedData.phone,
                    date: validatedData.date,
                    time: validatedData.time,
                    guests: validatedData.guests,
                    message: validatedData.message || '',
                    status: 'new'
                });
                console.info('[Reservation] ✓ In Sanity CMS gespeichert.');
            } catch (sanityError) {
                console.error('[Reservation] ✗ Sanity-Fehler (E-Mail wird trotzdem gesendet):', sanityError);
                // We don't block the email process if DB save fails
            }
        } else {
            console.warn('[Reservation] Sanity Write Token fehlt. Reservierung wurde NICHT in der Datenbank gespeichert.');
        }

        // ─── E-Mail-Versand mit professionellen Templates ───
        // 1. Admin-Benachrichtigung
        const adminResult = await sendEmail({
            to: EMAIL_CONFIG.adminEmail,
            subject: `Neue Reservierung: ${validatedData.name} – ${validatedData.guests} Pers. am ${validatedData.date}`,
            html: reservationAdminEmail({
                name: validatedData.name,
                email: validatedData.email,
                phone: validatedData.phone,
                date: validatedData.date,
                time: validatedData.time,
                guests: validatedData.guests,
                message: validatedData.message,
            }),
            replyTo: validatedData.email,
        });

        // 2. Gast-Bestätigung
        const guestResult = await sendEmail({
            to: validatedData.email,
            subject: `Ihre Reservierungsanfrage bei Lindener Ratsstuben`,
            html: reservationGuestEmail({
                name: validatedData.name,
                date: validatedData.date,
                time: validatedData.time,
                guests: validatedData.guests,
                message: validatedData.message,
            }),
        });

        console.info(`[Reservation] Admin-E-Mail: ${adminResult.success ? '✓' : '✗'} | Gast-E-Mail: ${guestResult.success ? '✓' : '✗'}`);

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('[Reservation] Fehler:', error);
        
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, message: 'Invalid data', errors: error.issues }, { status: 400 });
        }
        
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
