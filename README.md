# Emilia Studio — Neo-Brutalist Artist Portfolio & Commission Engine

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.0-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Lucide Icons](https://img.shields.io/badge/Lucide-Icons-F56565?style=for-the-badge&logo=feather&logoColor=white)](https://lucide.dev/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-Deployment-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)

---

## 🎨 Overview

**Emilia Studio** is a production-grade, neo-brutalist digital portfolio and client commission engine crafted specifically for 2D cel-shaded illustrators, sequential comic artists, and independent character designers.

### Visual Identity
- **Heavy Graphic Linework**: Solid `border-[3px] border-black` boundaries and high-impact structural containers.
- **Hard Offset Drop-Shadows**: Tactile retro comic drop shadows (`shadow-[4px_4px_0px_#000]`, `shadow-[6px_6px_0px_#000]`, `shadow-[8px_8px_0px_#000]`).
- **Dynamic Scroll-Reactive Navbar**: Edge-to-edge top bar with scroll detection, transitioning from Hero-matched orange (`#FF6B35`) to stark white (`#FFFFFF`) with zero layout shift.
- **Responsive Cluster Compositions**: Tightly packed multi-layer artwork collages featuring 2.5D tilt physics and die-cut vinyl emote stickers with natural mobile fallbacks.

---

## ⚡ Key Features

### 1. Dynamic Top Navigation
- Edge-to-edge fixed header with zero jump or shrinking on scroll.
- Seamlessly blends into the Hero canvas at the top (`scrollY <= 30`), switching cleanly to pure white on all scrolled sections and dedicated subpages.
- Interactive retro sound effect toggle (SFX soundscape) with sound context integration.
- Full mobile drawer with neo-brutalist slide-out navigation panel and instant tap-to-close behavior.

### 2. Curated Multi-Filter Gallery
- Categorized archive filtering: **Character Art**, **Book Covers**, **Comics**, **Manga**, **Banners**, **Emotes**, and **Mascot Logos**.
- Real-time category item counters and dynamic column masonry layouts.
- Fullscreen high-resolution lightbox modal with keyboard navigation (`←`/`→`/`Esc`) and copy-protected rendering.

### 3. Interactive Commission Calculator
- Real-time pricing estimator with three standardized base scopes:
  - **Headshot / Bust**: `$40 USD`
  - **Half Body / Waist-Up**: `$80 USD`
  - **Full Body Illustration**: `$120 USD`
- Dynamic add-ons engine (Commercial Licensing, Additional Characters, Complex Backgrounds, Vector Inks).
- Automatic 50% PayPal deposit calculation and instant Markdown brief generation formatted for Discord direct messages.

### 4. Terms of Service // Legal Codex
- Interactive card stacking experience on desktop viewports.
- Responsive mobile unstacking: automatically disables sticky stacking on smaller viewports (`< lg`) to prevent scroll-traps.
- Covers binding artist-client rules: payment milestones, 2x revision cycle, client response SLAs, and strict anti-AI scraping clauses.

### 5. Commission Intake & Brief Builder
- One-click Discord handle copy button with visual feedback and clipboard fallbacks.
- Structured commission brief generator that outputs complete project parameters directly to `mailto:` links or clipboard.

---

## 🛠 Tech Stack & Architecture

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, Static Export Architecture)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict type checking across data models)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with bespoke neo-brutalist plugins and comic typography tokens
- **Icons**: [Lucide React](https://lucide.dev/)
- **Audio Engine**: Web Audio API Sound Context (`useSound` hook for tactile UI feedback)
- **Optimization**: Next.js Image Optimization with custom SVG/PNG sprite handling

---

## 📂 Project Structure

```text
portfolio_artwork/
├── public/
│   ├── assets/
│   │   └── artworks/
│   │       └── artwork_samples/     # Categorized portfolio assets
│   ├── logos/                       # Studio software & tool SVG logos
│   └── sfx/                         # Tactile UI sound effects (click, success, flip)
├── src/
│   ├── app/
│   │   ├── artworks/page.tsx        # Full standalone artwork gallery
│   │   ├── contact/page.tsx         # Dedicated contact & brief builder
│   │   ├── pricing/page.tsx         # Standalone pricing tiers & calculator
│   │   ├── tos/page.tsx             # Standalone Terms of Service codex
│   │   ├── globals.css              # Global styles, comic patterns & animations
│   │   ├── layout.tsx               # Root application layout & font declarations
│   │   └── page.tsx                 # Single-page orchestrated landing view
│   ├── components/
│   │   ├── commissions/             # Pricing tier cards & scope selectors
│   │   ├── contact/                 # Discord copy & commission brief builder
│   │   ├── gallery/                 # Artwork cards, category tabs & lightbox modal
│   │   ├── layout/                  # Fixed top Navbar & comic Footer
│   │   ├── pricing/                 # Real-time Commission Calculator
│   │   ├── sections/                # HeroSection, ToolsOfTheTrade, ClientReviews, TOS
│   │   ├── showcase/                # Process comparison sliders
│   │   └── ui/                      # Neo-brutalist buttons & toast alerts
│   ├── context/
│   │   └── SoundContext.tsx         # Global audio state provider
│   ├── lib/
│   │   └── portfolioData.ts         # Centralized portfolio content & artist data
│   └── types/
│       └── portfolio.ts             # TypeScript definitions & data contracts
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.18+ or 20+
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/huzaifayaseen-bit/artwork_portfolio.git
   cd artwork_portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview the production build locally:
   ```bash
   npm run start
   ```

---

## 📄 License & Attribution

All character artwork, graphic novel illustrations, and creative assets showcased in this repository are proprietary to Emilia Studio. Unauthorized scraping, reproduction, or training on artificial intelligence / machine learning datasets is strictly prohibited under the portfolio's Terms of Service.
