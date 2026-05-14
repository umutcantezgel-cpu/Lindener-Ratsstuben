/**
 * API-Route: Mittagskarte Upload & Abruf
 * 
 * POST /api/mittagskarte — Upload einer .docx Datei (passwortgeschützt)
 * GET  /api/mittagskarte — Aktuelle Mittagskarte abrufen (öffentlich)
 * DELETE /api/mittagskarte — Mittagskarte löschen (passwortgeschützt)
 */
import { NextRequest, NextResponse } from 'next/server';
import { put, head, del, list } from '@vercel/blob';
import mammoth from 'mammoth';

const BLOB_KEY = 'mittagskarte/current.json';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

// ═══ HILFSFUNKTIONEN ═══

function getUploadSecret(): string {
  return process.env.ADMIN_UPLOAD_SECRET || 'Lindener2024!';
}

function validateAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('x-upload-secret');
  return authHeader === getUploadSecret();
}

interface MittagskarteData {
  html: string;
  uploadedAt: string;
  fileName: string;
  uploadDate: string; // Nur das Datum (YYYY-MM-DD)
}

// ═══ GET: Aktuelle Mittagskarte abrufen ═══
export async function GET() {
  try {
    // Versuche den Blob zu lesen
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

    // Blob-Inhalt fetchen
    const response = await fetch(blobInfo.url);
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

// ═══ POST: Word-Datei hochladen & konvertieren ═══
export async function POST(request: NextRequest) {
  // Auth prüfen
  if (!validateAuth(request)) {
    return NextResponse.json(
      { error: 'Nicht autorisiert. Falsches Passwort.' },
      { status: 401 }
    );
  }

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

    // Vorherige Version löschen (falls vorhanden)
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
      html: result.value,
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
      access: 'public',
      contentType: 'application/json',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      addRandomSuffix: false,
    });

    console.info(`[Mittagskarte] ✓ Neue Mittagskarte hochgeladen: ${file.name}`);

    return NextResponse.json({
      success: true,
      message: 'Mittagskarte erfolgreich aktualisiert!',
      uploadDate: mittagskarteData.uploadDate,
      html: result.value,
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

// ═══ DELETE: Mittagskarte entfernen ═══
export async function DELETE(request: NextRequest) {
  if (!validateAuth(request)) {
    return NextResponse.json(
      { error: 'Nicht autorisiert. Falsches Passwort.' },
      { status: 401 }
    );
  }

  try {
    const existingBlobs = await list({
      prefix: 'mittagskarte/',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    for (const blob of existingBlobs.blobs) {
      await del(blob.url, { token: process.env.BLOB_READ_WRITE_TOKEN });
    }

    console.info('[Mittagskarte] ✓ Mittagskarte gelöscht');

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
