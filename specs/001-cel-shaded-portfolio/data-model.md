# Data Model: Cel-Shaded 2D Artist Portfolio

**Feature**: `001-cel-shaded-portfolio`  
**Date**: 2026-10-27  
**Schema Source**: `src/data/artworks.json` & `src/types/portfolio.ts`

## 1. Entities & Schemas

### 1.1 ArtistProfile
Represents the portfolio owner's metadata, brand presence, and availability.

```typescript
export interface ArtistProfile {
  name: string;               // e.g. "VALKYRIE // 2D Cel Artist"
  handle: string;             // e.g. "@valk_cel"
  title: string;              // e.g. "Lead Concept Artist & Comic Illustrator"
  subtitle: string;           // Bold comic tagline
  status: "OPEN" | "WAITLIST" | "CLOSED";
  statusText: string;         // e.g. "COMMISSIONS OPEN - Q4 SLOTS"
  discordTag: string;         // e.g. "valkyrie_art#0001"
  email: string;              // e.g. "commissions@valk-art.com"
  bio: string;                // Short artist bio
  socials: SocialLink[];
}

export interface SocialLink {
  platform: "discord" | "twitter" | "instagram" | "artstation" | "email";
  label: string;
  url: string;
}
```

### 1.2 Artwork
Represents individual artwork portfolio pieces displayed in the gallery and lightbox.

```typescript
export type ArtworkCategory = "Character Design" | "Comic Adaptations" | "Illustrations";

export interface Artwork {
  id: string;                 // Unique identifier, e.g. "art-001"
  title: string;              // e.g. "CYBERPUNK RONIN // REKKA"
  category: ArtworkCategory;  // Category filter mapping
  description: string;        // Visual narrative context & lore
  date: string;               // ISO date format (YYYY-MM)
  tags: string[];             // e.g. ["Cel-Shade", "Cyberpunk", "Original Character"]
  thumbnailUrl: string;       // WebP/SVG optimized thumbnail asset
  fullUrl: string;            // High-resolution full asset for Lightbox zoom
  aspectRatio: "1/1" | "4/5" | "16/9" | "3/4"; // Fixed layout ratio to prevent CLS
  featured?: boolean;         // Flag for hero or highlight display
}
```

### 1.3 ShowcaseComparison
Represents the interactive sketch vs. final cel-shade comparison slider item.

```typescript
export interface ShowcaseComparison {
  id: string;
  title: string;              // e.g. "Character Workflow Breakdown"
  subtitle: string;           // e.g. "Raw Ink Lineart vs. Final Multi-Layer Cel-Shading"
  sketchImage: string;        // Path to rough pencil / lineart artwork asset
  sketchLabel: string;        // e.g. "RAW INKS & SKETCH"
  renderImage: string;        // Path to finalized cel-shaded artwork asset
  renderLabel: string;        // e.g. "CEL-SHADED FINAL"
  description: string;
}
```

### 1.4 CommissionTier
Represents service tiers, pricing, deliverables, and commercial terms.

```typescript
export interface CommissionTier {
  id: string;                 // e.g. "tier-bust"
  name: string;               // e.g. "Bust / Headshot"
  subtitle: string;           // e.g. "Punched-up comic portrait"
  price: number;              // Baseline USD price (e.g. 85)
  currency: string;           // e.g. "USD"
  turnaroundTime: string;     // e.g. "3-5 Business Days"
  deliverables: string[];     // Checklist of included files/resolutions
  commercialUsage: boolean;   // Whether commercial rights are bundled/optional
  popular?: boolean;          // Stylized badge highlight
}
```

### 1.5 Root Portfolio Data Contract
The top-level JSON file structure stored at `src/data/artworks.json`.

```typescript
export interface PortfolioData {
  profile: ArtistProfile;
  artworks: Artwork[];
  showcaseComparison: ShowcaseComparison;
  commissionTiers: CommissionTier[];
}
```

---

## 2. Validation & Invariants

1. **Category Integrity**: Every `Artwork` category MUST match one of the predefined categories (`Character Design`, `Comic Adaptations`, `Illustrations`).
2. **Aspect Ratio Enforcement**: Each artwork must supply a defined aspect ratio to enforce CSS aspect-ratio containment and satisfy Constitution Principle IV (preventing CLS).
3. **Price Non-Negativity**: Commission prices must be positive numbers.
4. **Unique Identifiers**: All `id` attributes across artworks and commission tiers must be unique.
