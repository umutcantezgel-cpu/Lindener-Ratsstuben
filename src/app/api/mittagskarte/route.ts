/**
 * API-Route: Mittagskarte Upload & Abruf
 * 
 * POST /api/mittagskarte — Upload einer .docx Datei (passwortgeschützt + Rate-Limited)
 * GET  /api/mittagskarte — Aktuelle Mittagskarte abrufen (öffentlich)
 * DELETE /api/mittagskarte — Mittagskarte löschen (passwortgeschützt + Rate-Limited)
 * 
 * SICHERHEIT:
 * - Passwort wird server-seitig gegen ADMIN_UPLOAD_SECRET validiert
 * - Rate-Limiting: Max. 5 Fehlversuche pro IP innerhalb 15 Minuten → danach 30 Min. Sperre
 * - Timing-sichere Passwort-Vergleich (verhindert Timing-Attacken)
 * - Nur .docx-Dateien erlaubt, max. 5 MB
 * - HTTPS erzwungen durch Vercel
 */
import { NextRequest, NextResponse } from 'next/server';
import { put, head, del, list } from '@vercel/blob';
import mammoth from 'mammoth';
import { timingSafeEqual } from 'crypto';
import DOMPurify from 'isomorphic-dompurify';

const BLOB_KEY = 'mittagskarte/current.json';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// ═══ RATE LIMITING (In-Memory, resets on deploy) ═══
const MAX_FAILED_ATTEMPTS = 5;
const BLOCK_WINDOW_MS = 15 * 60 * 1000; // 15 Minuten Tracking-Fenster
const LOCKOUT_DURATION_MS = 30 * 60 * 1000; // 30 Minuten Sperre nach zu vielen Fehlversuchen

interface RateLimitEntry {
  attempts: number;
  firstAttempt: number;
  lockedUntil: number | null;
}

const failedAttempts = new Map<string, RateLimitEntry>();

// Alte Einträge regelmäßig aufräumen (Speicher-Leak verhindern)
function cleanupOldEntries() {
  const now = Date.now();
  for (const [ip, entry] of failedAttempts.entries()) {
    const isExpired = (now - entry.firstAttempt) > LOCKOUT_DURATION_MS * 2;
    const isUnlocked = entry.lockedUntil && now > entry.lockedUntil;
    if (isExpired || (isUnlocked && entry.attempts === 0)) {
      failedAttempts.delete(ip);
    }
  }
}

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() 
    || request.headers.get('x-real-ip') 
    || 'unknown';
}

function isRateLimited(ip: string): { blocked: boolean; remainingMinutes?: number } {
  const entry = failedAttempts.get(ip);
  if (!entry) return { blocked: false };

  const now = Date.now();

  // Ist die IP gesperrt?
  if (entry.lockedUntil && now < entry.lockedUntil) {
    const remainingMs = entry.lockedUntil - now;
    return { blocked: true, remainingMinutes: Math.ceil(remainingMs / 60000) };
  }

  // Sperre abgelaufen → Reset
  if (entry.lockedUntil && now >= entry.lockedUntil) {
    failedAttempts.delete(ip);
    return { blocked: false };
  }

  // Fenster abgelaufen → Reset
  if ((now - entry.firstAttempt) > BLOCK_WINDOW_MS) {
    failedAttempts.delete(ip);
    return { blocked: false };
  }

  return { blocked: false };
}

function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const entry = failedAttempts.get(ip);

  if (!entry) {
    failedAttempts.set(ip, { attempts: 1, firstAttempt: now, lockedUntil: null });
    return;
  }

  entry.attempts++;

  if (entry.attempts >= MAX_FAILED_ATTEMPTS) {
    entry.lockedUntil = now + LOCKOUT_DURATION_MS;
    console.warn(`[Mittagskarte] 🔒 IP ${ip} gesperrt nach ${entry.attempts} Fehlversuchen für ${LOCKOUT_DURATION_MS / 60000} Minuten`);
  }
}

function recordSuccessfulAttempt(ip: string): void {
  failedAttempts.delete(ip);
}

// ═══ SICHERE AUTH-VALIDIERUNG ═══

function getUploadSecret(): string {
  const secret = process.env.ADMIN_UPLOAD_SECRET;
  if (!secret) {
    console.error('[Mittagskarte] KRITISCH: ADMIN_UPLOAD_SECRET nicht konfiguriert!');
    // Wenn kein Secret konfiguriert → KEIN Zugang möglich (Fail-Secure)
    return '';
  }
  return secret;
}

