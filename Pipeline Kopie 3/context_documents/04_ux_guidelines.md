# 04 - UX Guidelines (Lindener Ratsstuben Localized)

This document maps the master UX constraints directly to the Lindener Ratsstuben implementation. These rules are strict UX heuristics integrated deep into our architecture to prevent common usability errors while maintaining our "Rustikale Eleganz" style.

## 1. Navigation & Motion Mechanics (SSOT: `index.css`)
- **Smooth Scroll**: Implemented globally via `html { scroll-behavior: smooth; }` in `index.css`. Required for anchor-based restaurant navigation (e.g., `#menu`, `#gallery`).
- **Motion Restraint (`prefers-reduced-motion`)**: Fully embedded in `index.css` using the `@media (prefers-reduced-motion: reduce)` block. Transition timings for interactives are locked between 150-300ms `ease-out`. 
- **Sticky Navigation**: Addressed. Top navigation anchors apply appropriate z-indexing derived from the CSS variables (`--z-header`).
- **CSS Performance**: Animations strictly rely on `transform` and `opacity` properties (e.g., hover scaling `active:scale-[0.98]`) instead of triggering layout recalculations.

## 2. Layout & Ergonomics
- **Z-Index Management**: Bounded by custom CSS properties (`--z-below`, `--z-base`, `--z-overlay`, `--z-modal`, `--z-tooltip`) rather than utility classes like `z-50`.
- **Viewport Units**: Utilizing `dvh` (Dynamic Viewport Height) for mobile browser compatibility instead of generic `vh`.
- **Touch Targets**: Minimum target surface areas (`min-h-[44px] min-w-[44px]`) ensure the restaurant menu UI is comfortably navigable on smartphones.

## 3. Interaction States & A11y (WCAG Compliance)
- **Focus Rings**: Solved fundamentally at the `index.css` layer. A custom `*:focus-visible` dual-ring handles contrast compliance on both dark (wine red) and light (warm stone) backgrounds, allowing us to safely omit default browser outlines.
- **Contrast**: The "Rustikale Eleganz" Tier 2 Semantic Palette (e.g., Text Primary `#1C1410` on Bg Primary `#FAF7F0`) guarantees an optimal > 8:1 contrast, exceeding WCAG AA requirements (`4.5:1`).
- **Form Validation**: Contact/Reservation forms must yield localized, in-context validation errors directly adjacent to the input field.

## 4. Typographic Rules (Fluid Scale)
- **Modular Scanning**: Typography entirely rejects fixed font sizes (e.g., `text-lg`). All sizes are mapped to a mathematical `clamp()` scale (`--text-base`, `--text-xl`) defined in `index.css`.
- **Line Height**: Strict 1.5 - 1.75 (`leading-relaxed`) constraint applied to all running descriptive texts on the menu and about pages.

## AI Agent Integration Points
When modifying the UI of Lindener Ratsstuben:
1. **Never** manually set `z-index` with arbitrary numbers. Use the CSS variables.
2. **Never** remove the `focus-visible` ring directives.
3. **Always** use SVG icons (Lucide) rather than text/emoji symbols.
4. Keep all button hover transitions within the `150-250ms ease-out` bounds defined in `index.css`.
