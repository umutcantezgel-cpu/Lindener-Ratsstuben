# 03 - Project Scaffolding & Build Tooling (Lindener Ratsstuben)

This document defines the strictly enforced project scaffolding, build tooling, and developer experience configurations precisely mapped to the Lindener Ratsstuben Next.js codebase.

## Technology Stack (Next.js + Tailwind CSS)
The explicit stack configuration for this project leverages Next.js App Router, SSR/SSG operations, and utility styling:
```bash
npx -y create-next-app@latest ./ --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```
**Key Dependencies (Verifiziert gemäss SSOT):**
- `next` (14.2.35) — Framework core (App Router)
- `tailwindcss` (3.4.18) — Utility-first CSS Engine
- `framer-motion` (12.38.0) — Animation library
- `lucide-react` (0.554.0) — SVG icon library
- `clsx` / `tailwind-merge` — Conditional class utilities

*Note: Vite und Astro Stacks aus vorherigen Versionen wurden wegen fehlender Projekt-Relevanz gemäß SSOT-Direktive gestrichen.*

## Project Structure Convention (SSOT)
```text
src/
├── app/                  # Next.js App Router pages, API Routes & layouts
│   ├── layout.tsx        # Root layout (fonts, metadata, layout wrapper)
│   ├── page.tsx          # Homepage
│   └── [feature]/        # z.B. /menu, /gallery, etc.
├── components/           # UI und funktionale React-Komponenten
├── data/                 # SSG Payload Daten
├── lib/                  # Utilities, analytics, seo, features flags
│   └── utils.ts          # cn() helper
├── styles/               # CSS Architecture
│   └── index.css         # CSS Variables (Color, Spacing, Typography) -- SSOT for Layout
└── types/                # TypeScript type definitions
next.config.mjs           # Next.js configuration (Security Headers, Remote Patterns, Edge Config)
tailwind.config.mjs       # Design token logic
```

## Design Token Integration
`src/styles/index.css` bridges the exact design tokens inside Tailwind CSS:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Siehe Document 01 / 02 für exakte Werte der Rustikale Eleganz Tokens */
    --color-primary: #8C1A27;
    /* ... */
  }
}
```

## Build & Development Commands
```bash
# Development
npm run dev          # Start dev server mit HMR

# Production
npm run build        # Erzeugt optimierten SSG/SSR Build
npm run start        # Node production server

# Quality Gates
npm run lint         # ESLint check strict
npx tsc --noEmit     # TypeScript validation
npm run test         # Vitest Unittest Runner
```

## AI Agent Integration Points
When the Antigravity pipeline or an AI coding assistant operates on the project, it MUST:
1. **Read** `src/styles/index.css` anstelle eines hypothetischen `globals.css`.
2. **Read** `tailwind.config.mjs` (NICHT .ts) for extensions.
3. **Generate** new components adhering to the specific Rustikale Eleganz structure.

## Essential Utility: `cn()` Helper
The conditional class string parsing function is fully deployed to combine Tailwind rules safely:
```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