/**
 * Timing-sichere Passwort-Validierung.
 * Verhindert Timing-Angriffe, bei denen ein Angreifer anhand der Antwortzeit
 * Rückschlüsse auf die Korrektheit einzelner Zeichen ziehen könnte.
 */
function validateAuth(request: NextRequest): boolean {
  const providedSecret = request.headers.get('x-upload-secret') || '';
  const expectedSecret = getUploadSecret();

  // Kein Secret konfiguriert → immer blockieren
  if (!expectedSecret) return false;
  
  // Leeres Passwort → sofort ablehnen
  if (!providedSecret) return false;

  // Timing-sicherer Vergleich
  try {
    const providedBuffer = Buffer.from(providedSecret, 'utf-8');
    const expectedBuffer = Buffer.from(expectedSecret, 'utf-8');
    
    // Gleiche Länge erzwingen für timingSafeEqual
    if (providedBuffer.length !== expectedBuffer.length) {
      // Trotzdem einen Vergleich durchführen um konstante Zeit zu gewährleisten
      const paddedProvided = Buffer.alloc(expectedBuffer.length);
      providedBuffer.copy(paddedProvided, 0, 0, Math.min(providedBuffer.length, expectedBuffer.length));
      timingSafeEqual(paddedProvided, expectedBuffer);
      return false;
    }
    
    return timingSafeEqual(providedBuffer, expectedBuffer);
  } catch {
    return false;
  }
}

interface MittagskarteData {
  html: string;
  uploadedAt: string;
  fileName: string;
  uploadDate: string;
}

// ═══ GET: Aktuelle Mittagskarte abrufen (ÖFFENTLICH) ═══
export async function GET() {
  try {
    const blobInfo = await head(BLOB_KEY, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }).catch(() => null);

    if (!blobInfo) {
      return NextResponse.json(
        { active: false, message: 'Keine Mittagskarte vorhanden' },
        { 
          status: 200,
          headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' },
        }
      );
    }

    const response = await fetch(blobInfo.url, {
      headers: {
        Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
      },
    });
    const data: MittagskarteData = await response.json();

    return NextResponse.json(
      { active: true, ...data },
      { 
        status: 200,
        headers: { 'Cache-Control': 'public, max-age=60, stale-while-revalidate=300' },
      }
    );
  } catch (error) {
    console.error('[Mittagskarte] GET Fehler:', error);
    return NextResponse.json(
      { active: false, error: 'Fehler beim Laden der Mittagskarte' },
      { status: 500 }
    );
  }
}

