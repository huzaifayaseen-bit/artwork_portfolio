---
description: "Task list for Cel-Shaded 2D Artist Portfolio implementation"
---

# Tasks: Cel-Shaded 2D Artist Portfolio

**Input**: Design documents from `/specs/001-cel-shaded-portfolio/`  
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/portfolio-data.schema.json`, `quickstart.md`, `.specify/memory/constitution.md`

## Format: `- [ ] [TaskID] [P?] [Story?] Description with file path`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (`[US1]`, `[US2]`, `[US3]`, `[US4]`)
- Every task specifies the exact file path and action

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization, Next.js framework configuration, and styling foundation

- [x] T001 Initialize Next.js 15+ App Router TypeScript project with Tailwind CSS dependencies in `package.json`
- [x] T002 Configure Tailwind CSS theme tokens for cel-shaded neo-brutalism (`border-3`, `shadow-neo`, halftone patterns, colors) in `tailwind.config.ts` and `src/app/globals.css`
- [x] T003 [P] Create TypeScript portfolio data contracts and validation types in `src/types/portfolio.ts`
- [x] T004 [P] Create initial decoupled data store adhering to schema contract in `src/data/artworks.json`
- [x] T005 [P] Create SVG/WebP placeholder artwork and avatar assets in `public/assets/artworks/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core reusable UI primitives complying with Constitution Principles I & II (3px borders, 6px offset shadows, stepped tactile feel)

**⚠️ CRITICAL**: Must complete before user story sections can be built

- [x] T006 Implement reusable neo-brutalist button primitive (`ComicButton.tsx`) with 3px border, 6px hard shadow, and tactile click depression in `src/components/ui/ComicButton.tsx`
- [x] T007 [P] Implement comic card/panel container (`ComicCard.tsx`) with solid 3px black border, hard offset shadow, and optional comic title ribbon in `src/components/ui/ComicCard.tsx`
- [x] T008 [P] Implement punchy status badge component (`ComicBadge.tsx`) supporting "COMMISSIONS OPEN" and category tags in `src/components/ui/ComicBadge.tsx`
- [x] T009 Create data loader utility with JSON schema runtime guard in `src/lib/portfolioData.ts`
- [x] T010 Setup root application layout with comic meta tags and bold display typography in `src/app/layout.tsx`

**Checkpoint**: Core design system and data layer ready. User story implementation can now proceed.

---

## Phase 3: User Story 1 - Portfolio Curation & Interactive Art Gallery (Priority: P1) 🎯 MVP

**Goal**: Deliver the primary value proposition: visitors can browse cel-shaded artworks across categories (Character Design, Comic Adaptations, Illustrations) and view high-resolution pieces in an interactive zoomable Lightbox Modal.

**Independent Test**: Load the page, switch category filter tabs, verify instant filtering without reload, click any artwork card to open Lightbox Modal, toggle zoom (1x/1.5x/2x), and dismiss via Escape key, button, or backdrop click.

- [x] T011 [P] [US1] Build Artwork Card component with comic frame, aspect-ratio constraint, and lazy loading in `src/components/gallery/ArtworkCard.tsx`
- [x] T012 [P] [US1] Build Category Filter Tabs component ("All", "Character Design", "Comic Adaptations", "Illustrations") with stepped active state in `src/components/gallery/CategoryTabs.tsx`
- [x] T013 [US1] Build Lightbox Modal with zoom toggle (1x/1.5x/2x), metadata panel, keyboard Escape listener, and accessible backdrop in `src/components/gallery/LightboxModal.tsx`
- [x] T014 [US1] Assemble full Art Gallery section integrating CategoryTabs, ArtworkCard grid, empty state fallback, and LightboxModal state in `src/components/sections/ArtGallery.tsx`

**Checkpoint**: User Story 1 complete and independently testable as a standalone working MVP gallery.

---

## Phase 4: User Story 2 - Visual Identity Hero & Interactive Before/After Showcase (Priority: P2)

