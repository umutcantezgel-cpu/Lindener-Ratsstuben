# 06 - Color Theory and Palettes (Lindener Ratsstuben Localized)

This document is formally restricted to the specific color theory and HSL palettes constructed for the "Rustikale Eleganz" aesthetic in Lindener Ratsstuben. All generic fallback palettes (SaaS, Web3, Cyberpunk) have been purged following the SSOT directive.

## The Gastronomy Base Palette
The codebase `src/styles/index.css` operates exclusively on a 3-tier HSL scale tailored for high-end traditional restaurants:

### 1. Primary Colors (Wine Red & Tradition)
- **Primary Base**: `#8C1A27` (Deep Wine Red/Crimson). Used for buttons, active navigation markers, and prominent interactive elements.
- **Hover Transitions**: Mapped down the HSL scale (e.g., `--color-red-800`) to increase depth upon interaction.

### 2. Accent Colors (Warm Gold)
- **Accent Base**: `#E8B830` (Muted Gold). Used strictly for embellishments, star ratings, or secondary highlights.
- **Hover Transitions**: Darkened dynamically to `#A16207` (Deep Gold) to meet WCAG contrast requirements on light backgrounds.

### 3. Background & Surface Structuring
- **Primary Background**: `#FAF7F0` (Warm Stone/Parchment). Pure white (`#FFFFFF`) is explicitly forbidden to maintain the soft rustic warmth.
- **Surface**: `#F5F0E6` (Slightly darker stone layer) for card separation without relying heavily on harsh drop shadows.

### 4. Text & Ink
- **Text Primary**: `#1C1410` (Extremely dark brown/charcoal, rarely pure black).
- **Text Secondary**: `#4A3F35` (Muted brown for descriptive text and timestamps).

## Rule of Compliance
AI Code Assistants must **never** inject new hexadecimal colors randomly into components. Every component must source its background and foreground commands from `index.css` variables, e.g., `text-primary`, `bg-surface`, `bg-primary`.