// ═══ POST: Word-Datei hochladen & konvertieren (GESCHÜTZT) ═══
export async function POST(request: NextRequest) {
  const clientIP = getClientIP(request);
  
  // Alte Einträge aufräumen
  cleanupOldEntries();

  // Rate-Limit prüfen
  const rateLimit = isRateLimited(clientIP);
  if (rateLimit.blocked) {
    console.warn(`[Mittagskarte] ⛔ Blockierter Zugriffsversuch von IP: ${clientIP}`);
    return NextResponse.json(
      { error: `Zu viele Fehlversuche. Bitte warten Sie ${rateLimit.remainingMinutes} Minuten.` },
      { status: 429 }
    );
  }

  // Auth prüfen
  if (!validateAuth(request)) {
    recordFailedAttempt(clientIP);
    const entry = failedAttempts.get(clientIP);
    const remaining = MAX_FAILED_ATTEMPTS - (entry?.attempts || 0);
    
    console.warn(`[Mittagskarte] ❌ Fehlgeschlagener Login von IP: ${clientIP} (${entry?.attempts || 1}/${MAX_FAILED_ATTEMPTS})`);
    
    return NextResponse.json(
      { 
        error: 'Nicht autorisiert. Falsches Passwort.',
        ...(remaining > 0 ? { hint: `Noch ${remaining} Versuch(e) bevor Ihr Zugang gesperrt wird.` } : {}),
      },
      { status: 401 }
    );
  }

  // Erfolgreiche Auth → Counter zurücksetzen
  recordSuccessfulAttempt(clientIP);

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'Keine Datei hochgeladen.' },
        { status: 400 }
      );
    }

    // Dateityp validieren
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.docx')) {
      return NextResponse.json(
        { error: 'Nur .docx-Dateien sind erlaubt.' },
        { status: 400 }
      );
    }

    // MIME-Type prüfen (zusätzliche Sicherheitsschicht)
    const validMimeTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/octet-stream', // Manche Browser senden diesen generischen Typ
    ];
    if (file.type && !validMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Ungültiger Dateityp. Nur Word-Dokumente (.docx) sind erlaubt.' },
        { status: 400 }
      );
    }

    // Dateigröße prüfen
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `Datei zu groß. Maximum: ${MAX_FILE_SIZE / 1024 / 1024} MB.` },
        { status: 400 }
      );
    }

    // .docx → HTML konvertieren
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const result = await mammoth.convertToHtml(
      { buffer },
      {
        styleMap: [
          "p[style-name='Heading 1'] => h2.mittagskarte-heading:fresh",
          "p[style-name='Heading 2'] => h3.mittagskarte-subheading:fresh",
          "b => strong",
          "i => em",
          "u => span.underline",
        ],
      }
    );

    if (result.messages.length > 0) {
      console.warn('[Mittagskarte] Konvertierungs-Warnungen:', result.messages);
    }

    // HTML sanitizen: Nur sichere Tags erlauben (XSS-Schutz)
    const sanitizedHtml = DOMPurify.sanitize(result.value, {
      ALLOWED_TAGS: ['h2', 'h3', 'p', 'strong', 'em', 'span', 'br', 'ul', 'li', 'ol'],
      ALLOWED_ATTR: ['class']
    });

    // Vorherige Version löschen
    try {
      const existingBlobs = await list({
        prefix: 'mittagskarte/',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
      
      for (const blob of existingBlobs.blobs) {
        await del(blob.url, { token: process.env.BLOB_READ_WRITE_TOKEN });
      }
    } catch {
      // Ignorieren wenn keine vorherige Version existiert
    }

    // Neue Version speichern
    const now = new Date();
    const mittagskarteData: MittagskarteData = {
      html: sanitizedHtml,
      uploadedAt: now.toISOString(),
      fileName: file.name,
      uploadDate: now.toLocaleDateString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };

    await put(BLOB_KEY, JSON.stringify(mittagskarteData), {
      access: 'private',
      contentType: 'application/json',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: false,
    });

    console.info(`[Mittagskarte] ✓ Neue Mittagskarte hochgeladen von IP ${clientIP}: ${file.name}`);

    return NextResponse.json({
      success: true,
      message: 'Mittagskarte erfolgreich aktualisiert!',
      uploadDate: mittagskarteData.uploadDate,
      html: sanitizedHtml,
    });
  } catch (error) {
    console.error('[Mittagskarte] Upload-Fehler:', error);
    const message = error instanceof Error ? error.message : 'Unbekannter Fehler';
    return NextResponse.json(
      { error: `Upload fehlgeschlagen: ${message}` },
      { status: 500 }
    );
  }
}

// ═══ DELETE: Mittagskarte entfernen (GESCHÜTZT) ═══
export async function DELETE(request: NextRequest) {
  const clientIP = getClientIP(request);

  // Rate-Limit prüfen
  cleanupOldEntries();
  const rateLimit = isRateLimited(clientIP);
  if (rateLimit.blocked) {
    return NextResponse.json(
      { error: `Zu viele Fehlversuche. Bitte warten Sie ${rateLimit.remainingMinutes} Minuten.` },
      { status: 429 }
    );
  }

  if (!validateAuth(request)) {
    recordFailedAttempt(clientIP);
    return NextResponse.json(
      { error: 'Nicht autorisiert. Falsches Passwort.' },
      { status: 401 }
    );
  }

  recordSuccessfulAttempt(clientIP);

  try {
    const existingBlobs = await list({
      prefix: 'mittagskarte/',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    for (const blob of existingBlobs.blobs) {
      await del(blob.url, { token: process.env.BLOB_READ_WRITE_TOKEN });
    }

    console.info(`[Mittagskarte] ✓ Mittagskarte gelöscht von IP: ${clientIP}`);

    return NextResponse.json({
      success: true,
      message: 'Mittagskarte wurde entfernt.',
    });
  } catch (error) {
    console.error('[Mittagskarte] Lösch-Fehler:', error);
    return NextResponse.json(
      { error: 'Fehler beim Löschen der Mittagskarte.' },
      { status: 500 }
    );
  }
}