**Goal**: Deliver punchy comic landing branding, "COMMISSIONS OPEN" hero showcase, and interactive Lineart/Sketch vs. Cel-Shaded Render comparison slider.

**Independent Test**: View Hero section for bold comic typography, status indicator, and featured character card; drag/slide comparison slider horizontally and test arrow key stepping to reveal lineart vs. cel-shaded render.

- [x] T015 [P] [US2] Build Hero Section with bold comic title, tagline, "COMMISSIONS OPEN" badge, and featured character showcase frame in `src/components/sections/HeroSection.tsx`
- [x] T016 [US2] Build accessible Before/After Comparison Slider with pointer drag, touch support, and keyboard arrow navigation in `src/components/showcase/ComparisonSlider.tsx`
- [x] T017 [US2] Assemble Interactive Showcase section highlighting workflow breakdown and cel-shading pipeline in `src/components/sections/ShowcaseSection.tsx`

**Checkpoint**: User Stories 1 and 2 functional and integrated on main landing view.

---

## Phase 5: User Story 3 - Commission Pricing Tiers & Service Scope (Priority: P3)

**Goal**: Present transparent commission pricing tiers (Headshot/Bust, Half Body, Full Character / Comic Page), turnaround times, and commercial rights tags.

**Independent Test**: Inspect Commission Pricing section, confirm 3 tier cards render price, deliverables checklist, turnaround badge, and commercial usage indicators sourced dynamically from `artworks.json`.

- [x] T018 [P] [US3] Build Commission Tier Card component with price header, deliverables checklist, and commercial rights badge in `src/components/commissions/PricingTierCard.tsx`
- [x] T019 [US3] Assemble Commission Pricing section with terms of service notes and inquiry CTA button in `src/components/sections/CommissionPricing.tsx`

**Checkpoint**: User Stories 1, 2, and 3 fully functional.

---

## Phase 6: User Story 4 - Seamless Outreach & Direct Contact (Priority: P4)

**Goal**: Provide 1-click Discord handle copy button with instant feedback, inquiry mailto trigger, and verified social media links.

**Independent Test**: Click Discord copy button, verify "COPIED!" tactile state and clipboard content; click email inquiry action; click social links to confirm external tab navigation.

- [x] T020 [P] [US4] Build Discord Copy Button with clipboard API fallback and tactile confirmation state in `src/components/contact/DiscordCopyButton.tsx`
- [x] T021 [US4] Assemble Contact & Outreach section with email inquiry prompt, social media links panel, and footer colophon in `src/components/sections/ContactSection.tsx`

**Checkpoint**: All user stories implemented.

---

## Phase 7: Polish & Integration

**Purpose**: Assemble all modular sections onto `src/app/page.tsx`, verify constitution tokens, test responsive layouts, and run build validation.

- [x] T022 Wire all sections (Hero, Gallery, Showcase, Commissions, Contact) into main page in `src/app/page.tsx`
- [x] T023 [P] Build sticky comic navigation header with anchor links and instant commission status in `src/components/layout/Navbar.tsx`
- [x] T024 Audit design tokens across all components (verifying 3px solid black borders, 6px hard zero-blur shadows) in `src/app/globals.css`
- [x] T025 Run end-to-end verification checklist per `specs/001-cel-shaded-portfolio/quickstart.md`
- [x] T026 Execute production build validation (`npm run build`) ensuring zero TypeScript or packaging errors

---

## Dependencies & Execution Order

### Phase Dependencies
- **Phase 1 (Setup)**: Complete.
- **Phase 2 (Foundational)**: Complete.
- **Phase 3 (User Story 1 - P1)**: Complete.
- **Phase 4 (User Story 2 - P2)**: Complete.
- **Phase 5 (User Story 3 - P3)**: Complete.
- **Phase 6 (User Story 4 - P4)**: Complete.
- **Phase 7 (Polish & Integration)**: Complete.
