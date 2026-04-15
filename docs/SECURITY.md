# Lindener Ratsstuben - Sicherheit & Privacy (DSGVO)

## 1. Zero-SaaS Local Observability

Das gesamte Tracking der Web Vitals, API Deployments und Page Views läuft lokal. 
- Das System integriert **kein Sentry**, **kein Google Analytics**, **kein Vercel Web Analytics** oder sonstige Drittanbieter (Zero-SaaS).
- Server-Metriken werden in-memory durch LRU Caches gesammelt und per passwortgeschützten / lokal validierten Dev-Dashboards evaluiert.
- Dadurch entfällt ein klassischer Cookie-Consent-Banner für Web-Tracker, da keine personenbezogenen Daten an Marketing-Netzwerke fließen.

## 2. DSGVO / PII Redaction

Der `ErrorLogger` hat einen eingebauten Regex-Sanitizer (`sanitizedMessage`), der automatisch E-Mail-Adressen, IP-Adressen und Kreditkarten-ähnliche Zahlenstrings filtert, bevor ein Error-Report in die Local Caches gespeichert wird.

## 3. CSP (Content Security Policy)

Als Teil der Next.js Security Headers sind strikte CSP Richtlinien konfiguriert (via `next.config.js` oder Middleware). Sie blockieren XSS Injections aus unbekannten Quellen.

## 4. Formulare & XSS

Alle Formulare kommunizieren sicher via Formspree. Input Values werden im React Flow sanitisiert (React schützt nativ vor klassischem DOM-XSS). 

## 5. Dev-Only Routes

Die Dashboards (`/dev/dashboard`, `/dev/errors`, `/dev/seo-status`) überprüfen in den Edge-Routen und Komponenten zur Laufzeit die `NODE_ENV`. Bei einer Produktions-Build wird standardmäßig 401 Unauthorized zurückgegeben, wodurch kritische Systemmetriken von der Öffentlichkeit verborgen bleiben.
