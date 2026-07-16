'use client';

import React, { useState, useCallback, useRef } from 'react';

interface MittagskarteResponse {
  active?: boolean;
  fileUrl?: string;
  uploadDate?: string;
  fileName?: string;
  success?: boolean;
  message?: string;
  error?: string;
  hint?: string;
}

export default function MittagskarteAdminPage() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentMenu, setCurrentMenu] = useState<MittagskarteResponse | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ═══ Login – Passwort server-seitig validieren ═══
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;

    setIsLoggingIn(true);
    setLoginError(null);

    try {
      // Passwort über eine Test-Anfrage validieren
      // Wir senden eine leere POST-Anfrage ohne Datei — der Server prüft das Passwort
      // und gibt 401 zurück wenn es falsch ist, oder 400 wenn keine Datei vorhanden ist (= Passwort korrekt)
      const formData = new FormData();
      const res = await fetch('/api/mittagskarte', {
        method: 'POST',
        headers: { 'x-upload-secret': password },
        body: formData,
      });

      if (res.status === 401) {
        // Falsches Passwort
        const data: MittagskarteResponse = await res.json();
        const msg = data.hint 
          ? `${data.error} ${data.hint}`
          : data.error || 'Falsches Passwort.';
        setLoginError(msg);
        return;
      }
      
      if (res.status === 429) {
        // Rate-Limited (zu viele Fehlversuche)
        const data: MittagskarteResponse = await res.json();
        setLoginError(data.error || 'Zu viele Fehlversuche. Bitte warten.');
        return;
      }

      // Status 400 = "Keine Datei" → Passwort war korrekt!
      // Status 200 = auch OK
      setIsAuthenticated(true);
      await loadCurrentMenu();
    } catch {
      setLoginError('Verbindungsfehler. Bitte erneut versuchen.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // ═══ Aktuelle Mittagskarte laden ═══
  const loadCurrentMenu = async () => {
    try {
      const res = await fetch('/api/mittagskarte');
      const data: MittagskarteResponse = await res.json();
      setCurrentMenu(data);
      if (data.active && data.fileUrl) {
        setPreviewUrl(data.fileUrl);
      }
    } catch {
      console.error('Fehler beim Laden der aktuellen Mittagskarte');
    }
  };

  // ═══ Datei hochladen ═══
  const uploadFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setStatusMessage({ type: 'error', text: 'Nur .pdf-Dateien sind erlaubt!' });
      return;
    }

    setIsUploading(true);
    setStatusMessage(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/mittagskarte', {
        method: 'POST',
        headers: { 'x-upload-secret': password },
        body: formData,
      });

      const data: MittagskarteResponse = await res.json();

      if (res.ok && data.success) {
        setStatusMessage({ type: 'success', text: data.message || 'Mittagskarte erfolgreich hochgeladen!' });
        setPreviewUrl(data.fileUrl || null);
        await loadCurrentMenu();
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Upload fehlgeschlagen.' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Netzwerkfehler. Bitte erneut versuchen.' });
    } finally {
      setIsUploading(false);
    }
  };

  // ═══ Mittagskarte löschen ═══
  const handleDelete = async () => {
    if (!confirm('Mittagskarte wirklich löschen?')) return;

    setIsDeleting(true);
    try {
      const res = await fetch('/api/mittagskarte', {
        method: 'DELETE',
        headers: { 'x-upload-secret': password },
      });

      const data: MittagskarteResponse = await res.json();

      if (res.ok && data.success) {
        setStatusMessage({ type: 'success', text: 'Mittagskarte wurde entfernt.' });
        setPreviewUrl(null);
        setCurrentMenu(null);
      } else {
        setStatusMessage({ type: 'error', text: data.error || 'Löschen fehlgeschlagen.' });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'Netzwerkfehler.' });
    } finally {
      setIsDeleting(false);
    }
  };

  // ═══ Drag & Drop Handler ═══
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    // Reset input so same file can be re-uploaded
    e.target.value = '';
  };

  // ═══ LOGIN SCREEN ═══
  if (!isAuthenticated) {
    return (
      <div style={styles.page}>
        <div style={styles.loginCard}>
          <div style={styles.logo}>🍽️</div>
          <h1 style={styles.title}>Mittagskarte verwalten</h1>
          <p style={styles.subtitle}>Lindener Ratsstuben – Admin-Bereich</p>
          <form onSubmit={handleLogin} style={styles.form}>
            {loginError && (
              <div style={{
                background: '#f8d7da',
                color: '#721c24',
                border: '1px solid #f5c6cb',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                textAlign: 'center' as const,
              }}>
                🔒 {loginError}
              </div>
            )}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passwort eingeben"
              style={styles.input}
              disabled={isLoggingIn}
            />
            <button 
              type="submit" 
              style={{
                ...styles.btnPrimary,
                opacity: isLoggingIn ? 0.6 : 1,
                cursor: isLoggingIn ? 'wait' : 'pointer',
              }}
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Wird geprüft...' : 'Anmelden'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ═══ ADMIN DASHBOARD ═══
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.logo}>🍽️</div>
          <h1 style={styles.title}>Mittagskarte verwalten</h1>
          <p style={styles.subtitle}>
            Laden Sie hier die tägliche Mittagskarte als PDF-Dokument (.pdf) hoch.
            <br />Die aktuelle Karte wird automatisch ersetzt.
          </p>
        </header>

        {/* Status Badge */}
        {currentMenu?.active && (
          <div style={styles.statusBadge}>
            <span style={styles.statusDot}>●</span>
            Aktuelle Mittagskarte: <strong>{currentMenu.uploadDate}</strong>
            {currentMenu.fileName && <span style={styles.fileName}> ({currentMenu.fileName})</span>}
          </div>
        )}

        {/* Status Message */}
        {statusMessage && (
          <div style={{
            ...styles.alert,
            background: statusMessage.type === 'success' ? '#d4edda' : '#f8d7da',
            color: statusMessage.type === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${statusMessage.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
          }}>
            {statusMessage.type === 'success' ? '✅' : '❌'} {statusMessage.text}
          </div>
        )}

        {/* Upload Zone */}
        <button
          type="button"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            ...styles.dropZone,
            borderColor: isDragging ? '#8b6914' : '#ccc',
            background: isDragging ? '#fef9e7' : '#fafafa',
            opacity: isUploading ? 0.6 : 1,
            cursor: isUploading ? 'wait' : 'pointer',
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          {isUploading ? (
            <>
              <div style={styles.spinner} />
              <p style={styles.dropText}>Wird hochgeladen & konvertiert...</p>
            </>
          ) : (
            <>
              <div style={styles.uploadIcon}>📄</div>
              <p style={styles.dropText}>
                PDF-Datei hierher ziehen
              </p>
              <p style={styles.dropSubtext}>
                oder klicken zum Auswählen (.pdf, max. 5 MB)
              </p>
            </>
          )}
        </button>

        {/* Action Buttons */}
        {currentMenu?.active && (
          <div style={styles.actions}>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              style={{
                ...styles.btnDanger,
                opacity: isDeleting ? 0.6 : 1,
              }}
            >
              {isDeleting ? 'Wird gelöscht...' : '🗑️ Mittagskarte entfernen'}
            </button>
          </div>
        )}

        {/* Preview */}
        {previewUrl && (
          <div style={styles.previewSection}>
            <h2 style={styles.previewTitle}>📋 Vorschau der aktuellen Mittagskarte</h2>
            <div style={styles.previewContent}>
              <iframe 
                src={`${previewUrl}#view=FitH`} 
                style={{ width: '100%', height: '600px', border: 'none', borderRadius: '8px' }}
                title="Mittagskarte PDF Vorschau"
              />
            </div>
          </div>
        )}

        {/* Footer */}
        <footer style={styles.footer}>
          <p>Lindener Ratsstuben · Admin-Bereich · Nicht öffentlich verlinkt</p>
        </footer>
      </div>
    </div>
  );
}

