# Changelog

All notable changes to the Lindener Ratsstuben Web Project during the Phase 1 - Phase 20 Engineering Pipeline runs.

## Phase 20 - System Consolidation (Latest)
- **Engine**: Enforced 'strict' typescript configurations (`any` removal).
- **Docs**: Introduced Architecture, Security, Analytics, Testing, Maintenance policies.
- **Cleanup**: Purged redundant framework traces, dead code analytics (`knip`).

## Phase 19 - Zero-SaaS Local Monitoring
- **Monitoring**: Implemented a standalone `/api/monitoring/errors` LRU Cache without Sentry.
- **Dashboards**: Added developer only operations tabs `/dev/dashboard` + `/status`.

## Phase 18 - Optimization Loop
- **A/B Testing Framework**: Built custom ICE Scoring and Conversion logic.
- **Behvioral Targeting**: Built personalized CTA & Case Study Sliders based on Scroll Depth / Sessions.

## Phase 11 & Phase 17 - Analytics & Privacy Pipeline
- **Compliance**: Implemented headless proxy scripts to track forms and page loads locally (No cookie banner required).

## Phase 9 - Global Error Boundaires
- Added strict `error.tsx` catching und `not-found.tsx` Page.

## Pre-Phase 1 - 8
- UI Core Base: Headless Formspree Integration, Calendly Modals, Server-Side Static Page Routing for Contact, Menu, Reservation.
- Image Enhancements: `AdaptiveImage` component introduced.
