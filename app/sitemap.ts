import type { MetadataRoute } from "next";
import { routeRegistry, SITE_URL } from "./family-registry";

const languageAlternates = {
  en: `${SITE_URL}/en`,
  ar: `${SITE_URL}/ar`,
  "x-default": `${SITE_URL}/en`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return routeRegistry.map((route) => ({
    url: route.canonical,
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: languageAlternates,
    },
  }));
}
