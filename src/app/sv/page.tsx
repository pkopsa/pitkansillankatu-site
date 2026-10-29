import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";
import { OG_IMAGE } from "@/data/pk33-images";

const BASE_URL = "https://pitkansillankatu33.com";

export const metadata: Metadata = {
  title: { absolute: "Tvårummare i Karleby centrum, 89 000 € — Pitkänsillankatu 33" },
  description:
    "Inflyttningsklar tvårummare på 69 m² i Karlebys stadskärna. Säljes 89 000 € eller uthyres möblerad till företag. Bruttohyresavkastning 9–16 %. Översta bostadsvåningen, bredvid BioRex.",
  alternates: {
    canonical: `${BASE_URL}/sv`,
    languages: {
      "fi-FI": `${BASE_URL}/`,
      "sv-FI": `${BASE_URL}/sv`,
      "en": `${BASE_URL}/en`,
      "x-default": `${BASE_URL}/`,
    },
  },
  openGraph: {
    type: "website",
    locale: "sv_FI",
    alternateLocale: ["fi_FI", "en_US"],
    url: `${BASE_URL}/sv`,
    siteName: "Pitkänsillankatu 33 – Karleby",
    title: "Tvårummare i Karlebys stadskärna, 89 000 €",
    description:
      "69 m² tvårummare i Karlebys stadskärna. Säljes 89 000 € eller uthyres möblerad till företag. Översta bostadsvåningen, bredvid BioRex.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Pitkänsillankatu 33 A 13 – möblerat vardagsrum, Karleby",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tvårummare i Karlebys stadskärna, 89 000 €",
    description: "69 m² tvårummare i Karlebys stadskärna. Säljes eller uthyres möblerad.",
    images: [OG_IMAGE],
  },
};

export default function HomeSv() {
  return <HomeContent lang="sv" />;
}
