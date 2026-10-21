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
const AIRBNB_URL = "https://www.airbnb.fi/rooms/1704146913497501882";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // Title-template ja oletusarvot — per-sivu metadata yliajaa nämä reittikohtaisesti
  title: {
    default: "Pitkänsillankatu 33 A 13 — Kokkola",
    template: "%s | Pitkänsillankatu 33 Kokkola",
  },

  keywords: [
    // ── SUOMI ──
    "sijoitusasunto Kokkola", "kaksio Kokkola", "Pitkänsillankatu 33",
    "asunto myytävänä Kokkola", "kerrostaloasunto Kokkola",
    "1930-luvun kerrostalo Kokkola",
    "vuokra-asunto yritykselle Kokkola", "kalustettu asunto Kokkola",
    "yritysasunto Kokkola", "lyhytaikainen vuokra Kokkola",
    "työsuhde-asunto Kokkola", "majoitus yrityksille Kokkola",
    "majoitus Kokkola keskusta", "loma-asunto Kokkola ydinkeskusta", "Airbnb Kokkola",
    // ── RUOTSI ──
    "lägenhet till salu Karleby", "tvårummare Karleby centrum",
    "investering lägenhet Karleby", "möblerad lägenhet Karleby",
    "hyra lägenhet företag Karleby", "korttidsuthyrning Karleby",
    "boende Karleby centrum", "semesterlägenhet Karleby", "Airbnb Karleby",
    // ── ENGLANTI ──
    "apartment for sale Kokkola", "investment property Kokkola",
    "furnished apartment Kokkola", "corporate housing Kokkola",
    "short term rental Kokkola", "serviced apartment Kokkola Finland",
    "accommodation Kokkola city centre", "holiday apartment Kokkola", "Airbnb Kokkola Finland",
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

  other: {
    "geo.region": "FI-07",
    "geo.placename": "Kokkola",
    "geo.position": "63.83726;23.13320",
    "ICBM": "63.83726, 23.13320",
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
        "Muuttovalmis sijoitusasunto Kokkolan ydinkeskustassa. 69 m², ylin kerros, bruttovuokratuotto 8,8–10,1 %. Kalustettavissa yritysvuokraukseen.",
      url: BASE_URL,
      image: `${BASE_URL}/og-image.jpg`,
      sameAs: [AIRBNB_URL],
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
        latitude: 63.83726,
        longitude: 23.13320,
      },
      floorSize: {
        "@type": "QuantitativeValue",
        value: 69,
        unitCode: "MTK",
      },
      numberOfRooms: 2,
      numberOfBathroomsTotal: 1,
      yearBuilt: 1930,
      floorLevel: "Top floor (3/3)",
      offers: [
        {
          "@type": "Offer",
          name: "Myynti",
          price: 89000,
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          offeredBy: {
            "@type": "RealEstateAgent",
            name: "Asunto Björndahl Kokkola LKV Oy",
            url: "https://www.asuntobjorndahl.fi",
            employee: {
              "@type": "Person",
              name: "Petri Kaskilahti",
              jobTitle: "Kiinteistönvälittäjä LKV",
              telephone: "+358401480636",
              email: "petri@asuntobjorndahl.fi",
            },
          },
        },
        {
          "@type": "Offer",
          name: "Vuokraus yrityksille",
          description:
            "Kalustettu tai kalustamaton. Sopii yritysasunnoksi tai väliaikaismajoitukseksi.",
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: 650,
            maxPrice: 750,
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
        {
          "@type": "Offer",
          name: "Lyhytaikainen majoitus Airbnb:ssä",
          description:
            "Kalustettu kaksio Kokkolan ydinkeskustassa Airbnb-palvelun kautta. Viikon varaus −15 %, kuukauden varaus −50 %, vähintään 2 vrk.",
          url: AIRBNB_URL,
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
        { "@type": "LocationFeatureSpecification", name: "Ylin kerros — ei ylänaapuria", value: true },
        { "@type": "LocationFeatureSpecification", name: "Maalattu 2026", value: true },
        { "@type": "LocationFeatureSpecification", name: "Kalustettavissa", value: true },
        { "@type": "LocationFeatureSpecification", name: "Ydinkeskusta", value: true },
        { "@type": "LocationFeatureSpecification", name: "Kävelyetäisyys palveluihin", value: true },
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
