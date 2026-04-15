# 08 - UI Styles and Aesthetics (Lindener Ratsstuben Localized)

This document asserts the absolute UI Aesthetic for the Lindener Ratsstuben system. It collapses the generic 80-style matrix into the singular, binding "Rustikale Eleganz" methodology currently deployed in the `index.css` architecture.

## The Binding Target Aesthetic: Rustikale Eleganz

The Lindener Ratsstuben project strictly marries modern web optimizations with an analog, high-end traditional restaurant feel.

### 1. Visual Signatures
- **Texture & Warmth**: Minimalistic, yet relies heavily on warm off-whites (`#FAF7F0`) to simulate premium paper or clean tabletops. 
- **Shadows**: Employs soft, dispersed warm shadows (`--shadow-warm: 0 2px 12px rgba(140, 26, 39, 0.12)`) as opposed to pure black/grey dropshadows.
- **Rounding**: Very subtle structural radiuses (`--radius-sm`, `--radius-md`). Over-rounded pills (`rounded-full`) are minimized except for specific badges/avatars to maintain formal elegance.

### 2. Forbidden Aesthetics
An AI agent modifying this project must IMMEDIATELY trigger warnings if the system is drifted toward the following forbidden styles:
- 🚫 **Neumorphism / Glassmorphism**: Unnecessary blur layers or embossed lighting conflict with the classic traditional aesthetic.
- 🚫 **Dark Mode (OLED)**: Explicitly disabled. Gastronomy menus and storytelling operate entirely in the warm, inviting light spectrum.
- 🚫 **Kinetic Brutalism / Gen Z Chaos**: Unacceptable. Text should remain orderly, aligned, and strictly respect high legibility grids without marquee chaos.
- 🚫 **Flat Design Mobile (SaaS)**: Unacceptable. Generic blue/grey utility shapes destroy the premium branding.

### 3. Execution Constraints
1. **Interactive Hover**: Must be subtle (`scale-98` or minor opacity shifts via `150ms ease-out`). No bouncy spring-physics.
2. **Visual Hierarchy**: Driven by typographic scale (`EB Garamond` sizes) and generous whitespace (using the 14-tier spacing scale), rather than colored bounding boxes. 

## Compliance Command
The UI operates "Anti-AI-Look". The final output must look like a meticulously crafted artisanal menu, not a template. All AI modifications must conform perfectly to this constraint.
