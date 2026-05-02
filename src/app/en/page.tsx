import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

const BASE_URL = "https://pitkansillankatu33.com";

export const metadata: Metadata = {
  title: { absolute: "2-room apt in Kokkola city centre, €89,900 — Pitkänsillankatu 33" },
  description:
    "Move-in ready 69 m² apartment in Kokkola city centre. For sale at €89,900 or furnished corporate rental. Gross rental yield 8.7–10.0%. Top floor, next to BioRex cinema.",
  alternates: {
    canonical: `${BASE_URL}/en`,
    languages: {
      "fi-FI": `${BASE_URL}/`,
      "sv-FI": `${BASE_URL}/sv`,
      "en": `${BASE_URL}/en`,
      "x-default": `${BASE_URL}/`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fi_FI", "sv_FI"],
    url: `${BASE_URL}/en`,
    siteName: "Pitkänsillankatu 33 – Kokkola",
    title: "Top-floor 2-room apartment in Kokkola, €89,900",
    description:
      "69 m² apartment in Kokkola city centre. For sale at €89,900 or furnished corporate rental. Top floor, next to BioRex.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pitkänsillankatu 33 A 13 – furnished living room, Kokkola",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top-floor 2-room apartment in Kokkola, €89,900",
    description: "69 m² apartment in Kokkola city centre. For sale or furnished rental.",
    images: ["/og-image.jpg"],
  },
};

export default function HomeEn() {
  return <HomeContent lang="en" />;
}
