# External Services Registry

This document catalogs all external services and required configuration properties.

## Formspree
- **Usage**: Contact and Reservation Forms.
- **Environment Variables**:
  - `NEXT_PUBLIC_FORMSPREE_ID`: The primary Contact Form ID (e.g., `mzboqkqm`).
- **Data Subject**: Processes User Name, Email, Phone, and Body text. Validated via local Zod rules before submission.
- **Rollback / Maintenance**: If the form endpoint is down, an automatic localized Fallback-UI handles the failure gracefully.

## Calendly
- **Usage**: Reservation booking flows.
- **Environment Variables**:
  - `NEXT_PUBLIC_CALENDLY_URL`: Base URL for the account.
- **Data Subject**: Scheduling slot context, personal user data handled entirely in the Calendly iFrame.
- **Rollback / Maintenance**: If feature flag `NEXT_PUBLIC_FF_CALENDLY` is 'false', it acts as a Kill-Switch.

## Vercel
- **Usage**: Hosting, CD, CI Previews.
- **Configuration**: `vercel.json` acts as the SSOT for routing and build configuration.

> Note: Access to operational dashboards implies possession of SSO credentials (managed by Director).
