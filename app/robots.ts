import type { MetadataRoute } from "next";
import { SITE_URL } from "./family-registry";

export default function robots(): MetadataRoute.Robots {
  const isPreview = ["deploy-preview", "branch-deploy"].includes(
    process.env.CONTEXT ?? "",
  );

  if (isPreview) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
