import type { MetadataRoute } from "next";

const BASE = "https://pitkansillankatu33.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const languages = {
    "fi-FI": `${BASE}/`,
    "sv-FI": `${BASE}/sv`,
    "en": `${BASE}/en`,
  };

  return [
    {
      url: `${BASE}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: { languages },
    },
    {
      url: `${BASE}/sv`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages },
    },
    {
      url: `${BASE}/en`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages },
    },
  ];
}
