# Lindener Ratsstuben - Long-term Maintenance Strategy

Mit Abschluss von Phase 20 (Engineering Final Audit) sind alle Projektstrukturen standardisiert. Zur Beibehaltung der Zero-Breakage Policy dient dieser Pflegeplan.

## Wöchentliche Maintenance
- **Review von Vitals**: Überprüfung von `/dev/dashboard` auf Latenzspitzen oder INP Verschlechterungen.
- **Error Tracking**: Begutachten der Log-Ausgaben im Unified Dashboard (`/dev/errors`), beheben durch RCA (Root Cause Analysis).

## Monatliche Maintenance
- **Depedency Updates**: Run `npm outdated` und aktualisiere *minor* sowie *patch* Versionen. Speziell Framer-Motion und Next.js Packages.
- **Traffic Patterns**: Prüfung von `/dev/dashboard` "Conversions" Reitern (Formulare abgesendet via Formspree).

## Quartalsweise
- Vollständiges Lighthouse Auditing der gebauten Produktion auf live URL. Zielwerte:
  - Performance ≥95
  - SEO ≥95
  - Accessibility ≥95
  - Best Practices ≥95
- Review von Breaking-Changes in Framer Motion / React / Next.JS. Major version Updates auf Staging-Branch (z.B. Migration zu neueren Next Routen-Paradigmen).

## Abhängigkeits Update Strategie
- **Dependabot**: Eingeschaltet für Github Actions. Auto-Merges bei Patch-Updates die das Build-System (npm run build) überleben. Manuelle Pull Request Approval für Major Version Packages.
- Kein Sentry Update benötigt, da Monitoring selbst implementiert wurde.
