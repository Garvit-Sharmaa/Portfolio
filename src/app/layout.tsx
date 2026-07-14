import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://garvitbhardwaj.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Garvit Bhardwaj | AI & Full-Stack Engineer",
    template: "%s | Garvit Bhardwaj"
  },
  description: "I engineer production-grade AI and full-stack systems. No tutorials. No toy datasets.",
  openGraph: {
    title: "Garvit Bhardwaj | AI & Full-Stack Engineer",
    description: "I engineer production-grade AI and full-stack systems. No tutorials. No toy datasets.",
    url: siteUrl,
    siteName: "Garvit Bhardwaj Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garvit Bhardwaj | AI & Full-Stack Engineer",
    description: "I engineer production-grade AI and full-stack systems.",
  },
};

import OmniSearch from "@/features/search/OmniSearch";
import IntelligenceChat from "@/features/search/IntelligenceChat";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${playfair.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-industrial-orange/30 selection:text-white">
        <OmniSearch />
        <IntelligenceChat />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
