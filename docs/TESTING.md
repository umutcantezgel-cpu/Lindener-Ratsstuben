# Lindener Ratsstuben - Testing & Validation
 
Dieses Dokument beschreibt die Testing-Strategie. Es wird das Zero-Breakage Pattern mit automatisierten Audit Checks durchlaufen.

## 1. Lokales Test-Framework

Das Projekt nutzt ein Custom Smoke-Testing Skript für den Pre-Deployment CI/CD Check.

- **Smoke Tests**: `npm run test:smoke`. Führt einen Server Check für Localhost Port 3000 durch um sicherzustellen, dass Node.JS bootet und die API Routen nicht crashen. Löst Headless-Requests gegen `/contact` und `/reservation` aus um Form-Spree Bindings zu überprüfen.
- **Type Checking (Typescript)**: `npx tsc --noEmit`. Next.JS Projekt läuft mit STRICT = true Konfiguration. Verhindert alle `any` und ungetypten Hooks. Muss auf 0 Errors stehen.
- **ESLint**: `npm run lint`. Sichert Formatting, ungenutzte Dependency Imports (`knip`) und React Hooks Rules ab. Keine Warnings erlaubt.

## 2. Performance Testing (Core Web Vitals)

- **Thresholds**: LCP (Largest Contentful Paint) < 1.8s. INP (Interaction to Next Paint) < 100ms.
- Local Build verifiziert die Bundle Sizes (gefordert: unter 150KB First Load JS pro Route).
- `npm run build` produziert statische SSG Assets überall wo möglich, um den Cache für Pages wie Menu und About zu erleichtern.

## 3. Workflow für Neue Features

Vor dem Commit und Deployment müssen zwingend laufen:
1. `npm run build` (garantiert Server-Side Kompatibilität der JSX Nodes).
2. `npm run lint`.
3. `npm run test:smoke` im dev-environment.
