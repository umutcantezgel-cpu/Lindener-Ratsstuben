# 07 - Typography and Fonts (Lindener Ratsstuben Localized)

This document specifies the exact typography configuration hardcoded sequentially for Lindener Ratsstuben. Generic 80+ typography matrices are purged; the local architecture acts as the supreme source of truth.

## The Typography Matrix: Rustikale Eleganz

The restaurant relies on a highly legible, classic serif/sans-serif pairing structure configured in `tailwind.config.mjs` and CSS variables.

### 1. Font Definitions
- **Body Context / Running Text**: `EB Garamond`
  - *Mood*: Elegant, readable, traditional print-feel.
  - *Fallback*: `serif`
- **Headings / Display Focus**: `Playfair Display` (or `Cormorant Garamond` dependent on exact CSS mappings)
  - *Mood*: Premium, sophisticated, high-contrast strokes.
- **Functional UI**: Inter or custom fallback configurations for data-dense tables/booking forms ensuring mobile legibility without breaking the theme.

### 2. Fluid Scale Enforcement `clamp()`
The SSOT strictly forbids fixed point size usage. 
- You MUST NOT use `text-sm`, `text-lg` or raw pixel values `font-size: 16px`.
- Instead, dynamic CSS properties generated globally (`--text-base`, `--text-xl`, `--text-2xl`) dictate sizing responsive to viewport width (e.g., `font-size: clamp(1rem, 0.93rem + 0.33vw, 1.2rem)`).

### 3. Tailwind Implementation Matrix
When an AI agent interacts with text nodes, the classes resolve as follows:
- `font-heading`: Triggers the serif display font.
- `font-body`: Triggers the serif text font.
- Sizes must respect the hierarchy (H1 -> H2 -> H3) mathematically defined in `index.css`.

## Compliance Command
Do not override fonts dynamically. Do not introduce standard SaaS sans-serifs (like Poppins, Roboto). The classic, high-end "Speisekarte" aesthetic must endure across all viewports.
