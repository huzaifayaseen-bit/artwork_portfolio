import type { Metadata } from "next";
import { Bebas_Neue, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { SoundProvider } from "@/context/SoundContext";
import { ComicNewsletterModal } from "@/components/ui/ComicNewsletterModal";
import { ArtworkProtectionToast } from "@/components/ui/ArtworkProtectionToast";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "EMILIA // 2D Cel-Shaded Artist & Illustrator",
    template: "%s // EMILIA Art",
  },
  description:
    "Specialized in dynamic cel-shaded character design, sequential comic pages, and graphic novel covers. Commissions open.",
  keywords: [
    "2D Artist",
    "Cel-Shaded",
    "Comic Art",
    "Concept Art",
    "Character Design",
    "Manga Illustration",
    "Graphic Novel Covers",
    "Emilia Art",
  ],
  authors: [{ name: "Emilia", url: siteUrl }],
  creator: "Emilia",
  openGraph: {
    title: "EMILIA // 2D Cel-Shaded Artist & Illustrator",
    description:
      "Specialized in dynamic cel-shaded character design, sequential comic pages, and graphic novel covers. Commissions open.",
    siteName: "EMILIA Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "EMILIA // 2D Cel-Shaded Artist & Illustrator",
    description:
      "Specialized in dynamic cel-shaded character design, sequential comic pages, and graphic novel covers. Commissions open.",
    creator: "@emilia_art",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-sans antialiased min-h-screen selection:bg-comic-yellow selection:text-black text-neutral-900">
        <SoundProvider>
          {children}
          <ComicNewsletterModal />
          <ArtworkProtectionToast />
        </SoundProvider>
      </body>
    </html>
  );
}