// ═══ STYLES ═══
const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f0e8 0%, #ede4d4 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '40px 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  container: {
    width: '100%',
    maxWidth: '720px',
  },
  loginCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '48px 40px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
    textAlign: 'center' as const,
    maxWidth: '420px',
    width: '100%',
  },
  logo: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: '#2c1810',
    margin: '0 0 8px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#8b7355',
    margin: '0 0 24px',
    lineHeight: 1.5,
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '12px',
  },
  input: {
    padding: '14px 16px',
    border: '2px solid #e0d6c8',
    borderRadius: '10px',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s',
    textAlign: 'center' as const,
  },
  btnPrimary: {
    padding: '14px',
    background: 'linear-gradient(135deg, #8b6914, #a67c1a)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'transform 0.1s, box-shadow 0.2s',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '24px',
    background: 'white',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
  },
  statusBadge: {
    background: '#d4edda',
    color: '#155724',
    padding: '12px 20px',
    borderRadius: '10px',
    textAlign: 'center' as const,
    marginBottom: '16px',
    fontSize: '14px',
    border: '1px solid #c3e6cb',
  },
  statusDot: {
    color: '#28a745',
    marginRight: '6px',
    fontSize: '12px',
  },
  fileName: {
    opacity: 0.7,
    fontSize: '12px',
  },
  alert: {
    padding: '12px 20px',
    borderRadius: '10px',
    marginBottom: '16px',
    fontSize: '14px',
    textAlign: 'center' as const,
  },
  dropZone: {
    border: '3px dashed #ccc',
    borderRadius: '16px',
    padding: '48px 24px',
    textAlign: 'center' as const,
    transition: 'all 0.2s ease',
    marginBottom: '16px',
    background: '#fafafa',
  },
  uploadIcon: {
    fontSize: '56px',
    marginBottom: '12px',
  },
  dropText: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#2c1810',
    margin: '0 0 8px',
  },
  dropSubtext: {
    fontSize: '13px',
    color: '#8b7355',
    margin: 0,
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #e0d6c8',
    borderTopColor: '#8b6914',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    margin: '0 auto 16px',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  btnDanger: {
    padding: '10px 20px',
    background: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  previewSection: {
    background: 'white',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
    marginBottom: '24px',
  },
  previewTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#2c1810',
    margin: '0 0 16px',
    borderBottom: '2px solid #ede4d4',
    paddingBottom: '12px',
  },
  previewContent: {
    fontSize: '14px',
    lineHeight: 1.7,
    color: '#333',
  },
  footer: {
    textAlign: 'center' as const,
    fontSize: '12px',
    color: '#8b7355',
    padding: '16px 0',
  },
};
