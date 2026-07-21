import type { MetadataRoute } from "next";

const siteUrl = "https://elshafey.online";

const languageAlternates = {
  en: `${siteUrl}/en`,
  ar: `${siteUrl}/ar`,
  "x-default": `${siteUrl}/en`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return (["en", "ar"] as const).map((language) => ({
    url: `${siteUrl}/${language}`,
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: languageAlternates,
    },
  }));
}
