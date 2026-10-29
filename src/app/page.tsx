import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";
import { OG_IMAGE } from "@/data/pk33-images";

const BASE_URL = "https://pitkansillankatu33.com";

export const metadata: Metadata = {
  title: { absolute: "Kaksio Kokkolan ydinkeskustassa, 89 000 € — Pitkänsillankatu 33" },
  description:
    "Muuttovalmis 69 m² kaksio Kokkolan ydinkeskustassa. Myydään 89 000 € tai vuokrataan yrityksille kalustettuna. Bruttovuokratuotto 8,8–10,1 %. Ylin kerros, BioRexin vieressä.",
  alternates: {
    canonical: BASE_URL,
    languages: {
      "fi-FI": `${BASE_URL}/`,
      "sv-FI": `${BASE_URL}/sv`,
      "en": `${BASE_URL}/en`,
      "x-default": `${BASE_URL}/`,
    },
  },
  openGraph: {
    type: "website",
    locale: "fi_FI",
    alternateLocale: ["sv_FI", "en_US"],
    url: BASE_URL,
    siteName: "Pitkänsillankatu 33 – Kokkola",
    title: "Kaksio Kokkolan ydinkeskustassa, 89 000 €",
    description:
      "69 m² kaksio Kokkolan ydinkeskustassa. Myynti 89 000 € tai yritysvuokraus kalustettuna. Ylin kerros, BioRexin vieressä.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Pitkänsillankatu 33 A 13 – kalustettu olohuone, Kokkola",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kaksio Kokkolan ydinkeskustassa, 89 000 €",
    description: "69 m² kaksio Kokkolan ydinkeskustassa. Myynti tai yritysvuokraus.",
    images: [OG_IMAGE],
  },
};

export default function HomeFi() {
  return <HomeContent lang="fi" />;
}
