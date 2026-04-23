import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/lib/sanity/env';

const reservationSchema = z.object({
    name: z.string().min(2).max(80),
    email: z.string().email().max(120),
    phone: z.string().min(5).max(25),
    date: z.string().min(1),
    time: z.string().min(1),
    guests: z.string().min(1),
    message: z.string().max(500).optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        // Zod validation (Backend Security)
        const validatedData = reservationSchema.parse(body);

        // Honeypot Simulation: Wenn Honeypot Felder existieren, lehnen wir direkt ab.
        if (body._honeypot_address && body._honeypot_address.length > 0) {
            return NextResponse.json({ success: true, message: "Honeypot Triggered. Fake Success." }, { status: 200 });
        }

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
                // Reservation persisted to Sanity CMS
            } catch (sanityError) {
                console.error("Failed to save reservation to Sanity:", sanityError);
                // We don't block the email process if DB save fails
            }
        } else {
            console.warn("Sanity Write Token is missing. Reservation was NOT saved to database.");
        }

        const RESEND_API_KEY = process.env.RESEND_API_KEY;

        // If Resend is configured, we send an email
        if (RESEND_API_KEY) {
            const resend = new Resend(RESEND_API_KEY);

            // Notify Admin
            await resend.emails.send({
                from: 'Reservierungssystem <onboarding@resend.dev>', // Should be a verified domain in prod
                to: [process.env.ADMIN_EMAIL || 'info@lindener-ratsstuben.de'],
                replyTo: validatedData.email,
                subject: `Neue Reservierung: ${validatedData.name} am ${validatedData.date} um ${validatedData.time}`,
                html: `
                    <h2>Neue Reservierungsanfrage</h2>
                    <p><strong>Name:</strong> ${validatedData.name}</p>
                    <p><strong>Email:</strong> ${validatedData.email}</p>
                    <p><strong>Telefon:</strong> ${validatedData.phone}</p>
                    <p><strong>Datum:</strong> ${validatedData.date}</p>
                    <p><strong>Uhrzeit:</strong> ${validatedData.time}</p>
                    <p><strong>Gäste:</strong> ${validatedData.guests}</p>
                    <p><strong>Nachricht:</strong><br/>${validatedData.message || '-'}</p>
                `,
            });
            
            // Notify Customer (Confirmation)
            await resend.emails.send({
                from: 'Lindener Ratsstuben <onboarding@resend.dev>',
                to: [validatedData.email],
                subject: `Ihre Reservierungsanfrage bei Lindener Ratsstuben`,
                html: `
                    <h2>Vielen Dank für Ihre Reservierungsanfrage, ${validatedData.name}!</h2>
                    <p>Wir haben Ihre Anfrage für <strong>${validatedData.guests} Personen</strong> am <strong>${validatedData.date}</strong> um <strong>${validatedData.time} Uhr</strong> erhalten.</p>
                    <p>Bitte beachten Sie, dass dies eine <strong>Anfrage</strong> ist. Wir werden uns umgehend bei Ihnen melden, um die Reservierung verbindlich zu bestätigen.</p>
                    <br/>
                    <p>Mit freundlichen Grüßen,</p>
                    <p>Ihr Team der Lindener Ratsstuben</p>
                `,
            });
        } else {
            console.warn("RESEND_API_KEY is not configured. Falling back to log-only mode.");

        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error("Reservation Error:", error);
        
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, message: 'Invalid data', errors: error.issues }, { status: 400 });
        }
        
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
