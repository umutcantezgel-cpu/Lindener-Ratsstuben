# 01 - Design Token Resolution Architecture

This document defines the architecture for resolving design tokens for **Lindener Ratsstuben (red-flames)**. It serves as the foundational lookup system that maps the product category ("Restaurant / High-End Gastronomy") and user intents to concrete CSS variables and Tailwind configurations built around the "Rustikale Eleganz" theme.

## Token Resolution Pipeline

### 1. Domain Detection (Restaurant / High-End Gastronomy)
When upgrading this website, the specific domain dictates the appropriate design tokens:
- **Color Domain**: Driven by `flame-red` and `flame-gold`. Resolves to deep crimson/wine and gold accents (Tier 1 primitive HSL scales).
- **Typography Domain**: Resolves to classic serif pairings (`EB Garamond` for body, `Playfair Display/Cormorant Garamond` for headings) to convey elegance.
- **Style Domain**: Driven by "Rustikale Eleganz" keywords. Resolves to soft, warm surfaces (`bg-primary: #FAF7F0`) rather than stark white, and deep text colors (`#1C1410`).
- **Layout Domain**: Triggered by fluid spacing requirements, resolving to a 14-step spacing scale and clamping logic.

### 2. Multi-Tier Semantic Mapping
The resolver generates a 3-tier CSS variable system in `src/styles/index.css`:
- **Tier 1 (Primitive)** — Full HSL scales (e.g., `--color-primary-50` to `950`, `--color-accent-50` to `950`, neutral warm tones).
- **Tier 2 (Semantic)** — Contextual mappings (e.g., `--color-bg-primary`, `--color-text-primary`, `--color-surface`, `--color-border`).
- **Tier 3 (Component)** — Specific mappings (e.g., `--color-button-primary-bg`, `--color-card-bg`).

## CSS Variable Output Schema (SSOT)
The validated design system emits the following structured custom properties in the `:root`:
```css
:root {
  /* Tier 2: Semantic Colors - Rustikale Eleganz */
  --color-primary: var(--color-red-600); /* #8C1A27 */
  --color-primary-hover: var(--color-red-800);
  --color-accent: var(--color-gold-500); /* #E8B830 */
  --color-accent-hover: var(--color-gold-700);
  
  --color-surface: var(--color-stone-100);
  --color-bg-primary: var(--color-stone-50);
  --color-bg-secondary: var(--color-stone-100);
  
  --color-text-primary: var(--color-stone-900);
  --color-text-secondary: var(--color-stone-800);
  --color-text-tertiary: var(--color-stone-600);
  
  --color-border: var(--color-stone-200);
  --color-border-hover: var(--color-gold-700);

  /* Fluid Typography */
  --text-base: clamp(1rem, 0.93rem + 0.33vw, 1.2rem);
  --text-xl: clamp(1.44rem, 1.34rem + 0.5vw, 1.728rem);
  /* ... up to 5xl */

  /* Shadows */
  --shadow-warm: 0 2px 12px rgba(140, 26, 39, 0.12);
  --elevation-1: 0 1px 3px hsla(353, 68%, 15%, 0.08), ...
}
```

## Tailwind Integration
These CSS variables are directly mapped in `tailwind.config.mjs` to ensure the utility classes match the semantic definitions:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          active: 'var(--color-primary-active)',
          /* ... 50-950 scale */
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          /* ... 50-950 scale */
        },
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          surface: 'var(--color-surface)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          hover: 'var(--color-border-hover)',
        },
      },
      fontFamily: {
        body: ['var(--font-family-body)', 'serif'],
        heading: ['var(--font-family-display)', 'serif'],
      },
      fontSize: {
        base: 'var(--text-base)',
        /* ... */
      }
    }
  }
}
```

## Application within the Pipeline
When executing the pipeline for this project:
1. **Rely entirely** on `index.css` and `tailwind.config.mjs` as the Single Source of Truth (SSOT).
2. **Never** revert to a flat design or SaaS aesthetic (e.g., standard Tailwind Blue schemas).
3. **Validate** contrast ratios constantly, specifically checking that `<Tier 2 Semantic/>` items maintain legibility (e.g. `--color-primary` text against `--color-bg-primary`).
