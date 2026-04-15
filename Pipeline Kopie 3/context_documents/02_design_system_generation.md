# 02 - Design System Generation Pipeline

This document defines the complete pipeline for generating and persisting the design system for **Lindener Ratsstuben (red-flames)**. It is the authoritative source of truth for how aesthetic, color, typography, and layout decisions are synthesized into actionable CSS and Tailwind configurations.

## Generation Pipeline

### 1. UX Reasoning Layer (Rustikale Eleganz)
Before visual decisions are applied, the system resolves the "Restaurant / High-End Gastronomy" rules:
- `Recommended_Pattern` — Hero + Navigation (Reservierung) + Speisekarten + Gallery
- `Style_Priority` — Warmth, Texture, Elegance (Rustikale Eleganz)
- `Color_Mood` — Formal, appetising (Wine red `hsl(353, 68%, 32%)`, Warm gold `hsl(47, 83%, 55%)`)
- `Typography_Mood` — Classic and legible (`EB Garamond` body, `Playfair Display` display)
- `Key_Effects` — Accessible double-focus rings, subtle card-lifts (`ease-out`), restrained motion.

### 2. Multi-Domain Aggregation
The domain is fixed to "Gastronomy". The styling rules specifically reject generic UI trends (like Glassmorphism) in favor of high-contrast, text-first legibility with warm stone backgrounds.

## Output Payload Structure
The system's active generated payload translates directly into our configuration files:
```
project_name      — Lindener Ratsstuben (red-flames)
category          — Gastronomy / Restaurant
style             — Rustikale Eleganz (Warm UI)
colors            — Full HSL Tier 1 mapped to Semantic Tier 2 variables
typography        — Fluid Typography Scale (clamp algorithms for viewport scaling)
anti_patterns     — DO NOT use pure white (#FFFFFF) for backgrounds. DO NOT use SaaS blues.
```

## Persistence Architecture: The SSOT Pattern

### Code-Level Source of Truth (Overriding generic MASTER.md)
This project **does not** use a detached `MASTER.md` file for design system persistence. Instead, the design system is fully integrated into the code repository to enforce the Single Source of Truth (SSOT) directive:
- **`src/styles/index.css`** — The global stylesheet containing all raw CSS custom properties (`:root` variables for colors, fluid typography `clamp()` math, spacing, and accessible focus rings).
- **`tailwind.config.mjs`** — The engine that maps the CSS variables to Tailwind utility classes (e.g., `bg-primary`, `text-surface`).
- Dark mode is explicitly disabled in this project to preserve the warm "Rustikale Eleganz" aesthetic uniformly across all environments.

### Component-Level Execution
Individual components (e.g., `src/components/ui/*.tsx`) apply these tokens strictly via Tailwind classes, ensuring UI consistency without page-level fragmentation.

## Pre-Delivery Checklist (Implemented & Verified)
The following mandatory accessibility and usability validations are successfully embedded into `index.css`:
1. ✅ **Iconography**: No emojis; Lucide-React SVG icons are used systematically.
2. ✅ **Interactive States**: `cursor: pointer` inherently handled by normalized button/link elements.
3. ✅ **Hover Mechanics**: Smooth transitions (`150ms-250ms ease-out`) applied to interactive nodes (e.g., `.interaction-bounce`).
4. ✅ **Accessible Contrast**: Validated. (Tier 2 Semantic Text > 4.5:1 on background).
5. ✅ **Focus States**: Custom `focus-visible` double-ring explicitly defined in `index.css` solving light/dark background collision.
6. ✅ **Reduced Motion**: `@media (prefers-reduced-motion: reduce)` block fully operational in `index.css`.
7. ✅ **Responsive Fluidity**: CSS `clamp()` used exclusively to dynamically scale layout spacing and typography (xs to 5xl). No fixed breakpoints required for typography bridging.
