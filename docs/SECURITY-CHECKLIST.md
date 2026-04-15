# Security Checklist

## Automatisierte Checks (CI/CD)
- [ ] `npm run build` → 0 Errors
- [ ] `npm run lint` → 0 Errors  
- [ ] `npx tsc --noEmit` → 0 Errors
- [ ] `npm audit` → 0 Critical/High Vulnerabilities

## Security Headers (securityheaders.com)
- [x] `Strict-Transport-Security` (HSTS mit preload)
- [x] `X-Content-Type-Options: nosniff`
- [x] `X-Frame-Options: DENY`
- [x] `Referrer-Policy: strict-origin-when-cross-origin`
- [x] `Permissions-Policy` (kamera, mikrofon, geolocation disabled)
- [x] `Content-Security-Policy` (selbst, Formspree, Calendly, GA4)

## DSGVO-Compliance
- [x] Cookie-Consent-Banner mit 3 Optionen
- [x] Consent-Kategorien: Essential (immer), Analytics, Marketing
- [x] Datenschutzerklärung unter `/datenschutz`
- [x] Impressum unter `/impressum`
- [x] Cookie-Inventar als SSOT (`src/lib/cookie-inventory.ts`)
- [x] Formspree: Öffentliche Form-ID, kein Secret im Client
- [x] Calendly: Lazy-loaded, hinter Feature-Flag

## Penetrationstest-Checkliste (manuell)
- [ ] XSS: `<script>alert(1)</script>` in Formularfeldern und URL-Parametern testen
- [ ] CSRF: Formular-Absendung von fremder Domain testen
- [ ] Clickjacking: Website in `<iframe>` einbetten versuchen
- [ ] Open Redirect: Redirect-Parameter manipulieren
- [ ] Information Disclosure: Fehlerseiten auf Stack-Traces prüfen
- [ ] Cookie Security: Secure, HttpOnly, SameSite Flags prüfen
- [ ] HTTPS: HTTP → HTTPS Redirect verifizieren
- [ ] Source Code Exposure: `.env`, `.git` nicht öffentlich zugänglich
