# Quickstart & Verification Guide: Cel-Shaded 2D Artist Portfolio

**Feature**: `001-cel-shaded-portfolio`  
**Date**: 2026-10-27  

## Prerequisites
- Node.js 18+ (tested on Node v24.19.0)
- npm 9+ (tested on npm 11.17.0)

## Quick Run & Local Development

### 1. Installation & Environment
```bash
npm install
```

### 2. Development Server
Start the local Next.js development server:
```bash
npm run dev
```
Navigate to `http://localhost:3000` in your browser.

### 3. Build & Static Export Validation
Verify clean production build without TypeScript or lint errors:
```bash
npm run build
```

---

## End-to-End Verification Scenarios

### Scenario 1: Cel-Shaded Neo-Brutalist Visual Token Check
- Inspect DOM elements on cards, hero buttons, and lightbox dialog.
- Verify borders are `3px solid #000000`.
- Verify box-shadows use `6px 6px 0px #000000` (or `4px 4px 0px #000` when pressed/active).
- Confirm hover interactions provide snappy tactile translation (`translate-x-[-2px] translate-y-[-2px]`).

### Scenario 2: Art Gallery Filtering & Dynamic Data
1. Select "Character Design" tab: Only character design pieces are visible; other items are hidden without page jump.
2. Select "Comic Adaptations" tab: Grid instantly updates to comic adaptation artwork pieces.
3. Select "All": All artwork items display in responsive grid.

### Scenario 3: Lightbox Modal & Zoom
1. Click on any gallery artwork card.
2. Verify Lightbox Modal opens with black frame and backdrop.
3. Check artwork title, description, and tags match `artworks.json`.
4. Click zoom toggle button: Image scales up to 1.5x / 2x for inspecting cel-shaded lines.
5. Press `Escape` key or click close button: Modal closes immediately and restores page view.

### Scenario 4: Interactive Before/After Showcase Slider
1. Scroll to the "Artwork Pipeline" comparison section.
2. Drag slider handle horizontally: Left side reveals raw ink lines, right side reveals final cel-shaded color render.
3. Use left/right arrow keys when slider is focused: Reveal point adjusts in 5% increments.

### Scenario 5: Commission Pricing Tiers
1. Scroll to "Commission Services & Pricing".
2. Verify 3 distinct tiers: Headshot/Bust ($85), Half Body ($150), Full Character / Comic Page ($275+).
3. Inspect deliverables checklist, turnaround time badge, and commercial usage indicators.

### Scenario 6: Contact & Discord 1-Click Copy
1. Locate the Discord contact button in the Contact section.
2. Click the copy button: Clipboard copies the artist Discord tag.
3. Button label temporarily flips to "COPIED!" with tactile depression feedback.
