<!--
Sync Impact Report:
- Version change: 0.1.0 -> 1.0.0 (Initial project constitution ratification)
- List of modified principles:
  - [PRINCIPLE_1_NAME] -> I. Visual Identity: Cel-Shaded & Comic Neo-Brutalism
  - [PRINCIPLE_2_NAME] -> II. Component Interaction: Snappy, Stepped Transitions
  - [PRINCIPLE_3_NAME] -> III. Decoupled Data Layer
  - [PRINCIPLE_4_NAME] -> IV. Asset Optimization & Performance First
  - [PRINCIPLE_5_NAME] -> V. Modular Architecture & Clean Separation
- Added sections:
  - Technical Constraints & Standards
  - Development & Verification Workflow
- Removed sections: None
- Follow-up TODOs: None
-->

# 2D Cel-Shaded Artist Portfolio Constitution

## Core Principles

### I. Visual Identity: Cel-Shaded & Comic Neo-Brutalism
The UI MUST faithfully embody a cel-shaded, comic book neo-brutalist aesthetic across all pages and components. Non-negotiable visual design rules:
- **Borders**: All primary cards, frames, modals, and interactive elements MUST use thick, distinct black borders (`3px solid #000000`).
- **Drop Shadows**: Elements MUST use hard offset box shadows with zero blur radius (`6px 6px 0px #000000`). Blurred shadows or soft elevation layers are strictly prohibited.
- **Palette**: Vibrant, high-contrast flat color schemes complemented by comic book halftone or dot patterns for texture.

*Rationale*: A consistent, uncompromising neo-brutalist graphic novel aesthetic reinforces the artist's unique visual signature and guarantees visual cohesion.

### II. Component Interaction: Snappy, Stepped Transitions
Interactive components MUST employ snappy, stepped transitions reminiscent of comic panels rather than standard smooth fades or floaty easing curves:
- Animations and state toggles MUST favor stepped timing functions (`steps()`) or instant frame-to-frame shifts.
- Hover and active states MUST deliver immediate, punchy tactile feedback (e.g., hard button depression displacing by 2px to 4px).
- Smooth easing curves (`ease-in-out`, prolonged spring oscillations) SHOULD NOT be used where comic panel dynamism is expected.

*Rationale*: Comic book narrative rhythm relies on panels and hard cuts; micro-interactions must reflect that punchy visual cadence.

### III. Decoupled Data Layer
All portfolio content—including artwork assets, metadata, display tags, descriptions, and commission pricing—MUST live in a centralized data file (`artworks.json`):
- Application views and components MUST consume art data dynamically from this decoupled store.
- Art content, pricing tables, or commission status flags MUST NOT be hard-coded into UI components.
- The schema of `artworks.json` MUST be strictly typed and validated to prevent runtime presentation errors.

*Rationale*: Decoupling the data layer allows the artist to curate works, adjust commission pricing, or update metadata effortlessly without risking regressions in UI presentation code.

### IV. Asset Optimization & Performance First
Visual artwork is the core product of this application and MUST load efficiently across devices and network conditions:
- All artwork images MUST be lazy-loaded with appropriate layout aspect ratios preserved to prevent Cumulative Layout Shift (CLS).
- Modern responsive formats (WebP/AVIF) MUST be prioritized with properly sized srcset dimensions.
- High-resolution full assets MUST only load on explicit user interaction (e.g., lightbox/zoom modal).

*Rationale*: A portfolio must feel immediate and responsive; high-fidelity media cannot degrade core Web Vitals or mobile user experience.

### V. Modular Architecture & Clean Separation
The codebase MUST maintain a modular Next.js/React structure styled with Tailwind CSS utility architecture:
- Reusable UI building blocks (e.g., comic frames, buttons, tags, badges, modals) MUST remain atomic, isolated, and documented.
- Styling tokens for comic neo-brutalism (border widths, shadow offsets, custom halftone patterns) MUST be codified within Tailwind configuration for uniform reuse.
- Components MUST adhere to single-responsibility boundaries, avoiding monolithic layouts.

*Rationale*: Predictable modularity ensures maintainability, fast iteration, and clean visual regression testing as new gallery or exhibition views are added.

## Technical Constraints & Standards

- **Framework**: Next.js (React) utilizing modern App Router conventions.
- **Styling**: Tailwind CSS with custom theme extensions codifying neo-brutalist primitives (borders, shadows, colors).
- **Data Source**: Centralized `artworks.json` parsed through typed interfaces.
- **Image Handling**: Next.js Image component (`next/image`) with aggressive optimization, blur/skeleton placeholders, and responsive sizing.

## Development & Verification Workflow

1. **Design Token Compliance**: Every new component or modified view must be inspected against the 3px solid border and 6px hard shadow constraints.
2. **Data Integrity Verification**: Any modification or extension to `artworks.json` must validate against the portfolio schema before merge.
3. **Performance Gate**: Lighthouse performance score must not regress below 90 on mobile and desktop profiles for image gallery views.
4. **Visual Testing**: Verify comic panel transitions and responsiveness on mobile, tablet, and desktop viewports.

## Governance

This Constitution serves as the definitive guideline for the 2D Cel-Shaded Artist Portfolio. All features, UI updates, and architectural decisions MUST comply with the principles detailed herein.

- **Supremacy**: Architectural and aesthetic guidance in this Constitution supersedes ad-hoc component styling and individual developer preferences.
- **Amendment Procedure**: Amendments require an explicit rationale, documented changes in visual or architectural needs, and a corresponding version increment.
- **Versioning Policy**:
  - *MAJOR* bump: Changes that alter fundamental visual identity, replace core framework/styling architecture, or break the centralized data schema.
  - *MINOR* bump: New design principles, added functional sections, or non-breaking extensions to guidelines.
  - *PATCH* bump: Clarifications, typographic refinements, or minor wording adjustments.
- **Review Expectation**: Every pull request or feature spec MUST verify adherence to the visual neo-brutalism and decoupled data rules.

**Version**: 1.0.0 | **Ratified**: 2026-10-27 | **Last Amended**: 2026-10-27
