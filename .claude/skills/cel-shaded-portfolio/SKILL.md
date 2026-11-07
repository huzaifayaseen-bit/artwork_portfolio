---
name: cel-shaded-portfolio
description: Design principles and creative direction for a professional 2D cel-shaded artist & comic illustrator portfolio.
---

# Cel-Shaded Artist Portfolio Design

Art direction, frontend architecture, and 2D motion guidelines for Emilia's professional 2D Cel-Shaded & Comic Illustration portfolio.

## 1. Core Art Direction & Aesthetic Philosophy

- **Authentic 2D Cel-Shaded & Comic World**: Treat the entire web application as a tactile, premium comic sketchbook and artist atelier.
- **Warm Canvas Ground**: Avoid stark, sterile `#FFFFFF` planes. Ground layouts in warm paper tones (`#FAF7F2`, `#FDFBF7`, `#F6F2E9`) that feel like heavy archival comic paper or hot-press manga bristol board.
- **Neo-Brutalist Comic Inking**:
  - Crisp, decisive black borders (`border-2` or `border-[3px] border-black`).
  - Solid, hard-edged drop shadows (`shadow-[4px_4px_0px_#000000]`, `shadow-[6px_6px_0px_#000000]`, `shadow-[8px_8px_0px_#000000]`).
  - Tactile button press feedback (`translate(2px, 2px)` on active with reduced shadow).
- **Established Brand Palette**:
  - Ground: Warm comic paper (`#FAF7F2` / `#FAF6EE`)
  - Inks: Pitch Black (`#111111` / `#000000`)
  - Primary Highlight: Comic Yellow (`#FFE600`)
  - Accent Inks: Comic Pink (`#FF3366`), Comic Cyan / Turquoise (`#00E5FF`), Comic Purple / Violet (`#9933FF`), Comic Green (`#00FF66`).
  - Strict Rule: Do **not** invent muddy gradients or random neon spectrums that detract from the artist's original color identity.

## 2. Strong Visual Hierarchy & Modern Editorial Typography

- **Display & Headings**: `font-comic` / `font-heading` (`Bebas Neue` / `Impact` fallback) in uppercase, tight leading (`leading-[0.9]`), high impact.
- **Editorial Subheaders & UI Tags**: `font-nav` (`Space Grotesk`) uppercase, tracking-wide or tracking-wider, high-contrast pills and badges.
- **Body & Long Form**: Clean, highly readable sans-serif (`font-sans` / `Inter`) with relaxed line heights.
- **Uncompromising Readability**: Text must sit above background textures with sufficient contrast and solid card/badge backdrops. Never let illustrations or background patterns compromise legibility.

## 3. Creative CSS/SVG-Based 2D Animations

- **Layered 2D Depth Over 3D**:
  - Create spatial dimension using multi-layered 2D planes, staggered z-indices, offset frames, and subtle differential speed translation.
  - Reject bloated 3D libraries (Three.js/WebGL canvas meshes) for core interface work. The identity is purely **2D Cel-Shaded**.
- **Deliberate Kinetic Micro-Interactions**:
  - Gentle floating bobbing (`animate-float-bob`, ~4s ease-in-out loops).
  - Comic screen snap transitions (`animate-comic-snap`, stepped or bouncy cubic-bezier curves).
  - Subtle mouse-tracking parallax on layered background elements using smooth interpolation.
- **Illustrated Background Ambience**:
  - Subtle comic halftone screen textures (opacity between 3% and 8%).
  - Hand-drawn manga speed accents, registration marks (`+`, `✦`, `×`), editorial grid borders, and abstract ink washes.
  - Organic 2D vector shapes in turquoise, violet, and yellow tucked behind showcase panels.

## 4. Performance & Motion Accessibility

- **Hardware Acceleration**: Animate strictly with `transform` (`translate3d`, `rotate`) and `opacity`. Use `will-change` selectively.
- **Smooth & Lightweight**: Zero runtime heavy animation libraries for static layers. Keep bundles lean.
- **Motion Sensitivity (`prefers-reduced-motion: reduce`)**:
  - Always provide a media query disabling background drifts, bobbing loops, and heavy transforms.
  - Keep content immediately accessible and statically stable when reduced motion is preferred.

## 5. Strict Guardrails

1. **Artwork is the Hero**: The artist's character art and animation loops must remain the focal point. Background decorations must remain secondary, harmonizing through low opacity and thoughtful positioning.
2. **No Generic Website Templates**: Avoid rounded generic SaaS cards, diffuse pastel drop shadows, or generic corporate illustrations.
3. **Preserve Functionality**: Maintain fast routing, zero console errors, responsive mobile scaling, and full keyboard/screen-reader accessibility.
