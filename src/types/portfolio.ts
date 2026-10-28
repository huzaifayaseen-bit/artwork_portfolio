export type ArtworkCategory =
  | "Character Art"
  | "Book Cover"
  | "Comic"
  | "Manga"
  | "Banner"
  | "Emotes"
  | "Mascot Logo";

export interface SocialLink {
  platform: "discord" | "twitter" | "instagram" | "artstation" | "email";
  label: string;
  url: string;
}

export interface ArtistProfile {
  name: string;
  handle: string;
  title: string;
  subtitle: string;
  status: "OPEN" | "WAITLIST" | "CLOSED";
  statusText: string;
  discordTag: string;
  email: string;
  bio: string;
  avatarUrl: string;
  heroCharacterImage: string;
  socials: SocialLink[];
}

export interface Artwork {
  id: string;
  title: string;
  category: ArtworkCategory;
  description: string;
  date: string;
  tags: string[];
  thumbnailUrl: string;
  fullUrl: string;
  aspectRatio: "1/1" | "4/5" | "16/9" | "3/4";
  featured?: boolean;
}

export interface ShowcaseComparison {
  id: string;
  title: string;
  subtitle: string;
  sketchImage: string;
  sketchLabel: string;
  renderImage: string;
  renderLabel: string;
  description: string;
}

export interface CommissionTier {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  currency: string;
  turnaroundTime: string;
  deliverables: string[];
  commercialUsage: boolean;
  popular?: boolean;
}

export interface TosCardItem {
  title: string;
  badge: string;
  rules: string[];
}

export interface TosGuidelineItem {
  id: string;
  title: string;
  iconType: "rights" | "responsibilities" | "artist-rights" | "artist-responsibilities";
  colorVariant: "green" | "pink" | "purple" | "yellow";
  points: string[];
}

export interface TermsOfServiceData {
  title: string;
  subtitle: string;
  generalTerms: TosCardItem;
  paymentInvoicing: TosCardItem;
  guidelinesTitle: string;
  guidelines: TosGuidelineItem[];
}

export interface CalculatorScope {
  id: string;
  name: string;
  subtitle: string;
  basePrice: number;
}

export interface CalculatorAddon {
  id: string;
  name: string;
  description: string;
  type: "flat" | "multiplier";
  value: number; // e.g. 60 for flat $60, or 0.5 for +50% of base
  defaultChecked?: boolean;
}

export interface CalculatorData {
  title: string;
  subtitle: string;
  scopes: CalculatorScope[];
  addons: CalculatorAddon[];
}

export interface CommissionSlot {
  id: number;
  slotNumber: string;
  status: "IN_PROGRESS" | "RESERVED" | "OPEN";
  stage: string;
  clientMask?: string;
  eta?: string;
  claimable: boolean;
}

export interface QueueData {
  title: string;
  subtitle: string;
  quarterLabel: string;
  slots: CommissionSlot[];
}

export interface ClientReview {
  id: string;
  clientName: string;
  clientRole: string;
  projectTag: string;
  rating: number;
  quote: string;
  date: string;
}

export interface ReviewsData {
  title: string;
  subtitle: string;
  ratingBadge: string;
  items: ClientReview[];
}

export interface PortfolioData {
  profile: ArtistProfile;
  artworks: Artwork[];
  showcaseComparison: ShowcaseComparison;
  commissionTiers: CommissionTier[];
  termsOfService?: TermsOfServiceData;
  calculator?: CalculatorData;
  queue?: QueueData;
  reviews?: ReviewsData;
}
