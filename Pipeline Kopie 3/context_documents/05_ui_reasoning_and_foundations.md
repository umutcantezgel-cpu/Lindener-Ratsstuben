# 05 - UI Reasoning and Foundations (Lindener Ratsstuben Localized)

This document dictates the molecular-level UI constraints derived from the `ui-reasoning.csv` taxonomy, specifically filtered and hardcoded to the active domain resolution for the **Lindener Ratsstuben** codebase.

## 1. Domain-Locked Resolution: Gastronomy / High-End Restaurant

Because this project operates in the Gastronomy sector, the AI UI reasoning matrix resolves to the following absolute directives:

1. **Recommended_Pattern**: Hero (Visual Impact) + Value Pillars (Tradition) + Reservations-CTA + Feature Tabs (Speisekarte).
2. **Style_Priority**: "Rustikale Eleganz" — Bypasses modern flat design in favor of premium warmth. Shadows must be soft but distinct (`--shadow-warm`).
3. **Color_Mood**: Formal, appetizing, and grounded. Relies strictly on the Tier 1 primitive scales (Wine Red: `#8C1A27`, Warm Gold: `#E8B830`, Deep Stone: `#1C1410`).
4. **Typography_Mood**: Classic & Serene. `EB Garamond` drives the body, ensuring maximum print-like legibility.
5. **Key_Effects**: Accessible double-focus rings, subtle card-lifts (`ease-out`), restrained motion. NO heavy parallax or scroll-jacking.
6. **Anti_Patterns**: 
    - 🚫 DO NOT use Dark Mode (OLED black) — undermines restaurant warmth.
    - 🚫 DO NOT use Cyberpunk / Web3 / Neon tokens.
    - 🚫 DO NOT use SaaS "Trust Blue" (`#2563EB`).

## 2. Core Anti-Patterns (Universal Rules Enforced via SSOT)
The following universal structural anti-patterns are strictly guarded against in our `index.css` and React component logic:
1. **Emojis as icons**: Never use emojis; use the established `lucide-react` SVG icon library.
2. **Missing `cursor: pointer`**: Unacceptable for any clickable target (normalized inherently).
3. **Layout-shifting hovers**: `transform: scale()` is utilized ensuring surrounding boxes do not trigger expensive Cumulative Layout Shifts (CLS).
4. **Low contrast text**: Guarded fundamentally by the Semantic token palette (e.g., `text-primary` on `bg-primary`).
5. **Instant state changes**: Must use Tailwind transition utilities (`transition-all duration-200 ease-out`).
6. **Invisible focus states**: Forced active via the global `*:focus-visible` dual ring inside `index.css`.

## AI Agent Directives
Any UI component generated for this system MUST adhere to the "Rustikale Eleganz" paradigm outlined above. Under no circumstance should a codebase modification attempt to revert the UI matrix to SaaS, E-commerce, or generic minimalism. The Gastronomy resolution is locked.
