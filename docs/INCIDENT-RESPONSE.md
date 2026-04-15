# Incident Response Plan

## Übersicht der Severity Levels
- **P1**: Site komplett down, keine Verkehrsfähigkeit
- **P2**: Critical feature broken (contact form, Calendly, main page)
- **P3**: Minor issue (slow page, cosmetic bug)
- **P4**: Cosmetic (typo, non-critical UI issue)

## SLAs (Response Times)
- **P1**: immediate (within 5 minutes)
- **P2**: within 1 hour
- **P3**: within 24 hours
- **P4**: next sprint

## Vercel Rollback Prozess
Wenn ein P1 oder P2 Bug die Produktion betritt, muss der Build zurückgesetzt werden:
1. Log in to Vercel Dashboard
2. Select Lindener-Ratsstuben project
3. Go to Deployments Tab
4. Finde das letzte "Ready" Deployment vor dem Bug
5. Klicke auf "..." > "Promote to Production" oder "Assign Custom Domains" (Instant Rollback)
6. Untersuche `/dev/errors` im betroffenen State lokal.

## Post-Mortem Template
Bei jedem P1 oder P2 Issue ist ein Post-Mortem gemäß Gesetz 7 anzufertigen:
```json
{
  "incident_id": "YYYYMMDD-01",
  "what_happened": "Blank screen on /reservation caused by undefined variable",
  "timeline": "14:00 Bug detected -> 14:03 Rollback Deploy -> 14:15 Code Fix implemented",
  "root_cause": "Prop destructuring expected truthy default but got null",
  "fix": "Added Type null checks",
  "prevention": "Zod API checking implemented upstream",
  "owner": "Director of Engineering",
  "date": "2026-04-02"
}
```
