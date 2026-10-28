import portfolioRaw from "@/data/artworks.json";
import { PortfolioData } from "@/types/portfolio";

export function getPortfolioData(): PortfolioData {
  const data = portfolioRaw as PortfolioData;

  if (!data.profile || !data.artworks || !data.showcaseComparison || !data.commissionTiers) {
    throw new Error("Portfolio data integrity failure: Missing mandatory top-level entities in artworks.json");
  }

  return data;
}
