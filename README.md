# Lindener-Ratsstuben-main

**Lindener Ratsstuben Web-Auftritt**
Ein hochperformantes, barrierefreies und komplett DSGVO-konformes Next.JS Web-Interface für Lindener Ratsstuben. Die Architektur zielt auf maximale Core Web Vitals, Conversion-getriebenes UI und einfache Reservierung über Formspree - ohne Abhängigkeiten zu teuren Tracking-SaaS Systemen.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS & Framer Motion
- **No Headless CMS, No External Tracking (Zero-SaaS), No DB lock-in**.

## Übersicht der Architektur
```
Routes → Components → Hooks → Utilities → Data
app/     components/  hooks/  lib/        data/
  |       |             |      |           |
  |       \---(ui/layout/forms)-\          |
  >-(Routing)-------(Logic)-------(Helpers)<
```

## Voraussetzungen
- Node.js 18+
- npm 10+
- Git

## Installation & Setup
1. Repository clonen:
   ```bash
   git clone <repo-url> && cd Lindener-Ratsstuben-main
   ```
2. Dependencies installieren:
   ```bash
   npm install
   ```
3. Umgebungsvariablen setzen:
   Kopiere die `.env.example` zu `.env.local` und befülle fehlende Keys.
   ```bash
   NEXT_PUBLIC_FORMSPREE_PROJECT_ID="your_formspree_hash"
   NEXT_PUBLIC_GA_DISABLED="true"
   ```
4. Entwicklungsumgebung starten:
   ```bash
   npm run dev
   ```
   *Läuft auf http://localhost:3000*

## Verfügbare Scripts
- `npm run dev`: Startet Local Development Server auf Port 3000.
- `npm run build`: Kompiliert das Projekt als statische & dynamische Production Build.
- `npm run start`: Startet den Production Runner nach `build`.
- `npm run lint`: Verifiziert TypeScript Strict & React Lint Rules.
- `npx tsc --noEmit`: Typecheck ohne Compiler Write.
- `npm run test:smoke`: Läuft einen E2E Smoke-Test über alle public Routes.

## Deployment
Das Projekt deployed autonom auf **Vercel**. Jeder Push auf `main` veranlasst den Production Deploy. Environment Variables können nativ über das Vercel Dashboard injiziert werden. NextJS Server Side Caching wurde auf Incremental Static Regeneration ausgelegt. Ein automatischer CI Builder überprüft alle `any` typungen.

## Contributing Guidelines
1. Erstelle einen Branch (Feature oder Fix) - Commits standardisiert mit `fix(route): info` oder `feat(ui): info`.
2. Alle Komponenten **MÜSSEN** typisiert sein. Inline CSS/Magic Numbers in den Styleshores sind verboten.
3. Vor dem Mergen zwingend `npm run build && npm run lint` verifizieren.
4. Exportierte Funktionen brauchen eine aussagekräftige TSDoc Deklaration.
