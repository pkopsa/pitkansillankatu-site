import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://pitkansillankatu33.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Pitkänsillankatu 33 A 13 – Asunto myyntiin tai vuokralle yrityksille | Kokkola | 69 m²",
    template: "%s | Pitkänsillankatu 33 Kokkola",
  },
  description:
    "Laadukas kaksio Kokkolan ydinkeskustassa – myytävänä 99 200 € tai vuokrattavissa yrityksille. 69 m², ylin kerros, kalustettu tai kalustamaton. Bruttovuokratuotto 9–10 %. BioRexin vieressä. Ota yhteyttä: +358 50 306 0635.",
  keywords: [
    // ── SUOMI ──────────────────────────────────────────────────────
    // Myynti
    "sijoitusasunto Kokkola",
    "asuinhuoneisto Kokkola",
    "kaksio Kokkola",
    "Pitkänsillankatu 33",
    "Kokkolan keskusta asunto",
    "asunto myytävänä Kokkola",
    "Kokkola kiinteistö",
    "huipputuotto sijoitus",
    "myynti Kokkola",
    "kerrostaloasunto Kokkola",
    "1930-luvun kerrostalo Kokkola",
    // Vuokraus yrityksille
    "vuokra-asunto Kokkola",
    "vuokra-asunto yritykselle Kokkola",
    "yritysasunto Kokkola",
    "lyhytaikainen vuokra Kokkola",
    "asunto yrityksille Kokkola",
    "työsuhde-asunto Kokkola",
    "kuukausivuokra Kokkola",
    "kalustettu asunto Kokkola",
    "väliaikaismajoitus yritys Kokkola",
    "Kokkola yritysvuokraus",
    "asunto vierailijoille Kokkola",
    "majoitus yrityksille Kokkola",
    "business asunto Kokkola",

    // ── RUOTSI ─────────────────────────────────────────────────────
    // Försäljning
    "lägenhet till salu Karleby",
    "tvårummare Karleby centrum",
    "investering lägenhet Karleby",
    "bostadsrätt Karleby",
    "Karleby fastighet",
    "lägenhet Karleby centrum",
    "historisk byggnad Karleby",
    "1930-talets hyreshus Karleby",
    // Uthyrning
    "hyreslägenhet Karleby",
    "hyra lägenhet företag Karleby",
    "företagsboende Karleby",
    "möblerad lägenhet Karleby",
    "korttidsuthyrning Karleby",
    "boende för företag Karleby",
    "månadsuthyrning Karleby",
    "tillfälligt boende Karleby",

    // ── ENGLANTI ───────────────────────────────────────────────────
    // Sales
    "apartment for sale Kokkola",
    "investment property Kokkola",
    "flat for sale Kokkola Finland",
    "Kokkola real estate",
    "Kokkola city centre apartment",
    "historic 1930s building Kokkola",
    // Rental
    "corporate housing Kokkola",
    "furnished apartment Kokkola",
    "short term rental Kokkola",
    "furnished rental Kokkola",
    "apartment for rent Kokkola",
    "business accommodation Kokkola",
    "monthly rental Kokkola",
    "temporary housing Kokkola",
    "serviced apartment Kokkola Finland",
  ],
  authors: [{ name: "Petri Kopsa", url: BASE_URL }],
  creator: "Petri Kopsa",
  publisher: "Terassitalo",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      "fi": BASE_URL,
      "sv": BASE_URL,
      "en": BASE_URL,
      "x-default": BASE_URL,
    },
  },

  openGraph: {
    type: "website",
    locale: "fi_FI",
    alternateLocale: ["sv_SE", "en_US"],
    url: BASE_URL,
    siteName: "Pitkänsillankatu 33 – Kokkola",
    title: "Pitkänsillankatu 33 A 13 – Asunto myyntiin tai vuokralle yrityksille | Kokkola",
    description:
      "Laadukas kaksio Kokkolan ydinkeskustassa. Myytävänä 99 200 € tai vuokrattavissa yrityksille. 69 m², kalustettu tai kalustamaton, BioRexin vieressä.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Pitkänsillankatu 33 A 13 – olohuone, Kokkola",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Pitkänsillankatu 33 A 13 – Myynti tai yritysuvokraus | Kokkola",
    description:
      "69 m² kaksio Kokkolan ydinkeskustassa. Myytävänä tai vuokrattavissa yrityksille. Kalustettu tai kalustamaton.",
    images: ["/og-image.jpg"],
  },

  other: {
    "geo.region": "FI-07",
    "geo.placename": "Kokkola",
    "geo.position": "63.83768;23.13045",
    "ICBM": "63.83768, 23.13045",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Apartment",
      "@id": `${BASE_URL}/#apartment`,
      name: "Pitkänsillankatu 33 A 13",
      description:
        "Muuttovalmis sijoitusasunto Kokkolan ydinkeskustassa. 69 m², ylin kerros, bruttovuokratuotto 9–10 %.",
      url: BASE_URL,
      image: `${BASE_URL}/og-image.jpg`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Pitkänsillankatu 33 A 13",
        addressLocality: "Kokkola",
        postalCode: "67100",
        addressCountry: "FI",
        addressRegion: "Keski-Pohjanmaa",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 63.83768,
        longitude: 23.13045,
      },
      floorSize: {
        "@type": "QuantitativeValue",
        value: 69,
        unitCode: "MTK",
      },
      numberOfRooms: 2,
      offers: [
        {
          "@type": "Offer",
          name: "Myynti",
          price: 99200,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Person",
            name: "Petri Kopsa",
            telephone: "+358503060635",
            email: "petri.kopsa@gmail.com",
          },
        },
        {
          "@type": "Offer",
          name: "Vuokraus yrityksille",
          description: "Kalustettu tai kalustamaton. Sopii yritysasunnoksi tai väliaikaismajoitukseksi.",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: 700,
            maxPrice: 850,
            priceCurrency: "EUR",
            unitCode: "MON",
          },
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Person",
            name: "Petri Kopsa",
            telephone: "+358503060635",
            email: "petri.kopsa@gmail.com",
          },
        },
      ],
      amenityFeature: [
        { "@type": "LocationFeatureSpecification", name: "Ylin kerros", value: true },
        { "@type": "LocationFeatureSpecification", name: "Maalattu 2026", value: true },
        { "@type": "LocationFeatureSpecification", name: "Ydinkeskusta", value: true },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Pitkänsillankatu 33 – Kokkola",
      inLanguage: ["fi", "sv", "en"],
      publisher: {
        "@type": "Person",
        name: "Petri Kopsa",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${BASE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Etusivu",
          item: BASE_URL,
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fi"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
