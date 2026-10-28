# Implementation Plan: Cel-Shaded 2D Artist Portfolio

**Branch**: `001-cel-shaded-portfolio` | **Date**: 2026-10-27 | **Spec**: [specs/001-cel-shaded-portfolio/spec.md](spec.md)

**Input**: Feature specification from `specs/001-cel-shaded-portfolio/spec.md`

## Summary

Build a high-performance 2D Cel-Shaded Artist Portfolio web application adopting a comic book neo-brutalist aesthetic. The architecture features:
1. **Visual Style**: Strict 3px solid black borders, 6px hard zero-blur offset shadows, vibrant flat palettes, halftone dot textures, and stepped comic-panel transitions.
2. **Modular Architecture**: Next.js App Router + TypeScript + Tailwind CSS with custom theme design tokens.
3. **Decoupled Data Store**: All profile metadata, artwork pieces, before/after showcase slides, and commission tiers stored in `src/data/artworks.json`.
4. **Key Features**: Punchy Hero section with character showcase, category-filterable Art Gallery with high-res Lightbox Modal + zoom, interactive Lineart vs. Cel-Shaded comparison slider, 3-tier Commission Pricing cards, and 1-click Discord contact copy widget.

## Technical Context

**Language/Version**: TypeScript 5.x / Node.js 18+ (verified on Node v24.19.0)

**Primary Dependencies**: Next.js 15 (App Router), React 19, Tailwind CSS, Lucide React (comic-ready iconography)

**Storage**: Centralized static JSON data store (`src/data/artworks.json`) with TypeScript schema validation

**Testing**: Component visual token verification, schema validation tests, and build check (`npm run build`)

**Target Platform**: Evergreen desktop & mobile web browsers (Chrome, Safari, Firefox, Edge)

**Project Type**: Next.js Web Application / Artist Portfolio

**Performance Goals**: First Contentful Paint < 1.0s, full initial gallery render < 1.5s, 0 CLS via fixed aspect-ratio containers

**Constraints**: Strict adherence to Constitution Principles: 3px black borders (`#000`), 6px zero-blur shadows (`#000`), zero hardcoded art data in UI components

**Scale/Scope**: 1 unified portfolio showcase page with modular sections (Hero, Gallery, Lightbox, Comparison Slider, Commissions, Contact)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Principle I: Cel-Shaded & Comic Neo-Brutalism**: Strict 3px solid black borders, 6px 6px 0px #000 hard drop shadows, flat vibrant palette, and halftone dot patterns verified in Tailwind configuration design.
- [x] **Principle II: Snappy, Stepped Transitions**: Micro-interactions utilize stepped timing (`steps()`) or instant tactile button depression (2-4px displacement) without floaty smooth fades.
- [x] **Principle III: Decoupled Data Layer**: All artworks, profile details, showcase comparison images, and commission tiers defined in `src/data/artworks.json`.
- [x] **Principle IV: Asset Optimization & Performance First**: WebP/SVG optimized artwork assets, fixed aspect ratio frames (`aspectRatio` property) preventing CLS, high-res assets loaded on-demand in Lightbox.
- [x] **Principle V: Modular Architecture & Clean Separation**: Isolated atomic components (`HeroSection`, `ArtGallery`, `LightboxModal`, `ComparisonSlider`, `PricingTiers`, `ContactSection`, `ComicCard`, `ComicButton`).

## Project Structure

### Documentation (this feature)

```text
specs/001-cel-shaded-portfolio/
├── spec.md              # Feature specification
├── plan.md              # This file
├── research.md          # Technical research & aesthetic decisions
├── data-model.md        # Entities, TypeScript interfaces, validation
├── quickstart.md        # Quick run & end-to-end verification guide
├── contracts/
│   └── portfolio-data.schema.json # JSON Schema for artworks.json
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code (repository root)

```text
public/
└── assets/
    └── artworks/        # Cel-shaded artwork images, sketches, thumbnails, and avatars
src/
├── app/
│   ├── layout.tsx       # Root layout with comic font imports and meta tags
│   ├── page.tsx         # Main portfolio landing orchestrating sections
│   └── globals.css      # Custom neo-brutalist comic utilities & halftone styles
├── components/
│   ├── ui/
│   │   ├── ComicButton.tsx     # 3px border, 6px offset shadow, tactile button
│   │   ├── ComicCard.tsx       # Standard neo-brutalist panel frame
│   │   └── ComicBadge.tsx      # Punchy status tags ("COMMISSIONS OPEN")
│   ├── sections/
│   │   ├── HeroSection.tsx     # Bold title, subtitle, status, character showcase
│   │   ├── ArtGallery.tsx      # Category filter tabs & responsive grid
│   │   ├── LightboxModal.tsx   # Zoomable high-res artwork modal
│   │   ├── ComparisonSlider.tsx# Lineart vs. Cel-Shaded interactive slider
│   │   ├── CommissionPricing.tsx # 3 pricing tier cards + deliverables
│   │   └── ContactSection.tsx  # Discord copy button + inquiry links + socials
├── data/
│   └── artworks.json    # Decoupled portfolio data source
└── types/
    └── portfolio.ts     # TypeScript data contracts & schema interfaces
```

**Structure Decision**: Modern single-project Next.js App Router with atomic UI primitives (`src/components/ui`), feature sections (`src/components/sections`), decoupled data store (`src/data`), and typed contracts (`src/types`).

## Complexity Tracking

*No violations. All principles and constraints are strictly satisfied.*
