import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FamilyPage } from "../FamilyPage";
import {
  familyRegistry,
  isLanguage,
  routeFor,
  SITE_URL,
  structuredDataFor,
} from "../family-registry";

const isPreview = ["deploy-preview", "branch-deploy"].includes(
  process.env.CONTEXT ?? "",
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  const route = routeFor(lang);
  const copy = familyRegistry.locales[lang];

  return {
    metadataBase: new URL(SITE_URL),
    title: route.title,
    description: route.description,
    alternates: {
      canonical: route.path,
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en",
      },
    },
    robots: isPreview
      ? {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true },
        },
    openGraph: {
      type: "website",
      url: route.path,
      siteName: copy.siteName,
      title: route.title,
      description: route.description,
      images: [
        {
          url: "/og-family-5d24203e.jpg",
          width: 1200,
          height: 630,
          alt: copy.metadata.socialImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: route.title,
      description: copy.metadata.socialDescription,
      images: ["/og-family-5d24203e.jpg"],
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
  };
}

export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  const structuredData = JSON.stringify(structuredDataFor(lang)).replace(
    /</g,
    "\\u003c",
  );

  return (
    <>
      <FamilyPage language={lang} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
    </>
  );
}
