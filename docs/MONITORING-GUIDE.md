# Monitoring & Observability Guide (Local-Only)

Dieses Projekt nutzt ZERO Third-Party Error-SaaS (kein Sentry). Alle Monitoring-Daten werden lokal gepuhst, in LRU-Caches im RAM für die Vercel-Instanz aufbereitet, an die Console geprintet (wo Vercel nativ Logs sammelt) und über gesicherte Developer-Dashboards zugreifbar gemacht.

## Übersicht der Entwickler-Dashboards
Die folgenden Routen sind in Produktion (`NODE_ENV === 'production'`) blockiert und retournieren sofort einen 403 HTTP Error. In Staging- und Dev-Umgebungen bieten Sie Deep-Inspections:

1. **/dev/dashboard**: Unified Operations Center, welches API Health, Web Vitals Averages, Deployments und Conversions visuell darstellt.
2. **/dev/errors**: Client-seitige Javascript Fehler sowie Netzwerk-Crashes. Gruppiert nach Auftrittshäufigkeit, inklusive Stack Traces.
3. **/dev/seo-status**: Monitoring-Daten zu automatisiertem Metadaten-Validation Scoring.

## Production Debugging Workflow
Da die Dashboards in Prod geblockt sind:
1. Öffne die Vercel Einsatzkonsole.
2. Navigiere auf den "Logs" Reiter.
3. Filtere nach MTYPEs: `[CLIENT_ERROR]`, `[WEB_VITAL]`, `[CONVERSION_EVENT]`.
4. Der Error Logger sanitisiert PII nativ und verhindert Data-Leakses innerhalb von E-Mail Adressen usw., die in die Konsole gesendet werden.

## Anomaly Alerting
Github Actions führt wöchentlich Requests an `/api/monitoring/conversions` als Analytics-Bot durch, um den JSON Output zu parsen und im Falle eines Conversion Drops (`Anomalies !== 'none'`) Warnungen auszugeben.
