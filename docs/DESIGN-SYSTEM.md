# Lindener Ratsstuben - Design System & Tokens

Die gesamte App verwendet **Tailwind CSS**. Das File `tailwind.config.ts` agiert als Single-Source of Truth für Design-Assets.

## 1. Farbpalette (Token Strategy)
Die Identität des Restaurants wird durch Gold- und Erdtönungen in einem exklusiven Dark-Mode transportiert:
- **Brand Colors**: 
  - `brand-gold`: `#D4AF37` (Primary Accent für CTAs und Headlines)
  - `brand-dark`: `#111111` (Background)
  - `brand-accent`: `#C5A028` (Hover States)
- Im Layout gibt es **keine Hard-Coded RGB** Werte. Alles nutzt `text-brand-gold`, `bg-brand-dark` etc.

## 2. Typografie
- **Display/Headline**: `Cinzel` (Google Fonts). Eingesetzt für edle, traditionelle Titel und das Logo-Branding.
- **Body Text**: `Inter` oder `Roboto`. Hohe Lesbarkeit für Speisekarteninhalte und Standard-Text.
- Font-Optimierung via `@next/font/google` um Layout Shift zu verhindern (`font-display: swap`).

## 3. Elevation & Animation
- **Hover Transitions**: Button Arrays haben minimale Dauer und Smoothening (oft in Framer Motion als `ease: [0.0, 0.0, 0.2, 1]` bezeichnet). 
- **Stagger Container**: Um Ladezeiten von großen Menüs charmant auszublenden, verwenden die Listen `StaggerContainers`, die die Childs um 0.08 Sekunden versetzen (`components/animations/stagger-container.tsx`).

## 4. Components Rules
1. Benutze die UI-Building Blocks (`Button`, `Input`, `AdaptiveImage`) statt nativer HTML Form-Elemente. Sie haben bereits Error-States, accessibility `aria`-Labeling und Validation Flags integriert.
2. Responsiveness ist strictly Mobile-First (`sm:`, `md:`, `lg:` Prefixes).
