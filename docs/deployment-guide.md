# Deployment Guide & Contingency Plans

## Architecture
- **Development**: Local environment via `.env.local`
- **Staging**: Vercel Preview Deployments (triggered per pull request).
- **Production**: Vercel Production Environment (triggered on merge to `main`).

## Rollback Procedures

### Vercel Native Rollback
Use this for rapid disaster recovery when `main` introduces critical, system-breaking bugs that cannot be fixed within 10 minutes.

1. Go to Vercel Dashboard -> Project -> Deployments.
2. Select the last known stable deployment.
3. Click the 3 dots (...) menu and choose "Rollback".
4. Monitor Rollback completion.

### Hotfix-Forward Strategy
Use this for non-critical bugs or minor visual issues.

1. Branch off `main` locally: `git checkout -b fix/issue-name`
2. Implement and test fix locally: `npm run build && npm run test`
3. Push Branch and Open PR.
4. Review, Merge -> Auto-Deploys in under < 2 mins.

## Notfall-Prozeduren (Decision Tree)

Problem: Hotspot auf Production!
├─ Fehler im React-Code/Styling? → **Hotfix Forward** (schneller).
├─ Falsche Environment-Variablen? → Fix Variable im Vercel-Dashboard + Klicke **Redeploy**.
├─ Externe Third-Party API Down (Formspree/Calendly)? → Setze Kill-Switch Feature-Flag via Environment Variable in Vercel.
└─ Kritischer SSR Bug / App stürzt hart ab? → **Vercel Rollback**.
