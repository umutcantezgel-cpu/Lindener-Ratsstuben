# DESIGN PIPELINE HANDOFF (Phase 10)

## KOMPONENTEN-VISUAL-READINESS
Alle existierenden UI-Nodes sind auf Tailwind-Basis standardisiert. Ein strukturelles Design System auf `index.css`-Basis (Color Variables, Font Family) ist vorhanden. Die Supreme Design Pipeline kann sich nun stürzen auf:
- Visual Refinement (Glassmorphism, High-Fidelity Shadows).
- Button Hover States, Skeleton Loaders für Server-Suspense (bereits an `menu/PageClient.tsx` angedockt).
- Formelle Design Token Integration (Tailwind Preset Extensions).

## LAYOUT-READINESS
Alle Major Layouts stützen sich auf `flex`, `grid`, `col-span` (Mobile, Tablet, Desktop fluid) und verhalten sich auf Edge-Cases wie sehr große Bildschirme korrekt (`container mx-auto max-w-*`). 
Die Supreme Design Pipeline kann sich stürzen auf:
- Fluid Typography-Funktionen statt festen `text-lg` / `text-sm`.
- Advanced Layouts (Custom Grid Systeme, komplexe Overlay-Menu Layouts).

## FARB-SYSTEM
Tailwind CSS Standard Utility Patterns überschrieben mit `@layer utilities` (z.B. `bg-primary`, `text-text-secondary`). Das System ist stark reduziert (Dark Mode absichtlich verweigert für Lindener Ratsstuben). 
Supreme Design Pipeline Agenda:
- Semantic Colors (Success, Error, Info für die neuen Toasts noch feingranulärer ausarbeiten).
- WCAG AAA Contrast Check-Runs durchführen für alle brand-specific Colors (z.B. `text-brand-header`).

## ANIMATIONEN
IntersectionObserver-basierte Animations (GSAP oder Tailwind `animate-in` utilities) triggern bei Scroll (`useIntersectionObserver`).
Supreme Design Pipeline Agenda:
- Parallax Scrolling für Header Hero.
- Complex Hover-Timings auf den `menuItems`.
- Page Transition Hooks (Framers Motion Ablösung oder reine CSS Animations weiter hochjazzen).
