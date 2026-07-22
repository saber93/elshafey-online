export const SITE_URL = "https://elshafey.online";

export const languages = ["en", "ar"] as const;
export type Language = (typeof languages)[number];

type LocalizedText = Readonly<Record<Language, string>>;

export type SchemaEligibility =
  | "WebSite"
  | "CollectionPage"
  | "ItemList"
  | "Person";

export type RouteRecord = Readonly<{
  path: `/${Language}`;
  locale: Language;
  ownerStatus: "canonical-owner";
  indexable: true;
  canonical: `${typeof SITE_URL}/${Language}`;
  localizedCounterpart: `/${Language}`;
  title: string;
  description: string;
  h1: string;
  schemaEligibility: readonly SchemaEligibility[];
  evidenceReferences: readonly string[];
}>;

type MemberRecord = Readonly<{
  id: string;
  initials: string;
  name: LocalizedText;
  field: LocalizedText;
  portrait?: Readonly<{
    src: string;
    width: number;
    height: number;
    alt: LocalizedText;
  }>;
}>;

type LocaleContent = Readonly<{
  direction: "ltr" | "rtl";
  siteName: string;
  metadata: Readonly<{
    title: string;
    description: string;
    socialDescription: string;
    socialImageAlt: string;
    itemListName: string;
  }>;
  navigation: Readonly<{
    label: string;
    home: string;
    members: string;
    languageLabel: string;
    menuOpen: string;
    menuClose: string;
    skip: string;
  }>;
  hero: Readonly<{
    eyebrow: string;
    title: string;
    introduction: string;
    button: string;
    fieldsLabel: string;
    center: string;
    centerSmall: string;
  }>;
  directory: Readonly<{
    eyebrow: string;
    title: string;
    introduction: string;
    fieldLabel: string;
  }>;
  notFound: Readonly<{
    title: string;
    description: string;
    homeLink: string;
  }>;
  footer: string;
}>;

const evidenceReferences = [
  "immediate-remediation-plan:family",
  "family-baseline:580b98fbcc813ce14b655abc8e7d9bba6484b377",
] as const;

