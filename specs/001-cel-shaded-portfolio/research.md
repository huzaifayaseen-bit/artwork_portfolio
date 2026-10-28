# Research: Cel-Shaded 2D Artist Portfolio Architecture & Aesthetics

**Feature**: `001-cel-shaded-portfolio`  
**Date**: 2026-10-27  
**Status**: Completed

## 1. Visual Styling: Neo-Brutalist Cel-Shaded Comic System

### Decision
Codify custom Tailwind CSS utility classes and CSS variables enforcing:
- Hard black borders: `border-[3px] border-black`
- Zero-blur offset drop shadows: `shadow-[6px_6px_0px_#000000]` with interactive hover `hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000000]` and active `active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0px_#000000]`
- Halftone patterns: CSS radial gradient dots background (`radial-gradient(#000 15%, transparent 16%)`)
- Stepped transitions: `transition-none` or CSS `transition-timing-function: steps(2, jump-none)` to simulate comic frame snaps.

### Rationale
Strictly complies with Constitution Principle I (Cel-Shaded & Comic Neo-Brutalism) and Principle II (Snappy Stepped Transitions). Using Tailwind extensions guarantees that every component stays visually consistent without ad-hoc style drift.

### Alternatives Considered
- *Tailwind default rounded & blurred drop shadows*: Rejected due to direct violation of Constitution Principle I.
- *Framer Motion smooth spring physics*: Rejected for standard interactions because floaty spring easing contradicts comic book panel snap principles; simple stepped CSS transitions provide superior tactile comic feel with zero bundle weight.

---

## 2. Decoupled Data Store & Schema Strategy

### Decision
Store all portfolio entities in `src/data/artworks.json` parsed and validated via a TypeScript type definition file (`src/types/portfolio.ts`):
- Root schema holds `profile`, `artworks`, `showcaseComparison`, and `commissionTiers`.
- Artworks include `id`, `title`, `category`, `description`, `date`, `tags`, `thumbnailUrl`, `fullUrl`, `aspectRatio`, and `featured`.
- Image assets placed in `public/assets/artworks/` with responsive SVG/WebP placeholder art for immediate standalone local demonstration.

### Rationale
Satisfies Constitution Principle III (Decoupled Data Layer) and Feature Requirement FR-009. The artist can curate artwork, modify commission pricing tiers, or update their Discord tag without touching a single React component.

### Alternatives Considered
- *Headless CMS (Sanity / Contentful)*: Over-engineered for a standalone artist portfolio; adds network latency, API key management, and potential external failure points.
- *Hardcoded React component props*: Violates Constitution Principle III.

---

## 3. Interactive Before/After Showcase Slider

### Decision
Implement a lightweight zero-dependency React comparison slider (`ComparisonSlider.tsx`):
- Uses CSS clip-path or absolute overlay positioning (`width: ${sliderPos}%` with `overflow-hidden`).
- Supports mouse drag, touch drag (`onTouchMove`), and keyboard accessibility (left/right arrow keys adjusting percentage by 5% increments, `role="slider"`).
- Styled with a comic-styled vertical divider bar (3px black line, circular drag handle with comic dot pattern and 3px border).

### Rationale
Maintains zero external dependency overhead while fulfilling User Story 2, FR-005, and keyboard/touch accessibility standards.

### Alternatives Considered
- *Third-party slider packages (e.g. `react-compare-image`)*: Adds unnecessary dependencies that conflict with custom neo-brutalist styling tokens and stepped interaction requirements.

---

## 4. Lightbox Modal & Zoom Architecture

### Decision
Build a custom accessible Lightbox component (`LightboxModal.tsx`):
- Dialog element managed with React portals or top-level overlay with `aria-modal="true"`.
- Keyboard event listeners for `Escape` (dismiss), and click-outside backdrop dismissal.
- Stepped zoom toggle (1x / 1.5x / 2x) simulating magnifying comic details with smooth pan or centered scroll.
- Next.js Image component with `object-contain` and preserved aspect ratios preventing layout shift.

### Rationale
Satisfies User Story 1, FR-004, and Constitution Principle IV (Asset Optimization).

### Alternatives Considered
- *External lightbox libraries (Yet Another React Lightbox)*: Often bundle smooth animations and default dark-glass styling that clashes with comic neo-brutalism.

---

## 5. Framework & Project Scaffolding

### Decision
Use Next.js 15+ (App Router) + React 19 + TypeScript + Tailwind CSS v3/v4:
- Modern Next.js App Router provides built-in image optimization (`next/image`), static site generation (SSG) for ultra-fast load times (<1.5s as required by SC-001), and clean modular architecture complying with Constitution Principle V.
- Lucide React for crisp neo-brutalist icons (Discord, Twitter/X, Instagram, ArtStation, Mail, Zoom, Copy, Check).

### Rationale
Aligns directly with Constitution Technical Constraints: Next.js App Router, Tailwind CSS, TypeScript, and `next/image`.
