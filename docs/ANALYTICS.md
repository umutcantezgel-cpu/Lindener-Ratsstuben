# Lindener Ratsstuben - Analytics & Tracking System

Dieses Projekt nutzt aus Compliance & Datenschutzgründen **keine externen Webtracking Tools** (Zero-SaaS-Policy).

## 1. Zero-SaaS Analytics Event Catalog
Das System verwendet ein lokales Caching, auf das nur die Node Server-Instanzen Zugriff haben, die Metadaten werden im File `src/lib/analytics/types.ts` typisiert.

Folgende Events werden in Memory aufgenommen (Max 200 Logs Limit FIFO Prinzip):
- **form_start**: Sobald User in Kontakt/Reservierung tippen
- **form_submit**: Bei Formularübermittlung
- **cta_click**: Klickevents auf den Primär-Buttons ("Reservieren", "Speisekarte")
- **scroll_depth**: Sobald Scrolling tiefer als 75% der Homepage geht.

## 2. API Routes für Extraction
Die Analytics Arrays sind direkt von Authorized Benutzern unter folgenden Routen einsehbar:
- `/api/monitoring/conversions`: Ausgabe der Event Metriken und der zugehörigen Segmente.
- `/dev/dashboard`: Grafische Aufarbeitung der Hits für Growth & Conversion Tracking.

## 3. Privacy Policy & DSGVO
Durch das Vermeiden von persistenten HTTP-Cookies für Tracker und 3rd-Party Request Drops im Client, entfällt ein Cookie-Constraint nach der E-Privacy Richtlinie, falls keine personenbezogenen PII Daten durch Analytics verarbeitet werden. Das System loggt niemals den Namen oder die IP im Event Array, sondern anonymisiert lediglich:
- `"timestamp": "2024-..."`
- `"event": "form_submit"`
- `"segment": "gast"`