export const familyRegistry = {
  defaultLanguage: "en" as const,
  locales: {
    en: {
      direction: "ltr",
      siteName: "El Shafey Family",
      metadata: {
        title: "El Shafey Family | Family Directory",
        description:
          "A bilingual introduction to six El Shafey family members across religious service, textiles, law, HVAC, UX, and digital marketing.",
        socialDescription:
          "Six approved names and their broad fields in a bilingual family directory.",
        socialImageAlt: "El Shafey Family bilingual directory",
        itemListName: "El Shafey Family directory",
      },
      navigation: {
        label: "Primary navigation",
        home: "Home",
        members: "People and fields",
        languageLabel: "Choose language",
        menuOpen: "Open navigation menu",
        menuClose: "Close navigation menu",
        skip: "Skip to main content",
      },
      hero: {
        eyebrow: "Bilingual family directory",
        title: "Six Fields, One Family",
        introduction:
          "This directory presents six approved names with broad fields only: religious service, textiles, law, HVAC, UX, and digital marketing.",
        button: "View the directory",
        fieldsLabel: "Six broad fields",
        center: "One family",
        centerSmall: "Six fields",
      },
      directory: {
        eyebrow: "Family directory",
        title: "Names and broad fields",
        introduction:
          "Each entry is intentionally limited to an approved name and a broad field.",
        fieldLabel: "Broad field",
      },
      notFound: {
        title: "Page not found",
        description: "The requested page is not part of this bilingual directory.",
        homeLink: "Go to the English directory",
      },
      footer: "El Shafey Family. All rights reserved.",
    },
    ar: {
      direction: "rtl",
      siteName: "عائلة الشافعي",
      metadata: {
        title: "عائلة الشافعي | دليل العائلة",
        description:
          "مقدمة ثنائية اللغة لستة من أفراد عائلة الشافعي في مجالات الخدمة الدينية، والنسيج، والقانون، والتكييف، وتجربة المستخدم، والتسويق الرقمي.",
        socialDescription:
          "ستة أسماء معتمدة ومجالاتهم العامة في دليل عائلي ثنائي اللغة.",
        socialImageAlt: "دليل عائلة الشافعي ثنائي اللغة",
        itemListName: "دليل عائلة الشافعي",
      },
      navigation: {
        label: "التنقل الرئيسي",
        home: "الرئيسية",
        members: "الأسماء والمجالات",
        languageLabel: "اختر اللغة",
        menuOpen: "فتح قائمة التنقل",
        menuClose: "إغلاق قائمة التنقل",
        skip: "انتقل إلى المحتوى الرئيسي",
      },
      hero: {
        eyebrow: "دليل عائلي ثنائي اللغة",
        title: "ستة مجالات، عائلة واحدة",
        introduction:
          "يعرض هذا الدليل ستة أسماء معتمدة ومجالات عامة فقط: الخدمة الدينية، والنسيج، والقانون، والتكييف، وتجربة المستخدم، والتسويق الرقمي.",
        button: "استعرض الدليل",
        fieldsLabel: "ستة مجالات عامة",
        center: "عائلة واحدة",
        centerSmall: "ستة مجالات",
      },
      directory: {
        eyebrow: "دليل العائلة",
        title: "الأسماء والمجالات العامة",
        introduction: "يقتصر كل تعريف على اسم معتمد ومجال عام.",
        fieldLabel: "المجال العام",
      },
      notFound: {
        title: "الصفحة غير موجودة",
        description: "الصفحة المطلوبة ليست جزءًا من هذا الدليل ثنائي اللغة.",
        homeLink: "الانتقال إلى الدليل العربي",
      },
      footer: "عائلة الشافعي. جميع الحقوق محفوظة.",
    },
  } satisfies Record<Language, LocaleContent>,
  members: [
    {
      id: "sheikh-saber",
      initials: "SS",
      name: { en: "Sheikh Saber El Shafey", ar: "الشيخ صابر الشافعي" },
      field: { en: "Religious service", ar: "الخدمة الدينية" },
    },
    {
      id: "samir",
      initials: "SE",
      name: { en: "Samir El Shafey", ar: "سمير الشافعي" },
      field: { en: "Textiles", ar: "النسيج" },
    },
    {
      id: "faraj",
      initials: "FE",
      name: { en: "Faraj El Shafey", ar: "فرج الشافعي" },
      field: { en: "Law", ar: "القانون" },
    },
    {
      id: "wesam",
      initials: "WE",
      name: { en: "Wesam El Shafey", ar: "وسام الشافعي" },
      field: { en: "HVAC", ar: "التدفئة والتهوية وتكييف الهواء" },
    },
    {
      id: "saber",
      initials: "SE",
      name: { en: "Saber El Shafey", ar: "صابر الشافعي" },
      field: { en: "UX", ar: "تجربة المستخدم" },
      portrait: {
        src: "/images/saber-el-shafey-e656975a.png",
        width: 384,
        height: 384,
        alt: {
          en: "Portrait of Saber El Shafey",
          ar: "صورة صابر الشافعي",
        },
      },
    },
    {
      id: "farid",
      initials: "FE",
      name: { en: "Farid El Shafey", ar: "فريد الشافعي" },
      field: { en: "Digital marketing", ar: "التسويق الرقمي" },
    },
  ] as const satisfies readonly MemberRecord[],
} as const;

export const routeRegistry = languages.map((locale) => {
  const localizedCounterpart = locale === "en" ? "/ar" : "/en";
  const copy = familyRegistry.locales[locale];

  return {
    path: `/${locale}`,
    locale,
    ownerStatus: "canonical-owner",
    indexable: true,
    canonical: `${SITE_URL}/${locale}`,
    localizedCounterpart,
    title: copy.metadata.title,
    description: copy.metadata.description,
    h1: copy.hero.title,
    schemaEligibility: ["WebSite", "CollectionPage", "ItemList", "Person"],
    evidenceReferences,
  } satisfies RouteRecord;
});

export function isLanguage(value: string): value is Language {
  return languages.includes(value as Language);
}

export function routeFor(language: Language): RouteRecord {
  const route = routeRegistry.find((candidate) => candidate.locale === language);
  if (!route) throw new Error(`Missing route registry entry for ${language}`);
  return route;
}

export function structuredDataFor(language: Language) {
  const route = routeFor(language);
  const copy = familyRegistry.locales[language];
  const websiteId = `${SITE_URL}/#website`;
  const pageId = `${route.canonical}#collection-page`;
  const listId = `${route.canonical}#family-directory`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: copy.siteName,
        inLanguage: [...languages],
      },
      {
        "@type": "CollectionPage",
        "@id": pageId,
        url: route.canonical,
        name: route.title,
        description: route.description,
        inLanguage: language,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": listId },
      },
      {
        "@type": "ItemList",
        "@id": listId,
        name: copy.metadata.itemListName,
        numberOfItems: familyRegistry.members.length,
        itemListElement: familyRegistry.members.map((member, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Person",
            name: member.name[language],
            description: member.field[language],
            ...("portrait" in member
              ? { image: new URL(member.portrait.src, SITE_URL).href }
              : {}),
          },
        })),
      },
    ],
  } as const;
}
