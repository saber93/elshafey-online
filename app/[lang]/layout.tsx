import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { isLanguage, languages, type Language } from "../i18n";
import "../globals.css";

const siteUrl = "https://elshafey.online";

const localizedMetadata = {
  en: {
    title: "El Shafey Family | Professional Consultants",
    description:
      "Meet the El Shafey family and discover expertise in religious leadership, spinning and weaving, international law, HVAC consulting, UX design and research, and digital marketing.",
    socialDescription:
      "Professional and religious expertise across six disciplines, united by one family.",
    siteName: "El Shafey Family",
    headline: "Professional Expertise Across Generations",
    imageAlt: "El Shafey Family — Professional Expertise Across Generations",
    itemListName: "El Shafey Family Members",
    locale: "en_US",
    alternateLocale: "ar_AR",
  },
  ar: {
    title: "عائلة الشافعي | خبرات استشارية متنوعة",
    description:
      "تعرّف على عائلة الشافعي وخبراتها في الإمامة والخطابة، والغزل والنسيج، والاستشارات القانونية الدولية، وأنظمة التكييف والتهوية، وتصميم وبحث تجربة المستخدم، والتسويق الرقمي.",
    socialDescription:
      "خبرات مهنية ودينية في ستة مجالات متنوعة، يجمع بينها اسم عائلة واحدة.",
    siteName: "عائلة الشافعي",
    headline: "خبرات مهنية عبر الأجيال",
    imageAlt: "عائلة الشافعي — خبرات مهنية عبر الأجيال",
    itemListName: "أفراد عائلة الشافعي",
    locale: "ar_AR",
    alternateLocale: "en_US",
  },
} satisfies Record<Language, Record<string, string>>;

const structuredMembers = [
  {
    name: { en: "Sheikh Saber El Shafey", ar: "الشيخ صابر الشافعي" },
    jobTitle: {
      en: "Imam and Preacher, Al-Azhar University Graduate",
      ar: "إمام وخطيب، خريج جامعة الأزهر الشريف",
    },
    description: {
      en: "An imam and preacher and a graduate of Al-Azhar University.",
      ar: "إمام وخطيب وخريج جامعة الأزهر الشريف.",
    },
  },
  {
    name: { en: "Samir El Shafey", ar: "سمير الشافعي" },
    jobTitle: { en: "Spinning and Weaving Consultant", ar: "مستشار الغزل والنسيج" },
    description: {
      en: "Consulting expertise focused on spinning and weaving.",
      ar: "خبرة استشارية تركز على مجال الغزل والنسيج.",
    },
  },
  {
    name: { en: "Faraj El Shafey", ar: "فرج الشافعي" },
    jobTitle: { en: "International Legal Advisor", ar: "مستشار قانوني دولي" },
    description: {
      en: "Advisory expertise focused on international legal matters.",
      ar: "خبرة استشارية تركز على المسائل القانونية الدولية.",
    },
  },
  {
    name: { en: "Wesam El Shafey", ar: "وسام الشافعي" },
    jobTitle: {
      en: "HVAC Consultant",
      ar: "مستشار أنظمة التدفئة والتهوية وتكييف الهواء",
    },
    description: {
      en: "Consulting expertise focused on HVAC systems.",
      ar: "خبرة استشارية تركز على أنظمة التدفئة والتهوية وتكييف الهواء.",
    },
  },
  {
    name: { en: "Saber El Shafey", ar: "صابر الشافعي" },
    jobTitle: {
      en: "Google-Certified UX Designer and Researcher",
      ar: "مصمم وباحث تجربة مستخدم معتمد من Google",
    },
    description: {
      en: "Design and research practice focused on user experience.",
      ar: "ممارسة مهنية في التصميم والبحث تركز على تجربة المستخدم.",
    },
  },
  {
    name: { en: "Farid El Shafey", ar: "فريد الشافعي" },
    jobTitle: { en: "Digital Marketing Consultant", ar: "مستشار تسويق رقمي" },
    description: {
      en: "Consulting expertise focused on digital marketing.",
      ar: "خبرة استشارية تركز على التسويق الرقمي.",
    },
  },
];

export const dynamicParams = false;

export function generateStaticParams() {
  return languages.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0b1f33",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  const meta = localizedMetadata[lang];
  const canonicalPath = `/${lang}`;

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: "/en",
        ar: "/ar",
        "x-default": "/en",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      type: "website",
      url: canonicalPath,
      siteName: meta.siteName,
      title: meta.title,
      description: meta.description,
      locale: meta.locale,
      alternateLocale: meta.alternateLocale,
      images: [
        {
          url: "/og-v2.png",
          width: 1200,
          height: 630,
          alt: meta.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.socialDescription,
      images: ["/og-v2.png"],
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
  };
}

function createStructuredData(language: Language) {
  const meta = localizedMetadata[language];
  const alternateLanguage: Language = language === "en" ? "ar" : "en";
  const pageUrl = `${siteUrl}/${language}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}#profile-page`,
        url: pageUrl,
        name: meta.siteName,
        headline: meta.headline,
        description: meta.description,
        mainEntity: { "@id": `${pageUrl}#family-members` },
        inLanguage: language,
      },
      {
        "@type": "ItemList",
        "@id": `${pageUrl}#family-members`,
        name: meta.itemListName,
        numberOfItems: structuredMembers.length,
        itemListElement: structuredMembers.map((member, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Person",
            name: member.name[language],
            alternateName: member.name[alternateLanguage],
            jobTitle: member.jobTitle[language],
            description: member.description[language],
          },
        })),
      },
    ],
  };
}

export default async function LanguageLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLanguage(lang)) notFound();

  const structuredData = createStructuredData(lang);

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
